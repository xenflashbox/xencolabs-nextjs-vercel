'use client';

import { TenantLogo } from '@/components/local-os/os/tenant-logo';
import type { TenantConfig } from '@/lib/local-os/tenant-types';

/**
 * Every generated document (report, estimate, invoice) renders inside this frame: the
 * tenant letterhead, a SAMPLE banner top and bottom, and a diagonal watermark, so no screen
 * or screenshot of it can pass as a certification, invoice or official filing.
 */
export function DocFrame({ tenant, title, notice, children }: { tenant: TenantConfig; title: string; notice: string; children: React.ReactNode }) {
  return (
    <article className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
      <div className="bg-amber-300 px-4 py-2 text-center text-xs font-bold text-amber-950">{notice}</div>
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="-rotate-[24deg] select-none whitespace-nowrap text-4xl font-black uppercase tracking-widest text-slate-900/[0.05] sm:text-7xl">Sample preview</span>
      </div>
      <header className="relative flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 p-5">
        <TenantLogo tenant={tenant} surface="wordmarkOnLight" height={40} />
        <div className="text-right text-xs text-slate-600">
          <p className="text-base font-semibold text-slate-900">{title}</p>
          <p>{tenant.license}</p>
          <p>{tenant.phone}</p>
        </div>
      </header>
      <div className="relative p-5">{children}</div>
      <div className="relative bg-amber-300 px-4 py-2 text-center text-xs font-bold text-amber-950">{notice}</div>
    </article>
  );
}
