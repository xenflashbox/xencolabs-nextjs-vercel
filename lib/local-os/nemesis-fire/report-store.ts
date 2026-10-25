import { Pool, type PoolClient } from '@neondatabase/serverless'
import { createHash, randomUUID } from 'node:crypto'
import { SPRINKLER_REPORT_ITEMS } from '@/lib/local-os/nemesis-fire/sprinkler-report-items'

export type NemesisReportInput = {
  values: Record<string, string>
  items: Record<string, { result: string; comment: string }>
}

export type SavedReport = {
  id: string
  reportNumber: string
  status: string
  inspectionDate: string
  buildingName: string
  address: string
  cityStateZip: string
  systemType: string
  clientId: string | null
  values: Record<string, string>
  items: Record<string, { result: string; comment: string }>
  signedCopy: boolean
  hasPdf: boolean
}

const TEMPLATE_KEY = 'aes-2.2-ca-title19-five-year-wet-pipe'

function createPool() {
  const connectionString = process.env.NEMESIS_FIRE_DATABASE_URL
  if (!connectionString) throw new Error('Nemesis report database is not configured')
  return new Pool({ connectionString, max: 1 })
}

function locationParts(value: string) {
  const match = value.match(/^\s*(.*?)(?:,\s*([A-Z]{2}))?\s+(\d{5}(?:-\d{4})?)\s*$/i)
  if (!match) return { city: value.trim(), state: 'CA', postalCode: null }
  return { city: match[1].trim().replace(/,$/, ''), state: (match[2] || 'CA').toUpperCase(), postalCode: match[3] }
}

async function resolveClient(client: PoolClient, values: Record<string, string>, clientId?: string | null) {
  if (clientId) {
    const existing = await client.query('SELECT id FROM nemesis_fire.clients WHERE id=$1 AND active=true', [clientId])
    if (!existing.rows[0]) throw new Error('Selected client was not found')
    return existing.rows[0].id as string
  }

  const city = locationParts(values.cityStateZip || '')
  const matched = await client.query(
    'SELECT id FROM nemesis_fire.clients WHERE lower(business_name)=lower($1) AND lower(address_line1)=lower($2) AND lower(city)=lower($3) ORDER BY created_at LIMIT 1',
    [values.buildingName, values.address, city.city],
  )
  if (matched.rows[0]) {
    const updated = await client.query(
      `UPDATE nemesis_fire.clients SET property_name=COALESCE(NULLIF($2,''),property_name), state=$3,
       postal_code=COALESCE(NULLIF($4,''),postal_code), occupancy=COALESCE(NULLIF($5,''),occupancy),
       construction_type=COALESCE(NULLIF($6,''),construction_type), stories=COALESCE(NULLIF($7,''),stories),
       year_built=COALESCE(NULLIF($8,''),year_built), contact_name=COALESCE(NULLIF($9,''),contact_name),
       contact_phone=COALESCE(NULLIF($10,''),contact_phone), contact_email=COALESCE(NULLIF($11,''),contact_email), updated_at=now()
       WHERE id=$1 RETURNING id`,
      [matched.rows[0].id, values.buildingName, city.state, city.postalCode || '', values.occupancy || '', values.constructionType || '', values.stories || '', values.yearBuilt || '', values.contactName || '', values.contactPhone || '', values.contactEmail || ''],
    )
    return updated.rows[0].id as string
  }

  const created = await client.query(
    `INSERT INTO nemesis_fire.clients (business_name,property_name,address_line1,city,state,postal_code,occupancy,construction_type,stories,year_built,contact_name,contact_phone,contact_email)
     VALUES ($1,$1,$2,$3,$4,$5,NULLIF($6,''),NULLIF($7,''),NULLIF($8,''),NULLIF($9,''),NULLIF($10,''),NULLIF($11,''),NULLIF($12,'')) RETURNING id`,
    [values.buildingName, values.address, city.city || 'Unknown', city.state, city.postalCode, values.occupancy || '', values.constructionType || '', values.stories || '', values.yearBuilt || '', values.contactName || '', values.contactPhone || '', values.contactEmail || ''],
  )
  return created.rows[0].id as string
}

async function upsertReportInput(client: PoolClient, reportId: string, input: NemesisReportInput) {
  const template = await client.query('SELECT id FROM nemesis_fire.report_templates WHERE template_key=$1 AND active=true', [TEMPLATE_KEY])
  if (!template.rows[0]) throw new Error('Report template unavailable')
  const templateId = template.rows[0].id as string
  const rows = await client.query('SELECT item_key,section,item_number,item_kind,description,code_reference FROM nemesis_fire.report_template_items WHERE template_id=$1 ORDER BY sort_order', [templateId])
  for (const row of rows.rows) {
    const entry = input.items[row.item_key] || { result: '', comment: '' }
    const result = entry.result === 'yes' || entry.result === 'no' ? '' : entry.result
    await client.query(
      `INSERT INTO nemesis_fire.report_checklist_items (report_id,item_key,section,item_number,item_kind,description,code_reference,performed_on,result,comment)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8::date,$9,$10)
       ON CONFLICT (report_id,item_key) DO UPDATE SET performed_on=EXCLUDED.performed_on,result=EXCLUDED.result,comment=EXCLUDED.comment`,
      [reportId,row.item_key,row.section,row.item_number,row.item_kind,row.description,row.code_reference,input.values.testDate,result,entry.comment],
    )
  }
  await client.query(
    `INSERT INTO nemesis_fire.report_risers (report_id,riser_number,location,riser_diameter,main_drain_diameter,initial_static_pressure,residual_pressure,final_static_pressure)
     VALUES ($1,1,NULLIF($2,''),NULLIF($3,''),NULLIF($4,''),NULLIF($5,''),NULLIF($6,''),NULLIF($7,''))
     ON CONFLICT (report_id,riser_number) DO UPDATE SET location=EXCLUDED.location,riser_diameter=EXCLUDED.riser_diameter,main_drain_diameter=EXCLUDED.main_drain_diameter,initial_static_pressure=EXCLUDED.initial_static_pressure,residual_pressure=EXCLUDED.residual_pressure,final_static_pressure=EXCLUDED.final_static_pressure`,
    [reportId,input.values.riserLocation || '',input.values.riserDiameter || '',input.values.mainDrainDiameter || '',input.values.initialStatic || '',input.values.residualPressure || '',input.values.finalStatic || ''],
  )
}

export async function saveReportDraft(input: NemesisReportInput, requestedId?: string | null, clientId?: string | null, signedCopy = false) {
  const pool = createPool()
  const client = await pool.connect()
  const id = requestedId || randomUUID()
  const reportNumber = requestedId ? null : 'NF-DRAFT-' + id.slice(0, 8).toUpperCase()
  try {
    await client.query('BEGIN')
    const template = await client.query('SELECT id FROM nemesis_fire.report_templates WHERE template_key=$1 AND active=true', [TEMPLATE_KEY])
    if (!template.rows[0]) throw new Error('Report template unavailable')
    const clientRecordId = await resolveClient(client, input.values, clientId)
    if (requestedId) {
      const existing = await client.query('SELECT status,report_number FROM nemesis_fire.sprinkler_reports WHERE id=$1 FOR UPDATE', [id])
      if (!existing.rows[0]) throw new Error('Saved report not found')
      if (existing.rows[0].status !== 'draft') throw new Error('This report has already been generated. Save it as a new report before editing.')
      await client.query(
        `UPDATE nemesis_fire.sprinkler_reports SET client_id=$2,inspection_date=$3::date,system_type=$4,performed_by=NULLIF($5,''),report_values=$6::jsonb,updated_at=now()
         WHERE id=$1`,
        [id,clientRecordId,input.values.testDate,input.values.systemType,input.values.performedBy || '',JSON.stringify({ values: input.values, items: input.items, signedCopy })],
      )
    } else {
      await client.query(
        `INSERT INTO nemesis_fire.sprinkler_reports (id,report_number,client_id,template_id,status,inspection_date,system_type,performed_by,report_values,revision,created_by)
         VALUES ($1,$2,$3,$4,'draft',$5::date,$6,NULLIF($7,''),$8::jsonb,1,'preview-demo')`,
        [id,reportNumber,clientRecordId,template.rows[0].id,input.values.testDate,input.values.systemType,input.values.performedBy || '',JSON.stringify({ values: input.values, items: input.items, signedCopy })],
      )
    }
    await upsertReportInput(client,id,input)
    await client.query('INSERT INTO nemesis_fire.report_audit_events (report_id,actor_id,action,details) VALUES ($1,$2,$3,$4::jsonb)', [id,'preview-demo','draft_saved',JSON.stringify({ report_number: reportNumber || requestedId, template: TEMPLATE_KEY })])
    const saved = await client.query('SELECT report_number,updated_at FROM nemesis_fire.sprinkler_reports WHERE id=$1', [id])
    await client.query('COMMIT')
    return { reportId: id, reportNumber: saved.rows[0].report_number as string, savedAt: saved.rows[0].updated_at as string }
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

export async function listSavedReports(): Promise<Array<Pick<SavedReport, 'id' | 'reportNumber' | 'status' | 'inspectionDate' | 'buildingName' | 'address' | 'cityStateZip' | 'systemType' | 'hasPdf'>>> {
  const pool = createPool()
  try {
    const result = await pool.query(
      `SELECT r.id,r.report_number,r.status,r.inspection_date,r.system_type,
       COALESCE(r.report_values->'values'->>'buildingName',r.report_values->>'buildingName','') AS building_name,
       COALESCE(r.report_values->'values'->>'address',r.report_values->>'address','') AS address,
       COALESCE(r.report_values->'values'->>'cityStateZip',r.report_values->>'cityStateZip','') AS city_state_zip,
       EXISTS (SELECT 1 FROM nemesis_fire.report_documents d WHERE d.report_id=r.id) AS has_pdf
       FROM nemesis_fire.sprinkler_reports r ORDER BY r.updated_at DESC LIMIT 50`,
    )
    return result.rows.map(row => ({
      id: row.id as string, reportNumber: row.report_number as string, status: row.status as string,
      inspectionDate: row.inspection_date instanceof Date ? row.inspection_date.toISOString().slice(0,10) : String(row.inspection_date).slice(0,10),
      systemType: row.system_type as string, buildingName: row.building_name as string, address: row.address as string,
      cityStateZip: row.city_state_zip as string, hasPdf: row.has_pdf as boolean,
    }))
  } finally { await pool.end() }
}

export async function getSavedReport(id: string): Promise<SavedReport | null> {
  const pool = createPool()
  try {
    const result = await pool.query(
      `SELECT r.id,r.report_number,r.status,r.inspection_date,r.system_type,r.client_id,r.report_values,
       EXISTS (SELECT 1 FROM nemesis_fire.report_documents d WHERE d.report_id=r.id) AS has_pdf
       FROM nemesis_fire.sprinkler_reports r WHERE r.id=$1`, [id],
    )
    const row = result.rows[0]
    if (!row) return null
    const data = row.report_values as Record<string, unknown>
    const values = (data.values && typeof data.values === 'object' ? data.values : data) as Record<string, string>
    const items = (data.items && typeof data.items === 'object' ? data.items : {}) as Record<string, { result: string; comment: string }>
    return {
      id: row.id as string, reportNumber: row.report_number as string, status: row.status as string,
      inspectionDate: row.inspection_date instanceof Date ? row.inspection_date.toISOString().slice(0,10) : String(row.inspection_date).slice(0,10),
      systemType: row.system_type as string, clientId: row.client_id as string | null, values, items, hasPdf: row.has_pdf as boolean,
      signedCopy: data.signedCopy === true,
      buildingName: values.buildingName || '', address: values.address || '', cityStateZip: values.cityStateZip || '',
    }
  } finally { await pool.end() }
}

export async function getSavedReportPdf(id: string) {
  const pool = createPool()
  try {
    const result = await pool.query(
      'SELECT d.file_name,d.pdf_bytes FROM nemesis_fire.report_documents d JOIN nemesis_fire.sprinkler_reports r ON r.id=d.report_id WHERE r.id=$1 ORDER BY d.revision DESC LIMIT 1', [id],
    )
    return result.rows[0] as { file_name: string; pdf_bytes: Uint8Array } | undefined
  } finally { await pool.end() }
}

export async function persistGeneratedReport(reportId: string, pdf: Uint8Array, jobId: string, signedCopy: boolean) {
  const pool = createPool()
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const report = await client.query('SELECT report_number,revision,status,inspection_date FROM nemesis_fire.sprinkler_reports WHERE id=$1 FOR UPDATE', [reportId])
    if (!report.rows[0]) throw new Error('Saved report not found before PDF persistence')
    const revision = Number(report.rows[0].revision || 1)
    const inspectionDate = report.rows[0].inspection_date instanceof Date ? report.rows[0].inspection_date.toISOString().slice(0,10) : String(report.rows[0].inspection_date).slice(0,10)
    const reportNumber = String(report.rows[0].report_number).startsWith('NF-DRAFT-')
      ? 'NF-' + inspectionDate.replace(/-/g, '') + '-' + reportId.replace(/-/g, '').slice(0,6).toUpperCase()
      : report.rows[0].report_number as string
    await client.query("UPDATE nemesis_fire.sprinkler_reports SET report_number=$2,status='generated',updated_at=now(),generated_at=now(),revision=$3 WHERE id=$1", [reportId,reportNumber,revision])
    await client.query('INSERT INTO nemesis_fire.report_documents (report_id,revision,document_service_job_id,file_name,sha256,pdf_bytes) VALUES ($1,$2,$3,$4,$5,$6)', [reportId,revision,jobId,'nemesis-fire-sprinkler-inspection-' + reportNumber + '.pdf',createHash('sha256').update(pdf).digest('hex'),Buffer.from(pdf)])
    await client.query('INSERT INTO nemesis_fire.report_audit_events (report_id,actor_id,action,details) VALUES ($1,$2,$3,$4::jsonb)', [reportId,'preview-demo','pdf_generated',JSON.stringify({ report_number: reportNumber, template: TEMPLATE_KEY, signed: signedCopy })])
    await client.query('COMMIT')
    return { reportId, reportNumber }
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally { client.release(); await pool.end() }
}
