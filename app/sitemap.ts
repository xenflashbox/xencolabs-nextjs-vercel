import type { MetadataRoute } from "next";
import { fetchPublishedArticles, getArticlePublishedDate } from "@/lib/payload-blog";

const BASE_URL = "https://xencolabs.com";

// CMS-backed sitemap data is fetched at request time and cached by the data layer.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/apps",
    "/services",
    "/services/managed-search-content",
    "/services/local-service-business-os",
    "/portfolio/sonoma-wash-co",
    "/search-function-review",
    "/portfolio",
    "/compareitad",
    "/growth",
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
    "/advisory",
    "/websites",
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

  const staticEntries: MetadataRoute.Sitemap = [...routes, ...toolRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1.0
        : route === "/compareitad"
          ? 0.85
          : route.startsWith("/apps")
            ? 0.8
            : route.startsWith("/tools")
              ? 0.5
              : 0.6,
  }));

  const articles = await fetchPublishedArticles();
  const articleEntries = articles.map((article) => {
    const lastUpdated = article.updatedAt || getArticlePublishedDate(article);
    const parsedDate = lastUpdated ? new Date(lastUpdated) : undefined;

    return {
      url: `${BASE_URL}/blog/${article.slug}`,
      ...(parsedDate && !Number.isNaN(parsedDate.getTime()) ? { lastModified: parsedDate } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [...staticEntries, ...articleEntries];
}
