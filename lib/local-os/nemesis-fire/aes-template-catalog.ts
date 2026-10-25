export type AesSprinklerTemplate = {
  key: string
  form: string
  name: string
  system: 'Wet pipe' | 'Dry pipe' | 'Pre-action water' | 'Deluge'
  inspection: 'Quarterly and annual' | 'Five-year'
  pageCount: 3 | 4
  pages: readonly string[]
  source: string
}

const base = '/nemesis-fire/aes-template-library'

/**
 * Official California State Fire Marshal NFPA 25 AES templates supplied for
 * Nemesis Fire's report workflow. The raster pages are cleared copies of the
 * original forms; the printed form artwork is retained without field values.
 */
export const AES_SPRINKLER_TEMPLATES: readonly AesSprinklerTemplate[] = [
  {
    key: 'aes-2.1-wet-quarterly-annual',
    form: 'AES 2.1',
    name: 'Wet pipe — quarterly and annual',
    system: 'Wet pipe',
    inspection: 'Quarterly and annual',
    pageCount: 3,
    pages: [1, 2, 3].map((page) => base + '/aes-2-1-' + page + '.png'),
    source: 'NFPA 25 Form AES 2.1 Quarterly Annual Wet Pipe 2013.pdf',
  },
  {
    key: 'aes-2.2-wet-five-year',
    form: 'AES 2.2',
    name: 'Wet pipe — five-year',
    system: 'Wet pipe',
    inspection: 'Five-year',
    pageCount: 3,
    pages: [1, 2, 3].map((page) => base + '/aes-2-2-' + page + '.png'),
    source: 'NFPA 25 Form AES 2.2 5-Year Wet Pipe.pdf',
  },
  {
    key: 'aes-2.3-dry-quarterly-annual',
    form: 'AES 2.3',
    name: 'Dry pipe — quarterly and annual',
    system: 'Dry pipe',
    inspection: 'Quarterly and annual',
    pageCount: 3,
    pages: [1, 2, 3].map((page) => base + '/aes-2-3-' + page + '.png'),
    source: 'NFPA 25 Form AES 2.3 Quarterly Annual Dry Pipe 2013.pdf',
  },
  {
    key: 'aes-2.4-dry-five-year',
    form: 'AES 2.4',
    name: 'Dry pipe — five-year',
    system: 'Dry pipe',
    inspection: 'Five-year',
    pageCount: 3,
    pages: [1, 2, 3].map((page) => base + '/aes-2-4-' + page + '.png'),
    source: 'NFPA 25 Form AES 2.4 5-Year Dry Pipe 2013.pdf',
  },
  {
    key: 'aes-2.5-preaction-quarterly-annual',
    form: 'AES 2.5',
    name: 'Pre-action water — quarterly and annual',
    system: 'Pre-action water',
    inspection: 'Quarterly and annual',
    pageCount: 3,
    pages: [1, 2, 3].map((page) => base + '/aes-2-5-' + page + '.png'),
    source: 'NFPA 25 Form AES 2.5 Quarterly Annual Preaction Water 2013.pdf',
  },
  {
    key: 'aes-2.6-preaction-five-year',
    form: 'AES 2.6',
    name: 'Pre-action water — five-year',
    system: 'Pre-action water',
    inspection: 'Five-year',
    pageCount: 3,
    pages: [1, 2, 3].map((page) => base + '/aes-2-6-' + page + '.png'),
    source: 'NFPA 25 Form AES 2.6 5-Year Preaction Water 2013.pdf',
  },
  {
    key: 'aes-2.7-deluge-quarterly-annual',
    form: 'AES 2.7',
    name: 'Deluge — quarterly and annual',
    system: 'Deluge',
    inspection: 'Quarterly and annual',
    pageCount: 4,
    pages: [1, 2, 3, 4].map((page) => base + '/aes-2-7-' + page + '.png'),
    source: 'NFPA 25 Form AES 2.7 Quarterly Annual Deluge System 2013.pdf',
  },
  {
    key: 'aes-2.8-deluge-five-year',
    form: 'AES 2.8',
    name: 'Deluge — five-year',
    system: 'Deluge',
    inspection: 'Five-year',
    pageCount: 4,
    pages: [1, 2, 3, 4].map((page) => base + '/aes-2-8-' + page + '.png'),
    source: 'NFPA 25 Form AES 2.8 5-Year Deluge System 2013.pdf',
  },
]

export const AES_COVER_SHEET = {
  form: 'AES 1',
  name: 'Inspection, Testing, and Maintenance Cover Sheet',
  page: base + '/aes-1-1.png',
  source: 'NFPA 25 AES 1 Cover Sheet 2013.pdf',
} as const

export const findAesSprinklerTemplate = (key: string) =>
  AES_SPRINKLER_TEMPLATES.find((template) => template.key === key)
