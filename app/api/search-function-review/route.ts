import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';
import nodemailer from 'nodemailer';

const schema = z.object({
  companyName: z.string().min(1).max(200),
  companyUrl: z.string().url().max(500),
  jobUrl: z.string().url().max(1000).or(z.literal('')).optional(),
  jobDescription: z.string().min(100).max(25000),
  contactName: z.string().min(1).max(200),
  workEmail: z.string().email().max(320),
  website: z.string().max(0).optional().default(''),
  startedAt: z.number(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Please complete all required fields.' }, { status: 400 });
    }

    const data = parsed.data;

    // Quietly accept obvious bots without creating a lead.
    if (data.website || Date.now() - data.startedAt < 2500) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      CREATE TABLE IF NOT EXISTS xl_search_function_reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        company_name TEXT NOT NULL,
        company_url TEXT NOT NULL,
        job_url TEXT,
        job_description TEXT NOT NULL,
        contact_name TEXT NOT NULL,
        work_email TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    const dbPromise = sql`
      INSERT INTO xl_search_function_reviews
        (company_name, company_url, job_url, job_description, contact_name, work_email)
      VALUES
        (${data.companyName}, ${data.companyUrl}, ${data.jobUrl || null}, ${data.jobDescription}, ${data.contactName}, ${data.workEmail})
    `;

    const emailPromise = (async () => {
      const host = process.env.SMTP_HOST;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      if (!host || !user || !pass) return;

      const port = parseInt(process.env.SMTP_PORT || '465', 10);
      const from = process.env.SMTP_FROM || user;
      const to = process.env.CONTACT_EMAIL || 'xen@xencolabs.com';
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"Xenco Labs Search Function Review" <${from}>`,
        to,
        replyTo: data.workEmail,
        subject: `Search Function Review: ${data.companyName}`,
        text: [
          'New Search Function Review',
          '',
          `Company: ${data.companyName}`,
          `Website: ${data.companyUrl}`,
          `Job URL: ${data.jobUrl || 'Not provided'}`,
          `Contact: ${data.contactName}`,
          `Email: ${data.workEmail}`,
          '',
          'JOB DESCRIPTION',
          data.jobDescription,
        ].join('\n'),
      });
    })();

    const [db, email] = await Promise.allSettled([dbPromise, emailPromise]);
    if (db.status === 'rejected' && email.status === 'rejected') {
      console.error('[search-function-review] both persistence channels failed', db.reason, email.reason);
      return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('[search-function-review] error', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
