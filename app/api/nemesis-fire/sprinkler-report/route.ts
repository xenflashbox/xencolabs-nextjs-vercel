import { NextRequest, NextResponse } from 'next/server'
import { Pool } from '@neondatabase/serverless'
import { createHash, randomUUID } from 'node:crypto'
import { SPRINKLER_REPORT_ITEMS } from '@/lib/local-os/nemesis-fire/sprinkler-report-items'
import { getCaller } from '@/lib/local-os/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const DOCS_BASE = (process.env.DOCUMENT_SERVICE_URL || 'https://docs.xencolabs.com').replace(/\/+$/, '')
const ALLOWED_RESULTS = new Set(['', 'pass', 'fail', 'na'])
const VALUE_LIMITS: Record<string, number> = {
  buildingName: 120, address: 180, cityStateZip: 120, contactName: 100, contactPhone: 40, contactEmail: 120,
  occupancy: 60, constructionType: 60, stories: 20, yearBuilt: 20, jobNumber: 60, performedBy: 100,
  testDate: 20, systemType: 40, riserCount: 20, riserLocation: 120, riserDiameter: 30, mainDrainDiameter: 30,
  initialStatic: 30, residualPressure: 30, finalStatic: 30, waterSupplyBelow: 30, waterSupplyAbove: 30,
  waterflowTime: 30, technicianName: 100, technicianSignature: 120, deficiencies: 2500,
}
const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c)

const AES_TEMPLATE_BASE_URL = 'https://preview.xencolabs.com/nemesis-fire/aes-template-library'

const coverValues = (values: Record<string, string>) => {
  const cityStateZip = values.cityStateZip || ''
  const zip = cityStateZip.match(/\b(\d{5}(?:-\d{4})?)\s*$/)?.[1] || ''
  const city = zip ? cityStateZip.slice(0, cityStateZip.lastIndexOf(zip)).replace(/[ ,]+$/, '') : cityStateZip
  return { city, zip }
}

const printDate = (value: string) => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  return match ? match[2] + '/' + match[3] + '/' + match[1].slice(-2) : value
}

function buildHtml(values: Record<string, string>, items: Record<string, { result: string; comment: string }>, templateImages: string[], signedCopy: boolean, signaturePng: string) {
  const scale = 4 / 3
  const place = (x: number, y: number, raw: unknown, opts: { size?: number; width?: number; align?: 'left' | 'center' | 'right'; bold?: boolean; italic?: boolean; color?: string } = {}) => {
    const text = String(raw ?? '')
    if (!text) return ''
    const { size = 9, width, align = 'left', bold = false, italic = false, color = '#111111' } = opts
    return '<span class="text" style="left:' + (x * scale) + 'px;top:' + (y * scale - 1) + 'px;font-size:' + (size * scale) + 'px;' + (width ? 'width:' + (width * scale) + 'px;' : '') + 'text-align:' + align + ';font-weight:' + (bold ? '700' : '400') + ';font-style:' + (italic ? 'italic' : 'normal') + ';color:' + color + '">' + esc(text) + '</span>'
  }
  const wrapped = (x: number, y: number, raw: unknown, width: number, height: number, size = 7.5) => {
    const text = String(raw ?? '')
    if (!text) return ''
    return '<span class="wrap" style="left:' + (x * scale) + 'px;top:' + (y * scale - 1) + 'px;width:' + (width * scale) + 'px;height:' + (height * scale) + 'px;font-size:' + (size * scale) + 'px">' + esc(text) + '</span>'
  }
  const date = printDate(values.testDate || '')
  const { city, zip } = coverValues(values)
  const pages: string[] = []
  const open = (index: number) => '<section class="page"><img class="background" src="data:image/png;base64,' + templateImages[index] + '">'
  const close = () => '</section>'
  const result = (key: string) => {
    const value = items[key]?.result || ''
    return value === 'pass' ? 'P' : value === 'fail' ? 'F' : value === 'na' ? 'N/A' : ''
  }
  const comment = (key: string) => items[key]?.comment || ''
  const putRow = (key: string, y: number, dateX: number, resultX: number, commentsX = 425, commentsWidth = 105, commentsHeight = 13) => {
    let html = place(dateX, y, date, { size: 9, width: 46, align: 'center' })
    const note = key === '1.7' ? values.waterSupplyBelow || comment(key)
      : key === '1.8' ? values.waterSupplyAbove || comment(key)
      : key === '2.3' && values.waterflowTime ? values.waterflowTime : comment(key)
    if (key === '1.7' || key === '1.8') {
      html += place(461, y, note, { size: 9, width: 18, align: 'center' })
      if (note) html += place(516, y + 1, 'psi', { size: 8, width: 15, align: 'center' })
    } else if (key === '2.3') {
      html += place(457, y, note, { size: 9, width: 20, align: 'center' })
    } else {
      html += wrapped(commentsX, y + 1, note, commentsWidth, commentsHeight, 7.5)
    }
    html += place(resultX, y, result(key), { size: 9, width: 34, align: 'center' })
    return html
  }

  let p = open(0)
  p += place(89, 98, values.buildingName)
  p += place(90, 117, values.address)
  p += place(90, 138, city)
  p += place(90, 160, zip)
  p += place(91, 183, values.contactName)
  p += place(91, 205, values.contactPhone)
  p += place(349, 99, values.occupancy)
  p += place(350, 119, values.constructionType)
  p += place(350, 140, values.stories)
  p += place(350, 161, values.yearBuilt)
  p += place(98, 275, 'NEMESIS FIRE', { size: 9, bold: true })
  p += place(98, 296, 'P.O. Box 11651')
  p += place(98, 318, 'Santa Rosa')
  p += place(98, 340, 'California')
  p += place(98, 362, '(707) 495-5051')
  p += place(98, 383, '1036129')
  p += place(98, 402, values.jobNumber)
  p += place(98, 424, values.performedBy)
  p += place(327, 337, 'X', { size: 8, bold: true })
  p += place(376, 509, '1', { size: 9, width: 16, align: 'center' })
  p += place(31, 509, '✔', { size: 9 })
  const statuses = Object.values(items).map(x => x.result).filter(Boolean)
  const overall = statuses.length === Object.keys(items).length
    ? statuses.includes('fail') ? 'Fail' : statuses.every(x => x === 'na') ? 'N/A' : 'Pass'
    : ''
  if (overall === 'Pass') p += place(542, 508, '✔', { size: 9 })
  if (overall === 'Fail') p += place(489, 508, '✔', { size: 9 })
  if (overall === 'N/A') p += place(442, 508, '✔', { size: 9 })
  pages.push(p + close())

  p = open(1)
  p += place(92, 81, values.buildingName)
  p += place(92, 96, values.address)
  p += place(91, 113, values.cityStateZip)
  p += place(91, 128, values.contactName)
  p += place(91, 144, values.contactPhone)
  p += place(91, 164, values.contactEmail)
  p += place(385, 144, values.jobNumber)
  p += place(34, 230, '1', { size: 9, width: 12, align: 'center' })
  p += place(59, 229, values.riserLocation)
  p += place(280, 229, values.riserDiameter, { width: 38, align: 'center' })
  p += place(328, 229, values.mainDrainDiameter, { width: 38, align: 'center' })
  p += place(390, 229, values.initialStatic, { width: 34, align: 'center' })
  p += place(443, 229, values.residualPressure, { width: 34, align: 'center' })
  p += place(502, 229, values.finalStatic, { width: 34, align: 'center' })
  const page2Rows = [
    ['1.1',403.8],['1.2',423.3],['1.3',442.8],['1.4',462.3],['1.5',481.8],
    ['1.6',502.9],['1.7',523.4],['1.8',542.9],['1.9',562.4],['1.10',583.1],
    ['1.11',603.6],['1.12',623.1],['1.13',642.6],['1.14',662.2],['1.15',681.6],['1.16',701],
  ] as const
  for (const [key, y] of page2Rows) p += putRow(key, y, 371.7, 541.5, 414, 123, 12)
  pages.push(p + close())

  p = open(2)
  p += place(97, 79, values.buildingName)
  p += place(97, 96, values.address)
  p += place(96, 113, values.cityStateZip)
  p += place(383, 97, 'Job # ' + (values.jobNumber || ''))
  p += place(77, 23, values.systemType || 'Wet Pipe', { size: 9, bold: true, color: '#ffffff' })
  const page3Rows = [
    ['1.17',202.5],['1.18',223.7],['1.19',244],['1.20',264.3],['1.21',284.6],['1.22',304.4],
    ['1.23',324.8],['1.24',344.8],['1.25',364.5],['1.26',385.4],['1.27',405.8],['1.28',425.5],
    ['2.1',447.4],['2.2',470],['2.3',492.5],['2.4',514.4],['2.5',535.4],['2.6',556.2],
    ['2.7',576.7],['2.8',597],['2.9',618.3],['2.10',639.7],['2.11',660],['2.12',679.4],
  ] as const
  for (const [key, y] of page3Rows) p += putRow(key, y, 368.7, 541.9, 414, 123, 12)
  pages.push(p + close())

  p = open(3)
  p += place(96, 79, values.buildingName)
  p += place(96, 96, values.address)
  p += place(95, 113, values.cityStateZip)
  p += place(383, 95, 'Job # ' + (values.jobNumber || ''))
  p += place(77, 25, values.systemType || 'Wet Pipe', { size: 9, bold: true, color: '#ffffff' })
  const page4Rows = [['3.1',201.4],['3.2',219.4],['3.3',239.7],['3.4',263.2],['3.5',287.2],['3.6',311]] as const
  for (const [key, y] of page4Rows) p += putRow(key, y, 368.4, 541.3, 414, 123, 12)
  if (signedCopy) p += '<img class="signature" src="data:image/png;base64,' + signaturePng + '" alt="Alex Ruiz signature">'
  p += place(112.6, 723.5, values.technicianName)
  p += place(496.4, 740.3, date)
  const deficiencyLines = (values.deficiencies || '').split(/\r?\n/).map(x => x.trim()).filter(Boolean)
  if (deficiencyLines.length > 14) throw new Error('Use no more than 14 deficiency lines so each entry fits the supplied form.')
  deficiencyLines.forEach((line, index) => {
    p += wrapped(178, 402 + index * 15.4, line, 397, 14, 8)
  })
  pages.push(p + close())

  return '<!doctype html><html><head><meta charset="utf-8"><style>@page{size:letter portrait;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;width:8.5in;font-family:Arial,Helvetica,sans-serif;color:#111}.page{position:relative;width:8.5in;height:11in;overflow:hidden;page-break-after:always}.page:last-child{page-break-after:auto}.background{position:absolute;inset:0;width:8.5in;height:11in}.signature{position:absolute;z-index:2;left:149px;top:984px;width:150px;height:26px;object-fit:contain;object-position:left center}.text,.wrap{position:absolute;z-index:1;line-height:1.05;white-space:nowrap;font-family:Arial,Helvetica,sans-serif;font-weight:400}.wrap{white-space:normal;line-height:1.05;overflow:hidden}</style></head><body>' + pages.join('') + '</body></html>'
}

async function loadAesTemplateImages() {
  const pages = ['aes-1-1', 'aes-2-2-1', 'aes-2-2-2', 'aes-2-2-3']
  return Promise.all(pages.map(async page => {
    const response = await fetch(AES_TEMPLATE_BASE_URL + '/' + page + '.png', {
      method: 'GET',
      cache: 'force-cache',
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok || !response.headers.get('content-type')?.toLowerCase().includes('image/png')) {
      throw new Error('AES report form template could not be loaded')
    }
    const bytes = new Uint8Array(await response.arrayBuffer())
    if (bytes.length < 10_000 || bytes.length > 2_000_000) throw new Error('AES report form template has an invalid size')
    return Buffer.from(bytes).toString('base64')
  }))
}

async function persistGeneratedReport(values: Record<string, string>, items: Record<string, { result: string; comment: string }>, pdf: Uint8Array, jobId: string) {
  const connectionString = process.env.NEMESIS_FIRE_DATABASE_URL
  if (!connectionString) throw new Error('Nemesis report database is not configured')
  const pool = new Pool({ connectionString, max: 1 })
  const client = await pool.connect()
  const reportId = randomUUID()
  const reportNumber = 'NF-' + (values.testDate || new Date().toISOString().slice(0, 10)).replace(/-/g, '') + '-' + reportId.slice(0, 6).toUpperCase()
  try {
    await client.query('BEGIN')
    const template = await client.query('SELECT id FROM nemesis_fire.report_templates WHERE template_key=$1 AND active=true', ['aes-2.2-ca-title19-five-year-wet-pipe'])
    if (!template.rows[0]) throw new Error('Report template unavailable')
    const sample = await client.query('SELECT id FROM nemesis_fire.clients WHERE business_name=$1 AND active=true ORDER BY created_at LIMIT 1', ['Redwood Court Apartments (Sample Client)'])
    if (!sample.rows[0]) throw new Error('Sample client unavailable')
    await client.query("INSERT INTO nemesis_fire.sprinkler_reports (id,report_number,client_id,template_id,status,inspection_date,system_type,performed_by,report_values,revision,created_by,generated_at) VALUES ($1,$2,$3,$4,'generated',$5::date,$6,$7,$8::jsonb,1,'preview-demo',now())", [reportId,reportNumber,sample.rows[0].id,template.rows[0].id,values.testDate,values.systemType,values.performedBy || null,JSON.stringify({ ...values, items })])
    const rows = await client.query('SELECT item_key,section,item_number,item_kind,description,code_reference FROM nemesis_fire.report_template_items WHERE template_id=$1 ORDER BY sort_order', [template.rows[0].id])
    for (const row of rows.rows) {
      const input = items[row.item_key] || { result: '', comment: '' }
      await client.query('INSERT INTO nemesis_fire.report_checklist_items (report_id,item_key,section,item_number,item_kind,description,code_reference,performed_on,result,comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::date,$9,$10)', [reportId,row.item_key,row.section,row.item_number,row.item_kind,row.description,row.code_reference,values.testDate,input.result,input.comment])
    }
    await client.query('INSERT INTO nemesis_fire.report_risers (report_id,riser_number,location,riser_diameter,main_drain_diameter,initial_static_pressure,residual_pressure,final_static_pressure) VALUES ($1,1,$2,$3,$4,$5,$6,$7)', [reportId,values.riserLocation || null,values.riserDiameter || null,values.mainDrainDiameter || null,values.initialStatic || null,values.residualPressure || null,values.finalStatic || null])
    await client.query('INSERT INTO nemesis_fire.report_documents (report_id,revision,document_service_job_id,file_name,sha256,pdf_bytes) VALUES ($1,1,$2,$3,$4,$5)', [reportId,jobId,'nemesis-fire-sprinkler-inspection-' + reportNumber + '.pdf',createHash('sha256').update(pdf).digest('hex'),Buffer.from(pdf)])
    await client.query('INSERT INTO nemesis_fire.report_audit_events (report_id,actor_id,action,details) VALUES ($1,$2,$3,$4::jsonb)', [reportId,'preview-demo','pdf_generated',JSON.stringify({ report_number: reportNumber, template: 'aes-2.2-ca-title19-five-year-wet-pipe' })])
    await client.query('COMMIT')
    return { reportId, reportNumber }
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

export async function POST(request: NextRequest) {
  const enabledTenants = (process.env.NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT || '').split(',').map((x) => x.trim())
  if (!enabledTenants.includes('nemesis-fire')) return NextResponse.json({ detail: 'Not found' }, { status: 404 })
  try {
    const raw = await request.text()
    if (raw.length > 32_000) return NextResponse.json({ detail: 'Report input is too large.' }, { status: 413 })
    const body = JSON.parse(raw) as { values?: Record<string, unknown>; items?: Record<string, unknown>; signedCopy?: unknown }
    const values: Record<string, string> = {}
    for (const [key, max] of Object.entries(VALUE_LIMITS)) {
      const candidate = body.values?.[key]
      if (candidate !== undefined && typeof candidate !== 'string') return NextResponse.json({ detail: 'Invalid report field.' }, { status: 400 })
      values[key] = String(candidate || '').slice(0, max).replace(/[\u0000-\u001f\u007f]/g, ' ')
    }
    for (const key of ['buildingName', 'address', 'cityStateZip', 'testDate']) {
      if (!values[key]?.trim()) return NextResponse.json({ detail: 'Complete the required property and inspection date fields.' }, { status: 400 })
    }
    values.systemType = ['Wet Pipe', 'Dry Pipe', 'Pre-action', 'Deluge', 'Other / not specified'].includes(String(body.values?.systemType)) ? String(body.values?.systemType) : 'Other / not specified'
    if (values.systemType !== 'Wet Pipe') return NextResponse.json({ detail: 'The current generated form is the official AES 2.2 five-year Wet Pipe form. Select Wet Pipe; other system forms are being mapped before they can be generated.' }, { status: 400 })
    if (body.signedCopy !== undefined && typeof body.signedCopy !== 'boolean') return NextResponse.json({ detail: 'Invalid report completion status.' }, { status: 400 })
    const items: Record<string, { result: string; comment: string }> = {}
    for (const item of SPRINKLER_REPORT_ITEMS) {
      const input = body.items?.[item.id] as { result?: unknown; comment?: unknown } | undefined
      const result = typeof input?.result === 'string' && ALLOWED_RESULTS.has(input.result) ? input.result : ''
      const comment = typeof input?.comment === 'string' ? input.comment.slice(0, 240).replace(/[\u0000-\u001f\u007f]/g, ' ') : ''
      items[item.id] = { result, comment }
    }
    const signedCopy = body.signedCopy === true
    if (signedCopy && !(await getCaller())) return NextResponse.json({ detail: 'Sign in with an authorized Nemesis admin account to create a signed copy.' }, { status: 403 })
    const signaturePng = process.env.NEMESIS_ALEX_RUIZ_SIGNATURE_PNG_BASE64 || ''
    if (signedCopy && !signaturePng) return NextResponse.json({ detail: 'The signed-report signature is not configured on this server.' }, { status: 503 })
    if (signedCopy && !['alex ruiz', 'alejandro ruiz'].includes(values.technicianName.trim().toLowerCase())) return NextResponse.json({ detail: 'Enter Alex Ruiz as the signing technician before creating a signed copy.' }, { status: 400 })
    if (signedCopy && Object.values(items).some((item) => !item.result)) return NextResponse.json({ detail: 'Complete every checklist result before creating the signed copy.' }, { status: 400 })
    const apiKey = process.env.DOCUMENT_SERVICE_API_KEY
    if (!apiKey) return NextResponse.json({ detail: 'Document generation is not configured.' }, { status: 503 })

    const generatedResponse = await fetch(DOCS_BASE + '/api/documents/generate', {
      method: 'POST',
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify({
        html: buildHtml(values, items, await loadAesTemplateImages(), signedCopy, signaturePng),
        output_format: 'pdf',
        app_name: 'nemesis-fire',
        metadata: {
          title: 'Nemesis Fire Sprinkler Inspection Report - ' + (values.jobNumber || 'New Report'),
          filename: 'nemesis-fire-sprinkler-inspection-' + (values.jobNumber || 'report') + '.pdf',
          source: 'nemesis-fire-report-generator',
        },
      }),
    })
    if (!generatedResponse.ok) return NextResponse.json({ detail: 'The document service did not accept the report. Please try again shortly.' }, { status: 502 })

    const accepted = await generatedResponse.json() as { job_id?: unknown }
    if (typeof accepted.job_id !== 'string' || !/^[a-zA-Z0-9_-]{8,100}$/.test(accepted.job_id)) {
      return NextResponse.json({ detail: 'The document service returned an invalid report reference.' }, { status: 502 })
    }

    const deadline = Date.now() + 50_000
    let completed: { status: string; output_url?: unknown } | undefined
    while (Date.now() < deadline) {
      const jobResponse = await fetch(DOCS_BASE + '/api/jobs/' + encodeURIComponent(accepted.job_id), {
        method: 'GET',
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
        headers: { Accept: 'application/json', 'X-API-Key': apiKey },
      })
      if (!jobResponse.ok) return NextResponse.json({ detail: 'The document service could not confirm report generation.' }, { status: 502 })

      const job = await jobResponse.json() as { status?: unknown; output_url?: unknown }
      if (job.status === 'completed') {
        completed = { status: 'completed', output_url: job.output_url }
        break
      }
      if (job.status === 'failed' || job.status === 'error') {
        return NextResponse.json({ detail: 'The document service could not generate the report.' }, { status: 502 })
      }
      if (job.status !== 'pending' && job.status !== 'processing') {
        return NextResponse.json({ detail: 'The document service returned an unknown report status.' }, { status: 502 })
      }
      await new Promise((resolve) => setTimeout(resolve, 1_000))
    }
    if (!completed || typeof completed.output_url !== 'string') {
      return NextResponse.json({ detail: 'Report generation timed out. Please try again.' }, { status: 504 })
    }

    const outputUrl = new URL(completed.output_url)
    if (outputUrl.origin !== new URL(DOCS_BASE).origin || outputUrl.protocol !== 'https:') {
      return NextResponse.json({ detail: 'The document service returned an unsafe report URL.' }, { status: 502 })
    }
    const pdf = await fetch(outputUrl, { cache: 'no-store', signal: AbortSignal.timeout(15_000) })
    if (!pdf.ok || !pdf.headers.get('content-type')?.toLowerCase().includes('application/pdf')) {
      return NextResponse.json({ detail: 'The PDF was generated, but could not be downloaded.' }, { status: 502 })
    }
    const bytes = new Uint8Array(await pdf.arrayBuffer())
    if (bytes.byteLength < 5 || bytes.byteLength > 20_000_000 || new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') {
      return NextResponse.json({ detail: 'The document service returned an invalid PDF.' }, { status: 502 })
    }
    const saved = await persistGeneratedReport(values, items, bytes, accepted.job_id)
    return new NextResponse(bytes, { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'inline; filename="' + saved.reportNumber + '.pdf"', 'X-Nemesis-Report-Id': saved.reportId, 'X-Nemesis-Report-Number': saved.reportNumber, 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ detail: 'The report could not be generated. Please try again.' }, { status: 500 })
  }
}
