import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HiSearch,
  HiX,
  HiChevronUp,
  HiChevronDown,
  HiDotsVertical,
} from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'

export interface DataTableColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  sortValue?: (row: T) => string | number
  className?: string
  headClassName?: string
  align?: 'left' | 'right' | 'center'
  hideOnMobile?: boolean
}

export interface DataTableFilter<T> {
  key: string
  label: string
  getValue: (row: T) => string
  options: { value: string; label: string }[]
}

export interface DataTableAction<T> {
  label: string
  icon?: ReactNode
  onClick: (row: T) => void
  destructive?: boolean
  disabled?: boolean
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  searchPlaceholder?: string
  searchText?: (row: T) => string
  filters?: DataTableFilter<T>[]
  actions?: (row: T) => DataTableAction<T>[]
  onRowClick?: (row: T) => void
  defaultSort?: { key: string; dir: 'asc' | 'desc' }
  pageSize?: number
  selectable?: boolean
  getRowId?: (row: T) => string
  onSelectionChange?: (rows: T[]) => void
  bulkActions?: { label: string; icon?: ReactNode; onClick: (rows: T[]) => void; destructive?: boolean }[]
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: { label: string; onClick: () => void }
  toolbarExtra?: ReactNode
  cardView?: (row: T, actions: ReactNode) => ReactNode
}

const alignClass = (align?: string) =>
  align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'

interface RowActionsProps<T> {
  row: T
  actions: DataTableAction<T>[]
  open: boolean
  onToggle: () => void
  onClose: () => void
}

function RowActions<T>({ row, actions, open, onToggle, onClose }: RowActionsProps<T>) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  if (actions.length === 0) return null

  return (
    <div ref={ref} className="relative">
      <Button variant="ghost" size="icon-sm" onClick={onToggle} aria-label="Row actions" aria-expanded={open} className="data-[open=true]:bg-[var(--surface-alt)]" data-open={open}>
        <HiDotsVertical className="h-4 w-4" />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-20 mt-1 w-44 origin-top-right overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-1 shadow-elevated"
          >
            {actions.map((action) => (
              <button
                key={action.label}
                disabled={action.disabled}
                onClick={() => {
                  action.onClick(row)
                  onClose()
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-40',
                  action.destructive
                    ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]',
                )}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function DataTable<T>({
  columns,
  rows,
  searchPlaceholder = 'Search...',
  searchText,
  filters,
  actions,
  onRowClick,
  defaultSort,
  pageSize = 8,
  selectable = false,
  getRowId,
  onSelectionChange,
  bulkActions,
  emptyTitle = 'No results found',
  emptyDescription = 'Try adjusting your search or filters to find what you are looking for.',
  emptyAction,
  toolbarExtra,
  cardView,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [filterVals, setFilterVals] = useState<Record<string, string>>({})
  const [sort, setSort] = useState<{ key: string | null; dir: 'asc' | 'desc' }>({
    key: defaultSort?.key ?? null,
    dir: defaultSort?.dir ?? 'asc',
  })
  const [page, setPage] = useState(1)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return rows.filter((row) => {
      if (q && searchText) {
        if (!searchText(row).toLowerCase().includes(q)) return false
      }
      for (const f of filters ?? []) {
        const val = filterVals[f.key]
        if (val && f.getValue(row) !== val) return false
      }
      return true
    })
  }, [rows, search, searchText, filters, filterVals])

  const sorted = useMemo(() => {
    if (!sort.key) return filtered
    const col = columns.find((c) => c.key === sort.key)
    if (!col?.sortValue) return filtered
    const dir = sort.dir
    return [...filtered].sort((a, b) => {
      const va = col.sortValue!(a)
      const vb = col.sortValue!(b)
      if (va < vb) return dir === 'asc' ? -1 : 1
      if (va > vb) return dir === 'asc' ? 1 : -1
      return 0
    })
  }, [filtered, columns, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paginated = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  useEffect(() => {
    setPage(1)
  }, [search, filterVals])

  useEffect(() => {
    if (safePage > totalPages && totalPages > 0) setPage(totalPages)
  }, [safePage, totalPages])

  const pageIds = paginated.map((row) => getRowId?.(row) ?? '').filter(Boolean)
  const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id))

  const toggleRow = (id: string) => {
    if (!selectable) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      onSelectionChange?.(
        rows.filter((r) => next.has(getRowId?.(r) ?? '')),
      )
      return next
    })
  }

  const toggleAll = () => {
    if (!selectable) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        pageIds.forEach((id) => next.delete(id))
      } else {
        pageIds.forEach((id) => next.add(id))
      }
      onSelectionChange?.(rows.filter((r) => next.has(getRowId?.(r) ?? '')))
      return next
    })
  }

  const clearSelection = () => {
    setSelectedIds(new Set())
    onSelectionChange?.([])
  }

  const selectedRows = rows.filter((r) => selectedIds.has(getRowId?.(r) ?? ''))

  const activeFilters = (filters ?? []).filter((f) => filterVals[f.key])
  const hasActiveQuery = search.trim() !== '' || activeFilters.length > 0
  const rowId = (row: T) => getRowId?.(row) ?? ''

  const renderRowActions = (row: T) => {
    if (!actions) return null
    const id = rowId(row)
    const open = openMenuId === id
    return (
      <RowActions
        row={row}
        actions={actions(row)}
        open={open}
        onToggle={() => setOpenMenuId(open ? null : id)}
        onClose={() => setOpenMenuId(null)}
      />
    )
  }

  const renderMobileCards = () => {
    if (paginated.length === 0) return <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
    return (
      <div className="grid gap-3">
        {paginated.map((row) => (
          <div key={rowId(row)} onClick={() => onRowClick?.(row)} className="cursor-pointer">
            {cardView ? cardView(row, renderRowActions(row)) : <DefaultCard row={row} columns={columns} actions={actions ? renderRowActions(row) : null} />}
          </div>
        ))}
      </div>
    )
  }

  const handleHeaderClick = (col: DataTableColumn<T>) => {
    if (!col.sortValue) return
    setSort((prev) =>
      prev.key === col.key
        ? { key: col.key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key: col.key, dir: 'asc' },
    )
    setPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            leftIcon={<HiSearch className="h-4 w-4" />}
            rightIcon={
              search ? (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setSearch('')}
                  className="pointer-events-auto text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <HiX className="h-4 w-4" />
                </button>
              ) : undefined
            }
            className="w-full sm:w-72"
          />
          {filters && filters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((f) => (
                <Select
                  key={f.key}
                  aria-label={f.label}
                  value={filterVals[f.key] ?? ''}
                  onChange={(e) => {
                    const next = { ...filterVals }
                    if (e.target.value) next[f.key] = e.target.value
                    else delete next[f.key]
                    setFilterVals(next)
                  }}
                  options={[{ value: '', label: `${f.label}: All` }, ...f.options]}
                  className="w-full sm:w-44"
                />
              ))}
              {hasActiveQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch('')
                    setFilterVals({})
                  }}
                >
                  <HiX className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          )}
        </div>
        {toolbarExtra && <div className="flex items-center gap-2">{toolbarExtra}</div>}
      </div>

      {/* Selection bulk bar */}
      <AnimatePresence>
        {selectable && selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-tsg-500/30 bg-tsg-500/5 px-4 py-3"
          >
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {selectedIds.size} selected
            </p>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              {bulkActions?.map((a) => (
                <Button
                  key={a.label}
                  variant={a.destructive ? 'destructive' : 'secondary'}
                  size="sm"
                  onClick={() => a.onClick(selectedRows)}
                >
                  {a.icon}
                  {a.label}
                </Button>
              ))}
              <Button variant="ghost" size="sm" onClick={clearSelection}>
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-alt)]/60">
                  {selectable && (
                    <th className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleAll}
                        className="h-4 w-4 cursor-pointer rounded border-[var(--border-default)] accent-tsg-500"
                      />
                    </th>
                  )}
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleHeaderClick(col)}
                      className={cn(
                        'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]',
                        col.sortValue && 'cursor-pointer select-none hover:text-[var(--text-primary)]',
                        alignClass(col.align),
                        col.headClassName,
                      )}
                    >
                      <span className={cn('inline-flex items-center gap-1', col.align === 'right' && 'justify-end', col.align === 'center' && 'justify-center')}>
                        {col.header}
                        {sort.key === col.key &&
                          (sort.dir === 'asc' ? (
                            <HiChevronUp className="h-3.5 w-3.5 text-tsg-500" />
                          ) : (
                            <HiChevronDown className="h-3.5 w-3.5 text-tsg-500" />
                          ))}
                      </span>
                    </th>
                  ))}
                  {actions && (
                    <th className="w-14 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      <HiDotsVertical className="ml-auto h-4 w-4 opacity-40" />
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {paginated.map((row, i) => (
                  <tr
                    key={rowId(row) || i}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      'transition-colors',
                      onRowClick && 'cursor-pointer hover:bg-[var(--surface-alt)]/50',
                      selectable && selectedIds.has(rowId(row)) && 'bg-tsg-500/5',
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(rowId(row))}
                          onChange={() => toggleRow(rowId(row))}
                          className="h-4 w-4 cursor-pointer rounded border-[var(--border-default)] accent-tsg-500"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn('px-4 py-3', alignClass(col.align), col.className)}
                      >
                        {col.render(row)}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        {renderRowActions(row)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginated.length === 0 && (
            <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
          )}
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden">{renderMobileCards()}</div>

      {/* Footer */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-[var(--text-muted)]">
          Showing <span className="font-medium text-[var(--text-secondary)]">{sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1}</span>
          {' – '}
          <span className="font-medium text-[var(--text-secondary)]">{Math.min(safePage * pageSize, sorted.length)}</span> of{' '}
          <span className="font-medium text-[var(--text-secondary)]">{sorted.length}</span> records
        </p>
        <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}

function DefaultCard<T>({ row, columns, actions }: { row: T; columns: DataTableColumn<T>[]; actions: ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 shadow-card">
      <div className="space-y-2.5">
        {columns
          .filter((c) => !c.hideOnMobile)
          .map((col) => (
            <div key={col.key} className="flex items-start justify-between gap-3">
              <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{col.header}</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{col.render(row)}</span>
            </div>
          ))}
      </div>
      {actions && <div className="mt-3 flex justify-end border-t border-[var(--border-subtle)] pt-2">{actions}</div>}
    </div>
  )
}
