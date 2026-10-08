import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Search, Wrench, TrendingUp } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Xenco Labs services for enterprise search and AI visibility, local service business automation, and digital growth strategy.',
};

const services = [
  {
    icon: Search,
    label: 'ENTERPRISE SEARCH',
    title: 'Managed Search & Content Intelligence',
    body: 'SEO, AEO, GEO, corpus-grounded content operations, conversion strategy, proprietary AI tooling and executive reporting operated as a managed function.',
    href: '/services/managed-search-content',
    cta: 'See the managed program',
  },
  {
    icon: Wrench,
    label: 'LOCAL BUSINESS OPERATIONS',
    title: 'Local Service Business OS',
    body: 'A connected digital back office for owner-operated service businesses: website, AI receptionist, estimates, scheduling, e-sign, field workflow, invoices, payments and follow-up.',
    href: '/services/local-service-business-os',
    cta: 'See the turnkey system',
  },
  {
    icon: TrendingUp,
    label: 'DIGITAL GROWTH',
    title: 'Growth Strategy',
    body: 'Research, conversion architecture, live demo builds, search intelligence, content strategy and execution for companies that need a stronger digital acquisition system.',
    href: '/growth',
    cta: 'See the growth process',
  },
];

export default function ServicesPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">SERVICES</p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            We build and operate systems that remove growth bottlenecks.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            From enterprise search and AI visibility to owner-operated service businesses,
            Xenco Labs combines strategy, software, automation and production into working operating systems.
          </p>
        </div>
      </section>

      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, label, title, body, href, cta }) => (
            <Link key={title} href={href} className="card group h-full flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[var(--surface-secondary)] flex items-center justify-center mb-6">
                <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
              </div>
              <p className="label-text text-[var(--brand-primary)] mb-2">{label}</p>
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">{title}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed flex-1">{body}</p>
              <span className="mt-7 text-[var(--brand-primary)] font-semibold inline-flex items-center gap-2">
                {cta} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-purple py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Not sure which operating model fits?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Show us the current workflow and the constraint. We will tell you which engagement makes sense — and which does not.
          </p>
          <Link href="/contact" className="bg-white text-[#0B1F3A] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors">
            Start a Conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
