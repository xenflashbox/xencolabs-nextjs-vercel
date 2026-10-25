/**
 * Short-lived presigned GET URLs for the private tenant-media R2 bucket (AWS SigV4, query-string
 * form). Server-only. No SDK dependency: the signing is the documented SigV4 algorithm over a
 * single GET with only the host header signed.
 */
import { createHash, createHmac } from 'node:crypto';

const enc = (s: string) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
const sha256hex = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');
const hmac = (key: Buffer | string, data: string) => createHmac('sha256', key).update(data, 'utf8').digest();

export interface R2ReadConfig {
  accountId: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export function presignR2Get(cfg: R2ReadConfig, key: string, expiresSeconds = 300, now: Date = new Date()): string {
  const host = `${cfg.accountId}.r2.cloudflarestorage.com`;
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const day = amzDate.slice(0, 8);
  const scope = `${day}/auto/s3/aws4_request`;
  const path = `/${cfg.bucket}/${key.split('/').map(enc).join('/')}`;
  const params: Record<string, string> = {
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': `${cfg.accessKeyId}/${scope}`,
    'X-Amz-Date': amzDate,
    'X-Amz-Expires': String(expiresSeconds),
    'X-Amz-SignedHeaders': 'host',
  };
  const query = Object.keys(params)
    .sort()
    .map((k) => `${enc(k)}=${enc(params[k] as string)}`)
    .join('&');
  const canonical = ['GET', path, query, `host:${host}\n`, 'host', 'UNSIGNED-PAYLOAD'].join('\n');
  const toSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha256hex(canonical)].join('\n');
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${cfg.secretAccessKey}`, day), 'auto'), 's3'), 'aws4_request');
  const signature = createHmac('sha256', signingKey).update(toSign, 'utf8').digest('hex');
  return `https://${host}${path}?${query}&X-Amz-Signature=${signature}`;
}

/** Read-only, bucket-scoped credentials for the tenant-media bucket, or null when not configured. */
export function tenantMediaConfig(): R2ReadConfig | null {
  const accountId = process.env.R2_TENANT_MEDIA_ACCOUNT_ID;
  const bucket = process.env.R2_TENANT_MEDIA_BUCKET;
  const accessKeyId = process.env.R2_TENANT_MEDIA_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_TENANT_MEDIA_SECRET_ACCESS_KEY;
  return accountId && bucket && accessKeyId && secretAccessKey ? { accountId, bucket, accessKeyId, secretAccessKey } : null;
}
