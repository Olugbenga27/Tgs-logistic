import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from './SectionWrapper'

const stats = [
  { value: 15, suffix: '+', label: 'Countries Served', desc: 'Global coverage across continents' },
  { value: 50, suffix: 'K+', label: 'Shipments Delivered', desc: 'Successfully completed deliveries' },
  { value: 5, suffix: 'K+', label: 'Happy Clients', desc: 'Businesses trust T.S.G worldwide' },
  { value: 99.2, suffix: '%', label: 'On-Time Rate', desc: 'Industry-leading delivery reliability' },
  { value: 24, suffix: '/7', label: 'Support Available', desc: 'Round-the-clock customer service' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
      {isInView ? (
        <CountUp target={target} />
      ) : (
        <span>0</span>
      )}
      <span className="text-tsg-500">{suffix}</span>
    </span>
  )
}

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span ref={ref}>
      {isInView && <CountAnimation target={target} />}
      {!isInView && '0'}
    </span>
  )
}

function CountAnimation({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  const start = performance.now()
  const duration = 2000
  const isDecimal = target % 1 !== 0

  function update(currentTime: number) {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = eased * target

    if (ref.current) {
      ref.current.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toString()
    }

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)

  return <span ref={ref}>0</span>
}

export function StatisticsSection() {
  return (
    <SectionWrapper variant="alt">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{stat.label}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
