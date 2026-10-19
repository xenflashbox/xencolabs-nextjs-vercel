import type { TrackedSlide } from '@/app/p/[token]/tracked-pitch-player';

/**
 * Local Service Business OS product presentation (api-xencolabs #76): 8 slides, each a silent H.264 1920x1080 MP4
 * (deterministic compositor grouped reveals over the approved still) + a separate Marcus Cole narration MP3, plus the
 * approved still as poster. Built by api-xencolabs `app/leadintel/pitch/product_deck.py` from the committed manifest
 * `assets/product_decks/local-service-business-os.json` (source: docs/local-service-business-os-pitch-brief.md).
 * File names carry the first 10 hex of the content SHA-256, so a rebuilt asset is a new URL.
 */
export const LOCAL_OS_DECK: { slug: string; title: string; slides: TrackedSlide[] } = {
  slug: 'local-service-business-os',
  title: 'Local Service Business OS',
  slides: [
    { title: 'The owner is the back office', video: '/presentations/local-service-business-os/s01-fa9227ce40.mp4', audio: '/presentations/local-service-business-os/s01-f80097e51f.mp3', poster: '/presentations/local-service-business-os/s01-151038386c.jpg' },
    { title: 'One connected operating loop', video: '/presentations/local-service-business-os/s02-bd96564a9c.mp4', audio: '/presentations/local-service-business-os/s02-bf02a810a5.mp3', poster: '/presentations/local-service-business-os/s02-5b5a67aa87.jpg' },
    { title: 'A useful AI receptionist', video: '/presentations/local-service-business-os/s03-121b06d570.mp4', audio: '/presentations/local-service-business-os/s03-a75b381c5f.mp3', poster: '/presentations/local-service-business-os/s03-754d8d0667.jpg' },
    { title: 'Live proof: Sonoma Wash Co.', video: '/presentations/local-service-business-os/s04-17c9bd92ab.mp4', audio: '/presentations/local-service-business-os/s04-d786a79792.mp3', poster: '/presentations/local-service-business-os/s04-720e152087.jpg' },
    { title: 'Growth is part of the system', video: '/presentations/local-service-business-os/s05-d484effbef.mp4', audio: '/presentations/local-service-business-os/s05-80ff029c82.mp3', poster: '/presentations/local-service-business-os/s05-d894f96bc9.jpg' },
    { title: 'What gets installed', video: '/presentations/local-service-business-os/s06-bccb041c7b.mp4', audio: '/presentations/local-service-business-os/s06-9d48511fcc.mp3', poster: '/presentations/local-service-business-os/s06-a110eacd4d.jpg' },
    { title: 'Package and timeline', video: '/presentations/local-service-business-os/s07-68149d2e72.mp4', audio: '/presentations/local-service-business-os/s07-6b7f43eef0.mp3', poster: '/presentations/local-service-business-os/s07-106e3ff024.jpg' },
    { title: 'Book a Build Consultation', video: '/presentations/local-service-business-os/s08-4260df6e82.mp4', audio: '/presentations/local-service-business-os/s08-95d24d4e6e.mp3', poster: '/presentations/local-service-business-os/s08-9a5282d8e7.jpg' },
  ],
};
