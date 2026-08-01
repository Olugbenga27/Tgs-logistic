import { type InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { HiEye, HiEyeOff } from 'react-icons/hi'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--text-secondary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-muted)]">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            type={inputType}
            className={cn(
              'flex h-10 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tsg-500/30 focus-visible:border-tsg-500',
              'hover:border-[var(--text-muted)]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--surface-alt)]',
              error && 'border-red-500 focus-visible:ring-red-500/30 focus-visible:border-red-500',
              leftIcon && 'pl-10',
              (rightIcon || isPassword) && 'pr-10',
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              tabIndex={-1}
            >
              {showPassword ? <HiEyeOff className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--text-muted)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
        {hint && !error && (
          <span className="text-xs text-[var(--text-muted)]">{hint}</span>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
