type AuthResult = { userId: string | null; sessionId: string | null; isSignedIn: boolean };

export function getAuth(): AuthResult {
  if (process.env.AUTH_BYPASS === '1') {
    return { userId: 'dev_user', sessionId: 'dev_session', isSignedIn: true };
  }
  const { auth } = require('@clerk/nextjs');
  return auth();
}
