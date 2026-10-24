'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FieldVideo } from '@/components/local-os/os/preview/field-media';
import { DISPLAY, FIELD } from '@/components/local-os/os/preview/type';
import { osHref } from '@/components/local-os/os/ui';
import type { ProofItem } from '@/lib/local-os/tenant-types';
import { termsOf } from '@/lib/local-os/terms';
import { useDemo } from '@/components/local-os/os/demo-store';


/**
 * Real-work proof: the clip of the work, what it is, and where that work appears in the system.
 * Copy sits under the media (never over it), so no overlay or gradient covers the work.
 */
export function ProofCard({ slug, item, index, label = 'Field proof' }: { slug: string; item: ProofItem; index: number; label?: string }) {
  const { vertical } = useDemo();
  const VIEW_LABEL = { customer: 'Customer', office: 'Office', technician: vertical ? termsOf(vertical).fieldView : 'Technician' } as const;
  return (
    <article className="flex flex-col border border-neutral-800 bg-neutral-950 text-white">
      <FieldVideo video={item.video} />
      <div className="flex flex-1 flex-col p-5">
        <p className={`${FIELD} text-[10px] text-[var(--brand)]`}>{label} {String(index + 1).padStart(2, '0')}</p>
        <h3 className={`${DISPLAY} mt-1 text-2xl font-semibold uppercase leading-tight`}>{item.title}</h3>
        <p className="mt-2 flex-1 text-sm text-neutral-400">{item.body}</p>
        <ul className="mt-4 divide-y divide-neutral-800 border-y border-neutral-800">
          {item.links.map((l) => (
            <li key={l.path}>
              <Link href={osHref(slug, l.path)} className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="flex items-center gap-3">
                  <span className={`${FIELD} w-[5.5rem] shrink-0 text-[10px] text-neutral-500`}>{VIEW_LABEL[l.view]}</span>
                  <span className="font-medium group-hover:text-amber-300">{l.label}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-neutral-500 group-hover:text-amber-300" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
