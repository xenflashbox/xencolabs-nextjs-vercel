import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Route } from 'next';
import {
  Braces, Binary, CaseUpper, Clipboard, Code2, FileJson2, Fingerprint,
  Hash, KeyRound, Network, Regex, RotateCcw, Split, Timer, Type,
} from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'Free Developer Tools',
  description:
    'Free browser-based developer utilities from Xenco Labs for JSON, Base64, JWTs, hashes, UUIDs, regex, timestamps, URL encoding, cURL, fetch, Axios, YAML, CSV, and more.',
};

const tools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter', body: 'Format, validate, and inspect JSON.', icon: FileJson2 },
  { name: 'Base64 Encode / Decode', href: '/tools/base64', body: 'Encode or decode Base64 locally in your browser.', icon: Binary },
  { name: 'JWT Decode', href: '/tools/jwt-decode', body: 'Inspect JWT header and payload without sending data anywhere.', icon: KeyRound },
  { name: 'Hash Generator', href: '/tools/hash', body: 'Generate common cryptographic hashes from text.', icon: Hash },
  { name: 'UUID Generator', href: '/tools/uuid', body: 'Create UUIDs quickly for development and testing.', icon: Fingerprint },
  { name: 'Regex Tester', href: '/tools/regex-tester', body: 'Test JavaScript regular expressions against sample text.', icon: Regex },
  { name: 'Timestamp Converter', href: '/tools/timestamp', body: 'Convert Unix timestamps and human-readable dates.', icon: Timer },
  { name: 'URL Encode / Decode', href: '/tools/url-encode', body: 'Safely encode or decode URL components.', icon: Network },
  { name: 'CSV ↔ JSON', href: '/tools/csv-json', body: 'Convert structured data between CSV and JSON.', icon: Braces },
  { name: 'YAML ↔ JSON', href: '/tools/yaml-json', body: 'Convert configuration data between YAML and JSON.', icon: Split },
  { name: 'cURL → fetch()', href: '/tools/curl-to-fetch', body: 'Turn cURL commands into browser-ready fetch calls.', icon: Code2 },
  { name: 'fetch() → Axios', href: '/tools/fetch-axios', body: 'Translate fetch requests into Axios syntax.', icon: RotateCcw },
  { name: 'cURL ↔ HTTPie', href: '/tools/curl-httpie', body: 'Convert common HTTP request syntax between clients.', icon: Code2 },
  { name: 'Case Converter', href: '/tools/case-converter', body: 'Convert casing and create URL-safe slugs.', icon: CaseUpper },
  { name: 'Text Diff', href: '/tools/text-diff', body: 'Compare two text blocks and inspect differences.', icon: Type },
  { name: 'Clipboard Sanitizer', href: '/tools/clipboard-sanitizer', body: 'Strip formatting and normalize copied text.', icon: Clipboard },
  { name: 'HTTP Status Explorer', href: '/tools/http-status', body: 'Quick reference for HTTP response codes.', icon: Network },
];

export default function ToolsPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">FREE TOOLS</p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            Useful developer tools. No signup. No upload.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
            A growing set of small utilities from Xenco Labs. These tools run in your browser,
            solve common development tasks quickly, and remain free to use.
          </p>
        </div>
      </section>

      <section className="section-tinted py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href as Route} className="card group h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[var(--accent-amber)]" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{tool.body}</p>
                  <span className="mt-5 inline-block text-sm font-semibold text-[var(--brand-primary)] group-hover:underline">
                    Open tool →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-light py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">
            Built for utility, useful for discovery.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The free tools are a separate utility library inside Xenco Labs — not one of our
            commercial products. They give developers something immediately useful and create
            an organic entry point into the broader product ecosystem.
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
