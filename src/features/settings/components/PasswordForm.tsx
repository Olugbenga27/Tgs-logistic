import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HiLockClosed, HiKey, HiShieldCheck } from 'react-icons/hi'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export function PasswordForm() {
  const { register, handleSubmit, watch, formState: { errors, isDirty } } = useForm<PasswordData>()

  const onSubmit = (data: PasswordData) => {
    console.log('Password changed:', data)
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg"
    >
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Change Password</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Update your account password</p>
      </div>
      <Input
        label="Current Password"
        type="password"
        leftIcon={<HiLockClosed className="h-4 w-4" />}
        error={errors.currentPassword?.message}
        {...register('currentPassword', { required: 'Current password is required' })}
      />
      <Input
        label="New Password"
        type="password"
        leftIcon={<HiKey className="h-4 w-4" />}
        error={errors.newPassword?.message}
        {...register('newPassword', {
          required: 'New password is required',
          minLength: { value: 8, message: 'At least 8 characters' },
        })}
      />
      <Input
        label="Confirm New Password"
        type="password"
        leftIcon={<HiShieldCheck className="h-4 w-4" />}
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (v) => v === watch('newPassword') || 'Passwords do not match',
        })}
      />
      <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] p-3 rounded-xl bg-[var(--surface-alt)]">
        <HiShieldCheck className="h-5 w-5 text-tsg-500 shrink-0" />
        <span>Password must be at least 8 characters and include a mix of letters, numbers, and symbols.</span>
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" disabled={!isDirty}>
          Update Password
        </Button>
      </div>
    </motion.form>
  )
}
