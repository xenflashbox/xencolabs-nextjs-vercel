import { NextResponse } from 'next/server';
import { presignR2Get, tenantMediaConfig } from '@/lib/local-os/r2-presign';
import { mediaObjectKey, referencedAssetKeys } from '@/lib/local-os/tenant-media';
import { PRESENTATION_TENANT, isPresentationTenant, presentationHostAllowed } from '@/lib/local-os/presentation';
import { getTenant, tenantPreviewsEnabled } from '@/lib/local-os/tenants';

export const dynamic = 'force-dynamic';

const PRIVATE_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive, noimageindex',
  'Cache-Control': 'private, no-store',
  'Referrer-Policy': 'no-referrer',
};

/**
 * Gated tenant media. Production (previews off) → 404. Unknown tenant or a key the tenant's
 * configuration does not reference → 404, so the bucket cannot be enumerated through this route.
 * On the presentation deployment, only the presentation tenant on an allowed host is served (media
 * requests skip middleware, so the host check lives here too). Otherwise a 5-minute presigned
 * redirect into the private bucket.
 */
export function GET(req: Request, { params }: { params: { tenant: string; key: string[] } }) {
  const presentationOk =
    !PRESENTATION_TENANT || (isPresentationTenant(params.tenant) && presentationHostAllowed(req.headers.get('host')));
  const entry = presentationOk && tenantPreviewsEnabled() ? getTenant(params.tenant) : null;
  const key = (params.key ?? []).join('/');
  if (!entry || !key || key.includes('..') || !referencedAssetKeys(entry.config, params.tenant).has(key)) {
    return new NextResponse('Not found', { status: 404, headers: PRIVATE_HEADERS });
  }
  const cfg = tenantMediaConfig();
  if (!cfg) return new NextResponse('Tenant media is not configured', { status: 503, headers: PRIVATE_HEADERS });
  return NextResponse.redirect(presignR2Get(cfg, mediaObjectKey(params.tenant, key), 300), { status: 302, headers: PRIVATE_HEADERS });
}
