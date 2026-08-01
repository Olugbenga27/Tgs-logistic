import { useCallback, useMemo, useState } from 'react'
import { HiDownload, HiEye, HiCheck, HiBan } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { DataTable, type DataTableAction, type DataTableColumn, type DataTableFilter } from '../components/DataTable'
import { PageHeader } from '../components/PageHeader'
import { InfoItem } from '../components/InfoItem'
import { StatusBadge, invoiceStatusMap } from '../components/StatusBadge'
import { formatDate, formatMoney, formatMoneyExact } from '../components/format'
import { useAdminInvoices } from '../api'
import type { AdminInvoice } from '../types'

const statuses = ['draft', 'sent', 'paid', 'overdue', 'void']

export function AdminInvoicesPage() {
  const { success } = useToast()
  const { data: invoices = [] } = useAdminInvoices()
  const [selected, setSelected] = useState<AdminInvoice | null>(null)

  const columns: DataTableColumn<AdminInvoice>[] = useMemo(
    () => [
      {
        key: 'id',
        header: 'Invoice',
        sortValue: (r) => r.id,
        render: (r) => (
          <div>
            <p className="text-sm font-semibold text-tsg-600 dark:text-tsg-300">{r.id}</p>
            <p className="text-xs text-[var(--text-muted)]">{r.poNumber}</p>
          </div>
        ),
      },
      {
        key: 'customer',
        header: 'Customer',
        sortValue: (r) => r.customer,
        render: (r) => <p className="text-sm font-medium text-[var(--text-primary)]">{r.customer}</p>,
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
        render: (r) => <StatusBadge value={r.status} variantMap={invoiceStatusMap} />,
      },
      {
        key: 'issueDate',
        header: 'Issued',
        sortValue: (r) => r.issueDate,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.issueDate)}</p>
        ),
        hideOnMobile: true,
      },
      {
        key: 'dueDate',
        header: 'Due',
        sortValue: (r) => r.dueDate,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.dueDate)}</p>
        ),
      },
      {
        key: 'items',
        header: 'Items',
        align: 'right',
        sortValue: (r) => r.items,
        render: (r) => <span className="text-sm text-[var(--text-secondary)]">{r.items}</span>,
        hideOnMobile: true,
      },
    ],
    [],
  )

  const filters: DataTableFilter<AdminInvoice>[] = useMemo(
    () => [
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
    (row: AdminInvoice): DataTableAction<AdminInvoice>[] => [
      { label: 'View invoice', icon: <HiEye className="h-4 w-4" />, onClick: () => setSelected(row) },
      { label: 'Download PDF', icon: <HiDownload className="h-4 w-4" />, onClick: () => success('Download started', `Invoice ${row.id} PDF is being prepared.`) },
      row.status !== 'paid'
        ? { label: 'Mark as paid', icon: <HiCheck className="h-4 w-4" />, onClick: () => success('Invoice marked paid', `${row.id} has been settled.`) }
        : { label: 'Void invoice', icon: <HiBan className="h-4 w-4" />, onClick: () => success('Invoice voided', `${row.id} has been voided.`), destructive: true },
    ],
    [success],
  )

  const metrics = useMemo(
    () => {
      const outstanding = invoices.filter((i) => i.status === 'overdue' || i.status === 'sent')
      const collected = invoices.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
      return [
        { label: 'Invoices', value: invoices.length.toString() },
        { label: 'Outstanding', value: formatMoney(outstanding.reduce((sum, i) => sum + i.amount, 0)) },
        { label: 'Overdue', value: invoices.filter((i) => i.status === 'overdue').length.toString() },
        { label: 'Collected', value: formatMoney(collected) },
      ]
    },
    [invoices],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Issue, track and settle customer invoices."
        actions={
          <Button variant="secondary" size="sm" onClick={() => success('Export started', 'Invoice register will be emailed shortly.')}>
            <HiDownload className="h-4 w-4" />
            Export Register
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
            rows={invoices}
            columns={columns}
            filters={filters}
            actions={actions}
            selectable
            getRowId={(r) => r.id}
            onRowClick={(r) => setSelected(r)}
            searchPlaceholder="Search invoice ID, customer, PO..."
            searchText={(r) => `${r.id} ${r.customer} ${r.poNumber}`}
            bulkActions={[
              { label: 'Export', icon: <HiDownload className="h-4 w-4" />, onClick: (rows) => success('Export started', `${rows.length} invoice(s) queued for export.`) },
              { label: 'Mark as paid', icon: <HiCheck className="h-4 w-4" />, onClick: (rows) => success('Invoices marked paid', `${rows.length} invoice(s) settled.`) },
            ]}
            emptyTitle="No invoices found"
            emptyDescription="Try a different search term or clear the active filters."
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.id}
        description={selected ? `Issue date: ${formatDate(selected.issueDate)}` : undefined}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)]/50 px-4 py-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Total due</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{formatMoneyExact(selected.amount)}</p>
              </div>
              <StatusBadge value={selected.status} variantMap={invoiceStatusMap} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem label="Customer" value={selected.customer} />
              <InfoItem label="PO number" value={selected.poNumber} />
              <InfoItem label="Issue date" value={formatDate(selected.issueDate)} />
              <InfoItem label="Due date" value={formatDate(selected.dueDate)} />
              {selected.paidDate && <InfoItem label="Paid date" value={formatDate(selected.paidDate)} />}
              <InfoItem label="Line items" value={selected.items.toString()} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button size="sm" onClick={() => success('Download started', `Invoice ${selected.id} PDF is being prepared.`)}>
                <HiDownload className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
