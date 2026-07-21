/**
 * Single source of truth for the swappable bits of the /advisory page.
 * Video URL and Calendly link are one-line swaps per the launch brief.
 */

// 60-second overview video. Swap this one constant when the final cut lands.
export const OVERVIEW_VIDEO_ID = '6MIs2X5FbNs'; // https://youtu.be/6MIs2X5FbNs
export const OVERVIEW_VIDEO_POSTER = '/advisory/datacenter-density-map.png'; // interim poster

// Booking link shown on the briefing-request thank-you state.
export const CALENDLY_URL = 'https://calendly.com/xencolabs/30min';

// Principals — contact line under the final CTA.
export const PRINCIPALS = [
  { name: 'Xenophon Giannis', email: 'xen@xencolabs.com', phone: '415-310-0860' },
  { name: 'Laurie Shahin', email: 'laurie@xencolabs.com', phone: '530-368-7373' },
] as const;

// Downloadable sample assessment (ungated for launch; file is banner-labeled).
export const SAMPLE_PDF =
  '/advisory/sample-site-prequalification-benton-county-mo.pdf';
