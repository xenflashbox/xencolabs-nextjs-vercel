import { notFound } from 'next/navigation';
import { eventsUrl, loadPreview } from '@/lib/local-os/preview';
import { TEMPLATES } from '@/lib/local-os/templates';
import { lookFor } from '@/lib/local-os/families';
import { PageTracker } from './_ui/tracker';
import { BookingBand, StoryRail } from './_ui/shared';
import { ExteriorService, PropertyService, RouteService } from './_ui/service-families';

const SERVICE = { exterior: ExteriorService, property: PropertyService, route: RouteService };

export default async function PreviewServicePage({ params }: { params: { token: string } }) {
  const m = await loadPreview(params.token);
  if (!m) notFound();
  const { family } = lookFor(m);
  const ev = eventsUrl(params.token);
  const base = `/lp/${params.token}`;
  const Service = SERVICE[family.key];
  return (
    <main>
      <PageTracker eventsUrl={ev} token={params.token} page="service" />
      <Service m={m} t={TEMPLATES[m.template]} ev={ev} estimateHref={`${base}/estimate`} systemHref={`${base}/system`} />
      <StoryRail family={family} token={params.token} page="service" />
      <div className="mt-12">
        <BookingBand business={m.config.business.name} bookingUrl={m.config.booking?.url || null} eventsUrl={ev} page="service"
          nextHref={`${base}/estimate`} nextLabel="Try the estimate" />
      </div>
    </main>
  );
}
