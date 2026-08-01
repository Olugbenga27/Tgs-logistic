import { motion } from 'framer-motion'
import { SectionWrapper } from '@/features/landing/components/SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

export function MissionVisionSection() {
  return (
    <SectionWrapper variant="alt">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full group overflow-hidden hover:border-tsg-500/20 transition-colors">
            <div className="relative h-48 overflow-hidden">
              <LazyImage
                src={images.about.cargo}
                alt="Cargo operations"
                className="absolute inset-0"
                wrapperClassName="absolute inset-0"
                rounded="none"
                objectFit="cover"
                overlay
                overlayColor="from-tsg-900/60 to-tsg-900/20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm px-4 py-2">
                  <Text variant="h5" className="text-white font-bold">Our Mission</Text>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <Text variant="body" className="text-[var(--text-secondary)] leading-relaxed">
                To provide accessible, reliable, and efficient logistics solutions that connect businesses and individuals to global opportunities.
              </Text>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Card className="h-full group overflow-hidden hover:border-tsg-500/20 transition-colors">
            <div className="relative h-48 overflow-hidden">
              <LazyImage
                src={images.about.containers}
                alt="Shipping containers"
                className="absolute inset-0"
                wrapperClassName="absolute inset-0"
                rounded="none"
                objectFit="cover"
                overlay
                overlayColor="from-tsg-900/60 to-tsg-900/20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm px-4 py-2">
                  <Text variant="h5" className="text-white font-bold">Our Vision</Text>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <Text variant="body" className="text-[var(--text-secondary)] leading-relaxed">
                To be Nigeria's most trusted logistics partner — bridging communities worldwide with seamless shipping services.
              </Text>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
