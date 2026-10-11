/**
 * Local OS tenant registry. Adding a client is adding a config + a seed here and
 * (if new) a vertical pack — never a new set of screens.
 */
import type { DemoState } from '@/lib/local-os/demo-types'
import type { TenantConfig, VerticalPack } from '@/lib/local-os/tenant-types'
import { NEMESIS_FIRE, seedNemesisFire } from '@/lib/local-os/tenants/nemesis-fire'
import { FIRE_PROTECTION } from '@/lib/local-os/verticals/fire-protection'

export interface TenantEntry {
  config: TenantConfig
  vertical: VerticalPack
  seed: (now?: Date) => DemoState
}

const TENANTS: Record<string, TenantEntry> = {
  [NEMESIS_FIRE.slug]: { config: NEMESIS_FIRE, vertical: FIRE_PROTECTION, seed: seedNemesisFire },
}

export function getTenant(slug: string): TenantEntry | null {
  return Object.prototype.hasOwnProperty.call(TENANTS, slug) ? (TENANTS[slug] as TenantEntry) : null
}

/**
 * Tenant previews never render on production unless explicitly switched on.
 * Vercel preview deployments of this project sit behind Vercel Authentication,
 * which is what keeps the alpha private; merging to main cannot expose it.
 */
export function tenantPreviewsEnabled(): boolean {
  if (process.env.VERCEL_ENV === 'production') return process.env.LOCAL_OS_TENANT_PREVIEWS === 'on'
  return true
}
