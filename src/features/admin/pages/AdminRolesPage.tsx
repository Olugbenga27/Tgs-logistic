import { useCallback, useMemo, useState } from 'react'
import { HiPlus, HiShieldCheck, HiPencil, HiTrash, HiCheck, HiBan, HiDuplicate } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/components/ui/Toast'
import { DataTable, type DataTableAction, type DataTableColumn } from '../components/DataTable'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import { formatDate } from '../components/format'
import { useAdminRoles } from '../api'
import type { AdminRole, RolePermissionGroup } from '../types'

const levelMap: Record<string, 'danger' | 'primary' | 'info' | 'default' | 'neutral'> = {
  System: 'danger',
  Administrator: 'primary',
  Manager: 'info',
  Operator: 'default',
  Viewer: 'neutral',
}

export function AdminRolesPage() {
  const { success } = useToast()
  const { data: roles = [] } = useAdminRoles()
  const [selected, setSelected] = useState<AdminRole | null>(null)
  const [perms, setPerms] = useState<RolePermissionGroup[]>([])

  const openRole = (role: AdminRole) => {
    setSelected(role)
    setPerms(role.permissions.map((g) => ({ group: g.group, items: g.items.map((i) => ({ ...i })) })))
  }

  const grantedCount = (role: AdminRole) =>
    role.permissions.reduce((sum, g) => sum + g.items.filter((i) => i.granted).length, 0)
  const totalCount = (role: AdminRole) =>
    role.permissions.reduce((sum, g) => sum + g.items.length, 0)

  const columns: DataTableColumn<AdminRole>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Role',
        sortValue: (r) => r.name,
        render: (r) => (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tsg-500/10 text-tsg-600 dark:text-tsg-300">
              <HiShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{r.name}</p>
              <p className="truncate text-xs text-[var(--text-muted)]">{r.description}</p>
            </div>
          </div>
        ),
      },
      {
        key: 'level',
        header: 'Level',
        sortValue: (r) => r.level,
        render: (r) => <Badge variant={levelMap[r.level]} size="sm">{r.level}</Badge>,
        hideOnMobile: true,
      },
      {
        key: 'permissions',
        header: 'Permissions',
        render: (r) => (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[var(--surface-alt)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-tsg-500 to-tsg-400"
                style={{ width: `${totalCount(r) === 0 ? 0 : (grantedCount(r) / totalCount(r)) * 100}%` }}
              />
            </div>
            <span className="text-xs text-[var(--text-muted)]">
              {grantedCount(r)}/{totalCount(r)}
            </span>
          </div>
        ),
      },
      {
        key: 'members',
        header: 'Members',
        align: 'right',
        sortValue: (r) => r.members,
        render: (r) => <span className="text-sm font-medium text-[var(--text-primary)]">{r.members}</span>,
      },
      {
        key: 'status',
        header: 'Status',
        sortValue: (r) => r.status,
        render: (r) => <StatusBadge value={r.status} variantMap={{ active: 'success', archived: 'neutral' }} />,
      },
      {
        key: 'updatedAt',
        header: 'Updated',
        sortValue: (r) => r.updatedAt,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.updatedAt)}</p>
        ),
        hideOnMobile: true,
      },
    ],
    [],
  )

  const actions = useCallback(
    (row: AdminRole): DataTableAction<AdminRole>[] => [
      { label: 'Edit permissions', icon: <HiShieldCheck className="h-4 w-4" />, onClick: () => openRole(row) },
      { label: 'Edit', icon: <HiPencil className="h-4 w-4" />, onClick: () => success('Edit role', `${row.name} details can be updated here.`) },
      { label: 'Duplicate', icon: <HiDuplicate className="h-4 w-4" />, onClick: () => success('Role duplicated', `${row.name} was copied as a new role.`) },
      row.status === 'archived'
        ? { label: 'Activate', icon: <HiCheck className="h-4 w-4" />, onClick: () => success('Role activated', `${row.name} is active again.`) }
        : { label: 'Archive', icon: <HiBan className="h-4 w-4" />, onClick: () => success('Role archived', `${row.name} was archived.`), destructive: true },
      { label: 'Delete', icon: <HiTrash className="h-4 w-4" />, onClick: () => success('Role deleted', `${row.name} was removed.`), destructive: true },
    ],
    [success],
  )

  const togglePerm = (groupIdx: number, itemIdx: number) => {
    setPerms((prev) =>
      prev.map((g, gi) =>
        gi === groupIdx
          ? { ...g, items: g.items.map((i, ii) => (ii === itemIdx ? { ...i, granted: !i.granted } : i)) }
          : g,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        description="Control what each role can access across the platform."
        actions={
          <Button size="sm" onClick={() => success('Coming soon', 'The create role form is not implemented yet.')}>
            <HiPlus className="h-4 w-4" />
            New Role
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Total roles</p>
            <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{roles.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Active</p>
            <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
              {roles.filter((r) => r.status === 'active').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Seats assigned</p>
            <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
              {roles.reduce((sum, r) => sum + r.members, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Archived</p>
            <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
              {roles.filter((r) => r.status === 'archived').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable
            rows={roles}
            columns={columns}
            actions={actions}
            getRowId={(r) => r.id}
            searchPlaceholder="Search role name..."
            searchText={(r) => `${r.name} ${r.description} ${r.level}`}
            emptyTitle="No roles found"
            emptyDescription="Try a different search term."
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        description={selected ? `Level: ${selected.level} · ${selected.members} member(s)` : undefined}
        size="lg"
      >
        {selected && (
          <div className="space-y-5">
            <div className="space-y-5">
              {perms.map((group, gi) => (
                <div key={group.group}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {group.group}
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {group.items.map((item, ii) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => togglePerm(gi, ii)}
                        className={cn(
                          'flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors',
                          item.granted
                            ? 'border-tsg-500/40 bg-tsg-500/5 text-[var(--text-primary)]'
                            : 'border-[var(--border-subtle)] bg-[var(--surface-alt)]/40 text-[var(--text-secondary)]',
                        )}
                      >
                        <span className="font-medium">{item.label}</span>
                        <span
                          className={cn(
                            'relative h-5 w-9 shrink-0 rounded-full transition-colors',
                            item.granted ? 'bg-tsg-500' : 'bg-[var(--border-default)]',
                          )}
                        >
                          <span
                            className={cn(
                              'absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
                              item.granted ? 'translate-x-4' : 'translate-x-0',
                            )}
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSelected(null)
                  success('Permissions saved', `${selected.name} permissions have been updated.`)
                }}
              >
                <HiCheck className="h-4 w-4" />
                Save changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
