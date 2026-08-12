import { NextRequest, NextResponse } from 'next/server';
import { PRICE_MAP, PACKAGES, HOSTING } from '@/lib/websites-catalog';

export const dynamic = 'force-dynamic';

const PACKAGE_KEYS = new Set(PACKAGES.map((p) => p.key));
const HOSTING_KEYS = new Set(HOSTING.map((h) => h.key));
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://xencolabs.com';

type LineIn = { key?: unknown; quantity?: unknown };

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: 'Checkout is not configured.' }, { status: 503 });
  }

  let body: { items?: LineIn[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const rawItems = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length === 0) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
  }

  // Validate every key against the catalog; collapse duplicates, clamp quantity.
  const qtyByKey = new Map<string, number>();
  for (const it of rawItems) {
    const key = typeof it.key === 'string' ? it.key : '';
    if (!PRICE_MAP[key]) {
      return NextResponse.json({ error: 'Unknown item in cart.' }, { status: 400 });
    }
    let qty = Number.isFinite(Number(it.quantity)) ? Math.floor(Number(it.quantity)) : 1;
    qty = Math.max(1, Math.min(20, qty));
    qtyByKey.set(key, (qtyByKey.get(key) || 0) + qty);
  }

  const keys = [...qtyByKey.keys()];
  const packageCount = keys.filter((k) => PACKAGE_KEYS.has(k)).length;
  const hostingKeys = keys.filter((k) => HOSTING_KEYS.has(k));
  if (packageCount !== 1) {
    return NextResponse.json({ error: 'Pick exactly one website package.' }, { status: 400 });
  }
  if (hostingKeys.length !== 1) {
    return NextResponse.json({ error: 'Pick one hosting plan.' }, { status: 400 });
  }

  // Build Stripe Checkout line items from server-side price IDs only.
  const form = new URLSearchParams();
  form.append('mode', 'subscription'); // hosting is recurring; one-time items bill on the first invoice
  // NOTE: never set payment_method_types — dynamic payment methods maximize conversion.
  form.append('success_url', `${SITE_URL}/websites/thank-you?session_id={CHECKOUT_SESSION_ID}`);
  form.append('cancel_url', `${SITE_URL}/websites`);
  form.append('billing_address_collection', 'required');
  form.append('allow_promotion_codes', 'true');
  form.append('subscription_data[metadata][source]', 'xl-websites-store');

  let i = 0;
  for (const [key, qty] of qtyByKey) {
    form.append(`line_items[${i}][price]`, PRICE_MAP[key].id);
    form.append(`line_items[${i}][quantity]`, String(qty));
    i++;
  }
  form.append('metadata[source]', 'xl-websites-store');
  form.append('metadata[keys]', keys.join(','));

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
  });
  const session = await res.json();

  if (session.error) {
    console.error('[websites checkout] stripe error:', session.error.message);
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ url: session.url });
}
