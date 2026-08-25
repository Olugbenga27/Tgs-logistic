import { motion } from 'framer-motion'
import { HiGlobe } from 'react-icons/hi'
import { SectionWrapper } from './SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

const regions = [
  { name: 'USA', countries: 'All 50 states' },
  { name: 'UK', countries: 'England, Scotland, Wales, N. Ireland' },
  { name: 'Canada', countries: 'All provinces' },
  { name: 'Europe', countries: 'EU & Schengen countries' },
  { name: 'UAE', countries: 'Dubai, Abu Dhabi, all Emirates' },
  { name: 'West Africa', countries: 'Nigeria, Ghana, etc.' },
  { name: 'Asia', countries: 'China, Japan, India, Singapore, etc.' },
  { name: 'North America', countries: 'USA, Canada, Mexico' },
  { name: 'Worldwide', countries: 'Global coverage available' },
]

export function CountriesSection() {
  return (
    <SectionWrapper
      badge="Global Coverage"
      title="Serving 15+ Countries Worldwide"
      description="Strategic hubs across major global markets for seamless shipping."
    >
      {/* World Map with animated routes */}
      <div className="relative mb-10 aspect-[21/9] max-w-4xl mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-tsg-950 via-tsg-900 to-tsg-950">
        <LazyImage
          src={images.countries}
          alt="World map"
          className="absolute inset-0 opacity-40"
          wrapperClassName="absolute inset-0"
          rounded="none"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tsg-950/60 via-transparent to-tsg-950/30" />

        {/* Animated shipping routes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 350" preserveAspectRatio="none">
          <defs>
            <linearGradient id="route1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f26722" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#173a7a" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="route2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f26722" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="route3" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#173a7a" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f26722" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <motion.path
            d="M120 280 Q 250 100, 400 140 T 680 100"
            fill="none"
            stroke="url(#route1)"
            strokeWidth="2"
            strokeDasharray="8 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
          <motion.path
            d="M180 300 Q 350 180, 500 120 T 700 160"
            fill="none"
            stroke="url(#route2)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.3 }}
          />
          <motion.path
            d="M600 80 Q 450 200, 300 260 T 100 240"
            fill="none"
            stroke="url(#route3)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4, ease: 'easeInOut', delay: 0.6 }}
          />

          {[
            { cx: 120, cy: 280, color: '#f26722', delay: 0 },
            { cx: 400, cy: 140, color: '#173a7a', delay: 1.5 },
            { cx: 680, cy: 100, color: '#10b981', delay: 3 },
            { cx: 700, cy: 160, color: '#f26722', delay: 4 },
            { cx: 100, cy: 240, color: '#173a7a', delay: 5 },
          ].map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r="4"
              fill={dot.color}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: dot.delay }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.4, 1] }}
              style={{ transformOrigin: 'center' }}
            />
          ))}
        </svg>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-black/40 backdrop-blur-sm px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-white/90">Live network — 15+ countries connected</span>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {regions.map((region, i) => (
          <motion.div
            key={region.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="h-full hover:border-tsg-500/20 transition-colors">
              <CardContent className="p-5 flex items-center gap-4">
                <div>
                  <Text variant="bodySm" className="font-semibold">{region.name}</Text>
                  <Text variant="caption">{region.countries}</Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <Card variant="gradient-border" className="inline-block">
          <CardContent className="p-5 flex items-center gap-3">
            <HiGlobe className="h-5 w-5 text-tsg-500" />
            <Text variant="bodySm" className="text-[var(--text-secondary)]">
              New routes added monthly — contact us for destinations not listed
            </Text>
          </CardContent>
        </Card>
      </motion.div>
    </SectionWrapper>
  )
}
