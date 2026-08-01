import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiClock, HiGlobe, HiLightningBolt, HiCheck } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import type { BookingFormData, ShippingMethodOption } from '../booking-types'

interface Props {
  register: UseFormRegister<BookingFormData>
  errors: FieldErrors<BookingFormData>
  watch: UseFormWatch<BookingFormData>
}

const methods: ShippingMethodOption[] = [
  {
    id: 'economy',
    label: 'Economy',
    desc: 'Most affordable for non-urgent shipments',
    days: '10–15 business days',
    rate: 2.50,
    icon: HiClock,
  },
  {
    id: 'standard',
    label: 'Standard',
    desc: 'Balanced speed and cost for regular shipments',
    days: '5–10 business days',
    rate: 4.00,
    icon: HiGlobe,
  },
  {
    id: 'express',
    label: 'Express',
    desc: 'Fast tracking and priority handling',
    days: '2–5 business days',
    rate: 7.50,
    icon: HiLightningBolt,
  },
  {
    id: 'same_day',
    label: 'Same Day',
    desc: 'Urgent delivery within hours',
    days: 'Same day',
    rate: 12.00,
    icon: HiLightningBolt,
  },
]

export function ShippingMethodStep({ register, errors, watch }: Props) {
  const selected = watch('shippingMethod')

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Shipping Method</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Choose how fast your shipment should arrive</p>
      </div>
      <div className="space-y-3">
        {methods.map((method, i) => {
          const Icon = method.icon
          const isSelected = selected === method.id
          return (
            <motion.label
              key={method.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className={cn(
                'relative flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-all duration-200',
                isSelected
                  ? 'border-tsg-500 bg-tsg-50/50 dark:bg-tsg-500/10'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--surface-alt)]',
              )}
            >
              <input
                type="radio"
                value={method.id}
                className="sr-only"
                {...register('shippingMethod', { required: 'Select a shipping method' })}
              />
              <div className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors',
                isSelected ? 'bg-tsg-500 text-white' : 'bg-[var(--surface-alt)] text-[var(--text-muted)]',
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[var(--text-primary)]">{method.label}</span>
                  <span className="text-sm font-bold text-tsg-500">${method.rate.toFixed(2)}/kg</span>
                </div>
                <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{method.desc}</p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">{method.days}</p>
              </div>
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-tsg-500 text-white">
                  <HiCheck className="h-3 w-3" />
                </div>
              )}
            </motion.label>
          )
        })}
      </div>
      {errors.shippingMethod && (
        <p className="text-xs text-red-500">{errors.shippingMethod.message}</p>
      )}
    </motion.div>
  )
}
