import crypto from 'crypto';

/**
 * HMAC-signed access tokens for sharing gated documents via expiring links.
 *
 * Format: `<base64url(payload)>.<base64url(HMAC-SHA256(payload))>`
 *
 * Server-only — imports Node's `crypto`. The document registry that both the
 * server and the admin UI need lives in `lib/protected-documents.ts`.
 */

export interface AccessTokenPayload {
  /** Recipient slug, recorded in access logs. */
  r: string;
  /** Protected document key (see PROTECTED_DOCUMENTS). */
  t: string;
  /** Expiry as epoch milliseconds. */
  e: number;
}

/** Constant-time string comparison that does not leak length via early return. */
export function timingSafeMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  // timingSafeEqual throws on length mismatch, so hash first to equalise length
  // while still comparing in constant time.
  const hashA = crypto.createHash('sha256').update(bufA).digest();
  const hashB = crypto.createHash('sha256').update(bufB).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export function signAccessToken(
  payload: AccessTokenPayload,
  secret: string
): string {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${signature}`;
}

/**
 * Validate a token's signature and expiry.
 * Returns the payload when valid, or null for any malformed, tampered, or
 * expired token. Callers should treat null as "deny access".
 */
export function verifyAccessToken(
  token: string,
  secret: string
): AccessTokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2) {
    return null;
  }

  const [encoded, signature] = parts;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(encoded)
    .digest('base64url');

  if (!timingSafeMatch(signature, expected)) {
    return null;
  }

  let payload: AccessTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
  } catch (error) {
    console.error('Access token payload is not valid JSON:', error);
    return null;
  }

  if (
    typeof payload.r !== 'string' ||
    typeof payload.t !== 'string' ||
    typeof payload.e !== 'number'
  ) {
    return null;
  }

  if (Date.now() > payload.e) {
    return null;
  }

  return payload;
}
