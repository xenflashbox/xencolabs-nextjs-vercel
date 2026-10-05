import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Route } from 'next';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'Portfolio | Xenco Labs',
  description:
    'Production apps, managed content properties, enterprise demos, and industry platforms built and operated by Xenco Labs.',
};

type PortfolioItem = {
  name: string;
  category: string;
  status: string;
  href?: string;
  description: string;
  proof: string;
};

const aiProducts: PortfolioItem[] = [
  {
    name: 'ScoreCraft',
    category: 'SEO/GEO diagnostic platform',
    status: 'Live',
    href: 'https://scorecraft.io',
    description: 'Scores pages for traditional SEO and AI-search readiness, then identifies remediation opportunities that can feed directly into BlogCraft.',
    proof: 'Turns page audits into qualified rewrite, content-strategy, and managed-service leads.',
  },
  {
    name: 'BlogCraft',
    category: 'Managed content operating system',
    status: 'Live / Managed service',
    href: 'https://blogcraft.app',
    description: 'Corpus-grounded content engine for research, outlines, SEO/GEO scoring, rewriting, visual production, validation, and publishing.',
    proof: 'Powers owned niche sites and forms the production layer for enterprise managed search programs.',
  },
  {
    name: 'ImageCrafter',
    category: 'AI image generation',
    status: 'Launch-ready',
    href: 'https://imagecrafter.app',
    description: 'Multi-provider image generation and creative workflow for article visuals, campaign assets, infographics, and brand content.',
    proof: 'Supports customized, section-specific visuals instead of generic blog-card art.',
  },
  {
    name: 'LaunchCraft',
    category: 'Launch and growth workflows',
    status: 'In market',
    description: 'Launch support for campaigns, landing pages, positioning assets, and marketing operations tied to Xenco Labs growth engagements.',
    proof: 'Connects product launches to content, conversion, and outbound motion.',
  },
  {
    name: 'RexResume',
    category: 'AI resume optimization',
    status: 'Live',
    href: 'https://rexresume.com',
    description: 'AI-assisted resume improvement, ATS optimization, and job-search product built from the ResumeCoach relaunch.',
    proof: 'Live commercial app with payment gating and organic acquisition motion.',
  },
  {
    name: 'MCP Forge',
    category: 'Developer infrastructure',
    status: 'In development',
    description: 'Directory and tooling for MCP servers, integrations, and AI workflow infrastructure.',
    proof: 'Supports the custom-agent and integration layer behind Xenco Labs services.',
  },
  {
    name: 'LedgerCraft',
    category: 'Finance automation',
    status: 'In development',
    description: 'Bookkeeping and reconciliation product designed around QuickBooks, Plaid, and local-file matching workflows.',
    proof: 'Expands Xenco Labs into operational AI for finance and small-business administration.',
  },
];

const enterpriseBuilds: PortfolioItem[] = [
  {
    name: 'Vision Battery US',
    category: 'Technical-market repositioning',
    status: 'Live demo',
    href: 'https://visionbattery.us',
    description: 'Rebuilt a translated Chinese battery-manufacturer presence into a U.S.-market site with problem-first messaging, data-center pages, workload calculator, chatbot, and content hub.',
    proof: 'Demonstrates how Xenco Labs converts complex technical products into buyer-intent architecture and interactive conversion tools.',
  },
  {
    name: 'NexusGuard growth demo',
    category: 'B2B growth strategy',
    status: 'Private strategy demo',
    description: 'Created before/after messaging, form, blog, and conversion-path concepts for an enterprise security provider.',
    proof: 'Shows the proof-before-proposal strategy behind the Growth offering.',
  },
];

const contentNetwork: PortfolioItem[] = [
  {
    name: 'European Wholesale Parts',
    category: 'Automotive content and commerce',
    status: 'Live',
    description: 'Owned content and affiliate-commerce property for European automotive parts, product pages, and research-led publishing.',
    proof: 'A BlogCraft-operated property for niche SEO, commerce, and content-cluster development.',
  },
  {
    name: 'Wine Country Corner',
    category: 'Wine commerce and content',
    status: 'Live',
    description: 'Wine and merchandise property supporting content, ecommerce, winery storytelling, and product launches.',
    proof: 'Combines owned commerce, editorial content, and operational learning for managed-content clients.',
  },
  {
    name: 'Get a Boyfriend',
    category: 'Relationship niche strategy',
    status: 'In build',
    href: 'https://getaboyfriend.net',
    description: 'Relationship-content property structured around pain points, owned products, coaching concepts, and search clusters.',
    proof: 'Shows how BlogCraft builds from corpus to clusters to landing pages.',
  },
  {
    name: 'Find a Vibrator',
    category: 'Search-driven commerce content',
    status: 'Live portfolio property',
    description: 'Owned niche property used to test content architecture, search-led product discovery, editorial workflows, and affiliate conversion paths.',
    proof: 'Part of the BlogCraft-operated content network and a live environment for content operations.',
  },
  {
    name: 'License4.com',
    category: 'Compliance and licensing content',
    status: 'Portfolio property',
    description: 'Niche content asset for licensing-related search opportunities.',
    proof: 'Part of the owned SEO content network.',
  },
  {
    name: 'FightMyBank.com',
    category: 'Consumer finance content',
    status: 'Portfolio property',
    description: 'Search-driven content property focused on consumer banking problems and resolution paths.',
    proof: 'Part of the owned SEO content network.',
  },
  {
    name: 'TestosteroneBoost.com',
    category: 'Health/wellness content',
    status: 'Portfolio property',
    description: 'Niche content property for search strategy, affiliate opportunities, and editorial testing.',
    proof: 'Part of the owned SEO content network.',
  },
];

const industryPlatforms: PortfolioItem[] = [
  {
    name: 'CompareITAD',
    category: 'Data-center ITAD platform',
    status: 'In build / channel development',
    description: 'Platform for IT asset disposition strategy, vendor validation, chain of custody, disposition records, secondary-market resale, and GPU refresh/buyback strategy.',
    proof: 'Directly aligned to the data-center ecosystem and the compliance needs of enterprise infrastructure buyers.',
  },
];

const groups = [
  { title: 'AI Products', body: 'Software and platforms we build, operate, and use inside client delivery.', items: aiProducts },
  { title: 'Enterprise Builds', body: 'Proof-of-execution projects, demos, and conversion systems for technical markets.', items: enterpriseBuilds },
  { title: 'Owned Content Network', body: 'Search-driven properties used to operate and improve the BlogCraft content system.', items: contentNetwork },
  { title: 'Industry Platforms', body: 'Vertical platforms where Xenco Labs combines domain expertise with software and channel strategy.', items: industryPlatforms },
];

function ItemCard({ item }: { item: PortfolioItem }) {
  const inner = (
    <div className="card h-full flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-xs font-mono text-[var(--brand-primary)] uppercase tracking-wide mb-1">{item.category}</p>
          <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">{item.name}</h3>
        </div>
        <span className="text-xs rounded-full bg-[var(--surface-secondary)] px-3 py-1 text-[var(--text-secondary)] flex-none">{item.status}</span>
      </div>
      <p className="text-[var(--text-secondary)] font-body leading-relaxed mb-4 flex-1">{item.description}</p>
      <p className="text-sm text-[var(--text-tertiary)] font-body border-t border-[var(--border-subtle)] pt-4">{item.proof}</p>
      {item.href && (
        <span className="mt-4 text-[var(--brand-primary)] font-medium text-sm inline-flex items-center gap-1">
          Visit <ExternalLink className="w-3.5 h-3.5" />
        </span>
      )}
    </div>
  );

  if (!item.href) return inner;
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {inner}
    </a>
  );
}

export default function PortfolioPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">PORTFOLIO</p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
            We build the products, then use them to operate real businesses.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-3xl mx-auto mb-10 leading-relaxed">
            Xenco Labs is not a slide-deck agency. Our portfolio includes production AI apps,
            owned content properties, enterprise demo builds, and data-center industry platforms.
            The same software and operating methods used here become the delivery stack for client work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/managed-search-content" className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
              See Managed Search <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {groups.map((group, index) => (
        <section key={group.title} className={`${index % 2 === 0 ? 'section-tinted' : 'section-light'} py-20 px-6`}>
          <div className="max-w-content mx-auto">
            <div className="max-w-3xl mb-10">
              <p className="label-text text-[var(--brand-primary)] mb-4">{group.title}</p>
              <h2 className="section-headline text-[var(--text-primary)] mb-4">{group.title}</h2>
              <p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed">{group.body}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => (
                <ItemCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-purple py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            The portfolio is the proof.
          </h2>
          <p className="text-white/80 font-body mb-8 leading-relaxed">
            We sell the same operating systems we use: ScoreCraft for diagnosis,
            BlogCraft for content operations, ImageCrafter for creative production,
            and Xenco Labs for strategy and execution.
          </p>
          <Link href="/growth" className="bg-white text-[#0B1F3A] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors">
            Explore Growth Strategy <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
