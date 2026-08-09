// Payload blog data layer for Xenco Labs.
//
// Mirrors compareitad's lib/payload.ts data flow and auth exactly:
//   - Article bodies live in Payload as Lexical JSON and are AUTH-GATED.
//     Anonymous requests to /api/articles return blank, so every read is
//     sent with `Authorization: users API-Key <CMS_API_KEY>`.
//   - Multi-tenant: every query is scoped to NEXT_PUBLIC_SITE_SLUG so this
//     frontend only ever sees its own site's ("xencolabs") articles.

const CMS_URL = (process.env.CMS_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || "").replace(/\/+$/, "")
const CMS_API_KEY = process.env.CMS_API_KEY
const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG || "xencolabs"

export const DEFAULT_BLOG_PLACEHOLDER = "/placeholder-blog.jpg"

export interface Media {
  id?: string | number
  url?: string
  alt?: string
  width?: number
  height?: number
}

export interface Author {
  id: string | number
  name: string
  bio?: string
  avatar?: Media | string
}

export interface Category {
  id: string | number
  title?: string
  name?: string
  slug: string
}

export interface Tag {
  id?: string | number
  title?: string
  name?: string
  slug?: string
}

export interface ArticleFooterSource {
  title: string
  publisher?: string
  url: string
  date?: string
  quote_context?: string
}

export interface Article {
  id: string | number
  slug: string
  title: string
  excerpt?: string
  content?: unknown
  featuredImage?: Media | string
  heroImage?: Media | string
  author?: Author | string
  categories?: Array<Category | string>
  tags?: Array<Tag | string>
  footer_sources?: ArticleFooterSource[]
  status?: "draft" | "published"
  publishedAt?: string
  publishedDate?: string
  createdAt?: string
  updatedAt?: string
  readTime?: number
  metaTitle?: string | null
  metaDescription?: string | null
  seo?: {
    title?: string
    description?: string
    ogImage?: Media | string
  }
}

interface PayloadListResponse<T> {
  docs: T[]
  totalDocs?: number
}

function withAuth(init: RequestInit = {}): RequestInit {
  if (!CMS_API_KEY) return init
  return {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `users API-Key ${CMS_API_KEY}`,
    },
  }
}

async function fetchJSON<T>(
  path: string,
  params?: Record<string, string>,
  revalidateSeconds = 60,
): Promise<T> {
  if (!CMS_URL) throw new Error("CMS_URL is not configured")
  const url = new URL(CMS_URL + path)
  if (params) for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url.toString(), {
    ...withAuth(),
    next: { revalidate: revalidateSeconds },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Payload fetch failed ${res.status}: ${text}`)
  }
  return res.json()
}

export function getMediaUrl(media?: Media | string | null): string {
  if (!media) return DEFAULT_BLOG_PLACEHOLDER
  if (typeof media === "string") {
    if (media.startsWith("http")) return media
    if (media.startsWith("/")) return `${CMS_URL}${media}`
    return media
  }
  if (media.url) {
    if (media.url.startsWith("http")) return media.url
    if (media.url.startsWith("/")) return `${CMS_URL}${media.url}`
    return media.url
  }
  return DEFAULT_BLOG_PLACEHOLDER
}

export function getMediaUrlOrNull(media?: Media | string | null): string | null {
  if (!media) return null
  const url = getMediaUrl(media)
  return url === DEFAULT_BLOG_PLACEHOLDER ? null : url
}

export function getArticlePublishedDate(article: Article): string {
  return article.publishedAt || article.publishedDate || article.createdAt || ""
}

export function getTagLabel(tag: Tag | string): string {
  if (typeof tag === "string") return tag
  return tag.name || tag.title || ""
}

export function getTagSlug(tag: Tag | string): string {
  if (typeof tag === "string") return tag.trim().toLowerCase().replace(/\s+/g, "-")
  return tag.slug || getTagLabel(tag).trim().toLowerCase().replace(/\s+/g, "-")
}

export function estimateReadTime(source?: unknown, fallbackText = ""): number {
  const wordsPerMinute = 200
  let text = fallbackText
  if (typeof source === "string") {
    text = `${text} ${source}`
  } else if (source && typeof source === "object") {
    text = `${text} ${JSON.stringify(source)}`
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

function categorySlugsOf(article: Article): string[] {
  if (!Array.isArray(article.categories)) return []
  return article.categories
    .map((c) => (typeof c === "object" && c ? c.slug : ""))
    .filter(Boolean) as string[]
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const params: Record<string, string> = {
      "where[slug][equals]": slug,
      "where[status][equals]": "published",
      "where[site.slug][equals]": SITE_SLUG,
      depth: "2",
      limit: "1",
      sort: "-publishedAt",
    }
    const data = await fetchJSON<PayloadListResponse<Article>>("/api/articles", params, 60)
    return data.docs?.[0] || null
  } catch {
    return null
  }
}

export async function fetchLatestArticles(opts: { limit?: number } = {}): Promise<Article[]> {
  try {
    const params: Record<string, string> = {
      "where[status][equals]": "published",
      "where[site.slug][equals]": SITE_SLUG,
      depth: "1",
      limit: String(opts.limit ?? 24),
      sort: "-publishedAt",
    }
    const data = await fetchJSON<PayloadListResponse<Article>>("/api/articles", params, 60)
    return data.docs || []
  } catch {
    return []
  }
}

export async function getRelatedPosts(opts: {
  currentSlug: string
  categorySlugs?: string[]
  limit?: number
}): Promise<Article[]> {
  const limit = opts.limit ?? 4
  try {
    const params: Record<string, string> = {
      "where[status][equals]": "published",
      "where[site.slug][equals]": SITE_SLUG,
      "where[slug][not_equals]": opts.currentSlug,
      depth: "1",
      limit: String(limit),
      sort: "-publishedAt",
    }
    const cats = (opts.categorySlugs || []).filter(Boolean)
    cats.forEach((slug, i) => {
      params[`where[categories.slug][in][${i}]`] = slug
    })
    const data = await fetchJSON<PayloadListResponse<Article>>("/api/articles", params, 120)
    return data.docs || []
  } catch {
    return []
  }
}

export { categorySlugsOf }
