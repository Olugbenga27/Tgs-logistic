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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

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
            className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14"
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
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex xl:hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] transition-colors"
          aria-label="Toggle menu"
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
            className="fixed inset-0 top-18 z-40 bg-[var(--surface)]/95 backdrop-blur-xl xl:hidden"
          >
            <nav className="flex flex-col h-full overflow-y-auto px-4 pb-8 pt-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
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
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 border-t border-[var(--border-subtle)] pt-6 space-y-3"
              >
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="flex-1 rounded-lg border border-[var(--border-default)] px-4 py-2.5 text-center text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-alt)] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 rounded-lg bg-tsg-500 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-tsg-400 transition-colors"
                  >
                    Register
                  </Link>
                </div>
                <Button variant="gold" size="lg" className="w-full" asChild>
                  <Link to="/book-shipment">Book Shipment</Link>
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
