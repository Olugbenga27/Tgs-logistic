import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
  gradient?: string
  delay?: number
}

const gradients: Record<string, string> = {
  blue: 'from-tsg-500/10 to-tsg-500/5 group-hover:from-tsg-500/15 group-hover:to-tsg-500/8',
  emerald: 'from-emerald-500/10 to-emerald-500/5 group-hover:from-emerald-500/15 group-hover:to-emerald-500/8',
  amber: 'from-amber-500/10 to-amber-500/5 group-hover:from-amber-500/15 group-hover:to-amber-500/8',
  purple: 'from-purple-500/10 to-purple-500/5 group-hover:from-purple-500/15 group-hover:to-purple-500/8',
}

const iconGradients: Record<string, string> = {
  blue: 'from-tsg-500 to-tsg-600',
  emerald: 'from-emerald-500 to-emerald-600',
  amber: 'from-gold-500 to-gold-600',
  purple: 'from-purple-500 to-purple-600',
}

export function StatsCard({ title, value, icon, trend, trendUp, gradient = 'blue', delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className="relative overflow-hidden transition-shadow duration-300 hover:shadow-elevated">
        {/* Hover gradient overlay */}
        <div className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          gradients[gradient],
        )} />

        <CardContent className="relative p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                {title}
              </p>
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.15, type: 'spring', bounce: 0.3 }}
                className="mt-1.5 text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
              >
                {value}
              </motion.p>
              {trend && (
                <p className={cn(
                  'mt-1 text-xs font-medium',
                  trendUp ? 'text-emerald-500' : 'text-red-500',
                )}>
                  {trendUp ? '↑' : '↓'} {trend}
                </p>
              )}
            </div>

            <div className={cn(
              'flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
              iconGradients[gradient],
            )}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
