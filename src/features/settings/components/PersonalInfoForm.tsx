import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiPhone, HiBriefcase } from 'react-icons/hi'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  company: string
  jobTitle: string
  bio: string
}

export function PersonalInfoForm() {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<PersonalInfo>({
    defaultValues: {
      fullName: 'Alex Rivera',
      email: 'alex@tsggrateful.com',
      phone: '+1 (555) 123-4567',
      company: 'T.S.G Grateful Logistics Ltd.',
      jobTitle: 'Logistics Operations Manager',
      bio: 'Managing global shipping operations with over 10 years of experience in logistics and supply chain management.',
    },
  })

  const onSubmit = (data: PersonalInfo) => {
    console.log('Personal info:', data)
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Personal Information</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Update your personal details</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          leftIcon={<HiUser className="h-4 w-4" />}
          error={errors.fullName?.message}
          {...register('fullName', { required: 'Name is required' })}
        />
        <Input
          label="Email Address"
          leftIcon={<HiMail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
          })}
        />
        <Input
          label="Phone Number"
          leftIcon={<HiPhone className="h-4 w-4" />}
          error={errors.phone?.message}
          {...register('phone', { required: 'Phone is required' })}
        />
        <Input
          label="Company"
          leftIcon={<HiBriefcase className="h-4 w-4" />}
          {...register('company')}
        />
        <Input
          label="Job Title"
          {...register('jobTitle')}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-[var(--text-secondary)] mb-1.5 block">Bio</label>
        <textarea
          className="flex min-h-[100px] w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tsg-500/30 focus-visible:border-tsg-500 hover:border-[var(--text-muted)]"
          {...register('bio')}
        />
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" disabled={!isDirty}>
          Save Changes
        </Button>
      </div>
    </motion.form>
  )
}
