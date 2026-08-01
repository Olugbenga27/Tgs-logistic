import { useCallback, useMemo, useState } from 'react'
import { HiPlus, HiDownload, HiEye, HiPencil, HiTrash } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { DataTable, type DataTableAction, type DataTableColumn, type DataTableFilter } from '../components/DataTable'
import { PageHeader } from '../components/PageHeader'
import { InfoItem } from '../components/InfoItem'
import { StatusBadge, shipmentStatusMap, shipmentTypeMap, priorityMap, paymentStatusMap } from '../components/StatusBadge'
import { formatDate, formatDateShort, formatMoney, formatWeight } from '../components/format'
import { useAdminShipments } from '../api'
import type { AdminShipment } from '../types'

const statuses = ['pending', 'in_transit', 'delivered', 'on_hold', 'cancelled', 'returned']
const modes = ['air', 'sea', 'road']

export function AdminShipmentsPage() {
  const { success } = useToast()
  const { data: shipments = [] } = useAdminShipments()
  const [selected, setSelected] = useState<AdminShipment | null>(null)

  const columns: DataTableColumn<AdminShipment>[] = useMemo(
    () => [
      {
        key: 'id',
        header: 'Shipment',
        sortValue: (r) => r.id,
        render: (r) => (
          <div>
            <p className="text-sm font-semibold text-tsg-600 dark:text-tsg-300">{r.id}</p>
            <p className="text-xs text-[var(--text-muted)]">{r.customer}</p>
          </div>
        ),
      },
      {
        key: 'route',
        header: 'Route',
        sortValue: (r) => r.origin,
        render: (r) => (
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{r.origin}</p>
            <p className="text-xs text-[var(--text-muted)]">→ {r.destination}</p>
          </div>
        ),
      },
      {
        key: 'type',
        header: 'Mode',
        sortValue: (r) => r.type,
        render: (r) => <StatusBadge value={r.type} variantMap={shipmentTypeMap} dot={false} />,
        hideOnMobile: true,
      },
      {
        key: 'status',
        header: 'Status',
        sortValue: (r) => r.status,
        render: (r) => <StatusBadge value={r.status} variantMap={shipmentStatusMap} />,
      },
      {
        key: 'priority',
        header: 'Priority',
        sortValue: (r) => r.priority,
        render: (r) => <StatusBadge value={r.priority} variantMap={priorityMap} dot={false} />,
        hideOnMobile: true,
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
        key: 'cost',
        header: 'Cost',
        align: 'right',
        sortValue: (r) => r.cost,
        render: (r) => <span className="text-sm font-semibold text-[var(--text-primary)]">{formatMoney(r.cost)}</span>,
      },
      {
        key: 'paymentStatus',
        header: 'Payment',
        sortValue: (r) => r.paymentStatus,
        render: (r) => <StatusBadge value={r.paymentStatus} variantMap={paymentStatusMap} />,
        hideOnMobile: true,
      },
      {
        key: 'eta',
        header: 'ETA',
        sortValue: (r) => r.eta,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDateShort(r.eta)}</p>
        ),
        hideOnMobile: true,
      },
    ],
    [],
  )

  const filters: DataTableFilter<AdminShipment>[] = useMemo(
    () => [
      {
        key: 'status',
        label: 'Status',
        getValue: (r) => r.status,
        options: statuses.map((s) => ({ value: s, label: s.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()) })),
      },
      {
        key: 'type',
        label: 'Mode',
        getValue: (r) => r.type,
        options: modes.map((m) => ({ value: m, label: m.replace(/^\w/, (c) => c.toUpperCase()) })),
      },
      {
        key: 'paymentStatus',
        label: 'Payment',
        getValue: (r) => r.paymentStatus,
        options: ['paid', 'pending', 'failed', 'refunded'].map((s) => ({ value: s, label: s.replace(/^\w/, (c) => c.toUpperCase()) })),
      },
    ],
    [],
  )

  const actions = useCallback(
    (row: AdminShipment): DataTableAction<AdminShipment>[] => [
      { label: 'View details', icon: <HiEye className="h-4 w-4" />, onClick: () => setSelected(row) },
      { label: 'Edit', icon: <HiPencil className="h-4 w-4" />, onClick: () => success('Edit shipment', `${row.id} can be updated here.`) },
      { label: 'Cancel shipment', icon: <HiTrash className="h-4 w-4" />, onClick: () => success('Shipment cancelled', `${row.id} has been cancelled.`), destructive: true },
    ],
    [success],
  )

  const metrics = useMemo(
    () => [
      { label: 'Total shipments', value: shipments.length.toString() },
      { label: 'In transit', value: shipments.filter((s) => s.status === 'in_transit').length.toString() },
      { label: 'Delivered', value: shipments.filter((s) => s.status === 'delivered').length.toString() },
      { label: 'On hold', value: shipments.filter((s) => s.status === 'on_hold').length.toString() },
    ],
    [shipments],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shipments"
        description="Oversee all shipments across every branch and courier."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => success('Export started', 'Shipment report will be emailed shortly.')}>
              <HiDownload className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={() => success('Coming soon', 'The create shipment form is not implemented yet.')}>
              <HiPlus className="h-4 w-4" />
              New Shipment
            </Button>
          </>
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
            rows={shipments}
            columns={columns}
            filters={filters}
            actions={actions}
            selectable
            getRowId={(r) => r.id}
            onRowClick={(r) => setSelected(r)}
            searchPlaceholder="Search shipment ID, customer, route..."
            searchText={(r) => `${r.id} ${r.customer} ${r.origin} ${r.destination} ${r.courier}`}
            bulkActions={[
              { label: 'Export', icon: <HiDownload className="h-4 w-4" />, onClick: (rows) => success('Export started', `${rows.length} shipment(s) queued for export.`) },
              { label: 'Cancel', icon: <HiTrash className="h-4 w-4" />, onClick: (rows) => success('Shipments cancelled', `${rows.length} shipment(s) cancelled.`), destructive: true },
            ]}
            emptyTitle="No shipments found"
            emptyDescription="Try a different search term or clear the active filters."
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.id}
        description={selected ? `${selected.origin} → ${selected.destination}` : undefined}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <StatusBadge value={selected.status} variantMap={shipmentStatusMap} />
              <StatusBadge value={selected.type} variantMap={shipmentTypeMap} dot={false} />
              <StatusBadge value={selected.priority} variantMap={priorityMap} dot={false} />
              <StatusBadge value={selected.paymentStatus} variantMap={paymentStatusMap} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem label="Customer" value={selected.customer} />
              <InfoItem label="Customer ID" value={selected.customerId} />
              <InfoItem label="Courier" value={selected.courier} />
              <InfoItem label="Weight" value={formatWeight(selected.weight)} />
              <InfoItem label="Cost" value={formatMoney(selected.cost)} />
              <InfoItem label="Created" value={formatDate(selected.createdAt)} />
              <InfoItem label="ETA" value={formatDate(selected.eta)} />
              <InfoItem label="Payment" value={selected.paymentStatus.replace(/^\w/, (c) => c.toUpperCase())} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button size="sm" onClick={() => success('Track shipment', `Opening live tracking for ${selected.id}.`)}>
                Track shipment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
