import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiHome, HiArrowRight } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--surface)] p-4">
      <div className="relative flex flex-col items-center gap-4 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[6rem] font-bold leading-none tracking-tight text-tsg-500/15 sm:text-[9rem]"
        >
          404
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-tsg-500 to-gold-500" />
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Page not found</h1>
          <p className="max-w-sm text-sm text-[var(--text-secondary)]">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on
            track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/dashboard">
            <Button>
              <HiHome className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost">
              Go to Homepage
              <HiArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
