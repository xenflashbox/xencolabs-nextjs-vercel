'use client';

import Link from 'next/link';
import { AiDemoPanel } from '@/components/local-os/os/ai-demo-panel';
import { useDemo } from '@/components/local-os/os/demo-store';
import { lineTotal } from '@/lib/local-os/journey';
import { Card, NavLink, Pill, SampleBadge, isToday, leadTone, money, osHref, timeOnly, when } from '@/components/local-os/os/ui';

/** The owner's morning view: what needs a person today. */
export function Dashboard() {
  const { tenant, vertical, state } = useDemo();
  const s = tenant.slug;
  const statusLabel = (id: string) => vertical.leadStatuses.find((x) => x.id === id)?.label ?? id;
  const lane = (id: string) => vertical.lanes.find((l) => l.id === id)?.short ?? id;
  const now = Date.now();
  const due = state.leads.filter((l) => l.dueAt && new Date(l.dueAt).getTime() <= now + 8 * 3600e3 && !['won', 'lost'].includes(l.status));
  const fresh = state.leads.filter((l) => l.status === 'new');
  const toReview = state.quotes.filter((q) => q.status === 'draft' || q.status === 'reviewed');
  const today = state.jobs.filter((j) => isToday(j.scheduledStart)).sort((a, b) => a.scheduledStart.localeCompare(b.scheduledStart));
  const upcoming = state.jobs.filter((j) => !isToday(j.scheduledStart) && j.status !== 'report_ready');
  const reports = state.jobs.filter((j) => j.status === 'completed');
  const toReviewReports = state.reports.filter((r) => !r.reviewedBy);
  const awaitingCustomer = state.quotes.filter((q) => q.status === 'sent');
  const owed = state.invoices.filter((i) => i.status !== 'paid');

  const stat = (label: string, n: number, tone = 'text-slate-900') => (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <p className={`text-2xl font-semibold tabular-nums ${tone}`}>{n}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Good morning, Alex</h1>
        <p className="text-sm text-slate-500">
          {new Date().toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles', weekday: 'long', month: 'long', day: 'numeric' })} · {tenant.region}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stat('New requests', fresh.length, fresh.length ? 'text-[var(--brand)]' : undefined)}
        {stat('Callbacks / follow-ups due', due.length)}
        {stat('Estimates to review', toReview.length)}
        {stat('Jobs today', today.length)}
        {stat('Invoices to follow up', owed.length)}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Today’s jobs" action={<NavLink href={osHref(s, '/office/requests')}>All requests</NavLink>}>
          {today.length ? (
            <ul className="divide-y divide-slate-100">
              {today.map((j) => (
                <li key={j.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
                      <SampleBadge /> {timeOnly(j.scheduledStart)} · {j.title}
                    </p>
                    <p className="text-xs text-slate-500">{lane(j.laneId)} · {j.technician} · {j.status.replace('_', ' ')}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <NavLink href={osHref(s, `/office/jobs/${j.id}`)}>Office</NavLink>
                    <NavLink href={osHref(s, `/tech/${j.id}`)}>Technician</NavLink>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No jobs today.</p>
          )}
        </Card>

        <Card title="Needs a call">
          {due.length ? (
            <ul className="divide-y divide-slate-100">
              {due.map((l) => (
                <li key={l.id} className="py-2.5">
                  <Link href={osHref(s, `/office/requests?open=${l.id}`)} className="block">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-medium">
                      <SampleBadge /> {l.company ?? l.name}
                      <Pill tone={leadTone(l.status)}>{statusLabel(l.status)}</Pill>
                      {l.urgency === 'emergency' ? <Pill tone="red">Emergency</Pill> : null}
                    </p>
                    <p className="text-xs text-slate-500">{l.nextAction} · due {when(l.dueAt)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">Nothing due.</p>
          )}
        </Card>

        <Card title="Estimates waiting for your review">
          {toReview.length ? (
            <ul className="divide-y divide-slate-100">
              {toReview.map((q) => {
                const total = q.lines.reduce((a, l) => a + l.qty * l.unitPrice, 0);
                const lead = state.leads.find((l) => l.id === q.leadId);
                return (
                  <li key={q.id} className="flex items-center justify-between gap-2 py-2.5">
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-medium"><SampleBadge /> {q.number}</p>
                      <p className="truncate text-xs text-slate-500">{lead?.company ?? lead?.name} · {money(total)} (sample) · {q.status}</p>
                    </div>
                    <NavLink href={osHref(s, `/office/quotes/${q.id}`)}>Review</NavLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No estimates waiting.</p>
          )}
        </Card>

        <Card title="Reports and money">
          <ul className="divide-y divide-slate-100 text-sm">
            {reports.map((j) => (
              <li key={j.id} className="flex items-center justify-between gap-2 py-2.5">
                <span className="flex flex-wrap items-center gap-2"><SampleBadge /> {j.number}: completion report needs your sign-off</span>
                <NavLink href={osHref(s, `/office/jobs/${j.id}`)}>Open</NavLink>
              </li>
            ))}
            {owed.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-2 py-2.5">
                <span className="flex flex-wrap items-center gap-2">
                  <SampleBadge /> {i.number} · {money(lineTotal(i.lines))}
                  <Pill tone={i.status === 'overdue' ? 'red' : 'slate'}>{i.status}</Pill>
                </span>
                <NavLink href={osHref(s, `/office/invoices/${i.id}`)}>Open</NavLink>
              </li>
            ))}
            {!reports.length && !owed.length ? <li className="py-2 text-slate-500">All clear.</li> : null}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Reports to review">
          {toReviewReports.length ? (
            <ul className="divide-y divide-slate-100 text-sm">
              {toReviewReports.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2 py-2.5">
                  <span className="flex flex-wrap items-center gap-2"><SampleBadge /> {r.number} · {r.property.name}{r.assemblies.some((a) => a.result === 'pending') ? ' · waiting for readings' : ''}</span>
                  <NavLink href={osHref(s, `/office/reports/${r.id}`)}>Open</NavLink>
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-slate-500">Nothing to review.</p>}
        </Card>
        <Card title="Estimates with the customer">
          {awaitingCustomer.length ? (
            <ul className="divide-y divide-slate-100 text-sm">
              {awaitingCustomer.map((q) => (
                <li key={q.id} className="flex items-center justify-between gap-2 py-2.5">
                  <span className="flex flex-wrap items-center gap-2"><SampleBadge /> {q.number} · awaiting customer approval</span>
                  <NavLink href={osHref(s, `/estimate/${q.id}`)}>Customer view</NavLink>
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-slate-500">None waiting.</p>}
        </Card>
      </div>

      {upcoming.length ? (
        <Card title="Coming up">
          <ul className="divide-y divide-slate-100">
            {upcoming.map((j) => (
              <li key={j.id} className="flex items-center justify-between gap-2 py-2.5 text-sm">
                <span className="flex flex-wrap items-center gap-2"><SampleBadge /> {when(j.scheduledStart)} · {j.title}</span>
                <NavLink href={osHref(s, `/office/jobs/${j.id}`)}>Open</NavLink>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
      {tenant.aiDemo ? <AiDemoPanel tenantName={tenant.name} variant="compact" /> : null}
    </div>
  );
}
