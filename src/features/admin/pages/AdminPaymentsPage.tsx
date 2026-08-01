import { useCallback, useMemo, useState } from 'react'
import { HiDownload, HiEye, HiRefresh } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { DataTable, type DataTableAction, type DataTableColumn, type DataTableFilter } from '../components/DataTable'
import { PageHeader } from '../components/PageHeader'
import { InfoItem } from '../components/InfoItem'
import { StatusBadge, paymentStatusMap, paymentMethodMap } from '../components/StatusBadge'
import { formatDate, formatMoney, formatMoneyExact } from '../components/format'
import { useAdminPayments } from '../api'
import type { AdminPayment } from '../types'

const methods = ['card', 'bank_transfer', 'mobile_money', 'cash']
const statuses = ['paid', 'pending', 'failed', 'refunded']

export function AdminPaymentsPage() {
  const { success } = useToast()
  const { data: payments = [] } = useAdminPayments()
  const [selected, setSelected] = useState<AdminPayment | null>(null)

  const columns: DataTableColumn<AdminPayment>[] = useMemo(
    () => [
      {
        key: 'reference',
        header: 'Reference',
        sortValue: (r) => r.reference,
        render: (r) => (
          <div>
            <p className="text-sm font-semibold text-tsg-600 dark:text-tsg-300">{r.reference}</p>
            <p className="text-xs text-[var(--text-muted)]">{r.id}</p>
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
        key: 'description',
        header: 'Description',
        render: (r) => <p className="truncate text-sm text-[var(--text-secondary)]">{r.description}</p>,
        hideOnMobile: true,
      },
      {
        key: 'method',
        header: 'Method',
        sortValue: (r) => r.method,
        render: (r) => <StatusBadge value={r.method} variantMap={paymentMethodMap} dot={false} />,
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
        render: (r) => <StatusBadge value={r.status} variantMap={paymentStatusMap} />,
      },
      {
        key: 'date',
        header: 'Date',
        sortValue: (r) => r.date,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.date)}</p>
        ),
        hideOnMobile: true,
      },
    ],
    [],
  )

  const filters: DataTableFilter<AdminPayment>[] = useMemo(
    () => [
      {
        key: 'method',
        label: 'Method',
        getValue: (r) => r.method,
        options: methods.map((m) => ({ value: m, label: m.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()) })),
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
    (row: AdminPayment): DataTableAction<AdminPayment>[] => [
      { label: 'View payment', icon: <HiEye className="h-4 w-4" />, onClick: () => setSelected(row) },
      { label: 'Send receipt', icon: <HiDownload className="h-4 w-4" />, onClick: () => success('Receipt sent', `Receipt for ${row.reference} emailed to the customer.`) },
      row.status === 'pending'
        ? { label: 'Retry payment', icon: <HiRefresh className="h-4 w-4" />, onClick: () => success('Payment retried', `${row.reference} has been re-queued.`) }
        : { label: 'Refund', icon: <HiRefresh className="h-4 w-4" />, onClick: () => success('Refund started', `Refund for ${formatMoneyExact(row.amount)} processed.`), destructive: true },
    ],
    [success],
  )

  const metrics = useMemo(
    () => {
      const paid = payments.filter((p) => p.status === 'paid')
      return [
        { label: 'Transactions', value: payments.length.toString() },
        { label: 'Collected', value: formatMoney(paid.reduce((sum, p) => sum + p.amount, 0)) },
        { label: 'Pending', value: payments.filter((p) => p.status === 'pending').length.toString() },
        { label: 'Failed', value: payments.filter((p) => p.status === 'failed').length.toString() },
      ]
    },
    [payments],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Track incoming payments, refunds and transaction status."
        actions={
          <Button variant="secondary" size="sm" onClick={() => success('Export started', 'Payment ledger will be emailed shortly.')}>
            <HiDownload className="h-4 w-4" />
            Export Ledger
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
            rows={payments}
            columns={columns}
            filters={filters}
            actions={actions}
            selectable
            getRowId={(r) => r.id}
            onRowClick={(r) => setSelected(r)}
            searchPlaceholder="Search reference, customer, invoice..."
            searchText={(r) => `${r.reference} ${r.customer} ${r.invoice} ${r.description} ${r.id}`}
            bulkActions={[
              { label: 'Export', icon: <HiDownload className="h-4 w-4" />, onClick: (rows) => success('Export started', `${rows.length} transaction(s) queued for export.`) },
            ]}
            emptyTitle="No payments found"
            emptyDescription="Try a different search term or clear the active filters."
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.reference}
        description={selected?.id}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)]/50 px-4 py-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Total</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{formatMoneyExact(selected.amount + selected.fee)}</p>
              </div>
              <StatusBadge value={selected.status} variantMap={paymentStatusMap} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem label="Customer" value={selected.customer} />
              <InfoItem label="Invoice" value={selected.invoice} />
              <InfoItem label="Description" value={selected.description} />
              <InfoItem label="Method" value={selected.method.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())} />
              <InfoItem label="Amount" value={formatMoneyExact(selected.amount)} />
              <InfoItem label="Processing fee" value={formatMoneyExact(selected.fee)} />
              <InfoItem label="Date" value={formatDate(selected.date)} />
              <InfoItem label="Payment ID" value={selected.id} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button size="sm" onClick={() => success('Receipt sent', `Receipt for ${selected.reference} emailed to the customer.`)}>
                <HiDownload className="h-4 w-4" />
                Send receipt
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
