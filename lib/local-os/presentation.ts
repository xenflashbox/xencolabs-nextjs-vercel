/**
 * Dedicated presentation deployment (its own Vercel project, served at preview.xencolabs.com).
 * Set only on that project: NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT=<slug>[,<slug>…] (the first
 * is where `/` lands), and optionally LOCAL_OS_PRESENTATION_HOSTS (comma list; default
 * preview.xencolabs.com). The general Xenco project sets neither, so its routes and auth policy
 * are untouched.
 */
export const PRESENTATION_TENANTS: string[] = (process.env.NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
/** Presentation mode is on when non-empty; the root `/` redirects here. */
export const PRESENTATION_TENANT = PRESENTATION_TENANTS[0] || '';

export function isPresentationTenant(slug: string): boolean {
  return PRESENTATION_TENANTS.includes(slug);
}

const PRESENTATION_HOSTS = (process.env.LOCAL_OS_PRESENTATION_HOSTS || 'preview.xencolabs.com')
  .split(',')
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);

/** Canonical public origin of the presentation (first allowed host), for absolute og:image/og:url. */
export function presentationOrigin(): string {
  return `https://${PRESENTATION_HOSTS[0] || 'preview.xencolabs.com'}`;
}

/** True when `host` may serve the public presentation. Any other host gets a 404. */
export function presentationHostAllowed(host: string | null): boolean {
  return PRESENTATION_HOSTS.includes((host || '').toLowerCase());
}

/**
 * URL base for a tenant's preview: the clean `/<slug>` on the presentation deployment (middleware
 * rewrites it to `/os/<slug>`), `/os/<slug>` everywhere else. Server- and client-safe.
 */
export function osBase(slug: string): string {
  if (slug.startsWith('lp-')) return `/lp/${slug.slice(3)}`;
  return isPresentationTenant(slug) ? `/${slug}` : `/os/${slug}`;
}
