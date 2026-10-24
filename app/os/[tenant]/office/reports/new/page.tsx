import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SprinklerReportForm } from '@/components/local-os/os/nemesis-sprinkler-report-form'
import { osBase } from '@/lib/local-os/presentation'

export default async function NewSprinklerReportPage({ params }: { params: { tenant: string } }) {
  const { tenant } = params
  if (tenant !== 'nemesis-fire') notFound()

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link href={`${osBase(tenant)}/office`} className="text-sm font-medium text-slate-600 hover:text-slate-950">← Office</Link>
        <header className="mt-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Nemesis Fire · Office</p>
          <h1 className="mt-2 text-3xl font-bold">Five-year sprinkler inspection report</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">Enter a sample inspection record to generate a form-style PDF for Alex to review. The current walkthrough uses fictional sample data.</p>
        </header>
        <SprinklerReportForm />
      </div>
    </main>
  )
}
