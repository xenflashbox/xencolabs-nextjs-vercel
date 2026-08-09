'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight } from 'lucide-react'
import { BlogCard } from './BlogCard'
import { getMediaUrl, type Media } from '@/lib/payload-blog'
import { cn } from '@/lib/cn'

interface Category {
  id: string | number
  title?: string
  name?: string
  slug: string
}

interface RelatedPost {
  id: string | number
  slug: string
  title: string
  excerpt?: string
  featuredImage?: Media | string
  categories?: Category[]
  publishedDate?: string
  publishedAt?: string
  createdAt?: string
  readTime?: number
}

export interface RelatedPostsProps {
  posts: RelatedPost[]
  title?: string
  subtitle?: string
  variant?: 'grid' | 'horizontal' | 'minimal'
  showViewAll?: boolean
  viewAllHref?: string
  viewAllLabel?: string
  className?: string
}

export function RelatedPosts({
  posts,
  title = 'Related Articles',
  subtitle,
  variant = 'grid',
  showViewAll = false,
  viewAllHref = '/blog',
  viewAllLabel = 'View all articles',
  className,
}: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  const getPostDate = (post: RelatedPost) => post.publishedDate || post.publishedAt || post.createdAt

  if (variant === 'minimal') {
    return (
      <div className={cn('', className)}>
        {title && <h3 className="mb-4 text-lg font-bold text-white">{title}</h3>}
        <div className="space-y-1">
          {posts.map((post) => (
            <BlogCard
              key={String(post.id)}
              slug={post.slug}
              title={post.title}
              imageUrl={getMediaUrl(post.featuredImage)}
              publishedDate={getPostDate(post)}
              variant="minimal"
            />
          ))}
        </div>
        {showViewAll && (
          <Link href={viewAllHref as Route} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary-light transition-colors hover:text-white">
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className={cn('', className)}>
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
            {subtitle && <p className="mt-2 text-slate-400">{subtitle}</p>}
          </div>
        )}
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogCard
              key={String(post.id)}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              imageUrl={getMediaUrl(post.featuredImage)}
              categories={post.categories}
              publishedDate={getPostDate(post)}
              readTime={post.readTime}
              variant="horizontal"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className={cn('', className)}>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>}
          {subtitle && <p className="mt-2 text-slate-400">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard
            key={String(post.id)}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            imageUrl={getMediaUrl(post.featuredImage)}
            categories={post.categories}
            publishedDate={getPostDate(post)}
            readTime={post.readTime}
            variant="default"
          />
        ))}
      </div>
      {showViewAll && (
        <div className="mt-8 text-center">
          <Link href={viewAllHref as Route} className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-700">
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  )
}
