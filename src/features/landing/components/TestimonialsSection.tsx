import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { SectionWrapper } from './SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechCorp International',
    content: 'T.S.G transformed our supply chain. Their international shipping solutions cut our delivery times by 40% and their tracking system gives us complete visibility. A truly world-class logistics partner.',
    rating: 5,
    avatar: images.testimonials[0].src,
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director, GlobalLog Inc.',
    content: 'We ship over 200 packages a month with T.S.G and they\'ve never missed a delivery window. Their customs brokerage expertise has saved us thousands in duties and fees. Absolutely indispensable.',
    rating: 5,
    avatar: images.testimonials[1].src,
  },
  {
    name: 'Emily Okafor',
    role: 'Supply Chain Manager, AfriTrade Ventures',
    content: 'The personal shopping and consolidation service is a game-changer for African businesses. T.S.G handles everything from supplier payments to final delivery. I recommend them to all my colleagues.',
    rating: 5,
    avatar: images.testimonials[2].src,
  },
  {
    name: 'James Wilson',
    role: 'Logistics Coordinator, FastShip Logistics',
    content: 'Their warehousing and distribution network across Nigeria is unmatched. We reduced our warehouse costs by 30% after switching to T.S.G. The real-time inventory dashboard is excellent.',
    rating: 5,
    avatar: images.testimonials[3].src,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))
  }

  const t = testimonials[current]

  return (
    <SectionWrapper
      badge="Client Stories"
      title="What Our Clients Say"
      description="Hear from our clients about their experience with T.S.G Grateful Logistics."
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card variant="elevated" className="text-center">
                <CardContent className="p-8 sm:p-12">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, r) => (
                      <HiStar key={r} className="h-5 w-5 text-gold-500 fill-gold-500" />
                    ))}
                  </div>

                  <Text variant="h5" className="mb-6 italic leading-relaxed text-[var(--text-secondary)] font-normal">
                    &ldquo;{t.content}&rdquo;
                  </Text>

                  <div className="flex justify-center mb-4">
                    <LazyImage
                      src={t.avatar}
                      alt={t.name}
                      className="h-14 w-14"
                      wrapperClassName="h-14 w-14 rounded-full ring-2 ring-tsg-500/20"
                      rounded="full"
                      objectFit="cover"
                    />
                  </div>

                  <Text variant="bodySm" className="font-semibold">{t.name}</Text>
                  <Text variant="caption">{t.role}</Text>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] transition-colors hover:border-tsg-500/30 hover:text-tsg-500"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-tsg-500' : 'w-2 bg-[var(--border-default)]'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] transition-colors hover:border-tsg-500/30 hover:text-tsg-500"
              aria-label="Next testimonial"
            >
              <HiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
