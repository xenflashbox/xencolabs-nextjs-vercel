import type { Metadata } from 'next';
import { Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { TenantShell } from '@/components/local-os/os/shell';
import { osBase } from '@/lib/local-os/presentation';
import { getTenant, tenantPreviewsEnabled } from '@/lib/local-os/tenants';

export const dynamic = 'force-dynamic';

// "Industrial field documentation" type system for tenants that ask for it: condensed display
// headings and monospaced field labels. Loaded only under /os, never on the Xenco site.
const display = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono-field', display: 'swap' });
const ROBOTS: Metadata['robots'] = { index: false, follow: false, noarchive: true, noimageindex: true, nocache: true, googleBot: { index: false, follow: false, noarchive: true, noimageindex: true } };

/**
 * Per-tenant tab title, favicon (the tenant's compact mark) and link-preview card
 * (og:image / twitter:image), absolute on whichever host serves the preview; always noindex.
 */
export function generateMetadata({ params }: { params: { tenant: string } }): Metadata {
  const entry = tenantPreviewsEnabled() ? getTenant(params.tenant) : null;
  if (!entry) return { title: 'Not found', robots: ROBOTS };
  const t = entry.config;
  const icon = t.branding.logos.favicon;
  const h = headers();
  const host = h.get('x-forwarded-host') || h.get('host') || 'preview.xencolabs.com';
  const proto = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https';
  const base = osBase(t.slug);
  const title = `${t.name} · Private Xenco Labs concept preview`;
  const description = `${t.site.heroSubtitle} A clickable concept of the website, office and technician app, built by Xenco Labs with sample data.`;
  const image = { url: `${base}/share-image`, width: 1200, height: 630, alt: `${t.name} concept preview by Xenco Labs` };
  return {
    metadataBase: new URL(`${proto}://${host}`),
    title: { absolute: `${t.name} · private preview` },
    description,
    robots: ROBOTS,
    icons: { icon: [{ url: icon, type: 'image/svg+xml' }], apple: [{ url: icon }] },
    openGraph: { type: 'website', siteName: 'Xenco Labs', url: base, title, description, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

/** Unknown tenant, or tenant previews switched off (the production default): 404. */
export default function TenantLayout({ children, params }: { children: React.ReactNode; params: { tenant: string } }) {
  const entry = tenantPreviewsEnabled() ? getTenant(params.tenant) : null;
  if (!entry) notFound();
  const fonts = entry.config.branding.typography === 'industrial' ? `${display.variable} ${mono.variable}` : '';
  return (
    <div className={fonts}>
      <TenantShell tenant={entry.config}>{children}</TenantShell>
    </div>
  );
}
