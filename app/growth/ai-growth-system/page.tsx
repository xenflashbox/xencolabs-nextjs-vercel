import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { GrowthAuditForm } from '../audit-form';
import { CALENDLY_URL } from '../../advisory/config';

export const metadata: Metadata = {
  title: 'AI Growth System for B2B Companies',
  description:
    'XencoLabs installs an AI-powered growth system that turns an underperforming B2B website into a qualified-lead engine in 30 days — messaging, conversion pages, lead capture, content, and reporting.',
  openGraph: {
    title: 'AI Growth System for B2B Companies | Xenco Labs',
    description:
      'Turn your website into a qualified-lead engine in 30 days. Messaging, conversion pages, AI-assisted content, intent-aware follow-up, and executive reporting — installed and managed by Xenco Labs.',
    type: 'website',
  },
};

// The installed system, shown as a left-to-right flow diagram.
const systemNodes = [
  { label: 'Messaging', sub: 'Buyer-pain positioning' },
  { label: 'Conversion pages', sub: 'Built to convert, not describe' },
  { label: 'Lead capture', sub: 'Low-friction funnels' },
  { label: 'AI content', sub: 'Built around real searches' },
  { label: 'Intent routing', sub: 'Fast, qualified follow-up' },
  { label: 'Reporting', sub: 'Executive KPI dashboard' },
];

const symptoms = [
  'Messaging is too broad or internally focused — the site speaks to everyone instead of the right buyer.',
  'There is only one generic form or CTA for every visitor.',
  'Blog content exists, but does not attract high-intent searches.',
  'Lead follow-up is slow or inconsistent.',
  'Leadership lacks visibility into what is actually working.',
];

const installed = [
  {
    title: 'Messaging framework',
    body: 'Positioning aligned to buyer pain and objections — not internal talking points.',
  },
  {
    title: 'Conversion-focused pages',
    body: 'Landing pages built for your highest-value offers, structured to convert comparison-stage buyers.',
  },
  {
    title: 'AI-assisted content strategy',
    body: 'A content roadmap built around the searches your buyers are actually making.',
  },
  {
    title: 'Lead capture funnel',
    body: 'A low-friction capture flow or self-assessment funnel that replaces the generic contact form.',
  },
  {
    title: 'Intent-aware follow-up',
    body: 'Lead routing and follow-up workflows so high-intent buyers reach sales fast.',
  },
  {
    title: 'Executive reporting',
    body: 'A KPI dashboard and reporting structure that gives leadership real visibility.',
  },
];

const differentiators = [
  {
    title: 'We start with proof',
    body: 'We do not begin with a generic agency deck. We show you what the improved system should look like.',
  },
  {
    title: 'We use tools we run in production',
    body: 'Your growth system is powered by XencoLabs products and workflows we already operate — BlogCraft, ImageCrafter, and more. Not theory, not a ChatGPT wrapper.',
  },
  {
    title: 'We combine strategy and execution',
    body: 'We do the research, build the assets, and help your team operate the system.',
  },
  {
    title: 'AI where it matters',
    body: 'Content production, insight extraction, workflow automation, reporting, and lead qualification — used for outcomes, not as a buzzword.',
  },
];

const bestFit = [
  'B2B services firms',
  'Cybersecurity / IT / managed services',
  'Industrial / manufacturing companies',
  'Specialty consultancies',
  'Founder-led or mid-market businesses',
];

const fitSignals = [
  'You already have a real offer and a sales process.',
  'The site has traffic but weak lead conversion.',
  'Messaging feels too broad or generic.',
  'Marketing is fragmented across disconnected tools.',
  'You want growth without hiring a full internal team.',
];

const weeks = [
  {
    num: 1,
    title: 'Audit & opportunity map',
    body: 'We review your website, positioning, content, competitors, conversion paths, and friction points.',
  },
  {
    num: 2,
    title: 'Messaging & buyer-path strategy',
    body: 'We define the audience segments, core offer language, CTA structure, and landing-page priorities.',
  },
  {
    num: 3,
    title: 'Build & install',
    body: 'We produce the pages, lead-capture structure, content roadmap, and follow-up workflow plan.',
  },
  {
    num: 4,
    title: 'Review & launch plan',
    body: 'We present the system, the KPI framework, and the next-step roadmap for execution and optimization.',
  },
];

const deliverables = [
  'Growth opportunity brief',
  'Messaging and targeting framework',
  '1–3 high-conversion landing pages',
  'Lead-capture redesign or assessment funnel',
  '90-day content strategy',
  'AI workflow map for follow-up and reporting',
  'KPI dashboard specification',
  'Team walkthrough and action plan',
];

const faqs = [
  {
    q: 'How is this different from hiring an agency?',
    a: 'We are not just producing campaigns. We design the underlying system that improves how your site attracts, captures, and routes demand — then help your team run it.',
  },
  {
    q: 'Do you build everything for us?',
    a: 'We can scope this as strategy, implementation, or a hybrid. The 30-day sprint is designed to move quickly and show tangible progress.',
  },
  {
    q: 'What if we already have a marketing team?',
    a: 'That is often ideal. We help your team operate with stronger messaging, better infrastructure, and clearer AI-assisted workflows.',
  },
  {
    q: 'Is this for early-stage startups?',
    a: 'Usually no. This is strongest for companies that already have an offer, some traction, and a need to improve conversion and growth operations.',
  },
];

export default function AiGrowthSystemPage() {
  return (
    <MarketingLayout>
      {/* ─── 1. Hero ─── */}
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">
            THE XENCOLABS AI GROWTH SYSTEM
          </p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            Turn your website into a qualified-lead engine in 30 days.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-4 leading-relaxed">
            Most B2B websites are built to describe a company. Very few are built
            to convert serious buyers.
          </p>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            XencoLabs installs an AI-powered growth system that improves
            messaging, sharpens targeting, upgrades lead capture, and gives your
            team a scalable way to turn traffic into sales conversations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#review"
              className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              Get a Free Growth System Review
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#system"
              className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              See How the System Works
            </a>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] font-body mt-6 max-w-lg mx-auto">
            Built for companies with strong offerings but underperforming digital
            conversion.
          </p>
        </div>
      </section>

      {/* ─── 2. The Problem ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            THE REALITY
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-6 text-center">
            Your website may look credible, but still lose deals.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-12 text-center leading-relaxed">
            The problem usually is not traffic alone. It is the lack of a
            connected growth system.
          </p>
          <div className="max-w-3xl mx-auto space-y-4">
            {symptoms.map((symptom) => (
              <div
                key={symptom}
                className="flex items-start gap-3 bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-xl p-5"
              >
                <span className="text-[var(--brand-primary)] font-bold mt-0.5">
                  ✕
                </span>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed">
                  {symptom}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. The System (diagram) ─── */}
      <section id="system" className="section-light py-24 px-6 scroll-mt-20">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            THE SYSTEM
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-4 text-center">
            One connected engine, not six disconnected tools.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-12 text-center leading-relaxed">
            Traffic enters on the left. Qualified sales conversations come out the
            right. Every stage feeds the next.
          </p>
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-2">
            {systemNodes.map((node, i) => (
              <React.Fragment key={node.label}>
                <div className="flex-1 bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-xl p-5 text-center">
                  <p className="font-display font-bold text-[var(--text-primary)] mb-1">
                    {node.label}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] font-body leading-snug">
                    {node.sub}
                  </p>
                </div>
                {i < systemNodes.length - 1 && (
                  <div className="flex items-center justify-center text-[var(--brand-primary)]">
                    <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. What we install ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            THE OFFER
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            What XencoLabs installs.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {installed.map((item) => (
              <div
                key={item.title}
                className="bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-xl p-8"
              >
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--text-tertiary)] font-body italic mt-10">
            This is not generic marketing advice. It is a practical system
            designed to increase qualified conversations.
          </p>
        </div>
      </section>

      {/* ─── 5. Differentiators ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            WHY XENCOLABS
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Why companies work with us.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="border-l-4 border-[var(--brand-primary)] pl-6"
              >
                <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-1">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Best fit ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center max-w-3xl mx-auto">
            Who this is for.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-4">
                Best fit
              </p>
              <ul className="space-y-3">
                {bestFit.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[var(--text-secondary)] font-body"
                  >
                    <Check className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-4">
                Usually a fit if
              </p>
              <ul className="space-y-3">
                {fitSignals.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[var(--text-secondary)] font-body"
                  >
                    <Check className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. The 30-day sprint ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            THE 30-DAY SPRINT
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            What happens in the first 30 days.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-[var(--border-default)]" />
            {weeks.map((week) => (
              <div key={week.num} className="relative text-center md:text-left">
                <div className="w-10 h-10 rounded-full bg-[var(--cta-primary)] text-white font-bold flex items-center justify-center mx-auto md:mx-0 mb-4 relative z-10">
                  {week.num}
                </div>
                <p className="text-xs font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-1">
                  Week {week.num}
                </p>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
                  {week.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed">
                  {week.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. Deliverables ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            WHAT YOU RECEIVE
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Deliverables.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
            {deliverables.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 text-[var(--text-secondary)] font-body"
              >
                <Check className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Pricing ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            ENGAGEMENT OPTIONS
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Two ways to work together.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Sprint */}
            <div className="card relative border-t-2 border-t-[var(--brand-primary)] flex flex-col">
              <span className="absolute -top-3 left-4 bg-[var(--cta-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Start Here
              </span>
              <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-3 mt-2">
                Growth System Sprint
              </p>
              <p className="text-[var(--text-secondary)] font-body mb-6">
                Fixed-fee, 30-day implementation for qualified companies that want
                to see the system before committing to a retainer.
              </p>
              <p className="font-display font-bold text-3xl text-[var(--text-primary)]">
                Starting at $12,500
              </p>
              <p className="text-sm font-body text-[var(--text-tertiary)] mb-6">
                Fixed-fee engagement · No retainer required
              </p>
              <a
                href="#review"
                className="btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 mt-auto"
              >
                Get a Free Growth System Review <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Retainer */}
            <div className="card flex flex-col">
              <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-3">
                Ongoing Growth Operator
              </p>
              <p className="text-[var(--text-secondary)] font-body mb-6">
                Monthly optimization, reporting, workflow improvements, content
                execution, and iteration once the system is live.
              </p>
              <p className="font-display font-bold text-3xl text-[var(--text-primary)]">
                Starting at $6,000<span className="text-lg font-medium text-[var(--text-tertiary)]">/month</span>
              </p>
              <p className="text-sm font-body text-[var(--text-tertiary)] mb-6">
                Monthly engagement · Custom scopes for larger enterprises
              </p>
              <Link
                href="/contact"
                className="btn-secondary px-6 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 mt-auto"
              >
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <p className="text-center text-sm text-[var(--text-tertiary)] font-body mt-8">
            For larger enterprise implementations, custom scopes are available.
          </p>
        </div>
      </section>

      {/* ─── 10. FAQ ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Questions.
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-2">
                  {faq.q}
                </h3>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. CTA / Review request ─── */}
      <section id="review" className="section-purple py-24 px-6 scroll-mt-20">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-4">
            Get a free Growth System Review.
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
            We&apos;ll review your current website, messaging, and buyer path — and
            identify the highest-impact opportunities to improve qualified lead
            flow.
          </p>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-12">
            No generic agency audit. No bloated proposal. Just a focused review of
            where the revenue gaps are.
          </p>
          <GrowthAuditForm />
          <p className="text-gray-300 text-sm mt-8">
            Prefer to talk first?{' '}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Book a 30-minute strategy call
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Typical review turnaround: 3–5 business days
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
