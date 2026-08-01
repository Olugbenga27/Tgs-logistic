import { motion } from 'framer-motion'
import { SectionWrapper } from '@/features/landing/components/SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { LazyImage } from '@/components/ui/LazyImage'
import { HiMail } from 'react-icons/hi'
import { FaLinkedinIn } from 'react-icons/fa'
import { images } from '@/lib/images'

const team = [
  {
    name: 'Timilehin Olaoye',
    role: 'CEO & Founder',
    bio: 'Building T.S.G from the ground up with a vision to connect Nigeria to the world. Over 8 years of logistics and shipping industry experience.',
    gradient: 'from-tsg-500 to-tsg-600',
    avatar: images.testimonials[3].src,
  },
  {
    name: 'Amina Bello',
    role: 'Operations Manager',
    bio: 'Ensures smooth day-to-day operations across all T.S.G locations, maintaining efficiency and service quality standards.',
    gradient: 'from-gold-500 to-gold-600',
    avatar: images.testimonials[1].src,
  },
  {
    name: 'Chukwudi Okonkwo',
    role: 'Head of International Shipping',
    bio: 'Oversees all international shipping routes and partnerships. Ensures seamless cross-border logistics for every client.',
    gradient: 'from-emerald-500 to-teal-500',
    avatar: images.testimonials[2].src,
  },
  {
    name: 'Funmi Adeyemi',
    role: 'Customer Relations Lead',
    bio: 'Dedicated to delivering exceptional customer experiences. Ensures every client feels valued and supported.',
    gradient: 'from-purple-500 to-pink-500',
    avatar: images.testimonials[0].src,
  },
  {
    name: 'Ibrahim Suleiman',
    role: 'Logistics Coordinator',
    bio: 'Coordinates pickup, warehousing, and delivery operations to ensure timely and accurate shipment processing.',
    gradient: 'from-blue-500 to-cyan-500',
    avatar: images.testimonials[3].src,
  },
  {
    name: 'Ngozi Eze',
    role: 'Finance & Admin Director',
    bio: 'Manages financial operations and administrative functions. Ensures transparent pricing and efficient business processes.',
    gradient: 'from-orange-500 to-rose-500',
    avatar: images.testimonials[1].src,
  },
]

export function TeamSection() {
  return (
    <SectionWrapper
      badge="Our Team"
      title="Leadership That Moves the World"
      description="A diverse team of logistics experts, engineers, and innovators united by a shared purpose."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full group transition-all duration-300 hover:shadow-elevated">
              <CardContent className="p-6">
                <div className="mb-5 h-16 w-16 overflow-hidden rounded-2xl shadow-lg ring-2 ring-tsg-500/10 transition-transform duration-300 group-hover:scale-105">
                  <LazyImage
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full"
                    wrapperClassName="h-full w-full"
                    rounded="none"
                    objectFit="cover"
                  />
                </div>

                <Text variant="h6" className="mb-1">{member.name}</Text>
                <Text variant="bodySm" className="text-tsg-500 font-medium mb-3">{member.role}</Text>
                <Text variant="caption" className="block mb-4">{member.bio}</Text>

                <div className="flex gap-2 pt-2 border-t border-[var(--border-subtle)]">
                  <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-alt)] text-[var(--text-muted)] hover:bg-tsg-500/10 hover:text-tsg-500 transition-colors" aria-label={`${member.name} email`}>
                    <HiMail className="h-4 w-4" />
                  </a>
                  <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-alt)] text-[var(--text-muted)] hover:bg-tsg-500/10 hover:text-tsg-500 transition-colors" aria-label={`${member.name} LinkedIn`}>
                    <FaLinkedinIn className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
