import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Text } from '@/components/ui/Text'
import logo from '@/assets/images/logo.png'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  illustration: ReactNode
  altLink?: { label: string; text: string; to: string }
}

export function AuthLayout({ children, title, subtitle, illustration, altLink }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left: Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-tsg-50 via-white to-gold-50 p-12 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-tsg-500/8 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold-500/8 blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-sm">
          <Link to="/" className="inline-flex items-center mb-8">
            <img
              src={logo}
              alt="T.S.G Grateful Logistics"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {illustration}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6"
          >
            <Text variant="h5" className="text-tsg-500">Global Shipping Made Easy</Text>
            <Text variant="bodySm" className="text-[var(--text-muted)] mt-1">
              Trusted by thousands for reliable logistics across Nigeria and the world.
            </Text>
          </motion.div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-[var(--surface)]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden inline-flex items-center mb-8">
            <img
              src={logo}
              alt="T.S.G Grateful Logistics"
              className="h-11 w-auto object-contain"
            />
          </Link>

          <div className="space-y-1 mb-8">
            <Text variant="h4">{title}</Text>
            <Text variant="bodySm" className="text-[var(--text-secondary)]">{subtitle}</Text>
          </div>

          {children}

          {altLink && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center text-sm text-[var(--text-secondary)]"
            >
              {altLink.text}{' '}
              <Link to={altLink.to} className="font-semibold text-tsg-500 hover:text-tsg-400 transition-colors">
                {altLink.label}
              </Link>
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
