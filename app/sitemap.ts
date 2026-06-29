import type { MetadataRoute } from "next";

const BASE_URL = "https://xencolabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/apps",
    "/services",
    "/about",
    "/blog",
    "/contact",
    "/support",
    "/privacy",
    "/terms",
    "/entrepreneurs",
    "/agencies",
    "/enterprise",
    "/consulting",
    "/apps/blogcraft",
    "/apps/landingcraft",
    "/apps/resumecoach",
    "/apps/mcpforge",
    "/apps/promptmarketer",
  ];

  // Client-side developer tools migrated into public/tools/. No trailing slash
  // to match Next's canonical (trailingSlash=false) and the 200-serving URL.
  const toolRoutes = [
    "/tools",
    "/tools/base64",
    "/tools/case-converter",
    "/tools/clipboard-sanitizer",
    "/tools/csv-json",
    "/tools/curl-httpie",
    "/tools/curl-to-fetch",
    "/tools/fetch-axios",
    "/tools/hash",
    "/tools/http-status",
    "/tools/json-formatter",
    "/tools/jwt-decode",
    "/tools/regex-tester",
    "/tools/text-diff",
    "/tools/timestamp",
    "/tools/url-encode",
    "/tools/uuid",
    "/tools/yaml-json",
  ];

  return [...routes, ...toolRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1.0
        : route.startsWith("/apps")
          ? 0.8
          : route.startsWith("/tools")
            ? 0.5
            : 0.6,
  }));
}
