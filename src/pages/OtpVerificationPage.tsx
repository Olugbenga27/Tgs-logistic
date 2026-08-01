import { useState, useRef, type KeyboardEvent, type ClipboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { OtpIllustration } from '@/features/auth/components/AuthIllustrations'
import { Button } from '@/components/ui/Button'
import { Alert, AlertDescription } from '@/components/ui/Alert'

const DIGIT_COUNT = 6

export function OtpVerificationPage() {
  const [digits, setDigits] = useState<string[]>(Array(DIGIT_COUNT).fill(''))
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resending, setResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const code = digits.join('')

  const focusIndex = (i: number) => {
    inputRefs.current[i]?.focus()
  }

  const handleChange = (i: number, value: string) => {
    if (value.length > 1) return
    if (!/^\d*$/.test(value)) return
    const next = [...digits]
    next[i] = value
    setDigits(next)
    setError(null)
    if (value && i < DIGIT_COUNT - 1) focusIndex(i + 1)
  }

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) focusIndex(i - 1)
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const data = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, DIGIT_COUNT)
    if (!data) return
    const next = [...digits]
    for (let j = 0; j < data.length; j++) next[j] = data[j]
    setDigits(next)
    const nextFocus = Math.min(data.length, DIGIT_COUNT - 1)
    focusIndex(nextFocus)
  }

  const handleSubmit = async () => {
    if (code.length !== DIGIT_COUNT) {
      setError('Please enter all 6 digits')
      return
    }
    setError(null)
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSuccess(true)
  }

  const handleResend = async () => {
    setResending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setResending(false)
  }

  if (success) {
    return (
      <AuthLayout
        title="Verified!"
        subtitle="Your identity has been confirmed. You can now proceed."
        illustration={<OtpIllustration />}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Alert variant="success">
            <AlertDescription>OTP verified successfully.</AlertDescription>
          </Alert>
          <Button variant="gold" className="w-full" asChild>
            <Link to="/login">Continue to Login</Link>
          </Button>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="OTP Verification"
      subtitle="Enter the 6-digit code sent to your email or phone."
      illustration={<OtpIllustration />}
      altLink={{ text: 'Back to', label: 'Login', to: '/login' }}
    >
      <div className="space-y-6">
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant="error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Digit Inputs */}
        <div className="flex justify-center gap-2 sm:gap-3">
          {digits.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <input
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                aria-label={`Digit ${i + 1} of ${DIGIT_COUNT}`}
                aria-invalid={!!error}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className={`h-14 w-11 sm:h-16 sm:w-14 rounded-xl border-2 text-center text-xl font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tsg-500/30
                  ${d
                    ? 'border-tsg-500 bg-tsg-50 text-tsg-500'
                    : 'border-[var(--border-default)] bg-[var(--surface)] text-[var(--text-primary)]'
                  }
                  ${error ? 'border-red-500' : ''}
                  hover:border-tsg-500/30
                `}
              />
            </motion.div>
          ))}
        </div>

        <Button
          type="button"
          variant="gold"
          size="xl"
          className="w-full"
          disabled={submitting || code.length !== DIGIT_COUNT}
          onClick={handleSubmit}
        >
          {submitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            'Verify Code'
          )}
        </Button>

        <p className="text-center text-sm text-[var(--text-secondary)]">
          Didn&apos;t receive the code?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="font-semibold text-tsg-500 hover:text-tsg-400 transition-colors disabled:opacity-50"
          >
            {resending ? 'Resending...' : 'Resend Code'}
          </button>
        </p>
      </div>
    </AuthLayout>
  )
}
