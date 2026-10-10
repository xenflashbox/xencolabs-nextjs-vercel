import { notFound } from 'next/navigation';
import { eventsUrl, loadPreview } from '@/lib/local-os/preview';
import { lookFor } from '@/lib/local-os/families';
import { PageTracker } from '../_ui/tracker';
import { Walkthrough } from '../_ui/walkthrough';
import { StoryRail } from '../_ui/shared';

export default async function PreviewSystemPage({ params }: { params: { token: string } }) {
  const m = await loadPreview(params.token);
  if (!m) notFound();
  const { family } = lookFor(m);
  const ev = eventsUrl(params.token);
  return (
    <main>
      <PageTracker eventsUrl={ev} token={params.token} page="system" />
      <div className="mx-auto max-w-5xl px-4 pb-8 pt-10">
        <p className="lp-kicker">Steps 4 to 6 · after the booking</p>
        <h1 className="lp-page-title mt-2">{family.systemTitle}</h1>
        <p className="mt-2 max-w-prose opacity-80">{family.systemSub} Sample customer and documents.</p>
        <Walkthrough template={m.template} eventsUrl={ev} business={m.config.business.name} bookingUrl={m.config.booking?.url || null}
          videoSrc={m.assets?.explainer_video || null} />
      </div>
      <StoryRail family={family} token={params.token} page="system" />
    </main>
  );
}
