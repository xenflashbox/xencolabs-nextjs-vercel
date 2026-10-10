import { MIN_SUBMIT_MS, verifyFormToken, verifyTurnstile } from './form-hardening';

export type GuardResult =
  | { action: 'drop' } // honeypot: reply success, create nothing
  | { action: 'reject'; error: string }
  | { action: 'accept'; formVerified: boolean };

/**
 * Server half of the form bot-hardening, the same layers and order as
 * /api/advisory-briefing: honeypot (silent drop) → signed timing token →
 * Turnstile. Each layer is enforced once its secret is provisioned.
 * `formVerified` is true only when every layer that exists was enforced and
 * passed, so the Mautic `form_verified=1` segment gate means what it says.
 */
export async function guardInbound(
  body: Record<string, unknown>,
  ip: string | null,
  tag: string
): Promise<GuardResult> {
  const hp = body?.company_url;
  if (typeof hp === 'string' && hp.trim() !== '') {
    console.warn(`[${tag}] honeypot tripped — silent drop`);
    return { action: 'drop' };
  }

  const tokenEnforced = Boolean(process.env.FORM_TOKEN_SECRET);
  if (tokenEnforced) {
    const age = verifyFormToken(body?.formToken);
    if (age === null || age < MIN_SUBMIT_MS) {
      console.warn(`[${tag}] timing/token rejected (age=${age})`);
      return { action: 'reject', error: 'Could not verify your submission. Please reload the page and try again.' };
    }
  } else {
    console.warn(`[${tag}] FORM_TOKEN_SECRET unset — timing layer INACTIVE`);
  }

  const turnstile = await verifyTurnstile(body?.turnstileToken, ip);
  if (turnstile.configured && !turnstile.success) {
    console.warn(`[${tag}] Turnstile failed — rejected`);
    return { action: 'reject', error: 'Verification failed. Please try again.' };
  }
  if (!turnstile.configured) {
    console.warn(`[${tag}] TURNSTILE_SECRET_KEY unset — Turnstile layer INACTIVE`);
  }

  return { action: 'accept', formVerified: tokenEnforced };
}
