import { type ReactNode } from 'react'
import { HiInbox } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  className?: string
  compact?: boolean
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 text-center',
        compact ? 'py-10' : 'py-16',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-[var(--surface-alt)] text-[var(--text-muted)]',
          compact ? 'h-10 w-10' : 'h-12 w-12',
        )}
      >
        {icon ?? <HiInbox className={compact ? 'h-5 w-5' : 'h-6 w-6'} />}
      </div>
      <p className={cn('mt-3 font-semibold text-[var(--text-primary)]', compact ? 'text-sm' : 'text-sm')}>
        {title}
      </p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">{description}</p>
      )}
      {action && (
        <Button variant="secondary" size="sm" className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
