import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiScale, HiTag } from 'react-icons/hi'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { BookingFormData } from '../booking-types'

interface Props {
  register: UseFormRegister<BookingFormData>
  errors: FieldErrors<BookingFormData>
}

const packageTypes = [
  { value: 'box', label: 'Box / Carton' },
  { value: 'envelope', label: 'Envelope / Document' },
  { value: 'pallet', label: 'Pallet' },
  { value: 'tube', label: 'Tube / Cylinder' },
  { value: 'drum', label: 'Drum / Barrel' },
  { value: 'crate', label: 'Crate' },
  { value: 'custom', label: 'Custom / Irregular' },
]

export function PackageStep({ register, errors }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Package Details</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Describe what you are shipping</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Package Type *"
          placeholder="Select type"
          options={packageTypes}
          error={errors.packageType?.message}
          {...register('packageType', { required: 'Package type is required' })}
        />
        <Input
          label="Weight (kg) *"
          type="number"
          step="0.1"
          min="0"
          placeholder="10"
          leftIcon={<HiScale className="h-4 w-4" />}
          error={errors.packageWeight?.message}
          {...register('packageWeight', {
            required: 'Weight is required',
            min: { value: 0.1, message: 'Weight must be > 0' },
          })}
        />
        <Input
          label="Quantity *"
          type="number"
          min="1"
          placeholder="1"
          leftIcon={<HiTag className="h-4 w-4" />}
          error={errors.packageQuantity?.message}
          {...register('packageQuantity', {
            required: 'Quantity is required',
            min: { value: 1, message: 'At least 1' },
          })}
        />
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-[var(--text-secondary)] mb-1.5 block">
            Dimensions (cm)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <Input
              type="number"
              step="0.1"
              min="0"
              placeholder="Length"
              error={errors.packageLength?.message}
              {...register('packageLength', {
                required: 'Required',
                min: { value: 1, message: 'Min 1cm' },
              })}
            />
            <Input
              type="number"
              step="0.1"
              min="0"
              placeholder="Width"
              error={errors.packageWidth?.message}
              {...register('packageWidth', {
                required: 'Required',
                min: { value: 1, message: 'Min 1cm' },
              })}
            />
            <Input
              type="number"
              step="0.1"
              min="0"
              placeholder="Height"
              error={errors.packageHeight?.message}
              {...register('packageHeight', {
                required: 'Required',
                min: { value: 1, message: 'Min 1cm' },
              })}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <Input
            label="Contents Description *"
            placeholder="What is inside the package?"
            error={errors.packageDescription?.message}
            {...register('packageDescription', { required: 'Description is required' })}
          />
        </div>
      </div>
    </motion.div>
  )
}
