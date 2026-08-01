import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiSun, HiMoon, HiDesktopComputer } from 'react-icons/hi'
import { cn } from '@/lib/utils'

const themes = [
  { id: 'light', label: 'Light', icon: HiSun, desc: 'Bright and clean interface' },
  { id: 'dark', label: 'Dark', icon: HiMoon, desc: 'Easy on the eyes at night' },
  { id: 'system', label: 'System', icon: HiDesktopComputer, desc: 'Follows your OS setting' },
]

export function ThemeSettings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
    return 'system'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.removeItem('theme')
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      if (mq.matches) root.classList.add('dark')
      else root.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Theme Settings</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Customize your interface appearance</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {themes.map((t) => {
          const Icon = t.icon
          const isActive = theme === t.id
          return (
            <motion.button
              key={t.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(t.id as typeof theme)}
              className={cn(
                'relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all duration-200',
                isActive
                  ? 'border-tsg-500 bg-tsg-50/50 dark:bg-tsg-500/10'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--surface-alt)]',
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="theme-bg"
                  className="absolute inset-0 rounded-xl bg-tsg-50/50 dark:bg-tsg-500/10"
                  transition={{ type: 'spring', bounce: 0.2 }}
                />
              )}
              <div className={cn(
                'relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                isActive ? 'bg-tsg-500 text-white' : 'bg-[var(--surface-alt)] text-[var(--text-muted)]',
              )}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="relative">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{t.label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.desc}</p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
