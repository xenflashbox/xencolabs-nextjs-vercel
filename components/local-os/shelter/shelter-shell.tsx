'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dog, Info, PhoneCall } from 'lucide-react';
import { ShelterProvider, useShelter } from '@/components/local-os/shelter/shelter-store';
import { osBase, osHref } from '@/components/local-os/os/ui';
import type { TenantConfig } from '@/lib/local-os/tenant-types';
import { XENCO_AI_DEMO } from '@/lib/local-os/xenco-demo';

/** Routes the shelter concept owns; anything else under the tenant (estimates, jobs…) is not part of it. */
const ROUTES = [/^$/, /^\/animals$/, /^\/animals\/[a-z0-9-]+$/, /^\/adopt$/, /^\/ask$/, /^\/meet$/, /^\/office$/, /^\/xenco$/];

export const captured = (iso: string) =>
  new Date(iso).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles', timeZoneName: 'short' });

/** The status line every animal result carries (wording from the brief). */
export function SnapshotCaveat({ at, className = '' }: { at: string; className?: string }) {
  return (
    <p className={`flex gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950 ${className}`}>
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>Public listing snapshot captured {captured(at)}. Availability can change; confirm on the official Marin Humane listing.</span>
    </p>
  );
}

export function DemoLine({ compact = false }: { compact?: boolean }) {
  const { tenant, data } = useShelter();
  const live = data.content.voice_shelter_branch_live === true;
  return (
    <section className={`rounded-2xl bg-[var(--surface)] text-white ${compact ? 'p-4' : 'p-6'}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">{XENCO_AI_DEMO.label} · not {tenant.name}’s phone line</p>
      <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">{live ? 'Ask the AI guide about an animal' : 'Call the live Xenco AI guide'}</h2>
      <p className="mt-1 text-sm text-white/80">{live
        ? 'Call the Xenco Labs demo line, say you’re asking about a shelter, and try “Do you have any small dogs?”. It searches only this dated snapshot and can book a meeting with Xenco Labs, never a shelter appointment.'
        : 'Hear how an AI receptionist answers a call, explains the workflow and books a real walkthrough with Xenco Labs. It never books or confirms a shelter appointment.'}</p>
      <a href={`tel:${XENCO_AI_DEMO.tel}`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-slate-900">
        <PhoneCall className="h-4 w-4" aria-hidden /> {XENCO_AI_DEMO.display}
      </a>
      <p className="mt-2 text-xs text-white/60">{XENCO_AI_DEMO.disclaimer(tenant.name)}</p>
    </section>
  );
}

function Frame({ tenant, children }: { tenant: TenantConfig; children: React.ReactNode }) {
  const path = usePathname() ?? '';
  const base = osBase(tenant.slug);
  const rest = path.startsWith(base) ? path.slice(base.length) : path;
  const zone = rest.startsWith('/office') ? 'office' : 'site';
  const { reset, data } = useShelter();
  const owned = ROUTES.some((r) => r.test(rest));
  const nav: [string, string][] = [['/animals', 'Find an animal'], ['/adopt', 'How adoption works'], ['/ask', 'Ask about an animal']];
  return (
    <>
      <div role="note" className="bg-amber-300 text-amber-950">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-1.5 text-xs">
          <span className="font-semibold">Private Xenco Labs concept preview — not affiliated with {tenant.name}</span>
          <nav className="flex items-center gap-1" aria-label="Preview">
            <Link href={osHref(tenant.slug)} className={`rounded px-2 py-0.5 font-semibold ${zone === 'site' ? 'bg-amber-950 text-amber-100' : 'hover:bg-amber-200'}`}>Website</Link>
            <Link href={osHref(tenant.slug, '/office')} className={`rounded px-2 py-0.5 font-semibold ${zone === 'office' ? 'bg-amber-950 text-amber-100' : 'hover:bg-amber-200'}`}>Staff queue</Link>
          </nav>
          <a href={`tel:${XENCO_AI_DEMO.tel}`} className="ml-auto inline-flex items-center gap-1.5 rounded bg-amber-950 px-2 py-0.5 font-semibold text-amber-100" title={XENCO_AI_DEMO.disclaimer(tenant.name)}>
            <PhoneCall className="h-3.5 w-3.5" aria-hidden /> AI demo line {XENCO_AI_DEMO.display}
          </a>
        </div>
      </div>
      <header className={zone === 'office' ? 'bg-[var(--surface)] text-white' : 'border-b border-black/5 bg-white'}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <Link href={osHref(tenant.slug)} className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--brand)] text-white"><Dog className="h-5 w-5" aria-hidden /></span>
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] text-lg font-semibold">{tenant.name}</span>
              <span className={`block text-[11px] ${zone === 'office' ? 'text-white/60' : 'text-slate-500'}`}>Adoption concept · sample data</span>
            </span>
          </Link>
          {zone === 'office' ? (
            <div className="ml-auto flex items-center gap-2 text-sm">
              <span className="hidden text-white/70 sm:inline">Staff view (fictional records)</span>
              <button type="button" onClick={() => window.confirm('Reset all sample inquiries to the starting state?') && reset()} className="rounded-md border border-white/30 px-2 py-1 text-xs hover:bg-white/10">Reset sample data</button>
            </div>
          ) : (
            <nav className="ml-auto flex flex-wrap items-center gap-1 text-sm" aria-label="Site">
              {nav.map(([p, l]) => (
                <Link key={p} href={osHref(tenant.slug, p)} className={`rounded-full px-3 py-1.5 font-medium ${rest.startsWith(p) ? 'bg-[var(--brand)] text-white' : 'text-slate-700 hover:bg-slate-100'}`}>{l}</Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6">
        {owned ? children : (
          <div className="mx-auto max-w-lg py-16 text-center">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">Not part of this concept</h1>
            <p className="mt-2 text-slate-600">This shelter preview covers animal search, adoption information, inquiries and the staff queue.</p>
            <Link href={osHref(tenant.slug)} className="mt-4 inline-block rounded-full bg-[var(--brand)] px-4 py-2 font-semibold text-white">Back to the homepage</Link>
          </div>
        )}
      </main>
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-600 md:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-900">About this preview</p>
            <p className="mt-1">A private Xenco Labs sales concept that uses {tenant.name}’s public pages as research. It is not {tenant.name}’s website, is not affiliated with or endorsed by {tenant.name}, and is not connected to its ShelterBuddy system.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Data</p>
            <p className="mt-1">Animals: a one-time public listing snapshot captured {captured(data.snapshot.captured_at)}, not a live feed. Inquiries, meeting requests and staff records are fictional samples that stay in this browser.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Sources</p>
            <ul className="mt-1 space-y-1">
              {data.content.sources.map((s) => (
                <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-slate-900">{s.title}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export function ShelterShell({ tenant, children }: { tenant: TenantConfig; children: React.ReactNode }) {
  return (
    <div
      className="min-h-[100dvh] text-slate-900"
      style={{ background: tenant.branding.light, ['--brand' as string]: tenant.branding.primary, ['--brand-dark' as string]: tenant.branding.primaryDark, ['--surface' as string]: tenant.branding.surface, ['--accent' as string]: tenant.branding.theme?.accent ?? tenant.branding.primary }}
    >
      <ShelterProvider tenant={tenant}>
        <Frame tenant={tenant}>{children}</Frame>
      </ShelterProvider>
    </div>
  );
}
