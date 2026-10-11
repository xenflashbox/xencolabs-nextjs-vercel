import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TenantShell } from '@/components/local-os/os/shell';
import { getTenant, tenantPreviewsEnabled } from '@/lib/local-os/tenants';

export const dynamic = 'force-dynamic';
const ROBOTS: Metadata['robots'] = { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } };

/** Per-tenant tab title and favicon (the tenant's compact mark); always noindex. */
export function generateMetadata({ params }: { params: { tenant: string } }): Metadata {
  const entry = tenantPreviewsEnabled() ? getTenant(params.tenant) : null;
  if (!entry) return { title: 'Not found', robots: ROBOTS };
  const icon = entry.config.branding.logos.favicon;
  return {
    title: { absolute: `${entry.config.name} · private preview` },
    robots: ROBOTS,
    icons: { icon: [{ url: icon, type: 'image/svg+xml' }], apple: [{ url: icon }] },
  };
}

/** Unknown tenant, or tenant previews switched off (the production default): 404. */
export default function TenantLayout({ children, params }: { children: React.ReactNode; params: { tenant: string } }) {
  const entry = tenantPreviewsEnabled() ? getTenant(params.tenant) : null;
  if (!entry) notFound();
  return <TenantShell tenant={entry.config}>{children}</TenantShell>;
}
