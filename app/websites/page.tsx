import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { CALENDLY_URL } from '../advisory/config';
import { Configurator } from './configurator';

export const metadata: Metadata = {
  title: 'Websites & Landing Pages',
  description:
    'Is your website losing you business? Xenco Labs builds fast, modern websites and landing pages in days — then hosts and maintains them. Fixed-price packages from $900, buy online.',
  openGraph: {
    title: 'Websites & Landing Pages | Xenco Labs',
    description:
      'A website that actually wins customers — built in days, hosted by us. Fixed-price packages from $900. Pick, customize, and buy online.',
    type: 'website',
  },
};

// Pain → solution wall
const painSolutions = [
  { pain: 'Your site looks like it’s from 2012.', sol: 'A clean, modern restyle that makes you look like the leader — live in days, not months.' },
  { pain: 'Customers pick your competitor because their site looks sharper.', sol: 'A build that out-classes the other guys in your market, so the click goes to you.' },
  { pain: 'You don’t even have a real site — or don’t know where to start.', sol: 'Done-for-you. You send your info once; we handle the rest.' },
  { pain: 'Leads come in and die in an inbox.', sol: 'Lead forms wired straight to your CRM so nothing slips.' },
  { pain: 'You can’t answer customers 24/7.', sol: 'An AI chat window that answers common questions day and night.' },
  { pain: 'It keeps breaking and you have no time for it.', sol: 'We host it, secure it, and keep it running. You never touch a server.' },
];

const whyItems = [
  { title: 'Live in days, not months.', body: 'We produce with our own AI stack — imagery, copy, layout — so a landing page ships in days and a full site in a couple of weeks.' },
  { title: 'You own it. We host it.', body: 'Your domain, your content, your site — not rented space you can never leave. We keep it fast, secure, and online.' },
  { title: 'Agency quality, boutique price.', body: 'The conversion-focused, mobile-first build agencies charge $5k–$30k for — at a fraction of the cost, no corners cut.' },
  { title: 'Built by people who ship.', body: 'We run our own production apps on the same pipeline we build yours with. Not a template farm.' },
];

const included = [
  'Mobile-responsive, fast-loading design',
  'On-page SEO setup (titles, meta, structure)',
  'AI-generated imagery tailored to your brand',
  'Copy polish on every page',
  'Contact form with email notifications',
  'One revision round',
  'Analytics wired and verified',
  'Launch + hosted with us',
];

const compareRows = [
  { label: 'Typical cost', diy: '$150–$1,200/yr', freelancer: '$1,500–$8,000', agency: '$5,000–$30,000', xenco: '$900–$2,500' },
  { label: 'Timeline', diy: 'Your nights & weekends', freelancer: 'Weeks — if they show', agency: '6–12 weeks', xenco: 'Days' },
  { label: 'Look & feel', diy: 'Looks DIY', freelancer: 'Inconsistent', agency: 'Polished', xenco: 'Polished' },
  { label: 'Who hosts & maintains it', diy: 'You', freelancer: 'Usually no one', agency: '+$500–$3,000/mo', xenco: 'Us — from $50/mo' },
];

const faqs = [
  { q: 'How does buying online work?', a: 'Pick a package, add anything you need, and check out securely with Stripe. You pay the one-time build plus your first month of hosting today, then hosting continues monthly — cancel anytime. Right after payment, you tell us about your project on a short form.' },
  { q: 'How fast is “days”?', a: 'A landing page is typically live within 3–5 business days of us having your content. A full site runs about 1–2 weeks. Every build gets a human review before launch.' },
  { q: 'Do I own the site?', a: 'Completely. It’s your domain, content, and site. Hosting with us keeps it running — you’re never locked in.' },
  { q: 'What’s not included?', a: 'We build and host your site — we’re not a marketing agency. We don’t run your ads, outreach, or sales, and we don’t promise a specific number of leads. Content and growth work is available as scoped add-ons.' },
];

export default function WebsitesPage() {
  return (
    <MarketingLayout>
      {/* ─── 1. Hero (pain hook) ─── */}
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">
            WEBSITES &amp; LANDING PAGES BY XENCO LABS
          </p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            Is your website losing you business?
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Get a site that actually wins customers — modern, fast, and built to
            convert. Live in days, not months, for a fraction of agency prices.
            Pick your package, customize it, and buy online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#build" className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2">
              Build Your Site <ArrowRight className="w-4 h-4" />
            </a>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2">
              Talk to Us First
            </a>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] font-body mt-6 max-w-lg mx-auto">
            Fixed prices. You own the site — we host and maintain it.
          </p>
        </div>
      </section>

      {/* ─── 2. Pain → Solution wall ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">SOUND FAMILIAR?</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Every one of these is costing you customers.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painSolutions.map((ps) => (
              <div key={ps.pain} className="bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-xl p-6">
                <p className="font-display font-semibold text-[var(--text-primary)] mb-3 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✕</span> {ps.pain}
                </p>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed flex items-start gap-2">
                  <Check className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" /> {ps.sol}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Why Xenco (value) ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">WHY XENCO LABS</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Agency quality. Studio speed. No lock-in.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {whyItems.map((item) => (
              <div key={item.title} className="border-l-4 border-[var(--brand-primary)] pl-6">
                <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-1">{item.title}</h3>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Comparison ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">HOW WE COMPARE</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Cheaper than an agency. Faster than a freelancer. Better than DIY.
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-default)] shadow-lg">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[var(--surface-secondary)]">
                  <th className="p-4 font-body text-sm font-semibold text-[var(--text-tertiary)]"></th>
                  <th className="p-4 font-display text-sm font-semibold text-[var(--text-secondary)]">DIY builder</th>
                  <th className="p-4 font-display text-sm font-semibold text-[var(--text-secondary)]">Freelancer</th>
                  <th className="p-4 font-display text-sm font-semibold text-[var(--text-secondary)]">Agency</th>
                  <th className="p-4 font-display text-sm font-bold text-[var(--brand-primary)] bg-[var(--brand-primary)]/5">Xenco Labs</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} className="border-t border-[var(--border-default)]">
                    <td className="p-4 font-body text-sm font-semibold text-[var(--text-primary)]">{row.label}</td>
                    <td className="p-4 font-body text-sm text-[var(--text-secondary)]">{row.diy}</td>
                    <td className="p-4 font-body text-sm text-[var(--text-secondary)]">{row.freelancer}</td>
                    <td className="p-4 font-body text-sm text-[var(--text-secondary)]">{row.agency}</td>
                    <td className="p-4 font-body text-sm font-semibold text-[var(--text-primary)] bg-[var(--brand-primary)]/5">{row.xenco}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] font-body mt-4 text-center">Ranges reflect typical 2026 US market pricing for comparable work.</p>
        </div>
      </section>

      {/* ─── 5. Every build includes ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">THE FINE PRINT, UP FRONT</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-4 text-center">Every build includes all of this.</h2>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-12 text-center leading-relaxed">
            Not a stripped-down starting point with everything as an upsell. This is standard on every package.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3 text-[var(--text-secondary)] font-body">
                <Check className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Configurator (buy) ─── */}
      <section id="build" className="section-tinted py-24 px-6 scroll-mt-20">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">BUILD &amp; BUY</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-4 text-center">
            Build your package. Buy it right now.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-12 text-center leading-relaxed">
            Pick a site, keep it online, and bolt on what you need. Your total updates as you go.
          </p>
          <Configurator />
        </div>
      </section>

      {/* ─── 7. Scope statement ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mx-auto border-l-4 border-[var(--brand-primary)] bg-[var(--surface-secondary)] p-6 rounded-r-lg">
            <p className="font-display font-semibold text-[var(--text-primary)] mb-2">Clear about what you&apos;re buying:</p>
            <p className="text-[var(--text-secondary)] font-body leading-relaxed">
              We design, build, and host your site — and you own it. We&apos;re not a marketing agency: we
              don&apos;t run your ads, outreach, or sales, and we don&apos;t promise a specific number of
              leads. Content and growth work is available as clearly scoped add-ons whenever you want it.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 8. FAQ ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">Questions.</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-2">{faq.q}</h3>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Final CTA ─── */}
      <section className="section-purple py-24 px-6">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-4">
            Stop losing customers to a better-looking competitor.
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Build your site in a couple of minutes and we&apos;ll have it live within days. Not sure which
            package fits? Book a quick call and we&apos;ll point you to the right one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#build" className="inline-flex items-center gap-2 bg-white text-[var(--text-primary)] px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Build Your Site <ArrowRight className="w-4 h-4" />
            </a>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Book a 15-min Call
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-8">
            Bigger or enterprise scope? See{' '}
            <Link href="/growth" className="underline hover:text-white transition-colors">Digital Growth Strategy</Link>.
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
