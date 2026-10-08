import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Route } from 'next';
import { ArrowRight } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Xenco Labs services span managed AI search and content, a turnkey Local Service Business OS, digital growth strategy, AI applications, infrastructure advisory, and product launch support.',
};

const services = [
  {
    title: 'Managed Search & Content Intelligence',
    price: '$20,000/mo enterprise program',
    body:
      'SEO, AEO/GEO, keyword intelligence, technical recommendations, BlogCraft production, ScoreCraft QA, conversion paths, and executive reporting operated as one managed function.',
    href: '/services/managed-search-content',
    cta: 'View the Program',
    featured: true,
  },
  {
    title: 'Local Service Business OS',
    price: '$14,500 setup · from $995/mo',
    body:
      'A connected digital back office for owner-operated service businesses: website, AI receptionist, estimates, scheduling, e-sign, field workflow, invoicing, payments, CRM follow-up, and local growth.',
    href: '/services/local-service-business-os',
    cta: 'See the Local Business OS',
    featured: false,
  },
  {
    title: 'Digital Growth Strategy',
    price: 'Starting at $10,000/mo',
    body:
      'Messaging, targeting, landing pages, buyer journeys, lead capture, conversion strategy, content architecture, and measurement for companies whose digital presence is underperforming.',
    href: '/growth',
    cta: 'See Growth Strategy',
  },
  {
    title: 'Websites & Landing Pages',
    price: 'From $900 one-time',
    body:
      'Fast, modern sites and conversion pages for companies that need a credible online presence, clearer positioning, and a cleaner path to leads.',
    href: '/websites',
    cta: 'Build Your Site',
  },
  {
    title: 'AI Applications & Automation',
    price: 'Scoped by engagement',
    body:
      'Custom apps, agents, MCP integrations, workflow automation, dashboards, and internal tools built from the same production stack we use for our own companies.',
    href: '/contact',
    cta: 'Discuss a Build',
  },
  {
    title: 'Infrastructure Advisory',
    price: 'Scoped by engagement',
    body:
      'Data-center, network, power, site-selection, ITAD, and infrastructure strategy informed by decades of direct enterprise-technology operating experience.',
    href: '/advisory',
    cta: 'View Advisory',
  },
  {
    title: 'Product & Market Launch Support',
    price: 'Scoped by engagement',
    body:
      'Positioning, launch pages, content, creative assets, automation, and outbound infrastructure for products entering a new market or needing a stronger commercial story.',
    href: '/contact',
    cta: 'Plan a Launch',
  },
];

export default function Page() {
  return (
    <MarketingLayout>
      <section className="section-light pt-32 lg:pt-40 pb-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mb-14">
            <p className="label-text text-[var(--brand-primary)] mb-4">SERVICES</p>
            <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
              We build the tools. We operate the system.
            </h1>
            <p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed">
              Xenco Labs combines proprietary AI products, enterprise technology experience,
              search intelligence, content operations, conversion strategy, and hands-on execution
              into managed programs and targeted implementation engagements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className={`card h-full flex flex-col ${service.featured ? 'border-[var(--brand-primary)] border-opacity-40 relative' : ''}`}
              >
                {service.featured && (
                  <span className="absolute -top-3 left-6 bg-[var(--cta-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Enterprise Focus
                  </span>
                )}
                <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-3 mt-1">
                  {service.title}
                </h2>
                <p className="text-sm font-mono font-bold text-[var(--text-primary)] mb-4">
                  {service.price}
                </p>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed mb-7 flex-1">
                  {service.body}
                </p>
                <Link
                  href={service.href as Route}
                  className={service.featured
                    ? 'btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start'
                    : 'btn-secondary px-6 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start'}
                >
                  {service.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tinted py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-4">HOW WE WORK</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-5">
            Principal-led, technology-enabled, outcome-driven.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
            The work is led directly by Xenco Labs principals and supported by the software,
            agents, research infrastructure, and operating systems we have already built.
            We do not sell a senior strategy and hand execution to a junior account team.
          </p>
          <Link href="/about" className="btn-secondary px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
            Meet the Principals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
