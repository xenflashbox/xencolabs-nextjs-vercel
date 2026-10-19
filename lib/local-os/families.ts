// The three owned page families. A template (the API's vertical_template, unchanged) picks its family; the family
// decides the visual stance and the voice of the 3-page story. Copy here is Xenco-written, never taken from a
// prospect's site, and makes no claim about the prospect's business.

import type { TemplateKey } from './templates';
import { resolveTheme, type FamilyKey } from './theme';

export type { FamilyKey };

export const FAMILY_OF: Record<TemplateKey, FamilyKey> = {
  exterior_cleaning: 'exterior',
  window_gutter: 'exterior',
  landscaping: 'property',
  pool_service: 'route',
};

export type StoryStage = { key: string; label: string; page: 'service' | 'estimate' | 'system'; line: string };

export type Family = {
  key: FamilyKey;
  /** The named design stance (internal; shown nowhere to the prospect). */
  stance: string;
  eyebrow: string;
  estimateTitle: string;
  estimateSub: string;
  systemTitle: string;
  systemSub: string;
  stages: StoryStage[];
};

const stages = (o: { capture: string; estimate: string; booking: string; quote: string; job: string; paid: string }): StoryStage[] => [
  { key: 'capture', label: 'Website & lead capture', page: 'service', line: o.capture },
  { key: 'estimate', label: 'Estimate', page: 'estimate', line: o.estimate },
  { key: 'booking', label: 'Booking', page: 'estimate', line: o.booking },
  { key: 'quote', label: 'Quote & e-sign', page: 'system', line: o.quote },
  { key: 'job', label: 'Checklist & photos', page: 'system', line: o.job },
  { key: 'paid', label: 'Invoice, payment & portal', page: 'system', line: o.paid },
];

export const FAMILIES: Record<FamilyKey, Family> = {
  exterior: {
    key: 'exterior',
    stance: 'Clean Line: confident field service, a squeegee stroke from grime to clean',
    eyebrow: 'Exterior service',
    estimateTitle: 'Price the job. Pick the day.',
    estimateSub: 'Customers answer a few questions about the property, see a written estimate and hold a time slot.',
    systemTitle: 'From signed quote to paid invoice',
    systemSub: 'What happens after the customer books: quote, e-signature, the crew checklist with photos, the invoice and the customer portal.',
    stages: stages({
      capture: 'A visitor lands on the service page and starts an estimate instead of filling a contact form.',
      estimate: 'Home size, stories and add-ons turn into a written, itemized estimate.',
      booking: 'They pick a slot and hold it with a test-mode deposit.',
      quote: 'The estimate becomes a quote the customer signs on their phone.',
      job: 'The crew works a checklist and attaches before/after photos.',
      paid: 'Finishing the checklist sends the invoice; the customer pays and sees it all in their portal.',
    }),
  },
  property: {
    key: 'property',
    stance: 'Project Plan: editorial, plan-first, the yard drawn as a measured site plan',
    eyebrow: 'Property care',
    estimateTitle: 'A ballpark before the site visit',
    estimateSub: 'Homeowners sketch the project, see a ballpark range and book the site visit that turns it into a real plan.',
    systemTitle: 'The project, from plan to final walkthrough',
    systemSub: 'After the site visit: the written plan and quote, e-signature, the build checklist with progress photos, invoicing and the client portal.',
    stages: stages({
      capture: 'A homeowner reads about the project type and starts a ballpark instead of waiting for a call back.',
      estimate: 'Project type and area become a ballpark with the line items spelled out.',
      booking: 'They book the site visit online.',
      quote: 'The site visit becomes a written plan and quote, approved and signed from a phone.',
      job: 'Each build phase is checked off with progress photos.',
      paid: 'Invoices follow the plan; the client pays online and tracks the project in a portal.',
    }),
  },
  route: {
    key: 'route',
    stance: 'Route Report: operational trust, every visit leaves a report',
    eyebrow: 'Recurring route service',
    estimateTitle: 'Monthly price, up front',
    estimateSub: 'New customers describe the pool, see a monthly price and start service on a route day.',
    systemTitle: 'Every visit, on the record',
    systemSub: 'Once service starts: the service agreement, e-signature, the visit checklist with photos, monthly invoicing and the customer portal.',
    stages: stages({
      capture: 'A pool owner lands on the service page and starts a monthly quote.',
      estimate: 'Pool size, visit frequency and water condition become a monthly price.',
      booking: 'They choose a start date on the route.',
      quote: 'The service agreement is signed on their phone.',
      job: 'Each visit is a checklist with readings and photos, sent as a visit report.',
      paid: 'Monthly invoices go out automatically; the customer sees reports and payments in the portal.',
    }),
  },
};

export const familyFor = (template: TemplateKey): Family => FAMILIES[FAMILY_OF[template] ?? 'exterior'];

/** Family + resolved theme for a preview. The theme is seeded by the token so a prospect always sees the same palette. */
export function lookFor(m: { token: string; template: TemplateKey; config: { branding?: { theme_color?: string | null } | null } }) {
  const family = familyFor(m.template);
  return { family, theme: resolveTheme(m.config.branding?.theme_color, family.key, m.token) };
}
