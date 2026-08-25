import { useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiHome,
  HiClipboardCheck,
  HiTruck,
  HiUsers,
  HiCreditCard,
  HiDocumentText,
  HiPaperAirplane,
  HiBell,
  HiCog,
  HiX,
  HiLogout,
  HiMenu,
  HiSearch,
  HiFlag,
  HiShieldCheck,
} from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { useAuth } from './AuthProvider'
import { NotificationDropdown } from '@/components/layout/NotificationDropdown'
import logo from '@/assets/images/logo.png'

interface NavItemConfig {
  label: string
  path: string
  icon: React.ReactNode
  badge?: string
}

const adminNav: NavItemConfig[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <HiHome className="h-5 w-5" /> },
  { label: 'Bookings', path: '/admin/bookings', icon: <HiClipboardCheck className="h-5 w-5" /> },
  { label: 'Shipments', path: '/admin/shipments', icon: <HiTruck className="h-5 w-5" /> },
  { label: 'Customers', path: '/admin/customers', icon: <HiUsers className="h-5 w-5" /> },
  { label: 'Payments', path: '/admin/payments', icon: <HiCreditCard className="h-5 w-5" /> },
  { label: 'Invoices', path: '/admin/invoices', icon: <HiDocumentText className="h-5 w-5" /> },
  { label: 'Quotes', path: '/admin/quotes', icon: <HiPaperAirplane className="h-5 w-5" /> },
  { label: 'Staff', path: '/admin/staff', icon: <HiFlag className="h-5 w-5" /> },
  { label: 'Roles', path: '/admin/roles', icon: <HiShieldCheck className="h-5 w-5" /> },
  { label: 'Notifications', path: '/admin/notifications', icon: <HiBell className="h-5 w-5" /> },
  { label: 'Settings', path: '/admin/settings', icon: <HiCog className="h-5 w-5" /> },
]

function AdminNavLink({ item }: { item: NavItemConfig }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === '/admin/dashboard'}
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
              layoutId="admin-sidebar-active"
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
  )
}

function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { profile, signOut } = useAuth()
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD'

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
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="T.S.G" className="h-10 w-auto object-contain" />
            <span className="text-xs font-bold uppercase tracking-wider text-tsg-500">Admin</span>
          </Link>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)] lg:hidden"
          >
            <HiX className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin">
          <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
            Admin Panel
          </p>
          <nav className="space-y-0.5">
            {adminNav.map((item) => (
              <AdminNavLink key={item.path} item={item} />
            ))}
          </nav>

          {/* Public site link */}
          <div className="mt-6 mx-1">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] px-3 py-2.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]"
            >
              <HiHome className="h-4 w-4" />
              View Public Site
            </Link>
          </div>
        </div>

        {/* User Section */}
        <div className="shrink-0 border-t border-[var(--border-subtle)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-tsg-400 to-tsg-600 text-white text-xs font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{profile?.full_name ?? 'Admin'}</p>
              <p className="text-[11px] text-[var(--text-muted)] capitalize">{profile?.role?.replace('_', ' ') ?? 'Administrator'}</p>
            </div>
            <button
              onClick={signOut}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-red-500"
              title="Sign out"
            >
              <HiLogout className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  const currentPage = adminNav.find(
    (n) => n.path === location.pathname || location.pathname.startsWith(n.path + '/'),
  )

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface)]/80 backdrop-blur-lg px-4 sm:px-6">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)] lg:hidden"
        >
          <HiMenu className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">{currentPage?.label ?? 'Admin'}</h2>
        </div>

        <div className="hidden sm:block relative max-w-xs w-full ml-4">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search bookings, shipments..."
            className="h-9 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all duration-200 focus:border-tsg-500 focus:outline-none focus:ring-2 focus:ring-tsg-500/20 hover:border-[var(--text-muted)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex sm:hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]"
        >
          <HiSearch className="h-5 w-5" />
        </button>
        <NotificationDropdown />
      </div>

      {searchOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-[var(--border-subtle)] bg-[var(--surface)] p-3 sm:hidden">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search bookings, shipments..."
              autoFocus
              className="h-10 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)] pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-tsg-500 focus:outline-none focus:ring-2 focus:ring-tsg-500/20"
            />
          </div>
        </div>
      )}
    </header>
  )
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--surface)]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
