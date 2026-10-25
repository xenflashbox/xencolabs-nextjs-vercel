'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { DemoProvider, useDemo } from '@/components/local-os/os/demo-store';
import { DemoTour } from '@/components/local-os/os/demo-tour';
import { PreviewBar } from '@/components/local-os/os/preview/preview-bar';
import { FIELD } from '@/components/local-os/os/preview/type';
import { TenantLogo } from '@/components/local-os/os/tenant-logo';
import { osBase, osHref } from '@/components/local-os/os/ui';
import type { TenantConfig } from '@/lib/local-os/tenant-types';
import { termsOf } from '@/lib/local-os/terms';
import { getTenant } from '@/lib/local-os/tenants';
import type { ProspectEntryData } from '@/lib/local-os/prospect/build';

function ResetButton() {
  const { reset } = useDemo();
  return (
    <button
      type="button"
      onClick={() => window.confirm('Reset this workspace to its starting state?') && reset()}
      className="rounded-md border border-white/30 px-2 py-1 text-xs text-white/90 hover:bg-white/10"
    >
      Reset workspace
    </button>
  );
}

/**
 * One business system, three zones:
 *   site    /os/[t], /services, /request, /status, /estimate, /report, /invoice — the customer side,
 *           light header with the colour-on-light wordmark (shield on phones)
 *   office  /os/[t]/office/... — dark header, colour-on-dark wordmark (shield on phones)
 *   tech    /os/[t]/tech/...   — dark compact header with the shield
 * The amber band and the demo tour are on every screen.
 */
export function TenantShell({ tenant, prospect, children }: { tenant: TenantConfig; prospect?: ProspectEntryData; children: React.ReactNode }) {
  const path = usePathname() ?? '';
  const base = osBase(tenant.slug);
  const vertical = prospect?.vertical ?? getTenant(tenant.slug)?.vertical;
  const fieldView = vertical ? termsOf(vertical).fieldView : 'Technician';
  const zone = path.startsWith(`${base}/office`) ? 'office' : path.startsWith(`${base}/tech/`) ? 'tech' : 'site';
  const office: [string, string][] = [
    ['/office', 'Dashboard'],
    ['/office/requests', 'Requests'],
    ['/office/intake', 'Phone intake'],
  ];

  return (
    <div
      className="min-h-[100dvh] text-slate-900"
      style={{
        background: tenant.branding.light,
        ['--paper' as string]: tenant.branding.light,
        ['--brand' as string]: tenant.branding.primary,
        ['--brand-dark' as string]: tenant.branding.primaryDark,
      }}
    >
      <DemoProvider slug={tenant.slug} prospect={prospect}>
      {/* Prospect previews dock the tour in the preview bar; registry tenants keep the floating pill. */}
      {tenant.slug === 'nemesis-fire' && zone === 'site' ? null : <PreviewBar tenant={tenant} fieldView={fieldView} tour={prospect ? <DemoTour tenant={tenant} variant="bar" /> : undefined} />}
        {zone === 'site' ? (
          <>
            <div style={{ background: tenant.branding.primary }} className="px-4 py-1.5 text-center text-sm font-medium text-white">
              {tenant.site.emergencyLine}{' '}
              <a href={`tel:+1${tenant.phone.replace(/[^0-9]/g, '')}`} className="font-bold underline underline-offset-2">{tenant.phone}</a>
            </div>
            <header className="border-b border-neutral-300 bg-[var(--paper)]">
              <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
                <Link href={osHref(tenant.slug)} aria-label={`${tenant.name} home`} className="flex items-center">
                  <TenantLogo tenant={tenant} surface="shieldOnLight" height={40} className="sm:hidden" />
                  <TenantLogo tenant={tenant} surface="wordmarkOnLight" height={40} className="hidden sm:block" />
                </Link>
                <nav className="flex items-center gap-1 text-sm">
                  <Link href={osHref(tenant.slug, '/#services')} className="hidden rounded-md px-3 py-2 hover:bg-slate-100 sm:block">Services</Link>
                  <a href={`tel:+1${tenant.phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-1 rounded-md px-3 py-2 font-medium hover:bg-slate-100">
                    <Phone className="h-4 w-4" /> <span className="hidden md:inline">{tenant.phone}</span><span className="md:hidden">Call</span>
                  </a>
                  <Link href={osHref(tenant.slug, '/request')} className="lo-btn bg-[var(--brand)] px-3 py-2 font-semibold text-white hover:bg-[var(--brand-dark)]">{tenant.site.ctaLabel ?? 'Request service'}</Link>
                </nav>
              </div>
            </header>
            <main className="pb-28">{children}</main>
            <footer style={{ background: tenant.branding.surface }} className="px-4 pb-24 pt-8 text-sm text-white/80">
              <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
                <div>
                  <TenantLogo tenant={tenant} surface="wordmarkOnDark" height={36} />
                  <p className={`${FIELD} mt-3 text-[11px] text-white/60`}>{tenant.site.tagline}</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Contact</p>
                  <p className="mt-1">{tenant.phone}</p>
                  <p>{tenant.region}</p>
                </div>
                <div>
                  <p className="font-semibold text-white">{tenant.license ? 'Licence' : 'About this preview'}</p>
                  {tenant.license ? <p className="mt-1">{tenant.license}</p> : null}
                  {tenant.slug === 'nemesis-fire' ? null : <p className="mt-3 text-xs text-white/60">Preview of a customer website by Xenco Labs. Sample content; not the live {tenant.website?.replace('https://', '')}.</p>}
                </div>
              </div>
            </footer>
          </>
        ) : (
          <>
            <header style={{ background: tenant.branding.surface }}>
              <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  {zone === 'tech' ? (
                    <TenantLogo tenant={tenant} surface="shieldOnDark" height={40} />
                  ) : (
                    <>
                      <TenantLogo tenant={tenant} surface="shieldOnDark" height={40} className="sm:hidden" />
                      <TenantLogo tenant={tenant} surface="wordmarkOnDark" height={36} className="hidden sm:block" />
                    </>
                  )}
                  <div className="min-w-0 text-white">
                    <p className={`truncate font-semibold ${zone === 'tech' ? '' : 'sm:sr-only'}`}>
                      {tenant.name} · {zone === 'tech' ? fieldView : 'Office'}
                    </p>
                    <p className="truncate text-xs text-white/70">
                      {zone === 'tech' ? null : <span className="hidden sm:inline">Office · </span>}
                      {tenant.license ? `${tenant.license} · ` : ''}
                      {tenant.region}
                    </p>
                  </div>
                </div>
                {zone === 'office' ? (
                  <div className="flex flex-wrap items-center gap-1">
                    {office.map(([p, label]) => (
                      <Link
                        key={p}
                        href={osHref(tenant.slug, p)}
                        className={`rounded-md px-3 py-1.5 text-sm ${path === base + p ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'}`}
                      >
                        {label}
                      </Link>
                    ))}
                    <Link href={osHref(tenant.slug)} className="rounded-md px-3 py-1.5 text-sm text-white/80 hover:bg-white/10">Customer site</Link>
                    <ResetButton />
                  </div>
                ) : null}
              </div>
            </header>
            <main className="mx-auto max-w-5xl px-4 pb-28 pt-5">{children}</main>
            <footer className="mx-auto max-w-5xl px-4 pb-24 text-xs text-slate-500">
              {tenant.slug === 'nemesis-fire' ? 'Nemesis Fire · Fire protection services' : `Local OS by Xenco Labs · private preview for ${tenant.name}. Seeded records are fictional samples.`}
            </footer>
          </>
        )}
        {prospect || tenant.slug === 'nemesis-fire' ? null : <DemoTour tenant={tenant} />}
      </DemoProvider>
    </div>
  );
}
