/**
 * Shelter / rescue concept preview, researched from Marin Humane's PUBLIC pages. Private Xenco Labs sales
 * demonstration: not a Marin Humane website, integration or endorsement, and not connected to ShelterBuddy.
 * The dated animal snapshot and the sourced adoption content live in the private bucket
 * (tenants/marin-humane/data/…) and are attached at request time (lib/local-os/tenants/resolve.ts).
 */
import type { DemoState } from '@/lib/local-os/demo-types'
import { tenantAsset } from '@/lib/local-os/tenant-media'
import type { TenantConfig, VerticalPack } from '@/lib/local-os/tenant-types'

const SLUG = 'marin-humane'
const A = (key: string) => tenantAsset(SLUG, key)
const PHOTO = A('animals/porter-1.jpg')

export const MARIN_HUMANE: TenantConfig = {
  slug: SLUG,
  name: 'Marin Humane',
  owner: '',
  license: null,
  phone: '',
  region: 'Marin County, California',
  established: null,
  verticalKey: 'shelter-rescue',
  kind: 'shelter',
  shelterDataKey: 'data/shelter-20261017b.json',
  branding: {
    primary: '#0E6B5C',
    primaryDark: '#0A4F44',
    surface: '#10231F',
    light: '#F7F5F0',
    typography: 'brand',
    theme: { headingFont: 'Fraunces', bodyFont: 'Inter', headingCase: 'none', radius: '16px', accent: '#E07A3F', heroLayout: 'split' },
    wordmarkText: 'Marin Humane',
    logos: {
      wordmarkOnLight: PHOTO, wordmarkOnDark: PHOTO, wordmarkMonoBlack: PHOTO, wordmarkMonoWhite: PHOTO,
      shieldOnLight: PHOTO, shieldOnDark: PHOTO, shieldMonoBlack: PHOTO, shieldMonoWhite: PHOTO,
      favicon: PHOTO,
    },
  },
  laneIds: [],
  site: {
    tagline: 'Shelter adoption concept',
    ctaLabel: 'Find an animal',
    photoCredit: 'Marin Humane public listing',
    heroTitle: 'Find your next companion',
    heroSubtitle: 'A concept for how a shelter’s adoptable animals, adoption questions and staff follow-up could work together on one site and one phone line.',
    credibility: [],
    serviceAreas: [],
    emergencyLine: '',
    aboutTitle: '',
    aboutBody: '',
    process: [],
  },
  media: {
    hero: { src: PHOTO, alt: 'Porter, a black Labrador cross, from Marin Humane’s public listing' },
    about: { src: A('animals/titus-1.jpg'), alt: 'Titus, a Pit Bull and Boxer cross, from Marin Humane’s public listing' },
    lanes: {},
    proof: [],
  },
  tour: [
    { label: 'Shelter homepage', detail: 'Find an animal, concept-preview label', path: '' },
    { label: 'Animal search', detail: 'Dated public-listing snapshot with filters', path: '/animals' },
    { label: 'Animal profile', detail: 'Published facts, photo, source link, caveat', path: '/animals/bonita' },
    { label: 'Adoption information', detail: 'From Marin Humane’s published pages, cited', path: '/adopt' },
    { label: 'Ask about an animal', detail: 'Minimal inquiry (stays in this browser)', path: '/ask?animal=bonita' },
    { label: 'Sample meeting request', detail: 'Request received — staff must confirm', path: '/meet?animal=bonita' },
    { label: 'Staff inquiry queue', detail: 'Fictional records, follow-up assignment', path: '/office' },
    { label: 'Book with Xenco Labs', detail: 'The only real appointment: a Xenco walkthrough', path: '/xenco' },
  ],
  aiDemo: true,
  aiDemoHeading: 'Call the live Xenco AI guide',
  website: 'https://marinhumane.org',
  previewOnly: true,
}

/** Shelters have no service lanes, estimates or jobs: an empty pack keeps the registry type uniform. */
export const SHELTER_RESCUE: VerticalPack = {
  key: 'shelter-rescue',
  label: 'Animal shelter / rescue',
  lanes: [], services: [], buildingTypes: [], urgency: [], intakeFields: [], leadStatuses: [], checklists: {},
  quoteLines: [], lineItemFamilies: [], reportTemplates: [], lifecycleName: 'Adoption inquiry', customerSteps: [],
  guardrails: { quote: '', compliance: '', emergency: '', completion: '', document: 'Fictional sample — not a real adopter, inquiry or appointment.' },
  reportSections: [],
}

export const seedShelterPlaceholder = (): DemoState => ({ leads: [], quotes: [], jobs: [], reports: [], invoices: [] })
