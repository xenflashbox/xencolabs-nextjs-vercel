import { NextResponse } from 'next/server';
import { PRICE_MAP } from '@/lib/websites-catalog';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://xencolabs.com';

export async function POST() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: 'Checkout is not configured.' }, { status: 503 });
  }

  const price = PRICE_MAP.xl_pitch_deck?.id;
  if (!price) {
    return NextResponse.json({ error: 'Product unavailable.' }, { status: 500 });
  }

  const form = new URLSearchParams();
  form.append('mode', 'payment'); // one-time, no subscription
  form.append('managed_payments[enabled]', 'false');
  // Never set payment_method_types — dynamic payment methods maximize conversion.
  form.append('success_url', `${SITE_URL}/growth/pitch-thank-you?session_id={CHECKOUT_SESSION_ID}`);
  form.append('cancel_url', `${SITE_URL}/growth`);
  form.append('billing_address_collection', 'required');
  form.append('allow_promotion_codes', 'true');
  form.append('line_items[0][price]', price);
  form.append('line_items[0][quantity]', '1');
  form.append('metadata[source]', 'xl-pitch-deck');

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,
  });
  const session = await res.json();
  if (session.error) {
    console.error('[pitch-deck checkout] stripe error:', session.error.message);
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 });
  }
  return NextResponse.json({ url: session.url });
}
