import { NextRequest, NextResponse } from 'next/server'
import { Pool } from '@neondatabase/serverless'
import { createHash, randomUUID } from 'node:crypto'
import { SPRINKLER_REPORT_ITEMS } from '@/lib/local-os/nemesis-fire/sprinkler-report-items'

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
const resultLabel = (value: string) => value === 'pass' ? 'P' : value === 'fail' ? 'F' : value === 'na' ? 'N/A' : '—'
const safeDate = (value: string) => esc(value || '—')
const field = (values: Record<string, string>, key: string) => esc(values[key] || '—')
const boxField = (label: string, value: string) => '<div class="field"><b>' + esc(label) + '</b>' + value + '</div>'

function buildHtml(values: Record<string, string>, items: Record<string, { result: string; comment: string }>) {
  const date = safeDate(values.testDate)
  const itemTable = (group: string) => SPRINKLER_REPORT_ITEMS.filter((x) => x.group === group).map((item) => {
    const input = items[item.id] || { result: '', comment: '' }
    return '<tr><td class="id">' + esc(item.id) + '</td><td class="kind">' + esc(item.kind) + '</td><td>' + esc(item.description) + '<span class="ref">' + esc(item.reference) + '</span></td><td class="date">' + date + '</td><td>' + esc(input.comment || '') + '</td><td class="result">' + resultLabel(input.result) + '</td></tr>'
  }).join('')
  const brand = (right: string) => '<div class="brand"><strong>NEMESIS FIRE</strong><span>' + right + '</span></div><div class="watermark">SAMPLE CLIENT RECORD · NOT A CERTIFICATION OR AHJ FILING</div>'
  const footer = (page: number) => '<div class="foot"><span>Nemesis Fire · ' + field(values, 'buildingName') + ' · Job ' + field(values, 'jobNumber') + '</span><span>Form-style sample · Page ' + page + ' of 4</span></div>'
  const tableHead = '<thead><tr><th>Item</th><th>I/T/M</th><th>Description / reference</th><th>Date</th><th>Comments</th><th>P/F/N/A</th></tr></thead>'
  const css = '@page{size:letter portrait;margin:.35in}*{box-sizing:border-box}body{font:9px Arial,sans-serif;color:#111;margin:0}.page{height:10.25in;position:relative;page-break-after:always}.page:last-child{page-break-after:auto}.brand{border-bottom:2px solid #b51e23;padding:0 0 7px;display:flex;justify-content:space-between;align-items:end}.brand strong{font-size:16px;letter-spacing:.5px}.brand span{font-size:8px;color:#555}.watermark{margin:8px 0;padding:5px 8px;background:#fff2d4;border:1px solid #d6a947;color:#5b4300;font-weight:bold;text-align:center;font-size:8px;letter-spacing:.6px}.title{font-size:14px;font-weight:bold;margin:9px 0 4px}.subtitle{color:#555;margin:0 0 8px}.box{border:1px solid #777;padding:7px;margin:7px 0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.field{border-bottom:1px solid #bbb;padding:3px 2px;min-height:22px}.field b{display:block;font-size:7px;color:#555;text-transform:uppercase;letter-spacing:.25px}.section{font-weight:bold;background:#ececec;padding:5px;margin:8px 0 0;border:1px solid #888}.small{font-size:7px;color:#555}table{width:100%;border-collapse:collapse;margin-top:5px}th{background:#ececec;text-align:left}th,td{border:1px solid #999;padding:3px;vertical-align:top}th{font-size:7px}td{font-size:8px}.id{width:34px;text-align:center}.kind{width:24px;text-align:center}.date{width:52px;text-align:center}.result{width:35px;text-align:center;font-weight:bold}.ref{display:block;font-size:7px;color:#666}.riser th,.riser td{text-align:left}.sign{height:28px;border-bottom:1px solid #222}.foot{position:absolute;bottom:0;left:0;right:0;border-top:1px solid #aaa;padding-top:4px;display:flex;justify-content:space-between;color:#555;font-size:7px}'
  let html = '<!doctype html><html><head><meta charset="utf-8"><style>' + css + '</style></head><body>'
  html += '<section class="page">' + brand('Inspection, Testing, and Maintenance Cover Sheet') + '<p class="title">Inspection, Testing, and Maintenance Cover Sheet</p><p class="subtitle">Fire protection record · Sample preview</p><div class="grid"><div class="box"><b>Property information</b>'
  html += boxField('Name', field(values, 'buildingName')) + boxField('Address', field(values, 'address')) + boxField('City / State / ZIP', field(values, 'cityStateZip')) + boxField('Contact / telephone', field(values, 'contactName') + ' · ' + field(values, 'contactPhone')) + boxField('Occupancy / use', field(values, 'occupancy')) + boxField('Construction / stories / year built', field(values, 'constructionType') + ' · ' + field(values, 'stories') + ' · ' + field(values, 'yearBuilt')) + '</div>'
  html += '<div class="box"><b>Contractor information</b>' + boxField('Name', 'Nemesis Fire') + boxField('California License', 'C16 · 1036129') + boxField('Phone', '707-353-4600') + boxField('Job number', field(values, 'jobNumber')) + boxField('Performed by', field(values, 'performedBy')) + boxField('Inspection date', date) + '</div></div>'
  html += '<div class="section">System and report scope</div><div class="box grid"><div>' + boxField('System inspected', field(values, 'systemType') + ' sprinkler system') + boxField('Risers', field(values, 'riserCount')) + '</div><div>' + boxField('Report cycle', 'Five-year inspection, testing, and maintenance') + boxField('Record state', 'Sample preview — technician review required') + '</div></div>'
  html += '<div class="section">Report contents</div><div class="box">Automatic sprinkler system · Five-year items, annual and quarterly items, maintenance items, riser information, main-drain readings, and comments.</div><p class="small">This sample format is based on a Nemesis Fire report supplied for this project. The applicable form edition, item applicability, results, certification, and any filing must be confirmed by the responsible licensed professional.</p>' + footer(1) + '</section>'
  html += '<section class="page">' + brand(field(values, 'buildingName') + ' · Job ' + field(values, 'jobNumber')) + '<p class="title">' + field(values, 'systemType') + ' Fire Sprinkler System · Five-Year Inspection</p><p class="subtitle">Inspection, testing, and maintenance report · Based on the supplied form layout</p><div class="grid"><div class="box"><b>Property</b>' + boxField('Address', field(values, 'address')) + boxField('City / State / ZIP', field(values, 'cityStateZip')) + boxField('Contact', field(values, 'contactName') + ' · ' + field(values, 'contactPhone')) + '</div><div class="box"><b>Contractor</b>' + boxField('Company / license', 'Nemesis Fire · C16 1036129') + boxField('Performed by', field(values, 'performedBy')) + boxField('Date', date) + '</div></div>'
  html += '<div class="section">Riser information and main drain test</div><table class="riser"><thead><tr><th>Riser</th><th>Location</th><th>Riser diameter</th><th>Main drain diameter</th><th>Initial static</th><th>Residual</th><th>Final static</th></tr></thead><tbody><tr><td>' + field(values, 'riserCount') + '</td><td>' + field(values, 'riserLocation') + '</td><td>' + field(values, 'riserDiameter') + '</td><td>' + field(values, 'mainDrainDiameter') + '</td><td>' + field(values, 'initialStatic') + '</td><td>' + field(values, 'residualPressure') + '</td><td>' + field(values, 'finalStatic') + '</td></tr></tbody></table><p class="small">Pressure values are reproduced as entered; this sample does not interpret or rate readings.</p>'
  html += '<div class="section">Five-year inspection, testing, and maintenance · inspection items</div><table>' + tableHead + '<tbody>' + itemTable('five-year') + '</tbody></table>' + footer(2) + '</section>'
  html += '<section class="page">' + brand(field(values, 'buildingName') + ' · Job ' + field(values, 'jobNumber')) + '<p class="title">Annual Inspection, Testing, and Maintenance</p><p class="subtitle">Includes applicable quarterly inspection items · ' + date + '</p><table>' + tableHead + '<tbody>' + itemTable('annual') + '</tbody></table>'
  html += '<div class="section">Field readings</div><div class="box grid"><div>' + boxField('Water supply pressure below riser', field(values, 'waterSupplyBelow') + ' psi') + boxField('Water supply pressure above riser', field(values, 'waterSupplyAbove') + ' psi') + '</div><div>' + boxField('Waterflow alarm time', field(values, 'waterflowTime') + ' seconds') + boxField('System type', field(values, 'systemType')) + '</div></div><p class="small">Results shown above are the sample values entered in the preview and require review by the responsible technician.</p>'
  html += footer(3) + '</section>'
  html += '<section class="page">' + brand(field(values, 'buildingName') + ' · Job ' + field(values, 'jobNumber')) + '<p class="title">Maintenance, Deficiencies, and Technician Review</p><p class="subtitle">Inspection record · ' + date + '</p>'
  html += '<div class="section">Annual maintenance items</div><table>' + tableHead + '<tbody>' + itemTable('maintenance') + '</tbody></table><div class="section">Deficiencies and comments</div><div class="box" style="min-height:70px;white-space:pre-wrap">' + field(values, 'deficiencies') + '</div>'
  html += '<div class="section">Technician review</div><div class="box"><p>This sample record is not a certification, code-compliance determination, customer report, or AHJ filing. The responsible licensed contractor must review the completed inspection and execute the final report.</p><div class="grid"><div>' + boxField('Print name', field(values, 'technicianName')) + '<div class="sign">' + esc(values.technicianSignature || '') + '</div><span class="small">Typed signature (sample only; not a verified electronic signature)</span></div><div>' + boxField('Date', date) + '<div class="sign"></div><span class="small">Date</span></div></div></div>' + footer(4) + '</section></body></html>'
  return html
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
    const body = JSON.parse(raw) as { values?: Record<string, unknown>; items?: Record<string, unknown> }
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
    const items: Record<string, { result: string; comment: string }> = {}
    for (const item of SPRINKLER_REPORT_ITEMS) {
      const input = body.items?.[item.id] as { result?: unknown; comment?: unknown } | undefined
      const result = typeof input?.result === 'string' && ALLOWED_RESULTS.has(input.result) ? input.result : ''
      const comment = typeof input?.comment === 'string' ? input.comment.slice(0, 240).replace(/[\u0000-\u001f\u007f]/g, ' ') : ''
      items[item.id] = { result, comment }
    }
    const apiKey = process.env.DOCUMENT_SERVICE_API_KEY
    if (!apiKey) return NextResponse.json({ detail: 'Document generation is not configured.' }, { status: 503 })

    const generatedResponse = await fetch(DOCS_BASE + '/api/documents/generate', {
      method: 'POST',
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify({
        html: buildHtml(values, items),
        output_format: 'pdf',
        app_name: 'nemesis-fire',
        metadata: {
          title: 'Nemesis Fire Sprinkler Inspection Sample - ' + (values.jobNumber || 'New Report'),
          filename: 'nemesis-fire-sprinkler-inspection-sample.pdf',
          source: 'nemesis-fire-preview',
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
