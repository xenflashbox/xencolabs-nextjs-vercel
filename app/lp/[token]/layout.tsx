import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadPreview } from '@/lib/local-os/preview';
import { LABEL, TEMPLATES } from '@/lib/local-os/templates';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Private workflow concept',
  description: LABEL,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default async function PreviewLayout({ children, params }: { children: React.ReactNode; params: { token: string } }) {
  const m = await loadPreview(params.token);
  if (!m) notFound();
  const t = TEMPLATES[m.template];
  const accent = m.config.branding?.theme_color || t.accent;
  const base = `/lp/${params.token}`;
  return (
    <div className="min-h-[100dvh] bg-white text-slate-900" style={{ ['--accent' as string]: accent }}>
      <div role="note" className="sticky top-0 z-30 bg-amber-300 px-4 py-1.5 text-center text-xs font-semibold text-amber-950">
        {LABEL} · prepared by Xenco Labs · sample prices and data
      </div>
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            {m.config.branding?.og_image && (
              // Public branding image from the business's own website.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.config.branding.og_image} alt="" className="h-10 w-10 shrink-0 rounded object-cover" referrerPolicy="no-referrer" />
            )}
            <div className="min-w-0">
              <p className="truncate font-semibold">{m.config.business.name}</p>
              <p className="text-xs text-slate-500">{m.config.business.city}{m.config.business.service_area ? ` · ${m.config.business.service_area}` : ''}</p>
            </div>
          </div>
          <nav className="flex gap-1 text-sm">
            <a href={base} className="rounded-md px-3 py-1.5 hover:bg-slate-100">Services</a>
            <a href={`${base}/estimate`} className="rounded-md px-3 py-1.5 hover:bg-slate-100">Estimate & book</a>
            <a href={`${base}/system`} className="rounded-md px-3 py-1.5 hover:bg-slate-100">How it runs</a>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mt-16 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl space-y-1 px-4 py-6 text-xs text-slate-500">
          <p><strong>{LABEL}.</strong> Built by Xenco Labs to show how {m.config.business.name} could take estimates, bookings and payments online.</p>
          <p>Uses only public information (business name, city, public service categories and Google rating). Prices, customers, documents and payments are sandbox samples. Nothing here is connected to a live calendar, phone line or payment account, and it is not affiliated with or endorsed by {m.config.business.name}.</p>
        </div>
      </footer>
    </div>
  );
}
