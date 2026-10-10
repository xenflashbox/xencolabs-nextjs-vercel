import { notFound } from 'next/navigation';
import { Check, Star, Calculator, CalendarCheck, Camera } from 'lucide-react';
import { eventsUrl, loadPreview } from '@/lib/local-os/preview';
import { TEMPLATES } from '@/lib/local-os/templates';
import { PageTracker, TrackedLink } from './_ui/tracker';

export default async function PreviewServicePage({ params }: { params: { token: string } }) {
  const m = await loadPreview(params.token);
  if (!m) notFound();
  const t = TEMPLATES[m.template];
  const ev = eventsUrl(params.token);
  const b = m.config.business;
  const icons = [Calculator, CalendarCheck, Camera];
  return (
    <main>
      <PageTracker eventsUrl={ev} token={params.token} page="service" />
      <section className="border-b border-slate-200" style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 10%, white), white)' }}>
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12 md:grid-cols-[1.4fr_1fr] md:py-16">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">{t.heroTitle(b.city)}</h1>
            <p className="max-w-prose text-lg text-slate-600">{t.heroSub}</p>
            {b.rating ? (
              <p className="inline-flex items-center gap-1.5 text-sm text-slate-700"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {b.rating} on Google · {b.review_count} reviews</p>
            ) : null}
            <div className="flex flex-wrap gap-3 pt-2">
              <TrackedLink eventsUrl={ev} event="cta_click" page="service" href={`/lp/${params.token}/estimate`}
                className="rounded-lg px-5 py-3 font-semibold text-white" style={{ background: 'var(--accent)' }}>Get my estimate</TrackedLink>
              <a href={`/lp/${params.token}/system`} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800">See how it runs</a>
            </div>
          </div>
          <ul className="grid content-start gap-3 rounded-xl border border-slate-200 bg-white p-5">
            {t.promises.map((p, i) => {
              const I = icons[i % icons.length];
              return <li key={p} className="flex items-center gap-3"><I className="h-5 w-5" style={{ color: 'var(--accent)' }} /><span className="font-medium">{p}</span></li>;
            })}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-4 text-xl font-semibold">Services</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {m.config.services.map((s) => (
            <li key={s} className="flex items-start gap-2 rounded-lg border border-slate-200 p-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} /><span>{s}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto max-w-5xl px-4">
        <div className="grid gap-4 rounded-xl bg-slate-900 p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-xl font-semibold">Price it and book it in one visit</h2>
            <p className="text-slate-300">Customers answer a few questions, see a written estimate and pick a time. The owner gets the job, not a voicemail.</p>
          </div>
          <TrackedLink eventsUrl={ev} event="cta_click" page="service" href={`/lp/${params.token}/estimate`}
            className="rounded-lg bg-white px-5 py-3 text-center font-semibold text-slate-900">Try the estimate</TrackedLink>
        </div>
      </section>
    </main>
  );
}
