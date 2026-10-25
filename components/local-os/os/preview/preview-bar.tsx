'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall } from 'lucide-react';
import { osBase, osHref } from '@/components/local-os/os/ui';
import { FIELD } from '@/components/local-os/os/preview/type';
import type { TenantConfig } from '@/lib/local-os/tenant-types';
import { XENCO_AI_DEMO } from '@/lib/local-os/xenco-demo';
import { linksOf } from '@/lib/local-os/terms';

/**
 * The private-preview navigation, on every screen of every tenant: says this is a Xenco preview
 * with sample data, bridges the customer site ↔ office ↔ technician, and carries the Xenco live AI
 * receptionist number (a Xenco line, never the tenant's).
 */
export function PreviewBar({ tenant, fieldView = 'Technician', tour }: { tenant: TenantConfig; fieldView?: string; tour?: React.ReactNode }) {
  // Nemesis has its own client-facing presentation and token-gated workspace. Do not expose
  // the generic Xenco concept-preview ribbon or demo phone UI on that branded experience.
  if (tenant.slug === 'nemesis-fire') return null;
  const path = usePathname() ?? '';
  const base = osBase(tenant.slug);
  const zone = path.startsWith(`${base}/office`) ? 'office' : path.startsWith(`${base}/tech/`) ? 'tech' : 'site';
  const links: [string, string, string][] = [
    ['site', '', 'Website'],
    ['office', '/office', 'Office'],
    ['tech', linksOf(tenant).field, fieldView],
  ];
  return (
    <div role="navigation" aria-label="Private preview" className="sticky top-0 z-40 border-b border-amber-500/40 bg-amber-300 text-amber-950">
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-1.5 text-xs">
        <span className={`${FIELD} text-[10px] font-semibold`}>{tour ? 'Private Xenco Labs concept preview · sample data' : `Private Xenco Labs concept preview for ${tenant.name} · sample data only`}</span>
        <nav className="flex items-center gap-1">
          {links.map(([z, p, label]) => (
            <Link key={z} href={osHref(tenant.slug, p)} className={`rounded px-2 py-0.5 font-semibold ${zone === z ? 'bg-amber-950 text-amber-100' : 'hover:bg-amber-200'}`}>
              {label}
            </Link>
          ))}
        </nav>
        {tour}
        {tenant.aiDemo ? (
          <a href={`tel:${XENCO_AI_DEMO.tel}`} className="ml-auto inline-flex items-center gap-1.5 rounded bg-amber-950 px-2 py-0.5 font-semibold text-amber-100" title={XENCO_AI_DEMO.disclaimer(tenant.name)}>
            <PhoneCall className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{tenant.aiDemoHeading ?? XENCO_AI_DEMO.heading} ·</span> {XENCO_AI_DEMO.display}
            <span className="hidden md:inline font-normal text-amber-200/80">(Xenco demo)</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
