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
  /** Type system for the customer site: 'industrial' = condensed display + mono field labels. */
  typography: 'industrial' | 'standard' | 'brand'
  /** Brand theme for prospect previews: the business's own fonts, heading case, corner radius and hero layout. */
  theme?: { headingFont?: string; bodyFont?: string; headingCase?: 'uppercase' | 'none'; radius?: string; accent?: string; heroLayout?: 'overlay' | 'split' }
  /** Clean text wordmark (beside the mark) when the business has no wide logo file. */
  wordmarkText?: string
  /** Width ÷ height of the wordmark artwork (default 4). */
  wordmarkAspect?: number
  /** Width ÷ height of the compact mark (default 1, a square shield/icon). */
  markAspect?: number
  /** Height multiplier for the compact mark (a stacked wordmark needs more height than a shield to stay legible). */
  markScale?: number
  /**
   * Background for a light plate behind the logo on dark surfaces, for artwork drawn only for light
   * backgrounds. The artwork itself is never recoloured.
   */
  logoPlate?: string
}

/** Customer-facing site copy. Facts must come from the client's own published material. */
export interface TenantSite {
  tagline: string
  /** The business's own primary call-to-action label (e.g. "Get a Free Quote"); default "Request service". */
  ctaLabel?: string
  /** Where the site's photos come from, shown as a credit under galleries (e.g. "quickywindows.com"). */
  photoCredit?: string
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

/** A photo the client supplied, with how to frame it and what it shows (also its alt text). */
export interface MediaImage {
  src: string
  alt: string
  /** CSS object-position for cropping, e.g. '50% 40%'. */
  focus?: string
  caption?: string
  /** AI-generated concept image, not the business's own photo: labelled on the image wherever shown. */
  illustrative?: boolean
}

/**
 * A short silent field clip with its matching poster. Rendered muted, looping, inline, with
 * preload="metadata"; under prefers-reduced-motion only the poster is shown. Never a hero, and
 * never carries baked-in text, logos or captions — all copy lives in the UI.
 */
export interface MediaVideo {
  src: string
  poster: string
  /** Accessible description of what the clip shows. */
  alt: string
}

/**
 * One piece of real-work proof on the customer site: a clip of the work, what it is, and where
 * that work shows up in the system (request flow, office, technician). Not a gallery item.
 */
export interface ProofItem {
  id: string
  title: string
  body: string
  video: MediaVideo
  /** Service lane this work belongs to, for the request link. */
  laneId?: string
  /** Where this work appears in the system; paths are relative to /os/[tenant]. */
  links: { label: string; path: string; view: 'customer' | 'office' | 'technician' }[]
}

/** Selected client media for the preview. Only the client's own work imagery; never stock. */
export interface TenantMedia {
  hero: MediaImage
  about: MediaImage
  /** One image per service lane id. */
  lanes: Record<string, MediaImage>
  /** Supporting photos, kept for tenants that want them; not rendered as a media wall. */
  gallery?: MediaImage[]
  /** Prospect previews: before/after photos for the completed sample job, labelled "Sample photo". */
  sampleJob?: { laneId: string; before: MediaImage[]; after: MediaImage[] }
  /** Real-work proof cards (video + poster + links into the system). Empty = section hidden. */
  proof: ProofItem[]
  /** Background for the link-preview (OG) card; falls back to `hero`. */
  share?: MediaImage
  /** Wording of the homepage proof section (defaults: "Real work" / "From the field to your file"). */
  proofHeading?: { eyebrow: string; title: string; body: string; cardLabel: string; note?: string }
  /** One illustrative clip per service lane, shown on that lane's service page. */
  laneVideos?: Record<string, { title: string; body: string; video: MediaVideo }>
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
  media: TenantMedia
  tour: TourStop[]
  /** Show the Xenco live AI receptionist panel (a Xenco number, never the client's). */
  aiDemo: boolean
  /** Heading for the AI panel when a brief asks for specific wording. */
  aiDemoHeading?: string
  /** First name used in the office dashboard greeting. */
  greetingName?: string
  /** Sample records the site bridges into (paths relative to /os/[tenant]). */
  links?: { status: string; field: string }
  /** Public website, for reference only; the preview never writes to it. */
  website: string | null
  /** Tenant kind: service businesses (default) or an animal shelter / rescue (its own screens). */
  kind?: 'service' | 'shelter'
  /** Shelter tenants: private R2 key of the dated demo snapshot + sourced content (attached at request time). */
  shelterDataKey?: string
  shelter?: import('@/lib/local-os/shelter/types').ShelterData
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
  /** Short field code shown on lane cards, e.g. '01'. */
  code: string
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
  /** Heading over the scored items (default "Inspection and testing"). */
  itemsTitle?: string
  /** Column labels for the per-area/per-system table (default: risers + main drain test). */
  systemsTable?: { title: string; id: string; type: string; location: string; a: string; b: string; suffix?: string }
  /** Name for the AHJ copy, when delivered to one (default: water purveyor / fire AHJ). */
  ahjLabel?: string
  /** How the service page describes who receives the record. */
  deliverToText?: string
  /** Sample record shown from the service page (relative to /os/[tenant]). */
  samplePath?: string
}

/** Words the shared screens use for this trade (defaults are the fire-protection wording). */
export interface VerticalTerms {
  /** The field role, e.g. 'Technician', 'Crew foreman'. */
  field: string
  /** The field app's short name, e.g. 'Technician', 'Crew'. */
  fieldView: string
  fieldPacket: string
  /** Placeholder name used when the office schedules new work. */
  sampleFieldName: string
  /** Who signs off reports, e.g. 'Licensed contractor', 'Estimator'. */
  reviewerRole: string
  /** "From inspection" / "From site review" on an estimate. */
  fromReport: string
  /** Label of the follow-up estimate link on a report. */
  followUpLabel: string
  /** Noun for a scored report item. */
  itemNoun: string
  /** Placeholder for the notes box on the request form. */
  requestNotesPlaceholder: string
  /** Footnote under the field-person line on invoices. */
  invoiceFieldLine: string
  /** Homepage heading over the service lanes. */
  servicesHeading: string
  /** Secondary hero button text before the phone number. */
  callCta: string
}

/**
 * One stage of the customer lifecycle ("Protection lifecycle" for fire protection), computed from
 * the linked records. `sample` is the preview record that illustrates the stage.
 */
export interface CustomerStep {
  id: 'received' | 'scheduled' | 'report' | 'approved' | 'completed' | 'invoiced'
  label: string
  detail: string
  /** Path (relative to /os/[tenant]) of a sample record showing this stage. */
  sample?: string
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
  /** Lifecycle name shown to customers, e.g. 'Protection lifecycle'. */
  lifecycleName: string
  /**
   * 'inspect-first' (fire protection): visit → report → repair estimate → work.
   * 'estimate-first' (paving, most contractors): request → site review → estimate → approval → crew → completion.
   */
  flow?: 'inspect-first' | 'estimate-first'
  terms?: Partial<VerticalTerms>
  /** Lane and line-item family used when the office drafts an estimate from a report. */
  followUp?: { laneId: string; familyId: string }
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
