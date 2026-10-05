import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'Portfolio | Xenco Labs',
  description:
    'Production AI products, owned search properties, enterprise platforms, ecommerce builds, and operational websites built and operated by Xenco Labs.',
};

type PortfolioItem = {
  name: string;
  category: string;
  status: string;
  href?: string;
  description: string;
  proof: string;
};

const products: PortfolioItem[] = [
  {
    name: 'ScoreCraft',
    category: 'SEO / GEO platform',
    status: 'Live',
    href: 'https://scorecraft.io',
    description: 'Production scoring and diagnostic platform for traditional SEO, AI-search readiness, content structure, source quality, and prioritized remediation.',
    proof: 'The diagnostic and QA layer behind Xenco Labs managed search and content programs.',
  },
  {
    name: 'BlogCraft',
    category: 'Content operating system',
    status: 'Live',
    href: 'https://blogcraft.app',
    description: 'Corpus-grounded content engine covering research, briefs, drafting, rewrites, scoring, imagery, validation, publishing, and refresh workflows.',
    proof: 'The production layer behind the Xenco Labs owned search network and managed client content.',
  },
  {
    name: 'ImageCrafter',
    category: 'Consumer AI image product',
    status: 'Live',
    href: 'https://imagecrafter.app',
    description: 'Fully functional customer-facing image application for family, pet, and personal creative generation.',
    proof: 'A live frontend built on the same image-generation infrastructure used throughout the Xenco Labs platform.',
  },
  {
    name: 'Image Forge',
    category: 'Image infrastructure',
    status: 'Production platform',
    description: 'The underlying multi-model image API and orchestration engine used by ImageCrafter, BlogCraft, and managed content workflows.',
    proof: 'Lets Xenco Labs route different creative jobs through the right image model and reuse the engine across products.',
  },
  {
    name: 'LaunchCraft',
    category: 'AI app-building platform',
    status: 'Live',
    href: 'https://launchcraft.me',
    description: 'Production platform for turning an application idea into a build plan, development workflow, and launch path.',
    proof: 'Demonstrates the product-studio side of Xenco Labs beyond marketing automation.',
  },
  {
    name: 'RexResume',
    category: 'Consumer SaaS',
    status: 'Live',
    href: 'https://rexresume.com',
    description: 'AI resume optimization product with ATS workflows, payments, automated customer journeys, and organic acquisition.',
    proof: 'A commercial production application operating independently inside the Xenco Labs portfolio.',
  },
  {
    name: 'MCP Forge',
    category: 'MCP directory',
    status: 'Live directory',
    href: 'https://mcpforge.org',
    description: 'Live MCP discovery directory supporting integrations, custom agents, and the broader Xenco Labs automation ecosystem.',
    proof: 'The directory is live today and continues to be improved as the MCP ecosystem evolves.',
  },
];

const enterpriseBuilds: PortfolioItem[] = [
  {
    name: 'CompareITAD',
    category: 'Data-center ITAD platform',
    status: 'Live',
    href: 'https://compareitad.com',
    description: 'Launched ITAD comparison and lead platform for vendor validation, chain of custody, disposition records, secondary-market recovery, and data-center refresh strategy.',
    proof: 'Already signing up agents and generating leads in a market directly adjacent to the Xenco Labs infrastructure network.',
  },
  {
    name: 'Vision Battery US',
    category: 'Technical-market growth system',
    status: 'Live demonstration',
    href: 'https://visionbattery.us',
    description: 'Problem-first U.S. market experience with data-center pages, a battery selector, AI assistant, search-led content clusters, and conversion architecture.',
    proof: 'Shows how Xenco Labs translates complex technical products into buyer-intent journeys rather than a brochure site.',
  },
  {
    name: 'Sonoma Grove Suites',
    category: 'Vacation rental platform',
    status: 'Live',
    href: 'https://sonomagrovesuites.com',
    description: 'Operational direct-booking property with a custom MCP server connecting the site to Lodgify and the underlying rental workflow.',
    proof: 'Demonstrates custom MCP integration against a real operating business rather than a prototype.',
  },
  {
    name: 'Basement Wines',
    category: 'Wine ecommerce',
    status: 'Live',
    href: 'https://basementwines.net',
    description: 'Full wine-shopping experience with product catalog, commerce engine, winery storytelling, and an SEO/content strategy.',
    proof: 'A production ecommerce build combining transaction infrastructure with owned content and search strategy.',
  },
];

const searchNetwork: PortfolioItem[] = [
  {
    name: 'Wine Country Corner',
    category: 'Wine commerce + editorial',
    status: 'Built',
    href: 'https://winecountrycorner.com',
    description: 'Owned wine content and commerce property supporting product launches, editorial strategy, ecommerce, and search acquisition.',
    proof: 'A live test bed for BlogCraft publishing, product content, internal linking, and conversion.',
  },
  {
    name: 'European Wholesale Parts',
    category: 'Automotive content + commerce',
    status: 'Built',
    href: 'https://europeanwholesaleparts.com',
    description: 'European automotive parts property combining product pages, affiliate relationships, hands-on testing, and research-led publishing.',
    proof: 'Used to test commercial-intent keyword strategy, product content, and pillar/spoke architecture.',
  },
  {
    name: 'Find a Vibrator',
    category: 'Search-led affiliate property',
    status: 'Built',
    href: 'https://findavibrator.com',
    description: 'Owned niche site for search-led product discovery, editorial workflows, structured comparison content, and affiliate conversion.',
    proof: 'A deliberately distinct niche used to test the repeatability of the same content and SEO operating system.',
  },
  {
    name: 'Home Beauty Spa',
    category: 'Beauty content network',
    status: 'Built',
    href: 'https://homebeautyspa.com',
    description: 'Owned beauty and self-care property built around topical clusters, editorial content, structured publishing, and organic discovery.',
    proof: 'Part of the live BlogCraft / ScoreCraft operating network.',
  },
  {
    name: 'Diabetes Compass',
    category: 'Health information property',
    status: 'Built',
    href: 'https://diabetescompass.com',
    description: 'Health-information property structured around pain points, topic taxonomy, educational content, and search-led landing experiences.',
    proof: 'A higher-editorial-standard environment for testing content structure, authority, imagery, authorship, and QA.',
  },
  {
    name: 'Get a Boyfriend',
    category: 'Relationship content property',
    status: 'Built / expanding',
    href: 'https://getaboyfriend.net',
    description: 'Pain-point-led relationship property with a search corpus, topic clusters, owned-service concepts, and structured editorial operations.',
    proof: 'Demonstrates corpus-first content planning across an entirely different consumer niche.',
  },
  {
    name: 'Fight My Bank',
    category: 'Consumer finance',
    status: 'Built / launching',
    href: 'https://fightmybank.com',
    description: 'Consumer banking problem-resolution property designed around high-intent questions, community discovery, and lead capture.',
    proof: 'Extends the search operating system into financial problem-solving content.',
  },
  {
    name: 'License4',
    category: 'Licensing / compliance',
    status: 'Built / launching',
    href: 'https://license4.com',
    description: 'Search-led licensing and compliance property designed around practical user questions and structured answer content.',
    proof: 'Part of the next wave of the owned search network.',
  },
  {
    name: 'Plan Ahead Daily',
    category: 'Financial advisory content',
    status: 'Built / launching',
    description: 'Financial advisory and planning content property built as part of the next wave of the Xenco Labs search network.',
    proof: 'Adds another high-consideration content category to the operating test bed.',
  },
  {
    name: 'Fiber Insider',
    category: 'Telecom infrastructure content',
    status: 'Built · rebuild planned',
    href: 'https://fiberinsider.com',
    description: 'Telecom and fiber-industry content property with an existing search footprint and a planned rebuild on the current Xenco Labs content stack.',
    proof: 'Connects the owned search network directly to the founders’ enterprise network-infrastructure domain expertise.',
  },
];

const groups = [
  {
    title: 'AI Products & Infrastructure',
    body: 'Production software Xenco Labs builds, operates, and reuses across the rest of the portfolio.',
    items: products,
  },
  {
    title: 'Enterprise & Operational Builds',
    body: 'Live platforms and operating businesses that demonstrate custom integrations, complex buyer journeys, commerce, and technical-market execution.',
    items: enterpriseBuilds,
  },
  {
    title: 'Owned Search Network',
    body: 'A cross-industry portfolio used to test keyword strategy, topical authority, content production, SEO/GEO QA, refreshes, internal linking, and conversion in real environments.',
    items: searchNetwork,
  },
];

function ItemCard({ item }: { item: PortfolioItem }) {
  const inner = (
    <div className="card h-full flex flex-col group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-xs font-mono text-[var(--brand-primary)] uppercase tracking-wide mb-1">{item.category}</p>
          <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">{item.name}</h3>
        </div>
        <span className="text-xs rounded-full bg-[var(--surface-secondary)] px-3 py-1 text-[var(--text-secondary)] flex-none">{item.status}</span>
      </div>
      <p className="text-[var(--text-secondary)] font-body leading-relaxed mb-5 flex-1">{item.description}</p>
      <p className="text-sm text-[var(--text-tertiary)] font-body border-t border-[var(--border-subtle)] pt-4">{item.proof}</p>
      {item.href && (
        <span className="mt-5 text-[var(--brand-primary)] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
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
            The portfolio is where we prove the operating system.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-3xl mx-auto mb-10 leading-relaxed">
            Production AI products, enterprise platforms, ecommerce builds, custom MCP integrations,
            and an owned search network across very different industries. We use the same machinery
            we sell to clients on businesses we operate ourselves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/managed-search-content" className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">
              See Managed Search &amp; Content <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/growth" className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center">
              Explore Growth Strategy
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
              {group.items.map((item) => <ItemCard key={item.name} item={item} />)}
            </div>
          </div>
        </section>
      ))}

      <section className="section-purple py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            We build the tools. Then we use them.
          </h2>
          <p className="text-white/80 font-body mb-8 leading-relaxed">
            ScoreCraft diagnoses. BlogCraft operates content. Image Forge supplies the visual
            engine. Our agents, integrations, and principal-led strategy connect the system.
          </p>
          <Link href="/services" className="bg-white text-[#0B1F3A] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors">
            See Xenco Labs Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
