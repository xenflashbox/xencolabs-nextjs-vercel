'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { useDemo } from '@/components/local-os/os/demo-store';
import { Guardrail, osHref } from '@/components/local-os/os/ui';

/** A customer-facing service page, generated from the trade module's service definition. */
export function SiteService({ slug }: { slug: string }) {
  const { tenant, vertical } = useDemo();
  const svc = vertical.services.find((x) => x.slug === slug && tenant.laneIds.includes(x.laneId));
  const others = vertical.services.filter((x) => x.slug !== slug && tenant.laneIds.includes(x.laneId));
  if (!svc) return <p className="mx-auto max-w-6xl p-6 text-sm">No such service.</p>;
  const template = vertical.reportTemplates.find((r) => r.kind === svc.reportKind);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href={osHref(tenant.slug, '/#services')} className="text-sm text-slate-600 underline">← All services</Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h1 className="text-3xl font-bold">{svc.title}</h1>
          <p className="mt-3 text-lg text-slate-600">{svc.summary}</p>
          <h2 className="mt-8 text-lg font-semibold">What’s included</h2>
          <ul className="mt-3 space-y-2">{svc.includes.map((i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" />{i}</li>)}</ul>
          <h2 className="mt-8 text-lg font-semibold">What to expect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">{svc.whatToExpect.map((i) => <li key={i}>{i}</li>)}</ul>
          {template ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="font-semibold">You receive: {template.title} report</p>
              <p className="mt-1 text-sm text-slate-600">Delivered to {template.deliverTo.map((d) => (d === 'ahj' ? 'the authority having jurisdiction where required' : 'the property owner')).join(' and ')} after the licensed contractor reviews it.</p>
              <Link href={osHref(tenant.slug, svc.reportKind === 'backflow' ? '/report/R-503' : '/report/R-501')} className="mt-3 inline-block text-sm font-semibold text-[var(--brand-dark)] underline">See a sample report</Link>
            </div>
          ) : null}
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-semibold">Request this service</p>
            <p className="mt-1 text-sm text-slate-600">Tell us about the property; the office calls you back to confirm scope and a time.</p>
            <Link href={osHref(tenant.slug, `/request?lane=${svc.laneId}`)} className="mt-4 block rounded-lg bg-[var(--brand)] px-4 py-3 text-center font-semibold text-white hover:bg-[var(--brand-dark)]">Request service</Link>
          </div>
          {svc.laneId === 'emergency' ? <Guardrail>{vertical.guardrails.emergency} Call {tenant.phone}.</Guardrail> : null}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold">Other services</p>
            <ul className="mt-2 space-y-1 text-sm">{others.map((o) => <li key={o.slug}><Link className="text-[var(--brand-dark)] underline" href={osHref(tenant.slug, `/services/${o.slug}`)}>{o.title}</Link></li>)}</ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
