import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { ForgotPasswordIllustration } from '@/features/auth/components/AuthIllustrations'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert, AlertDescription } from '@/components/ui/Alert'

interface ForgotForm {
  email: string
}

export function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>()

  const onSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSent(true)
  }

  if (sent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent a password reset link to your email address. It will expire in 30 minutes."
        illustration={<ForgotPasswordIllustration />}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Alert variant="success">
            <AlertDescription>
              Reset link sent! Please check your inbox (and spam folder).
            </AlertDescription>
          </Alert>
          <div className="flex flex-col gap-3">
            <Button variant="gold" className="w-full" asChild>
              <Link to="/reset-password">Go to Reset Password</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="No worries. Enter your email and we'll send you a reset link."
      illustration={<ForgotPasswordIllustration />}
      altLink={{ text: 'Remember your password?', label: 'Sign in', to: '/login' }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        <Button type="submit" variant="gold" size="xl" className="w-full" disabled={submitting}>
          {submitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
