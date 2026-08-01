import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  xs: 'h-3.5 w-3.5 border-2',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-[3px]',
  lg: 'h-8 w-8 border-[3px]',
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(
        'animate-spin rounded-full border-tsg-500/25 border-t-tsg-500',
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  ),
)
Spinner.displayName = 'Spinner'

export { Spinner }
