import { motion } from 'framer-motion'
import { SectionWrapper } from './SectionWrapper'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

const partners = [
  { name: 'DHL', src: images.partners[0].src },
  { name: 'FedEx', src: images.partners[1].src },
  { name: 'UPS', src: images.partners[2].src },
  { name: 'Aramex', src: images.partners[3].src },
]

export function PartnersSection() {
  return (
    <SectionWrapper
      badge="Courier Partners"
      title="Our Courier Partners"
      description="We partner with the world's leading courier companies to deliver your packages reliably."
      variant="alt"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            className="group flex h-24 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-6 transition-all duration-200 hover:border-tsg-500/20 hover:shadow-soft"
          >
            <LazyImage
              src={partner.src}
              alt={`${partner.name} logo`}
              objectFit="contain"
              rounded="md"
              priority
              className="transition-all duration-300 group-hover:scale-105"
              wrapperClassName="h-10 w-full"
            />
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-6 text-center text-xs text-[var(--text-muted)]"
      >
        All major carriers — one platform.
      </motion.p>
    </SectionWrapper>
  )
}
