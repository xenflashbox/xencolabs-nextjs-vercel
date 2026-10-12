import type { Metadata } from 'next';
import { Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { TenantShell } from '@/components/local-os/os/shell';
import { PRESENTATION_TENANT, osBase, presentationOrigin } from '@/lib/local-os/presentation';
import { resolveTenant } from '@/lib/local-os/tenants/resolve';

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
export async function generateMetadata({ params }: { params: { tenant: string } }): Promise<Metadata> {
  const r = await resolveTenant(params.tenant);
  if (!r) return { title: 'Not found', robots: ROBOTS };
  const t = r.entry.config;
  const icon = t.branding.logos.favicon;
  // Presentation deployment: always the public custom domain (on Vercel, x-forwarded-host can be the
  // deployment's *.vercel.app alias, which the host gate 404s). Elsewhere: the requesting host.
  const host = headers().get('host') || 'xencolabs.com';
  const origin = PRESENTATION_TENANT
    ? presentationOrigin()
    : `${host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https'}://${host}`;
  const base = osBase(t.slug);
  const title = `${t.name} · Private Xenco Labs concept preview`;
  const description = `${t.site.heroSubtitle} A clickable concept of the website, office and technician app, built by Xenco Labs with sample data.`;
  // Absolute: on Vercel *preview* deployments Next resolves relative social-image URLs against the
  // branch URL (ignoring metadataBase), which the presentation host gate answers with 404.
  const image = { url: `${origin}${base}/share-image`, width: 1200, height: 630, alt: `${t.name} concept preview by Xenco Labs` };
  return {
    metadataBase: new URL(origin),
    title: { absolute: `${t.name} · private preview` },
    description,
    robots: ROBOTS,
    icons: { icon: [{ url: icon, type: icon.endsWith('.svg') ? 'image/svg+xml' : 'image/png' }], apple: [{ url: icon }] },
    openGraph: { type: 'website', siteName: 'Xenco Labs', url: base, title, description, images: [image] },
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
      <TenantShell tenant={r.entry.config} prospect={r.prospect}>{children}</TenantShell>
    </div>
  );
}
