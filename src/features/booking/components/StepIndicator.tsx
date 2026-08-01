import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { stepLabels } from './booking-types'

interface Props {
  currentStep: number
}

export function StepIndicator({ currentStep }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {stepLabels.map((label, i) => {
          const isPast = i < currentStep
          const isCurrent = i === currentStep
          const isFuture = i > currentStep
          const isLast = i === stepLabels.length - 1

          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1 : 0.95,
                    backgroundColor: isPast || isCurrent ? 'var(--tsg-500)' : 'var(--surface-alt)',
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors',
                    isPast && 'bg-tsg-500 text-white',
                    isCurrent && 'bg-tsg-500 text-white ring-4 ring-tsg-500/20',
                    isFuture && 'bg-[var(--surface-alt)] text-[var(--text-muted)] border border-[var(--border-subtle)]',
                  )}
                >
                  {isPast ? (
                    <motion.svg
                      key={`check-${i}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      className="h-3.5 w-3.5"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <motion.path
                        d="M3 7.5L6 10.5L11 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.svg>
                  ) : (
                    i + 1
                  )}
                </motion.div>
                <span
                  className={cn(
                    'text-[10px] font-medium whitespace-nowrap transition-colors hidden sm:block',
                    isCurrent && 'text-tsg-500',
                    isPast && 'text-[var(--text-secondary)]',
                    isFuture && 'text-[var(--text-muted)]',
                  )}
                >
                  {label}
                </span>
                {/* Mobile: show only current step label */}
                <span
                  className={cn(
                    'text-[10px] font-medium transition-colors sm:hidden',
                    isCurrent && 'text-tsg-500',
                    isPast && 'text-[var(--text-secondary)]',
                    isFuture && 'text-[var(--text-muted)]',
                  )}
                >
                  {isCurrent ? label : isPast ? '✓' : ''}
                </span>
              </div>
              {!isLast && (
                <div className="flex-1 h-[2px] mx-2 relative">
                  <div className="absolute inset-0 rounded-full bg-[var(--border-subtle)]" />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isPast ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 rounded-full bg-tsg-500 origin-left"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
