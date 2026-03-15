import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';
import Link from 'next/link';
import { Route } from 'next';

const liveProducts = [
  {
    name: 'BlogCraft',
    subtitle: 'AI Content Engine',
    description: 'End-to-end content pipeline from niche research to auto-publishing. Powers 6+ niche sites.',
    url: 'https://blogcraft.app',
    domain: 'blogcraft.app',
  },
  {
    name: 'ResumeCoach',
    subtitle: 'AI Resume Optimization',
    description: 'ATS-optimized resumes using government O*NET data. Live with paying customers.',
    url: 'https://resumecoach.me',
    domain: 'resumecoach.me',
  },
  {
    name: 'ImageCrafter',
    subtitle: 'AI Image Generation',
    description: 'Multi-provider image generation with OpenAI, Google Gemini, and Stability AI.',
    url: 'https://imagecrafter.app',
    domain: 'imagecrafter.app',
  },
  {
    name: 'Sonoma Grove Suites',
    subtitle: 'Vacation Rental Platform',
    description: 'Direct booking with Lodgify API, multi-channel distribution.',
    url: 'https://sonomagrovesuites.com',
    domain: 'sonomagrovesuites.com',
  },
];

const inDevProducts = [
  { name: 'MCP Forge', subtitle: 'API to MCP Server Builder' },
  { name: 'PromptMarketer', subtitle: '40+ Marketing AI Tools' },
  { name: 'LandingCraft', subtitle: 'AI Landing Pages' },
];

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Python',
  'PostgreSQL', 'Supabase', 'Docker', 'Tailwind CSS',
  'Stripe', 'OpenAI', 'Anthropic',
];

export default function Page() {
  return (
    <MarketingLayout>
      {/* ─── 1. Hero Section ─── */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--brand-primary) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="label-text text-[var(--brand-primary)] mb-6">
            AI PRODUCT STUDIO &bull; PLEASANTON, CA
          </p>
          <h1 className="hero-headline text-[var(--text-primary)] mb-6">
            We Build AI-Powered Products
            <br className="hidden sm:block" />
            That Ship to Production
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed font-body">
            Xenco Labs is a product studio founded on one principle:
            build real tools, test them on our own businesses, then
            offer them to everyone else. No prototypes. No demos.
            Finished products with paying customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={"#products" as Route}
              className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2"
            >
              Explore Our Apps
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={"#services" as Route}
              className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center"
            >
              Managed Services
            </Link>
          </div>
          <p className="text-sm text-[var(--text-tertiary)] font-body">
            Founded by a 20-year technology executive &bull; UCSD &bull; Building since 2023
          </p>
        </div>
      </section>

      {/* ─── 2. Product Portfolio ─── */}
      <section id="products" className="section-tinted py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-headline text-[var(--text-primary)] mb-3">
              What We&apos;ve Built
            </h2>
            <p className="text-lg text-[var(--text-secondary)] font-body">
              Live products generating revenue and serving real users.
            </p>
          </div>

          {/* Live Products — 2x2 grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            {liveProducts.map((product) => (
              <a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[var(--text-tertiary)] font-body">
                      {product.subtitle}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--status-success)]">
                    <span className="w-2 h-2 bg-[var(--status-success)] rounded-full" />
                    Live
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] font-body mb-4 flex-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-tertiary)] font-mono">
                    {product.domain}
                  </span>
                  <span className="text-[var(--brand-primary)] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Visit App <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* In Development */}
          <div className="text-center mb-6">
            <p className="label-text text-[var(--text-tertiary)]">In Development</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {inDevProducts.map((product) => (
              <div
                key={product.name}
                className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-xl p-5 opacity-70"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-semibold text-[var(--text-secondary)]">
                    {product.name}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                    <span className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full" />
                    In Dev
                  </span>
                </div>
                <p className="text-sm text-[var(--text-tertiary)] font-body">
                  {product.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Services Section ─── */}
      <section id="services" className="section-light py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-headline text-[var(--text-primary)] mb-3">
              Self-Serve or Managed. Your Choice.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Self-Serve */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-3">
                Self-Serve Apps
              </h3>
              <p className="text-[var(--text-secondary)] font-body mb-4">
                Use our tools directly. Sign up, configure, and run your own workflows.
              </p>
              <p className="text-sm font-mono font-bold text-[var(--text-primary)] mb-4">
                Starting at $29/mo
              </p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1.5 mb-6">
                <li>&bull; Solo creators</li>
                <li>&bull; Small teams</li>
                <li>&bull; Technical users who want control</li>
              </ul>
              <Link
                href={"#products" as Route}
                className="btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2"
              >
                Explore Apps <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Managed */}
            <div className="card">
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-3">
                Managed Services
              </h3>
              <p className="text-[var(--text-secondary)] font-body mb-4">
                We do the work for you. Strategic planning, execution, optimization,
                and reporting — powered by our AI tools with human oversight.
              </p>
              <p className="text-sm font-mono font-bold text-[var(--text-primary)] mb-4">
                Starting at $3,500/mo
              </p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1.5 mb-6">
                <li>&bull; Mid-market companies</li>
                <li>&bull; Agencies</li>
                <li>&bull; Teams without in-house content ops</li>
              </ul>
              <Link
                href="/contact"
                className="btn-secondary px-6 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2"
              >
                Schedule a Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Founder Section ─── */}
      <section id="founder" className="section-tinted py-20 px-6">
        <div className="max-w-narrow mx-auto">
          <h2 className="section-headline text-[var(--text-primary)] mb-8 text-center">
            Built by a Builder
          </h2>
          <div className="space-y-5 text-[var(--text-secondary)] font-body text-lg leading-relaxed">
            <p>
              Xenco Labs was founded by a technology executive with 20+ years
              in enterprise tech — leading sales and engineering teams at
              companies like AboveNet, NexusGuard, and Black Lotus (acquired
              by Level 3). After two decades of building for other companies,
              the mission became clear: build your own.
            </p>
            <p>
              Since 2023, Xenco Labs has designed, built, and launched 10+
              production web applications. Every product in our portfolio is
              built with the same stack we use daily — Next.js, React,
              TypeScript, Node.js, Python, PostgreSQL, Supabase, Docker — and
              runs on our own infrastructure.
            </p>
            <blockquote className="border-l-4 border-[var(--brand-primary)] pl-6 py-2 my-8 text-[var(--text-primary)] font-display font-semibold text-xl italic">
              &ldquo;We don&apos;t build prototypes. We don&apos;t ship demos.
              We build production AI applications with paying customers.&rdquo;
            </blockquote>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="https://www.upwork.com/freelancers/~01fd29e6c782080051"
              target="_blank"
              rel="noopener noreferrer"
              className="link font-medium inline-flex items-center gap-1.5 text-sm"
            >
              View our work on Upwork <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/xenflashbox"
              target="_blank"
              rel="noopener noreferrer"
              className="link font-medium inline-flex items-center gap-1.5 text-sm"
            >
              View on GitHub <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── 5. Tech Stack Strip ─── */}
      <section className="section-light py-12 px-6">
        <div className="max-w-content mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-mono text-[var(--text-tertiary)] tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. CTA Section ─── */}
      <section className="section-purple py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-white/80 text-lg font-body mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you need a self-serve AI tool or a fully managed
            service, we have the platform and the team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={"#products" as Route}
              className="bg-white text-[var(--brand-primary-900)] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
            >
              Explore Our Apps <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
