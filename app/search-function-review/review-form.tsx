'use client';

import React, { useState } from 'react';

export function SearchFunctionReviewForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    companyName: '',
    companyUrl: '',
    jobUrl: '',
    jobDescription: '',
    contactName: '',
    workEmail: '',
    website: '',
    startedAt: Date.now(),
  });

  const input =
    'w-full bg-white border border-[var(--border-default)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-body text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--cta-primary)]';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/search-function-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="card border-[var(--brand-primary)] border-opacity-30">
        <p className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">
          We have the role.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          We&apos;ll review the job description against the function it describes and identify
          what should be internal, what can be automated, and what Xenco Labs can operate as a
          managed capability.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Company *</label>
          <input className={input} required value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Company website *</label>
          <input className={input} required type="url" placeholder="https://" value={form.companyUrl} onChange={(e) => setForm({ ...form, companyUrl: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Job posting URL</label>
        <input className={input} type="url" placeholder="LinkedIn, Workday, Greenhouse, Lever, company careers page..." value={form.jobUrl} onChange={(e) => setForm({ ...form, jobUrl: e.target.value })} />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Paste the job description *</label>
        <textarea
          className={input}
          required
          rows={10}
          placeholder="Paste the SEO, GEO, AEO, organic growth, content, or digital-growth job description here."
          value={form.jobDescription}
          onChange={(e) => setForm({ ...form, jobDescription: e.target.value })}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Your name *</label>
          <input className={input} required value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Work email *</label>
          <input className={input} required type="email" value={form.workEmail} onChange={(e) => setForm({ ...form, workEmail: e.target.value })} />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full px-6 py-3.5 rounded-lg font-semibold disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Review My Search Function →'}
      </button>

      <p className="text-xs text-[var(--text-tertiary)] text-center">
        No recruiting fee. No obligation. This is an operating-model review, not a candidate submission.
      </p>
    </form>
  );
}
