import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  description?: string
  icon?: ReactNode
  actions?: ReactNode
  className?: string
}

export function SectionHeading({ title, description, icon, actions, className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-alt)] text-tsg-500">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">{title}</h2>
          {description && (
            <p className="mt-0.5 text-sm text-[var(--text-muted)]">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
