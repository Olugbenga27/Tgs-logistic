import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiClock,
  HiArrowRight,
  HiPaperAirplane,
  HiCheckCircle,
} from 'react-icons/hi'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardContent } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'freight', label: 'Freight Shipping' },
  { value: 'express', label: 'Express Delivery' },
  { value: 'warehousing', label: 'Warehousing & Storage' },
  { value: 'customs', label: 'Customs Brokerage' },
  { value: 'partnership', label: 'Partnership & Business' },
  { value: 'other', label: 'Other' },
]

const officeInfo = [
  {
    title: 'Lagos Head Office',
    detail: '25A Awolowo Road, Ikeja, Lagos, Nigeria',
    icon: HiLocationMarker,
    rows: [
      { label: 'Mon – Fri', value: '8:00 AM – 6:00 PM' },
      { label: 'Sat', value: '9:00 AM – 3:00 PM' },
      { label: 'Sun', value: 'Closed' },
    ],
  },
  {
    title: 'Airport Office',
    detail: 'Murtala Muhammed International Airport, Ikeja, Lagos',
    icon: HiLocationMarker,
    rows: [
      { label: 'Open', value: '24/7 for cargo intake' },
    ],
  },
]

const contactMethods = [
  {
    icon: HiPhone,
    title: 'Call Us',
    rows: [
      { label: 'Lagos', value: '+234 800 TSG SHIP' },
      { label: 'Ibadan', value: '+234 900 TSG SHIP' },
      { label: 'Ile-Ife', value: '+234 700 TSG SHIP' },
    ],
  },
  {
    icon: HiMail,
    title: 'Email Us',
    rows: [{ label: 'General', value: 'info@tsggrateful.com' }],
  },
]

function InfoIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tsg-50 text-tsg-500 shrink-0">
      <Icon className="h-5 w-5" />
    </div>
  )
}

export function ContactSection() {
  const { success } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  const validate = () => {
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!email.trim()) next.email = 'Please enter your email.'
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Please enter a valid email address.'
    if (!message.trim()) next.message = 'Please enter a message.'
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      success('Message sent successfully', 'Our team will get back to you within 24 hours.')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setTimeout(() => setSubmitted(false), 6000)
    }, 800)
  }

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-tsg-500/8 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-gold-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <Text variant="overline" className="mb-2 text-tsg-500">Get in Touch</Text>
              <Text variant="h2" className="mb-3">
                We&apos;d Love to Hear From You
              </Text>
              <Text variant="bodySm" className="text-[var(--text-secondary)]">
                Whether you need a quote, want to track a shipment, or have a question about our
                services — our team is ready to assist.
              </Text>
            </div>

            {officeInfo.map((office) => (
              <Card key={office.title}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <InfoIcon icon={office.icon} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{office.title}</p>
                      <p className="mt-0.5 text-xs text-[var(--text-secondary)] leading-relaxed">{office.detail}</p>
                      <div className="mt-3 space-y-1.5 border-t border-[var(--border-subtle)] pt-3">
                        {office.rows.map((row) => (
                          <div key={row.label} className="flex items-center justify-between gap-3 text-xs">
                            <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                              <HiClock className="h-3.5 w-3.5" />
                              {row.label}
                            </span>
                            <span className="font-medium text-[var(--text-primary)]">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="grid gap-4 sm:grid-cols-2">
              {contactMethods.map((method) => (
                <Card key={method.title}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <InfoIcon icon={method.icon} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{method.title}</p>
                        <div className="mt-2 space-y-1.5">
                          {method.rows.map((row) => (
                            <p key={row.label} className="text-xs text-[var(--text-secondary)]">
                              <span className="text-[var(--text-muted)]">{row.label}: </span>
                              <span className="font-medium text-[var(--text-primary)]">{row.value}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <Card variant="elevated">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6">
                  <Text variant="h3" className="mb-1.5">Send Us a Message</Text>
                  <Text variant="bodySm" className="text-[var(--text-secondary)]">
                    Fill out the form and we&apos;ll respond within one business day.
                  </Text>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Full Name"
                      id="contact-name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      label="Email Address"
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                    />
                  </div>

                  <Select
                    label="Subject"
                    id="contact-subject"
                    placeholder="What is this about?"
                    options={subjectOptions}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-sm font-medium text-[var(--text-secondary)]">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us how we can help..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={cn(
                        'w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tsg-500/30 focus-visible:border-tsg-500',
                        'hover:border-[var(--text-muted)]',
                        'resize-none',
                        errors.message && 'border-red-500 focus-visible:ring-red-500/30 focus-visible:border-red-500',
                      )}
                    />
                    {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                    <Button type="submit" variant="gold" size="xl" disabled={sending} className="sm:flex-1">
                      {sending ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <HiPaperAirplane className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <HiArrowRight className="h-3.5 w-3.5" />
                      Average response time: 24 hrs
                    </span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ opacity: submitted ? 1 : 0, height: submitted ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">Message sent!</p>
                        <p className="mt-0.5 text-sm opacity-90">
                          Thanks for reaching out — our team will get back to you shortly.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
