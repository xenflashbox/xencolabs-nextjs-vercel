'use client';

import { useDemo } from '@/components/local-os/os/demo-store';
import { TenantLogo } from '@/components/local-os/os/tenant-logo';
import { SampleBadge, when } from '@/components/local-os/os/ui';

/**
 * What a customer would see from a status link: where their job is, when the
 * technician is coming, and how to reach the office. No prices, no internal
 * notes, no compliance statements.
 */
export function CustomerStatus({ id }: { id: string }) {
  const { tenant, state } = useDemo();
  const j = state.jobs.find((x) => x.id === id);
  if (!j) return <p className="text-sm">No such sample job.</p>;
  const lead = state.leads.find((l) => l.id === j.leadId);
  const quote = state.quotes.find((q) => q.id === j.quoteId);
  const steps = [
    { label: 'Request received', done: true },
    ...(quote ? [{ label: 'Estimate approved', done: quote.status === 'accepted' }] : []),
    { label: 'Appointment scheduled', done: true },
    { label: 'Appointment confirmed', done: j.status !== 'scheduled' },
    { label: 'Technician on site', done: ['in_progress', 'completed', 'report_ready'].includes(j.status) },
    { label: 'Work complete', done: ['completed', 'report_ready'].includes(j.status) },
    { label: 'Report ready from the office', done: j.status === 'report_ready' },
  ];
  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* Light card: the colour-on-light wordmark. */}
        <TenantLogo tenant={tenant} surface="wordmarkOnLight" height={40} className="mb-4" />
        <p className="flex items-center gap-2 text-xs text-slate-500"><SampleBadge /> Job status · {j.number}</p>
        <h1 className="mt-1 text-xl font-semibold">Hi {lead?.name?.split(' ')[0] ?? 'there'}, here is your {tenant.name} appointment</h1>
        <p className="mt-2 text-sm">{j.title}</p>
        <p className="text-sm text-slate-600">{when(j.scheduledStart)} · {lead?.address}</p>
      </div>
      <ol className="space-y-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-3 text-sm">
            <span className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${s.done ? 'bg-[var(--brand)] text-white' : 'bg-slate-200 text-slate-500'}`}>{s.done ? '✓' : ''}</span>
            <span className={s.done ? '' : 'text-slate-500'}>{s.label}</span>
          </li>
        ))}
      </ol>
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm shadow-sm">
        <p>Questions or need to reschedule? Call <a className="font-semibold text-[var(--brand)] underline" href={`tel:${tenant.phone}`}>{tenant.phone}</a>.</p>
        <p className="mt-2 text-xs text-slate-500">Preview of a customer status page. Sample appointment; no message was sent to anyone.</p>
      </div>
    </div>
  );
}
