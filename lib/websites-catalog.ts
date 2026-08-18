// Single source of truth for the /websites store. The checkout API validates
// every submitted catalog key against PRICE_MAP and maps it to the real Stripe
// price ID server-side — the client never sends amounts or price IDs, only keys.
// Price IDs are not secret. Live Stripe account acct_1U1mL65py4lpWzXO.

export type PriceEntry = { id: string; amount: number; recurring: boolean };

// catalog key -> { Stripe price id, amount in cents, recurring? }
export const PRICE_MAP: Record<string, PriceEntry> = {
  xl_web_landing: { id: 'price_1U3lim5py4lpWzXOTcgQLCbB', amount: 90000, recurring: false },
  xl_web_starter: { id: 'price_1U3lim5py4lpWzXOoIqDbFIj', amount: 150000, recurring: false },
  xl_web_business: { id: 'price_1U3lin5py4lpWzXOtZuJKR7E', amount: 250000, recurring: false },
  xl_web_facelift: { id: 'price_1U3lin5py4lpWzXODmuu8Q3Z', amount: 150000, recurring: false },
  xl_addon_extra_page: { id: 'price_1U3lio5py4lpWzXOv63ot9FS', amount: 25000, recurring: false },
  xl_addon_chatbot_setup: { id: 'price_1U3lio5py4lpWzXOiYbWQb0P', amount: 75000, recurring: false },
  xl_addon_form_crm: { id: 'price_1U3lip5py4lpWzXOmeWKgc7S', amount: 35000, recurring: false },
  xl_addon_blog_setup: { id: 'price_1U3lip5py4lpWzXOcYkDC6IB', amount: 50000, recurring: false },
  xl_addon_imagery: { id: 'price_1U3lip5py4lpWzXO23kGF5qW', amount: 30000, recurring: false },
  xl_addon_copywriting: { id: 'price_1U3liq5py4lpWzXOR7FRzGnl', amount: 15000, recurring: false },
  xl_addon_domain_email: { id: 'price_1U3liq5py4lpWzXOLvULNz1K', amount: 15000, recurring: false },
  xl_hosting: { id: 'price_1U2c8V5py4lpWzXOlfGpYiYy', amount: 5000, recurring: true },
  xl_care_plus: { id: 'price_1U3lir5py4lpWzXO6NZc0lE2', amount: 15000, recurring: true },
  xl_chatbot_monthly: { id: 'price_1U3lir5py4lpWzXOi3BBTZ1x', amount: 5000, recurring: true },
  // Standalone transactional item sold on /growth (one-time, no hosting).
  xl_pitch_deck: { id: 'price_1U5ti55py4lpWzXOn6ZV40Vb', amount: 50000, recurring: false },
};

// ── UI metadata (the store, in display order) ──
export type Pkg = { key: string; name: string; price: number; blurb: string; pain: string; features: string[]; popular?: boolean };
export const PACKAGES: Pkg[] = [
  {
    key: 'xl_web_landing', name: 'Landing Page', price: 900,
    pain: 'Running an ad but sending clicks to a clunky homepage?',
    blurb: 'One focused page built to turn visitors into leads.',
    features: ['1 conversion-focused page', 'Lead capture form', 'Everything every build includes'],
  },
  {
    key: 'xl_web_starter', name: 'Starter Site', price: 1500, popular: true,
    pain: 'No real website yet — or one you’re embarrassed to share?',
    blurb: 'The essential 3-page presence, done for you.',
    features: ['3 pages (Home, About, Contact)', 'Services / products section', 'Everything every build includes'],
  },
  {
    key: 'xl_web_business', name: 'Business Site', price: 2500,
    pain: 'Established business, but the site doesn’t show it?',
    blurb: 'A complete 5-page site structured to win buyers.',
    features: ['5 pages, structured for your buyers', 'Gallery or catalog section', 'Everything every build includes'],
  },
  {
    key: 'xl_web_facelift', name: 'Facelift / Remodel', price: 1500,
    pain: 'Your site looks like it’s from 2012 and it’s costing you?',
    blurb: 'A modern restyle of the site you already have.',
    features: ['Restyle up to 5 existing pages', 'Mobile + speed overhaul', 'Everything every build includes'],
  },
];

export type HostingOpt = { key: string; name: string; price: number; blurb: string };
export const HOSTING: HostingOpt[] = [
  { key: 'xl_hosting', name: 'Hosting', price: 50, blurb: 'Managed hosting, SSL, uptime, small monthly edits.' },
  { key: 'xl_care_plus', name: 'Care+', price: 150, blurb: 'Hosting + a monthly content update, image refresh, priority edits.' },
];

// An add-on can map to one or more catalog keys (e.g. chatbot = setup + monthly).
// `tiers` (optional) restricts an add-on to specific package keys; absent = all.
export type Addon = { id: string; name: string; pain: string; priceLabel: string; keys: string[]; qty?: boolean; tiers?: string[] };

const MULTI_PAGE = ['xl_web_starter', 'xl_web_business', 'xl_web_facelift'];

export const ADDONS: Addon[] = [
  { id: 'chatbot', name: 'AI chat window (24/7 support)', pain: 'Can’t answer customers around the clock?', priceLabel: '$750 + $50/mo', keys: ['xl_addon_chatbot_setup', 'xl_chatbot_monthly'] },
  { id: 'form_crm', name: 'Lead form → your CRM', pain: 'Leads land in an inbox and go cold?', priceLabel: '$350', keys: ['xl_addon_form_crm'] },
  { id: 'blog', name: 'Blog setup (SEO content engine)', pain: 'Invisible on Google?', priceLabel: '$500', keys: ['xl_addon_blog_setup'], tiers: MULTI_PAGE },
  { id: 'imagery', name: 'AI imagery pack', pain: 'Stuck with stock photos everyone else uses?', priceLabel: '$300', keys: ['xl_addon_imagery'] },
  { id: 'copywriting', name: 'Copywriting (per page)', pain: 'Don’t know what to write?', priceLabel: '$150', keys: ['xl_addon_copywriting'], qty: true },
  { id: 'extra_page', name: 'Extra page', pain: 'Need more than the package includes?', priceLabel: '$250', keys: ['xl_addon_extra_page'], qty: true, tiers: MULTI_PAGE },
  { id: 'domain_email', name: 'Domain + business email setup', pain: 'No domain or a @gmail address?', priceLabel: '$150', keys: ['xl_addon_domain_email'] },
];

export function dollars(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US')}`;
}
