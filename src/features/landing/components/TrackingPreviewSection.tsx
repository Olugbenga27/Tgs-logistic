import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiSearch, HiCheckCircle, HiTruck } from 'react-icons/hi'
import { SectionWrapper } from './SectionWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

const mockTracking = [
  { location: 'New York Sort Facility', time: '08:15 AM', status: 'Picked Up', done: true },
  { location: 'New York Sort Facility', time: '10:30 AM', status: 'Processed', done: true },
  { location: 'En Route to Chicago Hub', time: '03:00 AM', status: 'In Transit', done: true },
  { location: 'Chicago Distribution Center', time: 'Est. Aug 2', status: 'Out for Delivery', done: false },
]

export function TrackingPreviewSection() {
  const [trackId, setTrackId] = useState('')

  return (
    <SectionWrapper
      badge="Live Tracking"
      title="Real-Time Shipment Visibility"
      description="Track every movement of your cargo with GPS-enabled precision and proactive alerts."
      variant="alt"
    >
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Tracking input */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Enter tracking number..."
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                  />
                </div>
                <Button size="icon">
                  <HiSearch className="h-4 w-4" />
                </Button>
              </div>

              {/* Mock tracking result */}
              <motion.div
                initial={false}
                animate={{ opacity: 1 }}
                className="space-y-0"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Tracking #</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">TSG-{trackId.padStart(4, '0') || '----'}</p>
                  </div>
                  <Badge variant="info" dot>In Transit</Badge>
                </div>

                {mockTracking.map((event, i) => (
                  <div key={i} className="relative flex gap-3 pb-5 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          event.done
                            ? 'bg-tsg-500 text-white'
                            : 'border-2 border-dashed border-[var(--border-default)]'
                        }`}
                      >
                        {event.done ? (
                          <HiCheckCircle className="h-3.5 w-3.5" />
                        ) : (
                          <HiTruck className="h-3 w-3 text-[var(--text-muted)]" />
                        )}
                      </div>
                      {i < mockTracking.length - 1 && (
                        <div className="mt-1 h-full w-px bg-[var(--border-subtle)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${event.done ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                        {event.location}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[var(--text-muted)]">{event.time}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">·</span>
                        <span className={`text-xs ${event.done ? 'text-tsg-500' : 'text-[var(--text-muted)]'}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Dashboard Image */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden group">
            <div className="relative aspect-[16/9]">
              <LazyImage
                src={images.tracking}
                alt="Real-time tracking dashboard"
                className="absolute inset-0"
                wrapperClassName="absolute inset-0"
                rounded="none"
                objectFit="cover"
                overlay
                overlayColor="from-tsg-900/30 via-tsg-900/10 to-tsg-900/40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-10 text-center px-6 transition-transform duration-300 group-hover:scale-105">
                  <Badge variant="neutral" size="lg">
                    <HiTruck className="h-4 w-4" />
                    Live Map View — Available in Dashboard
                  </Badge>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 rounded-lg bg-black/40 backdrop-blur-sm px-2.5 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-white/80">Live</span>
                </div>
                <div className="rounded-lg bg-black/40 backdrop-blur-sm px-2.5 py-1.5">
                  <span className="text-[10px] text-white/80">GPS-enabled tracking</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  )
}
