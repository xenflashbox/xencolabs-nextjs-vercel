import type { VerticalPack, VerticalTerms } from '@/lib/local-os/tenant-types'

/** The fire-protection wording every screen used before trades became configurable. */
const DEFAULT_TERMS: VerticalTerms = {
  field: 'Technician',
  fieldView: 'Technician',
  fieldPacket: 'Technician job packet',
  sampleFieldName: 'Sample Technician',
  reviewerRole: 'Licensed contractor',
  fromReport: 'From inspection',
  followUpLabel: 'repair estimate',
  itemNoun: 'inspection item',
  requestNotesPlaceholder: 'Anything we should know: access, system age, recent inspections…',
  invoiceFieldLine: 'technician certifications shown on live invoices',
  servicesHeading: 'What we inspect, test and repair',
  callCta: 'Emergency? Call',
}

export function termsOf(vertical: VerticalPack): VerticalTerms {
  return { ...DEFAULT_TERMS, ...vertical.terms }
}

/** Default sample records the site bridges into (the fire-protection reference tenant's ids). */
export function linksOf(tenant: { links?: { status: string; field: string } }): { status: string; field: string } {
  return tenant.links ?? { status: '/status/L-107', field: '/tech/J-301' }
}
