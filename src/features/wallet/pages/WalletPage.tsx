import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  HiCurrencyDollar,
  HiPlus,
  HiArrowSmDown,
  HiTrendingUp,
  HiClock,
  HiFilter,
} from 'react-icons/hi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import { WalletCharts } from '../components/WalletCharts'
import { TransactionTable } from '../components/TransactionTable'
import { TransactionCard } from '../components/TransactionCard'
import { useWalletHistory, useWalletMonthly } from '../api'
import { useDashboardStats } from '@/features/dashboard/api'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE = 8

export function WalletPage() {
  const [filterType, setFilterType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const { data: walletHistory = [] } = useWalletHistory()
  const { data: walletMonthly = [] } = useWalletMonthly()
  const { data: stats } = useDashboardStats()

  const filtered = useMemo(() => {
    if (filterType === 'all') return walletHistory
    if (filterType === 'income') return walletHistory.filter(t => t.amount > 0)
    if (filterType === 'expense') return walletHistory.filter(t => t.amount < 0)
    return walletHistory.filter(t => t.type === filterType)
  }, [filterType, walletHistory])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const totalIncome = walletHistory.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const totalExpense = walletHistory.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0)
  const pendingCount = walletHistory.filter(t => t.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Wallet</h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage your balance and transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm">
            <HiPlus className="h-4 w-4" />
            Deposit
          </Button>
          <Button variant="secondary" size="sm">
            <HiArrowSmDown className="h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-tsg-600 via-tsg-500 to-tsg-700" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white" />
          </div>
          <CardContent className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <HiCurrencyDollar className="h-5 w-5 text-white/80" />
                  <span className="text-sm font-medium text-white/80">Available Balance</span>
                </div>
                <motion.p
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', bounce: 0.3 }}
                  className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
                >
                  ${(stats?.walletBalance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </motion.p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <HiTrendingUp className="h-4 w-4 text-emerald-300" />
                    <span className="text-sm text-emerald-200">+$12,500 today</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiClock className="h-4 w-4 text-amber-300" />
                    <span className="text-sm text-amber-200">{pendingCount} pending</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" size="sm" className="bg-white/15 text-white border-white/30 hover:bg-white/25 hover:text-white">
                  <HiCurrencyDollar className="h-4 w-4" />
                  Add Funds
                </Button>
                <Button variant="secondary" size="sm" className="bg-white/15 text-white border-white/30 hover:bg-white/25 hover:text-white">
                  <HiArrowSmDown className="h-4 w-4" />
                  Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: 'Total Income', value: `$${totalIncome.toLocaleString()}`, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
          { label: 'Total Expense', value: `$${totalExpense.toLocaleString()}`, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
          { label: 'Net Balance', value: `$${(totalIncome - totalExpense).toLocaleString()}`, color: 'text-tsg-600 dark:text-tsg-400', bg: 'bg-tsg-50 dark:bg-tsg-500/10' },
          { label: 'Transactions', value: String(walletHistory.length), color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.04 }}
            className={cn('rounded-xl p-4', stat.bg)}
          >
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            <p className={cn('text-lg font-bold mt-0.5', stat.color)}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <WalletCharts
          data={walletMonthly}
          trend={{ income: totalIncome, expense: totalExpense }}
        />
      </motion.div>

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <HiFilter className="h-4 w-4 text-tsg-500" />
                Transaction History
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select
                  options={[
                    { value: 'all', label: 'All Transactions' },
                    { value: 'income', label: 'Income Only' },
                    { value: 'expense', label: 'Expense Only' },
                    { value: 'payment', label: 'Payments' },
                    { value: 'withdrawal', label: 'Withdrawals' },
                    { value: 'refund', label: 'Refunds' },
                    { value: 'fee', label: 'Fees' },
                  ]}
                  value={filterType}
                  onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1) }}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <TransactionTable transactions={paginated} />
            </div>
            {/* Mobile Cards */}
            <div className="block md:hidden p-4 space-y-3">
              {paginated.length === 0 ? (
                <EmptyState
                  title="No transactions found"
                  description="Your wallet transactions will appear here once you make a payment."
                  compact
                />
              ) : (
                paginated.map((tx, i) => (
                  <TransactionCard key={tx.id} transaction={tx} index={i} />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </motion.div>
    </div>
  )
}
