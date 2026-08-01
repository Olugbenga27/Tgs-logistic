import { type HTMLAttributes, forwardRef, useMemo } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { Button } from './Button'

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

function getPageRange(current: number, total: number, siblings: number): (number | 'ellipsis')[] {
  const totalNumbers = siblings * 2 + 5
  if (totalNumbers >= total) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblings, 1)
  const rightSibling = Math.min(current + siblings, total)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + 2 * siblings
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1)
    return [...leftRange, 'ellipsis', total]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + 2 * siblings
    const rightRange = Array.from({ length: rightCount }, (_, i) => total - rightCount + i + 1)
    return [1, 'ellipsis', ...rightRange]
  }

  return [1, 'ellipsis', ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i), 'ellipsis', total]
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, currentPage, totalPages, onPageChange, siblingCount = 1, ...props }, ref) => {
    const pages = useMemo(
      () => getPageRange(currentPage, totalPages, siblingCount),
      [currentPage, totalPages, siblingCount],
    )

    if (totalPages <= 1) return null

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-1', className)}
        {...props}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <HiChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map((page, i) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-8 w-8 items-center justify-center text-xs text-[var(--text-muted)]"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200',
                page === currentPage
                  ? 'bg-tsg-500 text-white shadow-soft'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]',
              )}
            >
              {page}
            </button>
          ),
        )}

        <Button
          variant="ghost"
          size="icon-sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <HiChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  },
)
Pagination.displayName = 'Pagination'
