import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiCurrencyDollar, HiEye, HiClock } from 'react-icons/hi'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Shipment } from '../types'

interface Props {
  shipment: Shipment
  index: number
  onViewDetails: (shipment: Shipment) => void
}

const badgeVariant: Record<string, 'success' | 'warning' | 'info'> = {
  pending: 'warning',
  in_transit: 'info',
  delivered: 'success',
}

export function ShipmentCard({ shipment, index, onViewDetails }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-3">
        <Link to={`/shipments/${shipment.id}`} className="text-sm font-mono font-bold text-tsg-500 hover:text-tsg-600 transition-colors">{shipment.id}</Link>
        <Badge variant={badgeVariant[shipment.status]} size="sm" dot>
          {shipment.status.replace('_', ' ')}
        </Badge>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm text-[var(--text-secondary)] truncate">{shipment.origin}</span>
        <HiArrowRight className="h-3 w-3 text-[var(--text-muted)] shrink-0" />
        <span className="text-sm text-[var(--text-secondary)] truncate">{shipment.destination}</span>
      </div>

      <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-3">
        <span className="flex items-center gap-1">
          <HiClock className="h-3 w-3" />
          ETA {shipment.eta}
        </span>
        <span className="flex items-center gap-1">
          <HiCurrencyDollar className="h-3 w-3" />
          ${shipment.totalCost.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-1.5">
          <span className={cn(
            'text-[10px] font-semibold px-1.5 py-0.5 rounded',
            shipment.priority === 'high' && 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
            shipment.priority === 'medium' && 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
            shipment.priority === 'low' && 'bg-[var(--surface-alt)] text-[var(--text-muted)]',
          )}>
            {shipment.priority}
          </span>
          <span className="text-xs text-[var(--text-muted)]">{shipment.carrier}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="xs" onClick={() => onViewDetails(shipment)}>
            <HiEye className="h-3.5 w-3.5" />
            Details
          </Button>
          <Button variant="ghost" size="xs">
            <HiCurrencyDollar className="h-3.5 w-3.5" />
            Invoice
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
