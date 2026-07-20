/**
 * Registry of documents that can be shared behind an expiring, signed magic link.
 *
 * Both the admin generator UI and the token API read from this list, so adding a
 * new gated route only requires an entry here.
 *
 * This module must stay free of Node-only imports (no `crypto`, no `fs`) so it
 * can be imported by the client-side admin UI. Signing/verifying lives in
 * `lib/access-tokens.ts`.
 */

export interface ProtectedDocument {
  /** Stable key stored inside the signed token payload. */
  key: string;
  /** Human-readable label shown in the generator UI. */
  label: string;
  /** Route the magic link points at, relative to the site base URL. */
  route: string;
}

/**
 * No gated documents are configured yet.
 *
 * The previous entry (a client pitch deck) lived on a separate deployment that
 * has since been retired, so shipping it here would generate links to a 404.
 * Add entries as gated routes land, e.g.:
 *
 *   { key: 'pitch', label: 'Investor Pitch', route: '/pitch' }
 */
export const PROTECTED_DOCUMENTS: readonly ProtectedDocument[] = [];

export const MIN_EXPIRY_DAYS = 1;
export const MAX_EXPIRY_DAYS = 365;
export const DEFAULT_EXPIRY_DAYS = 60;
export const MAX_RECIPIENT_LENGTH = 64;

export function getProtectedDocument(key: string): ProtectedDocument | undefined {
  return PROTECTED_DOCUMENTS.find((doc) => doc.key === key);
}

/**
 * Normalise a recipient name into the slug recorded in access logs.
 * Returns an empty string when nothing usable remains.
 */
export function slugifyRecipient(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
