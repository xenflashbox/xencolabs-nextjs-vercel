'use client';

import { useState } from 'react';
import { CALENDLY_URL } from './config';

const MAILTO_FALLBACK =
  'mailto:xen@xencolabs.com?cc=laurie@xencolabs.com&subject=Executive%20Briefing%20Request';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Briefing-request form: name + email (required), company (optional).
 * On success it swaps to a thank-you state offering a direct booking link.
 * If the request fails, it surfaces a mailto fallback so a briefing can still
 * be requested — the CTA is never a dead end.
 */
export function BriefingCta({ id }: { id?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/advisory-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data?.error ||
            'We could not submit your request. Please email us directly.'
        );
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch (err) {
      console.error('Briefing request failed:', err);
      setError('Network error. Please email us directly.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        id={id}
        className="mx-auto max-w-md rounded-2xl border border-[#3B5C8F]/40 bg-[#0B1F3A] p-8 text-center"
      >
        <p className="text-lg font-semibold text-white">Request received.</p>
        <p className="mt-2 text-sm text-[#94A3B8]">
          One of the principals will be in touch. Prefer to put time on the
          calendar now?
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#E8A33D] px-6 py-3 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-[#f0b45f]"
        >
          Book a 30-minute briefing
        </a>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-2xl border border-[#3B5C8F]/40 bg-[#0B1F3A] p-8 text-left"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="briefing-name"
            className="mb-1.5 block text-sm font-medium text-[#D9E2F3]"
          >
            Name
          </label>
          <input
            id="briefing-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-[#3B5C8F]/60 bg-[#0B1F3A] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 focus:border-[#E8A33D] focus:outline-none"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label
            htmlFor="briefing-email"
            className="mb-1.5 block text-sm font-medium text-[#D9E2F3]"
          >
            Work email
          </label>
          <input
            id="briefing-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-[#3B5C8F]/60 bg-[#0B1F3A] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 focus:border-[#E8A33D] focus:outline-none"
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="briefing-company"
            className="mb-1.5 block text-sm font-medium text-[#D9E2F3]"
          >
            Company{' '}
            <span className="font-normal text-[#94A3B8]">(optional)</span>
          </label>
          <input
            id="briefing-company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full rounded-lg border border-[#3B5C8F]/60 bg-[#0B1F3A] px-4 py-3 text-sm text-white placeholder-[#94A3B8]/60 focus:border-[#E8A33D] focus:outline-none"
            placeholder="Company"
          />
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm text-[#E8A33D]">
          {error}{' '}
          <a href={MAILTO_FALLBACK} className="underline">
            Email us directly
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 w-full rounded-lg bg-[#E8A33D] px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-[#f0b45f] disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Request Executive Briefing'}
      </button>
      <p className="mt-3 text-center text-xs text-[#94A3B8]">
        Two required fields. No sales sequence. A principal replies.
      </p>
    </form>
  );
}
