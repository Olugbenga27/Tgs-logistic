import { motion } from 'framer-motion'
import { HiClock, HiTruck, HiLocationMarker, HiCurrencyDollar, HiScale, HiCalendar, HiArrowRight } from 'react-icons/hi'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Shipment } from '../types'

interface Props {
  shipment: Shipment | null
  isOpen: boolean
  onClose: () => void
}

const badgeVariant: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
  pending: 'warning',
  in_transit: 'info',
  delivered: 'success',
}

export function ShipmentDetailModal({ shipment, isOpen, onClose }: Props) {
  if (!shipment) return null

  const steps = [
    { label: 'Order Placed', done: true },
    { label: 'Picked Up', done: shipment.status !== 'pending' },
    { label: 'In Transit', done: shipment.status === 'in_transit' || shipment.status === 'delivered' },
    { label: 'Out for Delivery', done: shipment.status === 'delivered' },
    { label: 'Delivered', done: shipment.status === 'delivered' },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={shipment.id}
      description={`${shipment.origin} → ${shipment.destination}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Status + Priority */}
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant={badgeVariant[shipment.status]} size="md" dot>
            {shipment.status.replace('_', ' ')}
          </Badge>
          <span className={cn(
            'text-xs font-semibold px-2 py-0.5 rounded-md',
            shipment.priority === 'high' && 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
            shipment.priority === 'medium' && 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
            shipment.priority === 'low' && 'bg-[var(--surface-alt)] text-[var(--text-muted)]',
          )}>
            {shipment.priority} priority
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            Booked {shipment.date}
          </span>
        </div>

        {/* Route */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-alt)]">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--text-muted)]">Origin</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{shipment.origin}</p>
            <p className="text-xs text-[var(--text-muted)] truncate">{shipment.originAddress}</p>
          </div>
          <HiArrowRight className="h-5 w-5 text-tsg-500 shrink-0" />
          <div className="flex-1 min-w-0 text-right">
            <p className="text-xs text-[var(--text-muted)]">Destination</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{shipment.destination}</p>
            <p className="text-xs text-[var(--text-muted)] truncate">{shipment.destinationAddress}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: HiTruck, label: 'Carrier', value: shipment.carrier },
            { icon: HiCalendar, label: 'Estimated Delivery', value: shipment.eta },
            { icon: HiScale, label: 'Weight', value: shipment.weight },
            { icon: HiCurrencyDollar, label: 'Total Cost', value: `$${shipment.totalCost.toFixed(2)}` },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="rounded-xl border border-[var(--border-subtle)] p-3"
              >
                <Icon className="h-4 w-4 text-tsg-500 mb-1.5" />
                <p className="text-[11px] text-[var(--text-muted)]">{item.label}</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Tracking Timeline */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <HiClock className="h-4 w-4 text-tsg-500" />
            Tracking Timeline
          </h4>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold',
                    step.done
                      ? 'bg-tsg-500 text-white'
                      : 'bg-[var(--surface-alt)] text-[var(--text-muted)] border border-[var(--border-subtle)]',
                  )}>
                    {step.done ? '✓' : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={cn(
                      'w-0.5 flex-1 min-h-[20px]',
                      step.done ? 'bg-tsg-500/40' : 'bg-[var(--border-subtle)]',
                    )} />
                  )}
                </div>
                <div className="pb-4">
                  <p className={cn(
                    'text-sm font-medium',
                    step.done ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]',
                  )}>
                    {step.label}
                  </p>
                  {step.done && (
                    <p className="text-xs text-[var(--text-muted)]">{shipment.lastUpdate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status History */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Status History</h4>
          <div className="space-y-2">
            {shipment.statusHistory.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.03 }}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-[var(--surface-alt)]"
              >
                <HiLocationMarker className="h-4 w-4 text-tsg-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{event.status}</p>
                  <p className="text-xs text-[var(--text-muted)]">{event.location}</p>
                </div>
                <span className="text-xs text-[var(--text-muted)] shrink-0">{event.date}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button variant="primary" size="sm">
            <HiTruck className="h-4 w-4" />
            Track Shipment
          </Button>
          <Button variant="secondary" size="sm">
            <HiCurrencyDollar className="h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </div>
    </Modal>
  )
}
