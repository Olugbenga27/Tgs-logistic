import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionWrapper } from './SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card variant="gradient-border" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-tsg-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
          </div>
          <CardContent className="relative p-10 sm:p-16 text-center">
            <Text variant="h3" className="mb-4">
              Ready to Ship with T.S.G?
            </Text>
            <Text variant="body" className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
              Join 5,000+ happy customers who trust T.S.G Grateful Logistics for their shipping needs.
            </Text>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="xl" asChild>
                <Link to="/book-shipment">Ship Now</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-[var(--text-muted)]">
              Free quote. No commitment required.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </SectionWrapper>
  )
}
