import { motion } from 'framer-motion'
import { HiClipboardList, HiTruck, HiCheckCircle, HiChartBar } from 'react-icons/hi'
import { SectionWrapper } from './SectionWrapper'

const steps = [
  {
    icon: HiClipboardList,
    title: 'Book Your Shipment',
    description: 'Submit your shipment details online or via our API. Get instant quotes and choose the best service level for your needs.',
    number: '01',
  },
  {
    icon: HiTruck,
    title: 'We Handle the Logistics',
    description: 'Our network picks up, transports, and manages your cargo with real-time tracking and proactive notifications.',
    number: '02',
  },
  {
    icon: HiCheckCircle,
    title: 'Track in Real Time',
    description: 'Monitor your shipment every step of the way with GPS tracking, milestone alerts, and predictive ETAs.',
    number: '03',
  },
  {
    icon: HiChartBar,
    title: 'Delivered & Optimized',
    description: 'Receive your shipment on time with full delivery confirmation, analytics, and performance reports.',
    number: '04',
  },
]

export function HowItWorksSection() {
  return (
    <SectionWrapper
      badge="How It Works"
      title="Four Steps to Global Shipping"
      description="From booking to delivery — a seamless logistics experience powered by technology."
      variant="alt"
    >
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div className="absolute top-24 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-0.5 hidden lg:block">
          <div className="h-full w-full bg-gradient-to-r from-tsg-500/20 via-tsg-500/40 to-tsg-500/20" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center lg:text-left"
            >
              {/* Step number */}
              <div className="relative mx-auto lg:mx-0 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-tsg-500 to-tsg-600 shadow-lg shadow-tsg-500/20">
                <step.icon className="h-7 w-7 text-white" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-white shadow-sm">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
