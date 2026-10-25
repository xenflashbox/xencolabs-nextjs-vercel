import { NextRequest, NextResponse } from 'next/server'
import { SPRINKLER_REPORT_ITEMS } from '@/lib/local-os/nemesis-fire/sprinkler-report-items'
import { getCaller } from '@/lib/local-os/auth'
import { hasNemesisDemoRequestAccess } from '@/lib/local-os/nemesis-fire/demo-access'
import { getSavedReport, getSavedReportPdf, listSavedReports, persistGeneratedReport, saveReportDraft } from '@/lib/local-os/nemesis-fire/report-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const DOCS_BASE = (process.env.DOCUMENT_SERVICE_URL || 'https://docs.xencolabs.com').replace(/\/+$/, '')
const ALLOWED_RESULTS = new Set(['', 'pass', 'fail', 'na', 'yes', 'no'])
const YES_NO_ITEM_KEYS = new Set(['1.28', '3.4', '3.6'])
const COMMENTLESS_ITEM_KEYS = new Set(['1.7', '1.8', '1.19', '1.28', '2.1', '2.3', '3.4', '3.6'])
const VALUE_LIMITS: Record<string, number> = {
  buildingName: 120, address: 180, cityStateZip: 120, contactName: 100, contactPhone: 40, contactEmail: 120,
  occupancy: 60, constructionType: 60, stories: 20, yearBuilt: 20, jobNumber: 60, performedBy: 100,
  testDate: 20, systemType: 40, riserCount: 20, riserLocation: 120, riserDiameter: 30, mainDrainDiameter: 30,
  initialStatic: 30, residualPressure: 30, finalStatic: 30, waterSupplyBelow: 30, waterSupplyAbove: 30,
  waterflowTime: 30, technicianName: 100, technicianSignature: 120, deficiencies: 2500,
}
const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c)

const AES_TEMPLATE_BASE_URL = 'https://xencolabs.com/nemesis-fire/aes-template-library'

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
  const yesNoMark = (key: string, y: number, boxX: number, yesY = -4.5, noY = 4.5) => {
    const value = items[key]?.result
    if (value !== 'yes' && value !== 'no') return ''
    return place(boxX, y + (value === 'yes' ? yesY : noY), '✔', { size: 7, width: 8, align: 'center', bold: true })
  }
  const comment = (key: string) => COMMENTLESS_ITEM_KEYS.has(key) ? '' : items[key]?.comment || ''
  const putRow = (key: string, y: number, dateX: number, resultX: number, commentsX = 425, commentsWidth = 105, commentsHeight = 13) => {
    const note = key === '1.7' ? values.waterSupplyBelow
      : key === '1.8' ? values.waterSupplyAbove
      : key === '2.3' ? values.waterflowTime : comment(key)
    const row = items[key]
    let html = row?.result || note ? place(dateX, y, date, { size: 9, width: 46, align: 'center' }) : ''
    if (key === '1.7' || key === '1.8') {
      html += place(459, y, note, { size: 9, width: 28, align: 'center' })
    } else if (key === '2.3') {
      html += place(457, y, note, { size: 9, width: 25, align: 'center' })
    } else if (YES_NO_ITEM_KEYS.has(key)) {
      html += yesNoMark(key, y, key === '1.28' ? 498 : 510)
    } else {
      html += wrapped(commentsX + 4, y + 1, note, commentsWidth - 8, commentsHeight - 2, 7.5)
    }
    if (!YES_NO_ITEM_KEYS.has(key)) html += place(resultX, y, result(key), { size: 9, width: 34, align: 'center' })
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
  p += place(98, 275, 'NEMESIS', { size: 9, bold: true, color: '#111111' })
  p += place(156, 275, 'FIRE', { size: 9, bold: true, color: '#D10505' })
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
  const resultItems = SPRINKLER_REPORT_ITEMS.filter(item => !YES_NO_ITEM_KEYS.has(item.id))
  const statuses = resultItems.map(item => items[item.id]?.result || '').filter(Boolean)
  const overall = statuses.length === resultItems.length
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
  p += place(385, 82, 'NEMESIS', { size: 9, bold: true, color: '#111111' })
  p += place(435, 82, 'FIRE', { size: 9, bold: true, color: '#D10505' })
  p += place(385, 98, 'P.O. Box 11651', { size: 8.5 })
  p += place(385, 114, 'Santa Rosa', { size: 8.5 })
  p += place(488, 114, 'CA', { size: 8.5 })
  p += place(544, 114, '95406', { size: 8.5 })
  p += place(385, 130, '(707) 495-5051', { size: 8.5 })
  p += place(287, 130, '1036129', { size: 8.5 })
  p += place(245, 162, '✔', { size: 8 })
  p += place(387, 162, 'nemesisfire78@gmail.com', { size: 8 })
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
  p += place(383.5, 81, 'NEMESIS', { size: 9, bold: true, color: '#111111' })
  p += place(433.4, 81, 'FIRE', { size: 9, bold: true, color: '#D10505' })
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
  p += place(386.9, 80, 'NEMESIS', { size: 9, bold: true, color: '#111111' })
  p += place(438.1, 80, 'FIRE', { size: 9, bold: true, color: '#D10505' })
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

  return '<!doctype html><html><head><meta charset="utf-8"><style>@page{size:letter portrait;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;width:8.5in;font-family:Arial,Helvetica,sans-serif;color:#111}.page{position:relative;width:8.5in;height:11in;overflow:hidden;page-break-after:always}.page:last-child{page-break-after:auto}.background{position:absolute;inset:0;width:8.5in;height:11in}.signature{position:absolute;z-index:2;left:149px;top:984px;width:150px;height:26px;object-fit:contain;object-position:left center}.text,.wrap{position:absolute;z-index:1;line-height:1.05;white-space:nowrap;font-family:Arial,Helvetica,sans-serif;font-weight:400}.wrap{white-space:normal;line-height:1.05;overflow:hidden;display:flex;align-items:center;text-align:left}</style></head><body>' + pages.join('') + '</body></html>'
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

async function hasReportAccess(request: NextRequest) {
  const previewDemoAuthorized = hasNemesisDemoRequestAccess(request.headers.get('host'), request.cookies.get('nemesis_demo_access')?.value)
  return previewDemoAuthorized || Boolean(await getCaller())
}

export async function GET(request: NextRequest) {
  const enabledTenants = (process.env.NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT || '').split(',').map((x) => x.trim())
  if (!enabledTenants.includes('nemesis-fire')) return NextResponse.json({ detail: 'Not found' }, { status: 404 })
  if (!(await hasReportAccess(request))) return NextResponse.json({ detail: 'Open this report from the private Nemesis link or sign in to the Nemesis office portal.' }, { status: 403 })
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ reports: await listSavedReports() }, { headers: { 'Cache-Control': 'no-store' } })
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return NextResponse.json({ detail: 'Invalid report reference.' }, { status: 400 })
    if (request.nextUrl.searchParams.get('pdf') === '1') {
      const file = await getSavedReportPdf(id)
      if (!file) return NextResponse.json({ detail: 'No PDF has been generated for this report yet.' }, { status: 404 })
      return new NextResponse(Buffer.from(file.pdf_bytes), { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'inline; filename="' + file.file_name.replace(/[^a-zA-Z0-9._-]/g, '') + '"', 'Cache-Control': 'no-store' } })
    }
    const report = await getSavedReport(id)
    return report ? NextResponse.json(report, { headers: { 'Cache-Control': 'no-store' } }) : NextResponse.json({ detail: 'Saved report not found.' }, { status: 404 })
  } catch (error) {
    console.error('nemesis_report_load_failed', { errorType: error instanceof Error ? error.name : 'UnknownError' })
    return NextResponse.json({ detail: 'Saved reports could not be loaded. Check the report database configuration.' }, { status: 503 })
  }
}

export async function POST(request: NextRequest) {
  const enabledTenants = (process.env.NEXT_PUBLIC_LOCAL_OS_PRESENTATION_TENANT || '').split(',').map((x) => x.trim())
  if (!enabledTenants.includes('nemesis-fire')) return NextResponse.json({ detail: 'Not found' }, { status: 404 })
  try {
    const raw = await request.text()
    if (raw.length > 32_000) return NextResponse.json({ detail: 'Report input is too large.' }, { status: 413 })
    const body = JSON.parse(raw) as { action?: unknown; reportId?: unknown; clientId?: unknown; values?: Record<string, unknown>; items?: Record<string, unknown>; signedCopy?: unknown }
    const values: Record<string, string> = {}
    for (const [key, max] of Object.entries(VALUE_LIMITS)) {
      const candidate = body.values?.[key]
      if (candidate !== undefined && typeof candidate !== 'string') return NextResponse.json({ detail: 'Invalid report field.' }, { status: 400 })
      values[key] = String(candidate || '').slice(0, max).replace(/[\u0000-\u001f\u007f]/g, ' ')
    }
    for (const key of ['buildingName', 'address', 'cityStateZip', 'testDate']) {
      if (!values[key]?.trim()) return NextResponse.json({ detail: 'Complete the required property and inspection date fields.' }, { status: 400 })
    }
    for (const key of ['waterSupplyBelow', 'waterSupplyAbove', 'waterflowTime']) {
      if (values[key] && !/^\d+(?:\.\d+)?$/.test(values[key].trim())) return NextResponse.json({ detail: 'Enter only a numeric value for PSI and seconds fields.' }, { status: 400 })
    }
    values.systemType = ['Wet Pipe', 'Dry Pipe', 'Pre-action', 'Deluge', 'Other / not specified'].includes(String(body.values?.systemType)) ? String(body.values?.systemType) : 'Other / not specified'
    if (values.systemType !== 'Wet Pipe') return NextResponse.json({ detail: 'The current generated form is the official AES 2.2 five-year Wet Pipe form. Select Wet Pipe; other system forms are being mapped before they can be generated.' }, { status: 400 })
    if (body.signedCopy !== undefined && typeof body.signedCopy !== 'boolean') return NextResponse.json({ detail: 'Invalid report completion status.' }, { status: 400 })
    if (!(await hasReportAccess(request))) return NextResponse.json({ detail: 'Open this report from the private Nemesis link or sign in to the Nemesis office portal.' }, { status: 403 })
    if (body.reportId !== undefined && (typeof body.reportId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.reportId))) return NextResponse.json({ detail: 'Invalid saved report reference.' }, { status: 400 })
    if (body.clientId !== undefined && (typeof body.clientId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.clientId))) return NextResponse.json({ detail: 'Invalid client reference.' }, { status: 400 })
    const items: Record<string, { result: string; comment: string }> = {}
    for (const item of SPRINKLER_REPORT_ITEMS) {
      const input = body.items?.[item.id] as { result?: unknown; comment?: unknown } | undefined
      const allowedForItem = YES_NO_ITEM_KEYS.has(item.id) ? new Set(['', 'yes', 'no']) : new Set(['', 'pass', 'fail', 'na'])
      const result = typeof input?.result === 'string' && ALLOWED_RESULTS.has(input.result) && allowedForItem.has(input.result) ? input.result : ''
      const comment = COMMENTLESS_ITEM_KEYS.has(item.id) ? '' : typeof input?.comment === 'string' ? input.comment.slice(0, 240).replace(/[\u0000-\u001f\u007f]/g, ' ') : ''
      items[item.id] = { result, comment }
    }
    const signedCopy = body.signedCopy === true
    const input = { values, items }
    const action = body.action === 'save' ? 'save' : 'generate'
    let saved: { reportId: string; reportNumber: string; savedAt?: string }
    try {
      saved = await saveReportDraft(input, typeof body.reportId === 'string' ? body.reportId : null, typeof body.clientId === 'string' ? body.clientId : null, signedCopy)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Draft could not be saved'
      const status = message === 'Saved report not found' ? 404 : message.includes('already been generated') ? 409 : 503
      return NextResponse.json({ detail: message, reportId: body.reportId || null }, { status })
    }
    if (action === 'save') return NextResponse.json({ ok: true, ...saved }, { headers: { 'Cache-Control': 'no-store' } })

    const signaturePng = process.env.NEMESIS_ALEX_RUIZ_SIGNATURE_PNG_BASE64 || ''
    if (signedCopy && !signaturePng) return NextResponse.json({ detail: 'Signed PDF generation is not configured on this deployment. Your report draft has been saved.', reportId: saved.reportId, reportNumber: saved.reportNumber }, { status: 503 })
    if (signedCopy && !['alex ruiz', 'alejandro ruiz'].includes(values.technicianName.trim().toLowerCase())) return NextResponse.json({ detail: 'Enter Alex Ruiz as the signing technician before creating a signed copy. Your draft is saved.', reportId: saved.reportId, reportNumber: saved.reportNumber }, { status: 400 })
    if (signedCopy && Object.values(items).some((item) => !item.result)) return NextResponse.json({ detail: 'Complete every checklist result before creating the signed copy. Your draft is saved.', reportId: saved.reportId, reportNumber: saved.reportNumber }, { status: 400 })
    const apiKey = process.env.DOCUMENT_SERVICE_API_KEY
    if (!apiKey) return NextResponse.json({ detail: 'Unsigned PDF generation is not configured on this deployment. Your report draft has been saved.', reportId: saved.reportId, reportNumber: saved.reportNumber }, { status: 503 })

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
    if (!generatedResponse.ok) {
      console.error('nemesis_document_service_rejected_report', { status: generatedResponse.status, reportId: saved.reportId })
      return NextResponse.json({ detail: 'The document service rejected the request (HTTP ' + generatedResponse.status + '). Your draft is saved.', reportId: saved.reportId, reportNumber: saved.reportNumber }, { status: 502 })
    }

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
      if (!jobResponse.ok) {
        console.error('nemesis_document_service_status_failed', { status: jobResponse.status, reportId: saved.reportId })
        return NextResponse.json({ detail: 'The document service could not confirm report generation (HTTP ' + jobResponse.status + '). Your draft is saved.', reportId: saved.reportId, reportNumber: saved.reportNumber }, { status: 502 })
      }

      const job = await jobResponse.json() as { status?: unknown; output_url?: unknown }
      if (job.status === 'completed') {
        completed = { status: 'completed', output_url: job.output_url }
        break
      }
      if (job.status === 'failed' || job.status === 'error') {
        console.error('nemesis_document_service_job_failed', { reportId: saved.reportId })
        return NextResponse.json({ detail: 'The document service could not generate the report. Your draft is saved.', reportId: saved.reportId, reportNumber: saved.reportNumber }, { status: 502 })
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
    const generated = await persistGeneratedReport(saved.reportId, bytes, accepted.job_id, signedCopy)
    return new NextResponse(bytes, { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'inline; filename="' + generated.reportNumber + '.pdf"', 'X-Nemesis-Report-Id': generated.reportId, 'X-Nemesis-Report-Number': generated.reportNumber, 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('nemesis_report_generation_failed', { errorType: error instanceof Error ? error.name : 'UnknownError' })
    return NextResponse.json({ detail: 'Report generation failed, but any saved draft remains in Reports. Check the service settings and try again.' }, { status: 500 })
  }
}
