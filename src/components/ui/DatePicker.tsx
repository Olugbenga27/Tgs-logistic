import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight, HiCalendar } from 'react-icons/hi'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  label?: string
  value?: Date
  onChange?: (date: Date) => void
  error?: string
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function DatePicker({
  label,
  value,
  onChange,
  error,
  placeholder = 'Select date...',
  minDate,
  maxDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(value ?? new Date())
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startDay = new Date(year, month, 1).getDay()

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = []
    for (let i = 0; i < startDay; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) days.push(d)
    return days
  }, [year, month, startDay, daysInMonth])

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const isDisabled = (day: number) => {
    if (!minDate && !maxDate) return false
    const date = new Date(year, month, day)
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true
    if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true
    return false
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  const isSelected = (day: number) => {
    if (!value) return false
    return day === value.getDate() && month === value.getMonth() && year === value.getFullYear()
  }

  const handleSelect = (day: number) => {
    if (isDisabled(day)) return
    const selected = new Date(year, month, day)
    onChange?.(selected)
    setViewDate(selected)
    setIsOpen(false)
  }

  const displayValue = value
    ? `${MONTHS[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`
    : ''

  const canGoPrev = !minDate || viewDate > new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  const canGoNext = !maxDate || viewDate < new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      {label && (
        <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-10 w-full items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface)] px-3 text-sm transition-all duration-200',
          'hover:border-[var(--text-muted)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tsg-500/30 focus-visible:border-tsg-500',
          error && 'border-red-500 focus-visible:ring-red-500/30',
        )}
      >
        <HiCalendar className="h-4 w-4 text-[var(--text-muted)]" />
        <span className={cn('flex-1 text-left', !value && 'text-[var(--text-muted)]')}>
          {displayValue || placeholder}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-4 shadow-elevated"
            style={{ transformOrigin: 'top' }}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                disabled={!canGoPrev}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)] disabled:opacity-30"
              >
                <HiChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {MONTHS[month]} {year}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                disabled={!canGoNext}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)] disabled:opacity-30"
              >
                <HiChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="flex h-8 w-8 items-center justify-center text-xs font-medium text-[var(--text-muted)]"
                >
                  {d[0]}
                </div>
              ))}
              {calendarDays.map((day, i) =>
                day ? (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(day!)}
                    disabled={isDisabled(day)}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all duration-150',
                      isSelected(day)
                        ? 'bg-tsg-500 text-white'
                        : isToday(day)
                          ? 'border border-tsg-500/50 text-tsg-500'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] hover:text-[var(--text-primary)]',
                      isDisabled(day) && 'cursor-not-allowed opacity-30',
                    )}
                  >
                    {day}
                  </button>
                ) : (
                  <div key={i} />
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
