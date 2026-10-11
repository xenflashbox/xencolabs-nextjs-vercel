import { NextResponse } from 'next/server';
import { presignR2Get, tenantMediaConfig } from '@/lib/local-os/r2-presign';
import { mediaObjectKey, referencedAssetKeys } from '@/lib/local-os/tenant-media';
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
 * Otherwise a 5-minute presigned redirect into the private bucket. The deployment's own access
 * protection (Vercel Authentication / share link) sits in front of this route.
 */
export function GET(_req: Request, { params }: { params: { tenant: string; key: string[] } }) {
  const entry = tenantPreviewsEnabled() ? getTenant(params.tenant) : null;
  const key = (params.key ?? []).join('/');
  if (!entry || !key || key.includes('..') || !referencedAssetKeys(entry.config, params.tenant).has(key)) {
    return new NextResponse('Not found', { status: 404, headers: PRIVATE_HEADERS });
  }
  const cfg = tenantMediaConfig();
  if (!cfg) return new NextResponse('Tenant media is not configured', { status: 503, headers: PRIVATE_HEADERS });
  return NextResponse.redirect(presignR2Get(cfg, mediaObjectKey(params.tenant, key), 300), { status: 302, headers: PRIVATE_HEADERS });
}
