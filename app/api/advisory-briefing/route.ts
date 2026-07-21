import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';

/**
 * Executive briefing requests from /advisory.
 *
 * Capture-and-notify only (no drip): persist to Neon, notify both principals,
 * and best-effort enroll the contact in Mautic. Mirrors the proven
 * /api/growth-audit transport. Never throws to the visitor if at least one
 * channel succeeds — the CTA must not dead-end.
 */

const briefingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().email('A valid email is required').max(200),
  company: z.string().max(200).optional().default(''),
});

type BriefingData = z.infer<typeof briefingSchema>;

const NOTIFY = ['xen@xencolabs.com', 'laurie@xencolabs.com'];
const SOURCE_TAG = 'advisory-page';
const MAUTIC_SEGMENT_ALIAS = 'advisory-briefing-requests';

async function saveToDatabase(data: BriefingData) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    CREATE TABLE IF NOT EXISTS xl_advisory_briefing_requests (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      source TEXT NOT NULL DEFAULT 'advisory-page',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    INSERT INTO xl_advisory_briefing_requests (name, email, company, source)
    VALUES (${data.name}, ${data.email}, ${data.company || null}, ${SOURCE_TAG})
  `;
  console.log(`[advisory-briefing] Saved to database: ${data.email}`);
}

async function sendNotificationEmail(data: BriefingData) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass) {
    console.warn(
      '[advisory-briefing] SMTP not configured — request saved to database only. Set SMTP_HOST, SMTP_USER, SMTP_PASS.'
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Xenco Labs Advisory" <${from}>`,
    to: NOTIFY.join(', '),
    replyTo: data.email,
    subject: `Executive Briefing Request: ${data.name}${
      data.company ? ` (${data.company})` : ''
    }`,
    text: [
      'New Executive Briefing Request',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || '—'}`,
      `Source: ${SOURCE_TAG}`,
      '',
      `Submitted: ${new Date().toISOString()}`,
    ].join('\n'),
    html: `
      <h2>New Executive Briefing Request</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${data.name}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Company</td><td style="padding:6px 12px;">${data.company || '—'}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Source</td><td style="padding:6px 12px;">${SOURCE_TAG}</td></tr>
      </table>
      <p style="color:#888;font-size:12px;margin-top:16px;">Submitted ${new Date().toISOString()}</p>
    `,
  });

  console.log(`[advisory-briefing] Notified ${NOTIFY.join(', ')} for ${data.email}`);
}

/**
 * Best-effort Mautic enrollment: create/update the contact, tag it, and add it
 * to the advisory-briefing-requests segment (capture-and-notify only — attach
 * no campaigns). Skips cleanly when Mautic is unreachable/unconfigured (the
 * instance is currently LAN-only), so the primary capture path is never blocked.
 */
async function enrollInMautic(data: BriefingData) {
  const base = process.env.MAUTIC_API_URL; // e.g. https://mautic.example.com/api
  const user = process.env.MAUTIC_USER;
  const pass = process.env.MAUTIC_PASS;

  if (!base || !user || !pass) {
    console.warn(
      '[advisory-briefing] Mautic not configured — skipping enrollment. Set MAUTIC_API_URL, MAUTIC_USER, MAUTIC_PASS (needs a publicly reachable Mautic).'
    );
    return;
  }

  const auth = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
  const [firstname, ...rest] = data.name.trim().split(/\s+/);
  const lastname = rest.join(' ');

  const createRes = await fetch(`${base.replace(/\/$/, '')}/contacts/new`, {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      firstname,
      lastname,
      company: data.company || undefined,
      tags: [SOURCE_TAG],
    }),
  });
  if (!createRes.ok) {
    throw new Error(
      `Mautic contact create failed: ${createRes.status} ${await createRes.text()}`
    );
  }
  const contact = await createRes.json();
  const contactId = contact?.contact?.id;
  if (!contactId) {
    throw new Error('Mautic contact create returned no id');
  }

  const segRes = await fetch(
    `${base.replace(/\/$/, '')}/segments/${MAUTIC_SEGMENT_ALIAS}/contact/${contactId}/add`,
    { method: 'POST', headers: { Authorization: auth } }
  );
  if (!segRes.ok) {
    throw new Error(
      `Mautic segment add failed: ${segRes.status} ${await segRes.text()}`
    );
  }
  console.log(`[advisory-briefing] Enrolled ${data.email} in Mautic segment`);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = briefingSchema.safeParse(body);

    if (!result.success) {
      const details = result.error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      console.error('[advisory-briefing] Validation failed:', details);
      return NextResponse.json(
        { error: 'Please provide a valid name and email.', details },
        { status: 400 }
      );
    }

    const data = result.data;

    const [dbResult, emailResult, mauticResult] = await Promise.allSettled([
      saveToDatabase(data),
      sendNotificationEmail(data),
      enrollInMautic(data),
    ]);

    if (dbResult.status === 'rejected') {
      console.error('[advisory-briefing] Database save failed:', dbResult.reason);
    }
    if (emailResult.status === 'rejected') {
      console.error('[advisory-briefing] Email send failed:', emailResult.reason);
    }
    if (mauticResult.status === 'rejected') {
      console.error(
        '[advisory-briefing] Mautic enrollment failed:',
        mauticResult.reason
      );
    }

    // The capture is only lost if BOTH the database and the notification fail.
    if (dbResult.status === 'rejected' && emailResult.status === 'rejected') {
      return NextResponse.json(
        { error: 'We could not record your request. Please email us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Briefing request received' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[advisory-briefing] Internal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
