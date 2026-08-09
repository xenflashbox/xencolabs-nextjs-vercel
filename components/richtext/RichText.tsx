import React from "react"
import { EditorialBlock } from "@xenco/editorial-blocks"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/slugify"

// Flatten the visible text of a Lexical/Slate node so headings can carry a
// stable slug id that the on-page TOC anchors resolve against.
function nodeText(node: any): string {
  if (!node) return ""
  if (typeof node.text === "string") return node.text
  if (Array.isArray(node.children)) return node.children.map(nodeText).join("")
  return ""
}

function headingId(node: any): string | undefined {
  const text = nodeText(node).trim()
  return text ? slugify(text) : undefined
}

// Flatten a Lexical rich-text value ({root}/{children}/array) to plain text.
function richTextToPlain(value: any): string {
  if (!value) return ""
  if (typeof value === "string") return value
  if (value.root?.children) return value.root.children.map(nodeText).join("")
  if (Array.isArray(value.children)) return value.children.map(nodeText).join("")
  if (Array.isArray(value)) return value.map(nodeText).join("")
  return nodeText(value)
}

// Lexical node renderer
function renderLexicalNode(node: any, index: number): React.ReactNode {
  if (!node) return null

  // Text node
  if (node.type === "text" || (!node.type && node.text)) {
    let content: React.ReactNode = node.text || ""
    if (node.format) {
      // Handle formatting flags: bold=1, italic=2, underline=8, code=16
      if (node.format & 1) content = <strong key={`b-${index}`}>{content}</strong>
      if (node.format & 2) content = <em key={`i-${index}`}>{content}</em>
      if (node.format & 8) content = <u key={`u-${index}`}>{content}</u>
      if (node.format & 16) content = <code key={`c-${index}`} className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-blue-300">{content}</code>
    }
    return content
  }

  // Get children content
  const children = node.children?.map((child: any, i: number) => renderLexicalNode(child, i))

  // Lexical headings use type="heading" + tag="h2"; SlateJS imports use flat
  // "h1"/"h2" types. Normalise to a tag so we can style + id consistently.
  const headingTag =
    node.type === "heading" ? node.tag :
    node.type === "h1" || node.type === "h2" || node.type === "h3" || node.type === "h4" ? node.type :
    undefined

  if (headingTag) {
    const id = headingId(node)
    switch (headingTag) {
      case "h1":
        return <h1 key={index} id={id} className="mb-4 mt-8 scroll-mt-24 text-3xl font-bold text-zinc-100">{children}</h1>
      case "h2":
        return <h2 key={index} id={id} className="mb-4 mt-6 scroll-mt-24 text-2xl font-bold text-zinc-100">{children}</h2>
      case "h3":
        return <h3 key={index} id={id} className="mb-3 mt-5 scroll-mt-24 text-xl font-bold text-zinc-100">{children}</h3>
      default:
        return <h4 key={index} id={id} className="mb-3 mt-4 scroll-mt-24 text-lg font-bold text-zinc-100">{children}</h4>
    }
  }

  // Handle different node types
  switch (node.type) {
    case "root":
      return <div key={index}>{children}</div>

    case "paragraph":
      return <p key={index} className="mb-4 leading-relaxed text-zinc-300">{children}</p>

    case "list":
      if (node.listType === "number") {
        return <ol key={index} className="mb-4 ml-6 list-decimal space-y-2 text-zinc-300">{children}</ol>
      }
      return <ul key={index} className="mb-4 ml-6 list-disc space-y-2 text-zinc-300">{children}</ul>

    // SlateJS flat format used by WordPress imports
    case "ul":
      return <ul key={index} className="mb-4 ml-6 list-disc space-y-2 text-zinc-300">{children}</ul>
    case "ol":
      return <ol key={index} className="mb-4 ml-6 list-decimal space-y-2 text-zinc-300">{children}</ol>
    case "li":
    case "listitem":
      return <li key={index}>{children}</li>

    case "blockquote":
    case "quote":
      return (
        <blockquote key={index} className="my-6 border-l-4 border-blue-500 bg-zinc-800/50 py-3 pl-4 pr-4 italic text-zinc-300">
          {children}
        </blockquote>
      )

    case "link":
      // Support both SlateJS flat format (node.url) and Lexical (node.fields.url)
      const linkUrl = node.url || node.fields?.url || "#"
      return (
        <a key={index} href={linkUrl} className="text-blue-400 underline hover:text-blue-300" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )

    case "code":
      return (
        <pre key={index} className="my-4 overflow-x-auto rounded-lg bg-zinc-800 p-4 text-sm">
          <code className="font-mono text-zinc-300">{children}</code>
        </pre>
      )

    case "horizontalrule":
      return <hr key={index} className="my-8 border-zinc-700" />

    // Payload editorial blocks (Lexical BlocksFeature) — routed to the
    // shared @xenco/editorial-blocks renderer by fields.blockType.
    case "block": {
      let blockNode = node
      // Divergence: this Payload defines pull-quote `quote` as a rich-text
      // field ({root}), but the package's PullQuote renders `quote` as a raw
      // React child (string). Coerce so it doesn't throw "Objects are not
      // valid as a React child". (Callout body / FAQ answer are fine — the
      // package renders those through renderLexicalChildren.)
      if (
        node.fields?.blockType === "pull-quote" &&
        node.fields?.quote &&
        typeof node.fields.quote === "object"
      ) {
        blockNode = { ...node, fields: { ...node.fields, quote: richTextToPlain(node.fields.quote) } }
      }
      return <EditorialBlock key={index} node={blockNode} />
    }

    default:
      // For unknown types, try to render children or text
      if (children && children.length > 0) {
        return <div key={index}>{children}</div>
      }
      return null
  }
}

export function RichText({ data, className }: { data: any; className?: string }) {
  if (!data) return null

  const proseClass = cn("prose prose-invert max-w-none", className)

  // If it's already HTML, render safely
  if (typeof data === "string" && data.trim().startsWith("<")) {
    return <div className={proseClass} dangerouslySetInnerHTML={{ __html: data }} />
  }

  // Handle Payload Lexical shape: { root: { children: [...] } }
  if (data?.root?.children) {
    return (
      <div className={proseClass}>
        {data.root.children.map((node: any, i: number) => renderLexicalNode(node, i))}
      </div>
    )
  }

  // Handle direct array of nodes (like our API-created content)
  if (Array.isArray(data)) {
    return (
      <div className={proseClass}>
        {data.map((node: any, i: number) => renderLexicalNode(node, i))}
      </div>
    )
  }

  // Fallback for unexpected formats
  if (typeof data === "object") {
    const extractText = (obj: any): string => {
      if (typeof obj === "string") return obj
      if (obj?.text) return obj.text
      if (obj?.children) return obj.children.map(extractText).join("")
      if (Array.isArray(obj)) return obj.map(extractText).join("")
      return ""
    }
    const text = extractText(data)
    if (text) {
      return <div className={proseClass}><p className="text-zinc-300">{text}</p></div>
    }
  }

  return null
}
