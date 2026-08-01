import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiArrowLeft,
  HiTruck,
  HiCurrencyDollar,
  HiPrinter,
  HiLocationMarker,
  HiCalendar,
  HiCube,
  HiUser,
  HiClock,
  HiPhone,
  HiMail,
  HiGlobeAlt,
  HiScale,
  HiShieldCheck,
  HiCheckCircle,
  HiDownload,
  HiTag,
  HiStar,
} from 'react-icons/hi'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Text } from '@/components/ui/Text'
import { useShipment } from '../api'
import { cn } from '@/lib/utils'

const badgeVariant: Record<string, 'success' | 'warning' | 'info'> = {
  pending: 'warning',
  in_transit: 'info',
  delivered: 'success',
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-[var(--border-subtle)] last:border-0">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-tsg-50 text-tsg-500 dark:bg-tsg-500/20 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--text-muted)]">{label}</p>
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">{value}</p>
      </div>
    </div>
  )
}

function DetailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">{children}</CardContent>
    </Card>
  )
}

const timelineSteps = [
  { key: 'order_placed', label: 'Order Placed', icon: HiTag },
  { key: 'picked_up', label: 'Picked Up', icon: HiCube },
  { key: 'in_transit', label: 'In Transit', icon: HiTruck },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: HiLocationMarker },
  { key: 'delivered', label: 'Delivered', icon: HiCheckCircle },
]

export function ShipmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: shipment } = useShipment(id)

  if (!shipment) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <HiTruck className="h-16 w-16 text-[var(--text-muted)] mb-4" />
        <Text variant="h5">Shipment not found</Text>
        <p className="text-sm text-[var(--text-muted)] mt-1">No shipment matches ID "{id}"</p>
        <Button variant="primary" className="mt-4" asChild>
          <Link to="/shipments">Back to Shipments</Link>
        </Button>
      </div>
    )
  }

  const stepIndex = shipment.status === 'pending' ? 0
    : shipment.status === 'in_transit' ? 1
    : shipment.status === 'delivered' ? 4
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate('/shipments')}
          className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-3"
        >
          <HiArrowLeft className="h-4 w-4" />
          Back to Shipments
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{shipment.id}</h2>
            <Badge variant={badgeVariant[shipment.status]} size="md" dot>
              {shipment.status.replace('_', ' ')}
            </Badge>
            <span className={cn(
              'text-[11px] font-semibold px-2 py-0.5 rounded-md uppercase',
              shipment.priority === 'high' && 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
              shipment.priority === 'medium' && 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
              shipment.priority === 'low' && 'bg-[var(--surface-alt)] text-[var(--text-muted)]',
            )}>
              {shipment.priority} priority
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm">
              <HiTruck className="h-4 w-4" />
              Track Live
            </Button>
            <Button variant="secondary" size="sm">
              <HiDownload className="h-4 w-4" />
              Download Invoice
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Route Summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-tsg-50 to-tsg-50/30 dark:from-tsg-500/10 dark:to-tsg-500/5 border border-tsg-500/20"
      >
        <div className="flex-1">
          <p className="text-xs text-[var(--text-muted)] mb-0.5">Origin</p>
          <p className="text-sm font-bold text-[var(--text-primary)]">{shipment.origin}</p>
          <p className="text-xs text-[var(--text-muted)] truncate">{shipment.originAddress}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <HiCalendar className="h-3 w-3" />
            {shipment.date}
          </div>
          <div className="relative my-1.5">
            <div className="h-px w-16 bg-tsg-300" />
            <HiTruck className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-5 text-tsg-500" />
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <HiCalendar className="h-3 w-3" />
            ETA {shipment.eta}
          </div>
        </div>
        <div className="flex-1 text-right">
          <p className="text-xs text-[var(--text-muted)] mb-0.5">Destination</p>
          <p className="text-sm font-bold text-[var(--text-primary)]">{shipment.destination}</p>
          <p className="text-xs text-[var(--text-muted)] truncate">{shipment.destinationAddress}</p>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Timeline + Map */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <HiClock className="h-4 w-4 text-tsg-500" />
                  Tracking Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {timelineSteps.map((step, i) => {
                    const Icon = step.icon
                    const done = i <= stepIndex
                    const isCurrent = i === stepIndex
                    return (
                      <div key={step.key} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <motion.div
                            initial={false}
                            animate={{
                              scale: isCurrent ? [1, 1.15, 1] : 1,
                              backgroundColor: done ? 'var(--tsg-500)' : 'var(--surface-alt)',
                            }}
                            transition={isCurrent ? { duration: 0.5, repeat: Infinity, repeatDelay: 2 } : { duration: 0.3 }}
                            className={cn(
                              'flex h-9 w-9 items-center justify-center rounded-full transition-all',
                              done && 'bg-tsg-500 text-white',
                              !done && 'bg-[var(--surface-alt)] text-[var(--text-muted)] border border-[var(--border-subtle)]',
                              isCurrent && 'ring-4 ring-tsg-500/20',
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </motion.div>
                          {i < timelineSteps.length - 1 && (
                            <div className={cn(
                              'w-0.5 flex-1 min-h-[28px]',
                              done ? 'bg-tsg-500/40' : 'bg-[var(--border-subtle)]',
                            )} />
                          )}
                        </div>
                        <div className={cn(
                          'pb-6',
                          i === timelineSteps.length - 1 && 'pb-0',
                        )}>
                          <p className={cn(
                            'text-sm font-semibold',
                            done ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]',
                          )}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-tsg-500 font-medium">Current • {shipment.lastUpdate}</p>
                          )}
                          {done && !isCurrent && (
                            <p className="text-xs text-[var(--text-muted)]">{shipment.lastUpdate}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <HiGlobeAlt className="h-4 w-4 text-tsg-500" />
                  Route Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 sm:h-64 rounded-xl bg-gradient-to-br from-tsg-50 to-tsg-100 dark:from-tsg-950 dark:to-tsg-900 overflow-hidden border border-[var(--border-subtle)]">
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(var(--tsg-500) 1px, transparent 1px), linear-gradient(90deg, var(--tsg-500) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  </div>
                  {/* Origin dot */}
                  <div className="absolute bottom-8 left-8 flex flex-col items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-tsg-500 text-white shadow-lg">
                      <HiLocationMarker className="h-3 w-3" />
                    </div>
                    <span className="mt-1 text-[10px] font-semibold text-tsg-600 dark:text-tsg-400">{shipment.origin}</span>
                  </div>
                  {/* Destination dot */}
                  <div className="absolute top-8 right-8 flex flex-col items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                      <HiLocationMarker className="h-3 w-3" />
                    </div>
                    <span className="mt-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{shipment.destination}</span>
                  </div>
                  {/* Animated flight path */}
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 250" preserveAspectRatio="none">
                    <motion.path
                      d="M 70 200 Q 200 50 330 50"
                      fill="none"
                      stroke="var(--tsg-500)"
                      strokeWidth="2"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                    {/* Plane icon on path */}
                    <motion.g
                      initial={{ offsetDistance: '0%' }}
                      animate={{ offsetDistance: '100%' }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      style={{ offsetPath: 'path(M 70 200 Q 200 50 330 50)' }}
                    >
                      <circle r="4" fill="var(--tsg-500)" />
                    </motion.g>
                  </svg>
                  {/* Compass */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                    <HiArrowLeft className="h-3 w-3 rotate-45" />
                    N
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Invoice Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <HiCurrencyDollar className="h-4 w-4 text-tsg-500" />
                  Invoice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)]">Base Rate ({shipment.weight})</span>
                    <span className="text-[var(--text-secondary)]">${(shipment.totalCost * 0.7).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)]">Fuel Surcharge</span>
                    <span className="text-[var(--text-secondary)]">${(shipment.totalCost * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)]">Insurance</span>
                    <span className="text-[var(--text-secondary)]">${(shipment.totalCost * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)]">Handling Fee</span>
                    <span className="text-[var(--text-secondary)]">${(shipment.totalCost * 0.07).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[var(--border-subtle)] pt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--text-primary)]">Total</span>
                    <span className="text-lg font-bold text-tsg-600">${shipment.totalCost.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--border-subtle)]">
                  <Button variant="primary" size="sm">
                    <HiDownload className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="secondary" size="sm">
                    <HiPrinter className="h-4 w-4" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: Package / Sender / Receiver / Courier */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DetailCard title="Package Details">
              <InfoRow icon={<HiCube className="h-4 w-4" />} label="Type" value={shipment.id.includes('SH') ? 'Box / Carton' : 'Pallet'} />
              <InfoRow icon={<HiScale className="h-4 w-4" />} label="Weight" value={shipment.weight} />
              <InfoRow icon={<HiCube className="h-4 w-4" />} label="Dimensions" value={`${Math.floor(Math.random() * 40 + 20)} × ${Math.floor(Math.random() * 30 + 15)} × ${Math.floor(Math.random() * 20 + 10)} cm`} />
              <InfoRow icon={<HiTag className="h-4 w-4" />} label="Quantity" value="1" />
              <InfoRow icon={<HiShieldCheck className="h-4 w-4" />} label="Insurance" value={shipment.priority === 'high' ? 'Full Coverage' : 'Standard'} />
            </DetailCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <DetailCard title="Sender">
              <InfoRow icon={<HiUser className="h-4 w-4" />} label="Name" value={
                shipment.origin === 'Lagos' ? 'T.S.G Grateful Logistics' :
                shipment.origin === 'Ibadan' ? 'Timilehin Olaoye' :
                shipment.origin === 'Ile-Ife' ? 'OAU Shipping Dept' :
                'Alex Rivera'
              } />
              <InfoRow icon={<HiMail className="h-4 w-4" />} label="Email" value="shipping@tsggrateful.com" />
              <InfoRow icon={<HiPhone className="h-4 w-4" />} label="Phone" value="+234 800 TSG LOGS" />
              <InfoRow icon={<HiLocationMarker className="h-4 w-4" />} label="Address" value={shipment.originAddress} />
            </DetailCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DetailCard title="Receiver">
              <InfoRow icon={<HiUser className="h-4 w-4" />} label="Name" value={
                shipment.destination === 'Lagos' ? 'T.S.G Grateful Logistics' :
                shipment.destination === 'Ibadan' ? 'Timilehin Olaoye' :
                'Jane Smith'
              } />
              <InfoRow icon={<HiMail className="h-4 w-4" />} label="Email" value="receiver@example.com" />
              <InfoRow icon={<HiPhone className="h-4 w-4" />} label="Phone" value="+1 (555) 111-1111" />
              <InfoRow icon={<HiLocationMarker className="h-4 w-4" />} label="Address" value={shipment.destinationAddress} />
            </DetailCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <DetailCard title="Courier">
              <InfoRow icon={<HiTruck className="h-4 w-4" />} label="Provider" value={shipment.carrier} />
              <InfoRow icon={<HiStar className="h-4 w-4" />} label="Service Rating" value={
                shipment.carrier === 'DHL' ? '4.8 / 5.0' :
                shipment.carrier === 'FedEx' ? '4.7 / 5.0' :
                shipment.carrier === 'UPS' ? '4.6 / 5.0' :
                '4.4 / 5.0'
              } />
              <InfoRow icon={<HiClock className="h-4 w-4" />} label="Est. Delivery" value={shipment.eta} />
              <InfoRow icon={<HiTag className="h-4 w-4" />} label="Tracking No." value={shipment.id + '-' + shipment.carrier.toUpperCase()} />
            </DetailCard>
          </motion.div>
        </div>
      </div>

      {/* Full Status History */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <HiClock className="h-4 w-4 text-tsg-500" />
              Status History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Location</th>
                    <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {shipment.statusHistory.map((event, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.04 }}
                      className="border-b border-[var(--border-subtle)] last:border-0"
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-[var(--text-primary)]">{event.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[var(--text-secondary)]">{event.location}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm text-[var(--text-muted)]">{event.date}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
