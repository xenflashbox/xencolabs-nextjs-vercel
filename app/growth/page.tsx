import React from 'react';
import { Metadata } from 'next';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { GrowthAuditForm } from './audit-form';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Digital Growth Strategy',
  description:
    'We build the digital presence that converts prospects into customers. Research, demo site, strategy presentation, and full execution.',
};

const problemCards = [
  {
    title: 'Your forms ask for too much',
    body: '8+ fields before a visitor can talk to you. Every field you add drops conversion by 4-6%. Your competitors have three.',
  },
  {
    title: 'One path for every visitor',
    body: "Enterprise buyers and channel partners land on the same page, see the same CTA, get the same pitch. Neither feels understood.",
  },
  {
    title: 'Your content speaks to you, not them',
    body: "Editorial blog titles that sound great internally but don't rank for the searches your buyers are actually making.",
  },
];

const steps = [
  {
    num: 1,
    title: 'Research',
    body: 'We analyze your current digital presence, your competitors, your search landscape, and where your buyers are going instead of coming to you.',
  },
  {
    num: 2,
    title: 'Build',
    body: "We create a working demo of what your digital presence should look like — new messaging, conversion-optimized pages, content strategy, lead capture redesign. This isn't a mockup. It's a live, deployed site.",
  },
  {
    num: 3,
    title: 'Present',
    body: 'We walk your team through a guided strategy presentation showing the before-and-after, the competitive gaps, and the specific improvements — with the live demo site ready to explore.',
  },
  {
    num: 4,
    title: 'Execute',
    body: 'Content strategy, SEO optimization, conversion funnels, A/B testing, AI-generated assets, and ongoing operations — powered by our proprietary content engine and delivered with monthly KPI reporting.',
  },
];

const comparisons = [
  {
    before: {
      image: '/images/growth/nexusguard-before-homepage.webp',
      caption:
        'Feature-first messaging. Award badge hero. 8+ field contact form. One CTA path for all visitors.',
    },
    after: {
      image: '/images/growth/nexusguard-after-homepage.webp',
      caption:
        'Pain-point headline. Specific metrics. A/B tested CTAs. 3-question risk assessment funnel that pre-qualifies leads with intent data.',
    },
  },
  {
    before: {
      image: '/images/growth/nexusguard-before-form.webp',
      caption:
        '8+ fields: name, company, title, email, phone, industry, country, message.',
    },
    after: {
      image: '/images/growth/nexusguard-after-form.webp',
      caption:
        '3-question quiz → risk score → 3 fields: name, email, company. Captures intent data the old form never asked.',
    },
  },
  {
    before: {
      image: '/images/growth/nexusguard-before-blog.webp',
      caption: 'Editorial titles, no category tags, shared hero style.',
    },
    after: {
      image: '/images/growth/nexusguard-after-blog.webp',
      caption:
        'Keyword-rich titles targeting buyer searches. Category tags. AI-generated hero images.',
    },
  },
];

const deliverables = [
  'Complete demo site with conversion-optimized messaging',
  'A/B testing framework with GA4 tracking per variant',
  'Self-assessment quiz funnel replacing the 8-field form',
  'SEO-driven blog content targeting buyer search queries',
  'AI sales assistant trained on product-specific knowledge',
  'AI-generated 60-second brand video ($0 production cost)',
  'Revenue calculator for channel partner pages',
  'Narrated strategy presentation with token-gated access',
];

const includedColumns = [
  {
    label: 'STRATEGY',
    items: [
      'Competitive landscape analysis',
      'Search visibility audit',
      'Buyer persona mapping',
      'Content gap identification',
      'Conversion funnel redesign',
    ],
  },
  {
    label: 'PRODUCTION',
    items: [
      'Demo site — live, deployed, yours to review',
      'Narrated strategy presentation',
      'AI-generated video and imagery',
      'Blog content targeting buyer searches',
      'Landing page and form optimization',
    ],
  },
  {
    label: 'TECHNOLOGY',
    items: [
      'A/B testing with GA4 tracking',
      'AI assistant trained on your product',
      'Self-assessment and quiz funnels',
      'Lead capture with intent scoring',
      'CRM-ready lead notifications',
    ],
  },
  {
    label: 'ACCOUNTABILITY',
    items: [
      'Monthly KPI reporting',
      'Search ranking tracking',
      'Conversion rate optimization',
      'Content performance reviews',
      'Strategy adjustment based on data',
    ],
  },
];

const whyItems = [
  {
    title: 'We built the tools.',
    body: "BlogCraft, our proprietary content engine, powers every engagement. This isn't ChatGPT with a wrapper.",
  },
  {
    title: 'We use them on ourselves.',
    body: 'WineCountryCorner.com and ResumeCoach.me run on the same pipeline we deploy for clients.',
  },
  {
    title: 'We know your industry.',
    body: '20+ years in enterprise tech — AboveNet, NexusGuard, Black Lotus (acquired by Level 3). We speak your language.',
  },
  {
    title: "AI is a tool, not a magic word.",
    body: 'We use AI for production — content, video, imagery, automation. But strategy comes from experience, not algorithms.',
  },
  {
    title: 'You see results before you commit.',
    body: "The demo site is live. The presentation is ready. You evaluate real work, not slide decks with promises.",
  },
];

export default function GrowthPage() {
  return (
    <MarketingLayout>
      {/* ─── 1. Hero ─── */}
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">
            DIGITAL GROWTH STRATEGY BY XENCO LABS
          </p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            Your website speaks to people who already trust you.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            We build the digital presence that converts everyone else — the
            prospects searching, comparing, and deciding right now without ever
            talking to your sales team.
          </p>
          <a
            href="#audit-form"
            className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2"
          >
            Get a Free Growth Audit
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-sm text-[var(--text-tertiary)] font-body mt-6 max-w-lg mx-auto">
            No pitch. No obligation. We analyze your site, your competitors, and
            your search visibility — then show you the gaps.
          </p>
        </div>
      </section>

      {/* ─── 2. The Problem ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            THE REALITY
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Most B2B websites are brochures, not sales tools.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problemCards.map((card) => (
              <div
                key={card.title}
                className="bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-xl p-8"
              >
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3">
                  {card.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. The Reframe ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-headline text-[var(--text-primary)] mb-8 text-center">
            The internet is the new Yellow Pages.
          </h2>
          <div className="text-lg text-[var(--text-secondary)] font-body leading-relaxed space-y-6">
            <p>
              Thirty years ago, when someone needed a plumber, they opened the
              phone book. They&apos;d already self-filtered — they knew what they
              needed. The businesses with the best listings got the calls.
            </p>
            <p>
              Today, the workflow is identical. Your buyers are searching right
              now — for your product, your niche, your solution. They&apos;re
              comparing options. They&apos;re reading content. They&apos;re
              deciding who to contact.
            </p>
            <p>
              The question isn&apos;t whether to be online. It&apos;s whether
              you&apos;re the listing they find — or the one they skip.
            </p>
          </div>
          <blockquote className="border-l-4 border-[var(--brand-primary)] bg-[var(--surface-secondary)] p-6 rounded-r-lg mt-12 italic text-xl font-display font-medium text-[var(--text-primary)]">
            &ldquo;You don&apos;t need a thousand leads. You need a hundred good
            ones — pre-qualified, self-directed, receptive to your message — and
            a close ratio that reflects it.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ─── 4. The Methodology ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            HOW WE WORK
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            We don&apos;t start with a proposal. We start with proof.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-[var(--border-default)]" />
            {steps.map((step) => (
              <div key={step.num} className="relative text-center md:text-left">
                <div className="w-10 h-10 rounded-full bg-[var(--cta-primary)] text-white font-bold flex items-center justify-center mx-auto md:mx-0 mb-4 relative z-10">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <div className="section-purple py-6 px-8 rounded-xl text-center mt-12">
            <p className="text-lg font-medium text-white">
              The demo site is live before the first meeting. You see exactly
              what changes before you spend a dollar.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 5. Case Study ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            CASE STUDY
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            What this looks like in practice.
          </h2>

          <div className="space-y-12">
            {comparisons.map((comp, i) => (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Before */}
                <div>
                  <span className="inline-block bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    BEFORE
                  </span>
                  <div className="rounded-xl shadow-lg overflow-hidden border border-[var(--border-default)]">
                    <Image
                      src={comp.before.image}
                      alt="Before screenshot"
                      width={1200}
                      height={675}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] font-body mt-3">
                    {comp.before.caption}
                  </p>
                </div>
                {/* After */}
                <div>
                  <span className="inline-block bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    AFTER
                  </span>
                  <div className="rounded-xl shadow-lg overflow-hidden border border-[var(--border-default)]">
                    <Image
                      src={comp.after.image}
                      alt="After screenshot"
                      width={1200}
                      height={675}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] font-body mt-3">
                    {comp.after.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* What was delivered */}
          <div className="mt-16">
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-6">
              What we delivered:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {deliverables.map((item) => (
                <p
                  key={item}
                  className="text-[var(--text-secondary)] font-body"
                >
                  <span className="text-[var(--brand-primary)] mr-2">→</span>
                  {item}
                </p>
              ))}
            </div>
            <a
              href="https://nexusguard.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="link font-medium inline-flex items-center gap-1.5 text-sm mt-6"
            >
              → See the live demo at nexusguard.dev
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <p className="text-xs text-[var(--text-tertiary)] mt-4">
              Demo site built by Xenco Labs as a strategy demonstration. Not an
              official Nexusguard property.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 6. What's Included ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            WHAT YOU GET
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Strategy, execution, and accountability.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {includedColumns.map((col) => (
              <div key={col.label} className="card">
                <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-4">
                  {col.label}
                </p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-2 font-body">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Who This Is For ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center max-w-3xl mx-auto">
            Built for companies with strong products and underperforming digital
            presence.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Enterprise */}
            <div className="card border-t-2 border-t-[var(--brand-primary)]">
              <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-3">
                ENTERPRISE
              </p>
              <p className="text-[var(--text-secondary)] font-body mb-6">
                Companies doing $20M+ that need to modernize how they generate
                and qualify leads online.
              </p>
              <p className="font-display font-semibold text-[var(--text-primary)] mb-2">
                Typical engagement:
              </p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1 font-body mb-6">
                <li>$10,000 – $20,000/month retainer</li>
                <li>3-month minimum commitment</li>
                <li>Full strategy, production, and reporting</li>
                <li>Dedicated account management</li>
              </ul>
              <p className="text-sm font-body text-[var(--text-tertiary)] mb-4">
                Industries we&apos;ve worked with: Cybersecurity · IT Asset
                Management · SaaS · Manufacturing
              </p>
              <Link
                href="/contact"
                className="btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2"
              >
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Growth Partnership */}
            <div className="card">
              <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-3">
                GROWTH PARTNERSHIP
              </p>
              <p className="text-[var(--text-secondary)] font-body mb-6">
                Small businesses with great products that need a digital presence
                built from scratch.
              </p>
              <p className="font-display font-semibold text-[var(--text-primary)] mb-2">
                Typical engagement:
              </p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1 font-body mb-6">
                <li>$0 upfront cost</li>
                <li>Revenue share on web-generated leads</li>
                <li>We build and operate the digital infrastructure</li>
                <li>You focus on product and fulfillment</li>
              </ul>
              <p className="text-sm font-body text-[var(--text-tertiary)] mb-4">
                Best for: Local businesses · Specialty manufacturers · Service
                providers
              </p>
              <Link
                href="/contact"
                className="btn-secondary px-6 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2"
              >
                Learn About Partnerships <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. Why Xenco Labs ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <h2 className="section-headline text-[var(--text-primary)] mb-12">
            This isn&apos;t a generic agency pitch.
          </h2>
          <div className="max-w-3xl space-y-8">
            {whyItems.map((item) => (
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

      {/* ─── 9. Audit Form ─── */}
      <section id="audit-form" className="section-purple py-24 px-6">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-4">
            Get your free Digital Growth Audit.
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
            We&apos;ll analyze your current website, your competitors, and your
            search visibility — then show you exactly where the opportunities
            are. No obligation. No pitch. Just data.
          </p>
          <GrowthAuditForm />
          <p className="text-gray-400 text-sm mt-8">
            Or email us directly:{' '}
            <a
              href="mailto:xen@xencolabs.com"
              className="underline hover:text-white transition-colors"
            >
              xen@xencolabs.com
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Typical audit turnaround: 3-5 business days
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
