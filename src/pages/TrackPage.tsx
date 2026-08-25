import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiSearch,
  HiCheckCircle,
  HiTruck,
  HiLocationMarker,
  HiCube,
  HiCalendar,
  HiGlobe,
  HiClock,
  HiShieldCheck,
  HiArrowRight,
} from 'react-icons/hi'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { LazyImage } from '@/components/ui/LazyImage'
import { images } from '@/lib/images'

interface TrackingEvent {
  location: string
  timestamp: string
  status: string
  done: boolean
}

interface PackageInfo {
  weight: string
  dimensions: string
  contents: string
  origin: string
  destination: string
  courier: string
  courierLogo: string
  estimatedDelivery: string
  trackingNumber: string
  serviceType: string
}

type OverallStatus = 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception'

const mockShipments: Record<string, { events: TrackingEvent[]; pkg: PackageInfo; status: OverallStatus; statusText: string }> = {
  'TSG-001': {
    status: 'in_transit',
    statusText: 'In Transit',
    pkg: {
      weight: '5.2 kg',
      dimensions: '35 × 25 × 15 cm',
      contents: 'Clothing & Accessories',
      origin: 'Lagos, Nigeria',
      destination: 'New York, USA',
      courier: 'DHL',
      courierLogo: 'DHL',
      estimatedDelivery: 'Aug 5, 2026',
      trackingNumber: 'TSG-001',
      serviceType: 'Express International',
    },
    events: [
      { location: 'Lagos — Pickup Complete', timestamp: 'Jul 28, 2026 — 09:15 AM', status: 'Picked Up', done: true },
      { location: 'Lagos Sort Facility', timestamp: 'Jul 28, 2026 — 02:30 PM', status: 'Processed', done: true },
      { location: 'Departed — Murtala Muhammed Airport', timestamp: 'Jul 29, 2026 — 11:45 PM', status: 'Departed', done: true },
      { location: 'Arrived — JFK Airport, New York', timestamp: 'Jul 30, 2026 — 06:20 AM', status: 'Arrived', done: true },
      { location: 'Customs Clearance — New York', timestamp: 'Jul 30, 2026 — 10:00 AM', status: 'Customs Clearance', done: false },
      { location: 'New York Distribution Center', timestamp: 'Est. Aug 4, 2026', status: 'Out for Delivery', done: false },
    ],
  },
  'TSG-002': {
    status: 'delivered',
    statusText: 'Delivered',
    pkg: {
      weight: '2.8 kg',
      dimensions: '28 × 20 × 12 cm',
      contents: 'Documents & Electronics',
      origin: 'Ibadan, Nigeria',
      destination: 'London, UK',
      courier: 'FedEx',
      courierLogo: 'FedEx',
      estimatedDelivery: 'Delivered Jul 25, 2026',
      trackingNumber: 'TSG-002',
      serviceType: 'Priority International',
    },
    events: [
      { location: 'Ibadan — Pickup Complete', timestamp: 'Jul 20, 2026 — 10:30 AM', status: 'Picked Up', done: true },
      { location: 'Ibadan Sort Facility', timestamp: 'Jul 20, 2026 — 03:00 PM', status: 'Processed', done: true },
      { location: 'Departed — Lagos Airport', timestamp: 'Jul 21, 2026 — 02:15 AM', status: 'Departed', done: true },
      { location: 'Transit — Amsterdam Hub', timestamp: 'Jul 21, 2026 — 02:30 PM', status: 'In Transit', done: true },
      { location: 'Arrived — Heathrow Airport, London', timestamp: 'Jul 22, 2026 — 08:45 AM', status: 'Arrived', done: true },
      { location: 'Customs Cleared — London', timestamp: 'Jul 22, 2026 — 01:00 PM', status: 'Customs Cleared', done: true },
      { location: 'Out for Delivery — London', timestamp: 'Jul 25, 2026 — 08:00 AM', status: 'Out for Delivery', done: true },
      { location: 'Delivered — London', timestamp: 'Jul 25, 2026 — 02:30 PM', status: 'Delivered', done: true },
    ],
  },
  'TSG-003': {
    status: 'pending',
    statusText: 'Processing',
    pkg: {
      weight: '10.5 kg',
      dimensions: '45 × 35 × 25 cm',
      contents: 'Food Items & Spices',
      origin: 'Ile-Ife, Nigeria',
      destination: 'Dubai, UAE',
      courier: 'Aramex',
      courierLogo: 'Aramex',
      estimatedDelivery: 'Aug 8, 2026',
      trackingNumber: 'TSG-003',
      serviceType: 'Economy International',
    },
    events: [
      { location: 'Ile-Ife — Pickup Scheduled', timestamp: 'Jul 31, 2026 — 09:00 AM', status: 'Pickup Scheduled', done: false },
      { location: 'Ile-Ife to Lagos — In Transit', timestamp: 'Est. Aug 1, 2026', status: 'In Transit', done: false },
      { location: 'Lagos Sort Facility', timestamp: 'Est. Aug 2, 2026', status: 'Processing', done: false },
      { location: 'Departed — Lagos to Dubai', timestamp: 'Est. Aug 3, 2026', status: 'Departed', done: false },
      { location: 'Delivered — Dubai, UAE', timestamp: 'Est. Aug 8, 2026', status: 'Delivered', done: false },
    ],
  },
}

const statusConfig: Record<OverallStatus, { color: string; bg: string; label: string; icon: React.ElementType }> = {
  pending: { color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-500/20', label: 'Processing', icon: HiClock },
  in_transit: { color: 'text-tsg-500', bg: 'bg-tsg-500/10', label: 'In Transit', icon: HiTruck },
  out_for_delivery: { color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-500/20', label: 'Out for Delivery', icon: HiLocationMarker },
  delivered: { color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/20', label: 'Delivered', icon: HiCheckCircle },
  exception: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-500/20', label: 'Exception', icon: HiShieldCheck },
}

function StatusPulse({ status }: { status: OverallStatus }) {
  const cfg = statusConfig[status]
  const Icon = cfg.icon

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2.5 rounded-full px-4 py-2 ${cfg.bg}`}
    >
      <span className="relative flex h-3 w-3">
        <motion.span
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute inset-0 rounded-full ${cfg.color.replace('text-', 'bg-')}`}
        />
        <span className={`relative inline-block h-3 w-3 rounded-full ${cfg.color.replace('text-', 'bg-')}`} />
      </span>
      <span className={`text-sm font-semibold ${cfg.color}`}>
        <Icon className="mr-1.5 inline-block h-4 w-4 -mt-0.5" />
        {cfg.label}
      </span>
    </motion.div>
  )
}

function TimelineEvent({ event, index, isLast }: { event: TrackingEvent; index: number; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.12 + 0.15, type: 'spring', bounce: 0.4 }}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            event.done
              ? 'bg-tsg-500 text-white shadow-md shadow-tsg-500/20'
              : 'border-2 border-dashed border-[var(--border-default)] bg-[var(--surface)]'
          }`}
        >
          {event.done ? (
            <HiCheckCircle className="h-4 w-4" />
          ) : (
            <HiClock className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          )}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: index * 0.12 + 0.2, duration: 0.3 }}
            className="mt-1 h-full w-px origin-top bg-gradient-to-b from-tsg-500/30 to-[var(--border-subtle)]"
          />
        )}
      </div>

      <div className="flex-1 min-w-0 pb-8 last:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12 + 0.1, duration: 0.3 }}
        >
          <p className={`text-sm font-semibold ${event.done ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
            {event.location}
          </p>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">{event.timestamp}</p>
          <span className={`mt-1.5 inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
            event.done
              ? 'bg-[var(--surface-alt)] text-[var(--text-secondary)]'
              : 'bg-amber-50 text-amber-600'
          }`}>
            {event.status}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-tsg-50 text-tsg-500 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">{value}</p>
      </div>
    </div>
  )
}

function MapPlaceholder({ origin, destination }: { origin: string; destination: string }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
      <LazyImage
        src={images.tracking}
        alt="Tracking route map"
        className="absolute inset-0"
        wrapperClassName="absolute inset-0"
        rounded="none"
        objectFit="cover"
        overlay
        overlayColor="from-tsg-900/50 via-tsg-900/20 to-tsg-900/50"
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 450" preserveAspectRatio="none">
        <defs>
          <linearGradient id="routeGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f26722" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#173a7a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f26722" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M100 380 Q 200 80, 400 120 T 700 80"
          fill="none"
          stroke="url(#routeGlow)"
          strokeWidth="2.5"
          strokeDasharray="10 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="100" cy="380" r="7" fill="#f26722"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.35, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: 'center' }}
        />
        <circle cx="700" cy="80" r="7" fill="#16a34a" />
        <motion.circle
          cx="400" cy="120" r="4" fill="#f26722"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-xl bg-black/40 backdrop-blur-sm px-5 py-3 text-center">
          <HiGlobe className="mx-auto mb-1 h-5 w-5 text-white/70" />
          <p className="text-xs font-medium text-white/90">Live Map View</p>
          <p className="text-[10px] text-white/60">{origin} → {destination}</p>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/30 backdrop-blur-sm px-2.5 py-1.5">
        <HiLocationMarker className="h-3 w-3 text-emerald-400" />
        <span className="text-[10px] text-white/80">{destination}</span>
      </div>
      <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/30 backdrop-blur-sm px-2.5 py-1.5">
        <HiLocationMarker className="h-3 w-3 text-gold-500" />
        <span className="text-[10px] text-white/80">{origin}</span>
      </div>
    </div>
  )
}

function TrackInput({
  value,
  onChange,
  onTrack,
  loading,
}: {
  value: string
  onChange: (v: string) => void
  onTrack: () => void
  loading: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <Input
          ref={inputRef}
          placeholder="Enter tracking number (e.g. TSG-001)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onTrack()}
          className="h-14 px-5 text-base"
        />
      </div>
      <Button
        size="xl"
        variant="gold"
        onClick={onTrack}
        disabled={!value.trim() || loading}
        className="h-14 px-8"
      >
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
          />
        ) : (
          <>
            <HiSearch className="h-5 w-5" />
            Track
          </>
        )}
      </Button>
    </div>
  )
}

function TrackingResult({
  data,
}: {
  data: { events: TrackingEvent[]; pkg: PackageInfo; status: OverallStatus; statusText: string }
}) {
  const cfg = statusConfig[data.status]
  const StatusIcon = cfg.icon
  const lastDoneIndex = data.events.reduce((last, e, i) => (e.done ? i : last), -1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      {/* Status Overview Bar */}
      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5, duration: 0.5 }}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cfg.bg} ${cfg.color}`}
              >
                <StatusIcon className="h-6 w-6" />
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <Text variant="h5">{data.pkg.contents}</Text>
                  <StatusPulse status={data.status} />
                </div>
                <Text variant="caption" className="mt-0.5 flex items-center gap-1.5">
                  <span>{data.pkg.origin}</span>
                  <HiArrowRight className="h-3 w-3 text-[var(--text-muted)]" />
                  <span>{data.pkg.destination}</span>
                </Text>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Est. Delivery</p>
                <p className="font-semibold text-[var(--text-primary)]">{data.pkg.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--surface-alt)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((lastDoneIndex + 1) / data.events.length) * 100}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full bg-gradient-to-r from-tsg-500 to-gold-500`}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
              <span>{data.pkg.origin}</span>
              <span>{lastDoneIndex + 1} of {data.events.length} steps</span>
              <span>{data.pkg.destination}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Timeline + Delivery History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-6">
                <HiClock className="h-5 w-5 text-tsg-500" />
                <Text variant="h6">Tracking Timeline</Text>
              </div>
              <div className="relative">
                {data.events.map((event, i) => (
                  <TimelineEvent
                    key={i}
                    event={event}
                    index={i}
                    isLast={i === data.events.length - 1}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <Card>
            <CardContent className="p-0 overflow-hidden">
              <MapPlaceholder origin={data.pkg.origin} destination={data.pkg.destination} />
            </CardContent>
          </Card>
        </div>

        {/* Right: Details */}
        <div className="space-y-5">
          {/* Shipment Status Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <HiShieldCheck className="h-5 w-5 text-tsg-500" />
                <Text variant="h6">Shipment Status</Text>
              </div>
              <div className={`rounded-xl ${cfg.bg} p-4 text-center`}>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                >
                  <StatusIcon className={`mx-auto h-10 w-10 ${cfg.color}`} />
                  <p className={`mt-2 text-lg font-bold ${cfg.color}`}>{data.statusText}</p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {lastDoneIndex >= 0 ? data.events[lastDoneIndex].location : 'Awaiting pickup'}
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Package Details */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <HiCube className="h-5 w-5 text-tsg-500" />
                <Text variant="h6">Package Details</Text>
              </div>
              <div className="divide-y divide-[var(--border-subtle)]">
                <InfoRow icon={<HiCube className="h-4 w-4" />} label="Contents" value={data.pkg.contents} />
                <InfoRow icon={<HiCube className="h-4 w-4" />} label="Weight" value={data.pkg.weight} />
                <InfoRow icon={<HiCube className="h-4 w-4" />} label="Dimensions" value={data.pkg.dimensions} />
                <InfoRow icon={<HiGlobe className="h-4 w-4" />} label="Service" value={data.pkg.serviceType} />
              </div>
            </CardContent>
          </Card>

          {/* Courier */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <HiTruck className="h-5 w-5 text-tsg-500" />
                <Text variant="h6">Courier</Text>
              </div>
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-tsg-500 to-tsg-600 text-white text-sm font-bold shadow-md`}>
                  {data.pkg.courier.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{data.pkg.courier}</p>
                  <p className="text-xs text-[var(--text-muted)]">{data.pkg.serviceType}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                <p className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Tracking #</p>
                <p className="text-sm font-mono font-semibold text-[var(--text-primary)]">{data.pkg.trackingNumber}</p>
              </div>
            </CardContent>
          </Card>

          {/* Estimated Delivery */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <HiCalendar className="h-5 w-5 text-tsg-500" />
                <Text variant="h6">Estimated Delivery</Text>
              </div>
              <div className="rounded-xl bg-tsg-50 p-4 text-center">
                <motion.p
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-2xl font-bold text-tsg-500"
                >
                  {data.pkg.estimatedDelivery}
                </motion.p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {data.status === 'delivered' ? 'Successfully delivered' : 'Estimated arrival date'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

export function TrackPage() {
  const [trackingId, setTrackingId] = useState('')
  const [searchedId, setSearchedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = useCallback(() => {
    const id = trackingId.trim().toUpperCase()
    if (!id) return
    setLoading(true)
    setTimeout(() => {
      setSearchedId(id)
      setLoading(false)
    }, 600)
  }, [trackingId])

  const result = searchedId && mockShipments[searchedId]

  return (
    <div className="min-h-screen">
      {/* Tracking Hero */}
      <section className="relative overflow-hidden pt-18">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 -left-32 h-96 w-96 rounded-full bg-tsg-500/8 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="warning" size="lg" className="mb-5">
              Track Your Shipment
            </Badge>
            <Text variant="h1" className="mb-4">
              Where Is Your{' '}
              <span className="bg-gradient-to-r from-tsg-400 to-gold-500 bg-clip-text text-transparent">
                Package?
              </span>
            </Text>
            <Text variant="subtitle" className="mb-8 max-w-lg mx-auto">
              Enter your tracking number to get real-time updates on your shipment&apos;s location and status.
            </Text>

            <div className="max-w-xl mx-auto">
              <TrackInput value={trackingId} onChange={setTrackingId} onTrack={handleTrack} loading={loading} />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-xs text-[var(--text-muted)]"
            >
              Try: TSG-001 (In Transit), TSG-002 (Delivered), or TSG-003 (Processing)
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {searchedId && !loading && (
              result ? (
                <TrackingResult key={searchedId} data={result} />
              ) : (
                <motion.div
                  key="not-found"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                    <HiSearch className="h-8 w-8" />
                  </div>
                  <Text variant="h4" className="mb-2">Shipment Not Found</Text>
                  <Text variant="body" className="text-[var(--text-secondary)] mb-6">
                    No shipment found with tracking number &quot;{searchedId}&quot;. Please check the number and try again.
                  </Text>
                  <Button variant="outline" onClick={() => setSearchedId(null)}>
                    Try Again
                  </Button>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
