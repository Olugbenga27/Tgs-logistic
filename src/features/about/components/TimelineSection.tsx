import { motion } from 'framer-motion'
import { SectionWrapper } from '@/features/landing/components/SectionWrapper'

const milestones = [
  {
    year: '2018',
    title: 'Company Founded in Lagos',
    description: 'T.S.G Grateful Logistics Ltd. was founded in Lagos, Nigeria by Timilehin Olaoye with a vision to connect Nigeria to the world.',
  },
  {
    year: '2019',
    title: 'First International Route',
    description: 'Launched first international shipping route to the USA, opening doors for Nigerian businesses to reach global markets.',
  },
  {
    year: '2020',
    title: 'Expanded to UK & Canada',
    description: 'Added shipping routes to the United Kingdom and Canada, expanding our global footprint across three continents.',
  },
  {
    year: '2021',
    title: 'Personal Shopping Service',
    description: 'Introduced personal shopping and package consolidation services, allowing customers to shop from anywhere in the world.',
  },
  {
    year: '2022',
    title: 'New Office Locations',
    description: 'Opened new office locations in Ibadan and Ile-Ife to better serve our growing customer base across Nigeria.',
  },
  {
    year: '2023',
    title: '5,000 Happy Customers',
    description: 'Reached the milestone of 5,000+ satisfied customers, a testament to our commitment to reliable and transparent service.',
  },
  {
    year: '2024',
    title: 'Express Shipping Launch',
    description: 'Launched express shipping and door-to-door delivery services, making international shipping faster and more convenient.',
  },
  {
    year: '2025',
    title: 'Global Courier Partnerships',
    description: 'Formed strategic partnerships with DHL, FedEx, UPS, and Aramex to offer competitive rates and expanded coverage.',
  },
  {
    year: '2026',
    title: '15+ Countries Worldwide',
    description: 'Now serving customers in over 15 countries across Africa, Europe, North America, Asia, and the Middle East.',
  },
]

export function TimelineSection() {
  return (
    <SectionWrapper
      variant="alt"
      badge="Our Journey"
      title="Milestones That Define Us"
      description="A decade of growth, innovation, and unwavering commitment to logistics excellence."
    >
      <div className="relative max-w-3xl mx-auto">
        {/* Center line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-tsg-500/40 via-tsg-500/20 to-transparent" />

        <div className="space-y-12">
          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col sm:flex-row gap-6 sm:gap-0 ${
                i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 sm:left-1/2 flex items-center justify-center -translate-x-1/2 z-10">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-tsg-500 bg-[var(--surface)]">
                  <div className="h-2 w-2 rounded-full bg-tsg-500" />
                </div>
              </div>

              {/* Content */}
              <div className={`pl-14 sm:pl-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                <span className="inline-block mb-2 rounded-full bg-tsg-500/10 px-3 py-1 text-xs font-bold text-tsg-500">
                  {milestone.year}
                </span>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{milestone.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{milestone.description}</p>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
