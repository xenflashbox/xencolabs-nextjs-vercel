import crypto from 'crypto';

/**
 * Server-side bot-hardening primitives for public forms (advisory briefing, etc.)
 * per the Mautic admin's FORM_BOT_HARDENING_BRIEF. Layered defence:
 *   1. Cloudflare Turnstile — verified server-side here (verifyTurnstile).
 *   2. Honeypot — checked in the route (silent drop on fill).
 *   3. Signed timestamp — issued by /api/form-token, verified here (min 3s to submit).
 *   4. Gmail dot/+ normalisation — for rate-limiting/dedupe only.
 *
 * The bots seen so far POST straight to the API with no page load (no IP, no
 * page views), so #3 alone rejects them: they never fetched a signed token.
 */

export const MIN_SUBMIT_MS = 3000; // humans don't fill a form in under ~3s
export const MAX_TOKEN_AGE_MS = 60 * 60 * 1000; // token valid for 1 hour

function tokenSecret(): string | null {
  return process.env.FORM_TOKEN_SECRET || null;
}

/** Issue a signed timestamp token: `<base36 ts>.<hmac>`. */
export function signFormToken(now = Date.now()): string {
  const secret = tokenSecret();
  if (!secret) throw new Error('FORM_TOKEN_SECRET not configured');
  const ts = now.toString(36);
  const sig = crypto.createHmac('sha256', secret).update(ts).digest('base64url');
  return `${ts}.${sig}`;
}

/**
 * Verify a form token. Returns the elapsed ms since issue, or null if the token
 * is missing, malformed, tampered, or older than MAX_TOKEN_AGE_MS.
 */
export function verifyFormToken(token: unknown, now = Date.now()): number | null {
  const secret = tokenSecret();
  if (!secret || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [ts, sig] = parts;
  const expected = crypto.createHmac('sha256', secret).update(ts).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  const issued = parseInt(ts, 36);
  if (!Number.isFinite(issued)) return null;
  const age = now - issued;
  if (age < 0 || age > MAX_TOKEN_AGE_MS) return null;
  return age;
}

/**
 * Normalise an email for rate-limiting/dedupe ONLY (store the original as-typed).
 * Gmail ignores dots and everything after `+` in the local part, so
 * `o.j.aw.uf.e.k.600@gmail.com` and `ojawufek600@gmail.com` are one mailbox.
 */
export function normalizeEmail(email: string): string {
  const e = email.trim().toLowerCase();
  const at = e.lastIndexOf('@');
  if (at < 1) return e;
  let local = e.slice(0, at);
  const domain = e.slice(at + 1);
  const plus = local.indexOf('+');
  if (plus !== -1) local = local.slice(0, plus);
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.replace(/\./g, '');
    return `${local}@gmail.com`;
  }
  return `${local}@${domain}`;
}

export interface TurnstileResult {
  /** false when TURNSTILE_SECRET_KEY is unset (feature not yet provisioned). */
  configured: boolean;
  /** true only when Cloudflare confirmed the token. */
  success: boolean;
}

/**
 * Verify a Turnstile token against Cloudflare siteverify. When the secret is
 * unset (keys not provisioned yet), returns {configured:false, success:false}
 * so the caller can ship without hard-blocking; enforcement turns on the moment
 * TURNSTILE_SECRET_KEY lands in the env.
 */
export async function verifyTurnstile(
  token: unknown,
  remoteip?: string | null
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { configured: false, success: false };
  if (typeof token !== 'string' || !token) return { configured: true, success: false };
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteip) body.set('remoteip', remoteip);
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body }
    );
    const json = (await res.json()) as { success?: boolean };
    return { configured: true, success: json.success === true };
  } catch (err) {
    console.error('[form-hardening] Turnstile verify error:', err);
    return { configured: true, success: false };
  }
}
