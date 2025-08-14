import { neon } from "@neondatabase/serverless";
export const runtime = "edge";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`select 'ok' as status, now() as ts;`;
    return new Response(JSON.stringify({ ok: true, db: rows[0] }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500 });
  }
}
