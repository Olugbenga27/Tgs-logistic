import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { RegisterIllustration } from '@/features/auth/components/AuthIllustrations'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert, AlertDescription } from '@/components/ui/Alert'

interface RegisterForm {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agree: boolean
}

export function RegisterPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>()

  const password = watch('password')

  const onSubmit = async () => {
    setError(null)
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <AuthLayout
        title="Account created!"
        subtitle="Please check your email to verify your account before logging in."
        illustration={<RegisterIllustration />}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Alert variant="success">
            <AlertDescription>
              We&apos;ve sent a verification link to your email. Please check your inbox.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col gap-3">
            <Button variant="gold" className="w-full" asChild>
              <Link to="/verify-email">Verify Email Now</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login">Go to Login</Link>
            </Button>
          </div>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join T.S.G Grateful Logistics and start shipping globally."
      illustration={<RegisterIllustration />}
      altLink={{ text: 'Already have an account?', label: 'Sign in', to: '/login' }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant="error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <Input
          id="fullName"
          label="Full Name"
          placeholder="John Doe"
          error={errors.fullName?.message}
          {...register('fullName', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            })}
          />
          <Input
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="+234 800 000 0000"
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Phone number is required',
              minLength: { value: 8, message: 'Invalid phone number' },
            })}
          />
        </div>

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Create a strong password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: 'Must contain uppercase, lowercase, and a number',
            },
          })}
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (v) => v === password || 'Passwords do not match',
          })}
        />

        <div className="flex items-start gap-2">
          <input
            id="agree"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-[var(--border-default)] text-tsg-500 focus:ring-tsg-500/30"
            {...register('agree', { required: 'You must agree to the terms' })}
          />
          <label htmlFor="agree" className="text-sm text-[var(--text-secondary)]">
            I agree to the{' '}
            <a href="#" className="font-medium text-tsg-500 hover:text-tsg-400 transition-colors">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="font-medium text-tsg-500 hover:text-tsg-400 transition-colors">Privacy Policy</a>
          </label>
        </div>
        {errors.agree && (
          <p className="text-xs text-red-500 -mt-2">{errors.agree.message}</p>
        )}

        <Button type="submit" variant="gold" size="xl" className="w-full" disabled={submitting}>
          {submitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            'Create Account'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
