'use client';

import Link from 'next/link';
import { ArrowRight, Check, Phone, PhoneCall } from 'lucide-react';
import { AiDemoPanel } from '@/components/local-os/os/ai-demo-panel';
import { useDemo } from '@/components/local-os/os/demo-store';
import { TenantPhoto } from '@/components/local-os/os/preview/field-media';
import { Lifecycle } from '@/components/local-os/os/preview/lifecycle';
import { ProofCard } from '@/components/local-os/os/preview/proof-card';
import { DISPLAY, FIELD } from '@/components/local-os/os/preview/type';
import { osHref } from '@/components/local-os/os/ui';
import { XENCO_AI_DEMO } from '@/lib/local-os/xenco-demo';
import { linksOf, termsOf } from '@/lib/local-os/terms';

/**
 * Customer-facing homepage of a preview tenant, in the "industrial field documentation"
 * direction: charcoal and off-white surfaces, the brand red as an operational accent, the
 * client's own job photography, field-label typography, and the lifecycle as the signature.
 * Every word, image and lane comes from tenant + trade-module configuration.
 */
export function SiteHome() {
  const { tenant, vertical } = useDemo();
  const s = tenant.slug;
  const m = tenant.media;
  const services = vertical.services.filter((x) => tenant.laneIds.includes(x.laneId));
  const tel = `tel:+1${tenant.phone.replace(/[^0-9]/g, '')}`;
  const terms = termsOf(vertical);
  const callCta = s === 'nemesis-fire' ? 'Call Nemesis Fire' : terms.callCta;
  const links = linksOf(tenant);
  const split = tenant.branding.theme?.heroLayout === 'split';
  const cta = tenant.site.ctaLabel ?? 'Request service';

  return (
    <div className="bg-[var(--paper)] text-neutral-900">
      {split ? (
        /* HERO (brand theme) — the business's own layout language: light, copy left, real photo right */
        <section className="bg-[var(--paper)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 md:grid-cols-[1.05fr_1fr] md:pb-20 md:pt-16">
            <div>
              <p className="lo-btn inline-flex items-center gap-2 bg-white px-3 py-1.5 text-xs font-medium shadow-sm ring-1 ring-black/5">
                <span className="lo-accent">●</span> {tenant.site.tagline}
              </p>
              <h1 className={`${DISPLAY} mt-5 text-[2.6rem] font-bold leading-[1.05] md:text-6xl`} style={{ color: tenant.branding.surface }}>{tenant.site.heroTitle}</h1>
              <p className="mt-5 max-w-xl text-lg text-neutral-600">{tenant.site.heroSubtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={osHref(s, '/request')} className="lo-btn inline-flex items-center gap-2 bg-[var(--brand)] px-6 py-3.5 font-semibold text-white shadow-[0_6px_18px_-6px_var(--brand)] hover:bg-[var(--brand-dark)]">
                  {cta} <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={tel} className="lo-btn inline-flex items-center gap-2 bg-white px-6 py-3.5 font-semibold text-neutral-900 ring-1 ring-neutral-300 hover:bg-neutral-50">
                  <Phone className="h-4 w-4" /> {callCta} {tenant.phone}
                </a>
              </div>
              {tenant.site.credibility.length ? (
                <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 pt-5 text-sm text-neutral-600">
                  {tenant.site.credibility.map((c) => <li key={c} className="flex items-center gap-1.5"><Check className="lo-accent h-4 w-4" />{c}</li>)}
                </ul>
              ) : null}
              {tenant.aiDemo ? (
                <a href={`tel:${XENCO_AI_DEMO.tel}`} className="lo-round mt-7 flex max-w-xl items-center gap-3 border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 hover:border-amber-400">
                  <PhoneCall className="h-5 w-5 shrink-0 text-amber-600" />
                  <span>
                    <span className={`${FIELD} block text-[10px] font-semibold text-amber-700`}>{XENCO_AI_DEMO.label} · not {tenant.name}’s line</span>
                    {tenant.aiDemoHeading ?? XENCO_AI_DEMO.heading}: <strong>{XENCO_AI_DEMO.display}</strong>
                  </span>
                </a>
              ) : null}
            </div>
            <figure className="relative order-first md:order-none">
              <TenantPhoto image={m.hero} sizes="(min-width:768px) 50vw, 100vw" priority className="lo-round aspect-[4/3] w-full overflow-hidden shadow-xl md:aspect-[5/6]" />
              {tenant.site.photoCredit ? <figcaption className="mt-2 text-right text-xs text-neutral-500">Photo: {tenant.site.photoCredit}</figcaption> : null}
            </figure>
          </div>
        </section>
      ) : (
        /* HERO — real job photo, charcoal field, no stock imagery */
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <TenantPhoto image={m.hero} sizes="100vw" priority className="absolute inset-0 -z-10 h-full w-full" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/20" />
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:pb-14 md:pt-24">
          <p className={`${FIELD} text-[11px] text-neutral-300`}>
            <span className="text-[var(--brand)]">■</span> {tenant.site.serviceAreas.join(' · ')}
          </p>
          <h1 className={`${DISPLAY} mt-4 max-w-3xl text-5xl font-bold uppercase leading-[0.95] md:text-7xl`}>{tenant.site.heroTitle}</h1>
          <p className="mt-5 max-w-xl text-lg text-neutral-300">{tenant.site.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={osHref(s, '/request')} className="inline-flex items-center gap-2 bg-[var(--brand)] px-5 py-3.5 font-semibold text-white hover:bg-[var(--brand-dark)]">
              {cta} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={tel} className="inline-flex items-center gap-2 border border-white/40 px-5 py-3.5 font-semibold text-white hover:bg-white/10">
              {callCta} {tenant.phone}
            </a>
          </div>
          {tenant.aiDemo ? (
            <a href={`tel:${XENCO_AI_DEMO.tel}`} className="mt-6 flex max-w-xl items-center gap-3 border border-amber-300/50 bg-neutral-950/70 px-4 py-3 text-sm text-amber-50 hover:border-amber-300">
              <PhoneCall className="h-5 w-5 shrink-0 text-amber-300" />
              <span>
                <span className={`${FIELD} block text-[10px] font-semibold text-amber-300`}>{XENCO_AI_DEMO.label} · not {tenant.name}’s line</span>
                {tenant.aiDemoHeading ?? XENCO_AI_DEMO.heading}: <strong className="text-white">{XENCO_AI_DEMO.display}</strong>
              </span>
            </a>
          ) : null}
        </div>
        <dl className="border-t border-white/10 bg-neutral-950/80">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 md:grid-cols-4">
            {[
              ['Licence', tenant.license ?? '—'],
              ['Based in', tenant.region.split(' · ')[0] ?? tenant.region],
              ['Since', tenant.established ? String(tenant.established) : '—'],
              ['Lanes', String(services.length)],
            ].filter(([, v]) => v !== '—').map(([k, v]) => (
              <div key={k} className="py-3">
                <dt className={`${FIELD} text-[10px] text-neutral-500`}>{k}</dt>
                <dd className="text-sm text-neutral-200">{v}</dd>
              </div>
            ))}
          </div>
        </dl>
      </section>
      )}

      {/* SERVICE LANES */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <p className={`${FIELD} text-[11px] text-neutral-500`}>{split ? 'What we do' : 'Service lanes'}</p>
        <h2 className={`${DISPLAY} mt-2 text-4xl font-bold uppercase`}>{terms.servicesHeading}</h2>
        <div className={`mt-8 grid sm:grid-cols-2 ${split ? 'gap-5' : 'gap-px border border-neutral-300 bg-neutral-300'} ${services.length === 5 ? 'lg:grid-cols-5' : services.length === 3 || services.length === 6 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
          {services.map((svc) => {
            const photo = m.lanes[svc.laneId];
            return (
              <Link key={svc.slug} href={osHref(s, `/services/${svc.slug}`)} className={`group flex flex-col bg-white ${split ? 'lo-round overflow-hidden shadow-sm ring-1 ring-black/5 transition hover:shadow-md' : ''}`}>
                {photo ? (
                  <TenantPhoto image={photo} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="aspect-[4/3] w-full" />
                ) : null /* no photo: a text-only card; the prospect QA gate fails the page instead */}
                <div className="flex flex-1 flex-col p-5">
                  {split ? null : <p className={`${FIELD} text-[11px] text-[var(--brand)]`}>Lane {svc.code}</p>}
                  <h3 className={`${DISPLAY} mt-1 text-2xl font-semibold uppercase leading-tight`}>{svc.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">{svc.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 group-hover:text-[var(--brand-dark)]">
                    {split ? 'Details' : 'Lane detail'} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        {split && tenant.site.photoCredit ? (
          <p className="mt-4 text-xs text-neutral-500">
            Photos from {tenant.site.photoCredit}{Object.values(m.lanes).some((x) => x.illustrative) ? ', except those marked “Illustrative concept image”' : ''}.
          </p>
        ) : null}
      </section>

      {/* RECENT WORK — photos the business's own site presents as its work, credited to the source */}
      {m.gallery?.length && !m.proof.length ? (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={`${FIELD} text-[11px] text-neutral-500`}>Recent work</p>
                <h2 className={`${DISPLAY} mt-2 text-4xl font-bold uppercase`}>On the job</h2>
              </div>
              {tenant.site.photoCredit ? <p className="text-sm text-neutral-500">Photos from {tenant.site.photoCredit}</p> : null}
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {m.gallery.slice(0, 8).map((g) => (
                <li key={g.src}><TenantPhoto image={g} sizes="(min-width:768px) 25vw, 50vw" className="lo-round aspect-square w-full overflow-hidden" /></li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* PROTECTION LIFECYCLE — the signature */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className={`${DISPLAY} text-4xl font-bold uppercase md:text-5xl`}>One record, start to finish</h2>
          <p className="mt-3 max-w-2xl text-neutral-400">
            Every request follows the same documented path. Each stage below opens a sample of the record the customer and the office see.
          </p>
          <div className="mt-10">
            <Lifecycle slug={s} name={vertical.lifecycleName} stages={vertical.customerSteps} variant="showcase" />
          </div>
        </div>
      </section>

      {/* REAL WORK — field proof tied to the system, not a gallery */}
      {m.proof.length ? (
        <section>
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={`${FIELD} text-[11px] text-neutral-500`}>{m.proofHeading?.eyebrow ?? 'Real work'}</p>
                <h2 className={`${DISPLAY} mt-2 text-4xl font-bold uppercase`}>{m.proofHeading?.title ?? 'From the field to your file'}</h2>
              </div>
              <p className="max-w-md text-sm text-neutral-600">{m.proofHeading?.body ?? `The work on site, and where it shows up: your request, the office, and the ${terms.field.toLowerCase()}’s phone.`}</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {m.proof.map((item, i) => <ProofCard key={item.id} slug={s} item={item} index={i} label={m.proofHeading?.cardLabel} />)}
            </div>
            {m.proofHeading?.note ? <p className={`${FIELD} mt-4 text-[10px] text-neutral-500`}>{m.proofHeading.note}</p> : null}
          </div>
        </section>
      ) : null}

      {/* ABOUT — spec-sheet credibility, only what the client publishes */}
      <section className="border-y border-neutral-300 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1fr_1.2fr] md:items-center">
          <TenantPhoto image={m.about} sizes="(min-width:768px) 45vw, 100vw" className={`lo-round w-full ${split ? 'aspect-[4/3]' : 'aspect-[4/5] md:aspect-[3/4]'}`} />
          <div>
            <p className={`${FIELD} text-[11px] text-neutral-500`}>About {tenant.name}</p>
            <h2 className={`${DISPLAY} mt-2 text-4xl font-bold uppercase`}>{tenant.site.aboutTitle}</h2>
            <p className="mt-4 text-neutral-700">{tenant.site.aboutBody}</p>
            <dl className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
              {tenant.site.credibility.map((c, i) => (
                <div key={c} className="grid grid-cols-[5rem_1fr] gap-3 py-2.5">
                  <dt className={`${FIELD} text-[10px] text-neutral-500`}>Fact {String(i + 1).padStart(2, '0')}</dt>
                  <dd>{c}</dd>
                </div>
              ))}
            </dl>
            <Link href={osHref(s, '/request')} className={`lo-btn mt-6 inline-flex items-center gap-2 px-5 py-3 font-semibold text-white ${split ? 'bg-[var(--brand)] hover:bg-[var(--brand-dark)]' : 'bg-neutral-950 hover:bg-neutral-800'}`}>
              {cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* XENCO LIVE AI DEMONSTRATION */}
      {tenant.aiDemo ? (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <AiDemoPanel tenantName={tenant.name} heading={tenant.aiDemoHeading} />
        </section>
      ) : null}

      {/* BRIDGE — the office and field workflow behind the customer site */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className={`${FIELD} text-[11px] text-amber-300`}>Connected office and field workflow</p>
          <h2 className={`${DISPLAY} mt-2 text-4xl font-bold uppercase`}>Behind this website: the operating system</h2>
          <p className="mt-3 max-w-2xl text-neutral-400">One service record connects the customer, the office and the {terms.field.toLowerCase()}. Workspace screens use fictional sample records.</p>
          <div className="mt-8 grid gap-px bg-neutral-800 md:grid-cols-3">
            {[
              ['Customer', 'Job status, estimate approval, report and invoice', links.status],
              ['Office', 'Requests, callbacks, estimates, reports, invoices', '/office'],
              [terms.fieldView, `Phone job packet: checklist, ${terms.fieldView === 'Crew' ? 'crew, materials' : vertical.flow === 'estimate-first' ? 'before/after' : 'readings'}, photos`, links.field],
            ].map(([t, d, p]) => (
              <Link key={t} href={osHref(s, p)} className="group bg-neutral-950 p-6 hover:bg-neutral-900">
                <p className={`${FIELD} text-[10px] text-[var(--brand)]`}>{t} view</p>
                <p className={`${DISPLAY} mt-2 text-2xl font-semibold uppercase`}>{t}</p>
                <p className="mt-2 text-sm text-neutral-400">{d}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-amber-300">Open <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
