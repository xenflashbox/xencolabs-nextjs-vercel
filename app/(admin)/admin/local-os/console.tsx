'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Phone, ExternalLink, MapPin, Lock, Unlock, RefreshCw, Copy, Send, Sparkles, X, Clock } from 'lucide-react';

type Caller = { email: string; name: string };
type Evidence = Record<string, { points: number; max: number; evidence: string }>;
type Preview = { id: number; status: string; token: string; preview_url: string | null; vertical_template: string; first_viewed_at?: string | null } | null;
type Row = {
  id: number; business_name: string; city: string; cluster: string; vertical: string; phone: string; website: string | null; gbp_url: string | null;
  score: number; evidence: Evidence; observation: string | null; opening_line: string | null; disposition: string; tier_label: string;
  pipeline_stage: string; call_status: string; next_call_at: string | null; last_call_at: string | null; claimed_by: string | null;
  claim_expires_at: string | null; claim: 'mine' | 'other' | null; next_action: string; preview: Preview; rating?: number; review_count?: number;
  public_email?: string | null; contact_form_url?: string | null; timeline?: TimelineItem[];
};
type TimelineItem = { at: string | null; kind: string; outcome: string; note: string | null; actor: string; callback_at?: string | null };

const QUEUES: Array<[string, string]> = [
  ['available', 'Available calls'], ['mine', 'Mine now'], ['callbacks', 'Scheduled callbacks'], ['demo_requested', 'Demo requested'],
  ['preview_sent', 'Preview sent'], ['meetings', 'Meetings'], ['closed', 'Closed / do not contact'],
];
const OUTCOMES: Array<[string, string, string]> = [
  ['no_answer', 'No answer', 'bg-slate-100 text-slate-800'], ['voicemail', 'Voicemail', 'bg-slate-100 text-slate-800'],
  ['gatekeeper', 'Gatekeeper', 'bg-slate-100 text-slate-800'], ['connected', 'Connected', 'bg-emerald-50 text-emerald-800'],
  ['callback', 'Callback', 'bg-amber-50 text-amber-800'], ['meeting', 'Meeting', 'bg-emerald-600 text-white'],
  ['not_interested', 'Not interested', 'bg-rose-50 text-rose-800'], ['wrong_number', 'Wrong number', 'bg-rose-50 text-rose-800'],
  ['do_not_call', 'Do not call', 'bg-rose-600 text-white'],
];
const PART: Record<string, string> = {
  operational_gap: 'Operational gap', ability_to_pay: 'Ability to pay', contactability: 'Contactability', proof_fit: 'Proof-fit',
  independent_local: 'Independent / local', recent_activity: 'Recent activity',
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api/local-os/${path}`, { cache: 'no-store', ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { detail?: string }).detail || `Request failed (${res.status})`);
  return data as T;
}
const fmt = (s?: string | null) => (s ? new Date(s).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '');
const minutesLeft = (s?: string | null) => (s ? Math.max(0, Math.round((new Date(s).getTime() - Date.now()) / 60000)) : 0);

export function CallingConsole({ caller }: { caller: Caller }) {
  const [queue, setQueue] = useState('available');
  const [rows, setRows] = useState<Row[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [cluster, setCluster] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({ queue, ...(cluster ? { cluster } : {}) });
      const d = await api<{ rows: Row[]; counts: Record<string, number> }>(`queues?${q}`);
      setRows(d.rows); setCounts(d.counts); setError('');
    } catch (e) { setError((e as Error).message); } finally { setLoading(false); }
  }, [queue, cluster]);

  useEffect(() => { load(); const t = setInterval(load, 30000); return () => clearInterval(t); }, [load]);

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <h1 className="text-base font-semibold">Local OS calling</h1>
            <p className="text-xs text-slate-500">NorCal pilot · signed in as {caller.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <select aria-label="Cluster" value={cluster} onChange={(e) => setCluster(e.target.value)}
              className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm">
              <option value="">All clusters</option><option>East Bay / Tri-Valley</option><option>South Bay</option><option>Sacramento metro</option>
            </select>
            <button onClick={load} aria-label="Refresh" className="rounded-md border border-slate-300 p-2 hover:bg-slate-50">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2" role="tablist">
          {QUEUES.map(([k, label]) => (
            <button key={k} role="tab" aria-selected={queue === k} onClick={() => (queue === k ? load() : setQueue(k))}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${queue === k ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
              {label} <span className="ml-1 tabular-nums opacity-70">{counts[k] ?? ''}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-4">
        {error && <p className="mb-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>}
        {!rows.length && !loading && <p className="py-10 text-center text-sm text-slate-500">Nothing in this queue right now.</p>}
        <ul className="grid gap-2">
          {rows.map((r) => (
            <li key={r.id}>
              <button onClick={() => setOpenId(r.id)} className="w-full rounded-lg border border-slate-200 bg-white p-3 text-left hover:border-slate-400">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.business_name}</p>
                    <p className="text-xs text-slate-500">{r.city} · {r.vertical}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-semibold tabular-nums leading-none">{r.score}</p>
                    <p className={`mt-1 text-[11px] ${r.disposition === 'tier_b' ? 'text-slate-500' : 'text-emerald-700'}`}>{r.tier_label}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono tabular-nums">{r.phone}</span>
                  {r.claim === 'mine' && <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-800">Yours · {minutesLeft(r.claim_expires_at)} min</span>}
                  {r.claim === 'other' && <span className="rounded bg-amber-50 px-1.5 py-0.5 text-amber-800">{r.claimed_by} is on it</span>}
                  <span className="text-slate-500">{r.next_action}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </main>
      {openId !== null && <Detail id={openId} caller={caller} onClose={() => { setOpenId(null); load(); }} />}
    </div>
  );
}

function Detail({ id, caller, onClose }: { id: number; caller: Caller; onClose: () => void }) {
  const [p, setP] = useState<Row | null>(null);
  const [note, setNote] = useState('');
  const [callback, setCallback] = useState('');
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const refresh = useCallback(async () => {
    try { setP(await api<Row>(`prospects/${id}`)); setErr(''); } catch (e) { setErr((e as Error).message); }
  }, [id]);
  useEffect(() => { refresh(); }, [refresh]);

  const act = async (label: string, fn: () => Promise<unknown>, ok: string) => {
    setBusy(label); setErr(''); setMsg('');
    try { await fn(); setMsg(ok); await refresh(); } catch (e) { setErr((e as Error).message); } finally { setBusy(''); }
  };
  const mine = p?.claim === 'mine';
  const post = (path: string, body: object = {}) => api(path, { method: 'POST', body: JSON.stringify(body) });

  const outcome = (o: string) => {
    if (o === 'callback' && !callback) { setErr('Pick a callback date and time first.'); return; }
    act(o, () => post(`prospects/${id}/outcome`, { outcome: o, note: note || null, callback_at: callback ? new Date(callback).toISOString() : null }),
      'Saved.').then(() => setNote(''));
  };
  const copy = (t: string) => { navigator.clipboard?.writeText(t).then(() => setMsg('Copied.'), () => setMsg('Copy blocked; select the text.')); };
  const evidence = useMemo(() => Object.entries(p?.evidence || {}), [p]);

  return (
    <div className="fixed inset-0 z-30 flex justify-end bg-slate-900/40" onClick={onClose}>
      <aside className="h-full w-full max-w-xl overflow-y-auto overflow-x-hidden bg-white shadow-xl" onClick={(e) => e.stopPropagation()} aria-label="Prospect detail">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold">{p?.business_name || 'Loading…'}</h2>
            {p && <p className="text-xs text-slate-500">{p.city} · {p.vertical} · score {p.score} · {p.tier_label}</p>}
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-md p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        {p && (
          <div className="space-y-5 px-4 py-4">
            {err && <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">{err}</p>}
            {msg && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{msg}</p>}

            <section className="flex flex-wrap items-center gap-2">
              {mine ? (
                <button disabled={!!busy} onClick={() => act('release', () => post(`prospects/${id}/release`), 'Released.')}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm"><Unlock className="h-4 w-4" /> Release</button>
              ) : (
                <button disabled={!!busy || p.claim === 'other'} onClick={() => act('claim', () => post(`prospects/${id}/claim`), 'Claimed for 30 minutes.')}
                  className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-40"><Lock className="h-4 w-4" /> Claim</button>
              )}
              <span className="text-xs text-slate-500">
                {mine ? `Yours for ${minutesLeft(p.claim_expires_at)} more min` : p.claim === 'other' ? `${p.claimed_by} is handling this` : 'Unclaimed'}
              </span>
            </section>

            <section className="grid gap-2 rounded-lg border border-slate-200 p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <a href={`tel:${p.phone}`} className="inline-flex items-center gap-2 font-mono text-base tabular-nums text-slate-900"><Phone className="h-4 w-4" />{p.phone}</a>
                <button onClick={() => copy(p.phone)} className="rounded p-1.5 hover:bg-slate-100" aria-label="Copy phone"><Copy className="h-4 w-4" /></button>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                {p.website && <a href={p.website} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sky-700 hover:underline"><ExternalLink className="h-3.5 w-3.5" />Website</a>}
                {p.gbp_url && <a href={p.gbp_url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sky-700 hover:underline"><MapPin className="h-3.5 w-3.5" />Google profile</a>}
                {p.rating ? <span className="text-slate-500">{p.rating}★ · {p.review_count} reviews</span> : null}
              </div>
              <p className="text-xs text-slate-500">Next action: <span className="text-slate-800">{p.next_action}</span></p>
            </section>

            {p.opening_line && (
              <section>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Opener</h3>
                <p className="rounded-md bg-slate-50 p-3 text-[15px] leading-relaxed">{p.opening_line}</p>
              </section>
            )}
            {p.observation && (
              <section>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Observation</h3>
                <p className="text-sm">{p.observation}</p>
              </section>
            )}

            <section>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Call outcome</h3>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Notes from this call (saved with the outcome)"
                className="mb-2 w-full rounded-md border border-slate-300 p-2 text-sm" aria-label="Call notes" />
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-600"><Clock className="h-4 w-4" /> Callback
                <input type="datetime-local" value={callback} onChange={(e) => setCallback(e.target.value)} className="rounded-md border border-slate-300 px-2 py-1 text-sm" />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {OUTCOMES.map(([k, label, cls]) => (
                  <button key={k} disabled={!mine || !!busy} onClick={() => outcome(k)}
                    className={`rounded-md px-2 py-2.5 text-sm font-medium disabled:opacity-40 ${cls}`}>{busy === k ? 'Saving…' : label}</button>
                ))}
              </div>
              {!mine && <p className="mt-2 text-xs text-slate-500">Claim the prospect to log an outcome.</p>}
              <div className="mt-2 flex gap-2">
                <button disabled={!mine || !note || !!busy} onClick={() => act('note', () => post(`prospects/${id}/notes`, { note }), 'Note saved.').then(() => setNote(''))}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40">Save note only</button>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 p-3">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Private preview</h3>
              {!p.preview && (
                <button disabled={!mine || !!busy} onClick={() => act('preview', () => post(`prospects/${id}/preview`), 'Preview requested.')}
                  className="inline-flex items-center gap-1.5 rounded-md bg-sky-700 px-3 py-2 text-sm text-white disabled:opacity-40"><Sparkles className="h-4 w-4" /> They want to see it: request preview</button>
              )}
              {p.preview && (
                <div className="space-y-2 text-sm">
                  <p>Status: <strong>{p.preview.status}</strong> · template {p.preview.vertical_template.replace('_', ' ')}</p>
                  {['requested', 'generating'].includes(p.preview.status) && (
                    <button disabled={!!busy} onClick={() => act('generate', () => post(`previews/${p.preview!.id}/generate`), 'Preview generated.')}
                      className="rounded-md bg-sky-700 px-3 py-2 text-sm text-white disabled:opacity-40">{busy === 'generate' ? 'Generating…' : 'Generate preview'}</button>
                  )}
                  {p.preview.preview_url && (
                    <div className="flex flex-wrap items-center gap-2">
                      <a href={p.preview.preview_url} target="_blank" rel="noopener" className="text-sky-700 hover:underline">Open preview</a>
                      <button onClick={() => copy(p.preview!.preview_url!)} className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-xs"><Copy className="h-3 w-3" />Copy link</button>
                      {p.preview.status === 'ready' && (
                        <button disabled={!!busy} onClick={() => act('sent', () => post(`previews/${p.preview!.id}/sent`, { channel: 'on_call' }), 'Marked as sent.')}
                          className="inline-flex items-center gap-1 rounded bg-slate-900 px-2 py-1 text-xs text-white"><Send className="h-3 w-3" />I sent the link</button>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-slate-500">You send the link yourself (on the call or by personal email). Nothing is sent automatically.</p>
                </div>
              )}
            </section>

            <section>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Why this score</h3>
              <ul className="grid gap-1.5 text-sm">
                {evidence.map(([k, v]) => (
                  <li key={k} className="grid grid-cols-[minmax(0,110px)_minmax(0,1fr)_40px] items-start gap-2 [overflow-wrap:anywhere]">
                    <span className="text-slate-600">{PART[k] || k}</span><span className="text-slate-800">{v.evidence}</span>
                    <span className="text-right tabular-nums">{v.points}/{v.max}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Timeline</h3>
              {!p.timeline?.length && <p className="text-sm text-slate-500">No touches yet.</p>}
              <ol className="grid gap-2">
                {(p.timeline || []).map((t, i) => (
                  <li key={i} className="min-w-0 border-l-2 border-slate-200 pl-3 text-sm [overflow-wrap:anywhere]">
                    <p><span className="font-medium">{t.kind.replace('_', ' ')}</span> · {t.outcome.replace(/_/g, ' ')} <span className="text-xs text-slate-500">{fmt(t.at)} · {t.actor}</span></p>
                    {t.note && <p className="text-slate-700">{t.note}</p>}
                    {t.callback_at && <p className="text-xs text-amber-700">Next: {fmt(t.callback_at)}</p>}
                  </li>
                ))}
              </ol>
            </section>
            <p className="pb-6 text-xs text-slate-400">Record #{p.id} · {caller.email}</p>
          </div>
        )}
      </aside>
    </div>
  );
}
