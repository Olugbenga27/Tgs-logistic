import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiPlay } from 'react-icons/hi'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

const stats = [
  { label: 'Countries Served', value: '15+' },
  { label: 'Shipments Delivered', value: '50K+' },
  { label: 'Happy Clients', value: '5K+' },
  { label: 'On-Time Rate', value: '99.2%' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-18">
      {/* Hero background image */}
      <LazyImage
        src={images.hero.main}
        alt="Global logistics operations"
        className="absolute inset-0"
        wrapperClassName="absolute inset-0"
        aspectRatio=""
        rounded="none"
        objectFit="cover"
        priority
        overlay
        overlayColor="from-tsg-900/70 via-tsg-900/40 to-tsg-900/70"
      />

      {/* Gradient fade at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--surface)] to-transparent z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32"
      >
        <motion.div variants={childVariants} className="max-w-3xl">
          <Badge variant="warning" size="lg" className="mb-6">
            Trusted by 5,000+ businesses worldwide
          </Badge>
        </motion.div>

        <motion.h1
          variants={childVariants}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.05]"
        >
          Global Shipping,{' '}
          <span className="bg-gradient-to-r from-tsg-400 via-tsg-500 to-gold-500 bg-clip-text text-transparent">
            Delivered with Care
          </span>
        </motion.h1>

        <motion.p
          variants={childVariants}
          className="mt-6 text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed"
        >
          T.S.G Grateful Logistics Ltd. provides end-to-end shipping solutions powered by real-time intelligence. From freight to express — we move your world with care.
        </motion.p>

        <motion.div variants={childVariants} className="mt-10 flex flex-wrap gap-4">
          <Button variant="gold" size="xl" asChild>
            <Link to="/book-shipment">
              Ship Now
              <HiArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link to="/track">Track Shipment</Link>
          </Button>
          <Button variant="ghost" size="xl" className="gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default)]">
              <HiPlay className="h-3.5 w-3.5 ml-0.5" />
            </span>
            Get a Quote
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={childVariants}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileInView={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
