import { useCallback, useMemo, useState } from 'react'
import { HiMail, HiPaperAirplane, HiEye, HiTrash, HiCheck, HiInbox } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useToast } from '@/components/ui/Toast'
import { DataTable, type DataTableAction, type DataTableColumn, type DataTableFilter } from '../components/DataTable'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge, notificationTypeMap, notificationPriorityMap } from '../components/StatusBadge'
import { formatDate } from '../components/format'
import { useAdminNotifications } from '../api'
import type { AdminNotification } from '../types'

const types = ['shipment', 'payment', 'system', 'alert', 'promo']
const priorities = ['low', 'normal', 'high', 'critical']
const statuses = ['read', 'unread']

export function AdminNotificationsPage() {
  const { success } = useToast()
  const { data: notifications = [] } = useAdminNotifications()
  const [selected, setSelected] = useState<AdminNotification | null>(null)
  const [composeOpen, setComposeOpen] = useState(false)
  const [form, setForm] = useState({ title: '', message: '', type: 'system', priority: 'normal', audience: 'All users' })

  const columns: DataTableColumn<AdminNotification>[] = useMemo(
    () => [
      {
        key: 'title',
        header: 'Notification',
        sortValue: (r) => r.title,
        render: (r) => (
          <div className="min-w-0">
            <p className={cn('truncate text-sm', r.status === 'unread' ? 'font-semibold text-[var(--text-primary)]' : 'font-medium text-[var(--text-secondary)]')}>
              {r.title}
            </p>
            <p className="truncate text-xs text-[var(--text-muted)]">{r.message}</p>
          </div>
        ),
      },
      {
        key: 'type',
        header: 'Type',
        sortValue: (r) => r.type,
        render: (r) => <StatusBadge value={r.type} variantMap={notificationTypeMap} dot={false} />,
      },
      {
        key: 'priority',
        header: 'Priority',
        sortValue: (r) => r.priority,
        render: (r) => <StatusBadge value={r.priority} variantMap={notificationPriorityMap} dot />,
        hideOnMobile: true,
      },
      {
        key: 'status',
        header: 'Status',
        sortValue: (r) => r.status,
        render: (r) => (
          <StatusBadge
            value={r.status}
            variantMap={{ read: 'neutral', unread: 'primary' }}
            dot
          />
        ),
      },
      {
        key: 'audience',
        header: 'Audience',
        render: (r) => <p className="text-sm text-[var(--text-secondary)]">{r.audience}</p>,
        hideOnMobile: true,
      },
      {
        key: 'createdAt',
        header: 'Sent',
        sortValue: (r) => r.createdAt,
        render: (r) => (
          <p className="whitespace-nowrap text-sm text-[var(--text-secondary)]">{formatDate(r.createdAt)}</p>
        ),
        hideOnMobile: true,
      },
    ],
    [],
  )

  const filters: DataTableFilter<AdminNotification>[] = useMemo(
    () => [
      {
        key: 'type',
        label: 'Type',
        getValue: (r) => r.type,
        options: types.map((t) => ({ value: t, label: t.replace(/^\w/, (c) => c.toUpperCase()) })),
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
    (row: AdminNotification): DataTableAction<AdminNotification>[] => [
      { label: 'View', icon: <HiEye className="h-4 w-4" />, onClick: () => setSelected(row) },
      row.status === 'unread'
        ? { label: 'Mark as read', icon: <HiCheck className="h-4 w-4" />, onClick: () => success('Marked as read', `"${row.title}" is now read.`) }
        : { label: 'Mark as unread', icon: <HiMail className="h-4 w-4" />, onClick: () => success('Marked as unread', `"${row.title}" moved back to unread.`) },
      { label: 'Delete', icon: <HiTrash className="h-4 w-4" />, onClick: () => success('Notification deleted', `"${row.title}" was removed.`), destructive: true },
    ],
    [success],
  )

  const metrics = useMemo(
    () => [
      { label: 'Total', value: notifications.length.toString() },
      { label: 'Unread', value: notifications.filter((n) => n.status === 'unread').length.toString() },
      { label: 'Critical', value: notifications.filter((n) => n.priority === 'critical').length.toString() },
      { label: 'Alerts', value: notifications.filter((n) => n.type === 'alert').length.toString() },
    ],
    [notifications],
  )

  const handleSend = () => {
    setComposeOpen(false)
    setForm({ title: '', message: '', type: 'system', priority: 'normal', audience: 'All users' })
    success('Notification sent', 'Your broadcast was delivered to the selected audience.')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Broadcast updates to customers and staff."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => success('All caught up', 'Every notification has been marked as read.')}>
              <HiCheck className="h-4 w-4" />
              Mark all read
            </Button>
            <Button size="sm" onClick={() => setComposeOpen(true)}>
              <HiPaperAirplane className="h-4 w-4" />
              Compose
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
            rows={notifications}
            columns={columns}
            filters={filters}
            actions={actions}
            getRowId={(r) => r.id}
            onRowClick={(r) => setSelected(r)}
            searchPlaceholder="Search title or message..."
            searchText={(r) => `${r.title} ${r.message} ${r.audience}`}
            emptyTitle="No notifications found"
            emptyDescription="Try a different search term or clear the active filters."
            toolbarExtra={
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <HiInbox className="h-4 w-4" />
                {notifications.length} total
              </div>
            }
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        description={selected ? `Sent ${formatDate(selected.createdAt)} · ${selected.audience}` : undefined}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <StatusBadge value={selected.type} variantMap={notificationTypeMap} dot={false} />
              <StatusBadge value={selected.priority} variantMap={notificationPriorityMap} dot />
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)]/50 p-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              {selected.message}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button size="sm" onClick={() => success('Marked as read', `"${selected.title}" is now read.`)}>
                <HiCheck className="h-4 w-4" />
                Mark as read
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={composeOpen}
        onClose={() => setComposeOpen(false)}
        title="Compose notification"
        description="Broadcast a message to a selected audience."
      >
        <div className="space-y-4">
          <Input
            label="Title"
            placeholder="e.g. New rate update"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <Input
            label="Message"
            placeholder="Write the notification body..."
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Type"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              options={types.map((t) => ({ value: t, label: t.replace(/^\w/, (c) => c.toUpperCase()) }))}
            />
            <Select
              label="Priority"
              value={form.priority}
              onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
              options={priorities.map((p) => ({ value: p, label: p.replace(/^\w/, (c) => c.toUpperCase()) }))}
            />
          </div>
          <Select
            label="Audience"
            value={form.audience}
            onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))}
            options={[
              { value: 'All users', label: 'All users' },
              { value: 'All customers', label: 'All customers' },
              { value: 'Corporate clients', label: 'Corporate clients' },
              { value: 'All staff', label: 'All staff' },
              { value: 'Finance team', label: 'Finance team' },
              { value: 'Warehouse managers', label: 'Warehouse managers' },
            ]}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setComposeOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSend} disabled={!form.title.trim() || !form.message.trim()}>
              <HiPaperAirplane className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
