import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/marketing-layout';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Production AI products, ITAD orchestration, owned search properties, enterprise platforms, ecommerce builds and operational websites built and operated by Xenco Labs.',
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
  { name: 'ScoreCraft', category: 'SEO / AI Search Readiness platform', status: 'Live', href: 'https://scorecraft.io', description: 'Production diagnostic platform for SEO, AI-search readiness, source quality and prioritized remediation.', proof: 'The diagnostic and QA layer behind Xenco Labs managed search and content programs.' },
  { name: 'BlogCraft', category: 'Content operating system', status: 'Live', href: 'https://blogcraft.app', description: 'Corpus-grounded content engine for research, briefs, drafts, rewrites, scoring, imagery, validation, publishing and refresh workflows.', proof: 'The production layer behind the Xenco Labs owned search network and managed client content.' },
  { name: 'ImageCrafter', category: 'Consumer AI image product', status: 'Live', href: 'https://imagecrafter.app', description: 'Customer-facing AI image product for family, pet and personal creative generation.', proof: 'A live frontend built on the same image-generation infrastructure used across the Xenco Labs platform.' },
  { name: 'LaunchCraft', category: 'AI app-building platform', status: 'Live', href: 'https://launchcraft.me', description: 'Production platform for turning an application idea into a build plan and launch workflow.', proof: 'Demonstrates the product-studio side of Xenco Labs beyond marketing automation.' },
  { name: 'MCP Forge', category: 'MCP directory', status: 'Live directory', href: 'https://mcpforge.org', description: 'Live MCP discovery directory supporting integrations, custom agents and the broader automation ecosystem.', proof: 'The directory is live and continues to be improved as the MCP ecosystem evolves.' },
  { name: 'RexResume', category: 'Consumer SaaS', status: 'Live', href: 'https://rexresume.com', description: 'AI resume optimization product with ATS workflows, payments and organic acquisition.', proof: 'A commercial production application operating independently inside the Xenco Labs portfolio.' },
];

const enterpriseBuilds: PortfolioItem[] = [
  { name: 'CompareITAD', category: 'ITAD orchestration + chain of custody', status: 'Live', href: '/compareitad', description: 'Independent IT asset disposition orchestration service for enterprise tech refreshes: client intake, verified vendor eligibility, blind bidding, serial-level chain-of-custody tracking, disposition records and resale/value recovery.', proof: 'Data-center and enterprise clients engage CompareITAD directly. Verified ITAD vendors compete under CompareITAD guardrails while CompareITAD reconciles asset serials and documentation from pickup through sanitization or destruction before assets are cleared for resale.' },
  { name: 'Vision Battery US', category: 'Technical-market growth system', status: 'Live demonstration', href: 'https://visionbattery.us', description: 'Problem-first U.S. market experience with data-center pages, a battery selector, AI assistant, search-led content clusters and conversion architecture.', proof: 'Shows how Xenco Labs translates complex technical products into buyer-intent journeys rather than a brochure site.' },
  { name: 'Sonoma Grove Suites', category: 'Vacation rental platform', status: 'Live', href: 'https://sonomagrovesuites.com', description: 'Operational direct-booking property with a custom MCP server connected to Lodgify and the rental workflow.', proof: 'Demonstrates custom MCP integration against a real operating business rather than a prototype.' },
  { name: 'Sonoma Wash Co.', category: 'Local service business operating system', status: 'Live', href: '/portfolio/sonoma-wash-co', description: 'A complete owner-operator service-business stack: local acquisition, instant estimates, AI phone intake, scheduling, e-sign, field workflow, documentation, invoicing, payments and nurture.', proof: 'The live reference implementation behind Xenco Labs Local Service Business OS — built from brand and website through the connected digital back office.' },
  { name: 'Basement Wines', category: 'Wine ecommerce', status: 'Live', href: 'https://basementwines.net', description: 'Full wine-shopping experience with catalog, commerce engine, winery storytelling and SEO/content strategy.', proof: 'A production ecommerce build combining transaction infrastructure with owned content and search strategy.' },
];

const searchNetwork: PortfolioItem[] = [
  { name: 'Wine Country Corner', category: 'Wine commerce + editorial', status: 'Built', href: 'https://winecountrycorner.com', description: 'Owned wine content and commerce property supporting product launches, editorial strategy, ecommerce and search acquisition.', proof: 'A live test bed for BlogCraft publishing, product content, internal linking and conversion.' },
  { name: 'European Wholesale Parts', category: 'Automotive content + commerce', status: 'Built', href: 'https://europeanwholesaleparts.com', description: 'European automotive parts property combining product pages, affiliate relationships, hands-on testing and research-led publishing.', proof: 'Used to test commercial-intent keyword strategy, product content and pillar/spoke architecture.' },
  { name: 'Home Beauty Spa', category: 'Beauty content network', status: 'Built', href: 'https://homebeautyspa.com', description: 'Owned beauty and self-care property built around topical clusters, editorial content and organic discovery.', proof: 'Part of the live BlogCraft / ScoreCraft operating network.' },
  { name: 'Diabetes Compass', category: 'Health information property', status: 'Built', href: 'https://diabetescompass.com', description: 'Health-information property structured around pain points, topic taxonomy, educational content and search-led landing experiences.', proof: 'A higher-editorial-standard environment for testing content structure, authority, imagery, authorship and QA.' },
  { name: 'Fiber Insider', category: 'Telecom infrastructure content', status: 'Built · rebuild planned', href: 'https://fiberinsider.com', description: 'Telecom and fiber-industry content property with an existing search footprint and planned rebuild on the current stack.', proof: 'Connects the owned search network directly to the founders’ infrastructure domain expertise.' },
  { name: 'Find a Vibrator', category: 'Search-led affiliate property', status: 'Built', href: 'https://findavibrator.com', description: 'Owned niche site for search-led product discovery, editorial workflows, structured comparison content and affiliate conversion.', proof: 'A deliberately distinct niche used to test repeatability of the same content and SEO operating system.' },
];

const featuredVisuals = [
  ['ScoreCraft', 'SEO + AI Search Readiness diagnostics', 'https://scorecraft.io', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/efc0427c-7d39-49bf-9237-7dbdde9e4616.png'],
  ['BlogCraft', 'Managed content operating system', 'https://blogcraft.app', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/634fed74-92c9-41de-b474-1ee526bc3547.png'],
  ['CompareITAD', 'ITAD orchestration + chain-of-custody service', '/compareitad', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/5ac2929d-ecb1-464d-90b3-f368110c3357.png'],
  ['Vision Battery US', 'Technical-market growth system', 'https://visionbattery.us', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/c19f1bcc-8337-4c83-a024-3d20734c1f0b.png'],
  ['ImageCrafter', 'Live consumer AI image product', 'https://imagecrafter.app', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/e86e5cca-ddc1-4ed7-99b3-96f1469085b1.png'],
  ['Sonoma Wash Co.', 'Local Service Business OS reference build', '/portfolio/sonoma-wash-co', 'https://media.sonomawashco.com/img/hero-desktop-natural-poster.jpg'],
  ['Basement Wines', 'Wine ecommerce + SEO', 'https://basementwines.net', 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/e7dd9529-f359-4fe7-ad8e-086cc7cd82d8.png'],
];

const groups = [
  ['AI Products & Infrastructure', 'Production software Xenco Labs builds, operates and reuses across the portfolio.', products],
  ['Enterprise & Operational Builds', 'Live platforms and businesses that demonstrate custom integrations, compliance workflows, asset tracking, commerce and technical-market execution.', enterpriseBuilds],
  ['Owned Search Network', 'Cross-industry properties used to test keyword strategy, topical authority, content production, AI Search Readiness QA, refreshes, internal linking and conversion.', searchNetwork],
] as const;

function ItemCard({ item }: { item: PortfolioItem }) {
  return (
    <a href={item.href || '#'} target={item.href?.startsWith('/') ? undefined : '_blank'} rel={item.href?.startsWith('/') ? undefined : 'noopener noreferrer'} className="card h-full flex flex-col group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div><p className="text-xs font-mono text-[var(--brand-primary)] uppercase tracking-wide mb-1">{item.category}</p><h3 className="text-xl font-display font-bold text-[var(--text-primary)]">{item.name}</h3></div>
        <span className="text-xs rounded-full bg-[var(--surface-secondary)] px-3 py-1 text-[var(--text-secondary)] flex-none">{item.status}</span>
      </div>
      <p className="text-[var(--text-secondary)] font-body leading-relaxed mb-5 flex-1">{item.description}</p>
      <p className="text-sm text-[var(--text-tertiary)] font-body border-t border-[var(--border-subtle)] pt-4">{item.proof}</p>
      {item.href && <span className="mt-5 text-[var(--brand-primary)] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">Visit <ExternalLink className="w-3.5 h-3.5" /></span>}
    </a>
  );
}

export default function PortfolioPage() {
  return (
    <MarketingLayout>
      <section className="pt-32 lg:pt-40 pb-20 px-6 section-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-text text-[var(--brand-primary)] mb-6">PORTFOLIO</p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">The portfolio is where we prove the operating system.</h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-3xl mx-auto mb-10 leading-relaxed">Production AI products, enterprise platforms, ecommerce builds, ITAD chain-of-custody workflows, custom MCP integrations and an owned search network across very different industries.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="/services/managed-search-content" className="btn-primary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2">See Managed Search &amp; Content <ArrowRight className="w-4 h-4" /></Link><Link href="/compareitad" className="btn-secondary px-8 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center">See CompareITAD</Link></div>
        </div>
      </section>

      <section className="section-purple py-20 px-6"><div className="max-w-content mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center"><div><p className="label-text text-[var(--accent-amber)] mb-4">COMPAREITAD</p><h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">More than a directory: an ITAD orchestration business.</h2><p className="text-white/75 text-lg leading-relaxed mb-8">CompareITAD manages enterprise asset disposition from qualified vendor selection through serial-level chain-of-custody verification, disposition records, blind vendor bidding and resale/value recovery. That gives Xenco Labs a direct view into the buyer journey for data-center refreshes, hardware recovery, compliance and secure disposition.</p><Link href="/compareitad" className="bg-white text-[#0B1F3A] px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors">Understand CompareITAD <ArrowRight className="w-4 h-4" /></Link></div><div className="rounded-2xl border border-white/15 bg-white/[0.06] p-7"><p className="text-sm font-mono text-[var(--accent-amber)] mb-4">OPERATING MODEL</p><div className="space-y-4 text-white/75 text-sm leading-relaxed"><p><span className="text-white font-semibold">Client engagement:</span> $5,000 minimum or $12 per tracked asset.</p><p><span className="text-white font-semibold">Vendor process:</span> verified vendors, compliant facilities, signed agreement, blind bidding, client choice.</p><p><span className="text-white font-semibold">Chain of custody:</span> pickup scan, BOL, facility receipt, serial reconciliation, sanitization/destruction evidence.</p><p><span className="text-white font-semibold">Economics:</span> 20% of net resale economics, plus a partner-agent channel for qualified refresh leads.</p></div></div></div></section>

      <section className="section-tinted py-20 px-6"><div className="max-w-content mx-auto"><div className="max-w-3xl mb-10"><p className="label-text text-[var(--brand-primary)] mb-4">SELECTED LIVE WORK</p><h2 className="section-headline text-[var(--text-primary)] mb-4">Real products. Real sites. Real operating systems.</h2><p className="text-lg text-[var(--text-secondary)] leading-relaxed">These are current captures of live Xenco Labs products and properties — not presentation mockups.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{featuredVisuals.map(([name, label, href, image]) => (<a key={name} href={href} target={href.startsWith('/') ? undefined : '_blank'} rel={href.startsWith('/') ? undefined : 'noopener noreferrer'} className="group block overflow-hidden rounded-2xl border border-[var(--border-default)] bg-white shadow-sm hover:shadow-lg transition-shadow"><div className="aspect-[16/10] overflow-hidden bg-[var(--surface-secondary)] border-b border-[var(--border-subtle)]"><img src={image} alt={`${name} website screenshot`} className="w-full h-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-300" loading="lazy" /></div><div className="p-5"><p className="text-xs font-mono text-[var(--brand-primary)] uppercase tracking-wide mb-1">{label}</p><div className="flex items-center justify-between gap-4"><h3 className="font-display font-bold text-xl text-[var(--text-primary)]">{name}</h3><ExternalLink className="w-4 h-4 text-[var(--text-tertiary)] flex-none" /></div></div></a>))}</div></div></section>

      {groups.map(([title, body, items], index) => (<section key={title} className={`${index % 2 === 0 ? 'section-light' : 'section-tinted'} py-20 px-6`}><div className="max-w-content mx-auto"><div className="max-w-3xl mb-10"><p className="label-text text-[var(--brand-primary)] mb-4">{title}</p><h2 className="section-headline text-[var(--text-primary)] mb-4">{title}</h2><p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed">{body}</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{items.map((item) => <ItemCard key={item.name} item={item} />)}</div></div></section>))}

      <section className="section-purple py-20 px-6"><div className="max-w-3xl mx-auto text-center"><h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">We build the tools. Then we use them.</h2><p className="text-white/80 font-body mb-8 leading-relaxed">ScoreCraft diagnoses. BlogCraft operates content. Image Forge supplies the visual engine. CompareITAD proves we can build a transaction, compliance and chain-of-custody platform in a real enterprise market.</p><Link href="/services" className="bg-white text-[#0B1F3A] px-8 py-3.5 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-white/90 transition-colors">See Xenco Labs Services <ArrowRight className="w-4 h-4" /></Link></div></section>
    </MarketingLayout>
  );
}
