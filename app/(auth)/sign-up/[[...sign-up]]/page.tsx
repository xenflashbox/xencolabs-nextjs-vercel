// apps/xencolabs/app/sign-up/[[...sign-up]]/page.tsx
import { SignUp as ClerkSignUp } from "@clerk/nextjs";
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

const BRANDS: Record<string, { name: string; color: string; tagline: string }> = {
  resumecoach:    { name: "ResumeCoach.me", color: "#2563eb", tagline: "Welcome to the ResumeCoach area of the Xenco Labs ecosystem." },
  promptmarketer: { name: "PromptMarketer", color: "#10b981", tagline: "Welcome to PromptMarketer by Xenco Labs." },
  landingcraft:   { name: "LandingCraft",   color: "#7c3aed", tagline: "Welcome to LandingCraft by Xenco Labs." },
  blogcraft:      { name: "BlogCraft",      color: "#06b6d4", tagline: "Welcome to BlogCraft by Xenco Labs." },
  default:        { name: "Xenco Labs",     color: "#111827", tagline: "Welcome to the Xenco Labs ecosystem." },
};

function normalizeFrom(from?: string | string[] | null) {
  const raw = Array.isArray(from) ? from[0] : from;
  if (!raw) return null;
  // turn "landingcraft.app" or "https://landingcraft.app" into "landingcraft"
  const host = raw.replace(/^https?:\/\//, "").replace(/^www\./, "");
  const key = host.split(".")[0].toLowerCase();
  return key;
}

export default function SignUpPage({ searchParams }: { searchParams: { from?: string; redirect_url?: string } }) {
  // 1) Use explicit ?from=... if present
  let key = normalizeFrom(searchParams?.from);
  
  // 2) Fallback to Referer host if not provided
  if (!key) {
    const ref = headers().get("referer") || headers().get("referrer");
    key = normalizeFrom(ref);
  }
  
  // 3) Also try to extract brand from redirect_url
  if (!key && searchParams?.redirect_url) {
    key = normalizeFrom(searchParams.redirect_url);
  }

  const brand = (key && BRANDS[key]) || BRANDS.default;

  // Get the redirect URL from query params - this is where satellite domains send users back to
  const redirectUrl = searchParams?.redirect_url;

  console.log("[signup]", { from: searchParams?.from ?? null, key, ref: headers().get("referer"), redirect_url: redirectUrl });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-50">
      <header className="w-full max-w-3xl mb-6 px-6 text-center">
        <h1 className="text-2xl font-bold">{brand.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">{brand.tagline}</p>
      </header>

      <ClerkSignUp
        appearance={{
          variables: { colorPrimary: brand.color },
          elements: { card: "shadow-xl border", headerTitle: "text-xl" },
        }}
        routing="path"
        path="/sign-up"
        forceRedirectUrl={redirectUrl}
        fallbackRedirectUrl={redirectUrl || "/dashboard"}
      />
    </div>
  );
}
