import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Route } from 'next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'Managed Search & Content Intelligence',
  description:
    'Enterprise SEO, AEO, GEO, corpus-grounded content operations, and conversion strategy operated as a managed function by Xenco Labs.',
};

const operatingSystem = [
  {
    title: 'Search Intelligence',
    body: 'Ahrefs, DataForSEO, Google Search Console, live SERPs, competitive analysis, and AI-search visibility research identify what buyers are actually asking.',
  },
  {
    title: 'Knowledge Corpus',
    body: 'We build a source-grounded corpus from your site, product materials, documentation, approved claims, subject-matter expertise, and authoritative external sources.',
  },
  {
    title: 'Content Architecture',
    body: 'We convert keywords into buyer journeys: pain points, comparison paths, decision pages, pillar clusters, supporting articles, and conversion moments.',
  },
  {
    title: 'BlogCraft Production',
    body: 'Briefs, outlines, drafts, source validation, rewrites, formatting, author profiles, custom images, and publishing workflows move content from strategy to execution.',
  },
  {
    title: 'ScoreCraft QA',
    body: 'Every page is tested for SEO, AI-search readiness, source quality, structure, extractability, and remediation opportunities before and after optimization.',
  },
  {
    title: 'Measurement Loop',
    body: 'Rankings, impressions, traffic, conversions, content contribution, AI citations, and GSC feedback become the next operating queue.',
  },
];

const included = [
  'SEO, AEO, and GEO strategy',
  'Technical SEO and site-health recommendations',
  'Keyword and competitor intelligence',
  'Content inventory: keep, update, merge, expand, or retire',
  'Pillar, spoke, landing-page, and programmatic SEO roadmaps',
  'BlogCraft-powered content production and rewrites',
  'ScoreCraft SEO/GEO diagnostics and remediation',
  'Custom visual assets and article-level image strategy',
  'Author voice profiles and SME approval workflows',
  'Conversion path, CTA, and assessment-funnel recommendations',
  'Monthly executive reporting and roadmap review',
  'Principal-led strategy from Xenco Labs',
];

const comparison = [
  ['One SEO hire', 'One person with finite capacity', 'Managed operating function across strategy, tooling, production, QA, and reporting'],
  ['Tool familiarity', 'Ahrefs, GA4, SEMrush, or ChatGPT experience', 'Ahrefs + DataForSEO + GSC + BlogCraft + ScoreCraft + custom AI agents'],
  ['Content calendar', 'Topics and due dates', 'Buyer-intent architecture tied to search demand and conversion paths'],
  ['AI usage', 'Prompts and drafts', 'Corpus-grounded content system with gates, validation, images, and publishing'],
  ['Reporting', 'Rankings and traffic updates', 'Search, content, GEO, conversion, and executive operating cadence'],
];

export default function ManagedSearchContentPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">
            MANAGED SEARCH · CONTENT · GEO
          </p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            Your search, content, and AI-visibility team — already built.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-3xl mx-auto mb-10 leading-relaxed">
            Xenco Labs operates the full organic-growth function: search intelligence,
            technical SEO, AEO/GEO, corpus-grounded content operations, conversion
            strategy, proprietary AI tools, and executive reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
              Discuss the Managed Program <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tinted py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="label-text text-[var(--brand-primary)] mb-4">WHY THIS EXISTS</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              Most companies try to hire one person for an entire function.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed">
              The modern SEO/AEO role now spans technical search, keyword intelligence,
              content strategy, programmatic opportunities, AI-search readiness,
              conversion optimization, analytics, publishing operations, and team enablement.
              That is not one job. It is an operating system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operatingSystem.map((item) => (
              <div key={item.title} className="card">
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-20 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">ENTERPRISE PACKAGE</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              Managed Search & Content Intelligence
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed mb-8">
              Built for B2B companies with a real product, existing subject-matter expertise,
              and a marketing team that needs more search intelligence, content velocity,
              AI-search readiness, and operating leverage.
            </p>
            <div className="card border-[var(--brand-primary)] border-opacity-40">
              <p className="label-text text-[var(--brand-primary)] mb-2">ENTERPRISE MANAGED PROGRAM</p>
              <p className="font-display font-bold text-4xl text-[var(--text-primary)] mb-2">$20,000/month</p>
              <p className="text-[var(--text-secondary)] font-body mb-6">Recommended initial term: 3 months</p>
              <Link href="/contact" className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
                Request a Strategy Review <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item} className="flex gap-3 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-none" />
                <p className="text-sm text-[var(--text-secondary)] font-body">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tinted py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="label-text text-[var(--brand-primary)] mb-4">THE FIRST 90 DAYS</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              Establish the intelligence layer. Improve the asset. Operate the engine.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed">
              We start by measuring what already exists, prioritize the highest-value opportunities,
              then install the recurring operating cadence. The goal is not a burst of activity.
              It is a function that compounds.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                phase: 'Days 1–30',
                title: 'Build the intelligence layer',
                items: ['Technical baseline', 'Content inventory', 'Search opportunity map', 'AI-visibility baseline'],
              },
              {
                phase: 'Days 31–60',
                title: 'Improve the existing asset',
                items: ['Refresh high-value pages', 'Fix structural gaps', 'Improve internal linking', 'Launch first optimization wave'],
              },
              {
                phase: 'Days 61–90',
                title: 'Operate the engine',
                items: ['Ongoing content engine', 'GEO-ready production', 'Executive reporting cadence', 'Conversion feedback loop'],
              },
            ].map((phase) => (
              <div key={phase.phase} className="card">
                <p className="text-sm font-mono font-bold text-[var(--brand-primary)] mb-2">{phase.phase}</p>
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-5">{phase.title}</h3>
                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2.5 items-start text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] mt-0.5 flex-none" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="label-text text-[var(--brand-primary)] mb-4">WHY IT IS DIFFERENT</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              One hire gives you capacity. Xenco Labs gives you the system.
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-white">
            <div className="grid grid-cols-3 bg-[var(--surface-secondary)] text-sm font-bold text-[var(--text-primary)]">
              <div className="p-4">Need</div>
              <div className="p-4">Typical hire</div>
              <div className="p-4">Xenco Labs</div>
            </div>
            {comparison.map(([need, hire, xenco]) => (
              <div key={need} className="grid grid-cols-3 border-t border-[var(--border-subtle)] text-sm">
                <div className="p-4 font-semibold text-[var(--text-primary)]">{need}</div>
                <div className="p-4 text-[var(--text-secondary)]">{hire}</div>
                <div className="p-4 text-[var(--text-secondary)]">{xenco}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-20 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">HIRING AN SEO/GEO LEAD?</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              Send us the job description before you fill the seat.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed">
              We&apos;ll map the responsibilities to the actual operating disciplines,
              review the search footprint behind the role, and show you where one hire is
              enough — and where the business is really describing a managed function.
            </p>
          </div>
          <div className="card border-[var(--brand-primary)] border-opacity-40">
            <p className="text-sm text-[var(--text-secondary)] mb-5">
              Paste the role, company URL, and posting. For qualified B2B companies, we&apos;ll
              return an operating-model review instead of a recruiting pitch.
            </p>
            <Link href="/search-function-review" className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
              Review the Search Function <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-purple py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Turn your content library into an operating asset.
          </h2>
          <p className="text-white/80 font-body mb-8 leading-relaxed">
            We do not replace your team. We give them the intelligence, tooling,
            process, and production layer to make search and content compound.
          </p>
          <Link href="/contact" className="bg-white text-[#0B1F3A] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors">
            Start the Conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
