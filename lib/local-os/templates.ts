// Local OS private-preview templates. Every number here is SANDBOX sample data for a demonstration, never the
// prospect's real pricing and never Sonoma Wash Co. data.

export type TemplateKey = 'exterior_cleaning' | 'window_gutter' | 'pool_service' | 'landscaping';

export type Field =
  | { key: string; label: string; kind: 'number'; min: number; max: number; step: number; default: number; unit?: string }
  | { key: string; label: string; kind: 'select'; options: Array<[string, string]>; default: string }
  | { key: string; label: string; kind: 'toggle'; default: boolean };

export type Line = { label: string; amount: number };

export type Template = {
  key: TemplateKey;
  accent: string;
  heroTitle: (city: string) => string;
  heroSub: string;
  promises: string[];
  fields: Field[];
  estimate: (v: Record<string, number | string | boolean>) => Line[];
  checklist: string[];
  photoLabels: [string, string];
  plan: string;
  videoSrc: string;
};

const r = (n: number) => Math.round(n);

export const TEMPLATES: Record<TemplateKey, Template> = {
  exterior_cleaning: {
    key: 'exterior_cleaning', accent: '#0f766e',
    heroTitle: (city) => `House washing, concrete and solar panel cleaning in ${city}`,
    heroSub: 'Get a written estimate in under a minute and pick a time that works, without waiting for a call back.',
    promises: ['Instant written estimate', 'Book a time online', 'Photos before and after every job'],
    fields: [
      { key: 'sqft', label: 'Home size', kind: 'number', min: 800, max: 6000, step: 100, default: 2200, unit: 'sq ft' },
      { key: 'stories', label: 'Stories', kind: 'select', options: [['1', '1 story'], ['2', '2 stories'], ['3', '3 stories']], default: '2' },
      { key: 'concrete', label: 'Driveway & walkways', kind: 'number', min: 0, max: 3000, step: 50, default: 600, unit: 'sq ft' },
      { key: 'panels', label: 'Solar panels', kind: 'number', min: 0, max: 60, step: 1, default: 20, unit: 'panels' },
    ],
    estimate: (v) => {
      const mult = { '1': 1, '2': 1.15, '3': 1.3 }[String(v.stories)] || 1;
      const out: Line[] = [{ label: 'House soft wash', amount: Math.max(299, r(Number(v.sqft) * 0.18 * mult)) }];
      if (Number(v.concrete) > 0) out.push({ label: 'Driveway & walkway cleaning', amount: Math.max(129, r(Number(v.concrete) * 0.2)) });
      if (Number(v.panels) > 0) out.push({ label: 'Solar panel cleaning', amount: Math.max(149, r(Number(v.panels) * 9)) });
      return out;
    },
    checklist: ['Walk the property and note existing damage', 'Cover plants, outlets and fixtures', 'Soft wash siding and eaves', 'Surface clean driveway and walkways', 'Rinse solar panels with purified water', 'Final walkthrough with photos'],
    photoLabels: ['Before: driveway', 'After: driveway'],
    plan: 'Twice-a-year exterior refresh',
    videoSrc: '/lp-videos/exterior_cleaning.mp4',
  },
  window_gutter: {
    key: 'window_gutter', accent: '#1d4ed8',
    heroTitle: (city) => `Window cleaning, screens and gutters in ${city}`,
    heroSub: 'Count your windows, get a price right away, and book the visit online.',
    promises: ['Price by window count, no visit needed', 'Online booking', 'Reminders before every visit'],
    fields: [
      { key: 'windows', label: 'Windows', kind: 'number', min: 5, max: 80, step: 1, default: 22, unit: 'windows' },
      { key: 'stories', label: 'Stories', kind: 'select', options: [['1', '1 story'], ['2', '2 stories'], ['3', '3 stories']], default: '2' },
      { key: 'inside', label: 'Inside and outside', kind: 'toggle', default: true },
      { key: 'screens', label: 'Screens to clean', kind: 'number', min: 0, max: 60, step: 1, default: 10, unit: 'screens' },
      { key: 'gutters', label: 'Gutters', kind: 'number', min: 0, max: 400, step: 10, default: 140, unit: 'linear ft' },
    ],
    estimate: (v) => {
      const per = v.inside ? 15 : 9;
      const mult = Number(v.stories) >= 2 ? 1.2 : 1;
      const out: Line[] = [{ label: `Windows (${v.inside ? 'inside + outside' : 'outside'})`, amount: Math.max(149, r(Number(v.windows) * per * mult)) }];
      if (Number(v.screens) > 0) out.push({ label: 'Screen cleaning', amount: r(Number(v.screens) * 4) });
      if (Number(v.gutters) > 0) out.push({ label: 'Gutter clean-out', amount: Math.max(149, r(Number(v.gutters) * 1.25)) });
      return out;
    },
    checklist: ['Confirm window count and access', 'Lay drop cloths inside', 'Clean glass, frames and sills', 'Clean and reinstall screens', 'Clear gutters and flush downspouts', 'Final walkthrough with photos'],
    photoLabels: ['Before: gutters', 'After: gutters'],
    plan: 'Quarterly window plan',
    videoSrc: '/lp-videos/window_gutter.mp4',
  },
  pool_service: {
    key: 'pool_service', accent: '#0369a1',
    heroTitle: (city) => `Weekly pool service and repairs in ${city}`,
    heroSub: 'See your monthly price, start service online and get a report after every visit.',
    promises: ['Monthly price up front', 'Start service online', 'Visit report with photos'],
    fields: [
      { key: 'size', label: 'Pool size', kind: 'select', options: [['small', 'Small (under 15,000 gal)'], ['medium', 'Medium (15–25,000 gal)'], ['large', 'Large (over 25,000 gal)']], default: 'medium' },
      { key: 'frequency', label: 'Visits', kind: 'select', options: [['weekly', 'Weekly'], ['biweekly', 'Every two weeks']], default: 'weekly' },
      { key: 'condition', label: 'Water today', kind: 'select', options: [['clear', 'Clear'], ['cloudy', 'Cloudy'], ['green', 'Green']], default: 'clear' },
      { key: 'spa', label: 'Attached spa', kind: 'toggle', default: false },
    ],
    estimate: (v) => {
      const base = { small: 165, medium: 195, large: 230 }[String(v.size)] || 195;
      const monthly = r(base * (v.frequency === 'biweekly' ? 0.65 : 1) + (v.spa ? 25 : 0));
      const out: Line[] = [{ label: `Pool service, ${v.frequency === 'biweekly' ? 'every two weeks' : 'weekly'} (per month)`, amount: monthly }];
      if (v.condition === 'green') out.push({ label: 'Green-to-clean recovery (one time)', amount: 250 });
      if (v.condition === 'cloudy') out.push({ label: 'Cloudy water treatment (one time)', amount: 95 });
      return out;
    },
    checklist: ['Test and balance chemistry', 'Skim surface and empty baskets', 'Brush walls and tile line', 'Vacuum as needed', 'Check pump, filter and pressure', 'Send visit report with photos'],
    photoLabels: ['Before: water', 'After: water'],
    plan: 'Weekly service plan',
    videoSrc: '/lp-videos/pool_service.mp4',
  },
  landscaping: {
    key: 'landscaping', accent: '#15803d',
    heroTitle: (city) => `Pavers, turf and yard maintenance in ${city}`,
    heroSub: 'Get a ballpark estimate, book a site visit online, and approve the final quote from your phone.',
    promises: ['Ballpark estimate in a minute', 'Book the site visit online', 'Approve and sign from your phone'],
    fields: [
      { key: 'service', label: 'Project', kind: 'select', options: [['maintenance', 'Weekly maintenance'], ['pavers', 'Paver patio / walkway'], ['turf', 'Artificial turf']], default: 'pavers' },
      { key: 'area', label: 'Project area', kind: 'number', min: 100, max: 5000, step: 50, default: 400, unit: 'sq ft' },
      { key: 'removal', label: 'Remove existing lawn / concrete', kind: 'toggle', default: true },
    ],
    estimate: (v) => {
      const a = Number(v.area);
      if (v.service === 'maintenance') return [{ label: 'Weekly maintenance (per month)', amount: r(160 + a * 0.02) }];
      const out: Line[] = [{ label: v.service === 'turf' ? 'Artificial turf installed' : 'Paver patio / walkway installed', amount: r(a * (v.service === 'turf' ? 14 : 28)) }];
      if (v.removal) out.push({ label: 'Demolition and haul-away', amount: r(a * 3) });
      return out;
    },
    checklist: ['Confirm layout and measurements', 'Call 811 / mark utilities', 'Excavate and grade base', 'Compact base and set edging', 'Install pavers or turf', 'Final walkthrough with photos'],
    photoLabels: ['Before: backyard', 'After: backyard'],
    plan: 'Monthly yard maintenance',
    videoSrc: '/lp-videos/landscaping.mp4',
  },
};

export const LABEL = 'Private workflow concept - demonstration only';
