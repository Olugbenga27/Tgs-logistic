import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
} from 'react-icons/hi'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: 'success' | 'warning' | 'info' | 'error'
  read: boolean
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Shipment Delivered', description: 'TSG-002 has been delivered to London, UK.', time: '2 min ago', type: 'success', read: false },
  { id: '2', title: 'Customs Clearance', description: 'TSG-001 is awaiting customs clearance in New York.', time: '15 min ago', type: 'warning', read: false },
  { id: '3', title: 'New Pickup Scheduled', description: 'A new pickup is scheduled for tomorrow at 9 AM.', time: '1 hour ago', type: 'info', read: false },
  { id: '4', title: 'Fleet Maintenance Due', description: 'Truck TRK-103 is due for maintenance.', time: '3 hours ago', type: 'error', read: true },
  { id: '5', title: 'Shipment In Transit', description: 'TSG-003 is now en route to Dubai.', time: '5 hours ago', type: 'info', read: true },
]

const typeStyles = {
  success: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  warning: 'bg-gold-100 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400',
  info: 'bg-tsg-100 text-tsg-600 dark:bg-tsg-500/20 dark:text-tsg-300',
  error: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
}

const typeIcons = {
  success: HiCheckCircle,
  warning: HiExclamationCircle,
  info: HiInformationCircle,
  error: HiExclamationCircle,
}

export function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const filtered = filter === 'unread' ? mockNotifications.filter((n) => !n.read) : mockNotifications
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]"
      >
        <HiInformationCircle className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 origin-top-right"
          >
            <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-elevated ring-1 ring-black/5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Notifications</p>
                <div className="flex items-center gap-2">
                  <div className="flex rounded-lg bg-[var(--surface-alt)] p-0.5">
                    <button
                      onClick={() => setFilter('all')}
                      className={cn(
                        'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                        filter === 'all' ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-muted)]',
                      )}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter('unread')}
                      className={cn(
                        'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                        filter === 'unread' ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-muted)]',
                      )}
                    >
                      Unread
                    </button>
                  </div>
                </div>
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <HiCheckCircle className="mb-2 h-8 w-8 text-emerald-500" />
                    <p className="text-sm font-medium text-[var(--text-primary)]">All clear!</p>
                    <p className="text-xs text-[var(--text-muted)]">No unread notifications.</p>
                  </div>
                ) : (
                  filtered.map((n, i) => {
                    const Icon = typeIcons[n.type]
                    return (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className={cn(
                          'flex gap-3 border-b border-[var(--border-subtle)] px-4 py-3 transition-colors last:border-0 hover:bg-[var(--surface-alt)] cursor-pointer',
                          !n.read && 'bg-tsg-500/[0.02]',
                        )}
                      >
                        <div className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', typeStyles[n.type])}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn('text-sm', n.read ? 'text-[var(--text-secondary)]' : 'font-semibold text-[var(--text-primary)]')}>
                              {n.title}
                            </p>
                            {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-tsg-500" />}
                          </div>
                          <p className="mt-0.5 text-xs text-[var(--text-muted)] line-clamp-2">{n.description}</p>
                          <p className="mt-1 text-[10px] text-[var(--text-muted)]">{n.time}</p>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-[var(--border-subtle)] px-4 py-2.5">
                <Link
                  to="/notifications"
                  onClick={() => setOpen(false)}
                  className="block text-center text-xs font-medium text-tsg-500 hover:text-tsg-400 transition-colors"
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
