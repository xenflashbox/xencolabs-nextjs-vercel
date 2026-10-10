import { Check } from 'lucide-react';
import type { PreviewManifest } from '@/lib/local-os/preview';
import type { Template } from '@/lib/local-os/templates';
import { BrandImage, Rating } from './shared';
import { TrackedLink } from './tracker';

type Props = { m: PreviewManifest; t: Template; ev: string; estimateHref: string; systemHref: string };

const n2 = (i: number) => String(i + 1).padStart(2, '0');

/* ── Exterior Service · "Clean Line" ─────────────────────────────────────────────────────────────────────────────
   Anchor: one diagonal squeegee stroke across the hero, grime on one side and clean on the other. */
export function ExteriorService({ m, t, ev, estimateHref, systemHref }: Props) {
  const b = m.config.business;
  return (
    <>
      <section className="lp-x-hero">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_1fr] md:py-16">
          <div className="space-y-5 self-center">
            <p className="lp-kicker">{b.city}{b.service_area ? ` · ${b.service_area}` : ''}</p>
            <h1 className="lp-x-title">{t.heroTitle(b.city)}</h1>
            <p className="max-w-prose text-lg opacity-85">{t.heroSub}</p>
            <Rating rating={b.rating} count={b.review_count} />
            <div className="flex flex-wrap gap-3 pt-1">
              <TrackedLink eventsUrl={ev} event="cta_click" page="service" href={estimateHref} className="lp-btn">Get my estimate</TrackedLink>
              <a href={systemHref} className="lp-btn-ghost">See how it runs</a>
            </div>
          </div>
          <div className="lp-x-sweep" aria-hidden={m.config.branding?.og_image ? undefined : true}>
            <div className="lp-x-clean"><BrandImage src={m.config.branding?.og_image} business={b.name} /></div>
            <div className="lp-x-grime" />
            <div className="lp-x-blade" />
            <span className="lp-x-tag lp-x-tag-before">Before</span>
            <span className="lp-x-tag lp-x-tag-after">After</span>
          </div>
        </div>
      </section>

      <section className="lp-x-ticket mx-auto max-w-6xl px-4">
        <ol className="grid sm:grid-cols-3">
          {t.promises.map((p, i) => (
            <li key={p}><span className="lp-x-ticket-n">{n2(i)}</span><span>{p}</span></li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="lp-h2">What we clean</h2>
        <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {m.config.services.map((s, i) => (
            <li key={s} className="lp-x-svc"><span className="lp-x-svc-n">{n2(i)}</span>{s}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ── Property Care · "Project Plan" ──────────────────────────────────────────────────────────────────────────────
   Anchor: the yard drawn as a measured site plan, editorial serif type on warm paper. */
function SitePlan() {
  return (
    <svg viewBox="0 0 320 220" className="h-auto w-full" role="img" aria-label="Illustration: a site plan sketch (generic, not a real property)">
      <defs>
        <pattern id="lp-grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="currentColor" strokeOpacity=".12" /></pattern>
        <pattern id="lp-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" style={{ stroke: 'var(--accent)' }} strokeWidth="2" /></pattern>
      </defs>
      <rect width="320" height="220" fill="url(#lp-grid)" />
      <rect x="20" y="20" width="280" height="54" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="160" y="52" textAnchor="middle" fontSize="11" fill="currentColor" opacity=".7">HOUSE</text>
      <rect x="40" y="92" width="130" height="80" fill="url(#lp-hatch)" stroke="currentColor" strokeWidth="1.5" />
      <text x="105" y="136" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">PATIO</text>
      <path d="M190 92h90v100h-90z" fill="none" stroke="currentColor" strokeDasharray="4 3" />
      <text x="235" y="146" textAnchor="middle" fontSize="11" fill="currentColor" opacity=".7">TURF</text>
      {[[210, 206], [240, 206], [270, 206]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="7" fill="none" stroke="currentColor" strokeOpacity=".6" />)}
      <path d="M40 182h130M40 178v8M170 178v8" stroke="currentColor" />
      <text x="105" y="200" textAnchor="middle" fontSize="9" fill="currentColor">measured on the site visit</text>
      <path d="M300 120l6 14h-12z" fill="currentColor" /><text x="300" y="148" textAnchor="middle" fontSize="9" fill="currentColor">N</text>
    </svg>
  );
}

export function PropertyService({ m, t, ev, estimateHref, systemHref }: Props) {
  const b = m.config.business;
  const img = m.config.branding?.og_image;
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr] md:py-16">
        <div className="space-y-5">
          <p className="lp-kicker">Project planning · {b.city}</p>
          <h1 className="lp-p-title">{t.heroTitle(b.city)}</h1>
          <p className="lp-p-lede max-w-prose">{t.heroSub}</p>
          <Rating rating={b.rating} count={b.review_count} />
          <div className="flex flex-wrap gap-3 pt-1">
            <TrackedLink eventsUrl={ev} event="cta_click" page="service" href={estimateHref} className="lp-btn">Start a ballpark</TrackedLink>
            <a href={systemHref} className="lp-btn-ghost">How a project runs</a>
          </div>
        </div>
        <figure className="lp-p-plan">
          {img ? <div className="aspect-[4/3] overflow-hidden"><BrandImage src={img} business={b.name} /></div> : <SitePlan />}
          <figcaption>{img ? `From ${b.name}'s public website` : 'Every project starts as a plan you can see'}</figcaption>
        </figure>
      </section>

      <section className="lp-p-rule mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="lp-h2">The plan, in three moves</h2>
            {img && <div className="mt-5 hidden md:block"><SitePlan /></div>}
          </div>
          <ol className="grid gap-6 sm:grid-cols-3">
            {t.promises.map((p, i) => (
              <li key={p}><span className="lp-p-numeral">{['i', 'ii', 'iii'][i] ?? i + 1}.</span><p className="mt-1 font-medium">{p}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="lp-h2">Scope we plan for</h2>
        <ul className="lp-p-scope mt-5 sm:columns-2">
          {m.config.services.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>
    </>
  );
}

/* ── Recurring Route Service · "Route Report" ────────────────────────────────────────────────────────────────────
   Anchor: the visit report a customer receives after every stop, a receipt with a torn edge. */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const READINGS: Array<[string, string]> = [['Free chlorine', '3.0 ppm'], ['pH', '7.5'], ['Filter pressure', '14 psi']];

function VisitReport({ t, business }: { t: Template; business: string }) {
  return (
    <div className="lp-r-report" role="img" aria-label="Illustration: a sample visit report">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-semibold">Visit report</p><p className="lp-r-mono text-xs opacity-70">SAMPLE</p>
      </div>
      <p className="mt-0.5 text-xs opacity-70">{business} · route day</p>
      <div className="mt-3 grid grid-cols-5 gap-1 text-center text-xs">
        {DAYS.map((d) => <span key={d} className={d === 'Thu' ? 'lp-r-day is-on' : 'lp-r-day'}>{d}</span>)}
      </div>
      <dl className="lp-r-mono mt-4 grid gap-1.5 text-sm">
        {READINGS.map(([k, v]) => <div key={k} className="lp-r-leader"><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
      <ul className="mt-4 grid gap-1 text-sm">
        {t.checklist.slice(0, 4).map((c) => <li key={c} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />{c}</li>)}
      </ul>
      <p className="mt-3 text-xs opacity-70">Sample readings. Photos attach from the tech&apos;s phone.</p>
    </div>
  );
}

export function RouteService({ m, t, ev, estimateHref, systemHref }: Props) {
  const b = m.config.business;
  return (
    <>
      <section className="lp-r-hero">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-[1.3fr_1fr] md:py-16">
          <div className="space-y-5 self-center">
            <p className="lp-kicker lp-r-mono">ROUTE SERVICE · {b.city.toUpperCase()}</p>
            <h1 className="lp-r-title">{t.heroTitle(b.city)}</h1>
            <p className="max-w-prose text-lg opacity-85">{t.heroSub}</p>
            <Rating rating={b.rating} count={b.review_count} />
            <div className="flex flex-wrap gap-3 pt-1">
              <TrackedLink eventsUrl={ev} event="cta_click" page="service" href={estimateHref} className="lp-btn">See my monthly price</TrackedLink>
              <a href={systemHref} className="lp-btn-ghost">What every visit includes</a>
            </div>
            <ol className="lp-r-log">
              {t.promises.map((p, i) => <li key={p}><span className="lp-r-mono">{n2(i)}</span>{p}</li>)}
            </ol>
          </div>
          <div className="self-center">
            {m.config.branding?.og_image && (
              <div className="mb-4 aspect-[16/7] overflow-hidden rounded-md"><BrandImage src={m.config.branding.og_image} business={b.name} /></div>
            )}
            <VisitReport t={t} business={b.name} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="lp-h2">Service menu</h2>
        <ul className="lp-r-mono mt-5 grid gap-x-10 gap-y-2 text-sm md:grid-cols-2">
          {m.config.services.map((s, i) => (
            <li key={s} className="lp-r-row"><span className="opacity-60">{n2(i)}</span> {s}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
