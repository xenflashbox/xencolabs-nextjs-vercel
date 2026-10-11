'use client';

import Link from 'next/link';
import { ClipboardList, Droplets, Flame, PhoneCall, ShieldCheck, Wrench } from 'lucide-react';
import { AiDemoPanel } from '@/components/local-os/os/ai-demo-panel';
import { useDemo } from '@/components/local-os/os/demo-store';
import { osHref } from '@/components/local-os/os/ui';
import { XENCO_AI_DEMO } from '@/lib/local-os/xenco-demo';

const ICONS: Record<string, typeof Droplets> = { sprinkler: Droplets, backflow: ShieldCheck, extinguisher: Flame, emergency: Wrench };

/** The customer-facing homepage: positioning, services, emergency direction, request CTA, and the Xenco AI demo. */
export function SiteHome() {
  const { tenant, vertical } = useDemo();
  const s = tenant.slug;
  const services = vertical.services.filter((x) => tenant.laneIds.includes(x.laneId));
  return (
    <div>
      <section style={{ background: tenant.branding.surface }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.4fr_1fr] md:items-center md:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">{tenant.site.tagline}</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{tenant.site.heroTitle}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">{tenant.site.heroSubtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={osHref(s, '/request')} className="rounded-lg bg-[var(--brand)] px-5 py-3 font-semibold text-white hover:bg-[var(--brand-dark)]">Request service</Link>
              <a href={`tel:+1${tenant.phone.replace(/[^0-9]/g, '')}`} className="rounded-lg border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10">Emergency? Call {tenant.phone}</a>
            </div>
            {tenant.aiDemo ? (
              <a href={`tel:${XENCO_AI_DEMO.tel}`} className="mt-6 flex max-w-xl items-center gap-3 rounded-xl border border-amber-300/60 bg-amber-300/10 px-4 py-3 text-sm text-amber-100 hover:bg-amber-300/20">
                <PhoneCall className="h-5 w-5 shrink-0 text-amber-300" />
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-amber-300">{XENCO_AI_DEMO.label} · not {tenant.name}’s line</span>
                  {XENCO_AI_DEMO.heading}: <strong className="text-white">{XENCO_AI_DEMO.display}</strong>
                </span>
              </a>
            ) : null}
          </div>
          <ul className="space-y-3 rounded-2xl border border-white/15 bg-white/5 p-6">
            {tenant.site.credibility.map((c) => (
              <li key={c} className="flex gap-3 text-sm text-white/90"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" />{c}</li>
            ))}
            <li className="text-xs text-white/60">Serving {tenant.site.serviceAreas.join(', ')}.</li>
          </ul>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => {
            const Icon = ICONS[svc.laneId] ?? ClipboardList;
            return (
              <Link key={svc.slug} href={osHref(s, `/services/${svc.slug}`)} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[var(--brand)]">
                <Icon className="h-8 w-8 text-[var(--brand)]" />
                <h3 className="mt-3 font-semibold">{svc.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{svc.summary}</p>
                <span className="mt-4 text-sm font-semibold text-[var(--brand-dark)] group-hover:underline">Learn more →</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold">How it works</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {tenant.site.process.map((p, i) => (
              <li key={p.title} className="rounded-2xl border border-slate-200 p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">{i + 1}</span>
                <p className="mt-3 font-semibold">{p.title}</p>
                <p className="mt-1 text-sm text-slate-600">{p.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-slate-600">
            Already have a request open? <Link className="font-semibold text-[var(--brand-dark)] underline" href={osHref(s, '/status/L-107')}>See a sample job status page</Link>.
          </p>
        </div>
      </section>

      {tenant.aiDemo ? (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <AiDemoPanel tenantName={tenant.name} />
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-xl font-bold">{tenant.site.aboutTitle}</h2>
            <p className="mt-2 text-slate-600">{tenant.site.aboutBody}</p>
          </div>
          <Link href={osHref(s, '/request')} className="rounded-lg bg-[var(--brand)] px-5 py-3 text-center font-semibold text-white hover:bg-[var(--brand-dark)]">Request service</Link>
        </div>
      </section>
    </div>
  );
}
