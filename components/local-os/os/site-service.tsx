'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useDemo } from '@/components/local-os/os/demo-store';
import { FieldVideo, TenantPhoto } from '@/components/local-os/os/preview/field-media';
import { DISPLAY, FIELD } from '@/components/local-os/os/preview/type';
import { Guardrail, osHref } from '@/components/local-os/os/ui';

/** A customer-facing service lane page, generated from the trade module + tenant media. */
export function SiteService({ slug }: { slug: string }) {
  const { tenant, vertical } = useDemo();
  const svc = vertical.services.find((x) => x.slug === slug && tenant.laneIds.includes(x.laneId));
  const others = vertical.services.filter((x) => x.slug !== slug && tenant.laneIds.includes(x.laneId));
  if (!svc) return <p className="mx-auto max-w-6xl p-6 text-sm">No such service.</p>;
  const template = vertical.reportTemplates.find((r) => r.kind === svc.reportKind);
  const image = tenant.media.lanes[svc.laneId] ?? tenant.media.hero;
  const clip = tenant.media.laneVideos?.[svc.laneId];
  return (
    <div className="bg-[var(--paper)]">
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <TenantPhoto image={image} sizes="100vw" priority className="absolute inset-0 -z-10 h-full w-full opacity-60" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <Link href={osHref(tenant.slug, '/#services')} className={`${FIELD} text-[11px] text-neutral-300 hover:text-white`}>← Service lanes</Link>
          <p className={`${FIELD} mt-6 text-[11px] text-[var(--brand)]`}>Lane {svc.code}</p>
          <h1 className={`${DISPLAY} mt-1 max-w-3xl text-5xl font-bold uppercase leading-[0.95] md:text-6xl`}>{svc.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-300">{svc.summary}</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          {svc.includes.length ? (
            <>
            <p className={`${FIELD} text-[11px] text-neutral-500`}>Scope</p>
            <h2 className={`${DISPLAY} mt-1 text-3xl font-bold uppercase`}>What’s included</h2>
            <ul className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
              {svc.includes.map((i) => <li key={i} className="flex gap-3 py-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" />{i}</li>)}
            </ul>
            </>
          ) : null}
          <p className={`${FIELD} ${svc.includes.length ? 'mt-10' : ''} text-[11px] text-neutral-500`}>{svc.includes.length ? 'On site' : 'Local OS preview'}</p>
          <h2 className={`${DISPLAY} mt-1 text-3xl font-bold uppercase`}>{svc.includes.length ? 'What to expect' : 'How it works in this preview'}</h2>
          <ol className="mt-4 space-y-3">
            {svc.whatToExpect.map((i, k) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-2">
                <span className={`${FIELD} pt-0.5 text-[11px] text-[var(--brand)]`}>{String(k + 1).padStart(2, '0')}</span>
                <span className="text-neutral-700">{i}</span>
              </li>
            ))}
          </ol>
          {template ? (
            <div className="mt-10 border border-neutral-300 bg-white p-5">
              <p className={`${FIELD} text-[10px] text-neutral-500`}>Record you receive</p>
              <p className={`${DISPLAY} mt-1 text-2xl font-semibold uppercase`}>{template.title}</p>
              <p className="mt-1 text-sm text-neutral-600">{template.deliverToText ?? `Delivered to ${template.deliverTo.map((d) => (d === 'ahj' ? (svc.laneId === 'backflow' ? 'the water purveyor where required' : 'the fire authority having jurisdiction where required') : 'the property owner')).join(' and ')}, after the licensed contractor reviews it.`}</p>
              <Link href={osHref(tenant.slug, template.samplePath ?? (svc.reportKind === 'backflow' ? '/report/R-503' : '/report/R-501'))} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-dark)] underline underline-offset-4">See a sample record <ArrowRight className="h-4 w-4" /></Link>
            </div>
          ) : null}
        </div>
        <aside className="space-y-4">
          {clip ? (
            <figure className="border border-neutral-800 bg-neutral-950 text-white">
              <FieldVideo video={clip.video} />
              <figcaption className="p-4">
                <p className={`${DISPLAY} text-xl font-semibold uppercase`}>{clip.title}</p>
                <p className="mt-1 text-sm text-neutral-400">{clip.body}</p>
                {tenant.media.proofHeading?.note ? <p className={`${FIELD} mt-2 text-[10px] text-neutral-500`}>{tenant.media.proofHeading.note}</p> : null}
              </figcaption>
            </figure>
          ) : null}
          <div className="border border-neutral-300 bg-white p-5">
            <p className={`${DISPLAY} text-2xl font-semibold uppercase`}>{tenant.site.ctaLabel ?? 'Request this service'}</p>
            <p className="mt-1 text-sm text-neutral-600">Tell us about the property; the office calls you back to confirm scope and a time.</p>
            <Link href={osHref(tenant.slug, `/request?lane=${svc.laneId}`)} className="mt-4 flex items-center justify-center gap-2 bg-[var(--brand)] px-4 py-3 font-semibold text-white hover:bg-[var(--brand-dark)]">{tenant.site.ctaLabel ?? 'Request service'} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          {svc.laneId === 'emergency' ? <Guardrail>{vertical.guardrails.emergency} Call {tenant.phone}.</Guardrail> : null}
          <div className="border border-neutral-300 bg-white p-5">
            <p className={`${FIELD} text-[10px] text-neutral-500`}>Other lanes</p>
            <ul className="mt-2 space-y-2 text-sm">{others.map((o) => <li key={o.slug}><Link className="font-medium hover:text-[var(--brand-dark)]" href={osHref(tenant.slug, `/services/${o.slug}`)}><span className={`${FIELD} mr-2 text-[10px] text-[var(--brand)]`}>{o.code}</span>{o.title}</Link></li>)}</ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
