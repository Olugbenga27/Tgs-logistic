import { motion } from 'framer-motion'
import { Text } from '@/components/ui/Text'
import { Badge } from '@/components/ui/Badge'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

export function StorySection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="warning" size="md" className="mb-4">Our Story</Badge>
            <Text variant="h3" className="mb-6">
              From Lagos to the World
            </Text>

            <div className="space-y-4 text-[var(--text-secondary)]">
              <Text variant="body">
                T.S.G Grateful Logistics Ltd. was founded with a mission to simplify global shipping for individuals and businesses. What started as a vision to connect Nigeria to the world has grown into a trusted logistics company serving 15+ countries across Africa, Europe, North America, Asia, and the Middle East.
              </Text>
              <Text variant="body">
                Our name — T.S.G Grateful — reflects our core philosophy. We are grateful for every client, every package, and every opportunity to serve. This gratitude drives our commitment to excellence in every shipment we handle.
              </Text>
              <Text variant="body">
                Today, under the leadership of CEO Timilehin Olaoye, we deliver thousands of shipments annually — from personal documents and clothing to bulk commercial cargo — with a focus on reliability, transparency, and customer satisfaction.
              </Text>
            </div>

            <div className="mt-8 flex gap-8">
              <div>
                <Text variant="h4" className="text-tsg-500">2018</Text>
                <Text variant="caption">Founded in Lagos</Text>
              </div>
              <div>
                <Text variant="h4" className="text-tsg-500">5K+</Text>
                <Text variant="caption">Happy Customers</Text>
              </div>
              <div>
                <Text variant="h4" className="text-tsg-500">15+</Text>
                <Text variant="caption">Countries Served</Text>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated"
          >
            <LazyImage
              src={images.about.team}
              alt="T.S.G logistics team"
              className="absolute inset-0"
              wrapperClassName="absolute inset-0"
              rounded="none"
              objectFit="cover"
              overlay
              overlayColor="from-tsg-900/20 via-transparent to-tsg-900/10"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge variant="primary" size="md">Our dedicated team</Badge>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
