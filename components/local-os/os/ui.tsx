'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { osBase } from '@/lib/local-os/presentation';

export { osBase };

export const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const TZ = 'America/Los_Angeles';
export const when = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString('en-US', { timeZone: TZ, weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
    : '—';
export const timeOnly = (iso: string) => new Date(iso).toLocaleTimeString('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' });
export const isToday = (iso: string) =>
  new Date(iso).toLocaleDateString('en-CA', { timeZone: TZ }) === new Date().toLocaleDateString('en-CA', { timeZone: TZ });

export function osHref(slug: string, path = ''): Route {
  return `${osBase(slug)}${path}` as Route;
}

export function SampleBadge() {
  return (
    <span className="inline-flex shrink-0 items-center rounded bg-amber-200 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-950">
      Sample
    </span>
  );
}

export function Pill({ children, tone = 'slate' }: { children: React.ReactNode; tone?: 'slate' | 'red' | 'green' | 'amber' | 'blue' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    red: 'bg-red-100 text-red-800',
    green: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-900',
    blue: 'bg-sky-100 text-sky-800',
  } as const;
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

export function Card({ title, action, children }: { title?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {title || action ? (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title ? <h2 className="text-sm font-semibold text-slate-900">{title}</h2> : <span />}
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Guardrail({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-950">{children}</p>;
}

export function NavLink({ href, children }: { href: Route; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium text-[var(--brand)] underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}

export const leadTone = (status: string): 'slate' | 'red' | 'green' | 'amber' | 'blue' =>
  status === 'new' ? 'red' : status === 'callback' || status === 'follow_up' ? 'amber' : status === 'won' ? 'green' : status === 'quoted' || status === 'qualified' ? 'blue' : 'slate';
