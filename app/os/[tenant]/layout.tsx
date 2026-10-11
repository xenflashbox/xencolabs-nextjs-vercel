import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TenantShell } from '@/components/local-os/os/shell';
import { getTenant, tenantPreviewsEnabled } from '@/lib/local-os/tenants';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Private preview',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

/** Unknown tenant, or tenant previews switched off (the production default): 404. */
export default function TenantLayout({ children, params }: { children: React.ReactNode; params: { tenant: string } }) {
  const entry = tenantPreviewsEnabled() ? getTenant(params.tenant) : null;
  if (!entry) notFound();
  return <TenantShell tenant={entry.config}>{children}</TenantShell>;
}
