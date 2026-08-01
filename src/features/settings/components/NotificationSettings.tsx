import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiTruck, HiCurrencyDollar, HiUserGroup, HiShieldCheck } from 'react-icons/hi'
import { cn } from '@/lib/utils'

interface NotificationGroup {
  id: string
  title: string
  icon: React.ElementType
  channels: { id: string; label: string; key: keyof typeof defaultState; type: 'push' | 'email' | 'sms' }[]
}

const defaultState = {
  shipmentCreated: true,
  shipmentInTransit: true,
  shipmentDelivered: true,
  shipmentDelayed: true,
  paymentReceived: true,
  paymentFailed: true,
  invoiceReady: false,
  teamInvite: true,
  teamUpdate: false,
  securityAlert: true,
  loginAlert: true,
  promoEmail: false,
}

const groups: NotificationGroup[] = [
  { id: 'shipments', title: 'Shipments', icon: HiTruck, channels: [
    { id: 'created', label: 'Shipment Created', key: 'shipmentCreated', type: 'push' },
    { id: 'in_transit', label: 'In Transit Update', key: 'shipmentInTransit', type: 'email' },
    { id: 'delivered', label: 'Delivered', key: 'shipmentDelivered', type: 'push' },
    { id: 'delayed', label: 'Delayed', key: 'shipmentDelayed', type: 'sms' },
  ]},
  { id: 'billing', title: 'Billing', icon: HiCurrencyDollar, channels: [
    { id: 'payment_received', label: 'Payment Received', key: 'paymentReceived', type: 'email' },
    { id: 'payment_failed', label: 'Payment Failed', key: 'paymentFailed', type: 'push' },
    { id: 'invoice_ready', label: 'Invoice Ready', key: 'invoiceReady', type: 'email' },
  ]},
  { id: 'team', title: 'Team', icon: HiUserGroup, channels: [
    { id: 'team_invite', label: 'Team Invite', key: 'teamInvite', type: 'email' },
    { id: 'team_update', label: 'Team Updates', key: 'teamUpdate', type: 'push' },
  ]},
  { id: 'security', title: 'Security', icon: HiShieldCheck, channels: [
    { id: 'security_alert', label: 'Security Alert', key: 'securityAlert', type: 'push' },
    { id: 'login_alert', label: 'New Login', key: 'loginAlert', type: 'email' },
  ]},
  { id: 'marketing', title: 'Marketing', icon: HiMail, channels: [
    { id: 'promo_email', label: 'Promotional Emails', key: 'promoEmail', type: 'email' },
  ]},
]

export function NotificationSettings() {
  const [settings, setSettings] = useState(defaultState)

  const toggle = (key: keyof typeof defaultState) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Notification Preferences</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Choose what notifications you receive</p>
      </div>
      <div className="space-y-4">
        {groups.map((group, gi) => {
          const Icon = group.icon
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.05 }}
              className="rounded-xl border border-[var(--border-subtle)] overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-[var(--surface-alt)] border-b border-[var(--border-subtle)]">
                <Icon className="h-4 w-4 text-tsg-500" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">{group.title}</span>
              </div>
              <div className="divide-y divide-[var(--border-subtle)]">
                {group.channels.map((ch) => (
                  <div key={ch.id} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[var(--text-secondary)]">{ch.label}</span>
                      <span className={cn(
                        'text-[10px] font-medium px-1.5 py-0.5 rounded',
                        ch.type === 'push' && 'bg-tsg-50 text-tsg-600 dark:bg-tsg-500/20',
                        ch.type === 'email' && 'bg-purple-50 text-purple-600 dark:bg-purple-500/20',
                        ch.type === 'sms' && 'bg-amber-50 text-amber-600 dark:bg-amber-500/20',
                      )}>
                        {ch.type === 'push' ? 'Push' : ch.type === 'email' ? 'Email' : 'SMS'}
                      </span>
                    </div>
                    <button
                      onClick={() => toggle(ch.key)}
                      className={cn(
                        'relative h-6 w-11 rounded-full transition-colors duration-200',
                        settings[ch.key] ? 'bg-tsg-500' : 'bg-[var(--border-default)]',
                      )}
                    >
                      <motion.div
                        animate={{ x: settings[ch.key] ? 22 : 2 }}
                        transition={{ type: 'spring', bounce: 0.3, duration: 0.3 }}
                        className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-soft"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
