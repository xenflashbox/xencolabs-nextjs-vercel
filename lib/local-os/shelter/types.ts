/**
 * Shelter / rescue concept previews. The animal data is a DATED, demo-only research snapshot of an
 * organisation's public listings (one manual capture, never a live feed); it lives in the private R2 bucket
 * (tenants/<slug>/data/…), not in this public repository. Inquiries and meeting requests in the preview are
 * fictional and stay in the visitor's browser.
 */

export interface ShelterField { label: string; value: string }

export interface ShelterPhoto {
  /** Private media key (tenants/<slug>/<key>), served through the allowlisted /os-media route. */
  key: string
  /** The organisation's own public photo URL, kept for provenance; never loaded by the preview. */
  public_url: string
  /** Set on the server: /os-media/<slug>/<key>. */
  src?: string
}

export interface ShelterAnimal {
  slug: string
  name: string
  species: string
  shelterbuddy_animal_id: number
  /** Only fields the official listing explicitly publishes, in its own words. */
  fields: ShelterField[]
  contact_as_published: { phone: string; address: string | null }
  photos: ShelterPhoto[]
  source_listing_url: string
  captured_at: string
  search_card: { breed_line: string; sex_age_line: string; captured_at: string }
}

export interface ShelterSnapshot {
  dataset: string
  demo_only: true
  organization: string
  source_search_url: string
  captured_at: string
  caveat: string
  method: string
  animals: ShelterAnimal[]
}

export interface ShelterContent {
  captured_at: string
  sources: { title: string; url: string; page_modified?: string }[]
  process: { step: string; text: string; source: string; links?: { label: string; url: string }[] }[]
  fees: { source: string; note: string; rows: [string, string][]; more: string; sponsored: { text: string; source: string } }
  fee_includes: { source: string; items: string[] }
  locations: { source: string; text: string }
  desk: { source: string; text: string }
  availability: { source: string; text: string }
  faq: { q: string; a: string; source: string }[]
}

export interface ShelterData {
  dataset: string
  snapshot: ShelterSnapshot
  content: ShelterContent
}

/** Fictional operational records (never real adopters); kept apart from the research snapshot. */
export type InquiryStatus = 'new' | 'contacted' | 'meeting_requested' | 'closed'
export interface ShelterInquiry {
  id: string
  sample: true
  createdAt: string
  name: string
  phone: string
  email: string
  animalSlug: string
  preferredContact: 'phone' | 'email' | 'text'
  status: InquiryStatus
  assignedTo: string | null
  followUp: string
  source: 'website' | 'phone (AI demo)'
}
export interface ShelterMeetingRequest {
  id: string
  sample: true
  inquiryId: string | null
  createdAt: string
  name: string
  animalSlug: string
  preferredSlots: string[]
  status: 'awaiting_staff_confirmation' | 'staff_contacted' | 'declined_by_requester'
}
export interface ShelterDemoState { inquiries: ShelterInquiry[]; meetings: ShelterMeetingRequest[] }
