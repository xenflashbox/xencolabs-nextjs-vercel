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
  /**
   * Site-side bot protection passed (Turnstile + honeypot + timing). Stamped to
   * the Mautic `form_verified` field; the admin gates segments on it so any
   * unprotected/regressed form is stored but never notifies a human.
   */
  formVerified?: boolean;
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
    // Cross-system contract: 1 only when the site's bot protection passed.
    form_verified: payload.formVerified ? 1 : 0,
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

/**
 * Inbound journeys (issue api-xencolabs#111): Enterprise SEO (/growth audit form)
 * and Local Service OS (/services/local-service-business-os inquiry form).
 *
 * Mautic-side (provisioned 2026-10-10): xl_source routes the contact —
 * segment 51 'xl-enterprise-seo' / 53 'xl-local-os' (verified) feed the
 * Notify + Escalate campaigns 22 / 24; segments 52 / 54 add marketing consent
 * (xl_consent_at) and no booked call (booked_call_at) and feed the drips 23 / 25.
 * Fields: xl_lead_status (123), xl_utm_* (124-128), xl_landing_page (129),
 * xl_consent_at (130), xl_inquiry_message (131), xl_company_size (132),
 * xl_vertical (133). Text fields are varchar(64), hence the trim.
 *
 * One atomic create carries every field a segment filters on (a cron tick can
 * never see the contact half-written). Mautic dedupes on email. Consent is only
 * ever set, never cleared; unsubscribes live in Mautic's do-not-contact list.
 */
export type XlJourney = 'enterprise-seo' | 'local-os';

export interface XlInboundLead {
  journey: XlJourney;
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  phone?: string;
  website?: string;
  companySize?: string;
  vertical?: string;
  message?: string;
  /** Explicit opt-in to follow-up email (unticked by default on the form). */
  consent: boolean;
  formVerified: boolean;
  attribution?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    landing_page?: string;
  };
}

const short = (v?: string) => (v ? v.trim().slice(0, 64) : undefined);

export async function syncXlInboundToMautic(lead: XlInboundLead): Promise<number | null> {
  const a = lead.attribution || {};
  const contactData: Record<string, unknown> = {
    email: lead.email,
    firstname: lead.firstname || undefined,
    lastname: lead.lastname || undefined,
    company: lead.company || undefined,
    phone: lead.phone || undefined,
    website: lead.website || undefined,
    xl_source: `xl-${lead.journey}`,
    xl_lead_status: 'new',
    form_verified: lead.formVerified ? 1 : 0,
    xl_company_size: short(lead.companySize),
    xl_vertical: short(lead.vertical),
    xl_inquiry_message: lead.message || undefined,
    xl_utm_source: short(a.utm_source),
    xl_utm_medium: short(a.utm_medium),
    xl_utm_campaign: short(a.utm_campaign),
    xl_utm_content: short(a.utm_content),
    xl_utm_term: short(a.utm_term),
    xl_landing_page: short(a.landing_page),
    ...(lead.consent ? { xl_consent_at: new Date().toISOString().slice(0, 19).replace('T', ' ') } : {}),
    tags: [`xl-${lead.journey}`],
  };

  try {
    const res = await mauticFetch('/api/contacts/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error(`[Mautic] XL ${lead.journey} SYNC FAILED:`, res.status, errText.slice(0, 200));
      return null;
    }
    const result = (await res.json()) as { contact?: { id?: number } };
    console.log(`[Mautic] XL ${lead.journey} contact upserted:`, result.contact?.id);
    return result.contact?.id ?? null;
  } catch (error) {
    console.error(`[Mautic] XL ${lead.journey} SYNC FAILED for ${lead.email}:`, error);
    return null;
  }
}
