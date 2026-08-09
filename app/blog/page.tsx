import type { Metadata } from 'next'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { BlogCard } from '@/components/blog/BlogCard'
import {
  fetchLatestArticles,
  getArticlePublishedDate,
  getMediaUrlOrNull,
  type Article,
} from '@/lib/payload-blog'

// The CMS is auth-gated and reached at request time — never prerender.
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://xencolabs.com'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Field notes on AI product building, shipping to production, and the Xenco Labs studio.',
  alternates: { canonical: `${SITE_URL}/blog` },
}

function toCardCategories(article: Article) {
  return Array.isArray(article.categories)
    ? article.categories
        .filter((c): c is { id: string | number; title?: string; name?: string; slug: string } => typeof c === 'object' && c !== null)
        .map((c) => ({ id: c.id, title: c.name || c.title, name: c.name, slug: c.slug }))
    : []
}

export default async function BlogIndexPage() {
  const articles = await fetchLatestArticles({ limit: 24 })
  const [featured, ...rest] = articles

  return (
    <MarketingLayout>
      <div className="editorial-scope min-h-screen bg-slate-950 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary-light">
              Xenco Labs
            </p>
            <h1 className="text-4xl font-bold text-white md:text-5xl">The Blog</h1>
            <p className="mt-4 text-lg text-slate-400">
              Field notes on building AI products, shipping to production, and the studio behind them.
            </p>
          </header>

          {articles.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
              <h2 className="text-xl font-semibold text-white">No articles yet</h2>
              <p className="mt-2 text-slate-400">
                We&rsquo;re writing. Check back soon for the first posts.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-6xl space-y-12">
              {featured && (
                <BlogCard
                  slug={featured.slug}
                  title={featured.title}
                  excerpt={featured.excerpt}
                  imageUrl={getMediaUrlOrNull(featured.featuredImage) ?? undefined}
                  categories={toCardCategories(featured)}
                  publishedDate={getArticlePublishedDate(featured)}
                  readTime={featured.readTime}
                  variant="featured"
                />
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article) => (
                    <BlogCard
                      key={String(article.id)}
                      slug={article.slug}
                      title={article.title}
                      excerpt={article.excerpt}
                      imageUrl={getMediaUrlOrNull(article.featuredImage) ?? undefined}
                      categories={toCardCategories(article)}
                      publishedDate={getArticlePublishedDate(article)}
                      readTime={article.readTime}
                      variant="default"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MarketingLayout>
  )
}
