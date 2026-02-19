# Satellite Domain Clerk Configuration Template

## For Each Satellite Domain (resumecoach.me, blogcraft.app, etc.)

### 1. Update app/layout.tsx on satellite:

```tsx
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Point to primary domain for auth
  const primarySignInUrl = 'https://xencolabs.com/sign-in'
  const primarySignUpUrl = 'https://xencolabs.com/sign-up'

  return (
    <html lang="en">
      <body>
        <ClerkProvider
          isSatellite
          domain={(url) => url.host}
          signInUrl={primarySignInUrl}
          signUpUrl={primarySignUpUrl}
        >
          <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
              <div className="font-semibold text-xl">Satellite App</div>
              <nav className="flex items-center gap-6">
                <SignedOut>
                  {/* CRITICAL: Use SignInButton or absolute links, NOT local /sign-in */}
                  <SignInButton mode="modal">
                    <button className="btn">Sign In</button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </nav>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
```

### 2. Update middleware.ts on satellite:

```tsx
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'

const isPublicRoute = createRouteMatcher(['/'])

const options = {
  isSatellite: true,
  signInUrl: 'https://xencolabs.com/sign-in',
  signUpUrl: 'https://xencolabs.com/sign-up',
  domain: 'https://[SATELLITE_DOMAIN]', // Replace with actual domain
}

// FIXED: Do NOT use auth.protect() - it doesn't exist
export default clerkMiddleware((auth, req: NextRequest) => {
  // For public routes, allow access
  if (isPublicRoute(req)) {
    return
  }
  
  // For protected routes, check authentication
  const { userId } = auth()
  if (!userId) {
    // Redirect to primary domain for sign-in
    return auth().redirectToSignIn()
  }
}, options)

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

### 3. Environment Variables on Each Satellite:

Ensure each satellite domain has the same Clerk environment variables:

```env
CLERK_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
CLERK_SECRET_KEY=sk_test_... (or sk_live_...)
```

### 4. Domain Configuration in Clerk Dashboard:

For each satellite domain, make sure to:

1. Go to Clerk Dashboard � Configure � Domains
2. Add each satellite domain (resumecoach.me, blogcraft.app, etc.)
3. Set xencolabs.com as the primary domain
4. Enable satellite domain configuration

### 5. Specific Configurations by Domain:

#### For resumecoach.me:
```tsx
const options = {
  isSatellite: true,
  signInUrl: 'https://xencolabs.com/sign-in',
  signUpUrl: 'https://xencolabs.com/sign-up',
  domain: 'https://resumecoach.me',
}
```

#### For blogcraft.app:
```tsx
const options = {
  isSatellite: true,
  signInUrl: 'https://xencolabs.com/sign-in',
  signUpUrl: 'https://xencolabs.com/sign-up',
  domain: 'https://blogcraft.app',
}
```

#### For landingcraft.app:
```tsx
const options = {
  isSatellite: true,
  signInUrl: 'https://xencolabs.com/sign-in',
  signUpUrl: 'https://xencolabs.com/sign-up',
  domain: 'https://landingcraft.app',
}
```

#### For promptmarketer.app:
```tsx
const options = {
  isSatellite: true,
  signInUrl: 'https://xencolabs.com/sign-in',
  signUpUrl: 'https://xencolabs.com/sign-up',
  domain: 'https://promptmarketer.app',
}
```

#### For blogcraft.org:
```tsx
const options = {
  isSatellite: true,
  signInUrl: 'https://xencolabs.com/sign-in',
  signUpUrl: 'https://xencolabs.com/sign-up',
  domain: 'https://blogcraft.org',
}
```

#### For reresume.app:
```tsx
const options = {
  isSatellite: true,
  signInUrl: 'https://xencolabs.com/sign-in',
  signUpUrl: 'https://xencolabs.com/sign-up',
  domain: 'https://reresume.app',
}
```

## 🚨 CRITICAL REQUIREMENTS FROM CLERK SUPPORT:

1. **ClerkProvider MUST be inside `<body>`, not wrapping `<html>`**
   - ❌ WRONG: `<ClerkProvider><html>...`
   - ✅ CORRECT: `<html><body><ClerkProvider>...`

2. **DO NOT use local `/sign-in` links on satellites**
   - ❌ WRONG: `<Link href="/sign-in">Sign In</Link>`
   - ✅ CORRECT: Use `<SignInButton />` or absolute links to primary

3. **DO NOT use `auth.protect()` - it doesn't exist**
   - ❌ WRONG: `await auth.protect()`
   - ✅ CORRECT: Use `const { userId } = auth()` and `auth().redirectToSignIn()`

4. **Pick ONE apex style and use consistently**
   - Either `xencolabs.com` OR `www.xencolabs.com`
   - Do NOT mix both

5. **Add safety redirect pages on satellites**

## Key Points:

1. **Primary Domain (xencolabs.com)**: 
   - Uses explicit `signInUrl` and `signUpUrl` properties
   - Lists all satellites in `allowedRedirectOrigins`
   - Does NOT use `isSatellite` property
   - ClerkProvider MUST be inside `<body>`

2. **Satellite Domains**: 
   - Must use `isSatellite: true`
   - Must specify the correct `domain` property
   - Must point `signInUrl` and `signUpUrl` to primary domain
   - Use `domain={(url) => url.host}` in layout for dynamic domain detection
   - ClerkProvider MUST be inside `<body>`
   - Use SignInButton or absolute links only

3. **Environment Variables**: 
   - Same CLERK keys across all domains
   - Properties method works IN ADDITION to env vars

4. **Testing**:
   - User visits satellite domain
   - Gets redirected to xencolabs.com for auth
   - After auth, gets redirected back to satellite
   - Should maintain authenticated state on satellite

## Troubleshooting:

If authentication still fails:
1. Check Clerk Dashboard � Configure � Domains
2. Verify all domains are properly added
3. Ensure environment variables are identical
4. Check browser console for CORS errors
5. Test auth flow: satellite � primary � back to satellite