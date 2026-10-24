/**
 * The Xenco Labs live AI receptionist demonstration shown inside every sales preview.
 *
 * This is XENCO's working AI guide and booking flow, not the prospect's phone line. Every
 * placement must say so; a preview never routes the prospect's customers or emergencies to it.
 */
export const XENCO_AI_DEMO = {
  heading: 'Call the live Xenco AI guide',
  copy:
    'Call Xenco’s working AI guide to experience how an AI receptionist can answer, qualify a request, explain the workflow, and book a real walkthrough.',
  display: '(415) 338-9949',
  tel: '+14153389949',
  label: 'Xenco Labs live demonstration',
  disclaimer: (tenantName: string) =>
    `This number reaches Xenco Labs’ AI guide, not ${tenantName}. It is not a dispatch or emergency line.`,
} as const
