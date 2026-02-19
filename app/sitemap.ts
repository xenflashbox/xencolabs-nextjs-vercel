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

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/apps") ? 0.8 : 0.6,
  }));
}
