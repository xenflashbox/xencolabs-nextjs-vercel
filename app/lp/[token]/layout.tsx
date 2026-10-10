import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadPreview } from '@/lib/local-os/preview';
import { LABEL } from '@/lib/local-os/templates';
import { lookFor } from '@/lib/local-os/families';
import { Monogram } from './_ui/shared';
import './lp.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Private workflow concept',
  description: LABEL,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default async function PreviewLayout({ children, params }: { children: React.ReactNode; params: { token: string } }) {
  const m = await loadPreview(params.token);
  if (!m) notFound();
  const { family, theme } = lookFor(m);
  const b = m.config.business;
  const base = `/lp/${params.token}`;
  const vars = { '--accent': theme.accent, '--accent-soft': theme.accentSoft, '--deep': theme.deep, '--highlight': theme.highlight } as React.CSSProperties;
  const nav = [[base, 'Services'], [`${base}/estimate`, 'Estimate & book'], [`${base}/system`, 'How it runs']];
  return (
    <div className={`lp lp-${family.key} min-h-[100dvh]`} style={vars} data-palette={theme.palette}>
      <div role="note" className="sticky top-0 z-30 bg-amber-300 px-4 py-1.5 text-center text-xs font-semibold text-amber-950">
        {LABEL} · prepared by Xenco Labs · sample prices and data
      </div>
      <header className="lp-header">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
          <a href={base} className="flex min-w-0 items-center gap-3">
            <Monogram name={b.name} />
            <span className="min-w-0">
              <span className="lp-brand block truncate">{b.name}</span>
              <span className="lp-brand-sub block truncate">{family.eyebrow} · {b.city}{b.service_area ? ` · ${b.service_area}` : ''}</span>
            </span>
          </a>
          <nav className="lp-nav -mx-1 flex max-w-full gap-1 overflow-x-auto text-sm" aria-label="Preview pages">
            {nav.map(([href, label]) => <a key={href} href={href} className="whitespace-nowrap">{label}</a>)}
          </nav>
        </div>
      </header>
      {children}
      <footer className="lp-footer mt-16">
        <div className="mx-auto max-w-6xl space-y-1 px-4 py-6 text-xs">
          <p><strong>{LABEL}.</strong> A concept of how {b.name} could take estimates, bookings and payments online.</p>
          <p>Uses only public information (business name, city, public service categories and Google rating{m.config.branding?.og_image ? ', plus the image published on the business’s own website' : ''}). Prices, customers, documents and payments are sandbox samples. Nothing here is connected to a live calendar, phone line or payment account, and it is not affiliated with or endorsed by {b.name}.</p>
          <p className="pt-2 opacity-80">Prepared by Xenco Labs</p>
        </div>
      </footer>
    </div>
  );
}
