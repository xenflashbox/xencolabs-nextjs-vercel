'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { TenantConfig } from '@/lib/local-os/tenant-types';
import type { ShelterAnimal, ShelterData, ShelterDemoState, ShelterInquiry, ShelterMeetingRequest } from '@/lib/local-os/shelter/types';

/**
 * The shelter preview's working state: FICTIONAL inquiries and meeting requests, kept only in this browser
 * (localStorage). Nothing is sent to the shelter, to email, to a calendar or to Xenco. The research snapshot
 * (real public listings) is read-only and never mixed into these records.
 */
interface Ctx {
  tenant: TenantConfig;
  data: ShelterData;
  animals: ShelterAnimal[];
  animal: (slug: string | null | undefined) => ShelterAnimal | undefined;
  state: ShelterDemoState;
  addInquiry: (i: Omit<ShelterInquiry, 'id' | 'sample' | 'createdAt' | 'status' | 'assignedTo' | 'followUp' | 'source'>) => ShelterInquiry;
  addMeeting: (m: Omit<ShelterMeetingRequest, 'id' | 'sample' | 'createdAt' | 'status'>) => ShelterMeetingRequest;
  updateInquiry: (id: string, patch: Partial<ShelterInquiry>) => void;
  updateMeeting: (id: string, patch: Partial<ShelterMeetingRequest>) => void;
  reset: () => void;
}

const C = createContext<Ctx | null>(null);

export const STAFF = ['Adoptions coordinator (sample)', 'Adoption counselor (sample)', 'Foster liaison (sample)'];

function seed(now = new Date()): ShelterDemoState {
  const ago = (h: number) => new Date(now.getTime() - h * 36e5).toISOString();
  const day = (d: number, hour: number) => {
    const t = new Date(now.getTime() + d * 864e5);
    return `${t.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/Los_Angeles' })}, ${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  };
  return {
    inquiries: [
      { id: 'INQ-101', sample: true, createdAt: ago(1.5), name: 'Sample Adopter A', phone: '555-0101', email: 'adopter.a@example.com', animalSlug: 'bonita', preferredContact: 'phone', status: 'new', assignedTo: null, followUp: 'Call back to answer questions about Bonita (sample).', source: 'website' },
      { id: 'INQ-102', sample: true, createdAt: ago(5), name: 'Sample Adopter B', phone: '555-0102', email: 'adopter.b@example.com', animalSlug: 'mia', preferredContact: 'phone', status: 'new', assignedTo: null, followUp: 'Caller asked about Mia on the AI demo line; wants a call back (sample).', source: 'phone (AI demo)' },
      { id: 'INQ-103', sample: true, createdAt: ago(26), name: 'Sample Adopter C', phone: '555-0103', email: 'adopter.c@example.com', animalSlug: 'tigerlily', preferredContact: 'text', status: 'meeting_requested', assignedTo: STAFF[0] as string, followUp: 'Confirm or reschedule the requested meeting (sample).', source: 'website' },
      { id: 'INQ-104', sample: true, createdAt: ago(50), name: 'Sample Adopter D', phone: '555-0104', email: 'adopter.d@example.com', animalSlug: 'porter', preferredContact: 'email', status: 'contacted', assignedTo: STAFF[1] as string, followUp: 'Sent Pets & People Profile link; waiting on reply (sample).', source: 'website' },
    ],
    meetings: [
      { id: 'MTG-201', sample: true, inquiryId: 'INQ-103', createdAt: ago(25), name: 'Sample Adopter C', animalSlug: 'tigerlily', preferredSlots: [day(2, 11), day(3, 15)], status: 'awaiting_staff_confirmation' },
    ],
  };
}

export function ShelterProvider({ tenant, children }: { tenant: TenantConfig; children: React.ReactNode }) {
  const data = tenant.shelter as ShelterData;
  const key = `local-os:${tenant.slug}:shelter:v1`;
  const [state, setState] = useState<ShelterDemoState | null>(null);
  useEffect(() => {
    let initial: ShelterDemoState | null = null;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) initial = JSON.parse(raw) as ShelterDemoState;
    } catch {
      initial = null;
    }
    setState(initial ?? seed());
  }, [key]);
  useEffect(() => {
    if (!state) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* private mode: state lives in memory only */
    }
  }, [key, state]);

  const animals = data.snapshot.animals;
  const animal = useCallback((slug: string | null | undefined) => animals.find((a) => a.slug === slug), [animals]);
  const nextId = (prefix: string, list: { id: string }[]) => `${prefix}-${Math.max(100, ...list.map((x) => Number(x.id.split('-')[1]) || 0)) + 1}`;

  const value = useMemo<Ctx | null>(() => {
    if (!state) return null;
    return {
      tenant, data, animals, animal, state,
      addInquiry: (i) => {
        const rec: ShelterInquiry = { ...i, id: nextId('INQ', state.inquiries), sample: true, createdAt: new Date().toISOString(), status: 'new', assignedTo: null, followUp: 'New website inquiry: call or message back (sample).', source: 'website' };
        setState((s) => (s ? { ...s, inquiries: [rec, ...s.inquiries] } : s));
        return rec;
      },
      addMeeting: (m) => {
        const rec: ShelterMeetingRequest = { ...m, id: nextId('MTG', state.meetings), sample: true, createdAt: new Date().toISOString(), status: 'awaiting_staff_confirmation' };
        setState((s) => (s ? {
          ...s,
          meetings: [rec, ...s.meetings],
          inquiries: s.inquiries.map((q) => (q.id === m.inquiryId ? { ...q, status: 'meeting_requested', followUp: 'Confirm or reschedule the requested meeting (sample).' } : q)),
        } : s));
        return rec;
      },
      updateInquiry: (id, patch) => setState((s) => (s ? { ...s, inquiries: s.inquiries.map((q) => (q.id === id ? { ...q, ...patch } : q)) } : s)),
      updateMeeting: (id, patch) => setState((s) => (s ? { ...s, meetings: s.meetings.map((q) => (q.id === id ? { ...q, ...patch } : q)) } : s)),
      reset: () => setState(seed()),
    };
  }, [state, tenant, data, animals, animal]);

  if (!value) return <div className="min-h-[60vh]" aria-busy="true" />;
  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useShelter(): Ctx {
  const v = useContext(C);
  if (!v) throw new Error('useShelter outside ShelterProvider');
  return v;
}

/** Months from a published age such as "3Yrs 4Mths 1Wks" or "8Mths (approx)" — used only to group the age filter. */
export function ageMonths(age: string | undefined): number | null {
  if (!age) return null;
  const y = /(\d+)\s*Yrs?/i.exec(age); const m = /(\d+)\s*Mths?/i.exec(age);
  if (!y && !m) return null;
  return (y ? Number(y[1]) * 12 : 0) + (m ? Number(m[1]) : 0);
}

export const field = (a: ShelterAnimal, label: string) => a.fields.find((f) => f.label === label)?.value;

/** A published age written for people: "3Yrs 4Mths 1Wks" → "3 yrs 4 mths 1 wks". Wording otherwise unchanged. */
export const readableAge = (age: string | undefined) => (age ?? '').replace(/(\d+)\s*Yrs/g, '$1 yrs').replace(/(\d+)\s*Mths/g, '$1 mths').replace(/(\d+)\s*Wks/g, '$1 wks');
