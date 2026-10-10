import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';
import { syncXlInboundToMautic } from '@/lib/mautic';
import { guardInbound } from '@/lib/inbound-guard';

/**
 * Local Service Business OS inquiries (issue api-xencolabs#111).
 *
 * Bot-hardened like /api/advisory-briefing, then three independent legs:
 * Neon (xl_local_os_inquiries), an owner email, and Mautic (journey
 * 'local-os': segment 53 → Notify + Escalate, segment 54 → drip, consent only).
 * Succeeds if Neon or the email lands, so a lead is never lost to one outage.
 */

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().email('A valid email is required').max(200),
  businessName: z.string().min(1, 'Business name is required').max(200),
  phone: z.string().max(40).optional().default(''),
  vertical: z.string().max(64).optional().default(''),
  website: z.string().max(300).optional().default(''),
  message: z.string().max(2000).optional().default(''),
  consent: z.boolean().optional().default(false),
  attribution: z
    .object({
      utm_source: z.string().max(200).optional(),
      utm_medium: z.string().max(200).optional(),
      utm_campaign: z.string().max(200).optional(),
      utm_content: z.string().max(200).optional(),
      utm_term: z.string().max(200).optional(),
      landing_page: z.string().max(300).optional(),
    })
    .optional(),
});

type Inquiry = z.infer<typeof schema>;

const OK = { success: true, message: 'Inquiry received' };

async function saveToDatabase(data: Inquiry, formVerified: boolean) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    CREATE TABLE IF NOT EXISTS xl_local_os_inquiries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      business_name TEXT NOT NULL,
      phone TEXT,
      vertical TEXT,
      website TEXT,
      message TEXT,
      consent BOOLEAN NOT NULL DEFAULT FALSE,
      attribution JSONB,
      form_verified BOOLEAN NOT NULL DEFAULT FALSE,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    INSERT INTO xl_local_os_inquiries (name, email, business_name, phone, vertical, website, message, consent, attribution, form_verified)
    VALUES (${data.name}, ${data.email}, ${data.businessName}, ${data.phone || null}, ${data.vertical || null},
            ${data.website || null}, ${data.message || null}, ${data.consent}, ${JSON.stringify(data.attribution || {})}, ${formVerified})
  `;
}

const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

async function sendNotificationEmail(data: Inquiry) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const to = process.env.CONTACT_EMAIL || 'xen@xencolabs.com';
  if (!host || !user || !pass) {
    console.warn('[local-os-inquiry] SMTP not configured — saved to database only.');
    return;
  }
  const a = data.attribution || {};
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Business', data.businessName],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Service', data.vertical || '—'],
    ['Website', data.website || '—'],
    ['Message', data.message || '—'],
    ['Email follow-up consent', data.consent ? 'yes' : 'no'],
    ['Source', [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(' / ') || a.landing_page || '—'],
  ];
  await nodemailer
    .createTransport({ host, port, secure: port === 465, auth: { user, pass } })
    .sendMail({
      from: `"Xenco Labs Local OS" <${from}>`,
      to,
      replyTo: data.email,
      subject: `Local OS inquiry: ${data.businessName} (${data.name})`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<h2>New Local Service OS inquiry</h2><table style="border-collapse:collapse;font-family:sans-serif;">${rows
        .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:bold;">${k}</td><td style="padding:6px 12px;">${esc(v)}</td></tr>`)
        .join('')}</table>`,
    });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
    const guard = await guardInbound(body, ip, 'local-os-inquiry');
    if (guard.action === 'drop') return NextResponse.json(OK, { status: 201 });
    if (guard.action === 'reject') return NextResponse.json({ success: false, error: guard.error }, { status: 400 });

    const result = schema.safeParse(body);
    if (!result.success) {
      const details = result.error.issues.map((e) => ({ field: e.path.join('.'), message: e.message }));
      return NextResponse.json({ success: false, error: 'Please check the highlighted fields.', details }, { status: 400 });
    }
    const data = result.data;
    const [firstname, ...rest] = data.name.trim().split(/\s+/);

    const [dbResult, emailResult, mauticResult] = await Promise.allSettled([
      saveToDatabase(data, guard.formVerified),
      sendNotificationEmail(data),
      syncXlInboundToMautic({
        journey: 'local-os',
        email: data.email,
        firstname,
        lastname: rest.join(' ') || undefined,
        company: data.businessName,
        phone: data.phone || undefined,
        website: data.website || undefined,
        vertical: data.vertical || undefined,
        message: data.message || undefined,
        consent: data.consent,
        formVerified: guard.formVerified,
        attribution: data.attribution,
      }),
    ]);
    if (dbResult.status === 'rejected') console.error('[local-os-inquiry] Database save failed:', dbResult.reason);
    if (emailResult.status === 'rejected') console.error('[local-os-inquiry] Email send failed:', emailResult.reason);
    if (mauticResult.status === 'rejected') console.error('[local-os-inquiry] Mautic sync failed:', mauticResult.reason);

    if (dbResult.status === 'rejected' && emailResult.status === 'rejected') {
      return NextResponse.json({ success: false, error: 'We could not record your request. Please book a call instead.' }, { status: 500 });
    }
    return NextResponse.json(OK, { status: 201 });
  } catch (error) {
    console.error('[local-os-inquiry] Internal error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
