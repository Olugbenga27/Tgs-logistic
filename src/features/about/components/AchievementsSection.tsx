import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from '@/features/landing/components/SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { HiBadgeCheck, HiTrendingUp, HiStar, HiShieldCheck } from 'react-icons/hi'

const achievements = [
  {
    icon: HiStar,
    title: '50,000+ Shipments Delivered',
    org: 'Trusted by Thousands',
    description: 'From personal documents to commercial cargo, we have successfully delivered tens of thousands of shipments.',
  },
  {
    icon: HiBadgeCheck,
    title: '5,000+ Happy Customers',
    org: 'Growing Community',
    description: 'Thousands of satisfied individuals and businesses trust T.S.G for their shipping needs across Nigeria and beyond.',
  },
  {
    icon: HiTrendingUp,
    title: '15+ Countries Served',
    org: 'Global Coverage',
    description: 'Active shipping routes to over 15 countries across Africa, Europe, North America, Asia, and the Middle East.',
  },
  {
    icon: HiShieldCheck,
    title: '4 Major Courier Partners',
    org: 'DHL, FedEx, UPS & Aramex',
    description: 'Strategic partnerships with world-class courier companies ensure competitive rates and reliable delivery worldwide.',
  },
]

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const isDecimal = target % 1 !== 0

  if (!isInView) return <span ref={ref}>0{suffix}</span>

  const duration = 2000
  const start = performance.now()

  return (
    <span ref={ref}>
      <AnimatedCount target={target} start={start} duration={duration} isDecimal={isDecimal} />
      {suffix}
    </span>
  )
}

function AnimatedCount({ target, start, duration, isDecimal }: { target: number; start: number; duration: number; isDecimal: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)

  function update(currentTime: number) {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = eased * target
    if (ref.current) {
      ref.current.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toString()
    }
    if (progress < 1) requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
  return <span ref={ref}>0</span>
}

export function AchievementsSection() {
  return (
    <SectionWrapper
      badge="Our Achievements"
      title="Recognized for Excellence"
      description="Proud milestones that reflect our commitment to reliable, transparent, and customer-focused logistics."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Card className="h-full text-center group hover:border-tsg-500/20 transition-colors">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-500 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-7 w-7" />
                </div>
                <Text variant="h6" className="mb-1">{item.title}</Text>
                <Text variant="caption" className="text-tsg-500 font-medium mb-2">{item.org}</Text>
                <Text variant="caption" className="block">{item.description}</Text>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card variant="elevated">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-tsg-500"><CountUp target={50} suffix="K+" /></p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Shipments Delivered</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-tsg-500"><CountUp target={99.2} suffix="%" /></p>
            <p className="text-xs text-[var(--text-muted)] mt-1">On-Time Delivery</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-tsg-500"><CountUp target={3} /></p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Office Locations</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-tsg-500"><CountUp target={24} suffix="/7" /></p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Customer Support</p>
          </CardContent>
        </Card>
      </motion.div>
    </SectionWrapper>
  )
}
