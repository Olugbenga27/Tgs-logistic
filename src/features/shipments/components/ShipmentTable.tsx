import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiEye, HiCurrencyDollar } from 'react-icons/hi'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import type { Shipment } from '../types'

interface Props {
  shipments: Shipment[]
  onViewDetails: (shipment: Shipment) => void
}

const badgeVariant: Record<string, 'success' | 'warning' | 'info'> = {
  pending: 'warning',
  in_transit: 'info',
  delivered: 'success',
}

export function ShipmentTable({ shipments, onViewDetails }: Props) {
  if (shipments.length === 0) {
    return (
      <EmptyState
        title="No shipments found"
        description="No shipments match your current filters."
        compact
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border-subtle)]">
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">ID</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Route</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Priority</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">ETA</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Carrier</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Cost</th>
            <th className="px-4 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, i) => (
            <motion.tr
              key={s.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="border-b border-[var(--border-subtle)] last:border-0 transition-colors hover:bg-[var(--surface-alt)]"
            >
              <td className="px-4 py-3.5">
                <Link to={`/shipments/${s.id}`} className="text-sm font-mono font-semibold text-tsg-500 hover:text-tsg-600 transition-colors">
                  {s.id}
                </Link>
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-[var(--text-secondary)]">{s.origin}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">→</span>
                  <span className="text-sm text-[var(--text-secondary)]">{s.destination}</span>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <Badge variant={badgeVariant[s.status]} size="sm" dot>
                  {s.status.replace('_', ' ')}
                </Badge>
              </td>
              <td className="px-4 py-3.5">
                <span className={cn(
                  'text-[11px] font-semibold px-2 py-0.5 rounded-md uppercase',
                  s.priority === 'high' && 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
                  s.priority === 'medium' && 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
                  s.priority === 'low' && 'bg-[var(--surface-alt)] text-[var(--text-muted)]',
                )}>
                  {s.priority}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span className="text-sm text-[var(--text-secondary)]">{s.eta}</span>
              </td>
              <td className="px-4 py-3.5">
                <span className="text-sm text-[var(--text-primary)]">{s.carrier}</span>
              </td>
              <td className="px-4 py-3.5">
                <span className="text-sm font-semibold text-[var(--text-primary)]">${s.totalCost.toFixed(2)}</span>
              </td>
              <td className="px-4 py-3.5 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="xs" onClick={() => onViewDetails(s)}>
                    <HiEye className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                  <Button variant="ghost" size="xs">
                    <HiCurrencyDollar className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Invoice</span>
                  </Button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
