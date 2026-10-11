'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { osHref } from '@/components/local-os/os/ui';
import { DISPLAY, FIELD } from '@/components/local-os/os/preview/type';
import type { CustomerStep } from '@/lib/local-os/tenant-types';

export interface LifecycleStage extends CustomerStep {
  done?: boolean
  current?: boolean
  /** Link for this stage in context (e.g. this customer's report); falls back to the sample. */
  href?: string | null
}

/**
 * The tenant's lifecycle (fire protection: "Protection lifecycle" — Request → Inspect → Report →
 * Approve repairs → Complete → Invoice), as numbered field stations joined by a rule.
 *   showcase: the homepage signature section; every station links to a sample record
 *   status:   one customer's progress; done / current / upcoming
 */
export function Lifecycle({ slug, name, stages, variant }: { slug: string; name: string; stages: LifecycleStage[]; variant: 'showcase' | 'status' }) {
  const dark = variant === 'showcase';
  // Showcase runs horizontally from md up; the status view always stacks (it sits in a narrow column).
  const h = variant === 'showcase';
  return (
    <div>
      <p className={`${FIELD} text-[11px] ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>{name}</p>
      <ol className={`relative mt-4 grid gap-0 ${h ? 'md:grid-cols-6' : ''}`}>
        {stages.map((st, i) => {
          const code = String(i + 1).padStart(2, '0');
          const href = st.href ?? (variant === 'showcase' ? st.sample ?? null : null);
          const active = variant === 'showcase' || st.done || st.current;
          return (
            <li key={st.id} className={`relative flex gap-4 border-l-2 pb-7 pl-5 last:pb-0 ${h ? 'md:block md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pr-4 md:pt-5' : ''} ${active ? 'border-[var(--brand)]' : dark ? 'border-neutral-700' : 'border-neutral-300'}`}>
              <span
                className={`absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center text-[11px] font-bold ${h ? 'md:-top-[13px] md:left-0' : ''} ${
                  st.done ? 'bg-[var(--brand)] text-white' : st.current ? 'border-2 border-[var(--brand)] bg-white text-[var(--brand-dark)]' : variant === 'showcase' ? 'bg-[var(--brand)] text-white' : 'bg-neutral-300 text-neutral-600'
                }`}
              >
                {st.done ? <Check className="h-3.5 w-3.5" /> : code}
              </span>
              <div className={h ? 'md:mt-2' : ''}>
                <p className={`${FIELD} text-[10px] ${dark ? 'text-neutral-500' : 'text-neutral-500'}`}>Stage {code}</p>
                <p className={`${DISPLAY} text-2xl font-semibold uppercase leading-tight ${dark ? 'text-white' : active ? 'text-neutral-900' : 'text-neutral-400'}`}>{st.label}</p>
                <p className={`mt-1 text-sm ${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>{st.detail}</p>
                {href && (variant === 'showcase' || st.done || st.current) ? (
                  <Link href={osHref(slug, href)} className={`mt-2 inline-block text-sm font-semibold underline underline-offset-4 ${dark ? 'text-white decoration-[var(--brand)]' : 'text-[var(--brand-dark)]'}`}>
                    {variant === 'showcase' ? 'View sample →' : st.id === 'approved' && !st.done ? 'Review and approve →' : 'Open →'}
                  </Link>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
