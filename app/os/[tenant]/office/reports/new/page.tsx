import Link from 'next/link'
import { cookies, headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { SprinklerReportForm } from '@/components/local-os/os/nemesis-sprinkler-report-form'
import { osBase } from '@/lib/local-os/presentation'
import { hasNemesisDemoRequestAccess } from '@/lib/local-os/nemesis-fire/demo-access'
import type { Route } from 'next'

export const dynamic = 'force-dynamic'

type PageProps = { params: { tenant: string } }

export default async function NewSprinklerReportPage({ params }: PageProps) {
  const { tenant } = params
  if (tenant !== 'nemesis-fire') notFound()
  const requestHeaders = headers()
  const cookieStore = cookies()
  if (!hasNemesisDemoRequestAccess(requestHeaders.get('host'), cookieStore.get('nemesis_demo_access')?.value)) notFound()

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link href={`${osBase(tenant)}/office` as Route} className="text-sm font-medium text-slate-600 hover:text-slate-950">← Office</Link>
        <header className="mt-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Nemesis Fire · Office</p>
          <h1 className="mt-2 text-3xl font-bold">Five-year sprinkler inspection report</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">Complete the inspection details and generate the finished report.</p>
        </header>
        <SprinklerReportForm />
      </div>
    </main>
  )
}
