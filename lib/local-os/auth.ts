import { currentUser } from '@clerk/nextjs/server';

export type Caller = { email: string; name: string };

/**
 * Local OS callers. Clerk sign-up is open, so a session alone is not enough: the user must be on the
 * LOCAL_OS_CALLERS allowlist (comma-separated emails) or carry publicMetadata.local_os_caller = true.
 */
export async function getCaller(): Promise<Caller | null> {
  const user = await currentUser();
  if (!user) return null;
  const email = (user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
  if (!email) return null;
  const allow = (process.env.LOCAL_OS_CALLERS || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  const flagged = (user.publicMetadata as Record<string, unknown> | undefined)?.local_os_caller === true;
  if (!flagged && !allow.includes(email)) return null;
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || email;
  return { email, name };
}
