import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { SearchFunctionReviewForm } from './review-form';

export const metadata: Metadata = {
  title: 'SEO/GEO Search Function Review | Xenco Labs',
  description:
    'Hiring an SEO, GEO, AEO, organic growth, or AI-search lead? Send Xenco Labs the job description and compare one hire with a managed search and content operating function.',
};

const disciplines = [
  'SEO strategy and technical search',
  'AEO / GEO / AI citation visibility',
  'Keyword, entity, and intent intelligence',
  'Content architecture and managed production',
  'Structured data and machine-readable content',
  'Conversion paths and CRO',
  'Reporting, share of voice, and pipeline measurement',
  'AI tooling, agents, automation, and implementation',
];

export default function SearchFunctionReviewPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">SEARCH FUNCTION REVIEW</p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            Hiring an SEO/GEO lead?
            <br />
            Your job description may be defining a function.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto mb-10">
            Modern search roles increasingly combine SEO, AI-search visibility, content operations,
            technical implementation, conversion, analytics, and automation. Send us the role
            you&apos;re trying to fill. We&apos;ll show you what belongs with a person, what belongs
            in software, and what can be operated as a managed capability.
          </p>
          <a href="#review" className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2">
            Send the Job Description <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="section-tinted py-20 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">THE PATTERN WE KEEP SEEING</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-5">
              One title. Eight operating disciplines.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-7">
              Companies are posting SEO/GEO roles that ask one person to own a search stack,
              content system, technical roadmap, AI visibility program, conversion layer, and
              executive reporting cadence. Sometimes that is exactly the right hire. Sometimes
              the business actually needs the operating system around the hire.
            </p>
            <div className="space-y-3">
              {disciplines.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-none" />
                  <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="card">
              <p className="label-text text-[var(--text-tertiary)] mb-3">ONE INTERNAL HIRE</p>
              <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">Capacity</h3>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>• One person&apos;s bandwidth</li>
                <li>• Recruiting and ramp time</li>
                <li>• Separate tools and implementation support</li>
                <li>• Additional writers, agencies, or contractors as needed</li>
                <li>• Knowledge concentrated in one seat</li>
              </ul>
            </div>
            <div className="card border-[var(--brand-primary)] border-opacity-40">
              <p className="label-text text-[var(--brand-primary)] mb-3">XENCO LABS MANAGED FUNCTION</p>
              <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">Operating capability</h3>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>• Principal-led search and growth strategy</li>
                <li>• Ahrefs + DataForSEO + GSC intelligence</li>
                <li>• ScoreCraft + BlogCraft technology</li>
                <li>• Production, technical, and creative capacity</li>
                <li>• Measurement and continuous optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="review" className="section-light py-20 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">SEND US THE ROLE</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-5">
              We&apos;ll map the job to the operating model.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-7">
              We review the responsibilities, the company&apos;s existing search footprint, and
              the likely execution burden. For qualified B2B companies, we can then show how an
              internal hire, a managed partner, or a hybrid structure would actually work.
            </p>
            <div className="rounded-2xl bg-[#0B1F3A] p-6 text-white">
              <p className="text-sm font-mono text-[var(--accent-amber)] mb-2">ENTERPRISE OPTION</p>
              <p className="font-display font-bold text-3xl mb-2">$20,000/month</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Principal-led Managed AI Search &amp; Organic Growth program. Recommended initial term: 3 months.
              </p>
            </div>
          </div>
          <SearchFunctionReviewForm />
        </div>
      </section>

      <section className="section-purple py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            If you only need one SEO practitioner, hire one.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            If the job description is really asking for an operating function, that is the conversation we want to have.
          </p>
          <Link href="/services/managed-search-content" className="bg-white text-[#0B1F3A] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors">
            See the Managed Program <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
