"use client"

import { configureMedia } from "@xenco/editorial-blocks"

// Module-scope so it runs once per client bundle load, before any block
// renders. Resolution goes through the same-origin /api/media-url proxy —
// direct browser fetches to the CMS are CORS-blocked on Vercel previews.
configureMedia({
  resolveMediaUrl: async (mediaId: number) => {
    const res = await fetch(`/api/media-url/${mediaId}`)
    if (!res.ok) return null
    const doc = (await res.json()) as { url?: unknown }
    return typeof doc.url === "string" && doc.url.length > 0 ? doc.url : null
  },
})

export function EditorialBlocksSetup() {
  return null
}
