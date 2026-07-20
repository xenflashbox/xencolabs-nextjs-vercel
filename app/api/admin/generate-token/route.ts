import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { signAccessToken, timingSafeMatch } from '@/lib/access-tokens';
import {
  DEFAULT_EXPIRY_DAYS,
  MAX_EXPIRY_DAYS,
  MAX_RECIPIENT_LENGTH,
  MIN_EXPIRY_DAYS,
  PROTECTED_DOCUMENTS,
  getProtectedDocument,
  slugifyRecipient,
} from '@/lib/protected-documents';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const generateTokenSchema = z.object({
  recipient: z.string().min(1).max(MAX_RECIPIENT_LENGTH),
  documentKey: z.string().min(1),
  expiryDays: z
    .number()
    .int()
    .min(MIN_EXPIRY_DAYS)
    .max(MAX_EXPIRY_DAYS)
    .default(DEFAULT_EXPIRY_DAYS),
  adminPassword: z.string().min(1),
});

/**
 * Mint an expiring magic link for a gated document.
 *
 * Two gates, because Clerk alone is not sufficient here: sign-up is open, so any
 * registered user could otherwise reach this endpoint. A shared admin password
 * is therefore required in addition to an authenticated session.
 */
export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: 'Authentication required', code: 'UNAUTHENTICATED' },
      { status: 401 }
    );
  }

  const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!tokenSecret || !adminPassword) {
    console.error(
      'Token generation misconfigured: ACCESS_TOKEN_SECRET and/or ADMIN_PASSWORD is unset'
    );
    return NextResponse.json(
      {
        error: 'Token generation is not configured on this environment',
        code: 'CONFIG_MISSING',
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    console.error('Token generation received an unparsable body:', error);
    return NextResponse.json(
      { error: 'Request body must be valid JSON', code: 'INVALID_JSON' },
      { status: 400 }
    );
  }

  const parsed = generateTokenSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Invalid request',
        code: 'INVALID_REQUEST',
        details: parsed.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          issue: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const { recipient, documentKey, expiryDays, adminPassword: supplied } =
    parsed.data;

  if (!timingSafeMatch(supplied, adminPassword)) {
    console.warn(
      JSON.stringify({
        event: 'magic_link_denied',
        reason: 'bad_admin_password',
        userId,
        at: new Date().toISOString(),
      })
    );
    return NextResponse.json(
      { error: 'Incorrect admin password', code: 'INVALID_ADMIN_PASSWORD' },
      { status: 401 }
    );
  }

  const slug = slugifyRecipient(recipient);
  if (!slug) {
    return NextResponse.json(
      {
        error: 'Recipient must contain at least one letter or number',
        code: 'INVALID_RECIPIENT',
      },
      { status: 400 }
    );
  }

  const document = getProtectedDocument(documentKey);
  if (!document) {
    return NextResponse.json(
      {
        error:
          PROTECTED_DOCUMENTS.length === 0
            ? 'No protected documents are configured. Add an entry to PROTECTED_DOCUMENTS in lib/protected-documents.ts.'
            : `Unknown document "${documentKey}"`,
        code: 'UNKNOWN_DOCUMENT',
        details: {
          available: PROTECTED_DOCUMENTS.map((doc) => doc.key),
        },
      },
      { status: 400 }
    );
  }

  const expiresAtMs = Date.now() + expiryDays * MS_PER_DAY;
  const token = signAccessToken(
    { r: slug, t: document.key, e: expiresAtMs },
    tokenSecret
  );

  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://xencolabs.com'
  ).replace(/\/$/, '');
  const magicLink = `${baseUrl}${document.route}?k=${token}`;

  console.log(
    JSON.stringify({
      event: 'magic_link_generated',
      userId,
      recipient: slug,
      document: document.key,
      route: document.route,
      expiresAt: new Date(expiresAtMs).toISOString(),
      generatedAt: new Date().toISOString(),
    })
  );

  return NextResponse.json({
    magicLink,
    recipient: slug,
    documentKey: document.key,
    label: document.label,
    route: document.route,
    expiresAt: new Date(expiresAtMs).toISOString(),
    expiryDays,
  });
}
