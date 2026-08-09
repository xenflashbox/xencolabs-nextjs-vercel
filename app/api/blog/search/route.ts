import { NextRequest, NextResponse } from "next/server"
import { searchArticles, checkMeilisearchHealth } from "@/lib/search"

/**
 * GET /api/blog/search?q=<query>&limit=10&offset=0&category=<slug>
 *
 * Server-side search proxy used by client components. Searches the
 * Meilisearch `articles` index, filtered to site = "xencolabs" inside
 * lib/search.ts. Read-only consumer — index config lives in Payload.
 *
 * Health check: /api/blog/search?health=true
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  if ((url.searchParams.get("health") || "").toLowerCase() === "true") {
    const health = await checkMeilisearchHealth()
    return NextResponse.json({ success: true, status: "ok", meilisearch: health })
  }

  const q = (url.searchParams.get("q") || "").trim()
  const limit = Number(url.searchParams.get("limit") || "10")
  const offset = Number(url.searchParams.get("offset") || "0")
  const category = (url.searchParams.get("category") || "").trim()

  if (!q) return NextResponse.json({ error: "Missing required parameter: q" }, { status: 400 })

  const filter = category ? `categories.slug = "${category}"` : undefined
  const results = await searchArticles(q, { limit, offset, filter })
  return NextResponse.json({ success: true, ...results, hits: results.hits || [] })
}
