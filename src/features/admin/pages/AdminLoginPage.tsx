import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { LoginIllustration } from '@/features/auth/components/AuthIllustrations'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { useAuth } from '../AuthProvider'

interface LoginForm {
  email: string
  password: string
  remember: boolean
}

export function AdminLoginPage() {
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  if (user) {
    navigate(from, { replace: true })
    return null
  }

  const onSubmit = async (data: LoginForm) => {
    setError(null)
    setSubmitting(true)

    const result = await signIn(data.email, data.password)

    setSubmitting(false)

    if (result.error) {
      setError(result.error)
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <AuthLayout
      title="Admin Sign In"
      subtitle="Access the T.S.G Grateful Logistics admin portal."
      illustration={<LoginIllustration />}
      altLink={{ text: 'Back to', label: 'Public Site', to: '/' }}
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
          id="admin-email"
          label="Email Address"
          type="email"
          placeholder="admin@tsglogistics.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
          })}
        />

        <div className="space-y-1">
          <Input
            id="admin-password"
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
            id="admin-remember"
            type="checkbox"
            className="h-4 w-4 rounded border-[var(--border-default)] text-tsg-500 focus:ring-tsg-500/30"
            {...register('remember')}
          />
          <label htmlFor="admin-remember" className="text-sm text-[var(--text-secondary)]">
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
            'Sign In to Admin'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
