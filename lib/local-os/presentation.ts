/**
 * Host-aware customer and prospect presentations served by the main Xenco Labs Vercel project.
 * NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT is the tenant allowlist; the first slug is the preview
 * host's root redirect. LOCAL_OS_PRESENTATION_HOSTS is the comma-separated host allowlist.
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

/**
 * Prospect demos live on preview.xencolabs.com. The Nemesis customer site keeps its
 * canonical xencolabs.com URL; other tenant slugs are served only from the demo host.
 */
export function presentationTenantAllowedForHost(slug: string, host: string | null): boolean {
  const hostname = (host || '').split(':')[0].toLowerCase();
  if (!isPresentationTenant(slug)) return false;
  if (hostname === 'preview.xencolabs.com') return true;
  return slug === 'nemesis-fire' && (hostname === 'xencolabs.com' || hostname === 'www.xencolabs.com');
}

export function presentationOriginForTenant(slug: string): string {
  return slug === 'nemesis-fire' ? 'https://xencolabs.com' : 'https://preview.xencolabs.com';
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
