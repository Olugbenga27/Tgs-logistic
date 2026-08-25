import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiMenu } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import logo from '@/assets/images/logo.png'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Track Shipment', path: '/track' },
  { label: 'Get Quote', path: '/quote' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  const closeMobileMenu = () => setMobileOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[var(--surface)]/85 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-soft'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={logo}
            alt="T.S.G Grateful Logistics"
            className="h-12 w-auto object-contain drop-shadow-[0_4px_12px_rgba(23,58,122,0.12)] transition-all duration-300 group-hover:scale-105 sm:h-14 lg:h-[3.5rem]"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                pathname === link.path
                  ? 'text-tsg-500'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)]',
              )}
            >
              {link.label}
              {pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-tsg-500"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden xl:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Register
          </Link>
          <Button variant="gold" size="sm" asChild>
            <Link to="/book-shipment">Book Shipment</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex xl:hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-[var(--surface)]/95 backdrop-blur-xl xl:hidden"
            onClick={closeMobileMenu}
          >
            <motion.div
              id="mobile-navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-[var(--border-subtle)] bg-[var(--surface)] px-4 pb-8 pt-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-alt)]/70 px-3 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    Navigate
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Quick access</p>
                </div>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)]"
                  aria-label="Close menu"
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={cn(
                        'block rounded-lg px-4 py-3 text-base font-medium transition-all',
                        pathname === link.path
                          ? 'bg-tsg-500/10 text-tsg-500'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]',
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 border-t border-[var(--border-subtle)] pt-6 space-y-3"
              >
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex-1 rounded-lg border border-[var(--border-default)] px-4 py-2.5 text-center text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-alt)] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="flex-1 rounded-lg bg-tsg-500 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-tsg-400 transition-colors"
                  >
                    Register
                  </Link>
                </div>
                <Button variant="gold" size="lg" className="w-full" asChild>
                  <Link to="/book-shipment" onClick={closeMobileMenu}>
                    Book Shipment
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto pt-8 text-center text-xs text-[var(--text-muted)]"
              >
                <p>&copy; 2026 T.S.G Grateful Logistics. All rights reserved.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
