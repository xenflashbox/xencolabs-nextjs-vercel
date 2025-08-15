# Satellite Domain Clerk Configuration Template

## For Each Satellite Domain (resumecoach.me, blogcraft.app, etc.)

### 1. Update app/layout.tsx on satellite:

```tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Point to primary domain for auth
  const primarySignInUrl = 'https://xencolabs.com/sign-in'
  const primarySignUpUrl = 'https://xencolabs.com/sign-up'

  return (
    <ClerkProvider
      isSatellite
      domain={(url) => url.host}
      signInUrl={primarySignInUrl}
      signUpUrl={primarySignUpUrl}
    >
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
```

### 2. Update middleware.ts on satellite:

```tsx
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/'])

const options = {
  isSatellite: true,
  signInUrl: 'https://xencolabs.com/sign-in',
  signUpUrl: 'https://xencolabs.com/sign-up',
  domain: 'https://[SATELLITE_DOMAIN]', // Replace with actual domain
}

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return
  await auth.protect()
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

1. Go to Clerk Dashboard ’ Configure ’ Domains
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

## Key Points:

1. **Primary Domain (xencolabs.com)**: 
   - Uses explicit `signInUrl` and `signUpUrl` properties
   - Lists all satellites in `allowedRedirectOrigins`
   - Does NOT use `isSatellite` property

2. **Satellite Domains**: 
   - Must use `isSatellite: true`
   - Must specify the correct `domain` property
   - Must point `signInUrl` and `signUpUrl` to primary domain
   - Use `domain={(url) => url.host}` in layout for dynamic domain detection

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
1. Check Clerk Dashboard ’ Configure ’ Domains
2. Verify all domains are properly added
3. Ensure environment variables are identical
4. Check browser console for CORS errors
5. Test auth flow: satellite ’ primary ’ back to satellite