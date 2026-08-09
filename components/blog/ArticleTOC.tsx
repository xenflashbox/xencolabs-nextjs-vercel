'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { slugify } from '@/lib/slugify'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TOCSection {
  heading: TOCItem
  children: TOCItem[]
}

interface ArticleTOCProps {
  // Lexical article body ({ root: { children } }) or a flat Slate node array.
  content?: unknown
  className?: string
}

type Node = {
  type?: string
  tag?: string
  text?: string
  children?: Node[]
}

function nodeText(node: Node): string {
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(nodeText).join('')
  return ''
}

function headingLevel(node: Node): number {
  const type = node.type || ''
  if (type === 'h2') return 2
  if (type === 'h3') return 3
  if (type === 'heading') {
    if (node.tag === 'h2') return 2
    if (node.tag === 'h3') return 3
  }
  return 0
}

function extractHeadings(content: unknown): TOCItem[] {
  let nodes: Node[] = []
  if (Array.isArray(content)) nodes = content as Node[]
  else if (content && typeof content === 'object' && 'root' in content) {
    const root = (content as { root?: { children?: Node[] } }).root
    nodes = root?.children || []
  }
  const items: TOCItem[] = []
  for (const node of nodes) {
    const level = headingLevel(node)
    if (!level) continue
    const text = nodeText(node).trim()
    if (text) items.push({ id: slugify(text), text, level })
  }
  return items
}

export function ArticleTOC({ content, className }: ArticleTOCProps) {
  const headings = useMemo(() => extractHeadings(content), [content])
  const [activeId, setActiveId] = useState<string>('')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-100px 0px -80% 0px' },
    )
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [headings])

  useEffect(() => {
    if (!activeId) return
    const activeHeading = headings.find((h) => h.id === activeId)
    if (!activeHeading || activeHeading.level !== 3) return
    const idx = headings.indexOf(activeHeading)
    for (let i = idx - 1; i >= 0; i--) {
      if (headings[i].level === 2) {
        const parentId = headings[i].id
        setExpandedSections((prev) => {
          const next = new Set(prev)
          next.add(parentId)
          return next
        })
        break
      }
    }
  }, [activeId, headings])

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }, [])

  const sections: TOCSection[] = []
  for (const heading of headings) {
    if (heading.level === 2) sections.push({ heading, children: [] })
    else if (heading.level === 3 && sections.length > 0) sections[sections.length - 1].children.push(heading)
  }

  if (sections.length < 2) return null

  return (
    <nav className={cn('rounded-xl border border-slate-800 bg-slate-900/50 p-4', className)}>
      <h3 className="mb-3 text-sm font-semibold text-white">On This Page</h3>
      <ul className="space-y-0.5">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.heading.id)
          const isActive = activeId === section.heading.id
          const hasActiveChild = section.children.some((c) => c.id === activeId)
          const hasChildren = section.children.length > 0

          return (
            <li key={section.heading.id}>
              <div className="flex items-start gap-1">
                <a
                  href={`#${section.heading.id}`}
                  className={cn(
                    'block flex-1 py-1.5 text-[13px] leading-snug transition-colors',
                    isActive || hasActiveChild ? 'font-semibold text-brand-primary-light' : 'text-slate-400 hover:text-white',
                  )}
                >
                  {section.heading.text}
                </a>
                {hasChildren && (
                  <button
                    onClick={() => toggleSection(section.heading.id)}
                    className="mt-1.5 flex-shrink-0 p-0.5 text-slate-500 transition-colors hover:text-slate-300"
                    aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                  >
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', isExpanded && 'rotate-180')} />
                  </button>
                )}
              </div>
              {hasChildren && (
                <ul className={cn('overflow-hidden transition-all duration-200 ease-out', isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')}>
                  {section.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        className={cn(
                          'block border-l border-slate-800 py-1 pl-3 text-xs leading-snug transition-colors',
                          activeId === child.id ? 'border-l-brand-primary-light font-medium text-brand-primary-light' : 'text-slate-500 hover:text-slate-300',
                        )}
                      >
                        {child.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
