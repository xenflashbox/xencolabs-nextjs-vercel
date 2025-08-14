# C1 SDK Integration (Archived)

This directory contains archived files related to the C1 SDK integration that was temporarily disabled due to compatibility issues with Next.js App Router.

## Files

- `c1-sdk-wrapper.tsx`: A wrapper component that attempts to load the real C1 SDK and falls back to a mock implementation
- `c1-mock.tsx`: A mock implementation of the C1Chat component
- `c1-sdk-types.d.ts`: TypeScript type definitions for the C1 SDK

## Reimplementing the C1 SDK

To reimplement the C1 SDK integration:

1. Move these files back to the `lib/` directory
2. Update the imports in `app/labs/c1/page.tsx` to use the C1 SDK wrapper
3. Ensure the `NEXT_PUBLIC_THESYS_API_KEY` environment variable is set
4. Update `next.config.mjs` to include the necessary webpack configuration for the SDK

## Known Issues

The C1 SDK integration was disabled due to React hydration errors (#130) that were breaking the application. These issues were related to the SDK's compatibility with Next.js App Router and server components.

Potential solutions to explore:
- Use `next/dynamic` with `ssr: false` to load the component only on the client side
- Ensure all browser-only code runs in useEffect hooks
- Add explicit suspense boundaries
- Consider using the Pages Router instead of App Router for this specific feature
