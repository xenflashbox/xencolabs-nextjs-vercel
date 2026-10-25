# Prospect demo site standard

## Where demos live

- Customer demos use `https://preview.xencolabs.com/{tenant-slug}`.
- Nemesis Fire keeps its current customer-facing URL at `https://xencolabs.com/nemesis-fire`.
- The preview hostname is an alias on the existing Xenco Labs Vercel project. Host-aware routing keeps prospect tenants off the corporate hostname. Do not move the hostname to a new Vercel project or publish from Vercel directly.
- Create and deploy through the connected GitHub repository and its `main` branch.

## Reusable build path

A normal demo starts from the existing tenant system:

1. Verify the business name, public phone, service area, services, and claims against its own website and source assets.
2. Add the tenant profile, real logo and photos, vertical pack, and only the workflow configuration the business can actually demonstrate.
3. Use the shared customer site and office screens. Keep the customer homepage focused on the business and its service request or call action; the dashboard and field workflow stay inside Office.
4. Generate a tenant-specific 1200×630 share card from the tenant's real photo, name, color, service area, and phone. Keep the image route public and test it without cookies so Messages can fetch it.
5. Gate Office and technician tools with the existing demo token. Keep customer pages and the OG image public. Never point one customer's phone CTA at another customer's agent.
6. Run the tenant through the live URL: check the homepage and internal links, the logo and mobile crop, all hero/service images, the call link, the OG image response, and the Office entry flow.

New screens are for workflows that materially differ from an existing vertical, such as Nemesis Fire's inspection report. For the next customer, add the tenant data and vertical/report module first; do not fork a second website.

## Jackson's Paving

Jackson's uses the commercial paving vertical and the existing tenant profile at `lib/local-os/tenants/jacksons-paving.ts`. Its public site uses the supplied company photos, orange and charcoal palette, real office phone, and public service facts. Its old shared AI phone CTA pointed to the Nemesis Fire assistant, so that CTA is disabled until a Jackson-specific assistant exists. Office demo screens remain available behind the preview token.
