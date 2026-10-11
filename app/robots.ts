import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Presentation deployment: no sitemap, nothing to list. Crawling stays allowed so crawlers can
  // read the noindex meta + X-Robots-Tag on every page (a Disallow would hide the noindex).
  if (process.env.NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT) {
    return { rules: [{ userAgent: "*", allow: "/" }] };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/sign-in", "/sign-up", "/api/", "/lp/", "/os/", "/os-media/", "/p/", "/admin"],
      },
    ],
    sitemap: "https://xencolabs.com/sitemap.xml",
  };
}
