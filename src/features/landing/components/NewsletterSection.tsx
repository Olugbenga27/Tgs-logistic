import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiArrowRight } from 'react-icons/hi'
import { SectionWrapper } from './SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function NewsletterSection() {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  if (subscribed) {
    return (
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <Card variant="gradient-border">
            <CardContent className="p-10">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-tsg-500/10 text-tsg-500">
                <HiMail className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                You&apos;re Subscribed!
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Thanks for joining. We&apos;ll send you logistics insights, industry updates, and exclusive offers.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper
      badge="Stay Updated"
      title="Never Miss an Update"
      description="Get logistics insights, industry trends, and exclusive offers delivered to your inbox."
    >
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubscribe}>
          <Card variant="elevated">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <Button type="submit" variant="gold" size="lg">
                  Subscribe
                  <HiArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 text-xs text-[var(--text-muted)] text-center sm:text-left">
                No spam. Unsubscribe anytime. Read our{' '}
                <a href="#" className="underline hover:text-tsg-500 transition-colors">
                  Privacy Policy
                </a>.
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </SectionWrapper>
  )
}
