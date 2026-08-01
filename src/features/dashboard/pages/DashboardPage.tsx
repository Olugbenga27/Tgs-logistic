import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiTruck,
  HiCheckCircle,
  HiCurrencyDollar,
  HiCreditCard,
  HiArrowRight,
  HiCube,
  HiLocationMarker,
  HiTrendingUp,
  HiCalendar,
  HiChartBar,
  HiGlobeAlt,
  HiClock,
  HiStar,
  HiArrowSmUp,
  HiArrowSmDown,
} from 'react-icons/hi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { StatsCard } from '../components/StatsCard'
import { useDashboardStats, useRecentShipments, useWalletTransactions, useDashboardAnalytics } from '../api'
import { cn } from '@/lib/utils'

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
  in_transit: 'bg-tsg-100 text-tsg-600 dark:bg-tsg-500/20 dark:text-tsg-300',
  delivered: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
}

const quickActions = [
  { label: 'Book a Shipment', path: '/book-shipment', icon: HiCube, desc: 'Create new cargo booking' },
  { label: 'Track Shipment', path: '/track', icon: HiLocationMarker, desc: 'Real-time tracking' },
  { label: 'Get a Quote', path: '/quote', icon: HiChartBar, desc: 'Estimate shipping cost' },
  { label: 'View All Shipments', path: '/shipments', icon: HiTruck, desc: 'Manage all shipments' },
]

export function DashboardPage() {
  const { data: stats } = useDashboardStats()
  const { data: recentShipments = [] } = useRecentShipments()
  const { data: walletActivity = [] } = useWalletTransactions()
  const { data: analytics } = useDashboardAnalytics()

  const shipmentChartData = analytics?.monthlyShipments ?? []
  const shipmentsByStatus = analytics?.shipmentsByStatus ?? []
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const maxCount = Math.max(0, ...shipmentChartData.map(d => d.count))

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      >
        <div>
          <Text variant="h4">Dashboard</Text>
          <div className="flex items-center gap-2 mt-0.5">
            <HiCalendar className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            <Text variant="caption">{today}</Text>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="md" dot>All systems operational</Badge>
        </div>
      </motion.div>

      {/* Row 1: Active Shipments / Completed Shipments / Wallet Balance / Pending Payments */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Shipments"
          value={stats?.activeShipments ?? 0}
          icon={<HiTruck className="h-5 w-5 sm:h-6 sm:w-6" />}
          trend="12% vs last week"
          trendUp
          gradient="blue"
          delay={0}
        />
        <StatsCard
          title="Completed Shipments"
          value={stats?.completedShipments ?? 0}
          icon={<HiCheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />}
          trend="Total all time"
          trendUp
          gradient="emerald"
          delay={0.05}
        />
        <StatsCard
          title="Wallet Balance"
          value={`$${(stats?.walletBalance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          icon={<HiCurrencyDollar className="h-5 w-5 sm:h-6 sm:w-6" />}
          trend="Available balance"
          trendUp
          gradient="purple"
          delay={0.1}
        />
        <StatsCard
          title="Pending Payments"
          value={stats?.pendingPayments?.count ?? 0}
          icon={<HiCreditCard className="h-5 w-5 sm:h-6 sm:w-6" />}
          trend={`$${(stats?.pendingPayments?.amount ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} total`}
          gradient="amber"
          delay={0.15}
        />
      </div>

      {/* Row 2: Recent Shipments + Analytics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Shipments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Shipments</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/shipments">
                    View All
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)]">
                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">ID</th>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Route</th>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">ETA</th>
                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Carrier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentShipments.map((s, i) => (
                      <motion.tr
                        key={s.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.05 }}
                        className="border-b border-[var(--border-subtle)] last:border-0 transition-colors hover:bg-[var(--surface-alt)]"
                      >
                        <td className="px-5 py-3.5">
                          <span className="text-sm font-mono font-semibold text-[var(--text-primary)]">{s.id}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm text-[var(--text-secondary)]">{s.origin}</span>
                            <HiArrowRight className="h-3 w-3 text-[var(--text-muted)] shrink-0" />
                            <span className="text-sm text-[var(--text-secondary)]">{s.destination}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={cn(
                            'inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                            statusColors[s.status],
                          )}>
                            {s.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-sm text-[var(--text-secondary)]">{s.eta}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-sm text-[var(--text-primary)]">{s.carrier}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Mini-Widgets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-4"
        >
          {/* Shipments by Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HiChartBar className="h-4 w-4 text-tsg-500" />
                Shipment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shipmentsByStatus.map((item, i) => (
                  <motion.div
                    key={item.status}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[var(--text-secondary)]">{item.status}</span>
                      <span className="text-xs font-semibold text-[var(--text-primary)]">{item.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--surface-alt)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / (stats?.completedShipments ?? 1)) * 100}%` }}
                        transition={{ delay: 0.35 + i * 0.05, duration: 0.6 }}
                        className={cn('h-full rounded-full', item.color === 'emerald' ? 'bg-emerald-500' : item.color === 'tsg' ? 'bg-tsg-500' : item.color === 'amber' ? 'bg-amber-500' : 'bg-red-500')}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Countries', value: stats?.countries, icon: HiGlobeAlt, color: 'text-tsg-500' },
                  { label: 'Total Distance', value: `${((stats?.totalDistance ?? 0) / 1000).toFixed(1)}k`, icon: HiLocationMarker, color: 'text-emerald-500', unit: 'mi' },
                  { label: 'Avg Delivery', value: `${stats?.avgDeliveryTime ?? 0}d`, icon: HiClock, color: 'text-purple-500' },
                  { label: 'Satisfaction', value: `${stats?.customerSatisfaction ?? 0}%`, icon: HiStar, color: 'text-amber-500' },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="flex items-center gap-2.5"
                    >
                      <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-alt)]', stat.color)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                        <p className="text-sm font-bold text-[var(--text-primary)]">{stat.value}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Row 3: Shipment Chart + Wallet Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Shipment Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <HiTrendingUp className="h-4 w-4 text-tsg-500" />
                  Shipment Volume
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="neutral" size="sm">Monthly</Badge>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-tsg-500" />
                    <span className="text-[11px] text-[var(--text-muted)]">This Year</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 sm:h-56">
                <div className="absolute inset-0 flex items-end justify-between gap-1.5 px-2">
                  {shipmentChartData.map((d, i) => {
                    const barHeight = (d.count / maxCount) * 100
                    return (
                      <div key={d.month} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.03 }}
                          className="text-[10px] font-semibold text-[var(--text-muted)]"
                        >
                          {d.count}
                        </motion.span>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${barHeight}%` }}
                          transition={{ delay: 0.4 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full max-w-6 rounded-sm bg-gradient-to-t from-tsg-600 to-tsg-400 relative group"
                        >
                          <div className="absolute inset-0 rounded-sm bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                        <span className="text-[9px] text-[var(--text-muted)]">{d.month}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wallet Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <HiCurrencyDollar className="h-4 w-4 text-tsg-500" />
                  Wallet Activity
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/wallet">
                    View All
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border-subtle)]">
                {walletActivity.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    <div className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                      item.type === 'payment'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20'
                        : 'bg-red-50 text-red-600 dark:bg-red-500/20',
                    )}>
                      {item.type === 'payment'
                        ? <HiArrowSmDown className="h-4 w-4" />
                        : <HiArrowSmUp className="h-4 w-4" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-secondary)] truncate">{item.description}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">{item.date}</p>
                    </div>
                    <span className={cn(
                      'text-sm font-semibold shrink-0',
                      item.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
                    )}>
                      {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toLocaleString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Row 4: Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiCube className="h-4 w-4 text-tsg-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon
                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.05 }}
                  >
                    <Link
                      to={action.path}
                      className="group relative flex flex-col items-center gap-2 rounded-xl border border-[var(--border-subtle)] p-5 text-center transition-all duration-200 hover:border-tsg-500/30 hover:shadow-elevated hover:-translate-y-0.5"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-tsg-500 to-tsg-600 text-white shadow-md transition-transform group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{action.label}</p>
                        <p className="mt-0.5 text-xs text-[var(--text-muted)]">{action.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
