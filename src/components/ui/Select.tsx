import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FocusEvent, type KeyboardEvent, type SelectHTMLAttributes, forwardRef } from 'react'
import { HiChevronDown, HiSearch } from 'react-icons/hi'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  searchable?: boolean
  onValueChange?: (value: string) => void
}

const Select = forwardRef<HTMLInputElement | HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, searchable = false, value, onChange, onValueChange, onBlur, onFocus, name, disabled, required, autoComplete, defaultValue, form, ...props }, ref) => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const filteredOptions = useMemo(() => {
      if (!searchable) return options
      const normalized = query.trim().toLowerCase()
      if (!normalized) return options
      return options.filter((opt) => opt.label.toLowerCase().includes(normalized))
    }, [options, query, searchable])

    useEffect(() => {
      if (!searchable) return
      setActiveIndex(0)
    }, [searchable, query])

    useEffect(() => {
      if (!searchable) return
      setQuery((typeof value === 'string' ? options.find((opt) => opt.value === value)?.label : '') ?? '')
    }, [options, searchable, value])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value
      setQuery(nextValue)
      setOpen(true)
      if (onChange) onChange(event as unknown as ChangeEvent<HTMLSelectElement>)
      if (onValueChange && !nextValue.trim()) onValueChange('')
    }

    const handleSelect = (nextValue: string) => {
      const syntheticEvent = { target: { value: nextValue } } as ChangeEvent<HTMLSelectElement>
      if (onChange) onChange(syntheticEvent)
      if (onValueChange) onValueChange(nextValue)
      setOpen(false)
      setQuery(options.find((opt) => opt.value === nextValue)?.label ?? '')
    }

    const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
      setOpen(true)
      if (onFocus) onFocus(event as unknown as FocusEvent<HTMLSelectElement>)
    }

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
      window.setTimeout(() => setOpen(false), 120)
      if (onBlur) onBlur(event as unknown as FocusEvent<HTMLSelectElement>)
    }

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (!searchable || filteredOptions.length === 0) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((index) => (index + 1) % filteredOptions.length)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((index) => (index - 1 + filteredOptions.length) % filteredOptions.length)
      } else if (event.key === 'Enter' && open) {
        event.preventDefault()
        handleSelect(filteredOptions[activeIndex].value)
      }
    }

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
          <div
            className={cn(
              'flex h-10 w-full items-center rounded-lg border border-[var(--border-default)] bg-[var(--surface)] px-3 py-2 pr-10 text-sm text-[var(--text-primary)] transition-all duration-200',
              'focus-within:outline-none focus-within:ring-2 focus-within:ring-tsg-500/30 focus-within:border-tsg-500',
              'hover:border-[var(--text-muted)]',
              error && 'border-red-500 focus-within:ring-red-500/30 focus-within:border-red-500',
              searchable && 'border-zinc-700 bg-black text-white shadow-sm shadow-black/20',
              className,
            )}
          >
            {searchable ? (
              <>
                <HiSearch className="mr-2 h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  id={id}
                  ref={(node) => {
                    inputRef.current = node
                    if (typeof ref === 'function') {
                      ref(node)
                    } else if (ref) {
                      ref.current = node
                    }
                  }}
                  type="text"
                  value={query}
                  placeholder={placeholder}
                  className={cn('w-full bg-transparent text-sm outline-none', searchable && 'text-white placeholder:text-zinc-400')}
                  name={name}
                  disabled={disabled}
                  required={required}
                  autoComplete={autoComplete}
                  form={form}
                  onFocus={handleInputFocus}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                  defaultValue={defaultValue}
                />
              </>
            ) : (
              <select
                id={id}
                ref={ref as React.Ref<HTMLSelectElement>}
                className="h-full w-full appearance-none bg-transparent text-sm outline-none"
                value={value}
                onChange={(event) => {
                  if (onChange) onChange(event)
                }}
                {...props}
              >
                {placeholder && (
                  <option value="" disabled>
                    {placeholder}
                  </option>
                )}
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
            <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          </div>
          {searchable && open && (
            <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-zinc-700 bg-black shadow-xl shadow-black/30">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, index) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={cn(
                      'flex w-full items-center px-3 py-2 text-left text-sm transition-colors',
                      activeIndex === index
                        ? 'bg-zinc-800 text-white'
                        : 'text-white hover:bg-zinc-800',
                    )}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-zinc-400">No matching country or city found</div>
              )}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    )
  },
)
Select.displayName = 'Select'

export { Select }
