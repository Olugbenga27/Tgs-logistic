import { useState } from 'react'
import { HiMenu, HiSearch } from 'react-icons/hi'
import { NotificationDropdown } from './NotificationDropdown'
import { ProfileMenu } from './ProfileMenu'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface)]/80 backdrop-blur-lg px-4 sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)] lg:hidden"
        >
          <HiMenu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="hidden sm:block relative max-w-xs w-full">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search shipments, tracking..."
            className="h-9 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all duration-200 focus:border-tsg-500 focus:outline-none focus:ring-2 focus:ring-tsg-500/20 hover:border-[var(--text-muted)]"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Mobile search toggle */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Toggle search"
          aria-expanded={searchOpen}
          className="flex sm:hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]"
        >
          <HiSearch className="h-5 w-5" />
        </button>

        <NotificationDropdown />
        <ProfileMenu />
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-[var(--border-subtle)] bg-[var(--surface)] p-3 sm:hidden">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search shipments, tracking..."
              autoFocus
              className="h-10 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)] pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-tsg-500 focus:outline-none focus:ring-2 focus:ring-tsg-500/20"
            />
          </div>
        </div>
      )}
    </header>
  )
}
