import { NextResponse } from 'next/server';
import { signFormToken } from '@/lib/form-hardening';

// Issues a fresh HMAC-signed timestamp for public forms. The form fetches this
// on mount and echoes it back on submit; the API rejects submissions whose
// token is missing, forged, or younger than the min-submit floor. Never cached.
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.FORM_TOKEN_SECRET) {
    // Not yet provisioned — return 204 so the form degrades gracefully.
    return new NextResponse(null, { status: 204 });
  }
  return NextResponse.json(
    { token: signFormToken() },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } }
  );
}
