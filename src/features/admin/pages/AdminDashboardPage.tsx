import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiTrendingUp,
  HiTrendingDown,
  HiCurrencyDollar,
  HiUsers,
  HiTruck,
  HiShoppingCart,
  HiClock,
  HiSupport,
  HiArrowRight,
  HiExclamationCircle,
  HiCube,
  HiLocationMarker,
  HiChartBar,
  HiClipboardList,
  HiShieldCheck,
} from 'react-icons/hi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useDashboardStats, useAdminShipments } from '../api'
import { formatMoney } from '../components/format'

const revenueData = [
  { month: 'Jan', revenue: 18500, orders: 142 },
  { month: 'Feb', revenue: 22300, orders: 168 },
  { month: 'Mar', revenue: 19800, orders: 155 },
  { month: 'Apr', revenue: 25600, orders: 189 },
  { month: 'May', revenue: 24100, orders: 176 },
  { month: 'Jun', revenue: 28900, orders: 210 },
  { month: 'Jul', revenue: 31200, orders: 234 },
  { month: 'Aug', revenue: 29800, orders: 221 },
  { month: 'Sep', revenue: 33400, orders: 248 },
  { month: 'Oct', revenue: 32100, orders: 235 },
  { month: 'Nov', revenue: 36800, orders: 267 },
  { month: 'Dec', revenue: 42500, orders: 312 },
]

const statusBadge: Record<string, 'success' | 'info' | 'warning'> = {
  delivered: 'success',
  in_transit: 'info',
  pending: 'warning',
}

const activities = [
  { user: 'Sarah K.', action: 'created shipment', target: 'SH-018', time: '12 min ago', type: 'create' },
  { user: 'Mike R.', action: 'updated tracking for', target: 'SH-012', time: '38 min ago', type: 'update' },
  { user: 'Emily T.', action: 'approved invoice', target: 'INV-0835', time: '1 hour ago', type: 'approve' },
  { user: 'James W.', action: 'completed delivery for', target: 'SH-009', time: '2 hours ago', type: 'complete' },
  { user: 'Lisa M.', action: 'flagged delay on', target: 'SH-015', time: '3 hours ago', type: 'flag' },
  { user: 'David C.', action: 'added warehouse inventory to', target: 'WH-03', time: '4 hours ago', type: 'add' },
]

const quickActions = [
  { label: 'New Shipment', icon: HiCube, desc: 'Create a new booking', path: '/admin/bookings' },
  { label: 'Track Cargo', icon: HiLocationMarker, desc: 'Real-time tracking', path: '/admin/shipments' },
  { label: 'View Reports', icon: HiChartBar, desc: 'Analytics & insights', path: '/admin/reports' },
  { label: 'Manage Fleet', icon: HiClipboardList, desc: 'Vehicle overview', path: '/admin/dashboard' },
  { label: 'Wallet', icon: HiCurrencyDollar, desc: 'Balance & transactions', path: '/admin/payments' },
  { label: 'Settings', icon: HiShieldCheck, desc: 'System preferences', path: '/admin/settings' },
]

export function AdminDashboardPage() {
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
  const { data: stats } = useDashboardStats()
  const { data: allShipments = [] } = useAdminShipments()

  const statCards = useMemo(() => {
    const revenue = stats?.totalRevenue ?? 0
    const customers = stats?.totalCustomers ?? 0
    const totalShipments = stats?.totalShipments ?? 0
    const pending = stats?.pendingBookings ?? 0
    const inTransit = stats?.inTransit ?? 0
    const delivered = stats?.delivered ?? 0
    return [
      { label: 'Revenue', value: formatMoney(revenue), change: '+12.5%', up: true, icon: HiCurrencyDollar, gradient: 'from-emerald-500 to-emerald-600' },
      { label: 'Customers', value: customers.toLocaleString(), change: '+8.2%', up: true, icon: HiUsers, gradient: 'from-tsg-500 to-tsg-600' },
      { label: 'Shipments', value: totalShipments.toLocaleString(), change: '+5.3%', up: true, icon: HiTruck, gradient: 'from-purple-500 to-purple-600' },
      { label: 'In Transit', value: inTransit.toLocaleString(), change: '', up: true, icon: HiShoppingCart, gradient: 'from-amber-500 to-amber-600' },
      { label: 'Pending', value: pending.toLocaleString(), change: '', up: false, icon: HiClock, gradient: 'from-red-500 to-red-600' },
      { label: 'Delivered', value: delivered.toLocaleString(), change: '', up: true, icon: HiSupport, gradient: 'from-sky-500 to-sky-600' },
    ]
  }, [stats])

  const recentShipments = useMemo(() => {
    return allShipments.slice(0, 5).map((s) => ({
      id: s.id.slice(0, 8).toUpperCase(),
      route: `${s.origin} → ${s.destination}`,
      status: s.status,
    }))
  }, [allShipments])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <Button asChild variant="primary" size="sm">
          <Link to="/admin/bookings">
            <HiCube className="h-4 w-4" />
            New Shipment
          </Link>
        </Button>
      </motion.div>

      {/* Notification Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.03 }}
        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-tsg-500/10 to-tsg-500/5 border border-tsg-500/20"
      >
        <HiExclamationCircle className="h-5 w-5 text-tsg-500 shrink-0" />
        <p className="text-sm text-[var(--text-secondary)] flex-1">
          <span className="font-semibold text-[var(--text-primary)]">3 shipments</span> require attention
        </p>
        <Button asChild variant="ghost" size="xs">
          <Link to="/admin/shipments">
            View All
            <HiArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </motion.div>

      {/* 6 Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
            >
              <Card className="group relative overflow-hidden transition-shadow duration-300 hover:shadow-elevated">
                <div className={cn(
                  'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                  stat.gradient + '/5',
                )} />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</p>
                      <p className="mt-1.5 text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                      {stat.change && (
                        <div className={cn(
                          'flex items-center gap-1 mt-1.5 text-xs font-medium',
                          stat.up ? 'text-emerald-500' : 'text-red-500',
                        )}>
                          {stat.up ? <HiTrendingUp className="h-3.5 w-3.5" /> : <HiTrendingDown className="h-3.5 w-3.5" />}
                          {stat.change} vs last month
                        </div>
                      )}
                    </div>
                    <div className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg shrink-0 transition-transform group-hover:scale-110',
                      stat.gradient,
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <HiTrendingUp className="h-4 w-4 text-tsg-500" />
                  Revenue Overview
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="neutral" size="sm">Monthly</Badge>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-tsg-500" />
                    <span className="text-[11px] text-[var(--text-muted)]">Revenue</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-52 sm:h-60">
                <div className="absolute inset-0 flex items-end justify-between gap-1.5 px-2">
                  {revenueData.map((d, i) => (
                    <div key={d.month} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.02 }}
                        className="text-[9px] font-semibold text-[var(--text-muted)]"
                      >
                        ${(d.revenue / 1000).toFixed(0)}k
                      </motion.span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                        transition={{ delay: 0.2 + i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full max-w-6 rounded-sm bg-gradient-to-t from-tsg-600 to-tsg-400 relative group"
                      >
                        <div className="absolute inset-0 rounded-sm bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                      <span className="text-[8px] text-[var(--text-muted)]">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Shipments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <HiTruck className="h-4 w-4 text-tsg-500" />
                  Recent Shipments
                </CardTitle>
                <Badge variant="neutral" size="sm">Live</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border-subtle)]">
                {recentShipments.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 + i * 0.04 }}
                    className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--surface-alt)]"
                  >
                    <div className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                      s.status === 'in_transit' ? 'bg-tsg-50 text-tsg-600 dark:bg-tsg-500/20' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20',
                    )}>
                      <HiTruck className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{s.id}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{s.route}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={statusBadge[s.status] ?? 'info'} size="sm">
                        {s.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
                {recentShipments.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                    No shipments yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities + Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <HiClock className="h-4 w-4 text-tsg-500" />
                  Recent Activities
                </CardTitle>
                <Badge variant="neutral" size="sm">Live</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border-subtle)]">
                {activities.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--surface-alt)]"
                  >
                    <div className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                      a.type === 'create' && 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20',
                      a.type === 'update' && 'bg-tsg-50 text-tsg-600 dark:bg-tsg-500/20',
                      a.type === 'approve' && 'bg-purple-50 text-purple-600 dark:bg-purple-500/20',
                      a.type === 'complete' && 'bg-tsg-50 text-tsg-600 dark:bg-tsg-500/20',
                      a.type === 'flag' && 'bg-red-50 text-red-600 dark:bg-red-500/20',
                      a.type === 'add' && 'bg-amber-50 text-amber-600 dark:bg-amber-500/20',
                    )}>
                      {a.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-secondary)]">
                        <span className="font-semibold text-[var(--text-primary)]">{a.user}</span>
                        {' '}{a.action}{' '}
                        <span className="font-mono font-medium text-tsg-500">{a.target}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">{a.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <HiCube className="h-4 w-4 text-tsg-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, i) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32 + i * 0.03 }}
                    >
                      <Link
                        to={action.path}
                        className="group flex flex-col items-center gap-2 rounded-xl border border-[var(--border-subtle)] p-4 text-center transition-all duration-200 hover:border-tsg-500/30 hover:shadow-elevated hover:-translate-y-0.5"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-tsg-500 to-tsg-600 text-white shadow-md transition-transform group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[var(--text-primary)]">{action.label}</p>
                          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{action.desc}</p>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Performance Mini Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <HiChartBar className="h-4 w-4 text-tsg-500" />
                Monthly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-24">
                <div className="absolute inset-0 flex items-end justify-between gap-1">
                  {revenueData.map((d, i) => (
                    <motion.div
                      key={d.month}
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                      transition={{ delay: 0.35 + i * 0.02, duration: 0.4 }}
                      className="flex-1 rounded-sm bg-gradient-to-t from-tsg-600 to-tsg-400 max-w-3"
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2">
                {revenueData.filter((_, i) => i % 3 === 0).map(d => (
                  <span key={d.month} className="text-[8px] text-[var(--text-muted)]">{d.month}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
