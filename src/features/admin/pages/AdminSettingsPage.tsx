import { useState } from 'react'
import { HiSave, HiOfficeBuilding, HiCurrencyDollar, HiBell, HiShieldCheck, HiTrash } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useToast } from '@/components/ui/Toast'
import { PageHeader } from '../components/PageHeader'
import { cn } from '@/lib/utils'

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
        checked ? 'bg-tsg-500' : 'bg-[var(--border-default)]',
      )}
    >
      <span
        className={cn(
          'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
          checked && 'translate-x-5',
        )}
      />
    </button>
  )
}

export function AdminSettingsPage() {
  const { success } = useToast()
  const [general, setGeneral] = useState({
    name: 'T.S.G Logistics',
    email: 'Gratefullogisticsotm@gmail.com',
    phone: '+233 30 245 8890',
    address: 'Independence Ave, Accra',
    timezone: 'Africa/Accra (GMT+0)',
    currency: 'USD ($)',
  })
  const [notifications, setNotifications] = useState({
    shipmentAlerts: true,
    paymentAlerts: true,
    securityAlerts: true,
    weeklyDigest: false,
  })

  const save = (label: string) => success('Settings saved', `${label} changes have been applied.`)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure company profile, billing and preferences."
        actions={
          <Button size="sm" onClick={() => save('All')}>
            <HiSave className="h-4 w-4" />
            Save changes
          </Button>
        }
      />

      <Tabs defaultValue="general">
        <TabsList variant="pills">
          <TabsTrigger value="general">
            <HiOfficeBuilding className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="billing">
            <HiCurrencyDollar className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <HiBell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <HiShieldCheck className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Company profile</CardTitle>
              <CardDescription>These details appear on invoices and customer communications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Company name"
                  value={general.name}
                  onChange={(e) => setGeneral((g) => ({ ...g, name: e.target.value }))}
                />
                <Input
                  label="Support email"
                  type="email"
                  value={general.email}
                  onChange={(e) => setGeneral((g) => ({ ...g, email: e.target.value }))}
                />
                <Input
                  label="Phone"
                  value={general.phone}
                  onChange={(e) => setGeneral((g) => ({ ...g, phone: e.target.value }))}
                />
                <Input
                  label="Head office address"
                  value={general.address}
                  onChange={(e) => setGeneral((g) => ({ ...g, address: e.target.value }))}
                />
                <Select
                  label="Timezone"
                  value={general.timezone}
                  onChange={(e) => setGeneral((g) => ({ ...g, timezone: e.target.value }))}
                  options={[
                    { value: 'Africa/Accra (GMT+0)', label: 'Africa/Accra (GMT+0)' },
                    { value: 'Africa/Lagos (GMT+1)', label: 'Africa/Lagos (GMT+1)' },
                    { value: 'Africa/Nairobi (GMT+3)', label: 'Africa/Nairobi (GMT+3)' },
                    { value: 'Africa/Johannesburg (GMT+2)', label: 'Africa/Johannesburg (GMT+2)' },
                  ]}
                />
                <Select
                  label="Base currency"
                  value={general.currency}
                  onChange={(e) => setGeneral((g) => ({ ...g, currency: e.target.value }))}
                  options={[
                    { value: 'USD ($)', label: 'USD ($)' },
                    { value: 'EUR (€)', label: 'EUR (€)' },
                    { value: 'GBP (£)', label: 'GBP (£)' },
                    { value: 'GHS (₵)', label: 'GHS (₵)' },
                    { value: 'NGN (₦)', label: 'NGN (₦)' },
                  ]}
                />
              </div>
              <div className="mt-5 flex justify-end">
                <Button size="sm" onClick={() => save('Company profile')}>
                  <HiSave className="h-4 w-4" />
                  Save profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & invoicing</CardTitle>
              <CardDescription>Defaults for invoices, payment terms and tax.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select
                  label="Invoice number prefix"
                  options={[
                    { value: 'INV-', label: 'INV-' },
                    { value: 'TSG-', label: 'TSG-' },
                    { value: 'BILL-', label: 'BILL-' },
                  ]}
                />
                <Select
                  label="Default payment terms"
                  options={[
                    { value: 'Due on receipt', label: 'Due on receipt' },
                    { value: 'Net 15', label: 'Net 15' },
                    { value: 'Net 30', label: 'Net 30' },
                    { value: 'Net 45', label: 'Net 45' },
                  ]}
                />
                <Input label="VAT / tax rate (%)" placeholder="e.g. 15" type="number" />
                <Select
                  label="Late payment reminder"
                  options={[
                    { value: '3 days after due date', label: '3 days after due date' },
                    { value: '7 days after due date', label: '7 days after due date' },
                    { value: '14 days after due date', label: '14 days after due date' },
                  ]}
                />
              </div>
              <div className="mt-5 flex justify-end">
                <Button size="sm" onClick={() => save('Billing')}>
                  <HiSave className="h-4 w-4" />
                  Save billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
              <CardDescription>Choose which system alerts are delivered.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ToggleRow
                  title="Shipment status alerts"
                  description="Notify staff when shipments move between statuses."
                  checked={notifications.shipmentAlerts}
                  onChange={() => setNotifications((n) => ({ ...n, shipmentAlerts: !n.shipmentAlerts }))}
                />
                <ToggleRow
                  title="Payment alerts"
                  description="Receive alerts on incoming and failed payments."
                  checked={notifications.paymentAlerts}
                  onChange={() => setNotifications((n) => ({ ...n, paymentAlerts: !n.paymentAlerts }))}
                />
                <ToggleRow
                  title="Security alerts"
                  description="Alert administrators on login anomalies and permission changes."
                  checked={notifications.securityAlerts}
                  onChange={() => setNotifications((n) => ({ ...n, securityAlerts: !n.securityAlerts }))}
                />
                <ToggleRow
                  title="Weekly digest"
                  description="A summary email of key metrics every Monday."
                  checked={notifications.weeklyDigest}
                  onChange={() => setNotifications((n) => ({ ...n, weeklyDigest: !n.weeklyDigest }))}
                />
              </div>
              <div className="mt-5 flex justify-end">
                <Button size="sm" onClick={() => save('Notification preferences')}>
                  <HiSave className="h-4 w-4" />
                  Save preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage authentication and access safeguards.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select
                  label="Session timeout"
                  options={[
                    { value: '15 minutes', label: '15 minutes' },
                    { value: '30 minutes', label: '30 minutes' },
                    { value: '60 minutes', label: '60 minutes' },
                    { value: 'Never', label: 'Never' },
                  ]}
                />
                <Select
                  label="Password expiry"
                  options={[
                    { value: '90 days', label: '90 days' },
                    { value: '180 days', label: '180 days' },
                    { value: '1 year', label: '1 year' },
                    { value: 'Never', label: 'Never' },
                  ]}
                />
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)]/50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Two-factor authentication</p>
                  <p className="text-xs text-[var(--text-muted)]">Require 2FA for all administrator accounts.</p>
                </div>
                <Toggle checked onChange={() => success('2FA enabled', 'Two-factor authentication is now required for admins.')} />
              </div>
              <div className="mt-5 flex justify-end">
                <Button size="sm" onClick={() => save('Security')}>
                  <HiSave className="h-4 w-4" />
                  Save security
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger zone</CardTitle>
              <CardDescription>Irreversible actions for your workspace.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Delete workspace</p>
                  <p className="text-xs text-[var(--text-muted)]">Permanently remove all data, customers and shipments.</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => success('Action cancelled', 'Deletion requires additional confirmation. Nothing was deleted.')}>
                  <HiTrash className="h-4 w-4" />
                  Delete workspace
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)]/50 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">{title}</p>
        <p className="text-xs text-[var(--text-muted)]">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}
