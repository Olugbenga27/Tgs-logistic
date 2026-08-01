import { useCallback, useMemo, useState } from 'react'
import { HiPlus, HiEye, HiPaperAirplane, HiCheck, HiX, HiTrash } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { DataTable, type DataTableAction, type DataTableColumn, type DataTableFilter } from '../components/DataTable'
import { PageHeader } from '../components/PageHeader'
import { InfoItem } from '../components/InfoItem'
import { StatusBadge, quoteStatusMap, quoteSourceMap } from '../components/StatusBadge'
import { formatDate, formatMoney, formatWeight } from '../components/format'
import { useAdminQuotes } from '../api'
import type { AdminQuote } from '../types'

const statuses = ['new', 'sent', 'accepted', 'rejected', 'expired']
const sources = ['web', 'admin', 'api']
const services = ['air', 'sea', 'road', 'warehousing', 'last_mile']

const serviceLabels: Record<string, string> = {
  air: 'Air freight',
  sea: 'Sea freight',
  road: 'Road freight',
  warehousing: 'Warehousing',
  last_mile: 'Last mile',
}

export function AdminQuotesPage() {
  const { success } = useToast()
  const { data: quotes = [] } = useAdminQuotes()
  const [selected, setSelected] = useState<AdminQuote | null>(null)

  const columns: DataTableColumn<AdminQuote>[] = useMemo(
    () => [
      {
        key: 'id',
        header: 'Quote',
        sortValue: (r) => r.id,
        render: (r) => (
          <div>
            <p className="text-sm font-semibold text-tsg-600 dark:text-tsg-300">{r.id}</p>
            <p className="text-xs text-[var(--text-muted)]">{r.customer}</p>
          </div>
        ),
      },
      {
        key: 'service',
        header: 'Service',
        sortValue: (r) => r.service,
        render: (r) => <p className="text-sm font-medium text-[var(--text-primary)]">{serviceLabels[r.service]}</p>,
      },
      {
        key: 'route',
        header: 'Route',
        render: (r) => (
          <p className="text-sm text-[var(--text-secondary)]">
            {r.origin} <span className="text-[var(--text-muted)]">→</span> {r.destination}
          </p>
        ),
      },
      {
        key: 'weight',
        header: 'Weight',
        align: 'right',
        sortValue: (r) => r.weight,
        render: (r) => <span className="text-sm text-[var(--text-secondary)]">{formatWeight(r.weight)}</span>,
        hideOnMobile: true,
      },
      {
        key: 'amount',
        header: 'Amount',
        align: 'right',
        sortValue: (r) => r.amount,
        render: (r) => <span className="text-sm font-semibold text-[var(--text-primary)]">{formatMoney(r.amount)}</span>,
      },
      {
        key: 'status',
        header: 'Status',
        sortValue: (r) => r.status,
        render: (r) => <StatusBadge value={r.status} variantMap={quoteStatusMap} />,
      },
      {
        key: 'source',
        header: 'Source',
        sortValue: (r) => r.source,
        render: (r) => <StatusBadge value={r.source} variantMap={quoteSourceMap} dot={false} />,
        hideOnMobile: true,
      },
      {
        key: 'validUntil',
        header: 'Valid until',
        sortValue: (r) => r.validUntil,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.validUntil)}</p>
        ),
        hideOnMobile: true,
      },
    ],
    [],
  )

  const filters: DataTableFilter<AdminQuote>[] = useMemo(
    () => [
      {
        key: 'status',
        label: 'Status',
        getValue: (r) => r.status,
        options: statuses.map((s) => ({ value: s, label: s.replace(/^\w/, (c) => c.toUpperCase()) })),
      },
      {
        key: 'source',
        label: 'Source',
        getValue: (r) => r.source,
        options: sources.map((s) => ({ value: s, label: s.replace(/^\w/, (c) => c.toUpperCase()) })),
      },
      {
        key: 'service',
        label: 'Service',
        getValue: (r) => r.service,
        options: services.map((s) => ({ value: s, label: serviceLabels[s] })),
      },
    ],
    [],
  )

  const actions = useCallback(
    (row: AdminQuote): DataTableAction<AdminQuote>[] => [
      { label: 'View quote', icon: <HiEye className="h-4 w-4" />, onClick: () => setSelected(row) },
      row.status === 'new' && { label: 'Send quote', icon: <HiPaperAirplane className="h-4 w-4" />, onClick: () => success('Quote sent', `${row.id} was emailed to ${row.customer}.`) },
      row.status !== 'accepted' && { label: 'Mark accepted', icon: <HiCheck className="h-4 w-4" />, onClick: () => success('Quote accepted', `${row.id} is now accepted.`) },
      row.status !== 'rejected' && { label: 'Reject', icon: <HiX className="h-4 w-4" />, onClick: () => success('Quote rejected', `${row.id} was rejected.`), destructive: true },
      { label: 'Delete', icon: <HiTrash className="h-4 w-4" />, onClick: () => success('Quote deleted', `${row.id} was removed.`), destructive: true },
    ].filter(Boolean) as DataTableAction<AdminQuote>[],
    [success],
  )

  const metrics = useMemo(
    () => {
      const awaiting = quotes.filter((q) => q.status === 'new' || q.status === 'sent')
      const accepted = quotes.filter((q) => q.status === 'accepted')
      return [
        { label: 'Total quotes', value: quotes.length.toString() },
        { label: 'Awaiting response', value: awaiting.length.toString() },
        { label: 'Accepted', value: accepted.length.toString() },
        { label: 'Expired', value: quotes.filter((q) => q.status === 'expired').length.toString() },
      ]
    },
    [quotes],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quotes"
        description="Review, send and convert freight quotes."
        actions={
          <Button size="sm" onClick={() => success('Coming soon', 'The create quote form is not implemented yet.')}>
            <HiPlus className="h-4 w-4" />
            New Quote
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

      <Card>
        <CardContent className="p-0">
          <DataTable
            rows={quotes}
            columns={columns}
            filters={filters}
            actions={actions}
            selectable
            getRowId={(r) => r.id}
            onRowClick={(r) => setSelected(r)}
            searchPlaceholder="Search quote ID, customer, route..."
            searchText={(r) => `${r.id} ${r.customer} ${r.origin} ${r.destination}`}
            bulkActions={[
              { label: 'Send', icon: <HiPaperAirplane className="h-4 w-4" />, onClick: (rows) => success('Quotes sent', `${rows.length} quote(s) emailed to customers.`) },
            ]}
            emptyTitle="No quotes found"
            emptyDescription="Try a different search term or clear the active filters."
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.id}
        description={selected ? `${serviceLabels[selected.service]} · ${selected.origin} → ${selected.destination}` : undefined}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)]/50 px-4 py-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Quoted amount</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{formatMoney(selected.amount)}</p>
              </div>
              <StatusBadge value={selected.status} variantMap={quoteStatusMap} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem label="Customer" value={selected.customer} />
              <InfoItem label="Service" value={serviceLabels[selected.service]} />
              <InfoItem label="Origin" value={selected.origin} />
              <InfoItem label="Destination" value={selected.destination} />
              <InfoItem label="Weight" value={formatWeight(selected.weight)} />
              <InfoItem label="Source" value={selected.source.replace(/^\w/, (c) => c.toUpperCase())} />
              <InfoItem label="Created" value={formatDate(selected.createdAt)} />
              <InfoItem label="Valid until" value={formatDate(selected.validUntil)} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button size="sm" onClick={() => success('Quote sent', `${selected.id} was emailed to ${selected.customer}.`)}>
                <HiPaperAirplane className="h-4 w-4" />
                Send quote
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
