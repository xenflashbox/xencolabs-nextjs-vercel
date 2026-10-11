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
  const width = IS_WORDMARK[surface] ? height * 4 : height;
  return (
    // Client brand asset served from the tenant's own folder.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={tenant.branding.logos[surface]} alt={tenant.name} width={width} height={height} style={{ height, width }} className={`shrink-0 ${className}`} />
  );
}
