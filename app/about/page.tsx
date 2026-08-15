import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Xenco Labs is a founder-led AI product studio. We build tools to solve real problems, prove them on our own businesses, then put them in everyone’s hands. Meet the founders.',
  openGraph: {
    title: 'About Xenco Labs',
    description:
      'A founder-led AI product studio. We build tools that do real work for real businesses — proven on our own before we hand them to you.',
    type: 'website',
  },
};

const principles = [
  {
    title: 'We build to solve, not to impress.',
    body: 'Every product starts with a problem we actually have. If it doesn’t do real work for a real business, it doesn’t ship.',
  },
  {
    title: 'We prove it on ourselves first.',
    body: 'Our apps run our own businesses before they run yours. You get tools that survived contact with production, not demos.',
  },
  {
    title: 'We put power in your hands.',
    body: 'The point of AI isn’t to replace people — it’s to let a small team do what used to take a big one. We build for the operator, the owner, the doer.',
  },
];

const stats = [
  { n: '20+', label: 'Years in enterprise tech' },
  { n: '10+', label: 'Production apps shipped' },
  { n: '2023', label: 'Building as Xenco Labs' },
];

const founders = [
  {
    photo: '/advisory/xenophon-giannis.webp',
    name: 'Xenophon Giannis',
    role: 'Co-Founder & CEO',
    bio: 'Two decades leading sales and engineering in enterprise technology — AboveNet, NexusGuard, and Black Lotus (acquired by Level 3), where he built a $22M+ regional infrastructure business. After twenty years building for other companies, the mission became simple: build our own products, prove them in the real world, and put the same tools in everyone’s hands.',
  },
  {
    photo: '/advisory/laurie-shahin.webp',
    name: 'Laurie Shahin',
    role: 'Co-Founder & Chief Partnerships Officer',
    bio: 'Fifteen-plus years leading data-center and channel sales — AboveNet, Telx, INAP, Evoque, QuadraNet, and ValorC3 (VP, Channel & Alliances). She owns partnerships, go-to-market, and the customer relationships that turn a good product into a business people actually rely on.',
  },
];

export default function AboutPage() {
  return (
    <MarketingLayout>
      {/* ─── 1. Hero (why we build) ─── */}
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">ABOUT XENCO LABS</p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            Most software is built to impress investors. We build ours to do the work.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto leading-relaxed">
            Xenco Labs is a founder-led AI product studio. We build tools that solve real
            problems for real businesses — proven on our own before we ever hand them to you.
            Two founders, four decades in the industry, and a simple belief: the right tools
            let a small team do what used to take an army.
          </p>
        </div>
      </section>

      {/* ─── 2. Stats (big numerals) ─── */}
      <section className="section-tinted py-16 px-6">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display font-bold text-5xl text-[var(--text-primary)] tabular-nums">{s.n}</p>
                <p className="label-text text-[var(--text-tertiary)] mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Why we build ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">WHY WE BUILD</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-12 text-center">
            The principle behind every product.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((p) => (
              <div key={p.title} className="border-l-4 border-[var(--accent-amber)] pl-6">
                <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mb-2">{p.title}</h3>
                <p className="text-[var(--text-secondary)] font-body leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. The founders ─── */}
      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <p className="label-text text-[var(--brand-primary)] mb-4 text-center">THE FOUNDERS</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-4 text-center">
            Principal-led. We do the work ourselves.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto mb-12 text-center leading-relaxed">
            We met building one of the largest independent fiber networks in the country. Today we
            build the tools we wish we’d had.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((f) => (
              <div key={f.name} className="card flex flex-col sm:flex-row gap-5 items-start">
                <Image
                  src={f.photo}
                  alt={f.name}
                  width={112}
                  height={112}
                  className="rounded-xl w-24 h-24 sm:w-28 sm:h-28 object-cover flex-shrink-0 ring-1 ring-[var(--border-default)]"
                />
                <div>
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">{f.name}</h3>
                  <p className="text-sm font-semibold text-[var(--brand-primary)] mb-3">{f.role}</p>
                  <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed">{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. What we do ─── */}
      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-headline text-[var(--text-primary)] mb-6">
              What we do with all that.
            </h2>
            <div className="space-y-5 text-lg text-[var(--text-secondary)] font-body leading-relaxed">
              <p>
                We build and run production AI apps — content engines, resume tools, image
                generation, and more — on the same stack we deploy for clients. Then we take that
                machinery and point it at other people’s problems: a small business that needs a
                <Link href="/websites" className="link font-medium"> website that actually converts</Link>,
                a mid-market company that needs a
                <Link href="/growth" className="link font-medium"> full growth system</Link>, or a
                data-center developer that needs
                <Link href="/advisory" className="link font-medium"> infrastructure feasibility answers</Link>.
              </p>
              <p>
                Different customers, one throughline: we’re operators who build. Not an agency
                reselling theory — a studio that ships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. CTA ─── */}
      <section className="section-purple py-24 px-6">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-4">
            Let’s build something that works.
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Explore the apps, get a website in days, or talk to us about your growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/websites" className="inline-flex items-center gap-2 bg-white text-[var(--text-primary)] px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Build a Website <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
