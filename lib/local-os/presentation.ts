/**
 * Dedicated presentation deployment (its own Vercel project, served at preview.xencolabs.com).
 * Set only on that project: NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT=<slug>, and optionally
 * LOCAL_OS_PRESENTATION_HOSTS (comma list; default preview.xencolabs.com). The general Xenco
 * project sets neither, so its routes and auth policy are untouched.
 */
export const PRESENTATION_TENANT = process.env.NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT || '';

const PRESENTATION_HOSTS = (process.env.LOCAL_OS_PRESENTATION_HOSTS || 'preview.xencolabs.com')
  .split(',')
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean);

/** True when `host` may serve the public presentation. Any other host gets a 404. */
export function presentationHostAllowed(host: string | null): boolean {
  return PRESENTATION_HOSTS.includes((host || '').toLowerCase());
}
