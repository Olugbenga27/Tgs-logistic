import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Text } from '@/components/ui/Text'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

export function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-18">
      <LazyImage
        src={images.about.warehouse}
        alt="Modern logistics warehouse"
        className="absolute inset-0"
        wrapperClassName="absolute inset-0"
        rounded="none"
        objectFit="cover"
        priority
        overlay
        overlayColor="from-tsg-900/70 via-tsg-900/40 to-tsg-900/70"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-3xl"
        >
          <Badge variant="primary" size="lg" className="mb-6">About Us</Badge>
          <Text variant="h1" className="mb-4">
            Your Trusted{' '}
            <span className="bg-gradient-to-r from-tsg-400 to-gold-500 bg-clip-text text-transparent">
              Logistics Partner
            </span>
          </Text>
          <Text variant="subtitle" className="max-w-xl">
            T.S.G Grateful Logistics Ltd. — delivering excellence across Nigeria and the world with care, speed, and reliability.
          </Text>
        </motion.div>
      </div>
    </section>
  )
}
