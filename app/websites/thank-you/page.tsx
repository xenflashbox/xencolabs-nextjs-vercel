import React from 'react';
import { Metadata } from 'next';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { IntakeForm } from './intake-form';

export const metadata: Metadata = {
  title: 'Payment received — tell us about your project',
  robots: { index: false, follow: false },
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams?.session_id || '';

  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-12 px-6 section-light">
        <div className="max-w-2xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">PAYMENT RECEIVED</p>
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-[var(--text-primary)] mb-6 leading-tight">
            You&apos;re in. Now let&apos;s build your site.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed">
            Thanks for your order — a receipt is on its way to your email. One quick step: tell us
            about your business below so we can start building. The more detail you share, the faster
            you&apos;re live.
          </p>
        </div>
      </section>

      <section className="section-light pb-24 px-6">
        <IntakeForm sessionId={sessionId} />
      </section>
    </MarketingLayout>
  );
}
