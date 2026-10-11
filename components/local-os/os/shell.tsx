'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DemoProvider, useDemo } from '@/components/local-os/os/demo-store';
import { osHref } from '@/components/local-os/os/ui';
import type { TenantConfig } from '@/lib/local-os/tenant-types';

function ResetButton() {
  const { reset } = useDemo();
  return (
    <button
      type="button"
      onClick={() => window.confirm('Reset all sample data to the starting state?') && reset()}
      className="rounded-md border border-white/30 px-2 py-1 text-xs text-white/90 hover:bg-white/10"
    >
      Reset sample data
    </button>
  );
}

/**
 * Owner-facing chrome. The amber band is on every screen: this is a private
 * preview running on sample data, and nothing in it is sent, booked, charged or
 * certified. The technician and customer views drop the owner nav but keep the band.
 */
export function TenantShell({ tenant, children }: { tenant: TenantConfig; children: React.ReactNode }) {
  const path = usePathname() ?? '';
  const base = `/os/${tenant.slug}`;
  const isCustomer = path.startsWith(`${base}/status/`);
  const isTech = path.startsWith(`${base}/tech/`);
  const nav: [string, string][] = [
    ['', 'Dashboard'],
    ['/requests', 'Requests'],
    ['/intake', 'New request'],
  ];
  return (
    <div
      className="min-h-[100dvh] bg-slate-50 text-slate-900"
      style={{ ['--brand' as string]: tenant.branding.primary, ['--brand-dark' as string]: tenant.branding.primaryDark }}
    >
      <div role="note" className="sticky top-0 z-30 bg-amber-300 px-4 py-1.5 text-center text-xs font-semibold text-amber-950">
        Private alpha preview · sample data only · nothing is sent, booked, charged or certified
      </div>
      <DemoProvider slug={tenant.slug}>
        <header style={{ background: tenant.branding.surface }}>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              {/* The client's own logo, from their public site. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tenant.branding.logoOnDark} alt={tenant.name} className="h-10 w-10 shrink-0 object-contain" />
              <div className="min-w-0 text-white">
                <p className="truncate font-semibold">
                  {tenant.name}
                  {isTech ? ' · Technician' : isCustomer ? '' : ' · Office'}
                </p>
                <p className="truncate text-xs text-white/70">
                  {tenant.license ? `${tenant.license} · ` : ''}
                  {tenant.region}
                </p>
              </div>
            </div>
            {isCustomer || isTech ? null : (
              <div className="flex flex-wrap items-center gap-1">
                {nav.map(([p, label]) => (
                  <Link
                    key={p}
                    href={osHref(tenant.slug, p)}
                    className={`rounded-md px-3 py-1.5 text-sm ${path === base + p ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'}`}
                  >
                    {label}
                  </Link>
                ))}
                <ResetButton />
              </div>
            )}
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 pb-24 pt-5">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 pb-10 text-xs text-slate-500">
          Local OS by Xenco Labs · private preview for {tenant.name}. Seeded records are fictional samples.
        </footer>
      </DemoProvider>
    </div>
  );
}
