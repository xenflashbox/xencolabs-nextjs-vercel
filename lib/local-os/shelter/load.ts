/**
 * Server-only: reads a shelter tenant's dated demo snapshot from the private R2 bucket and resolves every
 * photo to the allowlisted media route. Cached in memory for five minutes per key; a failed read is not cached.
 */
import { presignR2Get, tenantMediaConfig } from '@/lib/local-os/r2-presign'
import { mediaObjectKey, tenantAsset } from '@/lib/local-os/tenant-media'
import type { ShelterData } from '@/lib/local-os/shelter/types'

const TTL_MS = 5 * 60 * 1000
const cache = new Map<string, { at: number; data: ShelterData }>()

export async function loadShelterData(slug: string, dataKey: string): Promise<ShelterData | null> {
  const id = `${slug}/${dataKey}`
  const hit = cache.get(id)
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data
  const cfg = tenantMediaConfig()
  if (!cfg) return null
  try {
    const res = await fetch(presignR2Get(cfg, mediaObjectKey(slug, dataKey), 120), { cache: 'no-store' })
    if (!res.ok) return null
    const data = (await res.json()) as ShelterData
    for (const a of data.snapshot.animals) for (const p of a.photos) p.src = tenantAsset(slug, p.key)
    cache.set(id, { at: Date.now(), data })
    return data
  } catch {
    return null
  }
}
