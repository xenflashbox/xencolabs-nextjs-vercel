import { NextRequest, NextResponse } from 'next/server';
import { getCaller } from '@/lib/local-os/auth';

// Server-side proxy: the console key never reaches the browser, and the caller identity is the authenticated Clerk
// user (never taken from the request body).
const API_BASE = process.env.LEADINTEL_PUBLIC_API_BASE || 'https://api.xencolabs.com';
const ALLOWED: Array<[string, RegExp]> = [
  ['GET', /^queues$/],
  ['GET', /^prospects\/\d+$/],
  ['POST', /^prospects\/\d+\/(claim|release|outcome|notes|preview)$/],
  ['POST', /^previews\/\d+\/(generate|sent)$/],
];

export const dynamic = 'force-dynamic';

async function handle(req: NextRequest, { params }: { params: { path: string[] } }) {
  const caller = await getCaller();
  if (!caller) return NextResponse.json({ detail: 'Not authorized for the Local OS console' }, { status: 403 });
  const key = process.env.LEADINTEL_CONSOLE_KEY;
  if (!key) return NextResponse.json({ detail: 'Console is not configured (LEADINTEL_CONSOLE_KEY)' }, { status: 503 });
  const path = (params.path || []).join('/');
  if (!ALLOWED.some(([m, rx]) => m === req.method && rx.test(path))) {
    return NextResponse.json({ detail: 'Not found' }, { status: 404 });
  }
  const url = new URL(`${API_BASE}/v1/lead-intelligence/local/console/${path}`);
  req.nextUrl.searchParams.forEach((v, k) => { if (k !== 'caller') url.searchParams.set(k, v); });
  let body: string | undefined;
  if (req.method === 'GET') {
    url.searchParams.set('caller', caller.email);
  } else {
    let json: Record<string, unknown> = {};
    try { json = (await req.json()) as Record<string, unknown>; } catch { /* empty body */ }
    body = JSON.stringify({ ...json, caller: caller.email });
  }
  const res = await fetch(url, {
    method: req.method, cache: 'no-store', body,
    headers: { 'X-Service-Key': key, 'Content-Type': 'application/json' },
  });
  const text = await res.text();
  return new NextResponse(text, { status: res.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}

export { handle as GET, handle as POST };
