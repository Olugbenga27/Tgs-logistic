import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiStar, HiCheck } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import type { BookingFormData, CourierOption } from '../booking-types'

interface Props {
  register: UseFormRegister<BookingFormData>
  errors: FieldErrors<BookingFormData>
  watch: UseFormWatch<BookingFormData>
}

const couriers: CourierOption[] = [
  {
    id: 'dhl',
    name: 'DHL',
    initials: 'D',
    rate: 12.50,
    deliveryDays: '3–5',
    rating: 4.8,
    color: '#FC0',
    bgColor: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300',
  },
  {
    id: 'fedex',
    name: 'FedEx',
    initials: 'F',
    rate: 11.00,
    deliveryDays: '2–4',
    rating: 4.7,
    color: '#4D148C',
    bgColor: 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300',
  },
  {
    id: 'ups',
    name: 'UPS',
    initials: 'U',
    rate: 10.75,
    deliveryDays: '3–6',
    rating: 4.6,
    color: '#351C15',
    bgColor: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300',
  },
  {
    id: 'aramex',
    name: 'Aramex',
    initials: 'A',
    rate: 9.50,
    deliveryDays: '4–8',
    rating: 4.4,
    color: '#E31E24',
    bgColor: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300',
  },
]

export function CourierStep({ register, errors, watch }: Props) {
  const selected = watch('courier')

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Select Courier</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Choose a courier partner for delivery</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {couriers.map((courier, i) => {
          const isSelected = selected === courier.id
          return (
            <motion.label
              key={courier.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className={cn(
                'relative flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200',
                isSelected
                  ? 'border-tsg-500 bg-tsg-50/50 dark:bg-tsg-500/10'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--surface-alt)]',
              )}
            >
              <input
                type="radio"
                value={courier.id}
                className="sr-only"
                {...register('courier', { required: 'Select a courier' })}
              />
              <div className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold',
                courier.bgColor,
              )}>
                {courier.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--text-primary)]">{courier.name}</span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <HiStar className="h-3 w-3" />
                    <span className="text-[11px] font-semibold">{courier.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-[var(--text-muted)]">{courier.deliveryDays} days</span>
                  <span className="text-xs font-semibold text-[var(--text-primary)]">${courier.rate.toFixed(2)}/kg</span>
                </div>
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
      {errors.courier && (
        <p className="text-xs text-red-500">{errors.courier.message}</p>
      )}
    </motion.div>
  )
}
