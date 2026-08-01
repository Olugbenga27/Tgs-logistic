import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { VerifyEmailIllustration } from '@/features/auth/components/AuthIllustrations'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert, AlertDescription } from '@/components/ui/Alert'

interface VerifyForm {
  email: string
}

export function VerifyEmailPage() {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForm>()

  const onSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSent(true)
  }

  if (sent) {
    return (
      <AuthLayout
        title="Verification email sent!"
        subtitle="Please check your inbox and click the verification link to activate your account."
        illustration={<VerifyEmailIllustration />}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Alert variant="success">
            <AlertDescription>
              Verification link sent! Check your email (including spam folder).
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-3">
            <Button variant="gold" className="w-full" asChild>
              <Link to="/login">Go to Login</Link>
            </Button>
            <p className="text-center text-xs text-[var(--text-muted)]">
              Didn&apos;t receive the email?{' '}
              <button
                type="button"
                onClick={() => setSent(false)}
                className="font-medium text-tsg-500 hover:text-tsg-400 transition-colors"
              >
                Resend verification
              </button>
            </p>
          </div>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Enter the email address you used to register and we'll send you a verification link."
      illustration={<VerifyEmailIllustration />}
      altLink={{ text: 'Already verified?', label: 'Sign in', to: '/login' }}
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
            'Send Verification Link'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
