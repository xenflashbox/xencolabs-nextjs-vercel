'use client';

import { PhoneCall } from 'lucide-react';
import { XENCO_AI_DEMO } from '@/lib/local-os/xenco-demo';

/**
 * The Xenco Labs live AI receptionist. Always labelled as Xenco's demonstration, never as
 * the tenant's line, and never offered for emergencies.
 */
export function AiDemoPanel({ tenantName, variant = 'card' }: { tenantName: string; variant?: 'card' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-300">{XENCO_AI_DEMO.label}</p>
        <p className="mt-1 font-semibold">{XENCO_AI_DEMO.heading}</p>
        <a href={`tel:${XENCO_AI_DEMO.tel}`} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-900">
          <PhoneCall className="h-4 w-4" /> {XENCO_AI_DEMO.display}
        </a>
        <p className="mt-2 text-xs text-slate-300">{XENCO_AI_DEMO.disclaimer(tenantName)}</p>
      </div>
    );
  }
  return (
    <section aria-label={XENCO_AI_DEMO.label} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-lg">
      <div className="bg-amber-300 px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-950">{XENCO_AI_DEMO.label} · not {tenantName}’s phone line</div>
      <div className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">{XENCO_AI_DEMO.heading}</h2>
          <p className="mt-2 max-w-2xl text-slate-300">{XENCO_AI_DEMO.copy}</p>
          <p className="mt-3 text-xs text-slate-400">{XENCO_AI_DEMO.disclaimer(tenantName)}</p>
        </div>
        <a href={`tel:${XENCO_AI_DEMO.tel}`} className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-xl font-bold text-slate-950 shadow hover:bg-slate-100">
          <PhoneCall className="h-6 w-6" /> {XENCO_AI_DEMO.display}
        </a>
      </div>
    </section>
  );
}
