'use client';

import Link from 'next/link';
import { termsOf } from '@/lib/local-os/terms';
import { AiDemoPanel } from '@/components/local-os/os/ai-demo-panel';
import { Lifecycle } from '@/components/local-os/os/preview/lifecycle';
import { ProofCard } from '@/components/local-os/os/preview/proof-card';
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
        <h1 className="text-2xl font-semibold">Good morning{tenant.greetingName ? `, ${tenant.greetingName}` : ''}</h1>
        <p className="text-sm text-slate-500">
          {new Date().toLocaleDateString('en-US', { timeZone: 'America/Los_Angeles', weekday: 'long', month: 'long', day: 'numeric' })} · {tenant.region}
        </p>
      </div>
      {s === 'nemesis-fire' ? (
        <section className="space-y-4 rounded-2xl bg-slate-950 p-5 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Office workflow</p>
            <h2 className="mt-1 text-2xl font-semibold">From first call to signed report</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">A connected view of the customer conversation, follow-up, site work, and report delivery.</p>
          </div>
          <Lifecycle slug={s} name={vertical.lifecycleName} stages={vertical.customerSteps} variant="showcase" />
          {tenant.media.proof.length ? (
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold">Workflow examples</h3>
                <p className="text-sm text-slate-300">Illustrative views of the customer, office, and technician workflow.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tenant.media.proof.map((item, index) => (
                  <ProofCard key={item.id} slug={s} item={item} index={index} label="Office walkthrough" />
                ))}
              </div>
            </div>
          ) : null}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sample inbound call</p>
              <p className="mt-2 font-medium">Five-year sprinkler inspection · Wet-pipe system</p>
              <p className="mt-1 text-sm text-slate-300">Caller mentions an older inspection and a separate provider’s repair list. Intake notes capture the property, findings, and questions for Alex.</p>
              <p className="mt-3 text-xs text-amber-300">Fictional sample activity</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sample appointment</p>
              <p className="mt-2 font-medium">15-minute introductory call with Alex</p>
              <p className="mt-1 text-sm text-slate-300">A sample calendar entry shows the handoff from the call assistant to the office.</p>
              <p className="mt-3 text-xs text-amber-300">Fictional sample activity</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="font-medium">Create a five-year sprinkler report</p>
              <p className="mt-1 text-sm text-slate-300">Enter a sample inspection record and generate a form-style PDF for review.</p>
            </div>
            <Link href={osHref(s, '/office/reports/new')} className="rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-300">Start report</Link>
          </div>
        </section>
      ) : null}
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
                    <NavLink href={osHref(s, `/tech/${j.id}`)}>{termsOf(vertical).fieldView}</NavLink>
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
      {tenant.aiDemo ? <AiDemoPanel tenantName={tenant.name} heading={tenant.aiDemoHeading} variant="compact" /> : null}
    </div>
  );
}
