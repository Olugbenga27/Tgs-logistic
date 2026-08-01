import { useCallback, useMemo, useState } from 'react'
import { HiPlus, HiDownload, HiEye, HiPencil, HiBan, HiCheck } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { DataTable, type DataTableAction, type DataTableColumn, type DataTableFilter } from '../components/DataTable'
import { PageHeader } from '../components/PageHeader'
import { Avatar } from '../components/Avatar'
import { InfoItem } from '../components/InfoItem'
import { StatusBadge, customerStatusMap, customerSegmentMap } from '../components/StatusBadge'
import { formatCompact, formatDate, formatMoney } from '../components/format'
import { useAdminCustomers } from '../api'
import type { AdminCustomer } from '../types'

const segments = ['retail', 'corporate', 'sme', 'enterprise']
const statuses = ['active', 'inactive', 'pending', 'blocked']

export function AdminCustomersPage() {
  const { success } = useToast()
  const { data: customers = [] } = useAdminCustomers()
  const [selected, setSelected] = useState<AdminCustomer | null>(null)

  const columns: DataTableColumn<AdminCustomer>[] = useMemo(
    () => [
      {
        key: 'customer',
        header: 'Customer',
        sortValue: (r) => r.name,
        render: (r) => (
          <div className="flex items-center gap-3">
            <Avatar name={r.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{r.name}</p>
              <p className="truncate text-xs text-[var(--text-muted)]">{r.company}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'contact',
        header: 'Contact',
        render: (r) => (
          <div className="min-w-0">
            <p className="truncate text-sm text-[var(--text-primary)]">{r.email}</p>
            <p className="text-xs text-[var(--text-muted)]">{r.phone}</p>
          </div>
        ),
      },
      {
        key: 'segment',
        header: 'Segment',
        sortValue: (r) => r.segment,
        render: (r) => <StatusBadge value={r.segment} variantMap={customerSegmentMap} dot={false} />,
      },
      {
        key: 'status',
        header: 'Status',
        sortValue: (r) => r.status,
        render: (r) => <StatusBadge value={r.status} variantMap={customerStatusMap} />,
      },
      {
        key: 'location',
        header: 'Location',
        sortValue: (r) => r.country,
        render: (r) => (
          <p className="text-sm text-[var(--text-secondary)]">
            {r.city}, {r.country}
          </p>
        ),
        hideOnMobile: true,
      },
      {
        key: 'shipments',
        header: 'Shipments',
        align: 'right',
        sortValue: (r) => r.totalShipments,
        render: (r) => <span className="text-sm font-medium text-[var(--text-primary)]">{r.totalShipments}</span>,
      },
      {
        key: 'spent',
        header: 'Total Spent',
        align: 'right',
        sortValue: (r) => r.totalSpent,
        render: (r) => <span className="text-sm font-semibold text-[var(--text-primary)]">{formatMoney(r.totalSpent)}</span>,
      },
      {
        key: 'lastActive',
        header: 'Last Active',
        sortValue: (r) => r.lastActive,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.lastActive)}</p>
        ),
        hideOnMobile: true,
      },
    ],
    [],
  )

  const filters: DataTableFilter<AdminCustomer>[] = useMemo(
    () => [
      {
        key: 'segment',
        label: 'Segment',
        getValue: (r) => r.segment,
        options: segments.map((s) => ({ value: s, label: s.replace(/^\w/, (c) => c.toUpperCase()) })),
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
    (row: AdminCustomer): DataTableAction<AdminCustomer>[] => [
      { label: 'View profile', icon: <HiEye className="h-4 w-4" />, onClick: () => setSelected(row) },
      { label: 'Edit', icon: <HiPencil className="h-4 w-4" />, onClick: () => success('Edit customer', `${row.name}'s profile can be updated here.`) },
      row.status === 'blocked'
        ? { label: 'Unblock', icon: <HiCheck className="h-4 w-4" />, onClick: () => success('Customer unblocked', `${row.name} now has access restored.`) }
        : { label: 'Block', icon: <HiBan className="h-4 w-4" />, onClick: () => success('Customer blocked', `${row.name} has been blocked.`), destructive: true },
    ],
    [success],
  )

  const metrics = useMemo(
    () => [
      { label: 'Total customers', value: customers.length.toString() },
      { label: 'Active', value: customers.filter((c) => c.status === 'active').length.toString() },
      { label: 'Blocked', value: customers.filter((c) => c.status === 'blocked').length.toString() },
      { label: 'Total revenue', value: formatCompact(customers.reduce((sum, c) => sum + c.totalSpent, 0)) },
    ],
    [customers],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Manage customer accounts, segments and access."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => success('Export started', 'Customer list will be emailed to you shortly.')}>
              <HiDownload className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={() => success('Coming soon', 'The add customer form is not implemented yet.')}>
              <HiPlus className="h-4 w-4" />
              Add Customer
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
            rows={customers}
            columns={columns}
            filters={filters}
            actions={actions}
            selectable
            getRowId={(r) => r.id}
            onRowClick={(r) => setSelected(r)}
            searchPlaceholder="Search name, email, company..."
            searchText={(r) => `${r.name} ${r.email} ${r.company} ${r.phone} ${r.city} ${r.country}`}
            bulkActions={[
              { label: 'Export', icon: <HiDownload className="h-4 w-4" />, onClick: (rows) => success('Export started', `${rows.length} customer(s) queued for export.`) },
              { label: 'Block', icon: <HiBan className="h-4 w-4" />, onClick: (rows) => success('Customers blocked', `${rows.length} customer(s) blocked.`), destructive: true },
            ]}
            emptyTitle="No customers found"
            emptyDescription="Try a different search term or clear the active filters."
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Customer profile"
        description={selected ? `Member since ${formatDate(selected.joined)}` : undefined}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar name={selected.name} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-[var(--text-primary)]">{selected.name}</p>
                <p className="text-sm text-[var(--text-muted)]">{selected.company}</p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  <StatusBadge value={selected.status} variantMap={customerStatusMap} />
                  <StatusBadge value={selected.segment} variantMap={customerSegmentMap} dot={false} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem label="Email" value={selected.email} />
              <InfoItem label="Phone" value={selected.phone} />
              <InfoItem label="Location" value={`${selected.city}, ${selected.country}`} />
              <InfoItem label="Joined" value={formatDate(selected.joined)} />
              <InfoItem label="Total shipments" value={selected.totalShipments.toString()} />
              <InfoItem label="Total spent" value={formatMoney(selected.totalSpent)} />
              <InfoItem label="Last active" value={formatDate(selected.lastActive)} />
              <InfoItem label="Customer ID" value={selected.id} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button size="sm" onClick={() => success('Edit mode', 'Customer details are ready to edit.')}>
                <HiPencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
