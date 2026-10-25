'use client';

import Link from 'next/link';
import { useDemo } from '@/components/local-os/os/demo-store';
import { Lifecycle } from '@/components/local-os/os/preview/lifecycle';
import { SampleBadge, money, osHref, when } from '@/components/local-os/os/ui';
import { journeyFor, lineTotal } from '@/lib/local-os/journey';
import { termsOf } from '@/lib/local-os/terms';

/**
 * The customer's job-status page for one request: request received → inspection scheduled →
 * report / estimate → approved work → completion → invoice, each step linking to its document.
 * No internal notes, no office-only status.
 */
export function SiteStatus({ id }: { id: string }) {
  const { tenant, vertical, state } = useDemo();
  const j = journeyFor(state, vertical, id);
  if (!j) return <p className="mx-auto max-w-3xl p-6 text-sm">No such sample request.</p>;
  const s = tenant.slug;
  const next = j.jobs.find((x) => ['scheduled', 'confirmed', 'in_progress'].includes(x.status));
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="flex items-center gap-2 text-xs text-slate-500"><SampleBadge /> Request {j.lead.id}</p>
        <h1 className="mt-2 text-2xl font-bold">{j.lead.company ?? j.lead.name}</h1>
        <p className="text-slate-600">{j.lead.workType} · {j.lead.address}</p>
        {next ? (
          <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm">
            Next visit: <strong>{when(next.scheduledStart)}</strong> · {next.title} · {termsOf(vertical).field.toLowerCase()} {next.technician}
          </p>
        ) : null}
      </div>

      <div className="border border-neutral-300 bg-white p-6">
        <Lifecycle slug={s} name={vertical.lifecycleName} stages={j.steps} variant="status" />
      </div>

      {j.quotes.filter((q) => ['sent', 'accepted'].includes(q.status)).length || j.invoices.filter((i) => i.status !== 'draft').length ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm shadow-sm">
          <p className="font-semibold">Documents</p>
          <ul className="mt-2 space-y-1">
            {j.reports.filter((r) => r.reviewedBy).map((r) => <li key={r.id}><Link className="underline" href={osHref(s, `/report/${r.id}`)}>{r.number}</Link></li>)}
            {j.quotes.filter((q) => ['sent', 'accepted'].includes(q.status)).map((q) => <li key={q.id}><Link className="underline" href={osHref(s, `/estimate/${q.id}`)}>{q.number}</Link> · {money(lineTotal(q.lines))} (sample) · {q.status === 'accepted' ? 'approved' : 'awaiting your approval'}</li>)}
            {j.invoices.filter((i) => i.status !== 'draft').map((i) => <li key={i.id}><Link className="underline" href={osHref(s, `/invoice/${i.id}`)}>{i.number}</Link> · {i.status}</li>)}
          </ul>
        </div>
      ) : null}
      <p className="text-sm text-slate-600">Questions or need to reschedule? Call <a className="font-semibold text-[var(--brand-dark)] underline" href={`tel:+1${tenant.phone.replace(/[^0-9]/g, '')}`}>{tenant.phone}</a>. <span className="text-xs text-slate-500">Preview: sample request; no message was sent to anyone.</span></p>
    </div>
  );
}
