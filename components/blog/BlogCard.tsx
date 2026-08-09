'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Category {
  id: string | number
  title?: string
  name?: string
  slug: string
}

export interface BlogCardProps {
  slug: string
  title: string
  excerpt?: string
  imageUrl?: string
  categories?: Category[]
  publishedDate?: string
  readTime?: number
  variant?: 'default' | 'featured' | 'horizontal' | 'minimal'
  className?: string
}

export function BlogCard({
  slug,
  title,
  excerpt,
  imageUrl,
  categories,
  publishedDate,
  readTime,
  variant = 'default',
  className,
}: BlogCardProps) {
  const hasImage = imageUrl && imageUrl !== '/placeholder-blog.jpg'
  const hasCategories = categories && categories.length > 0
  const href = `/blog/${slug}` as Route
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  if (variant === 'minimal') {
    return (
      <Link href={href} className={cn('group flex gap-4 rounded-lg p-3 transition-colors hover:bg-slate-800/50', className)}>
        {hasImage && (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={imageUrl!} alt={title} fill className="object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="line-clamp-2 font-medium text-white transition-colors group-hover:text-brand-primary-light">{title}</h4>
          {formattedDate && <p className="mt-1 text-sm text-slate-500">{formattedDate}</p>}
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={href}
        className={cn(
          'group flex flex-col gap-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700 hover:bg-slate-900 sm:flex-row sm:gap-6',
          className,
        )}
      >
        <div className="relative aspect-[16/10] w-full flex-shrink-0 sm:aspect-square sm:w-48 md:w-64">
          {hasImage ? (
            <Image src={imageUrl!} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-brand-primary to-cta-primary" />
          )}
        </div>
        <div className="flex-1 p-4 sm:py-4 sm:pl-0 sm:pr-4">
          {hasCategories && (
            <div className="mb-2 flex gap-2">
              {categories?.slice(0, 2).map((cat) => (
                <span key={String(cat.id)} className="text-xs font-semibold uppercase tracking-wider text-brand-primary-light">
                  {cat.title || cat.name}
                </span>
              ))}
            </div>
          )}
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-brand-primary-light md:text-xl">{title}</h3>
          {excerpt && <p className="mb-3 line-clamp-2 text-sm text-slate-400">{excerpt}</p>}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            {formattedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readTime} min</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link href={href} className={cn('group relative block aspect-[16/10] overflow-hidden rounded-2xl md:aspect-[21/9]', className)}>
        {hasImage ? (
          <Image src={imageUrl!} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" priority />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-primary to-cta-primary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <h2 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-brand-primary-light md:text-3xl lg:text-4xl">{title}</h2>
          {excerpt && <p className="mb-4 line-clamp-2 max-w-2xl text-sm text-slate-300 md:text-base">{excerpt}</p>}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            {formattedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            )}
            <span className="inline-flex items-center gap-1 text-brand-primary-light transition-all group-hover:gap-2">
              Read more <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn('group block h-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700 hover:bg-slate-900', className)}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {hasImage ? (
          <Image src={imageUrl!} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-primary to-cta-primary" />
        )}
      </div>
      <div className="p-5">
        {hasCategories && (
          <div className="mb-3 flex gap-2">
            {categories?.slice(0, 2).map((cat) => (
              <span key={String(cat.id)} className="text-xs font-semibold uppercase tracking-wider text-brand-primary-light">
                {cat.title || cat.name}
              </span>
            ))}
          </div>
        )}
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-brand-primary-light">{title}</h3>
        {excerpt && <p className="mb-4 line-clamp-2 text-sm text-slate-400">{excerpt}</p>}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            {formattedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readTime} min</span>
              </div>
            )}
          </div>
          <ArrowRight className="h-4 w-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-brand-primary-light" />
        </div>
      </div>
    </Link>
  )
}
