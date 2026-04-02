'use client';

import React, { useState } from 'react';

const companySizes = [
  'Under $5M',
  '$5M – $20M',
  '$20M – $50M',
  '$50M+',
  'Rather not say',
];

export function GrowthAuditForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    websiteUrl: '',
    contactName: '',
    workEmail: '',
    companySize: '',
  });

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto bg-white/10 rounded-xl p-8 backdrop-blur-sm">
        <p className="text-white text-xl font-display font-semibold mb-2">
          Thank you.
        </p>
        <p className="text-gray-300">
          We&apos;ll have your audit ready within 3-5 business days. Check your
          inbox for confirmation.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/growth-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  const inputClasses =
    'w-full bg-white rounded-lg px-4 py-3 text-[var(--text-primary)] font-body text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--cta-primary)]';

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-4">
      {status === 'error' && (
        <div className="bg-red-500/20 border border-red-500/40 text-red-200 rounded-lg px-4 py-3 text-sm">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="companyName" className="block text-sm text-gray-300 mb-1.5 font-body">
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          required
          className={inputClasses}
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="websiteUrl" className="block text-sm text-gray-300 mb-1.5 font-body">
          Website URL
        </label>
        <input
          id="websiteUrl"
          type="url"
          required
          placeholder="https://"
          className={inputClasses}
          value={formData.websiteUrl}
          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="contactName" className="block text-sm text-gray-300 mb-1.5 font-body">
          Your Name
        </label>
        <input
          id="contactName"
          type="text"
          required
          className={inputClasses}
          value={formData.contactName}
          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="workEmail" className="block text-sm text-gray-300 mb-1.5 font-body">
          Work Email
        </label>
        <input
          id="workEmail"
          type="email"
          required
          className={inputClasses}
          value={formData.workEmail}
          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="companySize" className="block text-sm text-gray-300 mb-1.5 font-body">
          Company Size
        </label>
        <select
          id="companySize"
          required
          className={inputClasses}
          value={formData.companySize}
          onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
        >
          <option value="">Select company size</option>
          {companySizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[var(--cta-primary)] hover:bg-[var(--cta-primary-hover)] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          'Request My Audit →'
        )}
      </button>
    </form>
  );
}
