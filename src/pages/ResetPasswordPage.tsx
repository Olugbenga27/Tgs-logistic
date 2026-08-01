import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { ResetPasswordIllustration } from '@/features/auth/components/AuthIllustrations'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert, AlertDescription } from '@/components/ui/Alert'

interface ResetForm {
  newPassword: string
  confirmPassword: string
}

export function ResetPasswordPage() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetForm>()

  const newPassword = watch('newPassword')

  const onSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <AuthLayout
        title="Password reset!"
        subtitle="Your password has been successfully updated. You can now sign in with your new password."
        illustration={<ResetPasswordIllustration />}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Alert variant="success">
            <AlertDescription>Password changed successfully.</AlertDescription>
          </Alert>
          <Button variant="gold" className="w-full" asChild>
            <Link to="/login">Sign In Now</Link>
          </Button>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password below."
      illustration={<ResetPasswordIllustration />}
      altLink={{ text: 'Changed your mind?', label: 'Sign in', to: '/login' }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="newPassword"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          error={errors.newPassword?.message}
          {...register('newPassword', {
            required: 'New password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: 'Must contain uppercase, lowercase, and a number',
            },
          })}
        />

        <Input
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="Repeat new password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (v) => v === newPassword || 'Passwords do not match',
          })}
        />

        <Button type="submit" variant="gold" size="xl" className="w-full" disabled={submitting}>
          {submitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            'Reset Password'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
