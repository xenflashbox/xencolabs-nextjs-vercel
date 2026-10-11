/**
 * Local OS vertical sales preview: the configuration every prospect preview is built from.
 *
 *   tenant        identity (name, logos, colours, phone, licence, service area), public-site copy,
 *                 which lanes they sell, the demo tour, and a sample seed
 *   vertical pack the trade module: lanes and service pages, intake fields, technician checklist
 *                 families, report (document) templates, estimate/invoice line-item families,
 *                 customer-status steps, guardrails
 *
 * The screens under /os/[tenant] are shared: a customer-facing site, the customer journey
 * (request, estimate approval, status, report, invoice), the office, and the technician app.
 * A new prospect — HVAC, exterior cleaning, asphalt — is a tenant file plus a trade module,
 * never a new application.
 *
 * Everything a preview tenant ships with is SAMPLE data. Nothing here sends a message, books a
 * crew, takes a payment, files a report or issues a certification.
 */

/**
 * Where a logo is placed. Each surface maps to exactly one supplied asset, so a
 * screen asks for "the mark for a compact dark header" rather than picking files.
 */
export type LogoSurface =
  | 'wordmarkOnLight'
  | 'wordmarkOnDark'
  | 'shieldOnLight'
  | 'shieldOnDark'
  | 'wordmarkMonoBlack'
  | 'wordmarkMonoWhite'
  | 'shieldMonoBlack'
  | 'shieldMonoWhite'
  | 'favicon'

export interface TenantBranding {
  /** Primary action / accent colour. */
  primary: string
  /** Darker accent for text on light backgrounds and hover states. */
  primaryDark: string
  /** Header and dark-surface colour. */
  surface: string
  /** Light page colour from the client's palette. */
  light: string
  /** Client-supplied assets, used as-is: never stretched, recoloured or combined. */
  logos: Record<LogoSurface, string>
}

/** Customer-facing site copy. Facts must come from the client's own published material. */
export interface TenantSite {
  tagline: string
  heroTitle: string
  heroSubtitle: string
  /** Short credibility facts, each one already public on the client's own site. */
  credibility: string[]
  serviceAreas: string[]
  emergencyLine: string
  aboutTitle: string
  aboutBody: string
  /** How the request process works, in the client's own words where possible. */
  process: { title: string; body: string }[]
}

/** One stop on the guided demo tour. `path` is relative to /os/[tenant]. */
export interface TourStop {
  label: string
  detail: string
  path: string
}

export interface TenantConfig {
  slug: string
  name: string
  owner: string
  /** Shown exactly as the client publishes it. */
  license: string | null
  phone: string
  region: string
  established: number | null
  verticalKey: string
  branding: TenantBranding
  /** Service lane ids from the vertical pack this tenant sells. */
  laneIds: string[]
  site: TenantSite
  tour: TourStop[]
  /** Show the Xenco live AI receptionist panel (a Xenco number, never the client's). */
  aiDemo: boolean
  /** Public website, for reference only; the preview never writes to it. */
  website: string | null
  /** Preview tenants are not live: seeded sample data, nothing leaves the browser. */
  previewOnly: true
}

export interface ServiceLane {
  id: string
  label: string
  short: string
  /** The kinds of work an intake can ask for in this lane. */
  workTypes: string[]
}

/** A customer-facing service page in the trade module. */
export interface ServicePage {
  slug: string
  laneId: string
  title: string
  summary: string
  includes: string[]
  whatToExpect: string[]
  /** Which report template this service normally produces, if any. */
  reportKind: string | null
}

export interface UrgencyLevel {
  id: string
  label: string
  /** What happens to a request at this urgency. Always a human step for anything urgent. */
  routing: string
  humanOnly: boolean
}

/** Extra trade-specific intake questions, beyond address, building type, service, urgency, contact, notes. */
export interface IntakeField {
  key: string
  label: string
  kind: 'select' | 'number' | 'text'
  options?: string[]
  /** Only asked for these lanes; all lanes when omitted. */
  laneIds?: string[]
}

export interface ChecklistTemplateItem {
  section: 'prep' | 'work' | 'safety' | 'completion'
  label: string
}

export interface QuoteLineTemplate {
  laneId: string
  label: string
  unit: string
  /** Placeholder only. Real rates come from the client. */
  sampleUnitPrice: number
}

/** A family of billable lines (inspection, parts, device testing, admin). Prices are placeholders. */
export interface LineItemFamily {
  id: string
  label: string
  items: { description: string; unit: string; sampleUnitPrice: number }[]
}

/** A report/document template in the trade module (e.g. five-year sprinkler inspection, backflow test). */
export interface ReportTemplate {
  kind: string
  title: string
  /** Inspection items scored pass / fail / needs attention / n.a. */
  items: string[]
  /** Device/assembly fields for templates that record multiple assemblies. */
  assemblyTypes?: string[]
  /** Who the finished report is delivered to. */
  deliverTo: ('owner' | 'ahj')[]
}

/** One customer-status step, computed from the linked records. */
export interface CustomerStep {
  id: 'received' | 'scheduled' | 'report' | 'approved' | 'completed' | 'invoiced'
  label: string
  detail: string
}

export interface VerticalPack {
  key: string
  label: string
  lanes: ServiceLane[]
  services: ServicePage[]
  buildingTypes: string[]
  urgency: UrgencyLevel[]
  intakeFields: IntakeField[]
  leadStatuses: { id: string; label: string }[]
  checklists: Record<string, ChecklistTemplateItem[]>
  quoteLines: QuoteLineTemplate[]
  lineItemFamilies: LineItemFamily[]
  reportTemplates: ReportTemplate[]
  customerSteps: CustomerStep[]
  /** Statements the system must never make on its own; shown where they would otherwise appear. */
  guardrails: {
    quote: string
    compliance: string
    emergency: string
    completion: string
    document: string
  }
  reportSections: string[]
}
