# Xenco Labs — Next.js + Clerk + Neon + C1 SDK Starter

A clean, production-ready Next.js App Router project for **centralized auth** (Clerk), **Edge**
APIs with **Neon Postgres**, and an optional **C1 SDK** lab page. Built from your previous React
site content as a *fresh* Next.js app (no migration of legacy code).

## Quick Start

```bash
pnpm i   # or npm/yarn
cp .env.example .env.local  # fill in keys
pnpm dev
```

- Visit `/sign-in` to test Clerk
- Hit `/api/health` to verify Neon Edge connectivity
- Browse `/apps` and `/services` for marketing pages
- Try `/labs/c1` once `NEXT_PUBLIC_THESYS_API_KEY` is set

## Configure Clerk (Primary + Satellites)

1. In **Clerk Dashboard → Domains**, set your **primary** domain (e.g. `www.xencolabs.com`).
2. Add **Satellite domains** (e.g. `resumecoach.me`, `blogcraft.app`, `promptmarketer.app`, `landingcraft.app`).
3. Set the following paths in **JWT/Redirects** on the primary app:
   - Sign In URL: `/sign-in`
   - Sign Up URL: `/sign-up`
   - After Sign In: `/dashboard`
   - After Sign Up: `/dashboard`
4. On **satellite** apps, set the environment variables in Vercel (or your host):
   - `CLERK_IS_SATELLITE=true`
   - `CLERK_DOMAIN=www.xencolabs.com` (your primary)
   - Optional `CLERK_PROXY_URL=https://clerk.xencolabs.com` if using a proxy subdomain.
5. Deploy primary first, then satellites. All satellites will redirect to primary for auth.

> See Clerk’s Next.js App Router quickstart for the latest snippets.
> https://clerk.com/docs/quickstarts/nextjs

## Neon + Vercel Edge

- Edge route at `/api/health` uses the Neon serverless driver over HTTP.
- Set `DATABASE_URL` to your Neon connection string with `sslmode=require`.
- This route declares `export const runtime = "edge"` to ensure Edge execution.

> Neon docs: https://neon.com/docs/serverless/serverless-driver

## C1 SDK (Thesys) — Optional

- This project includes a minimal C1 chat page at `/labs/c1`.
- Set `NEXT_PUBLIC_THESYS_API_KEY` in `.env.local` to enable it.
- Replace the default props with your preferred `title`, `instructions`, and tools.

> GenUI docs: https://docs.thesys.dev/react-reference/c1-standalone

## Auth Protection

- `middleware.ts` protects `/dashboard` and descendants. Expand `isProtectedRoute`
  as needed.
- The root layout includes `<ClerkProvider />` and shows `<UserButton />` when signed in.

## Deploy to Vercel

1. Create a new Vercel project, import this repo/folder.
2. Add the environment variables from `.env.example` (real keys).
3. Deploy **production** on your primary domain first.
4. Add the satellites as separate Vercel projects using the same repo or
   as frameworks with `CLERK_IS_SATELLITE=true` and `CLERK_DOMAIN` set.

## Notes

- TailwindCSS is included for quick styling.
- This is a *fresh* app using your content as guidance; no legacy React routing or code.
- Feel free to move marketing routes into a `(marketing)` segment (already scaffolded).

---

Made for Xenco Labs.
# xencolabs-nextjs-vercel
