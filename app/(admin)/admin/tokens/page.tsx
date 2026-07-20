'use client';

import { useCallback, useState } from 'react';
import {
  DEFAULT_EXPIRY_DAYS,
  MAX_EXPIRY_DAYS,
  MIN_EXPIRY_DAYS,
  PROTECTED_DOCUMENTS,
  slugifyRecipient,
} from '@/lib/protected-documents';

interface GeneratedLink {
  magicLink: string;
  recipient: string;
  documentKey: string;
  label: string;
  route: string;
  expiresAt: string;
  expiryDays: number;
}

interface ApiErrorDetail {
  field: string;
  issue: string;
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function expiryPreview(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminTokensPage() {
  const [adminPassword, setAdminPassword] = useState('');
  const [recipient, setRecipient] = useState('');
  const [documentKey, setDocumentKey] = useState(
    PROTECTED_DOCUMENTS[0]?.key ?? ''
  );
  const [expiryDays, setExpiryDays] = useState(DEFAULT_EXPIRY_DAYS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<GeneratedLink | null>(null);
  const [history, setHistory] = useState<GeneratedLink[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const hasDocuments = PROTECTED_DOCUMENTS.length > 0;

  const handleGenerate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setResult(null);
      setLoading(true);
      try {
        const res = await fetch('/api/admin/generate-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipient,
            documentKey,
            expiryDays,
            adminPassword,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          const details: ApiErrorDetail[] | undefined = Array.isArray(
            data.details
          )
            ? data.details
            : undefined;
          setError(
            details?.length
              ? `${data.error}: ${details
                  .map((d) => `${d.field} — ${d.issue}`)
                  .join('; ')}`
              : data.error || 'Failed to generate link'
          );
          return;
        }
        setResult(data);
        setHistory((prev) => [data, ...prev]);
      } catch (err) {
        console.error('Token generation request failed:', err);
        setError('Network error — the request did not reach the server.');
      } finally {
        setLoading(false);
      }
    },
    [recipient, documentKey, expiryDays, adminPassword]
  );

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Clipboard write failed:', err);
      setError('Clipboard copy failed — select and copy the link manually.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-4">
          <div className="mb-6">
            <div className="text-2xl mb-1">🔑</div>
            <h1 className="text-white text-xl font-semibold">
              Access Link Generator
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Create expiring, per-recipient links to gated documents.
            </p>
          </div>

          {!hasDocuments ? (
            <div className="bg-amber-950/40 border border-amber-900 rounded-lg px-4 py-4">
              <p className="text-amber-300 text-sm font-medium mb-1">
                No protected documents configured
              </p>
              <p className="text-amber-200/70 text-sm">
                Add an entry to{' '}
                <code className="font-mono text-xs bg-gray-800 px-1.5 py-0.5 rounded">
                  PROTECTED_DOCUMENTS
                </code>{' '}
                in{' '}
                <code className="font-mono text-xs bg-gray-800 px-1.5 py-0.5 rounded">
                  lib/protected-documents.ts
                </code>{' '}
                to start issuing links.
              </p>
            </div>
          ) : (
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label
                  htmlFor="adminPassword"
                  className="block text-gray-300 text-sm font-medium mb-1.5"
                >
                  Admin Password
                </label>
                <input
                  id="adminPassword"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="recipient"
                  className="block text-gray-300 text-sm font-medium mb-1.5"
                >
                  Recipient Name
                </label>
                <input
                  id="recipient"
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  onBlur={(e) => setRecipient(slugifyRecipient(e.target.value))}
                  placeholder="jane-doe"
                  required
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 font-mono"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Lowercase and hyphens only. Appears in access logs.
                </p>
              </div>

              <div>
                <label
                  htmlFor="documentKey"
                  className="block text-gray-300 text-sm font-medium mb-1.5"
                >
                  Document
                </label>
                <select
                  id="documentKey"
                  value={documentKey}
                  onChange={(e) => setDocumentKey(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                >
                  {PROTECTED_DOCUMENTS.map((doc) => (
                    <option key={doc.key} value={doc.key}>
                      {doc.label} ({doc.route})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="expiryDays"
                  className="block text-gray-300 text-sm font-medium mb-1.5"
                >
                  Expires In
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="expiryDays"
                    type="number"
                    value={expiryDays}
                    onChange={(e) =>
                      setExpiryDays(
                        Math.max(
                          MIN_EXPIRY_DAYS,
                          Math.min(
                            MAX_EXPIRY_DAYS,
                            parseInt(e.target.value, 10) || DEFAULT_EXPIRY_DAYS
                          )
                        )
                      )
                    }
                    min={MIN_EXPIRY_DAYS}
                    max={MAX_EXPIRY_DAYS}
                    className="w-24 bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-center"
                  />
                  <span className="text-gray-400 text-sm">days</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Expires: {expiryPreview(expiryDays)}
                </p>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-950 border border-red-900 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !recipient || !adminPassword}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg px-4 py-3 text-sm transition-colors"
              >
                {loading ? 'Generating…' : 'Generate Link'}
              </button>
            </form>
          )}

          {result && (
            <div className="border-t border-gray-800 mt-6 pt-6">
              <p className="text-green-400 text-sm font-medium mb-3">
                Link generated
              </p>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 font-mono text-xs text-gray-300 break-all mb-3">
                {result.magicLink}
              </div>
              <button
                onClick={() => copyToClipboard(result.magicLink, 'result')}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
              >
                {copied === 'result' ? 'Copied' : 'Copy to Clipboard'}
              </button>
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>
                  Recipient:{' '}
                  <span className="text-gray-300 font-mono">
                    {result.recipient}
                  </span>
                </p>
                <p>
                  Document:{' '}
                  <span className="text-gray-300 font-mono">{result.route}</span>
                </p>
                <p>
                  Expires:{' '}
                  <span className="text-gray-300">
                    {formatDate(result.expiresAt)}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-gray-300 text-sm font-medium mb-4">
              Recent Links (this session)
            </h2>
            <div className="space-y-3">
              {history.map((item, idx) => (
                <div
                  key={`${item.recipient}-${item.expiresAt}-${idx}`}
                  className="flex items-center justify-between gap-4 py-3 border-t border-gray-800 first:border-0 first:pt-0"
                >
                  <div className="text-xs text-gray-400 min-w-0">
                    <span className="text-gray-300 font-mono">
                      {item.recipient}
                    </span>
                    <span className="text-gray-600 mx-1">→</span>
                    <span className="text-gray-500 font-mono">{item.route}</span>
                    <br />
                    <span className="text-gray-600">
                      Expires {formatDate(item.expiresAt)}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(item.magicLink, `history-${idx}`)
                    }
                    className="flex-shrink-0 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium rounded-lg px-3 py-1.5 transition-colors"
                  >
                    {copied === `history-${idx}` ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
