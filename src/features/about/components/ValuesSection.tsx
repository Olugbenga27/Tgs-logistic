import { motion } from 'framer-motion'
import { SectionWrapper } from '@/features/landing/components/SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { HiShieldCheck, HiLightningBolt, HiUsers, HiGlobe, HiHeart, HiCheckCircle } from 'react-icons/hi'

const values = [
  {
    icon: HiShieldCheck,
    title: 'Reliability',
    description: 'We keep our promises. Every shipment, every time.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: HiGlobe,
    title: 'Transparency',
    description: 'Real-time tracking and clear communication at every step.',
    color: 'from-sky-500 to-indigo-500',
  },
  {
    icon: HiHeart,
    title: 'Customer First',
    description: 'Your satisfaction drives everything we do.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: HiLightningBolt,
    title: 'Innovation',
    description: 'Leveraging technology to make shipping simpler and faster.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: HiCheckCircle,
    title: 'Integrity',
    description: 'Honest pricing, secure handling, and ethical practices.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: HiUsers,
    title: 'Global Reach',
    description: 'Connecting Nigeria to the world.',
    color: 'from-green-500 to-emerald-500',
  },
]

export function ValuesSection() {
  return (
    <SectionWrapper
      badge="Our Values"
      title="What We Stand For"
      description="Six core principles that guide every decision, every shipment, and every partnership."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {values.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full group cursor-default transition-all duration-300 hover:shadow-elevated">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-alt)] group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-6 w-6 text-tsg-500" />
                </div>
                <Text variant="h6" className="mb-2">{value.title}</Text>
                <Text variant="bodySm" className="text-[var(--text-secondary)]">{value.description}</Text>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
