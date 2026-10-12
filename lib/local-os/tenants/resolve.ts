/**
 * Server-side tenant resolution: the static registry (Nemesis, Jackson's, …) or a prospect preview
 * (slug lp-<token>) built from its sourced profile in LeadIntel. Returns null when unknown, when tenant
 * previews are off, or when a prospect preview has no profile yet.
 */
import { buildProspect, isProspectSlug, seedProspect, tokenOf, type ProspectEntryData } from '@/lib/local-os/prospect/build'
import { loadPreview } from '@/lib/local-os/preview'
import type { TenantEntry } from '@/lib/local-os/tenants'
import { getTenant, tenantPreviewsEnabled } from '@/lib/local-os/tenants'

export interface ResolvedTenant {
  entry: TenantEntry
  /** Present for prospect tenants: the serializable data the browser rebuilds the workspace from. */
  prospect?: ProspectEntryData
}

export async function resolveTenant(slug: string): Promise<ResolvedTenant | null> {
  if (!tenantPreviewsEnabled()) return null
  if (!isProspectSlug(slug)) {
    const entry = getTenant(slug)
    return entry ? { entry } : null
  }
  const token = tokenOf(slug)
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return null
  const m = await loadPreview(token)
  const profile = m?.config.profile
  if (!profile || profile.version !== 1) return null
  const data = buildProspect(token, profile)
  return { entry: { config: data.config, vertical: data.vertical, seed: (now) => seedProspect(data.config, data.vertical, now) }, prospect: data }
}
