import { motion } from 'framer-motion'
import { HiArrowSmDown, HiArrowSmUp, HiArrowSmRight, HiRefresh } from 'react-icons/hi'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import type { WalletTransaction } from '@/lib/mock-data'

interface Props {
  transactions: WalletTransaction[]
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

export function TransactionTable({ transactions }: Props) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Your wallet transactions will appear here once you make a payment."
        compact
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border-subtle)]">
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Transaction</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Category</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Date</th>
            <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
            <th className="px-4 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => {
            const TypeIcon = typeConfig[tx.type]?.icon || HiArrowSmRight
            return (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-[var(--border-subtle)] last:border-0 transition-colors hover:bg-[var(--surface-alt)]"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg shrink-0',
                      typeConfig[tx.type]?.className || 'bg-[var(--surface-alt)]',
                    )}>
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate max-w-[200px] sm:max-w-xs">
                        {tx.description}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] font-mono">{tx.reference}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs text-[var(--text-secondary)]">{tx.category}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm text-[var(--text-secondary)]">{tx.date}</span>
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={statusVariant[tx.status]} size="sm">
                    {tx.status}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <span className={cn(
                    'text-sm font-bold',
                    tx.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
                  )}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                  </span>
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
