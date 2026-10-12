/**
 * A prospect's sourced tenant profile, researched from the business's own public website and stored
 * with its preview in LeadIntel (config_json.profile). Every fact and asset carries the public URL it
 * came from. Media keys point at the private tenant-media bucket (tenants/lp-<token>/<key>), served
 * through the allowlisted /os-media route; nothing is hot-linked or committed to the repository.
 *
 * Lead categories (Google / LeadIntel) are clues only: the website is the source of truth for the
 * trade, services, service area, phone and brand.
 */
export type ProspectTemplate = 'window_gutter' | 'exterior_cleaning' | 'landscaping' | 'pool_service'

/** Kinds map a business's own service to a workflow family (checklists, sample documents). */
export type ServiceKind =
  | 'windows' | 'gutters' | 'screens' | 'roof' | 'solar' | 'pressure' | 'softwash' | 'deck_fence' | 'dryer_vent'
  | 'landscape_build' | 'landscape_maint' | 'irrigation' | 'turf' | 'hardscape' | 'other'

export interface Sourced { source: string }

export interface ProspectMedia { key: string; alt: string; source: string; focus?: string; caption?: string }

export interface ProspectService extends Sourced {
  id: string
  title: string
  /** Short description in the business's own terms (rewritten accurately, never embellished). */
  summary: string
  kind: ServiceKind
  image?: ProspectMedia
}

export interface ProspectProfile {
  version: 1
  /** Verified public name as the business presents itself, and the trade the website shows. */
  name: string
  legal_or_listing_name?: string
  trade: string
  template: ProspectTemplate
  website: string
  /** Conflicts between lead data and the website, recorded for correction (the website wins). */
  conflicts?: string[]
  phone: { display: string; tel: string } & Sourced
  address?: { text: string } & Sourced
  cta: { label: string } & Sourced
  service_areas: { list: string[]; summary: string } & Sourced
  brand: {
    primary: string
    primary_dark: string
    accent?: string
    surface: string
    light: string
    heading_font?: string
    body_font?: string
    heading_case: 'uppercase' | 'none'
    radius: string
    hero_layout: 'overlay' | 'split'
    /** Logo assets (private keys). wordmark_text renders a clean text wordmark when no wide logo exists. */
    logo_mark?: ProspectMedia
    logo_wide?: ProspectMedia
    logo_wide_aspect?: number
    wordmark_text?: string
    favicon?: ProspectMedia
  } & Sourced
  hero: { eyebrow: string; title: string; subtitle: string; image: ProspectMedia } & Sourced
  services: ProspectService[]
  about: { title: string; body: string; image?: ProspectMedia } & Sourced
  /** Photos the site itself presents as the business's own work; captioned with their source. */
  gallery: ProspectMedia[]
  /** Short public facts (e.g. Google rating) with their sources; no guarantees, certifications or promises. */
  facts: ({ text: string } & Sourced)[]
  researched_at: string
}
