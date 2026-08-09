import { NextResponse } from "next/server"

const CMS_URL = (process.env.CMS_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || "").replace(/\/+$/, "")

// Same-origin proxy for editorial image-block mediaId resolution. The CMS
// media collection is public-read but its CORS whitelist only covers
// production site domains — direct browser fetches fail on Vercel previews.
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  if (!/^\d+$/.test(id) || !CMS_URL) {
    return NextResponse.json({ url: null }, { status: 400 })
  }
  try {
    const res = await fetch(`${CMS_URL}/api/media/${id}?depth=0`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return NextResponse.json({ url: null }, { status: 404 })
    const doc = (await res.json()) as { url?: unknown }
    const url = typeof doc.url === "string" && doc.url.length > 0 ? doc.url : null
    return NextResponse.json(
      { url },
      { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } }
    )
  } catch {
    return NextResponse.json({ url: null }, { status: 502 })
  }
}
