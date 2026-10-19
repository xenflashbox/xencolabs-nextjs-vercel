import Link from "next/link";
import {
  ArrowRight,
  Code2,
  FileText,
  LifeBuoy,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export const metadata = {
  title: "Support",
  description:
    "Find the right Xenco Labs support contact and the details to include so we can understand your question.",
};

const supportEmail = "xen@xencolabs.com";
const developerEmail = "dev@xencolabs.com";
const privacyEmail = "privacy@xencolabs.com";

const supportCards = [
  {
    icon: LifeBuoy,
    eyebrow: "PRODUCTS & SERVICES",
    title: "Account or product help",
    body: "Questions about signing in, using a Xenco Labs product, billing, or a service we provide?",
    link: `mailto:${supportEmail}?subject=Xenco%20Labs%20Support`,
    label: "Email Xenco Labs",
  },
  {
    icon: Code2,
    eyebrow: "DEVELOPERS",
    title: "Technical and integration questions",
    body: "For API, developer access, and integration questions, contact our technical team.",
    link: `mailto:${developerEmail}?subject=Technical%20Support`,
    label: "Contact technical support",
  },
  {
    icon: ShieldCheck,
    eyebrow: "PRIVACY",
    title: "Privacy or personal-data request",
    body: "For questions about personal information or a privacy request, contact our privacy address.",
    link: `mailto:${privacyEmail}?subject=Privacy%20Request`,
    label: "Email the privacy team",
  },
];

export default function SupportPage() {
  return (
    <MarketingLayout>
      <div className="relative overflow-hidden bg-[#0B1F3A] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,163,61,0.14),transparent_42%)]"
        />
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 sm:pb-28 sm:pt-36">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#E8A33D]">
              Xenco Labs support
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Let’s get you to the right place.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Tell us what you need help with and choose the contact that fits.
              A few details about the product and the issue will help us
              understand your question.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {supportCards.map(({ icon: Icon, eyebrow, title, body, link, label }) => (
              <article
                key={title}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 backdrop-blur-sm"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8A33D]/15 text-[#E8A33D]">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-400">
                  {eyebrow}
                </p>
                <h2 className="mt-3 text-xl font-semibold">{title}</h2>
                <p className="mt-3 flex-1 leading-7 text-slate-300">{body}</p>
                <a
                  href={link}
                  className="mt-7 inline-flex items-center gap-2 font-semibold text-[#E8A33D] transition hover:text-amber-300"
                >
                  {label}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <FileText aria-hidden="true" className="h-5 w-5 text-[#E8A33D]" />
                <h2 className="text-xl font-semibold">Help us understand the issue</h2>
              </div>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                Include the product or service, the email address on the account
                if relevant, what you expected, what happened, and any exact
                error message. Screenshots and your browser or device can also
                help.
              </p>
            </div>
            <div className="rounded-xl border border-amber-300/20 bg-[#E8A33D]/10 p-4 text-sm leading-6 text-amber-50">
              Please don’t email passwords, API keys, payment-card details, or
              other sensitive information.
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <Link className="transition hover:text-white" href="/terms">
              Terms of Service
            </Link>
            <Link className="transition hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            <a
              className="inline-flex items-center gap-2 transition hover:text-white"
              href={`mailto:${supportEmail}?subject=Xenco%20Labs%20Support`}
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {supportEmail}
            </a>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
