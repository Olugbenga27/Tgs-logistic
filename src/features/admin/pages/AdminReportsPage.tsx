import { useCallback, useMemo, useState } from 'react'
import { HiDownload, HiCalendar, HiRefresh } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { DataTable, type DataTableAction, type DataTableColumn, type DataTableFilter } from '../components/DataTable'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge, reportCategoryMap, reportStatusMap, reportFormatMap } from '../components/StatusBadge'
import { formatDate } from '../components/format'
import { useAdminReports } from '../api'
import type { AdminReport } from '../types'

const categories = ['financial', 'operations', 'analytics', 'compliance', 'fleet']
const statuses = ['ready', 'generating', 'scheduled', 'failed']

const categoryLabels: Record<string, string> = {
  financial: 'Financial',
  operations: 'Operations',
  analytics: 'Analytics',
  compliance: 'Compliance',
  fleet: 'Fleet',
}

export function AdminReportsPage() {
  const { success } = useToast()
  const { data: reports = [] } = useAdminReports()
  const [selected, setSelected] = useState<AdminReport | null>(null)

  const columns: DataTableColumn<AdminReport>[] = useMemo(
    () => [
      {
        key: 'title',
        header: 'Report',
        sortValue: (r) => r.title,
        render: (r) => (
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{r.title}</p>
            <p className="text-xs text-[var(--text-muted)]">{r.id}</p>
          </div>
        ),
      },
      {
        key: 'category',
        header: 'Category',
        sortValue: (r) => r.category,
        render: (r) => <StatusBadge value={r.category} variantMap={reportCategoryMap} dot={false} />,
      },
      {
        key: 'schedule',
        header: 'Schedule',
        sortValue: (r) => r.schedule,
        render: (r) => (
          <p className="text-sm capitalize text-[var(--text-secondary)]">{r.schedule.replace('_', ' ')}</p>
        ),
        hideOnMobile: true,
      },
      {
        key: 'format',
        header: 'Format',
        sortValue: (r) => r.format,
        render: (r) => <StatusBadge value={r.format} variantMap={reportFormatMap} dot={false} />,
        hideOnMobile: true,
      },
      {
        key: 'size',
        header: 'Size',
        render: (r) => <p className="text-sm text-[var(--text-secondary)]">{r.size}</p>,
        hideOnMobile: true,
      },
      {
        key: 'status',
        header: 'Status',
        sortValue: (r) => r.status,
        render: (r) => <StatusBadge value={r.status} variantMap={reportStatusMap} />,
      },
      {
        key: 'downloads',
        header: 'Downloads',
        align: 'right',
        sortValue: (r) => r.downloads,
        render: (r) => <span className="text-sm font-medium text-[var(--text-primary)]">{r.downloads}</span>,
      },
      {
        key: 'generated',
        header: 'Generated',
        sortValue: (r) => r.generated,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.generated)}</p>
        ),
        hideOnMobile: true,
      },
    ],
    [],
  )

  const filters: DataTableFilter<AdminReport>[] = useMemo(
    () => [
      {
        key: 'category',
        label: 'Category',
        getValue: (r) => r.category,
        options: categories.map((c) => ({ value: c, label: categoryLabels[c] })),
      },
      {
        key: 'status',
        label: 'Status',
        getValue: (r) => r.status,
        options: statuses.map((s) => ({ value: s, label: s.replace(/^\w/, (c) => c.toUpperCase()) })),
      },
    ],
    [],
  )

  const actions = useCallback(
    (row: AdminReport): DataTableAction<AdminReport>[] => [
      { label: 'Download', icon: <HiDownload className="h-4 w-4" />, onClick: () => success('Download started', `${row.title} (${row.format.toUpperCase()}) is downloading.`) },
      { label: 'Regenerate', icon: <HiRefresh className="h-4 w-4" />, onClick: () => success('Regenerating', `${row.title} will be re-built and emailed to you.`) },
      { label: 'Schedule', icon: <HiCalendar className="h-4 w-4" />, onClick: () => setSelected(row) },
    ],
    [success],
  )

  const { totalDownloads, categoryDist, formatDist, maxCategory } = useMemo(() => {
    const totalDownloads = reports.reduce((sum, r) => sum + r.downloads, 0)
    const categoryDist = categories.map((c) => ({
      key: c,
      label: categoryLabels[c],
      count: reports.filter((r) => r.category === c).length,
    }))
    const formatDist = (['pdf', 'csv', 'xlsx'] as const).map((f) => ({
      key: f,
      count: reports.filter((r) => r.format === f).length,
    }))
    const maxCategory = Math.max(...categoryDist.map((c) => c.count), 1)
    return { totalDownloads, categoryDist, formatDist, maxCategory }
  }, [reports])

  const maxFormat = Math.max(...formatDist.map((f) => f.count), 1)

  const metrics = useMemo(
    () => [
      { label: 'Reports', value: reports.length.toString() },
      { label: 'Downloads', value: totalDownloads.toString() },
      { label: 'Scheduled', value: reports.filter((r) => r.status === 'scheduled').length.toString() },
      { label: 'Failed', value: reports.filter((r) => r.status === 'failed').length.toString() },
    ],
    [reports, totalDownloads],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate, schedule and download operational reports."
        actions={
          <Button size="sm" onClick={() => success('Report scheduled', 'A new custom report has been queued for generation.')}>
            <HiCalendar className="h-4 w-4" />
            New Report
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{m.label}</p>
              <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Reports by category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryDist.map((c) => (
                <div key={c.key}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-[var(--text-secondary)]">{c.label}</span>
                    <span className="text-[var(--text-muted)]">{c.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-alt)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(c.count / maxCategory) * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-tsg-500 to-tsg-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Output by format</CardTitle>
              <Badge variant="neutral" size="sm">Jul 2026</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-6 px-2">
              {formatDist.map((f) => (
                <div key={f.key} className="flex flex-1 flex-col items-center justify-end gap-2 h-full">
                  <span className="text-xs font-semibold text-[var(--text-muted)]">{f.count}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(f.count / maxFormat) * 80}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-24 rounded-t-lg bg-gradient-to-t from-tsg-600 to-tsg-400"
                  />
                  <span className="text-xs font-medium uppercase text-[var(--text-secondary)]">{f.key}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable
            rows={reports}
            columns={columns}
            filters={filters}
            actions={actions}
            selectable
            getRowId={(r) => r.id}
            searchPlaceholder="Search report title..."
            searchText={(r) => `${r.title} ${r.id} ${r.category}`}
            bulkActions={[
              { label: 'Download all', icon: <HiDownload className="h-4 w-4" />, onClick: (rows) => success('Download started', `${rows.length} report(s) queued for download.`) },
            ]}
            emptyTitle="No reports found"
            emptyDescription="Try a different search term or clear the active filters."
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        description={selected ? `Schedule: ${selected.schedule.replace('_', ' ')} · Period: ${selected.period}` : undefined}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <StatusBadge value={selected.category} variantMap={reportCategoryMap} dot={false} />
              <StatusBadge value={selected.format} variantMap={reportFormatMap} dot={false} />
              <StatusBadge value={selected.status} variantMap={reportStatusMap} />
            </div>

            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)]/50 p-4 text-sm text-[var(--text-secondary)]">
              Delivery frequency: <span className="font-semibold capitalize text-[var(--text-primary)]">{selected.schedule.replace('_', ' ')}</span>.
              Last generated on <span className="font-semibold text-[var(--text-primary)]">{formatDate(selected.generated)}</span> with{' '}
              <span className="font-semibold text-[var(--text-primary)]">{selected.downloads}</span> downloads to date.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button size="sm" onClick={() => success('Schedule updated', `${selected.title} delivery schedule has been updated.`)}>
                Update schedule
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
