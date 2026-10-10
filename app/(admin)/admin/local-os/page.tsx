import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { getCaller } from '@/lib/local-os/auth';
import { CallingConsole } from './console';

export const metadata: Metadata = { title: 'Local OS Calling Console — Xenco Labs', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function LocalOsConsolePage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in?redirect_url=/admin/local-os');
  const caller = await getCaller();
  if (!caller) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900">
        <div className="mx-auto max-w-md space-y-2">
          <h1 className="text-xl font-semibold">Not on the calling team</h1>
          <p className="text-sm text-slate-600">Your account is signed in but is not a Local OS caller. Ask an admin to add you.</p>
        </div>
      </main>
    );
  }
  return <CallingConsole caller={caller} />;
}
