import { NextResponse } from 'next/server';
import { renderShareCard, toDataUrl } from '@/lib/local-os/og/card';
import { PRESENTATION_TENANT, presentationHostAllowed, presentationTenantAllowedForHost } from '@/lib/local-os/presentation';
import { presignR2Get, tenantMediaConfig } from '@/lib/local-os/r2-presign';
import { MEDIA_ROUTE, mediaObjectKey } from '@/lib/local-os/tenant-media';
import { resolveTenant } from '@/lib/local-os/tenants/resolve';

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
 * Link-preview image for a tenant site (og:image / twitter:image): its own hero photo and on-dark
 * wordmark (read server-side from the private bucket), headline and service area. Nemesis uses a
 * customer-facing service footer; other preview tenants retain the private-concept label.
 */
export async function GET(req: Request, { params }: { params: { tenant: string } }) {
  const host = req.headers.get('host');
  const presentationOk =
    !PRESENTATION_TENANT || (params.tenant.startsWith('lp-')
      ? presentationHostAllowed(host)
      : presentationTenantAllowedForHost(params.tenant, host));
  const entry = presentationOk ? (await resolveTenant(params.tenant))?.entry ?? null : null;
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
      logoPlate: t.branding.logoPlate,
      logoAspect: t.branding.wordmarkAspect ?? 4,
      photo,
      accent: t.branding.primary,
      surface: t.branding.surface,
      ribbon: params.tenant === 'nemesis-fire'
        ? 'INSPECTION · TESTING · MAINTENANCE · REPAIR'
        : params.tenant === 'jacksons-paving'
          ? 'PAVING · REPAIR · SEALCOATING · STRIPING'
          : t.site.serviceAreas.slice(0, 3).join(' · ').toUpperCase(),
      footerLabel: presentationOk ? (params.tenant === 'nemesis-fire' ? '707-353-4600' : t.phone) : undefined,
      points: t.site.credibility,
    },
    presentationOk ? {} : NOINDEX,
  );
}
