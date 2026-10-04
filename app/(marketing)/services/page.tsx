import Link from "next/link";
import { Route } from "next";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Managed Search & Content Intelligence",
    price: "$20,000/mo enterprise program",
    body:
      "SEO, AEO/GEO, keyword intelligence, technical recommendations, BlogCraft production, ScoreCraft QA, conversion paths, and executive reporting operated as one managed function.",
    href: "/services/managed-search-content",
    cta: "View the Program",
    featured: true,
  },
  {
    title: "Digital Growth Strategy",
    price: "Starting at $10,000/mo",
    body:
      "We retool the digital sales funnel: messaging, landing pages, conversion paths, content strategy, lead capture, and measurement.",
    href: "/growth",
    cta: "See Growth Strategy",
  },
  {
    title: "Websites & Landing Pages",
    price: "From $900 one-time",
    body:
      "Fast, modern websites and conversion pages for companies that need a credible online presence and a cleaner path to leads.",
    href: "/websites",
    cta: "Build Your Site",
  },
  {
    title: "AI Applications & Automation",
    price: "Scoped by engagement",
    body:
      "Custom apps, agents, MCP integrations, workflows, dashboards, and internal tools built from the same stack we use for our own products.",
    href: "/contact",
    cta: "Discuss a Build",
  },
];

export default function Page() {
  return (
    <section className="section-light pt-32 pb-20 px-6">
      <div className="max-w-content mx-auto">
        <div className="max-w-3xl mb-12">
          <p className="label-text text-[var(--brand-primary)] mb-4">SERVICES</p>
          <h1 className="font-display font-bold text-5xl text-[var(--text-primary)] mb-6 leading-tight">
            We build the tools. We operate the system.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body leading-relaxed">
            Xenco Labs combines proprietary AI products, search intelligence,
            content operations, conversion strategy, and hands-on execution into
            managed services for companies that need growth infrastructure now.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`card ${service.featured ? "border-[var(--brand-primary)] border-opacity-40 relative" : ""}`}
            >
              {service.featured && (
                <span className="absolute -top-3 left-6 bg-[var(--cta-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Enterprise Focus
                </span>
              )}
              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-3 mt-1">
                {service.title}
              </h3>
              <p className="text-sm font-mono font-bold text-[var(--text-primary)] mb-4">
                {service.price}
              </p>
              <p className="text-[var(--text-secondary)] font-body leading-relaxed mb-6">
                {service.body}
              </p>
              <Link href={service.href as Route} className="btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2">
                {service.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
