# AER Site — Magic Link Generator Admin Page
# Priority: HIGH — needed before Laurie starts prospect outreach

## What to build

A protected admin page at `/admin/tokens` where authorized users can generate per-recipient magic links through a web form. No CLI access required.

## Route

```
app/(admin)/admin/tokens/page.tsx
app/(admin)/admin/tokens/layout.tsx
app/api/admin/generate-token/route.ts
```

## Access control

The `/admin/tokens` page must be password-protected. Use a simple approach:

- Hardcode an admin password in the environment: `ADMIN_PASSWORD=<strong-random-string>`
- The page shows a password prompt on first visit
- On correct password, set a session cookie or sessionStorage flag
- This is internal tooling, not customer-facing — a simple password gate is sufficient

## The page UI

```
┌─────────────────────────────────────────────┐
│                                             │
│   🔑 Magic Link Generator                  │
│   Generate per-recipient access links       │
│                                             │
│   Recipient Name                            │
│   [andre-weiglein              ]            │
│   Lowercase, hyphens only. This is how      │
│   they'll appear in access logs.            │
│                                             │
│   Deck                                      │
│   ( ) Xenco Strategy Pitch (/pitch)         │
│   (•) Services Deck (/services-pitch)       │
│                                             │
│   Expires In                                │
│   [30] days                                 │
│                                             │
│   [ Generate Link ]                         │
│                                             │
│   ─────────────────────────────────────     │
│                                             │
│   ✅ Link generated:                        │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │ https://aer-worldwide.com/services  │   │
│   │ -pitch?k=eyJyIjoiYW5kcmUtd2VpZ... │   │
│   └─────────────────────────────────────┘   │
│                                             │
│   [ 📋 Copy to Clipboard ]                  │
│                                             │
│   Recipient: andre-weiglein                 │
│   Deck: /services-pitch                     │
│   Expires: June 19, 2026                    │
│                                             │
│   ─────────────────────────────────────     │
│                                             │
│   Recent Links (this session)               │
│                                             │
│   andre-weiglein → /services-pitch          │
│   Expires Jun 19 · [ 📋 Copy ]             │
│                                             │
│   prospect-metro-health → /services-pitch   │
│   Expires May 20 · [ 📋 Copy ]             │
│                                             │
└─────────────────────────────────────────────┘
```

## API route: `/api/admin/generate-token`

```typescript
// app/api/admin/generate-token/route.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  if (!TOKEN_SECRET || !ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Server configuration missing' },
      { status: 500 }
    );
  }

  try {
    const { recipient, type, expiryDays, adminPassword } = await req.json();

    // Verify admin password
    if (adminPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate inputs
    if (!recipient || typeof recipient !== 'string') {
      return NextResponse.json(
        { error: 'Recipient is required' },
        { status: 400 }
      );
    }

    const slug = recipient.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (!slug || slug.length > 64) {
      return NextResponse.json(
        { error: 'Invalid recipient slug' },
        { status: 400 }
      );
    }

    if (type !== 'pitch' && type !== 'services-pitch') {
      return NextResponse.json(
        { error: 'Type must be "pitch" or "services-pitch"' },
        { status: 400 }
      );
    }

    const days = parseInt(expiryDays) || 30;
    if (days < 1 || days > 365) {
      return NextResponse.json(
        { error: 'Expiry must be between 1 and 365 days' },
        { status: 400 }
      );
    }

    // Generate token (same logic as CLI script)
    const expiryMs = Date.now() + days * 24 * 60 * 60 * 1000;
    const payload = { r: slug, t: type, e: expiryMs };
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const sig = crypto
      .createHmac('sha256', TOKEN_SECRET)
      .update(payloadB64)
      .digest('base64url');
    const token = `${payloadB64}.${sig}`;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aer-worldwide.com';
    const route = type === 'pitch' ? 'pitch' : 'services-pitch';
    const magicLink = `${baseUrl}/${route}?k=${token}`;

    // Log the generation event
    console.log(JSON.stringify({
      event: 'magic_link_generated',
      recipient: slug,
      type,
      expiresAt: new Date(expiryMs).toISOString(),
      generatedAt: new Date().toISOString(),
    }));

    return NextResponse.json({
      magicLink,
      recipient: slug,
      type,
      route: `/${route}`,
      expiresAt: new Date(expiryMs).toISOString(),
      expiryDays: days,
    });
  } catch (err) {
    console.error('Token generation error:', err);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
```

## Page component: `/admin/tokens/page.tsx`

Build as a client component ('use client'). Key behaviors:

1. **Password gate on load:** Check sessionStorage for `admin_authenticated`. If not present, show a password input. On submit, store the password in component state (needed for API calls) and set the sessionStorage flag.

2. **Form with validation:**
   - Recipient: text input, auto-slugified on blur (lowercase, hyphens). Show the cleaned slug below the input in grey so they see exactly what will appear in logs.
   - Deck: radio buttons — "Xenco Strategy Pitch (/pitch)" and "Services Deck (/services-pitch)"
   - Expiry: number input, default 30, min 1, max 365. Show the computed expiration date below.

3. **Generate button:** POSTs to `/api/admin/generate-token` with the form data + the admin password from state.

4. **Result display:** Show the magic link in a monospace box with a "Copy to Clipboard" button. Use `navigator.clipboard.writeText()`. Show confirmation: recipient, deck, expiration date.

5. **Session history:** Keep a list of generated links in component state (not persisted — just for the current browser session). Show them below the generator form so Laurie can scroll back and copy a link she generated earlier in the same session.

## Layout

Use the existing pitch layout pattern (own `<html>` tag, no chatbot, no site nav). Simple, dark background, centered card. No AER branding — this is internal Xenco tooling.

Metadata:
```
title: 'Link Generator — Xenco Labs'
robots: { index: false, follow: false }
```

## Environment variables

Add to `.env.local` and Vercel production:
```
ADMIN_PASSWORD=<generate with: openssl rand -hex 16>
```

## Security notes

- The admin password travels in the POST body over HTTPS — acceptable for internal tooling
- The page is not linked from any navigation — you access it by typing the URL directly
- robots noindex prevents search indexing
- The password gate uses sessionStorage, so closing the browser requires re-authentication
- The API route validates the admin password on every generation request, not just on page load
- Generated tokens are logged in Vercel Function Logs with `event: "magic_link_generated"` for audit trail

## Testing

1. Open `https://aer-worldwide.com/admin/tokens` — password prompt appears
2. Enter wrong password — rejected
3. Enter correct password — generator form appears
4. Generate a test token for `test-user` / `services-pitch` / 1 day
5. Copy the magic link, open in incognito — deck loads, no gate
6. Check Vercel logs — both `magic_link_generated` and `magic_link_access` events visible
7. Generate a second token — both appear in the session history list

## Files created

| File | Purpose |
|---|---|
| `app/(admin)/admin/tokens/page.tsx` | Token generator UI |
| `app/(admin)/admin/tokens/layout.tsx` | Admin layout (no chrome) |
| `app/api/admin/generate-token/route.ts` | Server-side token generation |

## Files modified

| File | Change |
|---|---|
| `.env.local` | Add `ADMIN_PASSWORD` |
| Vercel env vars | Add `ADMIN_PASSWORD` |
