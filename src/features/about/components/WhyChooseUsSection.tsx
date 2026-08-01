import { motion } from 'framer-motion'
import { SectionWrapper } from '@/features/landing/components/SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'
import { HiCheckCircle, HiChartBar, HiClock, HiShieldCheck, HiSupport, HiGlobe } from 'react-icons/hi'

const reasons = [
  {
    icon: HiGlobe,
    title: 'Local Expertise, Global Reach',
    description: 'Deep understanding of Nigerian logistics with international connections to move your shipments worldwide.',
  },
  {
    icon: HiClock,
    title: 'Real-Time Tracking',
    description: 'Know exactly where your package is at all times with our real-time tracking system and regular updates.',
  },
  {
    icon: HiCheckCircle,
    title: 'Door-to-Door Service',
    description: 'From pickup in Lagos to delivery anywhere in the world — we handle every step of the journey.',
  },
  {
    icon: HiChartBar,
    title: 'Personal Shopping',
    description: 'We buy, pack, and ship items on your behalf. Shop from international stores with ease.',
  },
  {
    icon: HiShieldCheck,
    title: 'Competitive Rates',
    description: 'Affordable shipping without compromising on quality. Transparent pricing with no hidden fees.',
  },
  {
    icon: HiSupport,
    title: 'Dedicated Support',
    description: 'Nigerian-based customer service team ready to help with any questions or concerns.',
  },
]

export function WhyChooseUsSection() {
  return (
    <SectionWrapper
      badge="Why Choose Us"
      title="The T.S.G Advantage"
      description="What sets us apart in a competitive industry — delivered consistently, every single day."
      variant="alt"
    >
      <div className="relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none hidden lg:block opacity-20 rounded-full overflow-hidden">
          <LazyImage
            src={images.about.containers}
            alt=""
            className="absolute inset-0"
            wrapperClassName="absolute inset-0"
            rounded="none"
            objectFit="cover"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Card className="h-full group hover:border-tsg-500/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tsg-500/10 text-tsg-500 group-hover:scale-110 transition-transform duration-300">
                      <reason.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <Text variant="h6" className="mb-1.5">{reason.title}</Text>
                      <Text variant="bodySm" className="text-[var(--text-secondary)]">{reason.description}</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
