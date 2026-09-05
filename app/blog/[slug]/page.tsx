import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  DEFAULT_BLOG_PLACEHOLDER,
  estimateReadTime,
  getArticleBySlug,
  getArticlePublishedDate,
  getMediaUrl,
  getMediaUrlOrNull,
  getRelatedPosts,
  categorySlugsOf,
  type Article,
  type Author,
} from '@/lib/payload-blog'
import { BlogPostClient } from './BlogPostClient'

interface PageProps {
  params: { slug: string }
}

// The CMS is auth-gated and reached at request time — never prerender.
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://xencolabs.com'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getArticleBySlug(params.slug)
  if (!post) return { title: 'Post Not Found | Xenco Labs' }

  const title = post.seo?.title || post.metaTitle || post.title
  const description = post.seo?.description || post.metaDescription || post.excerpt || ''
  const ogImage =
    getMediaUrlOrNull(post.seo?.ogImage) ?? getMediaUrlOrNull(post.featuredImage) ?? undefined
  const canonical = `${SITE_URL}/blog/${post.slug}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: ogImage ? [{ url: ogImage, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

// ── FAQ JSON-LD ────────────────────────────────────────────────────────────
// NOTE: FAQPage schema.org JSON-LD is emitted by the @xenco/editorial-blocks
// `Faq` component itself (co-located with the rendered block, so the structured
// data can never drift from what's shown). This page used to hand-roll a second
// FAQPage from the Lexical body per the old setup guide, but the package caught
// up — emitting both put two FAQPage blocks on the page. The hand-rolled version
// was removed; the package is the single source of truth.

function buildArticleJsonLd(post: Article, canonicalUrl: string): string {
  const published = getArticlePublishedDate(post)
  const image = getMediaUrlOrNull(post.featuredImage) ?? getMediaUrlOrNull(post.heroImage)
  const authorName = typeof post.author === 'object' && post.author ? post.author.name : 'Xenco Labs'
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt || '',
    image: image ? [image] : [],
    datePublished: published || undefined,
    dateModified: post.updatedAt || published || undefined,
    author: { '@type': 'Organization', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: 'Xenco Labs',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon-192.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getArticleBySlug(params.slug)
  if (!post) notFound()

  const heroImageUrl =
    getMediaUrlOrNull(post.heroImage) ??
    getMediaUrlOrNull(post.featuredImage) ??
    DEFAULT_BLOG_PLACEHOLDER

  const author: Author | null = typeof post.author === 'object' ? post.author : null
  const published = getArticlePublishedDate(post)
  const readTime = post.readTime || estimateReadTime(post.content, `${post.title} ${post.excerpt || ''}`)
  const formattedDate = published
    ? new Date(published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Recently published'

  const relatedPosts = await getRelatedPosts({
    currentSlug: post.slug,
    categorySlugs: categorySlugsOf(post),
    limit: 4,
  })

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`
  const articleJsonLd = buildArticleJsonLd(post, canonicalUrl)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <BlogPostClient
        post={post}
        heroImageUrl={heroImageUrl}
        author={author}
        formattedDate={formattedDate}
        canonicalUrl={canonicalUrl}
        readTime={readTime}
        relatedPosts={relatedPosts}
      />
    </>
  )
}
