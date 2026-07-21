/**
 * Mautic OAuth2 (client_credentials) transport.
 *
 * Single auth surface for ALL Xenco Labs → Mautic API calls. Token is cached in
 * module scope, refreshed on expiry, and a 401 response triggers exactly
 * one forced refresh + retry (covers expiry/revocation between cache and use).
 *
 * Lifted verbatim from xenflashbox/resumecoach-last (lib/mautic-auth.ts), which
 * runs this exact transport in production against mautic.xencolabs.com. Uses a
 * SEPARATE XL credential pair — never ResumeCoach's (one-channel-one-key).
 *
 * Env contract:
 *   MAUTIC_URL                  e.g. https://mautic.xencolabs.com
 *   MAUTIC_OAUTH_TOKEN_URL      e.g. https://mautic.xencolabs.com/oauth/v2/token
 *   MAUTIC_OAUTH_CLIENT_ID
 *   MAUTIC_OAUTH_CLIENT_SECRET
 */

let cachedToken: { value: string; expiresAt: number } | null = null;

async function fetchMauticToken(): Promise<string> {
  const tokenUrl = process.env.MAUTIC_OAUTH_TOKEN_URL;
  const clientId = process.env.MAUTIC_OAUTH_CLIENT_ID;
  const clientSecret = process.env.MAUTIC_OAUTH_CLIENT_SECRET;
  if (!tokenUrl || !clientId || !clientSecret) {
    throw new Error('Mautic OAuth env missing (TOKEN_URL / CLIENT_ID / CLIENT_SECRET)');
  }
  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`Mautic token fetch failed: ${res.status} ${t.slice(0, 200)}`);
  }
  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) throw new Error('Mautic token response missing access_token');
  const expiresIn = Number(json.expires_in ?? 3600);
  cachedToken = { value: json.access_token, expiresAt: Date.now() + (expiresIn - 60) * 1000 };
  return cachedToken.value;
}

async function getMauticToken(force = false): Promise<string> {
  if (!force && cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;
  return fetchMauticToken();
}

/**
 * Authenticated Mautic API call. `path` may be absolute or relative to MAUTIC_URL.
 * Auto-refreshes the token once on a 401 (covers expiry/revocation between cache + use).
 */
export async function mauticFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const base = process.env.MAUTIC_URL?.replace(/\/$/, '');
  if (!base) throw new Error('MAUTIC_URL not configured');
  const url = path.startsWith('http') ? path : `${base}/${path.replace(/^\//, '')}`;

  let token = await getMauticToken();
  let res = await fetch(url, {
    ...init,
    headers: { ...(init.headers || {}), Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    token = await getMauticToken(true);
    res = await fetch(url, {
      ...init,
      headers: { ...(init.headers || {}), Authorization: `Bearer ${token}` },
    });
  }
  return res;
}
