import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'Sonoma Wash Co. Case Study | Pressure Washing Software Workflow',
  description:
    'How Xenco Labs built a pressure-washing business operating system for Sonoma Wash Co.: website, estimating, AI receptionist, scheduling, e-sign, field workflow, invoicing, payments and follow-up.',
};

const flow = [
  'Phone / web lead',
  'Instant estimate',
  '15-minute assessment',
  'Verified scope',
  'E-sign agreement',
  'Field job + media',
  'Invoice + payment',
];

export default function SonomaWashCaseStudyPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-5xl mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-6">CASE STUDY · LOCAL SERVICE BUSINESS OS</p>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div>
              <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
                From a pressure washer to a working business system.
              </h1>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                Sonoma Wash Co. began as a new owner-operated exterior-cleaning business. Xenco Labs built the brand,
                acquisition site and back-office workflow so the owner can spend more time estimating and doing the work
                instead of operating a clerical department.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://sonomawashco.com" target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
                  Visit the Live Business <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/services/local-service-business-os" className="btn-secondary px-7 py-3 rounded-lg font-semibold inline-flex items-center justify-center">
                  See the Product
                </Link>
              </div>
            </div>
            <a href="https://sonomawashco.com" target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden border border-[var(--border-default)] shadow-xl bg-white">
              <img
                src="https://media.sonomawashco.com/img/hero-desktop-natural-poster.jpg"
                alt="Sonoma Wash Co. live website and service brand"
                className="w-full aspect-[4/3] object-cover"
              />
            </a>
          </div>
        </div>
      </section>

      <section className="section-purple py-16 px-6">
        <div className="max-w-content mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            ['38+', 'public site routes'],
            ['6', 'core service categories'],
            ['9', 'problem / condition pages'],
            ['1', 'connected operating workflow'],
          ].map(([n, label]) => (
            <div key={label}>
              <p className="font-display font-bold text-4xl text-white">{n}</p>
              <p className="text-white/70 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="label-text text-[var(--brand-primary)] mb-4">WHAT WE BUILT</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              A complete customer journey, not a brochure site.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              The public experience sells with transparent pricing and deep service education. The private workflow moves an accepted job from verified scope through documentation and collection.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['Brand + market presence', 'Business naming, identity, domain, field-ready brand system and a conversion-focused website.'],
              ['Search architecture', 'Service pages, problem-intent pages, local city pages, commercial use cases, pricing and service-area content.'],
              ['Instant estimating', 'Customers configure common work against a published rate card and receive a written estimate.'],
              ['AI phone intake', 'A knowledge-grounded receptionist can answer common service questions and schedule against live availability.'],
              ['Quote-to-contract', 'Owner verification converts the estimate into final scope and an e-signable agreement.'],
              ['Field execution', 'Accepted scope becomes a job checklist with before-and-after media captured for the record.'],
              ['Completion-to-cash', 'Job completion produces the final invoice and a Stripe payment path.'],
              ['Customer portal', 'Customers can retain quotes, review invoices, pay balances and manage recurring service.'],
              ['CRM follow-up', 'Prospects and customers move into automated nurture and follow-up workflows instead of disappearing into an inbox.'],
            ].map(([title, body]) => (
              <div key={title} className="card">
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">{title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="label-text text-[var(--brand-primary)] mb-4">WORKFLOW</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">The office work follows the job automatically.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {flow.map((title, i) => (
              <div key={title} className="bg-white border border-[var(--border-subtle)] rounded-xl p-4 text-center">
                <div className="w-9 h-9 rounded-full bg-[var(--surface-secondary)] grid place-items-center mx-auto mb-3 text-xs font-mono font-bold text-[var(--brand-primary)]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="font-display font-semibold text-sm text-[var(--text-primary)]">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">PUBLIC ACQUISITION LAYER</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-5">
              The site answers the questions customers ask before they call.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              Sonoma Wash Co. publishes its rate card, explains when soft washing is safer than pressure,
              separates surface problems from service types, shows travel zones and gives customers two clear starts:
              price the property or book an assessment.
            </p>
            <ul className="space-y-3">
              {[
                'Residential and commercial service architecture',
                'Detailed condition pages for moss, mildew, oil, rust, soot, efflorescence and more',
                'Published pricing and recurring-plan economics',
                'Sonoma / Santa Rosa / Petaluma local pages',
                'Vacation-rental and hospitality use cases',
                'Merchandise storefront for brand extension',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)] flex-none mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <CheckCircle2 className="w-9 h-9 text-[var(--brand-primary)] mb-5" />
            <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
              A phone assistant that actually knows the business.
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
              The voice agent is grounded in the same service knowledge as the website. Instead of simply taking a message,
              it can answer common service questions, respect territory rules and book the appropriate assessment against live availability.
            </p>
            <p className="text-sm text-[var(--text-tertiary)]">
              The AI remains bounded by the approved knowledge and workflow; pricing and final field scope stay under owner control.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="card">
            <p className="label-text text-[var(--brand-primary)] mb-2">THE PRODUCTIZED LESSON</p>
            <p className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">
              The expensive part is not the website. It is connecting the business.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Phone intake, estimate logic, calendar, contracts, job scope, documentation, customer records,
              recurring service, invoicing and follow-up all have to agree about the same customer and the same job.
              That connected operating model is what Xenco Labs now productizes for other local service businesses.
            </p>
          </div>
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">NEXT</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              Use the same architecture for your service business.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-7">
              We start with your service menu, rate logic, territory, scheduling rules and current office workload,
              then determine what should be standardized and what still needs owner judgment.
            </p>
            <Link href="/services/local-service-business-os" className="btn-primary px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
              Explore Local Service Business OS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
