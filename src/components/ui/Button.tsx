import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Slot } from '@/lib/slot'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-b from-tsg-500 to-tsg-600 text-white hover:from-tsg-400 hover:to-tsg-500 focus-visible:ring-tsg-500 shadow-soft hover:shadow-elevated',
        secondary:
          'bg-[var(--surface-alt)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--surface-elevated)] hover:border-tsg-500/30 focus-visible:ring-tsg-500',
        gold:
          'bg-gradient-to-b from-gold-400 to-gold-600 text-white hover:from-gold-300 hover:to-gold-500 focus-visible:ring-gold-500 shadow-soft hover:shadow-elevated',
        ghost:
          'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)] focus-visible:ring-tsg-500',
        outline:
          'border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:border-tsg-500/50 hover:bg-tsg-500/5 focus-visible:ring-tsg-500',
        destructive:
          'bg-gradient-to-b from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 focus-visible:ring-red-500 shadow-soft hover:shadow-elevated',
        link:
          'text-tsg-500 underline-offset-4 hover:underline hover:text-tsg-400 focus-visible:ring-tsg-500',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs gap-1.5',
        sm: 'h-9 px-3.5 text-xs gap-1.5',
        md: 'h-10 px-5 text-sm',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }))

    if (asChild) {
      return (
        <Slot className={classes}>
          {children as React.ReactElement}
        </Slot>
      )
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
