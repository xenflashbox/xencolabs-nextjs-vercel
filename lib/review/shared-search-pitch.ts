export type SharedPitchSlide = {
  video: string;
  audio: string;
  title: string;
  narration: string;
};

/**
 * Permanent account-neutral closing section for Xenco Labs outbound presentations.
 *
 * HARD RULE: never add a prospect company, buyer name, employee name, or account-specific
 * appointment language here. Company-specific slides belong in each review route before
 * this array. Recipient personalization belongs in the outreach message, not the media.
 */
export const sharedSearchPitchSlides: SharedPitchSlide[] = [
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152204_77bf87f4-c549-4c8f-a5e8-58642f8134ec.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/ff53f8b9-dac8-42a9-ad18-a8257c054a96.mp3',
    title: 'Search Beyond Google',
    narration:
      'Search visibility now extends beyond Google. Buyers still search, but they also ask AI overviews, ChatGPT, Gemini, and Perplexity to research and shortlist providers. Rankings still matter, but so do citations, extractable answers, source credibility, and decision-ready content. The objective is visibility throughout the research path, not simply a blue link.',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152232_7f0e9fbc-f793-4cf9-b5b4-58802b8a5528.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/7eb64c30-c86e-41b8-8de6-378efe0d3ffc.mp3',
    title: 'The XencoLabs Operating System',
    narration:
      'Xenco Labs operates search as a system. Search intelligence from Ahrefs, Data for SEO, and Search Console feeds a grounded knowledge corpus. That drives content strategy, BlogCraft production, ScoreCraft quality control, subject-matter expert approval, publishing, and measurement. Each stage feeds the next, so the system improves over time.',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152318_2c319825-885f-4804-94e9-819bd78df20a.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/06cb4b9d-097a-4e01-8099-66729edefbdf.mp3',
    title: 'Proof of Execution',
    narration:
      'We have already built versions of this model. Vision Battery uses problem-first messaging, an interactive battery selector, AI assistance, and industry content clusters. CompareITAD applies the same thinking to complex enterprise infrastructure decisions. Behind both sits our own platform stack, ScoreCraft for diagnosis, BlogCraft for content operations, and ImageCrafter and launch tooling for execution.',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261005_152336_66815544-744d-49e0-bcfb-186f78e54299.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/f92e8073-a68c-412a-99d1-e48108b9a7c9.mp3',
    title: 'The First 90 Days',
    narration:
      'The first 90 days are deliberately structured. In month one, establish the technical, content, search, and AI visibility baseline. In month two, improve high-value pages, internal linking, and structural gaps. By month three, the ongoing content engine, GEO production, reporting cadence, and conversion feedback loop are running as one system.',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/hf_20261006_034431_f5fbd223-dfd6-462a-ac09-c2418eb37d0d.mp4',
    audio: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3CWed9VwrQQc03Una20MG2k84nU/8c509101-ddfe-429d-a5f1-ae0996e18443.mp3',
    title: 'Managed Function vs. One Hire',
    narration:
      'The question is not employee versus agency. If the need is one search practitioner, hire one. If the need is the complete operating function, Xenco Labs brings principal-led strategy, the search intelligence stack, our software, content operations, technical search, AI visibility, reporting, and conversion optimization. The enterprise program is twenty thousand dollars per month. The next step is a working session with your search and marketing leadership.',
  },
];
