import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiUser,
  HiCog,
  HiCreditCard,
  HiUsers,
  HiLogout,
  HiSun,
  HiMoon,
  HiChevronDown,
} from 'react-icons/hi'
import { useTheme } from '@/app/providers/ThemeProvider'
import { cn } from '@/lib/utils'

const menuItems = [
  { label: 'My Profile', path: '/profile', icon: HiUser },
  { label: 'Account Settings', path: '/settings', icon: HiCog },
  { label: 'Billing', path: '/billing', icon: HiCreditCard },
  { label: 'Team Members', path: '/team', icon: HiUsers },
]

export function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Account menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--surface-alt)]"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-tsg-400 to-tsg-600 text-white text-xs font-bold">
          AR
        </div>
        <div className="hidden text-left md:block">
          <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">Alex Rivera</p>
          <p className="text-[11px] text-[var(--text-muted)]">Administrator</p>
        </div>
        <HiChevronDown className={cn('h-4 w-4 text-[var(--text-muted)] hidden md:block transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-56 origin-top-right"
          >
            <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-elevated ring-1 ring-black/5">
              {/* User info */}
              <div className="border-b border-[var(--border-subtle)] px-4 py-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Alex Rivera</p>
                <p className="text-xs text-[var(--text-muted)]">alex@tsggrateful.com</p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]"
                    >
                      <Icon className="h-4 w-4 text-[var(--text-muted)]" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              {/* Theme toggle */}
              <div className="border-t border-[var(--border-subtle)] px-4 py-2">
                <button
                  onClick={toggleTheme}
                  className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {theme === 'dark' ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-[var(--border-subtle)] py-1">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <HiLogout className="h-4 w-4" />
                  Sign Out
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
