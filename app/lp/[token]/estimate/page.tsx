import { notFound } from 'next/navigation';
import { eventsUrl, loadPreview } from '@/lib/local-os/preview';
import { lookFor } from '@/lib/local-os/families';
import { PageTracker } from '../_ui/tracker';
import { EstimateFlow } from '../_ui/estimate';
import { StoryRail } from '../_ui/shared';

export default async function PreviewEstimatePage({ params }: { params: { token: string } }) {
  const m = await loadPreview(params.token);
  if (!m) notFound();
  const { family } = lookFor(m);
  const ev = eventsUrl(params.token);
  return (
    <main>
      <PageTracker eventsUrl={ev} token={params.token} page="estimate" />
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-10">
        <p className="lp-kicker">Steps 2 and 3 · estimate and booking</p>
        <h1 className="lp-page-title mt-2">{family.estimateTitle}</h1>
        <p className="mt-2 max-w-prose opacity-80">{family.estimateSub} Sandbox demo: sample prices for {m.config.business.name}; the real price list would go here.</p>
        <EstimateFlow template={m.template} eventsUrl={ev} bookingUrl={m.config.booking?.url || null} demoPhone={m.config.sandbox?.demo_phone || null}
          business={m.config.business.name} />
      </div>
      <StoryRail family={family} token={params.token} page="estimate" />
    </main>
  );
}
