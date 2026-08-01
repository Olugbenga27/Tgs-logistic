import { motion } from 'framer-motion'
import { HiCheckCircle, HiPrinter, HiShare } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const bookingRef = 'TSG-' + Math.random().toString(36).substring(2, 8).toUpperCase()

export function ConfirmationStep() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', bounce: 0.5 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 mb-5"
      >
        <HiCheckCircle className="h-10 w-10 text-emerald-500" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-xl font-bold text-[var(--text-primary)]"
      >
        Booking Confirmed!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-[var(--text-muted)] mt-1 max-w-sm"
      >
        Your shipment has been booked successfully. You will receive a confirmation email shortly.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-5"
      >
        <Badge variant="success" size="lg">
          Reference: {bookingRef}
        </Badge>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3 mt-6"
      >
        <Button variant="secondary" size="sm">
          <HiPrinter className="h-4 w-4" />
          Print Receipt
        </Button>
        <Button variant="primary" size="sm">
          <HiShare className="h-4 w-4" />
          Share
        </Button>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-xs text-[var(--text-muted)]"
      >
        Track your shipment anytime from the dashboard
      </motion.p>
    </motion.div>
  )
}
