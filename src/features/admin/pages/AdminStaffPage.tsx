import { useCallback, useMemo, useState } from 'react'
import { HiPlus, HiEye, HiPencil, HiLockClosed, HiBan, HiCheck, HiTrash, HiDownload } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { DataTable, type DataTableAction, type DataTableColumn, type DataTableFilter } from '../components/DataTable'
import { PageHeader } from '../components/PageHeader'
import { Avatar } from '../components/Avatar'
import { InfoItem } from '../components/InfoItem'
import { StatusBadge, staffStatusMap } from '../components/StatusBadge'
import { formatDate } from '../components/format'
import { useAdminStaff } from '../api'
import type { AdminStaff } from '../types'

const departments = ['Operations', 'Finance', 'Customer Support', 'Sales', 'IT', 'Human Resources', 'Warehouse']
const statuses = ['active', 'on_leave', 'suspended', 'invited']

export function AdminStaffPage() {
  const { success } = useToast()
  const { data: staff = [] } = useAdminStaff()
  const [selected, setSelected] = useState<AdminStaff | null>(null)

  const columns: DataTableColumn<AdminStaff>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Staff member',
        sortValue: (r) => r.name,
        render: (r) => (
          <div className="flex items-center gap-3">
            <Avatar name={r.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{r.name}</p>
              <p className="truncate text-xs text-[var(--text-muted)]">{r.email}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        sortValue: (r) => r.role,
        render: (r) => <p className="text-sm font-medium text-[var(--text-primary)]">{r.role}</p>,
      },
      {
        key: 'department',
        header: 'Department',
        sortValue: (r) => r.department,
        render: (r) => <p className="text-sm text-[var(--text-secondary)]">{r.department}</p>,
      },
      {
        key: 'location',
        header: 'Location',
        sortValue: (r) => r.location,
        render: (r) => <p className="text-sm text-[var(--text-secondary)]">{r.location}</p>,
        hideOnMobile: true,
      },
      {
        key: 'status',
        header: 'Status',
        sortValue: (r) => r.status,
        render: (r) => <StatusBadge value={r.status} variantMap={staffStatusMap} />,
      },
      {
        key: 'hireDate',
        header: 'Hired',
        sortValue: (r) => r.hireDate,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.hireDate)}</p>
        ),
        hideOnMobile: true,
      },
      {
        key: 'lastActive',
        header: 'Last active',
        sortValue: (r) => r.lastActive,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.lastActive)}</p>
        ),
        hideOnMobile: true,
      },
    ],
    [],
  )

  const filters: DataTableFilter<AdminStaff>[] = useMemo(
    () => [
      {
        key: 'department',
        label: 'Department',
        getValue: (r) => r.department,
        options: departments.map((d) => ({ value: d, label: d })),
      },
      {
        key: 'status',
        label: 'Status',
        getValue: (r) => r.status,
        options: statuses.map((s) => ({ value: s, label: s.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()) })),
      },
    ],
    [],
  )

  const actions = useCallback(
    (row: AdminStaff): DataTableAction<AdminStaff>[] => [
      { label: 'View profile', icon: <HiEye className="h-4 w-4" />, onClick: () => setSelected(row) },
      { label: 'Edit', icon: <HiPencil className="h-4 w-4" />, onClick: () => success('Edit staff', `${row.name}'s record can be updated here.`) },
      { label: 'Reset password', icon: <HiLockClosed className="h-4 w-4" />, onClick: () => success('Reset link sent', `A password reset link was emailed to ${row.email}.`) },
      row.status === 'suspended'
        ? { label: 'Reactivate', icon: <HiCheck className="h-4 w-4" />, onClick: () => success('Staff reactivated', `${row.name} can sign in again.`) }
        : { label: 'Suspend', icon: <HiBan className="h-4 w-4" />, onClick: () => success('Staff suspended', `${row.name} access has been suspended.`), destructive: true },
      { label: 'Delete', icon: <HiTrash className="h-4 w-4" />, onClick: () => success('Staff removed', `${row.name} was deleted.`), destructive: true },
    ],
    [success],
  )

  const metrics = useMemo(
    () => [
      { label: 'Total staff', value: staff.length.toString() },
      { label: 'Active', value: staff.filter((s) => s.status === 'active').length.toString() },
      { label: 'On leave', value: staff.filter((s) => s.status === 'on_leave').length.toString() },
      { label: 'Invited', value: staff.filter((s) => s.status === 'invited').length.toString() },
    ],
    [staff],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff"
        description="Manage employee accounts, roles and access."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => success('Export started', 'Staff directory will be emailed shortly.')}>
              <HiDownload className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={() => success('Invite sent', 'Invitation emails were sent to the new staff members.')}>
              <HiPlus className="h-4 w-4" />
              Invite Staff
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
            rows={staff}
            columns={columns}
            filters={filters}
            actions={actions}
            selectable
            getRowId={(r) => r.id}
            onRowClick={(r) => setSelected(r)}
            searchPlaceholder="Search name, email, role..."
            searchText={(r) => `${r.name} ${r.email} ${r.role} ${r.department} ${r.location}`}
            bulkActions={[
              { label: 'Export', icon: <HiDownload className="h-4 w-4" />, onClick: (rows) => success('Export started', `${rows.length} staff record(s) queued for export.`) },
              { label: 'Suspend', icon: <HiBan className="h-4 w-4" />, onClick: (rows) => success('Staff suspended', `${rows.length} staff member(s) suspended.`), destructive: true },
            ]}
            emptyTitle="No staff found"
            emptyDescription="Try a different search term or clear the active filters."
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        description={selected?.role}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar name={selected.name} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-[var(--text-primary)]">{selected.name}</p>
                <p className="text-sm text-[var(--text-muted)]">{selected.role}</p>
                <div className="mt-1.5">
                  <StatusBadge value={selected.status} variantMap={staffStatusMap} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem label="Email" value={selected.email} />
              <InfoItem label="Phone" value={selected.phone} />
              <InfoItem label="Department" value={selected.department} />
              <InfoItem label="Location" value={selected.location} />
              <InfoItem label="Hire date" value={formatDate(selected.hireDate)} />
              <InfoItem label="Last active" value={formatDate(selected.lastActive)} />
              <InfoItem label="Staff ID" value={selected.id} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button size="sm" onClick={() => success('Reset link sent', `A password reset link was emailed to ${selected.email}.`)}>
                <HiLockClosed className="h-4 w-4" />
                Reset password
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
