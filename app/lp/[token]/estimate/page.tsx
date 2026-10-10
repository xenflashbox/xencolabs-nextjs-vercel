import { notFound } from 'next/navigation';
import { eventsUrl, loadPreview } from '@/lib/local-os/preview';
import { PageTracker } from '../_ui/tracker';
import { EstimateFlow } from '../_ui/estimate';

export default async function PreviewEstimatePage({ params }: { params: { token: string } }) {
  const m = await loadPreview(params.token);
  if (!m) notFound();
  const ev = eventsUrl(params.token);
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <PageTracker eventsUrl={ev} token={params.token} page="estimate" />
      <h1 className="text-2xl font-bold">Instant estimate and booking</h1>
      <p className="mt-1 text-slate-600">Sandbox demo: sample prices for {m.config.business.name}. Your real price list would go here.</p>
      <EstimateFlow template={m.template} eventsUrl={ev} bookingUrl={m.config.booking?.url || null} demoPhone={m.config.sandbox?.demo_phone || null}
        business={m.config.business.name} />
    </main>
  );
}
