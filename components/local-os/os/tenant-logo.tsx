'use client';

import type { LogoSurface, TenantConfig } from '@/lib/local-os/tenant-types';

const IS_WORDMARK: Record<LogoSurface, boolean> = {
  wordmarkOnLight: true,
  wordmarkOnDark: true,
  wordmarkMonoBlack: true,
  wordmarkMonoWhite: true,
  shieldOnLight: false,
  shieldOnDark: false,
  shieldMonoBlack: false,
  shieldMonoWhite: false,
  favicon: false,
};

/**
 * A client logo for one surface, rendered exactly as supplied: fixed height, width
 * from the asset's own ratio (wordmarks 4:1, shield 1:1), no filters or recolouring.
 */
export function TenantLogo({
  tenant,
  surface,
  height,
  className = '',
}: {
  tenant: TenantConfig;
  surface: LogoSurface;
  height: number;
  className?: string;
}) {
  // Mark + clean text wordmark (business has a round/square mark but no wide logo file).
  if (IS_WORDMARK[surface] && tenant.branding.wordmarkText) {
    const dark = /OnDark|MonoWhite/.test(surface);
    const markH = Math.round(height * 1.15);
    return (
      <span className={`shrink-0 ${className}`}><span className="inline-flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tenant.branding.logos.shieldOnLight} alt="" width={markH} height={markH} style={{ width: markH, height: markH }} className={`shrink-0 object-contain ${dark ? 'rounded-full bg-white p-0.5' : ''}`} />
        <span className="lo-display whitespace-nowrap font-bold leading-none [font-family:var(--font-display,inherit)]" style={{ fontSize: Math.round(height * 0.5), color: dark ? '#fff' : tenant.branding.surface }}>
          {tenant.branding.wordmarkText}
        </span>
        <span className="sr-only">{tenant.name}</span>
      </span></span>
    );
  }
  const aspect = IS_WORDMARK[surface] ? tenant.branding.wordmarkAspect ?? 4 : tenant.branding.markAspect ?? 1;
  // Squarer wordmarks (aspect < 3) read small at a 4:1 wordmark's height; give them more height.
  if (IS_WORDMARK[surface] && aspect < 3) height = Math.round(height * 1.4);
  if (!IS_WORDMARK[surface] && tenant.branding.markScale) height = Math.round(height * tenant.branding.markScale);
  const width = Math.round(height * aspect);
  const img = (
    // Client brand asset served from the tenant's own folder.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={tenant.branding.logos[surface]} alt={tenant.name} width={width} height={height} style={{ height, width }} className={`shrink-0 ${tenant.branding.logoPlate && /OnDark|MonoWhite/.test(surface) ? '' : className}`} />
  );
  // Light-only artwork on a dark surface: a light plate behind it, artwork untouched.
  if (tenant.branding.logoPlate && /OnDark|MonoWhite/.test(surface)) {
    return (
      <span className={`inline-flex shrink-0 rounded-md px-2 py-1 ${className}`} style={{ background: tenant.branding.logoPlate }}>
        {img}
      </span>
    );
  }
  return img;
}
