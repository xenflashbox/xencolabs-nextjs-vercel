import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

const products = [
  {
    name: 'ScoreCraft',
    label: 'SEO + AI Search Readiness diagnostics',
    status: 'Live',
    href: 'https://scorecraft.io',
    body: 'Production search-quality platform for traditional SEO, AI-search readiness, source quality, structure, and prioritized remediation.',
  },
  {
    name: 'BlogCraft',
    label: 'Managed content operating system',
    status: 'Live',
    href: 'https://blogcraft.app',
    body: 'Corpus-grounded research, briefs, drafting, rewriting, visuals, QA, publishing, and continuous optimization.',
  },
  {
    name: 'CompareITAD',
    label: 'ITAD orchestration + chain of custody',
    status: 'Live',
    href: '/compareitad',
    internal: true,
    body: 'Enterprise IT asset disposition orchestration: client intake, verified vendor selection, blind bidding, serial tracking, defensible disposition records, and resale recovery.',
  },
  {
    name: 'Image Forge',
    label: 'Multi-model image infrastructure',
    status: 'Production platform',
    href: '/contact',
    internal: true,
    body: 'The reusable image-generation API and orchestration engine behind ImageCrafter, BlogCraft, and managed visual production.',
  },
  {
    name: 'LaunchCraft',
    label: 'AI app-building platform',
    status: 'Live',
    href: 'https://launchcraft.me',
    body: 'Production platform that helps users move from app idea to structured build plan and launch workflow.',
  },
  {
    name: 'CompareITAD Agent Channel',
    label: 'Partner-sourced disposition leads',
    status: 'Live / expanding',
    href: '/compareitad',
    internal: true,
    body: 'A partner-agent channel for data-center and infrastructure professionals who introduce qualified hardware refresh and ITAD opportunities.',
  },
];

const system = [
  ['Diagnose', 'ScoreCraft identifies search, content, and AI-visibility gaps.'],
  ['Ground', 'A client knowledge corpus captures products, claims, documentation, experts, and approved external sources.'],
  ['Produce', 'BlogCraft turns the strategy into briefs, pages, articles, rewrites, and custom visual assets.'],
  ['Validate', 'Quality gates, AI Search Readiness scoring, source checks, and SME review protect quality before publishing.'],
  ['Operate', 'Xenco Labs runs the feedback loop across rankings, AI visibility, conversion, and the next work queue.'],
];

const proof = [
  {
    name: 'CompareITAD',
    href: '/compareitad',
    internal: true,
    body: 'A live ITAD orchestration service for enterprise and data-center tech refreshes: vendor eligibility, blind bidding, chain-of-custody reconciliation, disposition records, and resale recovery.',
  },
  {
    name: 'Vision Battery US',
    href: 'https://visionbattery.us',
    body: 'Demonstration build for a technical battery manufacturer: problem-first messaging, a battery selector, AI assistant, data-center pages, and a search-led content hub.',
  },
  {
    name: 'Owned Search Network',
    href: '/portfolio',
    internal: true,
    body: 'A growing portfolio of niche sites gives BlogCraft a live operating environment for keyword strategy, clusters, publishing, conversion, and content refreshes.',
  },
];

export default function Page() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-24 px-6 relative overflow-hidden section-light">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--brand-primary) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-5xl mx-auto text-center relative">
          <p className="label-text text-[var(--brand-primary)] mb-6">
            AI PRODUCTS · MANAGED GROWTH SYSTEMS · ITAD ORCHESTRATION · ENTERPRISE TECHNOLOGY
          </p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-[var(--text-primary)] mb-7 leading-[1.03]">
            We build the tools.
            <br />
            We operate the system.
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-3xl mx-auto leading-relaxed font-body">
            Xenco Labs is a principal-led AI product studio and operating partner. We build production software, run managed search and content systems, and operate real platforms in infrastructure markets — including CompareITAD, our IT asset disposition orchestration and chain-of-custody service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/managed-search-content" className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
              Managed Search &amp; Content <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/compareitad" className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center">
              Understand CompareITAD
            </Link>
          </div>
        </div>
      </section>

      <section className="section-purple py-20 px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="label-text text-[var(--accent-amber)] mb-4">THE OPERATING MODEL</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
              Software is the leverage. The operating system is the product.
            </h2>
            <p className="text-white/75 text-lg leading-relaxed">
              ScoreCraft diagnoses. BlogCraft repairs and produces. CompareITAD proves we can build and operate a real transaction/compliance workflow in an enterprise infrastructure market.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {system.map(([title, body], index) => (
              <div key={title} className="rounded-2xl border border-white/15 bg-white/[0.05] p-5">
                <p className="text-xs font-mono text-[var(--accent-amber)] mb-3">0{index + 1}</p>
                <h3 className="font-display font-bold text-xl text-white mb-2">{title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-12 items-start">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">ENTERPRISE MANAGED SEARCH &amp; CONTENT</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-5">
              Your SEO, content, and AI-visibility function — already built.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              Modern organic growth is bigger than one SEO specialist. We combine technical search, keyword intelligence, AI Search Readiness, content architecture, managed production, conversion paths, and executive reporting into one operating program.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Ahrefs + DataForSEO + Search Console',
                'Technical SEO + AEO/GEO/AI Search',
                'Knowledge corpus + buyer-intent architecture',
                'BlogCraft managed production',
                'ScoreCraft QA and remediation',
                'Principal-led reporting and strategy',
              ].map((item) => (
                <div key={item} className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-none" />
                  <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card border-[var(--brand-primary)] border-opacity-40">
            <p className="label-text text-[var(--brand-primary)] mb-3">ENTERPRISE MANAGED PROGRAM</p>
            <p className="font-display font-bold text-5xl text-[var(--text-primary)] mb-2">$20,000</p>
            <p className="text-sm font-mono text-[var(--text-tertiary)] mb-6">PER MONTH · 3-MONTH INITIAL PROGRAM</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-7">
              This is not outsourced headcount. It is a principal-led operating capability with software, research infrastructure, production capacity, QA, technical support, and measurement already in place.
            </p>
            <Link href="/services/managed-search-content" className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
              See the Full Program <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tinted py-24 px-6">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <p className="label-text text-[var(--brand-primary)] mb-4">THE PRODUCT STACK</p>
              <h2 className="section-headline text-[var(--text-primary)] mb-4">
                We do not rent the strategy from somebody else's software.
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                We build and operate the tools ourselves. Some are software products. CompareITAD is different: it is a service platform in the data-center refresh and ITAD market.
              </p>
            </div>
            <Link href="/portfolio" className="link font-semibold inline-flex items-center gap-2 flex-none">
              Full portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const inner = (
                <div className="card group flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-[var(--text-primary)]">{product.name}</h3>
                      <p className="text-sm text-[var(--text-tertiary)]">{product.label}</p>
                    </div>
                    <span className="text-xs rounded-full bg-[var(--surface-secondary)] px-3 py-1 text-[var(--text-secondary)] flex-none">{product.status}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed flex-1">{product.body}</p>
                  <span className="mt-5 text-[var(--brand-primary)] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {'internal' in product && product.internal ? 'Explore' : 'Visit'} <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              );
              return 'internal' in product && product.internal ? (
                <Link key={product.name} href={product.href} className="block h-full">{inner}</Link>
              ) : (
                <a key={product.name} href={product.href} target="_blank" rel="noopener noreferrer" className="block h-full">{inner}</a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <div>
            <p className="label-text text-[var(--brand-primary)] mb-4">COMPAREITAD STRATEGIC ADVANTAGE</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-5">
              Data centers already sit inside our market.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-7">
              TierPoint, Iron Mountain, colocation providers, managed infrastructure companies and enterprise data-center operators all touch hardware refresh cycles. CompareITAD gives Xenco Labs a real service offering for those customers: qualified ITAD vendor selection, chain-of-custody asset tracking, disposition records and value recovery.
            </p>
            <Link href="/compareitad" className="btn-secondary px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
              See the CompareITAD Model <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="card border-[var(--brand-primary)] border-opacity-40">
            <p className="label-text text-[var(--brand-primary)] mb-4">ITAD WORKFLOW</p>
            <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
              <p><strong className="text-[var(--text-primary)]">Client:</strong> pays $5,000 minimum or $12 per tracked asset.</p>
              <p><strong className="text-[var(--text-primary)]">Vendor pool:</strong> verified ITAD providers sign the agreement and bid blind.</p>
              <p><strong className="text-[var(--text-primary)]">Custody:</strong> serials reconcile from data-center pickup through BOL, facility receipt, sanitization/destruction records and disposition certificate.</p>
              <p><strong className="text-[var(--text-primary)]">Recovery:</strong> CompareITAD receives 20% of net resale economics; partner agents can earn 30% of CompareITAD economics on qualified closed leads.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light py-24 px-6">
        <div className="max-w-content mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="label-text text-[var(--brand-primary)] mb-4">PROOF OF EXECUTION</p>
            <h2 className="section-headline text-[var(--text-primary)] mb-4">
              We use the same system on real businesses and vertical platforms.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              The work is not hypothetical. These properties let us test messaging, buyer journeys, content operations, AI tooling, conversion architecture and operational workflows in production environments.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {proof.map((item) => {
              const content = (
                <div className="card h-full group">
                  <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">{item.name}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-5">{item.body}</p>
                  <span className="text-[var(--brand-primary)] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              );
              return item.internal ? (
                <Link key={item.name} href={item.href}>{content}</Link>
              ) : (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer">{content}</a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-purple py-20 px-6">
        <div className="max-w-content mx-auto grid lg:grid-cols-[1fr_0.85fr] gap-12 items-center">
          <div>
            <p className="label-text text-[var(--accent-amber)] mb-4">A NEW WAY TO BUY THE FUNCTION</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
              Hiring an SEO, GEO, or AI-search lead?
            </h2>
            <p className="text-white/75 text-lg leading-relaxed">
              Before you put technical SEO, AI citations, content strategy, CRO, analytics, and automation into one job description, send us the role. We'll show you what belongs with a person, what belongs in software, and what can be operated as a managed system.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-7">
            <p className="text-white font-display font-bold text-2xl mb-3">Search Function Review</p>
            <p className="text-white/65 text-sm leading-relaxed mb-6">
              Company URL + job description → operating-model comparison, search-footprint review, and recommended next step.
            </p>
            <Link href="/search-function-review" className="bg-white text-[#0B1F3A] px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors">
              Send Us the Role <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tinted py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-4">PRINCIPAL-LED</p>
          <h2 className="section-headline text-[var(--text-primary)] mb-5">
            Senior operators stay on the account.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-3xl mx-auto">
            Xenco Labs is led by Xenophon Giannis and Laurie Shahin, combining enterprise technology, infrastructure, sales, partnerships, channel strategy, product development, and production AI systems. Client work is not handed to a junior account team.
          </p>
          <Link href="/about" className="btn-secondary px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
            Meet the Principals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="section-purple py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Need a tool, a build, or the whole operating function?
          </h2>
          <p className="text-white/80 text-lg mb-9 leading-relaxed">
            Start with the business problem. We'll show you whether the right answer is software, an implementation sprint, CompareITAD-style platform operations, or a managed growth program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[#0B1F3A] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
              Talk to Xenco Labs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/growth" className="border border-white/30 text-white px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center hover:bg-white/10 transition-colors">
              Explore Growth Strategy
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
