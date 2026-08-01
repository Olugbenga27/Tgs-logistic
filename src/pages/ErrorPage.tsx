import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiRefresh, HiHome } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'

export function ErrorPage() {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? error.statusText || String(error.status)
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred.'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--surface)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex max-w-md flex-col items-center gap-4 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-alt)] text-3xl">
          Oops!
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Something went wrong</h1>
          <p className="text-sm text-[var(--text-secondary)]">{message}</p>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => window.location.reload()}>
            <HiRefresh className="h-4 w-4" />
            Reload Page
          </Button>
          <Link to="/dashboard">
            <Button variant="ghost">
              <HiHome className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
