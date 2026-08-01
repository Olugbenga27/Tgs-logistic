import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiPhone, HiOfficeBuilding, HiLocationMarker } from 'react-icons/hi'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { BookingFormData } from '../booking-types'

interface Props {
  register: UseFormRegister<BookingFormData>
  errors: FieldErrors<BookingFormData>
}

export function ReceiverStep({ register, errors }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Receiver Information</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Who should receive this shipment?</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="Jane Smith"
          leftIcon={<HiUser className="h-4 w-4" />}
          error={errors.receiverName?.message}
          {...register('receiverName', { required: 'Receiver name is required' })}
        />
        <Input
          label="Email Address *"
          placeholder="jane@example.com"
          leftIcon={<HiMail className="h-4 w-4" />}
          error={errors.receiverEmail?.message}
          {...register('receiverEmail', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
          })}
        />
        <Input
          label="Phone Number *"
          placeholder="+1 (555) 111-1111"
          leftIcon={<HiPhone className="h-4 w-4" />}
          error={errors.receiverPhone?.message}
          {...register('receiverPhone', { required: 'Phone is required' })}
        />
        <Input
          label="Company"
          placeholder="Company name (optional)"
          leftIcon={<HiOfficeBuilding className="h-4 w-4" />}
          {...register('receiverCompany')}
        />
        <div className="sm:col-span-2">
          <Input
            label="Street Address *"
            placeholder="456 Receiving Blvd, Building B"
            leftIcon={<HiLocationMarker className="h-4 w-4" />}
            error={errors.receiverAddress?.message}
            {...register('receiverAddress', { required: 'Address is required' })}
          />
        </div>
        <Input
          label="City *"
          placeholder="Los Angeles"
          error={errors.receiverCity?.message}
          {...register('receiverCity', { required: 'City is required' })}
        />
        <Select
          label="Country *"
          placeholder="Select country"
          options={[
            { value: 'US', label: 'United States' },
            { value: 'NG', label: 'Nigeria' },
            { value: 'UK', label: 'United Kingdom' },
            { value: 'CA', label: 'Canada' },
            { value: 'DE', label: 'Germany' },
            { value: 'FR', label: 'France' },
            { value: 'AE', label: 'UAE' },
            { value: 'CN', label: 'China' },
          ]}
          error={errors.receiverCountry?.message}
          {...register('receiverCountry', { required: 'Country is required' })}
        />
      </div>
    </motion.div>
  )
}
