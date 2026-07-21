import Image from 'next/image';
import { BriefingCta } from './briefing-cta';
import { VideoEmbed } from './video-embed';
import { PRINCIPALS, SAMPLE_PDF } from './config';

// Brand palette (xencolabs-branding): navy grounds, amber = the single accent.
// Applied via Tailwind arbitrary values inline so the route stays scoped and
// doesn't touch the global (purple) product tokens.

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[#3B5C8F]/25 bg-white p-6 shadow-sm">
      <div className="text-3xl font-bold text-[#1F3864] sm:text-4xl">
        {value}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-[#4A5A6E]">{label}</div>
    </div>
  );
}

export default function AdvisoryPage() {
  return (
    <main className="bg-[#0B1F3A] text-white antialiased">
      {/* ── Header: Advisory lockup + two-item nav (cul-de-sac) ── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Image
          src="/advisory/advisory-lockup-white.png"
          alt="Xenco Labs — Infrastructure Advisory"
          width={230}
          height={44}
          priority
          className="h-8 w-auto shrink-0 sm:h-10"
        />
        <nav className="flex items-center gap-4 sm:gap-6">
          <a
            href="#sample-work"
            className="hidden text-sm font-medium text-[#D9E2F3] transition-colors hover:text-white sm:inline"
          >
            Sample Work
          </a>
          <a
            href="#request-briefing"
            className="rounded-lg bg-[#E8A33D] px-4 py-2 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-[#f0b45f]"
          >
            Request Briefing
          </a>
        </nav>
      </header>

      {/* ── SECTION 1 — HERO (navy) ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">
              Xenco Labs · Infrastructure Advisory
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Site pipelines in.
              <br />
              Investable decisions out.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#C7D3E6]">
              Network feasibility, site intelligence, and origination for data
              center developers and operators. Every engagement ends in a ranked
              recommendation and a go/no-go with supporting rationale — a
              decision document, not a scoring matrix.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#request-briefing"
                className="rounded-lg bg-[#E8A33D] px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-[#f0b45f]"
              >
                Request an Executive Briefing
              </a>
              <a
                href="#overview-video"
                className="rounded-lg border border-[#3B5C8F]/60 px-6 py-3.5 text-sm font-semibold text-[#D9E2F3] transition-colors hover:border-[#E8A33D] hover:text-white"
              >
                Watch the 60-Second Overview ▸
              </a>
            </div>
          </div>
          <div id="overview-video" className="scroll-mt-24">
            <VideoEmbed />
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — THE PROBLEM (light) ── */}
      {/* Density-map background removed per brief: the provided asset has a
          baked-in navy fill, so object-fit:contain renders a hard rectangle on
          this light section at every breakpoint. "Visible or absent, never
          smeared" → absent. A transparent-background map could be reintroduced. */}
      <section className="bg-[#F2F5FB] text-[#1F3864]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            The wall every developer hits
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#3A4A63]">
            Enormous site pipelines. Sophisticated screening. And no deal to show
            for it. Screening built to eliminate will always answer “none of
            them” — while competitors close on imperfect-but-workable sites and
            committed capital sits idle. More analysis doesn’t fix it, because
            analysis isn’t the bottleneck. The decision is.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <StatCard
              value="“None of them”"
              label="what elimination-first screening always concludes"
            />
            <StatCard
              value="3–5 sites"
              label="what an executive can actually decide between"
            />
            <StatCard
              value="1 question"
              label="which sites can we act on, at what cost, with what tradeoffs"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — WHAT WE DELIVER (navy) ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Four engagements. One standard: built to be decided on.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              n: '01',
              title: 'Market Screening',
              per: 'Per state or region.',
              body: 'Ranked A/B/C sub-markets, zoning and moratorium landscape, hyperscaler activity, top counties to pursue.',
              timeline: 'Delivered in 2 weeks.',
            },
            {
              n: '02',
              title: 'Site Pre-Qualification',
              per: 'Per site.',
              body: 'Carrier validation, true-diversity confirmation, dual-path routing design, construction and interconnection cost modeling, go/no-go recommendation.',
              timeline: 'Delivered in 30 days.',
            },
            {
              n: '03',
              title: 'Full Feasibility',
              per: 'Per site.',
              body: 'On-site work, carrier negotiations, right-of-way validation, execution roadmap.',
              timeline: '60–90 days, scoped per site.',
            },
            {
              n: '04',
              title: 'Site Origination',
              per: 'We source and pre-screen off-market opportunities matched to your acquisition criteria.',
              body: '',
              timeline: 'Available within an active advisory engagement.',
            },
          ].map((c) => (
            <div
              key={c.n}
              className="rounded-2xl border border-[#3B5C8F]/40 bg-[#0E2647] p-7"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-semibold text-[#E8A33D]">
                  {c.n}
                </span>
                <h3 className="text-xl font-semibold text-white">{c.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#C7D3E6]">
                {c.per}
              </p>
              {c.body && (
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  {c.body}
                </p>
              )}
              <p className="mt-4 text-sm font-medium text-[#D9E2F3]">
                {c.timeline}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[#94A3B8]">
          <span className="font-semibold text-[#D9E2F3]">
            Pre-construction engineering — geotechnical, structural, MEP — is
            intentionally outside our practice.
          </span>{' '}
          At that stage we scope and coordinate Tetra Tech-class firms, so you
          engage the right specialist at the right time.
        </p>
      </section>

      {/* ── SECTION 4 — SAMPLE WORK (light) ── */}
      <section
        id="sample-work"
        className="scroll-mt-20 bg-[#F2F5FB] text-[#1F3864]"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Read a complete assessment
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3A4A63]">
              A full Tier 2 Site Pre-Qualification, prepared for a data center
              developer evaluating a greenfield site in Missouri: dual-path
              routing design, carrier landscape, construction cost projections,
              and the go/no-go recommendation on page one.
            </p>
            <a
              href={SAMPLE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#E8A33D] px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-[#f0b45f]"
            >
              Download the Sample Assessment (PDF)
            </a>
            <p className="mt-3 text-xs text-[#6B7A93]">
              No email required. 152 KB PDF.
            </p>
          </div>
          {/* Fanned page thumbnails from the sample assessment */}
          <div className="relative mx-auto h-80 w-full max-w-md">
            {[
              { src: '/advisory/sample-thumb-3.webp', rot: 'rotate-6', z: 'z-10', x: 'translate-x-8' },
              { src: '/advisory/sample-thumb-2.webp', rot: '-rotate-3', z: 'z-20', x: 'translate-x-2' },
              { src: '/advisory/sample-thumb-1.webp', rot: 'rotate-0', z: 'z-30', x: '-translate-x-4' },
            ].map((t) => (
              <div
                key={t.src}
                className={`absolute left-1/2 top-2 ${t.z} ${t.x} ${t.rot} -translate-x-1/2`}
              >
                <Image
                  src={t.src}
                  alt="Sample assessment page"
                  width={240}
                  height={311}
                  className="rounded-md border border-[#94A3B8]/40 shadow-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — METHOD (navy) ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Four phases. Thirty days. One answer.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: '01',
              title: 'Site Intelligence',
              body: 'Fiber presence, carrier footprints, infrastructure gaps, distances to carrier hotels.',
            },
            {
              n: '02',
              title: 'Carrier Analysis',
              body: 'Dark fiber, lit services, WDM capability, provider stability.',
            },
            {
              n: '03',
              title: 'Route Engineering',
              body: 'Dual-path design, construction partners, cost and timeline.',
            },
            {
              n: '04',
              title: 'Viability Report',
              body: 'Ranked providers, cost projections, go/no-go with rationale.',
            },
          ].map((p) => (
            <div key={p.n} className="border-t-2 border-[#E8A33D]/70 pt-4">
              <div className="text-sm font-semibold text-[#E8A33D]">{p.n}</div>
              <h3 className="mt-1 text-lg font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-[#C7D3E6]">
          <span className="font-semibold text-white">
            AI-accelerated, experience-directed.
          </span>{' '}
          Our tooling compresses research time; forty years on the carrier side
          of these transactions directs it. That’s the difference between a
          report that eliminates sites and a report a CEO can act on.
        </p>
      </section>

      {/* ── SECTION 6 — PRINCIPALS (light) ── */}
      <section className="bg-[#F2F5FB] text-[#1F3864]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Principal-led. No handoffs.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {[
              {
                photo: '/advisory/xenophon-giannis.webp',
                name: 'Xenophon Giannis',
                role: 'Co-Founder & CEO',
                bio: 'Two decades in network infrastructure sales and operations. Executive Director of Sales, AboveNet Pacific Region — built a $22M+ regional business across metro Ethernet, long-haul, IP transit, wavelengths, and colocation. Direct partnership history with Equinix, Digital Realty, CoreSite, DuPont Fabros, and Vantage.',
              },
              {
                photo: '/advisory/laurie-shahin.webp',
                name: 'Laurie Shahin',
                role: 'Co-Founder & Chief Partnerships Officer',
                bio: 'Fifteen-plus years leading data center channel sales: AboveNet, Telx, INAP, Evoque, QuadraNet, and ValorC3 Data Centers (VP, Channel & Alliances). Direct responsibility for AI infrastructure requirements and enterprise colocation.',
              },
            ].map((person) => (
              <div key={person.name} className="flex gap-5">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={112}
                  height={112}
                  className="h-24 w-24 flex-shrink-0 rounded-xl object-cover object-top sm:h-28 sm:w-28"
                />
                <div>
                  <h3 className="text-xl font-semibold">{person.name}</h3>
                  <p className="text-sm font-medium text-[#3B5C8F]">
                    {person.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#3A4A63]">
                    {person.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl border-l-2 border-[#E8A33D] pl-5 text-sm leading-relaxed text-[#3A4A63]">
            Our principals worked together at AboveNet Communications — one of
            the premier fiber infrastructure companies of its era, later acquired
            by Zayo Group.
          </p>
        </div>
      </section>

      {/* ── SECTION 7 — HOW WE WORK (navy) ── */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          How we work
        </h2>
        <ul className="mt-8 space-y-5">
          {[
            'Engagements begin with a working session with executive leadership — we take the mandate from the source.',
            'Deliverables are tiered opportunity lists and go/no-go recommendations. We do not produce disqualification lists.',
            'Both principals work every engagement. No handoffs.',
          ].map((line) => (
            <li key={line} className="flex gap-4">
              <span
                aria-hidden
                className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#E8A33D]"
              />
              <span className="text-lg leading-relaxed text-[#C7D3E6]">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── SECTION 8 — FINAL CTA (navy, centered) ── */}
      <section
        id="request-briefing"
        className="scroll-mt-16 border-t border-[#3B5C8F]/25 bg-[#0B1F3A]"
      >
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Fifteen minutes tells us both whether we’re a fit.
          </h2>
          <div className="mt-10">
            <BriefingCta />
          </div>
          <p className="mt-8 text-sm leading-relaxed text-[#94A3B8]">
            {PRINCIPALS.map((p, i) => (
              <span key={p.name}>
                {i > 0 && (
                  <span className="mx-2 hidden text-[#3B5C8F] sm:inline">|</span>
                )}
                {i > 0 && <br className="sm:hidden" />}
                <span className="text-[#D9E2F3]">{p.name}</span> · {p.title}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── Footer (minimal) ── */}
      <footer className="border-t border-[#3B5C8F]/25">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Image
            src="/advisory/wordmark-white.png"
            alt="Xenco Labs"
            width={120}
            height={24}
            className="h-5 w-auto"
          />
          <div className="flex items-center gap-6 text-sm text-[#94A3B8]">
            <span>© {new Date().getFullYear()} Xenco Labs, Inc.</span>
            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
