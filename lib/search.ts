import { z } from "zod"
import { Meilisearch } from "meilisearch"

// Meilisearch is the primary search backend. If MEILISEARCH_HOST is set we
// search Meili directly; otherwise we fall back to the Payload CMS
// /api/articles endpoint with a title/excerpt match.
const CMS_URL = (process.env.CMS_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || "").replace(/\/+$/, "")
const CMS_API_KEY = process.env.CMS_API_KEY || ""
const MEILI_HOST = (process.env.MEILISEARCH_HOST || "").replace(/\/+$/, "")
const MEILI_KEY = process.env.MEILISEARCH_API_KEY || ""
const MEILI_INDEX = process.env.MEILISEARCH_ARTICLES_INDEX || "articles"
const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG || ""

const SearchHit = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional().default(""),
  publishedDate: z.string().optional(),
  publishedAt: z.string().optional(),
  site: z.any().optional(),
  categories: z.any().optional(),
  author: z.any().optional(),
  featuredImage: z.any().optional(),
  status: z.enum(["draft", "published"]).optional(),
})

export type SearchHit = z.infer<typeof SearchHit>

const SearchResponse = z.object({
  hits: z.array(SearchHit),
  query: z.string().optional().default(""),
  processingTimeMs: z.number().optional(),
  estimatedTotalHits: z.number().optional(),
})

export type SearchResponse = z.infer<typeof SearchResponse>

function getMeiliClient() {
  if (!MEILI_HOST) return null
  try {
    return new Meilisearch({ host: MEILI_HOST, apiKey: MEILI_KEY || undefined })
  } catch {
    return null
  }
}

export async function checkMeilisearchHealth(): Promise<{ status: "available" | "unavailable" | "unconfigured"; error?: string }> {
  const client = getMeiliClient()
  if (!client) return { status: "unconfigured" }
  try {
    const health = await client.health()
    return { status: health.status as "available" | "unavailable" }
  } catch (e: any) {
    return { status: "unavailable", error: e?.message || "Unknown error" }
  }
}

export async function searchArticles(
  query: string,
  opts: { limit?: number; offset?: number; filter?: string } = {},
): Promise<SearchResponse> {
  const q = (query || "").trim()
  if (!q) return { hits: [], query: "" }

  // 1) Prefer Meilisearch if configured
  const meili = getMeiliClient()
  if (meili) {
    try {
      const limit = opts.limit ?? 10
      const offset = opts.offset ?? 0

      // Meilisearch stores site as a flat string field, not a nested object.
      // Filtering on site keeps this frontend a single-site consumer.
      const siteFilter = SITE_SLUG ? `site = "${SITE_SLUG}"` : ""
      const finalFilter = [siteFilter, opts.filter].filter(Boolean).join(" AND ")

      const results = await meili.index(MEILI_INDEX).search(q, {
        limit,
        offset,
        filter: finalFilter || undefined,
        attributesToRetrieve: [
          "id",
          "title",
          "slug",
          "excerpt",
          "publishedDate",
          "site",
          "categories",
          "author",
          "featuredImage",
        ],
        attributesToHighlight: ["title", "excerpt"],
      })

      const parsed = SearchResponse.safeParse({
        hits: results.hits,
        query: results.query,
        processingTimeMs: results.processingTimeMs,
        estimatedTotalHits: (results as any).estimatedTotalHits,
      })

      if (parsed.success) return parsed.data

      const hits = Array.isArray((results as any)?.hits) ? (results as any).hits : []
      return { hits, query: q, processingTimeMs: results.processingTimeMs, estimatedTotalHits: (results as any).estimatedTotalHits }
    } catch {
      return { hits: [], query: q }
    }
  }

  // 2) Fallback: query Payload articles directly with a title/excerpt match.
  if (!CMS_URL) throw new Error("Search is not configured: neither MEILISEARCH_HOST nor CMS_URL is set")

  const limit = opts.limit ?? 10
  const offset = opts.offset ?? 0
  const url = new URL(CMS_URL + "/api/articles")
  url.searchParams.set("where[or][0][title][like]", q)
  url.searchParams.set("where[or][1][excerpt][like]", q)
  url.searchParams.set("where[status][equals]", "published")
  if (SITE_SLUG) url.searchParams.set("where[site.slug][equals]", SITE_SLUG)
  url.searchParams.set("depth", "1")
  url.searchParams.set("limit", String(limit))
  url.searchParams.set("page", String(Math.floor(offset / limit) + 1))
  url.searchParams.set("sort", "-publishedAt")

  const res = await fetch(url.toString(), {
    headers: CMS_API_KEY ? { Authorization: `users API-Key ${CMS_API_KEY}` } : undefined,
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    throw new Error(`Search fallback: Payload articles query failed ${res.status}`)
  }

  const json = (await res.json()) as { docs?: unknown[]; totalDocs?: number }
  const hits = (json.docs || []).flatMap((doc) => {
    const parsed = SearchHit.safeParse(doc)
    return parsed.success ? [parsed.data] : []
  })
  return { hits, query: q, estimatedTotalHits: json.totalDocs }
}
