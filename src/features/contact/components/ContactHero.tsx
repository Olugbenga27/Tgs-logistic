import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Text } from '@/components/ui/Text'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

export function ContactHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden pt-18">
      <LazyImage
        src={images.contact}
        alt="Logistics support team at work"
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
          <Badge variant="primary" size="lg" className="mb-6">Contact Us</Badge>
          <Text variant="h1" className="mb-4">
            Let&apos;s Talk About Your{' '}
            <span className="bg-gradient-to-r from-tsg-400 to-gold-500 bg-clip-text text-transparent">
              Shipping Needs
            </span>
          </Text>
          <Text variant="subtitle" className="max-w-xl">
            Reach out to our team for quotes, shipment inquiries, or logistics support — we&apos;re here to help, 24/7.
          </Text>
        </motion.div>
      </div>
    </section>
  )
}
