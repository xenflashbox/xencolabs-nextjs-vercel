import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { CALENDLY_URL } from '@/app/advisory/config';

export const metadata: Metadata = {
  title: 'Local Service Business OS | Small Business Automation',
  description:
    'Done-for-you service business software and small business automation: AI receptionist, estimates, scheduling, e-sign, field workflow, CRM, invoices, payments and local growth.',
};

const workflow = [
  { title: 'Lead arrives', body: 'Phone or web. The customer gets an answer instead of voicemail.' },
  { title: 'Estimate', body: 'A rules-based calculator produces a written estimate from your real rate card.' },
  { title: 'Book', body: 'Customers schedule the right appointment against live calendar availability.' },
  { title: 'Verify', body: 'You confirm measurements, conditions, scope and pricing from the field.' },
  { title: 'Contract', body: 'The approved scope becomes an e-signable agreement with your terms and disclosures.' },
  { title: 'Do the job', body: 'The signed scope creates the job checklist so the field work matches what was sold.' },
  { title: 'Document', body: 'Before-and-after media creates a job record and reduces disputes.' },
  { title: 'Invoice + collect', body: 'Completion generates the final invoice and payment flow automatically.' },
];

const included = [
  'Conversion-focused branded website',
  'Service catalog and configurable rate-card estimator',
  'Written estimate / PDF delivery workflow',
  'AI phone receptionist trained on approved business knowledge',
  'Appointment scheduling and calendar availability',
  'Owner/admin quote verification',
  'Proposal, contract and e-sign workflow',
  'Scope-derived field task checklist',
  'Before-and-after photo documentation',
  'Customer account portal',
  'Recurring-service / subscription controls',
  'Final invoicing and Stripe payment collection',
  'CRM lead and customer records',
  'Abandoned quote and unsigned-proposal follow-up',
  'Mautic nurture and customer campaigns',
  'Analytics, conversion tracking and managed updates',
];

const verticals = [
  'Exterior cleaning',
  'Window & gutter cleaning',
  'Pool service',
  'Landscaping & property maintenance',
  'Junk removal',
  'Mobile detailing',
  'Pest control',
  'Other owner-operated field services',
];

export default function LocalServiceBusinessOSPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-5xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">
            LOCAL SERVICE BUSINESS OS
          </p>
          <h1 className="font-display font-bold text-5xl lg:text-7xl text-[var(--text-primary)] mb-6 leading-tight">
            You do the work.
            <br />
            The system handles the office.
          </h1>
          <p className="text-xl text-[var(--text-secondary)] font-body max-w-3xl mx-auto mb-10 leading-relaxed">
            Xenco Labs installs a connected service-business operating system around the owner:
            AI phone answering, estimates, appointments, contracts, field workflows, CRM,
            documentation, invoices, payments and follow-up — as one managed system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2"
            >
              Book a Build Consultation <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/portfolio/sonoma-wash-co"
              className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center"
            >
              See the Live Example
            </Link>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] mt-6">
            Built for owner-operated service businesses and small field teams that need growth without adding office overhead.
          </p>
        </div>
      </section>

      <section className="section-purple py-14 px-6">
        <div className="max-w-content mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            ['One customer journey', 'From first call to paid invoice'],
            ['One operating layer', 'Website + voice + CRM + field workflow'],
            ['One owner focus', 'Show up, sell the right work, do the job'],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="font-display font-bold text-2xl text-white mb-2">{title}</p>
              <p className="text-white/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="label-text text-[var(--brand-primary)] mb-4">THE PROBLEM</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              The owner is usually the technician, estimator, scheduler, salesperson and collections department.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Local service businesses rarely lose because the owner cannot do the work. They lose because calls arrive while
              the owner is on a ladder, estimates sit unfinished at night, unsigned quotes are never followed up, and completed
              jobs wait days for an invoice. We remove that administrative drag.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ['Missed calls', 'A knowledgeable AI receptionist can answer routine questions and book against live availability.'],
              ['Slow estimates', 'Customers can price common work immediately, while the owner retains final field verification.'],
              ['Paperwork after hours', 'Approved scope flows into contracts, job tasks, completion records and invoicing.'],
              ['Leads that disappear', 'CRM and nurture workflows keep quote follow-up from depending on memory.'],
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
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="label-text text-[var(--brand-primary)] mb-4">THE OPERATING LOOP</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              From first contact to money in the bank.
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              The system is designed around the way a small service company actually works — not around a collection of disconnected SaaS subscriptions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {workflow.map(({ title, body }, index) => (
              <div key={title} className="card relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[var(--surface-secondary)] flex items-center justify-center">
                    <span className="text-sm font-mono font-bold text-[var(--brand-primary)]">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">LIVE REFERENCE BUILD</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-5">
              Sonoma Wash Co. started with a pressure washer. We built the rest of the business around it.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              The live implementation combines a local-search site, published pricing, instant estimates, appointment booking,
              an AI receptionist, owner quote verification, e-sign agreements, field tasks, before-and-after documentation,
              invoicing, Stripe payments, recurring-service controls and marketing follow-up.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/portfolio/sonoma-wash-co" className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
                Read the Case Study <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://sonomawashco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center"
              >
                Visit Sonoma Wash Co.
              </a>
            </div>
          </div>
          <a href="https://sonomawashco.com" target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden border border-[var(--border-default)] shadow-xl bg-white">
            <img
              src="https://media.sonomawashco.com/img/hero-desktop-natural-poster.jpg"
              alt="Sonoma Wash Co. exterior-cleaning business"
              className="w-full aspect-[16/10] object-cover"
            />
            <div className="p-5 border-t border-[var(--border-subtle)]">
              <p className="font-display font-bold text-[var(--text-primary)]">Live production business</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Sonoma Valley · launched 2026</p>
            </div>
          </a>
        </div>
      </section>

      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">WHAT IS INCLUDED</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              Not a website project. A working business system.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              We configure the operating flow around your services, pricing logic, territory, appointment model and field process.
              Third-party usage fees and payment processing remain transparent rather than being buried inside the platform fee.
            </p>
            <div className="card">
              <p className="label-text text-[var(--brand-primary)] mb-2">STANDARD BUILD</p>
              <p className="font-display font-bold text-4xl text-[var(--text-primary)]">$14,500</p>
              <p className="text-[var(--text-secondary)] mt-1 mb-5">setup · from $995/month managed</p>
              <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
                Typical implementation target: 2–4 weeks after intake, subject to service complexity, integrations and approval turnaround.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item} className="flex gap-3 bg-white border border-[var(--border-subtle)] rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-none" />
                <p className="text-sm text-[var(--text-secondary)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="label-text text-[var(--brand-primary)] mb-4">FOUNDING PROGRAM</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              A lower entry point for the first productized deployments.
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              We are opening a limited founding cohort while we turn the Sonoma Wash Co. reference architecture into repeatable vertical templates.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="card border-[var(--brand-primary)]">
              <p className="label-text text-[var(--brand-primary)] mb-2">FOUNDING COHORT · LIMITED</p>
              <p className="font-display font-bold text-4xl text-[var(--text-primary)]">$10,000</p>
              <p className="text-[var(--text-secondary)] mt-1">setup + $750/month</p>
              <p className="text-sm text-[var(--text-tertiary)] mt-5 leading-relaxed">
                For qualified owner-operated businesses that fit the current field-service architecture and agree to a tightly scoped implementation.
              </p>
            </div>
            <div className="card">
              <p className="label-text text-[var(--brand-primary)] mb-2">BRAND LAUNCH ADD-ON</p>
              <p className="font-display font-bold text-3xl text-[var(--text-primary)]">From $3,500</p>
              <p className="text-[var(--text-secondary)] mt-1">name · domain · logo · visual identity</p>
              <p className="text-sm text-[var(--text-tertiary)] mt-5 leading-relaxed">
                For businesses starting from zero. Can include naming, domain direction, logo system, core brand kit and field/vehicle identity guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">WHO IT FITS</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-5">
              Start where the workflow is repeatable.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              The first deployments focus on local and field-service businesses where the owner or a small crew sells measurable field work,
              documents completion and collects after service. More regulated trades can use the same architecture with additional workflow design.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {verticals.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] flex-none" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: 'AI receptionist', body: 'Answers from your approved knowledge, qualifies the request and books the appropriate appointment.' },
              { title: 'Local growth foundation', body: 'Service pages, local landing pages, technical SEO, structured data and the content architecture for organic acquisition.' },
              { title: 'Follow-up without an office manager', body: 'Quote nurture, customer updates, recurring-service reminders and campaign automation run from the CRM.' },
              { title: 'Owner remains in control', body: 'Automations prepare and move the work; the business owner retains approval where pricing, scope and customer commitments matter.' },
            ].map(({ title, body }) => (
              <div key={title} className="card flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--surface-secondary)] flex items-center justify-center flex-none">
                  <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">{title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-purple py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle2 className="w-10 h-10 text-[var(--accent-amber)] mx-auto mb-5" />
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Stop building the office around yourself.
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Bring us your services, pricing, territory and workflow. We will show you what can be standardized, automated and turned into a business that is easier to operate and easier to grow.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#0B1F3A] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors"
          >
            Book a Build Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </MarketingLayout>
  );
}
