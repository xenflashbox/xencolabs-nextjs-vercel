/**
 * Xenco Labs → Mautic sync.
 *
 * Modeled on syncHrInquiryToMautic in xenflashbox/resumecoach-last (lib/mautic.ts):
 * one atomic POST /api/contacts/new carrying identity + the routing field, so a
 * cron tick can never route the contact before the field lands. Mautic dedupes by
 * email on its side. Best-effort — logs loudly, never throws to the caller.
 *
 * Mautic-side (provisioned + acceptance-tested by the Mautic admin):
 *   field xl_source (74), xl_advisory_status (75, default 'new'),
 *   xl_advisory_message (76); segment 21 'xl-advisory'; campaign 13
 *   'XL Advisory — Notify + Escalate'. `source` is a reserved Mautic alias,
 *   hence the xl_ prefix.
 */
import { mauticFetch } from './mautic-auth';

export interface XlAdvisoryInquiry {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  /** Free-text qualifier, stamped to xl_advisory_message (field 76). */
  message?: string;
}

/**
 * Create the advisory-inquiry contact in Mautic with the routing fields set
 * atomically. Returns the contact id, or null on any failure.
 */
export async function syncXlAdvisoryInquiryToMautic(
  payload: XlAdvisoryInquiry
): Promise<number | null> {
  const contactData: Record<string, unknown> = {
    email: payload.email,
    firstname: payload.firstname || undefined,
    lastname: payload.lastname || undefined,
    company: payload.company || undefined,
    // Routing fields — both carried in the single create call.
    xl_source: 'xl-advisory',
    xl_advisory_status: 'new',
    ...(payload.message ? { xl_advisory_message: payload.message } : {}),
    tags: ['xl-advisory'],
  };

  try {
    const res = await mauticFetch('/api/contacts/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error(
        '[Mautic] XL ADVISORY SYNC FAILED:',
        res.status,
        errText.slice(0, 200)
      );
      return null;
    }
    const result = (await res.json()) as { contact?: { id?: number } };
    console.log('[Mautic] XL advisory contact created:', result.contact?.id);
    return result.contact?.id ?? null;
  } catch (error) {
    console.error(
      `[Mautic] XL ADVISORY SYNC FAILED for ${payload.email} — request captured ` +
        'in Neon + notified by email, but the Mautic Notify/Escalate campaign did ' +
        'not fire. See the preceding error for the cause.',
      error
    );
    return null;
  }
}
