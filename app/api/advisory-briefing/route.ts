import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';
import { syncXlAdvisoryInquiryToMautic } from '@/lib/mautic';

/**
 * Executive briefing requests from /advisory.
 *
 * Persist to Neon, notify both principals, and enroll the contact in Mautic
 * (OAuth2, mautic.xencolabs.com) which fires the Notify + Escalate campaign.
 * Every leg is best-effort and independent — the request never dead-ends if at
 * least one of DB/email succeeds.
 */

const briefingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().email('A valid email is required').max(200),
  company: z.string().max(200).optional().default(''),
});

type BriefingData = z.infer<typeof briefingSchema>;

const NOTIFY = ['xen@xencolabs.com', 'laurie@xencolabs.com'];
const SOURCE_TAG = 'advisory-page';

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
 * Enroll the contact in Mautic via the shared OAuth2 transport. The atomic
 * create carries xl_source='xl-advisory' + xl_advisory_status='new', which the
 * segment filter + campaign 13 (Notify + Escalate) pick up cron-side.
 * Best-effort: syncXlAdvisoryInquiryToMautic never throws; a null return means
 * enrollment didn't land (already captured in Neon + notified by email).
 */
async function enrollInMautic(data: BriefingData) {
  const [firstname, ...rest] = data.name.trim().split(/\s+/);
  const lastname = rest.join(' ');
  await syncXlAdvisoryInquiryToMautic({
    email: data.email,
    firstname,
    lastname: lastname || undefined,
    company: data.company || undefined,
  });
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
