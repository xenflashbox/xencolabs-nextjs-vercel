'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, Search } from 'lucide-react';
import { DemoLine, SnapshotCaveat } from '@/components/local-os/shelter/shelter-shell';
import { ageMonths, field, readableAge, useShelter } from '@/components/local-os/shelter/shelter-store';
import { osHref } from '@/components/local-os/os/ui';
import { normalizeQuery, searchAnimals, type BreedMatch } from '@/lib/local-os/shelter/match';
import type { ShelterAnimal } from '@/lib/local-os/shelter/types';

const H = 'font-[family-name:var(--font-display)]';

/** Photos come from the private media route (copied from the official listing photo, credited). */
function Photo({ a, i = 0, sizes, priority = false, className = '' }: { a: ShelterAnimal; i?: number; sizes: string; priority?: boolean; className?: string }) {
  const p = a.photos[i] ?? a.photos[0];
  return (
    <div className={`relative overflow-hidden bg-slate-200 ${className}`}>
      {p?.src ? <Image src={p.src} alt={`${a.name}, from Marin Humane’s public listing`} fill sizes={sizes} priority={priority} unoptimized className="object-cover" /> : null}
    </div>
  );
}

function AnimalCard({ a, match }: { a: ShelterAnimal; match?: BreedMatch | null }) {
  const { tenant } = useShelter();
  const breed = [field(a, 'Breed'), field(a, 'Second breed')].filter(Boolean).join(' / ');
  return (
    <li className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <Link href={osHref(tenant.slug, `/animals/${a.slug}`)} className="block">
        <Photo a={a} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="aspect-[4/5]" />
        <div className="p-4">
          {match ? <p className={`mb-1.5 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${match.kind === 'exact' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-700'}`}>{match.label}</p> : null}
          <h3 className={`${H} text-xl font-semibold`}>{a.name}</h3>
          <p className="mt-0.5 text-sm text-slate-600">{breed}</p>
          <p className="mt-1 text-sm text-slate-600">{field(a, 'Sex')} · {readableAge(field(a, 'Age'))}{field(a, 'Size') ? ` · ${field(a, 'Size')}` : ''}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]">View profile <ArrowRight className="h-4 w-4" aria-hidden /></span>
        </div>
      </Link>
    </li>
  );
}

export function ShelterHome() {
  const { tenant, animals, data } = useShelter();
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
        <div className="order-2 md:order-1">
          <p className="inline-flex rounded-full bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)]">Concept preview · dated public listing snapshot</p>
          <h1 className={`${H} mt-3 text-4xl font-semibold leading-tight md:text-5xl`}>Find your next companion</h1>
          <p className="mt-3 max-w-xl text-lg text-slate-600">A concept for how {tenant.name}’s adoptable animals, adoption questions and staff follow-up could work together on one site and one phone line.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={osHref(tenant.slug, '/animals')} className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-lg font-semibold text-white shadow hover:bg-[var(--brand-dark)]"><Search className="h-5 w-5" aria-hidden /> Find an animal</Link>
            <Link href={osHref(tenant.slug, '/adopt')} className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold">How adoption works</Link>
          </div>
          <SnapshotCaveat at={data.snapshot.captured_at} className="mt-5 max-w-xl" />
        </div>
        <div className="order-1 grid grid-cols-3 gap-2 md:order-2">
          {animals.slice(0, 6).map((a, i) => (
            <Link key={a.slug} href={osHref(tenant.slug, `/animals/${a.slug}`)} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
              <Photo a={a} sizes={i === 0 ? '(min-width:768px) 30vw, 66vw' : '(min-width:768px) 15vw, 33vw'} priority={i < 3} className="aspect-square h-full w-full rounded-2xl" />
            </Link>
          ))}
          <p className="col-span-3 text-right text-xs text-slate-500">Photos: Marin Humane public listings</p>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">From the snapshot</p>
            <h2 className={`${H} mt-1 text-3xl font-semibold`}>Dogs in this sample</h2>
          </div>
          <Link href={osHref(tenant.slug, '/animals')} className="font-semibold text-[var(--brand)]">Search all {animals.length} →</Link>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{animals.slice(0, 4).map((a) => <AnimalCard key={a.slug} a={a} />)}</ul>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Ask about an animal', 'Name, phone, email, the animal and how to reach you. Nothing more.', '/ask'],
          ['Request a meeting', 'Pick preferred times. Staff confirm; nothing is booked automatically.', '/meet'],
          ['Staff inquiry queue', 'Every inquiry lands in one queue with an owner and a next step.', '/office'],
        ].map(([t, b, p]) => (
          <Link key={p} href={osHref(tenant.slug, p as string)} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 hover:shadow-md">
            <h3 className={`${H} text-xl font-semibold`}>{t}</h3>
            <p className="mt-1 text-sm text-slate-600">{b}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]">Open <ArrowRight className="h-4 w-4" aria-hidden /></span>
          </Link>
        ))}
      </section>

      <DemoLine />
    </div>
  );
}

const AGE_BANDS: [string, (m: number) => boolean][] = [
  ['Under 1 year', (m) => m < 12],
  ['1 to under 3 years', (m) => m >= 12 && m < 36],
  ['3 to under 8 years', (m) => m >= 36 && m < 96],
  ['8 years and older', (m) => m >= 96],
];

/** One sentence that says exactly what was searched and how the results relate to it. */
function describe(q: string, sex: string, age: string, size: string, results: { match: BreedMatch | null }[], total: number): string {
  const filters = [sex, age && `${age.charAt(0).toLowerCase()}${age.slice(1)} (from the published age)`, size && `${size.toLowerCase()} size`].filter(Boolean).join(', ');
  const n = results.length;
  const head = `${n} of ${total} dogs`;
  if (!normalizeQuery(q)) return filters ? `${head} match: ${filters}.` : `${head} shown.`;
  const exact = results.filter((r) => r.match?.kind === 'exact').length;
  const names = results.filter((r) => r.match?.kind === 'name').length;
  const close = n - exact - names;
  const parts = [exact && `${exact} exact breed ${exact === 1 ? 'match' : 'matches'}`, names && `${names} name ${names === 1 ? 'match' : 'matches'}`, close && `${close} close ${close === 1 ? 'match' : 'matches'} (mixes that include it)`].filter(Boolean).join(', ');
  const noExact = n && !exact && !names ? ' No exact breed match: the listings describe these dogs as mixes.' : '';
  return n ? `“${q.trim()}”${filters ? ` · ${filters}` : ''}: ${parts}.${noExact}` : `No dogs in this snapshot match “${q.trim()}”${filters ? ` with ${filters}` : ''}.`;
}

export function AnimalSearch() {
  const { animals, data } = useShelter();
  const [q, setQ] = useState('');
  const [species, setSpecies] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const opts = (label: string) => Array.from(new Set(animals.map((a) => field(a, label)).filter(Boolean) as string[])).sort();
  const shown = useMemo(() => searchAnimals(animals, q).filter(({ animal: a }) => {
    if (species && a.species !== species) return false;
    if (sex && field(a, 'Sex') !== sex) return false;
    if (size && field(a, 'Size') !== size) return false;
    if (age) { const m = ageMonths(field(a, 'Age')); const band = AGE_BANDS.find(([l]) => l === age); if (m === null || !band || !band[1](m)) return false; }
    return true;
  }), [animals, q, species, sex, age, size]);
  const sel = 'h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm';
  return (
    <div className="space-y-5">
      <div>
        <h1 className={`${H} text-3xl font-semibold md:text-4xl`}>Find an animal</h1>
        <p className="mt-1 text-slate-600">{animals.length} dogs from a dated public listing snapshot. Filters use only fields the listings publish.</p>
      </div>
      <SnapshotCaveat at={data.snapshot.captured_at} />
      <form className="grid gap-2 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]" onSubmit={(e) => e.preventDefault()} role="search">
        <label className="sr-only" htmlFor="q">Name or breed</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or breed (e.g. lab, terrier)" className={sel} />
        <label className="sr-only" htmlFor="species">Species</label>
        <select id="species" value={species} onChange={(e) => setSpecies(e.target.value)} className={sel}><option value="">Any species</option>{Array.from(new Set(animals.map((a) => a.species))).map((s) => <option key={s}>{s}</option>)}</select>
        <label className="sr-only" htmlFor="sex">Sex</label>
        <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)} className={sel}><option value="">Any sex</option>{opts('Sex').map((s) => <option key={s}>{s}</option>)}</select>
        <label className="sr-only" htmlFor="age">Age</label>
        <select id="age" value={age} onChange={(e) => setAge(e.target.value)} className={sel}><option value="">Any age</option>{AGE_BANDS.map(([l]) => <option key={l}>{l}</option>)}</select>
        <label className="sr-only" htmlFor="size">Size</label>
        <select id="size" value={size} onChange={(e) => setSize(e.target.value)} className={sel}><option value="">Any size</option>{opts('Size').map((s) => <option key={s}>{s}</option>)}</select>
      </form>
      <p className="text-sm text-slate-700" aria-live="polite" data-testid="search-summary">{describe(q, sex, age, size, shown, animals.length)}</p>
      {shown.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{shown.map(({ animal: a, match }) => <AnimalCard key={a.slug} a={a} match={match} />)}</ul>
      ) : <p className="rounded-2xl bg-white p-8 text-center text-slate-600">Try a broader breed word (for example “terrier” or “shepherd”) or fewer filters.</p>}
    </div>
  );
}

export function AnimalProfile({ slug }: { slug: string }) {
  const { tenant, animal } = useShelter();
  const a = animal(slug);
  const [shot, setShot] = useState(0);
  if (!a) return <p className="py-16 text-center text-slate-600">This animal is not in the snapshot. <Link className="underline" href={osHref(tenant.slug, '/animals')}>Back to search</Link></p>;
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
      <div>
        <Photo a={a} i={shot} sizes="(min-width:768px) 45vw, 100vw" priority className="aspect-[4/5] rounded-2xl" />
        {a.photos.length > 1 ? (
          <div className="mt-2 flex gap-2">
            {a.photos.map((p, i) => (
              <button key={p.key} type="button" onClick={() => setShot(i)} aria-label={`Photo ${i + 1} of ${a.name}`} className={`relative h-16 w-16 overflow-hidden rounded-lg ring-2 ${i === shot ? 'ring-[var(--brand)]' : 'ring-transparent'}`}>
                <Image src={p.src as string} alt="" fill sizes="64px" unoptimized className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
        <p className="mt-2 text-xs text-slate-500">Photos: Marin Humane public listing (copied for this preview; originals linked on the listing).</p>
      </div>
      <div>
        <Link href={osHref(tenant.slug, '/animals')} className="text-sm font-medium text-slate-500 hover:text-slate-900">← All animals</Link>
        <h1 className={`${H} mt-2 text-4xl font-semibold`}>{a.name}</h1>
        <SnapshotCaveat at={a.captured_at} className="mt-3" />
        <dl className="mt-4 divide-y divide-slate-200 rounded-2xl bg-white px-4 shadow-sm ring-1 ring-black/5">
          {a.fields.map((f) => (
            <div key={f.label} className="grid grid-cols-[10rem_1fr] gap-3 py-2.5 text-sm">
              <dt className="text-slate-500">{f.label}</dt>
              <dd className="font-medium">{f.label === 'Age' ? readableAge(f.value) : f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-slate-600">Shown: only the fields this official listing publishes. The listing’s own description and health notes are on the official page.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={osHref(tenant.slug, `/ask?animal=${a.slug}`)} className="rounded-full bg-[var(--brand)] px-5 py-3 font-semibold text-white hover:bg-[var(--brand-dark)]">Ask about {a.name}</Link>
          <Link href={osHref(tenant.slug, `/meet?animal=${a.slug}`)} className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold">Request a meeting (sample)</Link>
        </div>
        <a href={a.source_listing_url} target="_blank" rel="noopener noreferrer nofollow" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] underline underline-offset-2">
          View {a.name} on the official Marin Humane listing <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
        <div className="mt-8"><DemoLine compact /></div>
      </div>
    </div>
  );
}

/** Reads ?animal= for the inquiry and meeting forms. */
export function useAnimalParam(): string {
  return useSearchParams()?.get('animal') ?? '';
}
