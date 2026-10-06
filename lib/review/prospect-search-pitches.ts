export type ProspectPitchMetric = {
  value: string;
  label: string;
};

export type ProspectPitchConfig = {
  slug: string;
  company: string;
  pageTitle: string;
  headerSubtitle: string;
  intro: string;
  briefLabel: string;
  briefSubtitle: string;
  roleHeadline: string;
  roleSubheadline: string;
  scope: string[];
  metricHeadline: string;
  metricSubheadline: string;
  metrics: ProspectPitchMetric[];
  opportunityHeadline: string;
  opportunitySubheadline: string;
  opportunityBullets: string[];
  operatingCallout: string;
  audio: string[];
};

const cdn = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU';

export const prospectSearchPitches: Record<string, ProspectPitchConfig> = {
  'infinite-electronics': {
    slug: 'infinite-electronics',
    company: 'Infinite Electronics',
    pageTitle: 'Infinite Electronics Search & AEO Opportunity Brief',
    headerSubtitle: 'Multi-brand search operating model',
    intro:
      'A company-level review of Infinite Electronics’ portfolio-wide SEO, AEO and AI-discovery mandate, and the managed operating model Xenco Labs can provide beneath internal leadership.',
    briefLabel: 'SEARCH & AEO OPPORTUNITY BRIEF',
    briefSubtitle: 'MULTI-BRAND SEARCH OPERATING MODEL',
    roleHeadline: 'THE ROLE INFINITE ELECTRONICS IS HIRING FOR',
    roleSubheadline: 'ONE SEO / AEO MANAGER IS BEING ASKED TO OPERATE A PORTFOLIO-WIDE FUNCTION.',
    scope: [
      'SEO',
      'AEO',
      'AI SEARCH',
      'TECHNICAL SEARCH',
      'E-COMMERCE GROWTH',
      'CONTENT GOVERNANCE',
      'MULTI-BRAND ARCHITECTURE',
      'REPORTING',
      'AGENCY',
      'VENDOR MANAGEMENT',
    ],
    metricHeadline: 'INFINITE ELECTRONICS ALREADY HAS A SEARCH ASSET',
    metricSubheadline: 'THE ORGANIC OPPORTUNITY LIVES ACROSS THE PORTFOLIO, NOT ONLY THE PARENT DOMAIN.',
    metrics: [
      { value: '90K+', label: 'EST. US ORGANIC VISITS / MO' },
      { value: '8', label: 'CORE BRAND DOMAINS REVIEWED' },
      { value: 'MULTI-BRAND', label: 'DEMAND' },
      { value: 'TECHNICAL', label: 'BUYER INTENT' },
    ],
    opportunityHeadline: 'THE SEARCH PROBLEM IS PORTFOLIO ARCHITECTURE',
    opportunitySubheadline: 'EACH BRAND CAN WIN ITS OWN DEMAND — BUT THE SYSTEM NEEDS SHARED INTELLIGENCE.',
    opportunityBullets: [
      'Shared keyword and AI-demand intelligence across specialized brands',
      'Brand-specific content paths without flattening positioning',
      'Centralized technical governance, measurement and reporting',
    ],
    operatingCallout:
      'Designed to compound search visibility across every brand, not restart from scratch on every domain.',
    audio: [
      cdn + '/dd4c9b39-5ccf-43fb-98a0-8f3b6497043d.mp3',
      cdn + '/8d63de51-9840-46e9-9835-c7ad378c5489.mp3',
      cdn + '/043b5d3b-bbd5-4d97-bf16-a1d9b150089e.mp3',
      cdn + '/91929a53-480e-4902-a1af-cd05c3e8e42f.mp3',
      cdn + '/68602264-9b3e-42c2-9eec-f4b5843c23ab.mp3',
    ],
  },
  'candela-medical': {
    slug: 'candela-medical',
    company: 'Candela Medical',
    pageTitle: 'Candela Medical Search & AI Acquisition Opportunity Brief',
    headerSubtitle: 'Search acquisition operating model',
    intro:
      'A company-level review of Candela Medical’s unusually broad paid, organic and AI-search mandate and the execution system required to connect discovery to conversion and pipeline.',
    briefLabel: 'SEARCH & AI ACQUISITION OPPORTUNITY BRIEF',
    briefSubtitle: 'PAID + ORGANIC + AI SEARCH AS ONE SYSTEM',
    roleHeadline: 'THE ROLE CANDELA MEDICAL IS HIRING FOR',
    roleSubheadline: 'THE POSTING COMBINES MULTIPLE SEARCH DISCIPLINES WITH PERFORMANCE MARKETING AND AGENCY LEADERSHIP.',
    scope: [
      'PAID SEARCH',
      'SEO',
      'AEO',
      'AI SEARCH',
      'TECHNICAL SEO',
      'CONTENT',
      'CRO',
      'ATTRIBUTION',
      'AGENCY MANAGEMENT',
    ],
    metricHeadline: 'CANDELA ALREADY HAS MEANINGFUL SEARCH EQUITY',
    metricSubheadline: 'THE OPPORTUNITY IS TO TURN THAT BASE INTO A BROADER, MEASURABLE ACQUISITION ENGINE.',
    metrics: [
      { value: 'DR 73', label: 'DOMAIN AUTHORITY' },
      { value: '11.6K', label: 'EST. ORGANIC VISITS / MO' },
      { value: '655', label: 'ORGANIC KEYWORDS' },
      { value: '391', label: 'TOP-3 POSITIONS' },
    ],
    opportunityHeadline: 'THE NEXT GROWTH LAYER IS NON-BRAND DISCOVERY',
    opportunitySubheadline: 'BRANDED EQUITY CAN BE EXTENDED INTO TREATMENT, PRODUCT, CLINICAL AND PROFESSIONAL INTENT.',
    opportunityBullets: [
      'Expand beyond branded demand into high-intent treatment and product discovery',
      'Connect paid, organic and AI visibility to one conversion measurement layer',
      'Use technical and structured-data improvements to strengthen machine readability',
    ],
    operatingCallout:
      'A managed execution layer that coordinates search intelligence, content, technical work and commercial reporting.',
    audio: [
      cdn + '/2da8ef43-0bd7-49af-b6dc-5c5fd7e18708.mp3',
      cdn + '/634ffb39-3f56-4f92-ac66-48a7aa31a1d3.mp3',
      cdn + '/975b766e-e57e-41db-b4e0-29a83d23b66c.mp3',
      cdn + '/dcb5bf01-b07b-47b2-beae-5cd7191eb29a.mp3',
      cdn + '/1bbc0928-20dd-4eb5-95f7-bd333a525ed7.mp3',
    ],
  },
  'fora-travel': {
    slug: 'fora-travel',
    company: 'Fora Travel',
    pageTitle: 'Fora Travel Search & GEO Opportunity Brief',
    headerSubtitle: 'Organic acquisition + AI discovery',
    intro:
      'A company-level review of an already-material organic acquisition channel and the operating system required to extend it into non-brand demand, AI citations and commercial outcomes.',
    briefLabel: 'SEARCH & GEO OPPORTUNITY BRIEF',
    briefSubtitle: 'FROM ORGANIC ASSET TO AI DISCOVERY ENGINE',
    roleHeadline: 'THE ROLE FORA IS HIRING FOR',
    roleSubheadline: 'THE DIRECTOR MANDATE DESCRIBES A COMPLETE SEARCH OPERATING FUNCTION.',
    scope: [
      'TECHNICAL SEO',
      'SITE ARCHITECTURE',
      'STRUCTURED DATA',
      'CONTENT',
      'GEO / AEO',
      'AI CITATIONS',
      'ADVISOR ACQUISITION',
      'BOOKINGS',
      'AI AGENTS',
      'AGENCY MANAGEMENT',
    ],
    metricHeadline: 'ORGANIC SEARCH IS ALREADY A MATERIAL ASSET',
    metricSubheadline: 'EXECUTION QUALITY HAS REAL BUSINESS LEVERAGE AT FORA’S CURRENT SCALE.',
    metrics: [
      { value: 'DR 80', label: 'DOMAIN AUTHORITY' },
      { value: '104.5K', label: 'EST. ORGANIC VISITS / MO' },
      { value: '14.8K', label: 'ORGANIC KEYWORDS' },
      { value: '3.8K', label: 'TOP-3 POSITIONS' },
    ],
    opportunityHeadline: 'THE OPENING IS NON-BRAND + AI TRAVEL DISCOVERY',
    opportunitySubheadline: 'DESTINATION QUESTIONS AND ADVISOR INTENT ARE INCREASINGLY ANSWERED BEFORE A CLICK HAPPENS.',
    opportunityBullets: [
      'Expand non-brand destination, planning and comparison visibility',
      'Increase citation readiness across ChatGPT, Gemini, Perplexity and AI Overviews',
      'Tie search and AI visibility back to advisor acquisition and bookings',
    ],
    operatingCallout:
      'Managed execution beneath internal search leadership: technical, content, AI visibility, experimentation and reporting.',
    audio: [
      cdn + '/ba6b7ff9-cfce-45a9-91e4-0065678aefb4.mp3',
      cdn + '/27a9a718-20f7-44d8-aa46-d5ac96b68780.mp3',
      cdn + '/2dafb112-396d-4ce6-aa58-0c6045321e30.mp3',
      cdn + '/90aec27e-ab4b-468a-8133-4f1dd06f6253.mp3',
      cdn + '/0f302ede-d225-455c-b375-97d84a433833.mp3',
    ],
  },
  'true-religion': {
    slug: 'true-religion',
    company: 'True Religion',
    pageTitle: 'True Religion SEO & AI Discovery Opportunity Brief',
    headerSubtitle: 'Commerce search + AI discovery',
    intro:
      'A company-level review of True Religion’s large consumer search asset and the technical, structured-data and content operating layer required for the next generation of product discovery.',
    briefLabel: 'SEO & AI DISCOVERY OPPORTUNITY BRIEF',
    briefSubtitle: 'PROTECT THE ORGANIC ASSET · EXTEND IT INTO AI',
    roleHeadline: 'THE ROLE TRUE RELIGION IS HIRING FOR',
    roleSubheadline: 'SEO, AEO, GEO, TECHNICAL EXECUTION, PRODUCT DATA AND CONVERSION ARE BEING ASKED TO WORK AS ONE.',
    scope: [
      'SEO',
      'AEO',
      'GEO',
      'TECHNICAL AUDITS',
      'STRUCTURED DATA',
      'PRODUCT SCHEMA',
      'CONTENT',
      'AI ANSWER MONITORING',
      'AGENCY MANAGEMENT',
      'CONVERSION',
    ],
    metricHeadline: 'TRUE RELIGION ALREADY HAS A LARGE SEARCH ASSET',
    metricSubheadline: 'THE SCALE MAKES AI-DISCOVERY EXECUTION COMMERCIALLY MEANINGFUL.',
    metrics: [
      { value: '341.6K', label: 'EST. ORGANIC VISITS / MO' },
      { value: '5K+', label: 'ORGANIC KEYWORDS' },
      { value: '2.2K+', label: 'TOP-3 POSITIONS' },
      { value: '$158.6K', label: 'EST. TRAFFIC VALUE / MO' },
    ],
    opportunityHeadline: 'PRODUCT + CATEGORY INFORMATION MUST BECOME AI-READY',
    opportunitySubheadline: 'SEARCH ENGINES AND AI SYSTEMS NEED CLEANER SIGNALS TO RETRIEVE, UNDERSTAND AND CITE THE BRAND.',
    opportunityBullets: [
      'Strengthen product and category structured data and entity clarity',
      'Build citation-ready commerce and editorial content',
      'Measure AI representation alongside organic conversion and revenue',
    ],
    operatingCallout:
      'A managed layer for technical QA, content production, citation monitoring and commercial reporting.',
    audio: [
      cdn + '/ce696949-2da2-41cb-8930-6080431250ef.mp3',
      cdn + '/d93bea3d-8024-4689-9844-40a5d59869ff.mp3',
      cdn + '/269fc571-fc53-420a-8ec1-9c0e786ed5b6.mp3',
      cdn + '/1636f1f7-ca2a-4095-b1e8-e3ed20679396.mp3',
      cdn + '/4576bb59-4f22-42a7-96d8-6cd5ae92576f.mp3',
    ],
  },
  nebius: {
    slug: 'nebius',
    company: 'Nebius',
    pageTitle: 'Nebius Search & GEO Opportunity Brief',
    headerSubtitle: 'AI infrastructure demand + discoverability',
    intro:
      'A company-level review of Nebius’ global SEO/GEO mandate and the opportunity to convert strong branded authority into category-level, non-brand and AI-answer visibility.',
    briefLabel: 'SEARCH & GEO OPPORTUNITY BRIEF',
    briefSubtitle: 'FROM BRANDED AUTHORITY TO CATEGORY DISCOVERY',
    roleHeadline: 'THE ROLE NEBIUS IS HIRING FOR',
    roleSubheadline: 'GLOBAL SEO, GEO, TECHNICAL SEARCH, CONTENT, AUTOMATION AND PIPELINE MEASUREMENT ARE ONE MANDATE.',
    scope: [
      'GLOBAL SEO',
      'GEO / AEO / AIO',
      'TECHNICAL SEO',
      'INTERNATIONALIZATION',
      'STRUCTURED DATA',
      'MIGRATIONS',
      'CONTENT-LED GROWTH',
      'AI CITATIONS',
      'SHARE OF VOICE',
      'AI AGENTS',
      'PIPELINE',
    ],
    metricHeadline: 'NEBIUS HAS AUTHORITY — BUT THE FOOTPRINT IS HEAVILY BRANDED',
    metricSubheadline: 'THE NEXT STEP IS WINNING MORE CATEGORY AND NON-BRAND INFRASTRUCTURE DEMAND.',
    metrics: [
      { value: 'DR 77', label: 'DOMAIN AUTHORITY' },
      { value: '27.6K', label: 'EST. ORGANIC VISITS / MO' },
      { value: '12.8K', label: 'REFERRING DOMAINS' },
      { value: '$28.1K', label: 'EST. TRAFFIC VALUE / MO' },
    ],
    opportunityHeadline: 'CATEGORY AUTHORITY CAN EXTEND BEYOND THE NEBIUS NAME',
    opportunitySubheadline: 'GPU INFRASTRUCTURE, AI CLOUD, TRAINING AND INFERENCE ARE HIGH-VALUE DISCOVERY JOURNEYS.',
    opportunityBullets: [
      'Map and win non-brand infrastructure demand',
      'Increase accurate citations in AI platform and vendor-comparison answers',
      'Connect visibility to qualified enterprise demand and pipeline',
    ],
    operatingCallout:
      'Managed execution beneath internal leadership: non-brand demand, technical implementation, content, citations and measurement.',
    audio: [
      cdn + '/6cab63c9-053f-487b-9723-3cbaf78e5394.mp3',
      cdn + '/a3c26fb5-406e-4ba4-b638-30015ccd3c51.mp3',
      cdn + '/341e8bd6-1e14-4855-a23e-0bac348a6695.mp3',
      cdn + '/391442d2-d314-4633-843a-9ecbe8732384.mp3',
      cdn + '/e022a9a6-54de-4a25-842c-ef5521928c34.mp3',
    ],
  },
  pultegroup: {
    slug: 'pultegroup',
    company: 'PulteGroup',
    pageTitle: 'PulteGroup Search & AI Discovery Opportunity Brief',
    headerSubtitle: 'Multi-brand homebuyer search',
    intro:
      'A company-level review of a portfolio search opportunity where the meaningful organic asset sits across brands, communities and local-market buyer journeys rather than only the corporate domain.',
    briefLabel: 'SEARCH & AI DISCOVERY OPPORTUNITY BRIEF',
    briefSubtitle: 'PORTFOLIO GOVERNANCE + LOCAL BUYER INTENT',
    roleHeadline: 'THE SEARCH MANDATE IS A PORTFOLIO OPERATING PROBLEM',
    roleSubheadline: 'INTERNAL OWNERSHIP CAN BE AMPLIFIED BY A MANAGED EXECUTION LAYER ACROSS BRANDS AND MARKETS.',
    scope: [
      'SEO',
      'AI SEARCH',
      'MULTI-BRAND',
      'LOCAL INTENT',
      'TECHNICAL SEARCH',
      'CONTENT',
      'STRUCTURED DATA',
      'AGENCY EXECUTION',
      'PORTFOLIO REPORTING',
    ],
    metricHeadline: 'THE REAL SEARCH ASSET LIVES ACROSS THE PORTFOLIO',
    metricSubheadline: 'THE CORPORATE DOMAIN ALONE UNDERSTATES THE SIZE OF THE OPPORTUNITY.',
    metrics: [
      { value: '168K', label: 'EST. PORTFOLIO ORGANIC VISITS / MO' },
      { value: 'MULTI-BRAND', label: 'SEARCH FOOTPRINT' },
      { value: 'LOCAL', label: 'HIGH-INTENT DEMAND' },
      { value: 'AI', label: 'EMERGING HOME-BUYER DISCOVERY' },
    ],
    opportunityHeadline: 'LOCAL BUYER INTENT CAN SHARE ONE INTELLIGENCE LAYER',
    opportunitySubheadline: 'COMMUNITIES, MARKETS, FLOOR PLANS AND HOME-BUYER QUESTIONS BENEFIT FROM CENTRALIZED LEARNING.',
    opportunityBullets: [
      'Share demand intelligence across brands and markets',
      'Improve local, community and buyer-journey content without flattening brands',
      'Centralize technical governance, AI visibility and executive reporting',
    ],
    operatingCallout:
      'An execution layer that works beneath the internal owner and existing partners rather than replacing them.',
    audio: [
      cdn + '/1d19713c-bd90-40de-8493-c2c0a4aa8923.mp3',
      cdn + '/7b052294-1080-46ea-82fd-067c321c299e.mp3',
      cdn + '/5caef7f7-ea95-4f2f-8d3b-8e9d49fe45ed.mp3',
      cdn + '/a304bf34-e508-44e4-a78a-aa8615731b11.mp3',
      cdn + '/29bdeb60-53f2-4078-84f6-8553d60348b6.mp3',
    ],
  },
  'palo-alto-networks': {
    slug: 'palo-alto-networks',
    company: 'Palo Alto Networks',
    pageTitle: 'Palo Alto Networks Search & GEO Opportunity Brief',
    headerSubtitle: 'Protect the asset · build the AI layer',
    intro:
      'A company-level review of a very large organic acquisition asset and the execution challenge of layering GEO, AI citations, structured data and acquisition-driven migrations onto it safely.',
    briefLabel: 'SEARCH & GEO OPPORTUNITY BRIEF',
    briefSubtitle: 'PROTECT A HIGH-VALUE ASSET · COMPOUND IT WITH AI DISCOVERY',
    roleHeadline: 'THE ROLE PALO ALTO NETWORKS IS HIRING FOR',
    roleSubheadline: 'SEO, GEO, TECHNICAL SEARCH, CONTENT, AI CITATIONS, M&A MIGRATIONS AND PIPELINE ARE ONE FUNCTION.',
    scope: [
      'SEO',
      'GEO',
      'AI OVERVIEWS',
      'AI CITATIONS',
      'TECHNICAL SEO',
      'STRUCTURED DATA',
      'CONTENT HUBS',
      'M&A MIGRATIONS',
      'PIPELINE',
      'LEAD GENERATION',
    ],
    metricHeadline: 'THIS IS ALREADY A HIGH-VALUE SEARCH ASSET',
    metricSubheadline: 'THE MANDATE IS AS MUCH ABOUT PROTECTION AND EXECUTION QUALITY AS NEW VISIBILITY.',
    metrics: [
      { value: 'DR 89', label: 'DOMAIN AUTHORITY' },
      { value: '367.4K', label: 'EST. ORGANIC VISITS / MO' },
      { value: '11.5K', label: 'TOP-3 POSITIONS' },
      { value: '$1.42M', label: 'EST. TRAFFIC VALUE / MO' },
    ],
    opportunityHeadline: 'DEFEND WHAT WORKS WHILE BUILDING AI CITATION SHARE',
    opportunitySubheadline: 'MIGRATIONS, STRUCTURED DATA AND TOPIC AUTHORITY ALL HAVE TO MOVE WITHOUT PUTTING EXISTING EQUITY AT RISK.',
    opportunityBullets: [
      'Protect technical and organic equity through acquisition and migration work',
      'Increase machine-readable topic authority and AI citation presence',
      'Tie GEO and SEO execution to organic pipeline and lead generation',
    ],
    operatingCallout:
      'Managed execution under internal leadership: technical QA, migrations, structured data, content and AI visibility.',
    audio: [
      cdn + '/25778541-0af6-4dc4-b5cf-7c53a667599d.mp3',
      cdn + '/dc214e99-7da8-453d-8c01-ceb510ffce89.mp3',
      cdn + '/dd0a1f88-d299-4303-9bb6-957e3a377173.mp3',
      cdn + '/a06fd868-80f8-460b-81e7-3c07a39bb305.mp3',
      cdn + '/4c930857-8ed2-44e0-ab43-56e1168c9cde.mp3',
    ],
  },
  daloopa: {
    slug: 'daloopa',
    company: 'Daloopa',
    pageTitle: 'Daloopa Organic Search & AI Discovery Opportunity Brief',
    headerSubtitle: 'B2B fintech search + qualified pipeline',
    intro:
      'A company-level review of a strategically funded organic-growth mandate where traditional search, AI discovery, authority and qualified pipeline are explicitly expected to work together.',
    briefLabel: 'ORGANIC SEARCH & AI DISCOVERY OPPORTUNITY BRIEF',
    briefSubtitle: 'HIGH-VALUE NON-BRAND DEMAND + QUALIFIED PIPELINE',
    roleHeadline: 'THE BUDGET SIGNAL SAYS THIS IS A STRATEGIC FUNCTION',
    roleSubheadline: 'THE ROLE IS NOT ROUTINE SEO MAINTENANCE — IT IS BUILT TO CREATE A GROWTH CHANNEL.',
    scope: [
      'SEO',
      'AEO',
      'GEO',
      'TECHNICAL SEARCH',
      'CONTENT STRATEGY',
      'AI CITATIONS',
      'AUTHORITY',
      'EXPERIMENTATION',
      'CONVERSION',
      'QUALIFIED PIPELINE',
    ],
    metricHeadline: 'THE STRATEGIC SIGNAL IS THE FUNCTION ITSELF',
    metricSubheadline: 'BUDGET, COMPLEX RESEARCH INTENT AND AI DISCOVERY CREATE THE CONDITIONS FOR HIGH-LEVERAGE EXECUTION.',
    metrics: [
      { value: '$230–250K', label: 'SEARCH LEADERSHIP BUDGET' },
      { value: 'B2B FINTECH', label: 'COMPLEX RESEARCH INTENT' },
      { value: 'NON-BRAND', label: 'QUALIFIED PIPELINE' },
      { value: 'AI SEARCH', label: 'CITATION OPPORTUNITY' },
    ],
    opportunityHeadline: 'FINANCIAL RESEARCH JOURNEYS ARE MOVING INTO AI ANSWERS',
    opportunitySubheadline: 'THE SOURCES PROFESSIONALS TRUST AND THE ANSWERS AI SYSTEMS SYNTHESIZE ARE BECOMING PART OF THE FUNNEL.',
    opportunityBullets: [
      'Map high-value non-brand questions across research and financial-data workflows',
      'Build citation and authority signals across owned and trusted external sources',
      'Measure discovery through to qualified pipeline rather than rankings alone',
    ],
    operatingCallout:
      'A managed system for demand mapping, technical execution, authority, content, experimentation and pipeline reporting.',
    audio: [
      cdn + '/747597f9-007d-44a9-ae0d-888aed874675.mp3',
      cdn + '/b706301a-685e-4ea0-ac70-054d1d65ed5a.mp3',
      cdn + '/e9f13229-350d-45ab-9a9f-649897e2ffd7.mp3',
      cdn + '/d9dfd005-5105-4804-bd18-6b5c41e3fc8e.mp3',
      cdn + '/11b7f33b-5c70-4a31-a446-624bdbe4b403.mp3',
    ],
  },
  flodesk: {
    slug: 'flodesk',
    company: 'Flodesk',
    pageTitle: 'Flodesk Search & AEO Opportunity Brief',
    headerSubtitle: 'Authority + topical expansion + AI citations',
    intro:
      'A company-level review of Flodesk’s strong domain authority, comparatively focused keyword footprint, and the opportunity to expand acquisition while improving AI citation visibility.',
    briefLabel: 'SEARCH & AEO OPPORTUNITY BRIEF',
    briefSubtitle: 'TURN AUTHORITY INTO BROADER DISCOVERY',
    roleHeadline: 'THE ROLE FLODESK IS HIRING FOR',
    roleSubheadline: 'SEO, AEO, CONTENT REBUILDING, TECHNICAL EXECUTION, DISTRIBUTION AND EXPERIMENTATION ARE ONE MANDATE.',
    scope: [
      'SEO',
      'AEO / GEO',
      'CONTENT PRUNING',
      'CONTENT REBUILDING',
      'STRUCTURED DATA',
      'AI SUMMARIES',
      'CITATION-READY CONTENT',
      'REDDIT / YOUTUBE',
      'EXPERIMENTATION',
      'MEASUREMENT',
    ],
    metricHeadline: 'FLODESK HAS STRONG AUTHORITY WITH ROOM TO EXPAND',
    metricSubheadline: 'THE DOMAIN IS STRONGER THAN THE CURRENT KEYWORD FOOTPRINT SUGGESTS.',
    metrics: [
      { value: 'DR 89', label: 'DOMAIN AUTHORITY' },
      { value: '70.5K', label: 'EST. ORGANIC VISITS / MO' },
      { value: '1.8K', label: 'ORGANIC KEYWORDS' },
      { value: '$191.7K', label: 'EST. TRAFFIC VALUE / MO' },
    ],
    opportunityHeadline: 'AUTHORITY CAN COMPOUND INTO TOPICAL + AI VISIBILITY',
    opportunitySubheadline: 'EMAIL MARKETING, AUTOMATION AND SELLING-ONLINE QUESTIONS CREATE A LARGE DISCOVERY SURFACE.',
    opportunityBullets: [
      'Expand topical coverage beyond the current keyword footprint',
      'Rebuild and structure content for AI extraction and citation',
      'Use external-source distribution and experimentation to compound authority',
    ],
    operatingCallout:
      'Managed execution across content refresh, technical search, AI citations, off-site authority and acquisition measurement.',
    audio: [
      cdn + '/aa3cc964-0075-4477-872a-98f6a5b75e3a.mp3',
      cdn + '/63c444fe-b526-4c4e-8b34-4a13a169cbba.mp3',
      cdn + '/9da2dfef-a04a-4439-8297-118df2fd34db.mp3',
      cdn + '/464af15c-49f2-406e-9b85-e1db3112d216.mp3',
      cdn + '/3d66bae4-2942-41c2-8df2-0c43a7e4a6b6.mp3',
    ],
  },
};

export const prospectPitchSlugs = Object.keys(prospectSearchPitches);
