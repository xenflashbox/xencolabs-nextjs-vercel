'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { SPRINKLER_REPORT_ITEMS, type ReportResult } from '@/lib/local-os/nemesis-fire/sprinkler-report-items'

type Values = Record<string, string>
type ItemValue = { result: ReportResult; comment: string }
const FIELDS: { key: string; label: string; required?: boolean }[] = [
  { key: 'buildingName', label: 'Building name', required: true },
  { key: 'address', label: 'Street address', required: true },
  { key: 'cityStateZip', label: 'City, State, ZIP', required: true },
  { key: 'contactName', label: 'Site contact' },
  { key: 'contactPhone', label: 'Site contact phone' },
  { key: 'contactEmail', label: 'Site contact email' },
  { key: 'occupancy', label: 'Occupancy / use' },
  { key: 'constructionType', label: 'Construction type' },
  { key: 'stories', label: 'Number of stories' },
  { key: 'yearBuilt', label: 'Year constructed' },
  { key: 'jobNumber', label: 'Job number' },
  { key: 'performedBy', label: 'Performed by' },
  { key: 'testDate', label: 'Inspection date', required: true },
  { key: 'riserCount', label: 'Number of risers' },
  { key: 'riserLocation', label: 'Riser location' },
  { key: 'riserDiameter', label: 'Riser diameter' },
  { key: 'mainDrainDiameter', label: 'Main drain diameter' },
  { key: 'initialStatic', label: 'Initial static pressure (psi)' },
  { key: 'residualPressure', label: 'Residual pressure (psi)' },
  { key: 'finalStatic', label: 'Final static pressure (psi)' },
  { key: 'technicianName', label: 'Technician print name' },
]
const GROUPS = [
  { key: 'five-year', title: 'Five-year inspection items', detail: 'Use the result type printed on each row. Enter measured values only in the labeled fields.' },
  { key: 'annual', title: 'Annual and quarterly items', detail: 'Some rows use Pass / Fail / N/A; items 1.28 and 3.4 / 3.6 use Yes / No checkboxes. Follow the item-specific instructions.' },
  { key: 'maintenance', title: 'Maintenance items', detail: 'Use Yes / No only where the official form shows checkboxes. Record repair findings in Deficiencies and Comments.' },
] as const
const INPUT = 'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm'

export function SprinklerReportForm() {
  const [values, setValues] = useState<Values>({
    buildingName: 'Redwood Court Offices',
    address: '415 Sonoma Highway',
    cityStateZip: 'Santa Rosa, CA 95401',
    contactName: 'Jordan Taylor',
    contactPhone: '(707) 555-0142',
    occupancy: 'Office',
    constructionType: 'Type V-A',
    stories: '2',
    yearBuilt: '2004',
    jobNumber: 'NF-2026-001',
    performedBy: 'Alejandro Ruiz',
    testDate: new Date().toISOString().slice(0, 10),
    systemType: 'Wet Pipe',
    riserCount: '1',
    riserLocation: 'Main utility room',
    riserDiameter: '',
    mainDrainDiameter: '',
    technicianName: '',
  })
  const [items, setItems] = useState<Record<string, ItemValue>>({})
  const [signedCopy, setSignedCopy] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const itemCount = useMemo(() => Object.values(items).filter((x) => x.result).length, [items])

  function setField(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
  }
  function setItem(id: string, patch: Partial<ItemValue>) {
    setItems((current) => {
      const previous = current[id] ?? { result: '' as ReportResult, comment: '' }
      return { ...current, [id]: { result: patch.result ?? previous.result, comment: patch.comment ?? previous.comment } }
    })
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setPdfUrl('')
    try {
      const response = await fetch('/api/nemesis-fire/sprinkler-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values, items, signedCopy }),
      })
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.detail || 'The report could not be generated. Please try again.')
      }
      const file = await response.blob()
      setPdfUrl(URL.createObjectURL(file))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The report could not be generated.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-base font-semibold">Property and visit</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FIELDS.slice(0, 13).map((field) => (
            <label key={field.key} className="text-xs font-medium text-slate-600">
              {field.label}{field.required ? ' *' : ''}
              <input required={field.required} value={values[field.key] ?? ''} onChange={(e) => setField(field.key, e.target.value)} className={INPUT} />
            </label>
          ))}
          <label className="text-xs font-medium text-slate-600">Sprinkler system type
            <select value={values.systemType ?? 'Wet Pipe'} onChange={(e) => setField('systemType', e.target.value)} className={INPUT}>
              {['Wet Pipe', 'Dry Pipe', 'Pre-action', 'Deluge', 'Other / not specified'].map((x) => <option key={x}>{x}</option>)}
            </select>
          </label>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-base font-semibold">Riser and main drain</h2>
        <p className="mt-1 text-xs text-slate-500">These fields fill the riser/main-drain table on page 1 of the report. Each riser uses one row: number, location, riser diameter, main-drain diameter, initial static pressure, residual pressure, and final static pressure. Water supply pressures and alarm time are entered beside checklist items 1.7, 1.8, and 2.3 below.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FIELDS.slice(13, 20).map((field) => (
            <label key={field.key} className="text-xs font-medium text-slate-600">
              {field.label}
              <input value={values[field.key] ?? ''} onChange={(e) => setField(field.key, e.target.value)} className={INPUT} />
            </label>
          ))}
        </div>
      </section>
      {GROUPS.map((group) => (
        <section key={group.key} className="rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <h2 className="text-base font-semibold">{group.title}</h2>
            <p className="mt-1 text-xs text-slate-500">{group.detail}</p>
          </div>
          <div className="mt-4 space-y-3">
            {SPRINKLER_REPORT_ITEMS.filter((item) => item.group === group.key).map((item) => (
              <div key={item.id} className="grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-[3rem_1fr_10rem]">
                <span className="font-mono text-xs font-semibold text-slate-500">{item.id}</span>
                <div>
                  <p className="text-sm font-medium">{item.description}</p>
                  <p className="text-xs text-slate-400">Reference on supplied form: {item.reference}</p>
                  {item.instruction ? <p className="mt-1 text-xs font-medium text-amber-800">{item.instruction}</p> : null}
                  {item.inputMode === 'pressure-below' || item.inputMode === 'pressure-above' || item.inputMode === 'seconds' ? (
                    <label className="mt-2 block text-xs font-medium text-slate-600">
                      {item.id === '1.7' ? 'Water supply pressure below riser (PSI)' : item.id === '1.8' ? 'Water supply pressure above riser (PSI)' : 'Water flow alarm time (seconds)'}
                      <input type="number" min="0" step="any" inputMode="decimal" aria-label={item.id + ' measurement'} value={values[item.id === '1.7' ? 'waterSupplyBelow' : item.id === '1.8' ? 'waterSupplyAbove' : 'waterflowTime'] ?? ''} onChange={(e) => setField(item.id === '1.7' ? 'waterSupplyBelow' : item.id === '1.8' ? 'waterSupplyAbove' : 'waterflowTime', e.target.value)} className={INPUT} />
                    </label>
                  ) : null}
                  {item.id === '1.28' || item.id === '3.4' ? <p className="mt-1 text-xs text-slate-500">Findings and repair details belong in the Deficiencies and Comments section at the end of the report.</p> : null}
                  {item.comments !== false ? <input aria-label={item.id + ' comments'} placeholder="Comments (optional)" value={items[item.id]?.comment ?? ''} onChange={(e) => setItem(item.id, { comment: e.target.value })} className={INPUT} /> : null}
                </div>
                {item.inputMode === 'yes-no' ? (
                  <label className="text-xs font-medium text-slate-600">{item.id === '1.28' ? 'Are there unsprinklered areas?' : item.id === '3.4' ? 'Internal pipe inspection?' : 'System returned to service?'}
                    <select aria-label={item.id + ' yes or no'} value={items[item.id]?.result ?? ''} onChange={(e) => setItem(item.id, { result: e.target.value as ReportResult })} className={INPUT}>
                      <option value="">Choose yes or no</option><option value="yes">Yes</option><option value="no">No</option>
                    </select>
                  </label>
                ) : (
                  <label className="text-xs font-medium text-slate-600">Result (P / F / N/A)
                    <select aria-label={item.id + ' result'} value={items[item.id]?.result ?? ''} onChange={(e) => setItem(item.id, { result: e.target.value as ReportResult })} className={INPUT}>
                      <option value="">Not recorded</option><option value="pass">Pass</option><option value="fail">Fail</option><option value="na">N/A</option>
                    </select>
                  </label>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-base font-semibold">Deficiencies and technician sign-off</h2>
        <label className="mt-3 block text-xs font-medium text-slate-600">Deficiencies / comments
          <textarea rows={4} value={values.deficiencies ?? ''} onChange={(e) => setField('deficiencies', e.target.value)} className={INPUT} />
        </label>
        <label className="mt-3 block max-w-md text-xs font-medium text-slate-600">Technician print name
          <input value={values.technicianName ?? ''} onChange={(e) => setField('technicianName', e.target.value)} className={INPUT} />
        </label>
        <label className="mt-4 flex items-start gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={signedCopy} onChange={(e) => setSignedCopy(e.target.checked)} className="mt-1" />
          <span>Inspection is complete and Alex Ruiz authorized his typed signature on this report.</span>
        </label>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">{itemCount} of {SPRINKLER_REPORT_ITEMS.length} checklist results recorded</p>
        <button type="submit" disabled={busy} className="rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white disabled:opacity-60">
          {busy ? 'Generating report…' : 'Generate sprinkler report PDF'}
        </button>
      </div>
      {error ? <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
      {pdfUrl ? (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-950">
          PDF generated. <a href={pdfUrl} target="_blank" rel="noreferrer" className="font-semibold underline">Open or download the inspection report</a>
        </div>
      ) : null}
    </form>
  )
}
