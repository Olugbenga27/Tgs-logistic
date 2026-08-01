import { motion } from 'framer-motion'
import { HiArrowSmDown, HiArrowSmUp, HiArrowSmRight, HiRefresh } from 'react-icons/hi'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { WalletTransaction } from '@/lib/mock-data'

interface Props {
  transaction: WalletTransaction
  index: number
}

const typeConfig: Record<string, { icon: React.ElementType; className: string }> = {
  payment: { icon: HiArrowSmDown, className: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20' },
  withdrawal: { icon: HiArrowSmUp, className: 'bg-red-50 text-red-600 dark:bg-red-500/20' },
  refund: { icon: HiArrowSmRight, className: 'bg-amber-50 text-amber-600 dark:bg-amber-500/20' },
  fee: { icon: HiRefresh, className: 'bg-sky-50 text-sky-600 dark:bg-sky-500/20' },
}

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  completed: 'success',
  pending: 'warning',
  failed: 'danger',
}

export function TransactionCard({ transaction: tx, index }: Props) {
  const TypeIcon = typeConfig[tx.type]?.icon || HiArrowSmRight

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="rounded-xl border border-[var(--border-subtle)] p-4 transition-all hover:shadow-elevated"
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg shrink-0',
          typeConfig[tx.type]?.className || 'bg-[var(--surface-alt)]',
        )}>
          <TypeIcon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">{tx.description}</p>
              <p className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">{tx.reference}</p>
            </div>
            <span className={cn(
              'text-sm font-bold shrink-0',
              tx.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
            )}>
              {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-[var(--border-subtle)]">
            <span className="text-xs text-[var(--text-muted)]">{tx.category}</span>
            <span className="text-xs text-[var(--text-muted)]">{tx.date}</span>
            <Badge variant={statusVariant[tx.status]} size="sm">{tx.status}</Badge>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
