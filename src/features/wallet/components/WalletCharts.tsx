import { motion } from 'framer-motion'
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface MonthlyData {
  month: string
  income: number
  expense: number
}

interface Props {
  data: MonthlyData[]
  trend: { income: number; expense: number }
}

export function WalletCharts({ data, trend }: Props) {
  const maxVal = Math.max(...data.flatMap(d => [d.income, d.expense]))

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Income vs Expense Chart */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm">
                <HiTrendingUp className="h-4 w-4 text-emerald-500" />
                Income vs Expense
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-[var(--text-muted)]">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="text-[11px] text-[var(--text-muted)]">Expense</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-52 sm:h-60">
              <div className="absolute inset-0 flex items-end justify-between gap-1 px-1">
                {data.map((d, i) => {
                  const incomeH = (d.income / maxVal) * 100
                  const expenseH = (d.expense / maxVal) * 100
                  return (
                    <div key={d.month} className="flex items-end gap-0.5 flex-1 h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${incomeH}%` }}
                        transition={{ delay: 0.1 + i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 rounded-sm bg-gradient-to-t from-emerald-600 to-emerald-400 max-w-4"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${expenseH}%` }}
                        transition={{ delay: 0.15 + i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 rounded-sm bg-gradient-to-t from-red-500 to-red-300 max-w-4"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-between mt-2 px-1">
              {data.map(d => (
                <span key={d.month} className="text-[9px] text-[var(--text-muted)] text-center flex-1">{d.month}</span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Summary */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
                    <HiTrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Total Income</p>
                    <p className="text-sm font-bold text-[var(--text-primary)]">
                      ${trend.income.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600">+12.3%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-500/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white">
                    <HiTrendingDown className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Total Expense</p>
                    <p className="text-sm font-bold text-[var(--text-primary)]">
                      ${trend.expense.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-red-600">+8.7%</span>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Net Profit</span>
                  <span className="font-bold text-emerald-600">
                    +${(trend.income - trend.expense).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[var(--surface-alt)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((trend.income - trend.expense) / trend.income) * 100}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  />
                </div>
                <p className="text-[10px] text-[var(--text-muted)] mt-1">Profit margin</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Trend Mini Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Balance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-20">
              <div className="absolute inset-0 flex items-end justify-between gap-0.5">
                {data.map((d, i) => {
                  const net = d.income - d.expense
                  const h = ((net - 5000) / 30000) * 100
                  const isPositive = h >= 0
                  return (
                    <motion.div
                      key={d.month}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.abs(h)}%` }}
                      transition={{ delay: 0.2 + i * 0.02, duration: 0.4 }}
                      className={cn(
                        'flex-1 rounded-sm',
                        isPositive ? 'bg-emerald-400' : 'bg-red-400',
                      )}
                      style={{ alignSelf: isPositive ? 'flex-end' : 'flex-start' }}
                    />
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
