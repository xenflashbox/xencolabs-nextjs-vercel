import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { APPS } from '@/lib/apps';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore Xenco Labs production software and platforms, including ScoreCraft, BlogCraft, ImageCrafter, Image Forge, LaunchCraft, RexResume, MCP Forge, and CompareITAD.',
};

export default function Page() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">PRODUCTS &amp; PLATFORMS</p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            We build the tools we use to operate.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-3xl mx-auto mb-10 leading-relaxed">
            Xenco Labs develops production software across search, content, creative,
            workflow automation, consumer SaaS, and enterprise infrastructure. Some
            products are self-serve; others power our managed services and vertical platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/managed-search-content" className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
              See the Managed Stack <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tinted py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPS.map((app) => {
              const inner = (
                <div className="card group flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">{app.name}</h2>
                      <p className="text-sm text-[var(--text-tertiary)]">{app.subtitle}</p>
                    </div>
                    <span className="text-xs rounded-full bg-[var(--surface-secondary)] px-3 py-1 text-[var(--text-secondary)] flex-none">
                      {app.status}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed flex-1">{app.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">{app.subdomain}</span>
                    <span className="text-[var(--brand-primary)] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      {'internal' in app && app.internal ? 'Discuss' : 'Visit'} <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
              return 'internal' in app && app.internal ? (
                <Link key={app.name} href="/contact" className="block h-full">{inner}</Link>
              ) : (
                <a key={app.name} href={app.href} target="_blank" rel="noopener noreferrer" className="block h-full">{inner}</a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-light py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-4">WHY THE PORTFOLIO MATTERS</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-5">
            The products are not separate from the services.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
            ScoreCraft becomes the diagnostic layer. BlogCraft becomes the managed production
            layer. ImageCrafter becomes the visual layer. Our agents, MCP integrations, and
            vertical platforms provide the automation and domain context around them.
          </p>
          <Link href="/portfolio" className="btn-secondary px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
            See the Operating Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
