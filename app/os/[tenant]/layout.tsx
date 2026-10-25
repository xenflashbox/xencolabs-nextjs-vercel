import type { Metadata } from 'next';
import { Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { TenantShell } from '@/components/local-os/os/shell';
import { ShelterShell } from '@/components/local-os/shelter/shelter-shell';
import { osBase, presentationOriginForTenant, presentationTenantAllowedForHost } from '@/lib/local-os/presentation';
import { resolveTenant } from '@/lib/local-os/tenants/resolve';

export const dynamic = 'force-dynamic';

// "Industrial field documentation" type system for tenants that ask for it: condensed display
// headings and monospaced field labels. Loaded only under /os, never on the Xenco site.
const display = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono-field', display: 'swap' });
const ROBOTS: Metadata['robots'] = { index: false, follow: false, noarchive: true, noimageindex: true, nocache: true, googleBot: { index: false, follow: false, noarchive: true, noimageindex: true } };
const NEMESIS_ROBOTS: Metadata['robots'] = { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noarchive: true } };

/**
 * Per-tenant tab title, favicon (the tenant's compact mark) and link-preview card
 * (og:image / twitter:image), absolute on the canonical customer or demo host.
 */
export async function generateMetadata({ params }: { params: { tenant: string } }): Promise<Metadata> {
  const r = await resolveTenant(params.tenant);
  if (!r) return { title: 'Not found', robots: ROBOTS };
  const t = r.entry.config;
  const icon = t.branding.logos.favicon;
  // Use each tenant's canonical Xenco host; a Vercel alias can be rejected by the host gate.
  const host = headers().get('host') || 'xencolabs.com';
  const presentation = presentationTenantAllowedForHost(t.slug, host);
  const origin = presentation
    ? presentationOriginForTenant(t.slug)
    : `${host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https'}://${host}`;
  const base = osBase(t.slug);
  const nemesis = t.slug === 'nemesis-fire';
  const title = presentation
    ? (nemesis ? 'Nemesis Fire | Fire Protection Services' : `${t.name} | Asphalt Paving & Repair`)
    : `${t.name} · Private Xenco Labs concept preview`;
  const description = presentation
    ? t.site.heroSubtitle
    : `${t.site.heroSubtitle} A clickable concept of the website, office and technician app, built by Xenco Labs with sample data.`;
  // Absolute: on Vercel *preview* deployments Next resolves relative social-image URLs against the
  // branch URL (ignoring metadataBase), which the presentation host gate answers with 404.
  const image = { url: `${origin}${base}/share-image`, type: 'image/jpeg', width: 1200, height: 630, alt: presentation ? t.name : `${t.name} concept preview by Xenco Labs` };
  return {
    metadataBase: new URL(origin),
    title: { absolute: title },
    description,
    robots: presentation ? { index: true, follow: true } : ROBOTS,
    icons: { icon: [{ url: icon, type: icon.endsWith('.svg') ? 'image/svg+xml' : 'image/png' }], apple: [{ url: icon }] },
    openGraph: { type: 'website', siteName: presentation ? t.name : 'Xenco Labs', url: `${origin}${base}`, title, description, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

const BRAND_CSS = `
[data-heading-case="none"] .lo-display{text-transform:none!important;letter-spacing:-0.02em}
[data-theme="brand"] .lo-round{border-radius:var(--lo-radius)}
[data-theme="brand"] .lo-btn{border-radius:9999px}
[data-theme="brand"] .lo-accent{color:var(--accent)}
`;

/** Unknown tenant, or tenant previews switched off (the production default): 404. */
export default async function TenantLayout({ children, params }: { children: React.ReactNode; params: { tenant: string } }) {
  const r = await resolveTenant(params.tenant);
  if (!r) notFound();
  const b = r.entry.config.branding;
  const fonts = b.typography === 'industrial' ? `${display.variable} ${mono.variable}` : '';
  const th = b.theme;
  const families = b.typography === 'brand' ? [th?.headingFont, th?.bodyFont].filter((f): f is string => Boolean(f)) : [];
  const fontHref = families.length
    ? `https://fonts.googleapis.com/css2?${Array.from(new Set(families)).map((f) => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@400;500;600;700`).join('&')}&display=swap`
    : null;
  const style: Record<string, string> = {};
  if (b.typography === 'brand') {
    if (th?.headingFont) style['--font-display'] = `'${th.headingFont}', ui-sans-serif, system-ui, sans-serif`;
    if (th?.bodyFont) { style.fontFamily = `'${th.bodyFont}', ui-sans-serif, system-ui, sans-serif`; style['--font-mono-field'] = `'${th.bodyFont}', ui-sans-serif, system-ui, sans-serif`; }
    style['--lo-radius'] = th?.radius ?? '12px';
    style['--accent'] = th?.accent ?? b.primary;
  }
  return (
    <div className={fonts} style={style} data-theme={b.typography === 'brand' ? 'brand' : undefined} data-heading-case={th?.headingCase === 'none' ? 'none' : undefined}>
      {fontHref ? <link rel="stylesheet" href={fontHref} /> : null}
      {b.typography === 'brand' ? <style dangerouslySetInnerHTML={{ __html: BRAND_CSS }} /> : null}
      {r.entry.config.kind === 'shelter' ? (
        <ShelterShell tenant={r.entry.config}>{children}</ShelterShell>
      ) : (
        <TenantShell tenant={r.entry.config} prospect={r.prospect}>{children}</TenantShell>
      )}
    </div>
  );
}
