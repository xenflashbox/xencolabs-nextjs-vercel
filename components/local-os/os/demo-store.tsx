'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { DemoInvoice, DemoJob, DemoLead, DemoPhoto, DemoQuote, DemoReport, DemoState } from '@/lib/local-os/demo-types';
import type { TenantConfig, VerticalPack } from '@/lib/local-os/tenant-types';
import { getTenant, type TenantEntry } from '@/lib/local-os/tenants';
import { seedProspect, type ProspectEntryData } from '@/lib/local-os/prospect/build';

/**
 * The preview's working state lives in this browser only (localStorage), seeded
 * from the tenant's sample data. Nothing is sent anywhere: no lead reaches an
 * inbox, no estimate reaches a customer, no photo leaves the device. "Reset
 * sample data" puts everything back.
 */
interface Store {
  tenant: TenantConfig;
  vertical: VerticalPack;
  state: DemoState;
  updateLead: (id: string, patch: Partial<DemoLead>) => void;
  addLead: (lead: DemoLead) => void;
  updateQuote: (id: string, patch: Partial<DemoQuote>) => void;
  addQuote: (quote: DemoQuote) => void;
  updateJob: (id: string, patch: Partial<DemoJob>) => void;
  addJob: (job: DemoJob) => void;
  toggleChecklist: (jobId: string, itemId: string) => void;
  addPhotos: (jobId: string, photos: DemoPhoto[]) => void;
  updateReport: (id: string, patch: Partial<DemoReport>) => void;
  updateInvoice: (id: string, patch: Partial<DemoInvoice>) => void;
  reset: () => void;
}

const Ctx = createContext<Store | null>(null);

export function useDemo(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useDemo outside DemoProvider');
  return s;
}

export function DemoProvider({ slug, prospect, children }: { slug: string; prospect?: ProspectEntryData; children: React.ReactNode }) {
  // Prospect previews arrive as serializable data (built on the server from the sourced profile).
  const entry = useMemo<TenantEntry | null>(
    () => (prospect ? { config: prospect.config, vertical: prospect.vertical, seed: (now?: Date) => seedProspect(prospect.config, prospect.vertical, now) } : getTenant(slug)),
    [prospect, slug],
  );
  const key = `local-os:${slug}:v2`;
  const [state, setState] = useState<DemoState | null>(null);

  useEffect(() => {
    if (!entry) return;
    let initial: DemoState | null = null;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) initial = JSON.parse(raw) as DemoState;
    } catch {
      initial = null;
    }
    // Object URLs do not survive a reload; drop them rather than show broken images.
    if (initial) initial.jobs = initial.jobs.map((j) => ({ ...j, photos: j.photos.map((p) => ({ ...p, url: null })) }));
    setState(initial ?? entry.seed());
  }, [entry, key]);

  useEffect(() => {
    if (!state) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* private mode or quota: the preview still works for this session */
    }
  }, [state, key]);

  const mut = useCallback((f: (s: DemoState) => DemoState) => setState((s) => (s ? f(s) : s)), []);

  const store = useMemo<Store | null>(() => {
    if (!entry || !state) return null;
    return {
      tenant: entry.config,
      vertical: entry.vertical,
      state,
      updateLead: (id, patch) => mut((s) => ({ ...s, leads: s.leads.map((l) => (l.id === id ? { ...l, ...patch } : l)) })),
      addLead: (lead) => mut((s) => ({ ...s, leads: [lead, ...s.leads] })),
      updateQuote: (id, patch) => mut((s) => ({ ...s, quotes: s.quotes.map((q) => (q.id === id ? { ...q, ...patch } : q)) })),
      addQuote: (quote) => mut((s) => ({ ...s, quotes: [quote, ...s.quotes] })),
      updateJob: (id, patch) => mut((s) => ({ ...s, jobs: s.jobs.map((j) => (j.id === id ? { ...j, ...patch } : j)) })),
      addJob: (job) => mut((s) => ({ ...s, jobs: [...s.jobs, job] })),
      toggleChecklist: (jobId, itemId) =>
        mut((s) => ({
          ...s,
          jobs: s.jobs.map((j) =>
            j.id === jobId ? { ...j, checklist: j.checklist.map((c) => (c.id === itemId ? { ...c, done: !c.done } : c)) } : j,
          ),
        })),
      addPhotos: (jobId, photos) =>
        mut((s) => ({ ...s, jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, photos: [...j.photos, ...photos] } : j)) })),
      updateReport: (id, patch) => mut((s) => ({ ...s, reports: s.reports.map((r) => (r.id === id ? { ...r, ...patch } : r)) })),
      updateInvoice: (id, patch) => mut((s) => ({ ...s, invoices: s.invoices.map((i) => (i.id === id ? { ...i, ...patch } : i)) })),
      reset: () => {
        try {
          window.localStorage.removeItem(key);
        } catch {
          /* ignore */
        }
        setState(entry.seed());
      },
    };
  }, [entry, state, mut, key]);

  if (!entry) return null;
  if (!store) return <p className="p-6 text-sm text-slate-500">Loading the sample workspace…</p>;
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}
