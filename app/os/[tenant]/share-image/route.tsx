import { NextResponse } from 'next/server';
import { renderShareCard, toDataUrl } from '@/lib/local-os/og/card';
import { PRESENTATION_TENANT, presentationHostAllowed } from '@/lib/local-os/presentation';
import { presignR2Get, tenantMediaConfig } from '@/lib/local-os/r2-presign';
import { MEDIA_ROUTE, mediaObjectKey } from '@/lib/local-os/tenant-media';
import { getTenant, tenantPreviewsEnabled } from '@/lib/local-os/tenants';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NOINDEX = { 'X-Robots-Tag': 'noindex, nofollow, noarchive, noimageindex' };

/** Signed URL for a tenant asset referenced as `/os-media/<slug>/<key>`; null when media is not configured. */
function signedAsset(slug: string, src: string): string | null {
  const cfg = tenantMediaConfig();
  const prefix = `${MEDIA_ROUTE}/${slug}/`;
  if (!cfg || !src.startsWith(prefix)) return null;
  return presignR2Get(cfg, mediaObjectKey(slug, src.slice(prefix.length)), 120);
}

/**
 * Link-preview image for a tenant preview (og:image / twitter:image): the tenant's own hero photo
 * and on-dark wordmark (read server-side from the private bucket), headline, service area and the
 * private-concept ribbon. Same gates as the preview itself.
 */
export async function GET(req: Request, { params }: { params: { tenant: string } }) {
  const presentationOk =
    !PRESENTATION_TENANT || (params.tenant === PRESENTATION_TENANT && presentationHostAllowed(req.headers.get('host')));
  const entry = presentationOk && tenantPreviewsEnabled() ? getTenant(params.tenant) : null;
  if (!entry) return new NextResponse('Not found', { status: 404, headers: NOINDEX });
  const t = entry.config;
  const [photo, logo] = await Promise.all([
    toDataUrl(signedAsset(t.slug, t.media.hero.src)),
    toDataUrl(signedAsset(t.slug, t.branding.logos.wordmarkOnDark)),
  ]);
  return renderShareCard(
    {
      eyebrow: t.site.serviceAreas.join(' · '),
      title: t.site.heroTitle,
      brandName: t.name,
      logo,
      photo,
      accent: t.branding.primary,
      surface: t.branding.surface,
      ribbon: `Private Xenco Labs concept preview for ${t.name}`,
      points: t.site.credibility,
    },
    NOINDEX,
  );
}
