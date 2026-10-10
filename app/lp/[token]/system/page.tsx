import { notFound } from 'next/navigation';
import { eventsUrl, loadPreview } from '@/lib/local-os/preview';
import { PageTracker } from '../_ui/tracker';
import { Walkthrough } from '../_ui/walkthrough';

export default async function PreviewSystemPage({ params }: { params: { token: string } }) {
  const m = await loadPreview(params.token);
  if (!m) notFound();
  const ev = eventsUrl(params.token);
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <PageTracker eventsUrl={ev} token={params.token} page="system" />
      <h1 className="text-2xl font-bold">How the office work runs itself</h1>
      <p className="mt-1 max-w-prose text-slate-600">From an accepted estimate to a paid invoice: quote, e-signature, job checklist with photos, invoice and payment, and a portal for the customer. Sample customer and documents.</p>
      <Walkthrough template={m.template} eventsUrl={ev} business={m.config.business.name} bookingUrl={m.config.booking?.url || null}
        videoSrc={m.assets?.explainer_video || null} />
    </main>
  );
}
