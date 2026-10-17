import { notFound } from 'next/navigation'
import { resolveTenant } from '@/lib/local-os/tenants/resolve'

/** Shelter-only routes 404 for every other tenant. */
export async function isShelter(slug: string): Promise<boolean> {
  return (await resolveTenant(slug))?.entry.config.kind === 'shelter'
}
export async function requireShelter(slug: string): Promise<void> {
  if (!(await isShelter(slug))) notFound()
}
