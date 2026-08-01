import { type HTMLAttributes, forwardRef } from 'react'
import { HiChevronRight, HiHome } from 'react-icons/hi'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  showHome?: boolean
  separator?: React.ReactNode
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, showHome = true, separator, ...props }, ref) => {
    const SeparatorIcon = separator ?? <HiChevronRight className="h-3.5 w-3.5" />

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center gap-1.5 text-sm', className)}
        {...props}
      >
        {showHome && (
          <>
            <a
              href="/dashboard"
              className="flex items-center gap-1 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              <HiHome className="h-4 w-4" />
            </a>
            <span className="text-[var(--text-muted)]">{SeparatorIcon}</span>
          </>
        )}
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <span key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    isLast
                      ? 'font-medium text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)]',
                  )}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="text-[var(--text-muted)]">{SeparatorIcon}</span>
              )}
            </span>
          )
        })}
      </nav>
    )
  },
)
Breadcrumbs.displayName = 'Breadcrumbs'
