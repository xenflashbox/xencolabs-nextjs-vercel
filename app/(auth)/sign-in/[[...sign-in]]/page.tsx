// apps/xencolabs/app/sign-in/[[...sign-in]]/page.tsx
import { headers } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import SignInClientWrapper from "./SignInClientWrapper";

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
  const host = raw.replace(/^https?:\/\//, "").replace(/^www\./, "");
  const key = host.split(".")[0].toLowerCase();
  return key;
}

export default async function SignInPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ from?: string; redirect_url?: string }> 
}) {
  const params = await searchParams;
  const { userId } = await auth();
  const redirectUrl = params?.redirect_url;
  
  let key = normalizeFrom(params?.from);

  if (!key) {
    const headersList = await headers();
    const ref = headersList.get("referer") || headersList.get("referrer");
    key = normalizeFrom(ref);
  }

  if (!key && redirectUrl) {
    key = normalizeFrom(redirectUrl);
  }

  const brand = (key && BRANDS[key]) || BRANDS.default;

  // Pass auth state and redirect URL to client component
  return (
    <SignInClientWrapper 
      brand={brand} 
      redirectUrl={redirectUrl} 
      isAuthenticated={!!userId}
    />
  );
}
