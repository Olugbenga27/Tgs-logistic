import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  HiTruck,
  HiGlobe,
  HiHome,
  HiSwitchHorizontal,
  HiLightningBolt,
  HiUser,
  HiCube,
  HiOfficeBuilding,
  HiColorSwatch,
  HiShieldCheck,
  HiStar,
  HiArrowRight,
} from 'react-icons/hi'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

interface ServiceCard {
  icon: React.ComponentType<{ className?: string }>
  title: string
  tagline: string
  description: string
  features: string[]
  badge?: string
  gradient: string
  imageSrc: string
}

const serviceImg = (id: string) => images.services.find(s => s.id === id)?.src ?? ''

const services: ServiceCard[] = [
  {
    icon: HiTruck,
    title: 'Air Freight',
    tagline: 'Priority and express air freight',
    description: 'Fast-track air freight solutions for time-critical shipments. Daily flights to major hubs with real-time tracking and customs pre-clearance for urgent cargo.',
    features: ['Next-day delivery options', 'Real-time flight tracking', 'Customs pre-clearance', 'Temperature-controlled cargo'],
    gradient: 'from-blue-500 to-sky-500',
    imageSrc: serviceImg('air-cargo'),
  },
  {
    icon: HiGlobe,
    title: 'Sea Freight',
    tagline: 'FCL and LCL ocean shipping',
    description: 'Reliable ocean freight with full container load (FCL) and less-than-container load (LCL) options. Global port coverage with competitive transit times.',
    features: ['FCL & LCL shipping', 'Port-to-port & door-to-port', 'Cargo insurance included', 'Container consolidation'],
    gradient: 'from-cyan-500 to-teal-500',
    imageSrc: serviceImg('sea-freight'),
  },
  {
    icon: HiHome,
    title: 'Door Delivery',
    tagline: 'Last-mile delivery to your door',
    description: 'Convenient last-mile delivery to residential and commercial addresses. Real-time driver tracking with delivery confirmation and flexible scheduling.',
    features: ['Same-day & next-day options', 'Live driver tracking', 'Delivery confirmation', 'Flexible scheduling'],
    gradient: 'from-emerald-500 to-green-500',
    imageSrc: serviceImg('door-delivery'),
  },
  {
    icon: HiSwitchHorizontal,
    title: 'International Shipping',
    tagline: 'Cross-border shipping',
    description: 'End-to-end international shipping with integrated customs brokerage and duty calculation. Seamless multi-modal transport to over 200 countries.',
    features: ['200+ countries served', 'Automated customs clearance', 'Duty & tax calculator', 'Multi-modal coordination'],
    gradient: 'from-purple-500 to-indigo-500',
    imageSrc: serviceImg('international-shipping'),
  },
  {
    icon: HiLightningBolt,
    title: 'Express Shipping',
    tagline: 'Urgent delivery',
    description: 'Premium express service for shipments that simply cannot wait. Guaranteed delivery windows with priority handling and round-the-clock support.',
    features: ['Guaranteed delivery times', 'Priority handling', '24/7 dedicated support', 'Real-time SMS alerts'],
    badge: 'Popular',
    gradient: 'from-amber-500 to-orange-500',
    imageSrc: serviceImg('express-shipping'),
  },
  {
    icon: HiUser,
    title: 'Personal Shopping',
    tagline: 'Shop on your behalf globally',
    description: 'Personal shopping assistance for international and local purchases. We handle procurement, quality checks, and consolidated shipping to your doorstep.',
    features: ['Dedicated personal shopper', 'Quality inspection reports', 'Consolidated shipping', 'Returns & exchange help'],
    gradient: 'from-rose-500 to-pink-500',
    imageSrc: serviceImg('personal-shopping'),
  },
  {
    icon: HiCube,
    title: 'Food/Grocery Shipping',
    tagline: 'Food items, soups, spices',
    description: 'Specialized shipping for food items, soups, spices, and perishable goods. Temperature-controlled handling with proper packaging to preserve freshness.',
    features: ['Cold chain management', 'Food-grade packaging', 'Temperature monitoring', 'Expedited customs clearance'],
    gradient: 'from-red-500 to-rose-500',
    imageSrc: serviceImg('food-shipping'),
  },
  {
    icon: HiOfficeBuilding,
    title: 'Business Logistics',
    tagline: 'B2B bulk shipping',
    description: 'Comprehensive B2B logistics solutions for enterprises. Bulk shipping rates, vendor management, and integrated supply chain consulting for growing businesses.',
    features: ['Volume-based pricing', 'Vendor management portal', 'Supply chain consulting', 'API integration ready'],
    gradient: 'from-slate-500 to-gray-500',
    imageSrc: serviceImg('business-logistics'),
  },
  {
    icon: HiColorSwatch,
    title: 'Warehousing',
    tagline: 'Storage and fulfillment',
    description: 'Secure warehousing with real-time inventory visibility, pick-and-pack services, and a distributed fulfillment network to serve your customers faster.',
    features: ['Real-time inventory dashboard', 'Pick & pack services', 'Nationwide fulfillment', 'Cross-docking available'],
    gradient: 'from-tsg-500 to-tsg-600',
    imageSrc: serviceImg('warehousing'),
  },
  {
    icon: HiShieldCheck,
    title: 'Packaging',
    tagline: 'Professional packing',
    description: 'Premium packaging solutions for fragile, oversized, and high-value items. Certified packing materials with tamper-proof sealing for maximum protection.',
    features: ['Custom crating service', 'Fragile-item specialists', 'Eco-friendly materials', 'Tamper-evident sealing'],
    gradient: 'from-teal-500 to-emerald-500',
    imageSrc: serviceImg('packaging'),
  },
  {
    icon: HiStar,
    title: 'Hair Extensions',
    tagline: 'Specialized hair shipping',
    description: 'Expert shipping for hair extensions, wigs, and beauty products. Climate-controlled handling with discreet packaging to maintain product quality.',
    features: ['Climate-controlled storage', 'Discreet packaging', 'Bulk extension shipping', 'Express options available'],
    badge: 'Popular',
    gradient: 'from-pink-500 to-purple-500',
    imageSrc: serviceImg('hair-extensions'),
  },
  {
    icon: HiColorSwatch,
    title: 'Jewelry',
    tagline: 'Secure jewelry delivery',
    description: 'Secure and insured delivery for fine jewelry, watches, and precious items. Tamper-evident packaging with GPS-tracked transport and signature release.',
    features: ['Full Insurance coverage', 'Tamper-evident packaging', 'GPS-tracked transport', 'Signature-on-release'],
    gradient: 'from-yellow-500 to-amber-500',
    imageSrc: serviceImg('jewelry'),
  },
  {
    icon: HiGlobe,
    title: 'Clothing Shipping',
    tagline: 'Fashion and apparel logistics',
    description: 'Tailored shipping for fashion and apparel businesses. Garment-on-hanger options, bulk clothing transport, and retail-ready delivery services.',
    features: ['Garment-on-hanger option', 'Bulk apparel transport', 'Retail-ready delivery', 'Seasonal storage'],
    gradient: 'from-indigo-500 to-blue-500',
    imageSrc: serviceImg('clothing-shipping'),
  },
]

export function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: ServiceCard; index: number }) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Card className="h-full relative overflow-hidden transition-all duration-300 hover:shadow-elevated hover:border-tsg-500/20">
        {/* Service image header */}
        <div className="relative h-32 overflow-hidden">
          <LazyImage
            src={service.imageSrc}
            alt={service.title}
            className="absolute inset-0"
            wrapperClassName="absolute inset-0"
            rounded="none"
            objectFit="cover"
            overlay
            overlayColor="from-tsg-900/50 via-tsg-900/20 to-tsg-900/50"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} mix-blend-overlay opacity-60`} />
          <div className="absolute bottom-3 left-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        <CardContent className="p-6 flex flex-col h-full relative">

          {/* Badge */}
          {service.badge && (
            <Badge variant="warning" size="sm" className="absolute top-5 right-5">
              {service.badge}
            </Badge>
          )}

          {/* Title & tagline */}
          <Text variant="h6" className="mb-0.5">{service.title}</Text>
          <Text variant="caption" className="text-tsg-500 font-medium mb-3">{service.tagline}</Text>

          {/* Description */}
          <Text variant="bodySm" className="text-[var(--text-secondary)] mb-4 flex-1">
            {service.description}
          </Text>

          {/* Features list */}
          <ul className="mb-5 space-y-1.5">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span className="h-1 w-1 rounded-full bg-tsg-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/book-shipment"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-tsg-500 hover:text-tsg-400 transition-colors group/link"
          >
            Get a Quote
            <HiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
