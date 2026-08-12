import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { CALENDLY_URL } from '../advisory/config';

export const metadata: Metadata = {
  title: 'Websites & Landing Pages',
  description:
    'Xenco Labs builds fast, modern websites and landing pages in days — then hosts and maintains them. Fixed-price packages, an add-on menu, and hosting from $50/month. Agency quality without the agency timeline or price.',
  openGraph: {
    title: 'Websites & Landing Pages | Xenco Labs',
    description:
      'Fast, modern websites and landing pages — built in days, hosted by us. Fixed-price packages from $900. Agency quality without the agency price or wait.',
    type: 'website',
  },
};

// ── Value differentiators ──
const whyItems = [
  {
    title: 'Live in days, not months.',
    body: 'We produce with our own AI stack — imagery, copy, layout — so a landing page ships in days and a full site in a couple of weeks. Not the six-to-twelve-week agency wait.',
  },
  {
    title: 'You own it. We host it.',
    body: "It's your site, your domain, your code — not rented space on a page builder you can never leave. We keep it fast, secure, and online for a flat monthly fee.",
  },
  {
    title: 'Agency quality, boutique price.',
    body: 'The same conversion-focused, mobile-first, SEO-ready build an agency charges $5,000–$30,000 for — at a fraction of the cost, because we move fast and cut no corners.',
  },
  {
    title: 'Built by people who ship.',
    body: 'We run our own production apps — BlogCraft, ResumeCoach, WineCountryCorner — on the same pipeline we build yours with. This is not a template farm.',
  },
];

// ── Every build includes ──
const included = [
  'Mobile-responsive, fast-loading design',
  'On-page SEO setup (titles, meta, structure)',
  'AI-generated imagery tailored to your brand',
  'Copy polish on every page',
  'Contact form with email notifications',
  'One revision round',
  'Analytics wired and verified',
  'Launch + ready to host with us',
];

// ── Build packages ──
const packages = [
  {
    name: 'Landing Page',
    price: '$900',
    highlight: false,
    forWho: 'One focused page built to convert — a campaign, a product, an offer.',
    features: [
      '1 conversion-focused page',
      'Hero, offer, proof, and CTA sections',
      'Lead capture form',
      'Everything in “every build includes”',
    ],
  },
  {
    name: 'Starter Site',
    price: '$1,500',
    highlight: true,
    forWho: 'The essential presence for a business getting online properly.',
    features: [
      '3 pages (e.g. Home, About, Contact)',
      'Service or product section',
      'Lead capture + map / hours',
      'Everything in “every build includes”',
    ],
  },
  {
    name: 'Business Site',
    price: '$2,500',
    highlight: false,
    forWho: 'A complete site for an established business with more to say.',
    features: [
      '5 pages, structured for your buyers',
      'Services, gallery, or catalog section',
      'Lead capture with intent fields',
      'Everything in “every build includes”',
    ],
  },
  {
    name: 'Facelift / Remodel',
    price: '$1,500',
    highlight: false,
    forWho: 'A modern restyle of the site you already have — same content, far better.',
    features: [
      'Restyle up to 5 existing pages',
      'Mobile + speed overhaul',
      'Refreshed imagery and layout',
      'Everything in “every build includes”',
    ],
  },
];

// ── Comparison ──
const compareRows = [
  { label: 'Typical cost', diy: '$150–$1,200/yr', freelancer: '$1,500–$8,000', agency: '$5,000–$30,000', xenco: '$900–$2,500' },
  { label: 'Timeline', diy: 'Your nights & weekends', freelancer: 'Weeks — if they show', agency: '6–12 weeks', xenco: 'Days' },
  { label: 'Look & feel', diy: 'Looks DIY', freelancer: 'Inconsistent', agency: 'Polished', xenco: 'Polished' },
  { label: 'Who hosts & maintains it', diy: 'You', freelancer: 'Usually no one', agency: '+$500–$3,000/mo', xenco: 'Us — from $50/mo' },
];

// ── Hosting & care ──
const carePlans = [
  {
    name: 'Hosting',
    price: '$50',
    unit: '/month',
    forWho: 'Keep your site live, fast, and secure.',
    features: [
      'Managed hosting + SSL',
      'Uptime monitoring',
      'Domain connection',
      'A couple of small edits each month',
    ],
    cta: 'Included with every build',
  },
  {
    name: 'Care+',
    price: '$150',
    unit: '/month',
    forWho: 'Hosting plus a little momentum every month.',
    features: [
      'Everything in Hosting',
      'One blog post or content update / month',
      'Monthly image or section refresh',
      'Priority edits',
    ],
    cta: 'Optional upgrade',
  },
];

// ── Add-on menu ──
const addOns = [
  { name: 'Extra page', price: '$250' },
  { name: 'AI chatbot (trained on your site)', price: '$750 + $50/mo' },
  { name: 'Interactive form → your CRM', price: '$350' },
  { name: 'Blog setup (BlogCraft)', price: '$500' },
  { name: 'AI imagery pack', price: '$300' },
  { name: 'Copywriting (per page)', price: '$150' },
  { name: 'Domain + business email setup', price: '$150' },
];

// ── FAQ ──
const faqs = [
  {
    q: 'How fast is “days”?',
    a: 'A landing page is typically live within 3–5 business days of us having your content. A full site runs about 1–2 weeks. We move fast because we produce with our own AI stack — but every build gets a human review before it launches.',
  },
  {
    q: 'Do I own the site?',
    a: 'Completely. It’s your domain, your content, and your site. Hosting with us keeps it running and maintained, but you’re never locked in — you can take it with you.',
  },
  {
    q: 'What’s not included?',
    a: 'We build and host your site — we’re not a marketing agency. We don’t run your ads, outreach, or sales, and we don’t promise a specific number of leads. Content and growth work is available as scoped add-ons.',
  },
  {
    q: 'Can you host a site you didn’t build?',
    a: 'Often, yes. Book a quick call and we’ll tell you whether we can take over hosting and maintenance for your existing site.',
  },
];

export default function WebsitesPage() {
  return (
    <MarketingLayout>
      {/* ─── 1. Hero ─── */}
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">
            WEBSITES &amp; LANDING PAGES BY XENCO LABS
          </p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            A website you&apos;re proud of — built in days, hosted by us.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Fast, modern, mobile-ready websites and landing pages at a fixed
            price — then we keep them online, secure, and up to date. Agency
            quality, without the agency timeline or the agency invoice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#packages"
              className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              See Packages &amp; Pricing
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              Book a 15-min Call
            </a>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] font-body mt-6 max-w-lg mx-auto">
            Fixed prices. Clear scope. You own the site — we host and maintain it.
          </p>
        </div>
      </section>

      {/* ─── 2. Why Xenco (value) ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            WHY XENCO LABS
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            The quality of an agency. The speed of a studio that builds with AI.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

      {/* ─── 3. Comparison (justify premium) ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            HOW WE COMPARE
          </p>
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
          <p className="text-xs text-[var(--text-tertiary)] font-body mt-4 text-center">
            Ranges reflect typical 2026 US market pricing for comparable work.
          </p>
        </div>
      </section>

      {/* ─── 4. Packages ─── */}
      <section id="packages" className="section-tinted py-24 px-6 scroll-mt-20">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            PACKAGES &amp; PRICING
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Fixed prices. No surprises.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`card flex flex-col ${pkg.highlight ? 'relative border-t-2 border-t-[var(--brand-primary)]' : ''}`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-4 bg-[var(--cta-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-2 mt-2">
                  {pkg.name}
                </p>
                <p className="font-display font-bold text-3xl text-[var(--text-primary)] mb-1">
                  {pkg.price}
                </p>
                <p className="text-xs text-[var(--text-tertiary)] font-body mb-4">
                  one-time · + hosting
                </p>
                <p className="text-sm text-[var(--text-secondary)] font-body mb-5">
                  {pkg.forWho}
                </p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] font-body">
                      <Check className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pkg.highlight ? 'btn-primary' : 'btn-secondary'} px-4 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 mt-auto`}
                >
                  Start Your Project <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--text-tertiary)] font-body mt-8">
            Bigger or more complex? We also do full custom builds and ongoing
            content programs — see{' '}
            <Link href="/growth" className="link font-medium">
              Digital Growth Strategy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ─── 5. Every build includes ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            THE FINE PRINT, UP FRONT
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-4 text-center">
            Every build includes all of this.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-12 text-center leading-relaxed">
            Not a stripped-down starting point with everything as an upsell. This
            is the standard on every package.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3 text-[var(--text-secondary)] font-body">
                <Check className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Hosting & Care ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            HOSTING &amp; CARE
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-4 text-center">
            We keep it online, so you don&apos;t have to think about it.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-12 text-center leading-relaxed">
            Every build is hosted with us — that&apos;s what keeps your site fast,
            secure, and handled.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
            {carePlans.map((plan) => (
              <div key={plan.name} className="card flex flex-col">
                <p className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-wide mb-3">
                  {plan.name}
                </p>
                <p className="font-display font-bold text-3xl text-[var(--text-primary)]">
                  {plan.price}
                  <span className="text-lg font-medium text-[var(--text-tertiary)]">{plan.unit}</span>
                </p>
                <p className="text-sm text-[var(--text-secondary)] font-body mt-2 mb-5">
                  {plan.forWho}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)] font-body">
                      <Check className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[var(--text-tertiary)] font-body mt-auto uppercase tracking-wide">
                  {plan.cta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Add-on menu ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">
            ADD-ONS
          </p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            Bolt on more when you need it.
          </h2>
          <div className="max-w-2xl mx-auto divide-y divide-[var(--border-default)] border border-[var(--border-default)] rounded-xl overflow-hidden">
            {addOns.map((add) => (
              <div key={add.name} className="flex items-center justify-between gap-4 px-6 py-4 bg-[var(--surface-primary)]">
                <span className="text-[var(--text-primary)] font-body">{add.name}</span>
                <span className="font-display font-semibold text-[var(--text-primary)] whitespace-nowrap">{add.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. Scope statement ─── */}
      <section className="section-light pb-24 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mx-auto border-l-4 border-[var(--brand-primary)] bg-[var(--surface-secondary)] p-6 rounded-r-lg">
            <p className="font-display font-semibold text-[var(--text-primary)] mb-2">
              Clear about what you&apos;re buying:
            </p>
            <p className="text-[var(--text-secondary)] font-body leading-relaxed">
              We design, build, and host your site — and you own it. We&apos;re not
              a marketing agency: we don&apos;t run your ads, outreach, or sales,
              and we don&apos;t promise a specific number of leads. Content and
              growth work is available as clearly scoped add-ons whenever you want
              it.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 9. FAQ ─── */}
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

      {/* ─── 10. CTA ─── */}
      <section id="start" className="section-purple py-24 px-6 scroll-mt-20">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-4">
            Let&apos;s build your site.
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Book a 15-minute call. We&apos;ll pick the right package, confirm the
            scope and price, and get your build on the calendar — usually live
            within days.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[var(--text-primary)] px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Your 15-min Call <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-gray-400 text-sm mt-8">
            Or email us directly:{' '}
            <a href="mailto:xen@xencolabs.com" className="underline hover:text-white transition-colors">
              xen@xencolabs.com
            </a>
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
