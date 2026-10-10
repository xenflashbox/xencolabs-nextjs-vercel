import { Star } from 'lucide-react';
import type { Family } from '@/lib/local-os/families';
import { TrackedLink } from './tracker';

export function Monogram({ name }: { name: string }) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w && !/^(the|and|of|llc|inc|co)$/i.test(w));
  const initials = (words.slice(0, 2).map((w) => w[0]).join('') || name.slice(0, 1)).toUpperCase();
  return <span aria-hidden="true" className="lp-mono grid h-10 w-10 shrink-0 place-items-center text-sm font-bold">{initials}</span>;
}

export function Rating({ rating, count, className = '' }: { rating?: number | null; count?: number | null; className?: string }) {
  if (!rating) return null;
  return (
    <p className={`inline-flex items-center gap-1.5 text-sm ${className}`}>
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
      {rating} on Google{count ? ` · ${count} reviews` : ''}
    </p>
  );
}

/** The business's own public branding image, only when the manifest supplies one. Credited, never cropped into a logo. */
export function BrandImage({ src, business, className = '' }: { src?: string | null; business: string; className?: string }) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={`Image from ${business}'s public website`} className={`h-full w-full object-cover ${className}`} referrerPolicy="no-referrer" loading="lazy" />
  );
}

/** The whole owner story on every page: where this page sits between "a visitor arrives" and "the invoice is paid". */
export function StoryRail({ family, token, page }: { family: Family; token: string; page: 'service' | 'estimate' | 'system' }) {
  const href = { service: `/lp/${token}`, estimate: `/lp/${token}/estimate`, system: `/lp/${token}/system` };
  return (
    <nav aria-label="The full workflow" className="lp-rail mx-auto max-w-6xl px-4">
      <p className="lp-rail-title">The whole job, end to end</p>
      <ol className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
        {family.stages.map((s, i) => {
          const here = s.page === page;
          return (
            <li key={s.key} className={here ? 'is-here' : ''}>
              <a href={href[s.page]} aria-current={here ? 'step' : undefined} className="block h-full p-3">
                <span className="lp-rail-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="lp-rail-label">{s.label}</span>
                <span className="lp-rail-line">{s.line}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Closing band: the Xenco walkthrough booking (Cal link from the manifest, already carrying the preview token). */
export function BookingBand({ business, bookingUrl, eventsUrl, page, nextHref, nextLabel }: {
  business: string; bookingUrl: string | null; eventsUrl: string; page: string; nextHref?: string; nextLabel?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="lp-band grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-lg font-semibold">Want to see this set up for {business}?</p>
          <p className="text-sm opacity-80">A 20-minute walkthrough with Xenco Labs: your services, your prices, your calendar.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {nextHref && nextLabel && (
            <TrackedLink eventsUrl={eventsUrl} event="cta_click" page={page} href={nextHref} className="lp-btn-ghost">{nextLabel}</TrackedLink>
          )}
          {bookingUrl ? (
            <TrackedLink eventsUrl={eventsUrl} event="booking_click" page={page} href={bookingUrl} external className="lp-btn-light">
              Book the walkthrough
            </TrackedLink>
          ) : <p className="text-sm opacity-70">Booking link is being set up.</p>}
        </div>
      </div>
    </section>
  );
}
