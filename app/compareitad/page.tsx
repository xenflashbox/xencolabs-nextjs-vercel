import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'CompareITAD',
  description:
    'CompareITAD is Xenco Labs’ IT asset disposition orchestration and chain-of-custody platform for enterprise and data-center technology refreshes.',
};

const process = [
  ['Client intake', 'Enterprise or data-center client engages CompareITAD for a refresh or disposition project.'],
  ['Asset scope', 'Servers, storage, GPUs, networking gear and other tracked assets are qualified for chain-of-custody handling.'],
  ['Verified vendor pool', 'Only eligible ITAD vendors with compliant facilities, certifications and signed CompareITAD agreements can participate.'],
  ['Blind bidding', 'CompareITAD runs the bid process and can recommend up to three qualified vendors; the client chooses.'],
  ['Custody tracking', 'Pickup scan, bill of lading, transport, receipt scan, facility intake and serial matching are reconciled.'],
  ['Disposition evidence', 'Sanitization/destruction records, certificates, indemnity and serial evidence are matched to the original asset list.'],
  ['Record of disposition', 'CompareITAD issues the defensible disposition record when the process reconciles cleanly.'],
  ['Value recovery', 'Assets are cleared for resale through the winning ITAD vendor, buyers, exchanges or open-market channels.'],
];

const economics = [
  'Client engagement: $5,000 minimum or $12 per tracked asset.',
  'CompareITAD receives 20% of net resale economics after the gear is sold.',
  'Partner agents can earn 30% of CompareITAD economics when a qualified lead closes.',
  'Neutrality is preserved because vendors meet eligibility rules, bid blind and the client chooses the provider.',
];

const relevance = [
  'Data-center operators doing hardware refreshes',
  'Cloud, colocation and managed infrastructure providers whose clients need disposition support',
  'ITAD providers that want qualified enterprise opportunities',
  'Agents and infrastructure professionals close to refresh events',
  'Enterprises that need defensible due-diligence records before resale',
];

export default function CompareITADPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-5xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">COMPAREITAD</p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            IT asset disposition orchestration, chain-of-custody verification and resale recovery.
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-4xl mx-auto mb-10">
            CompareITAD is not just a vendor directory. It is a transaction and compliance service for enterprise and data-center technology refreshes: qualified vendor selection, blind bidding, serial-level tracking, defensible disposition records and value recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://compareitad.com" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
              Visit CompareITAD <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/portfolio" className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="section-purple py-20 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-12 items-start">
          <div>
            <p className="label-text text-[var(--accent-amber)] mb-4">THE OPERATING MODEL</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
              CompareITAD sits on the client side of the ITAD journey.
            </h2>
            <p className="text-white/75 text-lg leading-relaxed mb-8">
              The platform acquires and qualifies clients with disposition needs, then manages the guardrails around vendor eligibility, competitive bidding, asset movement, serial reconciliation, documentation and resale readiness. Vendors compete for the work; CompareITAD verifies that the process is defensible for the asset owner.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {economics.map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/[0.05] p-5 text-sm text-white/75 leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-7">
            <p className="text-sm font-mono text-[var(--accent-amber)] mb-4">WHY NEUTRALITY HOLDS</p>
            <p className="text-white/75 leading-relaxed mb-5">
              CompareITAD does not prefer a vendor because the vendor signed an agreement. The agreement makes a vendor eligible to participate under CompareITAD rules. The client chooses the provider after reviewing qualified bids.
            </p>
            <p className="text-white/75 leading-relaxed">
              The value is the independent process: verified vendors, compliant facilities, required chain-of-custody records, serial-number matching and a defensible disposition record for the client.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tinted py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="label-text text-[var(--brand-primary)] mb-4">FROM REFRESH TO RESALE</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              A managed chain-of-custody workflow for real assets.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              The service is built around physical equipment movement and serial reconciliation: the assets that leave the data center must be the assets received, sanitized or destroyed, documented and cleared for resale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map(([title, body], index) => (
              <div key={title} className="card h-full">
                <p className="text-xs font-mono text-[var(--brand-primary)] mb-3">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-20 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">WHY THIS MATTERS FOR XENCO LABS</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-5">
              CompareITAD is an unfair advantage in infrastructure, data-center and asset-lifecycle markets.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Many Xenco Labs prospects sell into data centers, infrastructure buyers or enterprises managing tech refreshes. CompareITAD gives us working knowledge of the actual buyer questions, compliance risk, vendor selection, chain-of-custody records and value-recovery economics behind those searches.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {relevance.map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-none" />
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-purple py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Data-center customers already need this service.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Colocation, cloud, managed infrastructure and data-center operators can point customers with hardware refresh needs to CompareITAD as an independent process for vendor qualification, custody verification and resale readiness.
          </p>
          <Link href="/services/managed-search-content" className="bg-white text-[#0B1F3A] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors">
            See the Managed Search Program <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
