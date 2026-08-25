import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiHome,
  HiTruck,
  HiSearch,
  HiOfficeBuilding,
  HiCube,
  HiClipboardList,
  HiChartBar,
  HiUsers,
  HiCog,
  HiShieldCheck,
  HiCurrencyDollar,
  HiX,
  HiLogout,
  HiClipboardCheck,
  HiCreditCard,
  HiDocumentText,
  HiPaperAirplane,
  HiBell,
  HiUserGroup,
} from 'react-icons/hi'
import { cn } from '@/lib/utils'
import logo from '@/assets/images/logo.png'

interface NavItemConfig {
  label: string
  path: string
  icon: React.ReactNode
  badge?: string
}

const mainNav: NavItemConfig[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <HiHome className="h-5 w-5" /> },
  { label: 'Shipments', path: '/shipments', icon: <HiTruck className="h-5 w-5" />, badge: '142' },
  { label: 'Tracking', path: '/tracking', icon: <HiSearch className="h-5 w-5" /> },
]

const managementNav: NavItemConfig[] = [
  { label: 'Warehouses', path: '/warehouses', icon: <HiOfficeBuilding className="h-5 w-5" /> },
  { label: 'Fleet', path: '/fleet', icon: <HiCube className="h-5 w-5" /> },
  { label: 'Inventory', path: '/inventory', icon: <HiClipboardList className="h-5 w-5" /> },
  { label: 'Wallet', path: '/wallet', icon: <HiCurrencyDollar className="h-5 w-5" />, badge: '$45.8k' },
]

const analyticsNav: NavItemConfig[] = [
  { label: 'Admin', path: '/admin', icon: <HiShieldCheck className="h-5 w-5" /> },
  { label: 'Bookings', path: '/admin/booking', icon: <HiClipboardCheck className="h-5 w-5" /> },
  { label: 'Reports', path: '/admin/reports', icon: <HiChartBar className="h-5 w-5" /> },
  { label: 'Settings', path: '/admin/settings', icon: <HiCog className="h-5 w-5" /> },
]

const adminNav: NavItemConfig[] = [
  { label: 'Customers', path: '/admin/customers', icon: <HiUsers className="h-5 w-5" /> },
  { label: 'Shipments', path: '/admin/shipments', icon: <HiTruck className="h-5 w-5" /> },
  { label: 'Payments', path: '/admin/payments', icon: <HiCreditCard className="h-5 w-5" /> },
  { label: 'Invoices', path: '/admin/invoices', icon: <HiDocumentText className="h-5 w-5" /> },
  { label: 'Quotes', path: '/admin/quotes', icon: <HiPaperAirplane className="h-5 w-5" /> },
  { label: 'Notifications', path: '/admin/notifications', icon: <HiBell className="h-5 w-5" /> },
  { label: 'Staff', path: '/admin/staff', icon: <HiUserGroup className="h-5 w-5" /> },
  { label: 'Roles', path: '/admin/roles', icon: <HiShieldCheck className="h-5 w-5" /> },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function NavGroup({ title, items }: { title: string; items: NavItemConfig[] }) {
  return (
    <div className="mb-5">
      <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
        {title}
      </p>
      <nav className="space-y-0.5">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            onClick={() => {
              if (window.innerWidth < 1024) {
                const sidebar = document.querySelector('aside') as HTMLElement | null
                if (sidebar) sidebar.click() // triggers onClose via overlay
              }
            }}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-tsg-500/10 text-tsg-600 dark:text-tsg-300'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-tsg-500"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className={cn('shrink-0', isActive ? 'text-tsg-500' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]')}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-tsg-500/10 px-2 py-0.5 text-[10px] font-semibold text-tsg-600 dark:text-tsg-300">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-[var(--border-subtle)] bg-[var(--surface)] transition-transform duration-300 ease-spring lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none',
        )}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-5">
          <Link to="/dashboard" className="flex items-center group">
            <img
              src={logo}
              alt="T.S.G Grateful Logistics"
              className="h-12 w-auto object-contain drop-shadow-[0_4px_10px_rgba(23,58,122,0.1)] transition-all duration-200 group-hover:scale-105"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)] lg:hidden"
          >
            <HiX className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin">
          <NavGroup title="Main" items={mainNav} />
          <NavGroup title="Management" items={managementNav} />
          <NavGroup title="Analytics" items={analyticsNav} />
          <NavGroup title="Administration" items={adminNav} />

          {/* Upgrade card */}
          <div className="mx-1 mt-6 rounded-xl bg-gradient-to-br from-tsg-500 to-tsg-600 p-4">
            <HiShieldCheck className="mb-2 h-6 w-6 text-white/80" />
            <p className="text-sm font-semibold text-white">Premium Plan</p>
            <p className="mt-0.5 text-xs text-white/70">Unlock advanced analytics</p>
            <button className="mt-3 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/30">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* User Section */}
        <div className="shrink-0 border-t border-[var(--border-subtle)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-tsg-400 to-tsg-600 text-white text-xs font-bold">
              AR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)] truncate">Alex Rivera</p>
              <p className="text-[11px] text-[var(--text-muted)]">Administrator</p>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-red-500" title="Sign out" aria-label="Sign out">
              <HiLogout className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
