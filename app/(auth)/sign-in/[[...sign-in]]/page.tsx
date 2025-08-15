// apps/xencolabs/app/sign-in/page.tsx
import { SignIn as ClerkSignIn } from '@clerk/nextjs'

const BRANDS: Record<string, { name: string; color: string; tagline: string }> = {
  resumecoach:     { name: 'ResumeCoach.me',   color: '#2563eb', tagline: 'Welcome to the ResumeCoach area of the Xenco Labs ecosystem.' },
  promptmarketer:  { name: 'PromptMarketer',   color: '#10b981', tagline: 'Welcome to PromptMarketer by Xenco Labs.' },
  landingcraft:    { name: 'LandingCraft',     color: '#7c3aed', tagline: 'Welcome to LandingCraft by Xenco Labs.' },
  blogcraft:       { name: 'BlogCraft',        color: '#06b6d4', tagline: 'Welcome to BlogCraft by Xenco Labs.' },
  default:         { name: 'Xenco Labs',       color: '#111827', tagline: 'Welcome to the Xenco Labs ecosystem.' },
}

export default function SignInPage({
  searchParams,
}: {
  searchParams: { from?: string }
}) {
  const key = Array.isArray(searchParams.from) ? searchParams.from[0] : searchParams.from
  const brand = (key && BRANDS[key]) || BRANDS.default

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-50">
      {/* Background / header you control */}
      <header className="w-full max-w-3xl mb-6 px-6 text-center">
        <h1 className="text-2xl font-bold">{brand.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">{brand.tagline}</p>
      </header>

      {/* Clerk's SignIn with per-brand theme */}
      <ClerkSignIn
        appearance={{
          variables: { colorPrimary: brand.color },
          elements: {
            // Optional: tweak card styling
            card: 'shadow-xl border',
            headerTitle: 'text-xl',
          },
        }}
        // Keep routing path stable
        routing="path"
        path="/sign-in"
        // Use afterSignUpUrl to direct to sign-up with the from param
        afterSignUpUrl={`/sign-up${key ? `?from=${key}` : ''}`}
      />
    </div>
  )
}
