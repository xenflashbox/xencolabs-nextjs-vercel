import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';

const auditRequestSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  websiteUrl: z
    .string()
    .url('Must be a valid URL')
    .refine(
      (url) => url.startsWith('http://') || url.startsWith('https://'),
      'URL must start with http:// or https://'
    ),
  contactName: z.string().min(1, 'Name is required'),
  workEmail: z.string().email('Must be a valid email'),
  companySize: z.enum([
    'Under $5M',
    '$5M – $20M',
    '$20M – $50M',
    '$50M+',
    'Rather not say',
  ]),
});

async function saveToDatabase(data: z.infer<typeof auditRequestSchema>) {
  const sql = neon(process.env.DATABASE_URL!);

  // Ensure table exists (idempotent)
  await sql`
    CREATE TABLE IF NOT EXISTS xl_growth_audit_requests (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      company_name TEXT NOT NULL,
      website_url TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      work_email TEXT NOT NULL,
      company_size TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO xl_growth_audit_requests (company_name, website_url, contact_name, work_email, company_size)
    VALUES (${data.companyName}, ${data.websiteUrl}, ${data.contactName}, ${data.workEmail}, ${data.companySize})
  `;

  console.log(`[growth-audit] Saved to database: ${data.companyName}`);
}

async function sendNotificationEmail(data: z.infer<typeof auditRequestSchema>) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const contactEmail = process.env.CONTACT_EMAIL || 'xen@xencolabs.com';

  if (!host || !user || !pass) {
    console.warn(
      '[growth-audit] SMTP not configured — submission saved to database only. Set SMTP_HOST, SMTP_USER, SMTP_PASS.'
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
    from: `"Xenco Labs Growth Audit" <${from}>`,
    to: contactEmail,
    subject: `New Growth Audit Request: ${data.companyName}`,
    text: [
      `New Digital Growth Audit Request`,
      ``,
      `Company: ${data.companyName}`,
      `Website: ${data.websiteUrl}`,
      `Contact: ${data.contactName}`,
      `Email: ${data.workEmail}`,
      `Company Size: ${data.companySize}`,
      ``,
      `Submitted: ${new Date().toISOString()}`,
    ].join('\n'),
    html: `
      <h2>New Digital Growth Audit Request</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:6px 12px;font-weight:bold;">Company</td><td style="padding:6px 12px;">${data.companyName}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Website</td><td style="padding:6px 12px;"><a href="${data.websiteUrl}">${data.websiteUrl}</a></td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Contact</td><td style="padding:6px 12px;">${data.contactName}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${data.workEmail}">${data.workEmail}</a></td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Company Size</td><td style="padding:6px 12px;">${data.companySize}</td></tr>
      </table>
      <p style="color:#888;font-size:12px;margin-top:16px;">Submitted ${new Date().toISOString()}</p>
    `,
  });

  console.log(`[growth-audit] Email notification sent for ${data.companyName}`);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = auditRequestSchema.safeParse(body);

    if (!result.success) {
      const details = result.error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      console.error('[growth-audit] Validation failed:', details);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details },
        { status: 400 }
      );
    }

    const data = result.data;

    // Run database and email independently — neither blocks the other
    const [dbResult, emailResult] = await Promise.allSettled([
      saveToDatabase(data),
      sendNotificationEmail(data),
    ]);

    if (dbResult.status === 'rejected') {
      console.error('[growth-audit] Database save failed:', dbResult.reason);
    }
    if (emailResult.status === 'rejected') {
      console.error('[growth-audit] Email send failed:', emailResult.reason);
    }

    // Succeed if at least one channel worked
    if (dbResult.status === 'rejected' && emailResult.status === 'rejected') {
      console.error('[growth-audit] Both database and email failed');
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Audit request received' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[growth-audit] Internal error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
