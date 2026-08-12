import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const schema = z.object({
  sessionId: z.string().max(200).optional().default(''),
  businessName: z.string().min(1).max(200),
  contactName: z.string().min(1).max(200),
  email: z.string().email().max(200),
  existingUrl: z.string().max(300).optional().default(''),
  whatYouDo: z.string().min(1).max(4000),
  pitch: z.string().max(4000).optional().default(''),
  pageList: z.string().max(2000).optional().default(''),
  brandAssets: z.string().max(2000).optional().default(''),
  notes: z.string().max(4000).optional().default(''),
  company_url: z.string().max(0).optional(), // honeypot: must be empty
});

async function ensureTable() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    CREATE TABLE IF NOT EXISTS xl_website_intake (
      id SERIAL PRIMARY KEY,
      session_id TEXT,
      business_name TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      email TEXT NOT NULL,
      existing_url TEXT,
      what_you_do TEXT NOT NULL,
      pitch TEXT,
      page_list TEXT,
      brand_assets TEXT,
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

async function save(d: z.infer<typeof schema>) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    INSERT INTO xl_website_intake
      (session_id, business_name, contact_name, email, existing_url, what_you_do, pitch, page_list, brand_assets, notes)
    VALUES
      (${d.sessionId}, ${d.businessName}, ${d.contactName}, ${d.email}, ${d.existingUrl},
       ${d.whatYouDo}, ${d.pitch}, ${d.pageList}, ${d.brandAssets}, ${d.notes})
  `;
}

async function notify(d: z.infer<typeof schema>) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return; // email is best-effort
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    secure: Number(SMTP_PORT || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const lines = [
    `New website project intake`,
    ``,
    `Business: ${d.businessName}`,
    `Contact: ${d.contactName} <${d.email}>`,
    d.existingUrl ? `Existing site: ${d.existingUrl}` : '',
    d.sessionId ? `Stripe session: ${d.sessionId}` : '',
    ``,
    `What they do:`,
    d.whatYouDo,
    ``,
    d.pitch ? `Pitch / differentiator:\n${d.pitch}\n` : '',
    d.pageList ? `Pages wanted:\n${d.pageList}\n` : '',
    d.brandAssets ? `Brand assets:\n${d.brandAssets}\n` : '',
    d.notes ? `Notes:\n${d.notes}\n` : '',
  ].filter(Boolean).join('\n');
  await transport.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to: 'xen@xencolabs.com',
    replyTo: d.email,
    subject: `New website intake — ${d.businessName}`,
    text: lines,
  });
}

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please fill in the required fields.' }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot: silently accept and drop.
  if (data.company_url && data.company_url.length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  try {
    await ensureTable();
    const results = await Promise.allSettled([save(data), notify(data)]);
    const saved = results[0].status === 'fulfilled';
    if (!saved) {
      console.error('[website-intake] save failed:', (results[0] as PromiseRejectedResult).reason);
      return NextResponse.json({ error: 'Could not save your details. Please try again.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error('[website-intake] error:', e);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
