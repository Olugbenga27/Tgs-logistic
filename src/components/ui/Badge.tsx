import { type HTMLAttributes, forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-tsg-50 text-tsg-700 dark:bg-tsg-500/10 dark:text-tsg-300',
        primary: 'bg-tsg-500/10 text-tsg-600 dark:bg-tsg-500/15 dark:text-tsg-300',
        success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
        warning: 'bg-gold-50 text-gold-700 dark:bg-gold-500/10 dark:text-gold-300',
        danger: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300',
        info: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
        neutral: 'bg-[var(--surface-alt)] text-[var(--text-secondary)] border border-[var(--border-subtle)]',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
      dot: {
        true: 'relative pl-6 before:absolute before:left-2.5 before:top-1/2 before:-translate-y-1/2 before:h-1.5 before:w-1.5 before:rounded-full',
      },
    },
    compoundVariants: [
      { variant: 'default', dot: true, className: 'before:bg-tsg-500' },
      { variant: 'success', dot: true, className: 'before:bg-emerald-500' },
      { variant: 'warning', dot: true, className: 'before:bg-gold-500' },
      { variant: 'danger', dot: true, className: 'before:bg-red-500' },
      { variant: 'info', dot: true, className: 'before:bg-sky-500' },
      { variant: 'neutral', dot: true, className: 'before:bg-[var(--text-muted)]' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, dot, className }))}
      {...props}
    />
  ),
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
