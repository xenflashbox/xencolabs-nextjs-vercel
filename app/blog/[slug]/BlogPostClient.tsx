'use client'

import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import { Facebook, Tag, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react'
import { SourcesAccordion } from '@xenco/editorial-blocks'
import { RichText } from '@/components/richtext/RichText'
import { BlogPostHero } from '@/components/blog/BlogPostHero'
import { ArticleTOC } from '@/components/blog/ArticleTOC'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import {
  getMediaUrlOrNull,
  getTagLabel,
  getTagSlug,
  type Article,
  type Author,
} from '@/lib/payload-blog'

interface BlogPostClientProps {
  post: Article
  heroImageUrl: string
  author: Author | null
  formattedDate: string
  canonicalUrl: string
  readTime: number
  relatedPosts?: Article[]
}

export function BlogPostClient({
  post,
  heroImageUrl,
  author,
  formattedDate,
  canonicalUrl,
  readTime,
  relatedPosts = [],
}: BlogPostClientProps) {
  const [copied, setCopied] = useState(false)

  const categories = useMemo(
    () =>
      Array.isArray(post.categories)
        ? post.categories
            .filter((cat): cat is { id: string | number; title?: string; name?: string; slug: string } => typeof cat === 'object' && cat !== null)
            .map((cat) => ({ id: cat.id, title: cat.name || cat.title, name: cat.name, slug: cat.slug }))
        : [],
    [post.categories],
  )

  const transformedRelatedPosts = relatedPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    featuredImage: p.featuredImage,
    categories: Array.isArray(p.categories)
      ? p.categories
          .filter((cat): cat is { id: string | number; title?: string; name?: string; slug: string } => typeof cat === 'object' && cat !== null)
          .map((cat) => ({ id: cat.id, title: cat.name || cat.title, name: cat.name, slug: cat.slug }))
      : [],
    publishedDate: p.publishedDate || p.publishedAt || p.createdAt,
    readTime: p.readTime,
  }))

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`, '_blank')
  }
  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`, '_blank')
  }
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`, '_blank')
  }

  const sources = post.footer_sources || []
  const authorAvatar = author?.avatar ? getMediaUrlOrNull(author.avatar) : null

  return (
    <div className="editorial-scope min-h-screen bg-slate-950 text-white">
      <article className="pb-16">
        <BlogPostHero
          title={post.title}
          excerpt={post.excerpt}
          imageUrl={heroImageUrl}
          author={author}
          formattedDate={formattedDate}
          readTime={readTime}
          categories={categories}
          variant="blurred"
        />

        <div className="mx-auto mt-12 w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,760px)_minmax(280px,320px)] lg:justify-center">
            <div className="min-w-0 mx-auto w-full max-w-[760px] lg:mx-0">
              <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-8">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Share:</span>
                  <button onClick={shareOnTwitter} className="rounded-lg bg-slate-800/50 p-2 transition-colors hover:bg-slate-700" aria-label="Share on Twitter">
                    <Twitter className="h-4 w-4 text-slate-400" />
                  </button>
                  <button onClick={shareOnLinkedIn} className="rounded-lg bg-slate-800/50 p-2 transition-colors hover:bg-slate-700" aria-label="Share on LinkedIn">
                    <Linkedin className="h-4 w-4 text-slate-400" />
                  </button>
                  <button onClick={shareOnFacebook} className="rounded-lg bg-slate-800/50 p-2 transition-colors hover:bg-slate-700" aria-label="Share on Facebook">
                    <Facebook className="h-4 w-4 text-slate-400" />
                  </button>
                  <button onClick={copyLink} className="rounded-lg bg-slate-800/50 p-2 transition-colors hover:bg-slate-700" aria-label="Copy link">
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <LinkIcon className="h-4 w-4 text-slate-400" />}
                  </button>
                </div>
                <span className="text-sm text-slate-500">{readTime} min read</span>
              </div>

              {/* Lexical body — standard nodes + @xenco/editorial-blocks blocks */}
              <RichText data={post.content} />

              {/* Article-level sources (footer_sources) — package component */}
              {sources.length > 0 && (
                <div className="mt-12">
                  <SourcesAccordion sources={sources} />
                </div>
              )}

              {(() => {
                const validTags = (post.tags || [])
                  .map((item) => ({ label: getTagLabel(item).trim(), slug: getTagSlug(item).trim() }))
                  .filter((item) => item.label && item.slug)

                if (validTags.length === 0) return null
                return (
                  <div className="mt-12 border-t border-slate-800 pt-8">
                    <div className="mb-3 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-500">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {validTags.map((item, idx) => (
                        <Link key={idx} href={`/blog/tag/${item.slug}` as Route} className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300 transition-colors hover:bg-slate-700">
                          #{item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {author && (
                <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                  <div className="flex items-start gap-4">
                    {authorAvatar && (
                      <Image src={authorAvatar} alt={author.name} width={64} height={64} className="rounded-full ring-2 ring-slate-700" />
                    )}
                    <div>
                      <p className="mb-1 text-sm text-slate-500">Written by</p>
                      <h4 className="text-lg font-bold text-white">{author.name}</h4>
                      <p className="mt-1 text-sm text-slate-500">
                        Published {formattedDate} · {readTime} min read
                      </p>
                      {author.bio && <p className="mt-2 text-slate-400">{author.bio}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <ArticleTOC content={post.content} />
                {transformedRelatedPosts.length > 0 && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      More from the blog
                    </p>
                    <ul className="space-y-3">
                      {transformedRelatedPosts.slice(0, 5).map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/blog/${p.slug}` as Route}
                            className="block text-sm leading-snug text-slate-300 transition-colors hover:text-white"
                          >
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {transformedRelatedPosts.length > 0 && (
            <div className="mt-16 border-t border-slate-800 pt-16">
              <RelatedPosts
                posts={transformedRelatedPosts}
                title="You Might Also Like"
                subtitle="More from the Xenco Labs blog"
                variant="grid"
                showViewAll
                viewAllHref="/blog"
                viewAllLabel="Browse all articles"
              />
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
