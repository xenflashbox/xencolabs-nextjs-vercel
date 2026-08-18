import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'Payment received — your pitch deck',
  robots: { index: false, follow: false },
};

export default function PitchThankYouPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-24 px-6 section-light">
        <div className="max-w-2xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">PAYMENT RECEIVED</p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-[var(--text-primary)] mb-6 leading-tight">
            Your pitch deck is on the way.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed mb-6">
            Thanks for your order — a receipt is in your inbox. Within one business day we’ll email you
            a short intake to collect your product, your audience, and your key numbers, then we’ll
            build your customized deck and send it back for review.
          </p>
          <p className="text-[var(--text-tertiary)] font-body mb-10">
            Want to get a head start? Reply to your receipt with your logo, any existing slides, and a
            sentence on what the deck needs to sell — and to whom.
          </p>
          <Link href="/growth" className="btn-secondary px-6 py-3 rounded-lg text-sm font-semibold inline-flex items-center gap-2">
            Back to Growth
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
