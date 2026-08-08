import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';
import { syncXlAdvisoryInquiryToMautic } from '@/lib/mautic';
import {
  MIN_SUBMIT_MS,
  normalizeEmail,
  verifyFormToken,
  verifyTurnstile,
} from '@/lib/form-hardening';

/**
 * Executive briefing requests from /advisory.
 *
 * Bot-hardened per FORM_BOT_HARDENING_BRIEF: honeypot (silent drop), signed-
 * timestamp timing floor, server-side Turnstile, and Gmail-normalised rate
 * limiting all run BEFORE any Mautic contact is created. Anything that fails an
 * enforced layer is rejected/dropped at the site, so every contact that IS
 * created is attested with form_verified=1 — the Mautic-side gate on that field
 * then catches any future unprotected/regressed form as defence in depth.
 *
 * Surviving submissions persist to Neon, notify both principals, and enroll in
 * Mautic (campaign 13 Notify + Escalate). Each leg is best-effort.
 */

const briefingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().email('A valid email is required').max(200),
  company: z.string().max(200).optional().default(''),
});

type BriefingData = z.infer<typeof briefingSchema>;

const NOTIFY = ['xen@xencolabs.com', 'laurie@xencolabs.com'];
const SOURCE_TAG = 'advisory-page';
const HONEYPOT_FIELD = 'company_url'; // must match the CSS-hidden input in the form

async function ensureTable() {
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
  // Additive columns for hardening (idempotent).
  await sql`ALTER TABLE xl_advisory_briefing_requests ADD COLUMN IF NOT EXISTS normalized_email TEXT`;
  await sql`ALTER TABLE xl_advisory_briefing_requests ADD COLUMN IF NOT EXISTS form_verified BOOLEAN NOT NULL DEFAULT FALSE`;
}

/** Layer 4: ≤1 accepted submission per normalised identity per hour. */
async function recentlySubmitted(normalized: string): Promise<boolean> {
  try {
    await ensureTable();
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`
      SELECT 1 FROM xl_advisory_briefing_requests
      WHERE normalized_email = ${normalized}
        AND created_at > NOW() - INTERVAL '1 hour'
      LIMIT 1
    `;
    return rows.length > 0;
  } catch (error) {
    // Fail open — a DB blip must not block a legitimate lead.
    console.error('[advisory-briefing] rate-limit check failed (allowing):', error);
    return false;
  }
}

async function saveToDatabase(
  data: BriefingData,
  normalized: string,
  formVerified: boolean
) {
  await ensureTable();
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    INSERT INTO xl_advisory_briefing_requests (name, email, company, source, normalized_email, form_verified)
    VALUES (${data.name}, ${data.email}, ${data.company || null}, ${SOURCE_TAG}, ${normalized}, ${formVerified})
  `;
  console.log(`[advisory-briefing] Saved to database: ${data.email} (form_verified=${formVerified})`);
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
 * Enroll the contact in Mautic. The atomic create carries xl_source='xl-advisory',
 * xl_advisory_status='new', and form_verified (1 for a site-protected submission),
 * which segment 21 + campaign 13 pick up cron-side. Best-effort.
 */
async function enrollInMautic(data: BriefingData, formVerified: boolean) {
  const [firstname, ...rest] = data.name.trim().split(/\s+/);
  const lastname = rest.join(' ');
  await syncXlAdvisoryInquiryToMautic({
    email: data.email,
    firstname,
    lastname: lastname || undefined,
    company: data.company || undefined,
    formVerified,
  });
}

const OK = { success: true, message: 'Briefing request received' };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // ── Layer 2: honeypot ── a field only a bot fills. Silent success so the
    // bot never learns it was caught; no contact created.
    const hp = body?.[HONEYPOT_FIELD];
    if (typeof hp === 'string' && hp.trim() !== '') {
      console.warn('[advisory-briefing] honeypot tripped — silent drop');
      return NextResponse.json(OK, { status: 201 });
    }

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

    // ── Layer 3: timing floor ── requires a valid signed token (only issued on
    // page load) and ≥3s elapsed. The current attack — bare API POSTs with no
    // page session — has no token and is rejected right here. Enforced only when
    // FORM_TOKEN_SECRET is provisioned (fail-open on misconfig, logged loudly).
    if (process.env.FORM_TOKEN_SECRET) {
      const age = verifyFormToken(body?.formToken);
      if (age === null || age < MIN_SUBMIT_MS) {
        console.warn(`[advisory-briefing] timing/token rejected (age=${age})`);
        return NextResponse.json(
          { error: 'Could not verify your submission. Please reload the page and try again.' },
          { status: 400 }
        );
      }
    } else {
      console.warn('[advisory-briefing] FORM_TOKEN_SECRET unset — timing layer INACTIVE');
    }

    // ── Layer 1: Turnstile (server-side) ── enforced once TURNSTILE_SECRET_KEY
    // is set. Missing/invalid token → reject (this is the acceptance-critical
    // direct-POST bypass).
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
    const turnstile = await verifyTurnstile(body?.turnstileToken, ip);
    if (turnstile.configured && !turnstile.success) {
      console.warn('[advisory-briefing] Turnstile failed — rejected');
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 400 }
      );
    }
    if (!turnstile.configured) {
      console.warn('[advisory-briefing] TURNSTILE_SECRET_KEY unset — Turnstile layer INACTIVE');
    }

    // ── Layer 4: Gmail-normalised rate limit ── collapses dot-insertion to one
    // identity. Duplicate within the hour → stealth success, no new contact.
    const normalized = normalizeEmail(data.email);
    if (await recentlySubmitted(normalized)) {
      console.warn(`[advisory-briefing] rate-limited (normalised=${normalized})`);
      return NextResponse.json(OK, { status: 201 });
    }

    // Reached here ⇒ passed every enforced layer ⇒ attest form_verified=1.
    const formVerified = true;

    const [dbResult, emailResult, mauticResult] = await Promise.allSettled([
      saveToDatabase(data, normalized, formVerified),
      sendNotificationEmail(data),
      enrollInMautic(data, formVerified),
    ]);

    if (dbResult.status === 'rejected') {
      console.error('[advisory-briefing] Database save failed:', dbResult.reason);
    }
    if (emailResult.status === 'rejected') {
      console.error('[advisory-briefing] Email send failed:', emailResult.reason);
    }
    if (mauticResult.status === 'rejected') {
      console.error('[advisory-briefing] Mautic enrollment failed:', mauticResult.reason);
    }

    if (dbResult.status === 'rejected' && emailResult.status === 'rejected') {
      return NextResponse.json(
        { error: 'We could not record your request. Please email us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json(OK, { status: 201 });
  } catch (error) {
    console.error('[advisory-briefing] Internal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
