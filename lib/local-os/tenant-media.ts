/**
 * Tenant media lives in the private R2 bucket (`tenants/<slug>/<key>`), never in this public
 * repository. Tenant configuration holds only logical keys, resolved to the gated media route
 * `/os-media/<slug>/<key>`, which 404s on production and redirects authorised preview requests to a
 * short-lived presigned URL.
 */
export const MEDIA_ROUTE = '/os-media';

export const tenantAsset = (slug: string, key: string) => `${MEDIA_ROUTE}/${slug}/${key}`;

export const mediaObjectKey = (slug: string, key: string) => `tenants/${slug}/${key}`;

/** Every asset key a tenant's configuration references: the media route serves these and nothing else. */
export function referencedAssetKeys(config: unknown, slug: string): Set<string> {
  const prefix = `${MEDIA_ROUTE}/${slug}/`;
  const out = new Set<string>();
  const walk = (v: unknown) => {
    if (typeof v === 'string') {
      if (v.startsWith(prefix)) out.add(v.slice(prefix.length));
    } else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(config);
  return out;
}
