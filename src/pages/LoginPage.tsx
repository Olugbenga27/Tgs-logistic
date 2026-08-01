import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { LoginIllustration } from '@/features/auth/components/AuthIllustrations'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert, AlertDescription } from '@/components/ui/Alert'

interface LoginForm {
  email: string
  password: string
  remember: boolean
}

export function LoginPage() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = async () => {
    setError(null)
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <AuthLayout
        title="Welcome back!"
        subtitle="You have been successfully logged in."
        illustration={<LoginIllustration />}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Alert variant="success">
            <AlertDescription>Redirecting to your dashboard...</AlertDescription>
          </Alert>
          <Button variant="gold" className="w-full" asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Enter your credentials to access your account."
      illustration={<LoginIllustration />}
      altLink={{ text: "Don't have an account?", label: 'Create one', to: '/register' }}
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

        <div className="space-y-1">
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs font-medium text-tsg-500 hover:text-tsg-400 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-[var(--border-default)] text-tsg-500 focus:ring-tsg-500/30"
            {...register('remember')}
          />
          <label htmlFor="remember" className="text-sm text-[var(--text-secondary)]">
            Remember me
          </label>
        </div>

        <Button type="submit" variant="gold" size="xl" className="w-full" disabled={submitting}>
          {submitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
