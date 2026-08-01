import { type HTMLAttributes, forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { HiX, HiInformationCircle, HiCheckCircle, HiExclamation, HiExclamationCircle } from 'react-icons/hi'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative flex gap-3 rounded-xl border p-4 text-sm transition-all',
  {
    variants: {
      variant: {
        info: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-500/20 dark:bg-sky-500/5 dark:text-sky-300',
        success: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-300',
        warning: 'border-gold-200 bg-gold-50 text-gold-800 dark:border-gold-500/20 dark:bg-gold-500/5 dark:text-gold-300',
        error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-500/20 dark:bg-red-500/5 dark:text-red-300',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

const iconMap = {
  info: HiInformationCircle,
  success: HiCheckCircle,
  warning: HiExclamation,
  error: HiExclamationCircle,
}

interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  onClose?: () => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', onClose, children, ...props }, ref) => {
    const Icon = iconMap[variant ?? 'info']

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1 opacity-70 transition-opacity hover:opacity-100"
          >
            <HiX className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  },
)
Alert.displayName = 'Alert'

const AlertTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-semibold', className)} {...props} />
  ),
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
  ),
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
