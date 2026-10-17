'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CalendarCheck, CheckCircle2, ExternalLink, PhoneCall } from 'lucide-react';
import { useAnimalParam } from '@/components/local-os/shelter/animal-pages';
import { DemoLine, SnapshotCaveat, captured } from '@/components/local-os/shelter/shelter-shell';
import { STAFF, field, useShelter } from '@/components/local-os/shelter/shelter-store';
import { osHref } from '@/components/local-os/os/ui';
import type { InquiryStatus, ShelterInquiry } from '@/lib/local-os/shelter/types';
import { XENCO_AI_DEMO } from '@/lib/local-os/xenco-demo';

const H = 'font-[family-name:var(--font-display)]';
const XENCO_BOOKING = 'https://cal.com/xencolabs/local-os-walkthrough';
const ext = { target: '_blank', rel: 'noopener noreferrer nofollow' } as const;

function Cite({ href, children = 'Source' }: { href: string; children?: React.ReactNode }) {
  return href.startsWith('http') ? (
    <a href={href} {...ext} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)] underline underline-offset-2">{children} <ExternalLink className="h-3 w-3" aria-hidden /></a>
  ) : <span className="break-words text-xs text-slate-500">{children}: {href}</span>;
}

function DemoNotice({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-950"><span className="font-semibold">Demo only.</span> {children}</p>;
}

export function AdoptInfo() {
  const { tenant, data } = useShelter();
  const c = data.content;
  return (
    <div className="space-y-8">
      <div>
        <h1 className={`${H} text-3xl font-semibold md:text-4xl`}>How adoption works</h1>
        <p className="mt-1 max-w-2xl text-slate-600">Summarised from {tenant.name}’s published adoption pages, captured {captured(c.captured_at)}. Each section links to the official page; the official page governs.</p>
      </div>
      <ol className="grid gap-4 md:grid-cols-3">
        {c.process.map((p, i) => (
          <li key={p.step} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">Step {i + 1}</p>
            <h2 className={`${H} mt-1 text-xl font-semibold`}>{p.step}</h2>
            <p className="mt-2 text-sm text-slate-700">{p.text}</p>
            <div className="mt-3 flex flex-wrap gap-3">{(p.links ?? []).map((l) => <Cite key={l.url} href={l.url}>{l.label}</Cite>)}<Cite href={p.source} /></div>
          </li>
        ))}
      </ol>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h2 className={`${H} text-2xl font-semibold`}>Published adoption fees</h2>
          <table className="mt-3 w-full text-sm"><tbody>{c.fees.rows.map(([k, v]) => <tr key={k} className="border-b border-slate-100"><td className="py-2 text-slate-600">{k}</td><td className="py-2 text-right font-semibold">{v}</td></tr>)}</tbody></table>
          <p className="mt-2 text-sm text-slate-600">{c.fees.note} {c.fees.more}</p>
          <p className="mt-2 text-sm text-slate-600">{c.fees.sponsored.text} <Cite href={c.fees.sponsored.source} /></p>
          <div className="mt-3"><Cite href={c.fees.source}>Official fee table</Cite></div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h2 className={`${H} text-2xl font-semibold`}>What the fee includes</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">{c.fee_includes.items.map((i) => <li key={i}>{i}</li>)}</ul>
          <div className="mt-3"><Cite href={c.fee_includes.source}>Official list</Cite></div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[['Where to meet animals', c.locations], ['Adoption desk', c.desk], ['Availability', c.availability]].map(([t, b]) => (
          <div key={t as string} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h2 className={`${H} text-xl font-semibold`}>{t as string}</h2>
            <p className="mt-2 text-sm text-slate-700">{(b as { text: string }).text}</p>
            <div className="mt-3"><Cite href={(b as { source: string }).source} /></div>
          </div>
        ))}
      </section>
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h2 className={`${H} text-2xl font-semibold`}>Questions the AI guide can answer</h2>
        <p className="mt-1 text-sm text-slate-600">The demo line answers general adoption questions only from this reviewed set.</p>
        <dl className="mt-3 divide-y divide-slate-100">
          {c.faq.map((f) => (
            <div key={f.q} className="py-3"><dt className="font-semibold">{f.q}</dt><dd className="mt-1 text-sm text-slate-700">{f.a} <Cite href={f.source} /></dd></div>
          ))}
        </dl>
      </section>
      <div className="flex flex-wrap gap-3">
        <Link href={osHref(tenant.slug, '/animals')} className="rounded-full bg-[var(--brand)] px-5 py-3 font-semibold text-white">Find an animal</Link>
        <Link href={osHref(tenant.slug, '/ask')} className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold">Ask about an animal</Link>
      </div>
    </div>
  );
}

const input = 'mt-1 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-base';

function AnimalSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { animals } = useShelter();
  return (
    <select required value={value} onChange={(e) => onChange(e.target.value)} className={input}>
      <option value="">Choose an animal</option>
      {animals.map((a) => <option key={a.slug} value={a.slug}>{a.name} · {field(a, 'Breed')}</option>)}
    </select>
  );
}

export function AskForm() {
  const { tenant, addInquiry, animal } = useShelter();
  const initial = useAnimalParam();
  const [v, setV] = useState({ name: '', phone: '', email: '', animalSlug: animal(initial) ? initial : '', preferredContact: 'phone' as ShelterInquiry['preferredContact'] });
  const [done, setDone] = useState<ShelterInquiry | null>(null);
  const a = animal(v.animalSlug);
  if (done) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--brand)]" aria-hidden />
        <h1 className={`${H} text-2xl font-semibold`}>Inquiry {done.id} added to the sample staff queue</h1>
        <DemoNotice>It was saved in this browser only. It was not sent to {tenant.name}, to email or to anyone.</DemoNotice>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={osHref(tenant.slug, `/meet?animal=${done.animalSlug}&inquiry=${done.id}`)} className="rounded-full bg-[var(--brand)] px-5 py-3 font-semibold text-white">Request a meeting (sample)</Link>
          <Link href={osHref(tenant.slug, '/office')} className="rounded-full border border-slate-300 px-5 py-3 font-semibold">See it in the staff queue</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className={`${H} text-3xl font-semibold`}>Ask about an animal</h1>
      <DemoNotice>This form captures only what staff need to call you back. Submitting adds a fictional inquiry to the sample staff queue in this browser; nothing is sent to {tenant.name}.</DemoNotice>
      <form className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5" onSubmit={(e) => { e.preventDefault(); setDone(addInquiry(v)); }}>
        <label className="block text-sm font-medium">Animal of interest<AnimalSelect value={v.animalSlug} onChange={(animalSlug) => setV({ ...v, animalSlug })} /></label>
        {a ? <SnapshotCaveat at={a.captured_at} /> : null}
        <label className="block text-sm font-medium">Your name<input required value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} className={input} autoComplete="off" /></label>
        <label className="block text-sm font-medium">Phone<input required type="tel" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} className={input} autoComplete="off" /></label>
        <label className="block text-sm font-medium">Email<input required type="email" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} className={input} autoComplete="off" /></label>
        <fieldset><legend className="text-sm font-medium">Preferred contact method</legend>
          <div className="mt-1 flex gap-2">{(['phone', 'email', 'text'] as const).map((m) => (
            <label key={m} className={`flex-1 cursor-pointer rounded-xl border px-3 py-2 text-center text-sm capitalize ${v.preferredContact === m ? 'border-[var(--brand)] bg-[var(--brand)]/10 font-semibold' : 'border-slate-300'}`}>
              <input type="radio" name="pc" className="sr-only" checked={v.preferredContact === m} onChange={() => setV({ ...v, preferredContact: m })} />{m}
            </label>))}
          </div>
        </fieldset>
        <button type="submit" className="h-12 w-full rounded-full bg-[var(--brand)] font-semibold text-white">Send inquiry (sample)</button>
      </form>
    </div>
  );
}

export function MeetForm() {
  const { tenant, addMeeting, animal, state } = useShelter();
  const initial = useAnimalParam();
  const inquiryId = useSearchParams()?.get('inquiry') ?? null;
  const fromInquiry = state.inquiries.find((q) => q.id === inquiryId);
  const [v, setV] = useState({ name: fromInquiry?.name ?? '', animalSlug: animal(initial) ? initial : '', slots: ['', ''] });
  // Arriving from a just-sent inquiry: carry its name over once it is known.
  useEffect(() => { if (fromInquiry && !v.name) setV((x) => ({ ...x, name: fromInquiry.name })); }, [fromInquiry, v.name]);
  const [done, setDone] = useState<string | null>(null);
  const a = animal(v.animalSlug);
  if (done) {
    return (
      <div className="mx-auto max-w-xl space-y-4 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
        <CalendarCheck className="mx-auto h-10 w-10 text-[var(--brand)]" aria-hidden />
        <h1 className={`${H} text-2xl font-semibold`}>Request received — shelter staff must confirm</h1>
        <p className="text-slate-700">Sample request {done}. Nothing is booked: shelter staff would contact you to confirm a time.</p>
        <DemoNotice>Simulated. This request was not sent to {tenant.name} or added to any calendar. No adopter appointment exists.</DemoNotice>
        <Link href={osHref(tenant.slug, '/office')} className="inline-block rounded-full bg-[var(--brand)] px-5 py-3 font-semibold text-white">See it awaiting confirmation in the staff queue</Link>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className={`${H} text-3xl font-semibold`}>Request a meeting <span className="align-middle text-base font-normal text-slate-500">(sample)</span></h1>
      <DemoNotice>A simulated request flow. It shows how preferred times reach staff; it never books or confirms an adopter appointment.</DemoNotice>
      <form className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5" onSubmit={(e) => { e.preventDefault(); setDone(addMeeting({ inquiryId: fromInquiry?.id ?? null, name: v.name, animalSlug: v.animalSlug, preferredSlots: v.slots.filter(Boolean).map((s) => new Date(s).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })) }).id); }}>
        <label className="block text-sm font-medium">Animal<AnimalSelect value={v.animalSlug} onChange={(animalSlug) => setV({ ...v, animalSlug })} /></label>
        {a ? <SnapshotCaveat at={a.captured_at} /> : null}
        <label className="block text-sm font-medium">Your name<input required value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} className={input} autoComplete="off" /></label>
        {v.slots.map((s, i) => (
          <label key={i} className="block text-sm font-medium">{i === 0 ? 'Preferred date and time' : 'Another time that works (optional)'}
            <input required={i === 0} type="datetime-local" value={s} onChange={(e) => setV({ ...v, slots: v.slots.map((x, k) => (k === i ? e.target.value : x)) })} className={input} />
          </label>
        ))}
        <button type="submit" className="h-12 w-full rounded-full bg-[var(--brand)] font-semibold text-white">Send meeting request (sample)</button>
      </form>
    </div>
  );
}

const STATUS: Record<InquiryStatus, string> = { new: 'New', contacted: 'Contacted', meeting_requested: 'Meeting requested', closed: 'Closed' };
const TONE: Record<InquiryStatus, string> = { new: 'bg-amber-100 text-amber-900', contacted: 'bg-sky-100 text-sky-900', meeting_requested: 'bg-violet-100 text-violet-900', closed: 'bg-slate-100 text-slate-700' };

export function ShelterOffice() {
  const { tenant, state, animal, updateInquiry, updateMeeting } = useShelter();
  const [sel, setSel] = useState<string>(state.inquiries[0]?.id ?? '');
  const q = state.inquiries.find((x) => x.id === sel);
  const qa = animal(q?.animalSlug);
  const count = (s: InquiryStatus) => state.inquiries.filter((x) => x.status === s).length;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className={`${H} text-3xl font-semibold`}>Adoption inquiries</h1>
          <p className="text-sm text-slate-600">Fictional records only. The animal snapshot is linked read-only; it is kept apart from these simulated records.</p>
        </div>
        <div className="flex gap-2 text-sm">{(['new', 'meeting_requested', 'contacted'] as InquiryStatus[]).map((s) => <span key={s} className={`rounded-full px-3 py-1 font-semibold ${TONE[s]}`}>{count(s)} {STATUS[s].toLowerCase()}</span>)}</div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          {state.inquiries.map((x) => (
            <li key={x.id}>
              <button type="button" onClick={() => setSel(x.id)} className={`flex w-full items-start gap-3 px-4 py-3 text-left ${x.id === sel ? 'bg-[var(--brand)]/5' : 'hover:bg-slate-50'}`}>
                <span className="rounded bg-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-950">SAMPLE</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{x.name} · {animal(x.animalSlug)?.name ?? x.animalSlug}</span>
                  <span className="block truncate text-xs text-slate-500">{x.id} · {x.source} · {new Date(x.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                </span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${TONE[x.status]}`}>{STATUS[x.status]}</span>
              </button>
            </li>
          ))}
        </ul>
        {q ? (
          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{q.id} · fictional</p><h2 className={`${H} text-2xl font-semibold`}>{q.name}</h2></div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TONE[q.status]}`}>{STATUS[q.status]}</span>
            </div>
            <dl className="grid grid-cols-[9rem_1fr] gap-y-1.5 text-sm">
              <dt className="text-slate-500">Phone</dt><dd>{q.phone}</dd>
              <dt className="text-slate-500">Email</dt><dd>{q.email}</dd>
              <dt className="text-slate-500">Prefers</dt><dd className="capitalize">{q.preferredContact}</dd>
              <dt className="text-slate-500">Came in via</dt><dd>{q.source}</dd>
              <dt className="text-slate-500">Next step</dt><dd>{q.followUp}</dd>
            </dl>
            {qa ? (
              <div className="rounded-xl border border-slate-200 p-3 text-sm">
                <p className="font-semibold">{qa.name} · {[field(qa, 'Breed'), field(qa, 'Second breed')].filter(Boolean).join(' / ')}</p>
                <p className="text-slate-600">Snapshot captured {captured(qa.captured_at)}; status may have changed.</p>
                <a href={qa.source_listing_url} {...ext} className="mt-1 inline-flex items-center gap-1 font-semibold text-[var(--brand)] underline underline-offset-2">Official listing <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
              </div>
            ) : null}
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">Assigned to
                <select value={q.assignedTo ?? ''} onChange={(e) => updateInquiry(q.id, { assignedTo: e.target.value || null })} className={input}><option value="">Unassigned</option>{STAFF.map((s) => <option key={s}>{s}</option>)}</select>
              </label>
              <label className="text-sm font-medium">Status
                <select value={q.status} onChange={(e) => updateInquiry(q.id, { status: e.target.value as InquiryStatus })} className={input}>{(Object.keys(STATUS) as InquiryStatus[]).map((s) => <option key={s} value={s}>{STATUS[s]}</option>)}</select>
              </label>
            </div>
            <p className="text-xs text-slate-500">Changing status or owner only updates this browser’s sample data. No message is sent.</p>
          </div>
        ) : null}
      </div>
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h2 className={`${H} text-2xl font-semibold`}>Meeting requests awaiting staff confirmation</h2>
        <p className="text-sm text-slate-600">Simulated requests. Confirming here would be done by a person after contacting the adopter; nothing is booked automatically.</p>
        <ul className="mt-3 divide-y divide-slate-100">
          {state.meetings.length ? state.meetings.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
              <span className="rounded bg-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-950">SAMPLE</span>
              <span className="min-w-0 flex-1"><span className="font-semibold">{m.name}</span> · {animal(m.animalSlug)?.name ?? m.animalSlug} · prefers {m.preferredSlots.join(' or ')}</span>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-900">{m.status === 'awaiting_staff_confirmation' ? 'Awaiting staff confirmation' : m.status === 'staff_contacted' ? 'Staff contacted adopter' : 'Withdrawn'}</span>
              {m.status === 'awaiting_staff_confirmation' ? <button type="button" onClick={() => updateMeeting(m.id, { status: 'staff_contacted' })} className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold">Mark staff contacted (sample)</button> : null}
            </li>
          )) : <li className="py-3 text-sm text-slate-500">No meeting requests.</li>}
        </ul>
      </section>
      <div className="flex flex-wrap gap-3">
        <Link href={osHref(tenant.slug, '/xenco')} className="rounded-full bg-[var(--brand)] px-5 py-3 font-semibold text-white">Book a walkthrough with Xenco Labs</Link>
        <Link href={osHref(tenant.slug)} className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold">Back to the public site</Link>
      </div>
    </div>
  );
}

export function XencoAppointment() {
  const { tenant } = useShelter();
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className={`${H} text-3xl font-semibold`}>See this working for your shelter</h1>
      <p className="text-slate-700">The only real appointment in this preview is a walkthrough with Xenco Labs. It is not an adoption appointment and is not with {tenant.name}.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <a href={XENCO_BOOKING} {...ext} className="rounded-2xl bg-[var(--brand)] p-5 text-white shadow hover:bg-[var(--brand-dark)]">
          <CalendarCheck className="h-6 w-6" aria-hidden />
          <p className={`${H} mt-2 text-xl font-semibold`}>Book a Xenco Labs walkthrough</p>
          <p className="mt-1 text-sm text-white/80">30 minutes on Xenco’s calendar (cal.com).</p>
        </a>
        <a href={`tel:${XENCO_AI_DEMO.tel}`} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <PhoneCall className="h-6 w-6 text-[var(--brand)]" aria-hidden />
          <p className={`${H} mt-2 text-xl font-semibold`}>Call the AI guide</p>
          <p className="mt-1 text-sm text-slate-600">{XENCO_AI_DEMO.display} · it can book the same Xenco walkthrough by phone.</p>
        </a>
      </div>
      <DemoLine compact />
    </div>
  );
}
