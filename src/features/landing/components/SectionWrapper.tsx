import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  badge?: string
  title?: string
  description?: string
  variant?: 'default' | 'alt'
}

export function SectionWrapper({
  children,
  className,
  id,
  badge,
  title,
  description,
  variant = 'default',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 lg:py-28',
        variant === 'alt' && 'bg-[var(--surface-alt)]',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(badge || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            {badge && (
              <Badge variant="primary" size="md" className="mb-4">
                {badge}
              </Badge>
            )}
            {title && <Text variant="h3">{title}</Text>}
            {description && (
              <Text variant="bodySm" className="mt-3 text-[var(--text-secondary)]">
                {description}
              </Text>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}
