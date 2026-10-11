/**
 * Local OS tenant configuration: the shape every client of the shared Local OS
 * is described by. A tenant is configuration, not a fork — branding, the service
 * lanes it sells, and which vertical pack supplies the vocabulary, intake fields,
 * checklists and guardrails. The screens under /os/[tenant] are shared.
 *
 * Everything a preview tenant ships with is SAMPLE data (`sample: true` on every
 * record). Nothing here sends a message, books a crew, takes a payment or issues
 * a compliance statement.
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

export interface TenantConfig {
  slug: string
  name: string
  owner: string
  /** Shown exactly as the client publishes it. */
  license: string | null
  phone: string
  region: string
  verticalKey: string
  branding: TenantBranding
  /** Service lane ids from the vertical pack this tenant sells. */
  laneIds: string[]
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

export interface UrgencyLevel {
  id: string
  label: string
  /** What happens to a request at this urgency. Always a human step for anything urgent. */
  routing: string
  humanOnly: boolean
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

export interface VerticalPack {
  key: string
  label: string
  lanes: ServiceLane[]
  buildingTypes: string[]
  urgency: UrgencyLevel[]
  leadStatuses: { id: string; label: string }[]
  checklists: Record<string, ChecklistTemplateItem[]>
  quoteLines: QuoteLineTemplate[]
  /** Statements the system must never make on its own; shown where they would otherwise appear. */
  guardrails: {
    quote: string
    compliance: string
    emergency: string
    completion: string
  }
  reportSections: string[]
}
