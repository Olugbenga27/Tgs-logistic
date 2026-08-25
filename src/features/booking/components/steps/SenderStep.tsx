import { useMemo } from 'react'
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiPhone, HiOfficeBuilding, HiLocationMarker } from 'react-icons/hi'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { BookingFormData } from '../booking-types'
import { countries } from '../countries'
import { getCityOptions } from '../cities'

interface Props {
  register: UseFormRegister<BookingFormData>
  errors: FieldErrors<BookingFormData>
  watch: UseFormWatch<BookingFormData>
  setValue: UseFormSetValue<BookingFormData>
}

export function SenderStep({ register, errors, watch, setValue }: Props) {
  const senderCountry = watch('senderCountry')
  const cityOptions = useMemo(() => getCityOptions(senderCountry), [senderCountry])
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Sender Information</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Who is sending this shipment?</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="John Doe"
          leftIcon={<HiUser className="h-4 w-4" />}
          error={errors.senderName?.message}
          {...register('senderName', { required: 'Sender name is required' })}
        />
        <Input
          label="Email Address *"
          placeholder="john@example.com"
          leftIcon={<HiMail className="h-4 w-4" />}
          error={errors.senderEmail?.message}
          {...register('senderEmail', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
          })}
        />
        <Input
          label="Phone Number *"
          placeholder="+1 (555) 000-0000"
          leftIcon={<HiPhone className="h-4 w-4" />}
          error={errors.senderPhone?.message}
          {...register('senderPhone', { required: 'Phone is required' })}
        />
        <Input
          label="Company"
          placeholder="Company name (optional)"
          leftIcon={<HiOfficeBuilding className="h-4 w-4" />}
          {...register('senderCompany')}
        />
        <div className="sm:col-span-2">
          <Input
            label="Street Address *"
            placeholder="123 Shipping Lane, Suite 100"
            leftIcon={<HiLocationMarker className="h-4 w-4" />}
            error={errors.senderAddress?.message}
            {...register('senderAddress', { required: 'Address is required' })}
          />
        </div>
        <Select
          id="senderCity"
          label="City *"
          placeholder="Select city"
          options={cityOptions}
          error={errors.senderCity?.message}
          searchable
          value={watch('senderCity')}
          onValueChange={(value) => setValue('senderCity', value)}
          name="senderCity"
        />
        <Select
          label="Country *"
          placeholder="Select country"
          options={countries}
          error={errors.senderCountry?.message}
          searchable
          {...register('senderCountry', { required: 'Country is required' })}
        />
      </div>
    </motion.div>
  )
}
