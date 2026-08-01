import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  forwardRef,
} from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs compound components must be used within Tabs')
  return ctx
}

interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  className?: string
}

export function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultValue)
  const activeTab = value ?? internalTab

  const setActiveTab = (tab: string) => {
    if (!value) setInternalTab(tab)
    onValueChange?.(tab)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'pills' | 'underline'
}

export function TabsList({ className, variant = 'default', children, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        'flex gap-1',
        variant === 'default' &&
          'rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-alt)] p-1',
        variant === 'pills' && 'flex-wrap gap-2',
        variant === 'underline' &&
          'border-b border-[var(--border-subtle)] pb-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabs()
    const isActive = activeTab === value

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        onClick={() => setActiveTab(value)}
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tsg-500',
          isActive
            ? 'text-tsg-600 dark:text-tsg-300'
            : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]',
          className,
        )}
        {...props}
      >
        {isActive && (
          <motion.div
            layoutId="tab-indicator"
            className="absolute inset-0 rounded-lg bg-white shadow-soft dark:bg-[var(--surface-elevated)]"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    )
  },
)
TabsTrigger.displayName = 'TabsTrigger'

interface TabsContentProps {
  value: string
  className?: string
  children?: ReactNode
}

export function TabsContent({ className, value, children }: TabsContentProps) {
  const { activeTab } = useTabs()
  if (activeTab !== value) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      role="tabpanel"
      className={cn('mt-4', className)}
    >
      {children}
    </motion.div>
  )
}
