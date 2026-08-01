import { motion } from 'framer-motion'
import {
  HiTruck,
  HiGlobe,
  HiShieldCheck,
  HiClock,
  HiChartBar,
  HiStar,
  HiCube,
  HiAnnotation,
} from 'react-icons/hi'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { LazyImage } from '@/components/ui/LazyImage'
import { Badge } from '@/components/ui/Badge'
import { SectionWrapper } from './SectionWrapper'
import { images } from '@/lib/images'

const services = [
  {
    icon: HiTruck,
    title: 'Freight Shipping',
    description: 'Full truckload, less-than-truckload, and intermodal freight solutions across all regions.',
    tags: ['FTL', 'LTL', 'Intermodal'],
  },
  {
    icon: HiGlobe,
    title: 'Global Network',
    description: 'International shipping with customs brokerage and trade compliance expertise.',
    tags: ['International', 'Customs', 'Trade'],
  },
  {
    icon: HiShieldCheck,
    title: 'Secure Handling',
    description: 'End-to-end cargo insurance, tamper-proof sealing, and chain-of-custody tracking.',
    tags: ['Insurance', 'Security', 'Compliance'],
  },
  {
    icon: HiClock,
    title: 'Express Delivery',
    description: 'Time-critical shipments delivered within guaranteed windows, 365 days a year.',
    tags: ['Urgent', 'Same-Day', 'Next-Day'],
  },
  {
    icon: HiCube,
    title: 'Warehousing',
    description: 'Strategic warehousing with real-time inventory management and pick-and-pack services.',
    tags: ['Storage', 'Fulfillment', 'Inventory'],
  },
  {
    icon: HiChartBar,
    title: 'Supply Chain Analytics',
    description: 'Data-driven insights with cost optimization, route planning, and performance dashboards.',
    tags: ['Analytics', 'Optimization', 'Reporting'],
  },
  {
    icon: HiAnnotation,
    title: 'Customs Brokerage',
    description: 'Expert customs clearance, documentation, and regulatory compliance management.',
    tags: ['Clearance', 'Documentation', 'Regulatory'],
  },
  {
    icon: HiStar,
    title: 'Premium Support',
    description: 'Dedicated account managers and 24/7 multilingual support team.',
    tags: ['24/7', 'Dedicated', 'Multilingual'],
  },
]

const serviceShowcase = [
  { id: 'international-shipping', title: 'International Shipping' },
  { id: 'air-cargo', title: 'Air Cargo' },
  { id: 'sea-freight', title: 'Sea Freight' },
  { id: 'door-delivery', title: 'Door Delivery' },
  { id: 'express-shipping', title: 'Express Shipping' },
  { id: 'personal-shopping', title: 'Personal Shopping' },
  { id: 'food-shipping', title: 'Food Shipping' },
  { id: 'business-logistics', title: 'Business Logistics' },
  { id: 'warehousing', title: 'Warehousing' },
  { id: 'packaging', title: 'Packaging' },
]

export function ServicesSection() {
  return (
    <SectionWrapper
      badge="Our Services"
      title="Enterprise-Grade Logistics Solutions"
      description="Comprehensive shipping and supply chain services backed by real-time technology."
    >
      {/* Service Image Showcase */}
      <div className="mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {serviceShowcase.map((s, i) => {
          const img = images.services.find(img => img.id === s.id)
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.04 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
            >
              <LazyImage
                src={img?.src ?? ''}
                alt={s.title}
                className="absolute inset-0"
                wrapperClassName="absolute inset-0"
                rounded="xl"
                objectFit="cover"
                overlay
                overlayColor="from-tsg-900/70 via-tsg-900/30 to-tsg-900/70"
              />
              <div className="absolute inset-0 flex items-end p-3 transition-transform duration-300 group-hover:scale-105">
                <div>
                  <p className="text-xs font-semibold text-white drop-shadow-sm">{s.title}</p>
                  <Badge variant="neutral" size="sm" className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More
                  </Badge>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full group cursor-default transition-shadow duration-300 hover:shadow-elevated">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-tsg-500/10 text-tsg-500 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-5.5 w-5.5" />
                </div>
                <Text variant="h6" className="mb-2">{service.title}</Text>
                <Text variant="bodySm" className="text-[var(--text-secondary)] flex-1 mb-4">
                  {service.description}
                </Text>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[var(--surface-alt)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
