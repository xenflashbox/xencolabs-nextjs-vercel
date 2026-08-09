'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { cn } from '@/lib/cn'
import { getMediaUrl, type Media } from '@/lib/payload-blog'

interface Author {
  id: string | number
  name: string
  bio?: string
  avatar?: Media | string
}

interface Category {
  id: string | number
  title?: string
  name?: string
  slug: string
}

export interface BlogPostHeroProps {
  title: string
  excerpt?: string
  imageUrl: string
  author?: Author | null
  formattedDate: string
  readTime?: number
  categories?: Category[]
  variant?: 'blurred' | 'gradient' | 'minimal'
}

export function BlogPostHero({
  title,
  excerpt,
  imageUrl,
  author,
  formattedDate,
  readTime,
  categories,
  variant = 'blurred',
}: BlogPostHeroProps) {
  const hasImage = imageUrl && imageUrl !== '/placeholder-blog.jpg'
  const hasCategories = categories && categories.length > 0

  if (variant === 'minimal') {
    return (
      <div className="container mx-auto px-4 pb-12 pt-8">
        <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
        {hasCategories && (
          <div className="mb-4 flex gap-2">
            {categories?.map((cat) => (
              <span key={String(cat.id)} className="rounded-full bg-brand-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary-light">
                {cat.title || cat.name}
              </span>
            ))}
          </div>
        )}
        <h1 className="mb-6 text-3xl font-bold md:text-5xl">{title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-slate-400">
          {author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium text-white">{author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'blurred') {
    return (
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 h-[60vh] overflow-hidden md:h-[70vh]">
          {hasImage ? (
            <>
              <Image src={imageUrl} alt={`${title} featured image background`} fill className="scale-110 object-cover opacity-60 blur-2xl" priority />
              <div className="absolute inset-0 bg-slate-950/70" />
            </>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-brand-navy via-brand-primary-dark to-slate-950" />
          )}
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-8">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex flex-col items-center gap-8 pb-16 lg:flex-row lg:gap-12">
            {hasImage && (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 lg:w-1/2">
                <Image src={imageUrl} alt={title} fill className="object-cover" priority />
              </div>
            )}

            <div className={cn('flex-1', !hasImage && 'mx-auto max-w-3xl text-center')}>
              {hasCategories && (
                <div className={cn('mb-4 flex gap-2', !hasImage && 'justify-center')}>
                  {categories?.map((cat) => (
                    <span key={String(cat.id)} className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      {cat.title || cat.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">{title}</h1>
              {excerpt && <p className="mb-6 text-lg leading-relaxed text-slate-300">{excerpt}</p>}

              <div className={cn('flex flex-wrap items-center gap-6 text-slate-400', !hasImage && 'justify-center')}>
                {author && (
                  <div className="flex items-center gap-3">
                    {author.avatar && (
                      <Image
                        src={getMediaUrl(author.avatar)}
                        alt={author.name}
                        width={40}
                        height={40}
                        className="rounded-full ring-2 ring-white/20"
                      />
                    )}
                    <span className="font-medium text-white">{author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                {readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{readTime} min read</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="relative h-[50vh] overflow-hidden md:h-[60vh]">
        {hasImage ? <Image src={imageUrl} alt={title} fill className="object-cover" priority /> : <div className="h-full w-full bg-gradient-to-br from-brand-primary to-cta-primary" />}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto -mt-40 px-4">
        <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {hasCategories && (
          <div className="mb-4 flex gap-2">
            {categories?.map((cat) => (
              <span key={String(cat.id)} className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {cat.title || cat.name}
              </span>
            ))}
          </div>
        )}

        <h1 className="mb-6 max-w-4xl text-3xl font-bold md:text-5xl">{title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-slate-400">
          {author && (
            <div className="flex items-center gap-3">
              {author.avatar && <Image src={getMediaUrl(author.avatar)} alt={author.name} width={40} height={40} className="rounded-full" />}
              <div>
                <span className="font-medium text-white">{author.name}</span>
                {author.bio && <p className="max-w-xs truncate text-sm text-slate-500">{author.bio}</p>}
              </div>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime} min read</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
