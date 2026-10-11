'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Compass, X } from 'lucide-react';
import { osBase, osHref } from '@/components/local-os/os/ui';
import type { TenantConfig } from '@/lib/local-os/tenant-types';

/** The guided story through the preview: customer site → request → documents → office → technician. */
export function DemoTour({ tenant }: { tenant: TenantConfig }) {
  const path = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const base = osBase(tenant.slug);
  const idx = tenant.tour.findIndex((t) => base + t.path === path);
  const next = tenant.tour[idx + 1];
  return (
    <div className="fixed bottom-4 left-4 z-40 print:hidden">
      {open ? (
        <div className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold">Demo tour · {tenant.name}</p>
            <button type="button" aria-label="Close tour" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-slate-100"><X className="h-4 w-4" /></button>
          </div>
          <ol className="max-h-[60vh] space-y-1 overflow-y-auto text-sm">
            {tenant.tour.map((t, i) => (
              <li key={t.label}>
                <Link href={osHref(tenant.slug, t.path)} onClick={() => setOpen(false)} className={`block rounded-lg px-2 py-1.5 ${i === idx ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`}>
                  <span className="tabular-nums">{i + 1}.</span> {t.label}
                  <span className={`block text-xs ${i === idx ? 'text-white/70' : 'text-slate-500'}`}>{t.detail}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-lg sm:px-4 sm:py-2.5">
            <Compass className="h-4 w-4" /> <span className="hidden sm:inline">Demo tour</span><span className="sm:hidden">Tour</span>{idx >= 0 ? ` ${idx + 1}/${tenant.tour.length}` : ''}
          </button>
          {next ? (
            <Link href={osHref(tenant.slug, next.path)} className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-lg ring-1 ring-slate-200 sm:py-2.5">
              <span className="hidden sm:inline">Next: {next.label} </span><span className="sm:hidden">Next </span>→
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
}
