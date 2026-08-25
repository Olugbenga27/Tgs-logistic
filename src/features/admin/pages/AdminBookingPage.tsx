import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiUserAdd,
  HiSearch,
  HiCheck,
  HiTruck,
  HiCurrencyDollar,
  HiShieldCheck,
  HiCalendar,
  HiLocationMarker,
  HiCube,
  HiPhone,
  HiMail,
  HiX,
  HiArrowRight,
  HiCheckCircle,
  HiClipboardCheck,
  HiRefresh,
  HiPrinter,
} from 'react-icons/hi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { CountryCitySelect } from '@/components/ui/CountryCitySelect'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert'
import type { Customer } from '@/types'
import { cn } from '@/lib/utils'
import { useBookingCustomers, useBookingCouriers } from '../api'

const packageTypes = [
  { value: 'document', label: 'Document / Envelope' },
  { value: 'parcel', label: 'Parcel / Package' },
  { value: 'box', label: 'Box / Carton' },
  { value: 'pallet', label: 'Pallet' },
  { value: 'container', label: 'Container' },
  { value: 'fragile', label: 'Fragile Item' },
]

const paymentOptions = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
]

function generateTrackingNumber(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `TSG-${y}${m}${d}-${rand}`
}

export function AdminBookingPage() {
  const { data: customerList = [] } = useBookingCustomers()
  const { data: courierList = [] } = useBookingCouriers()
  const [addedCustomers, setAddedCustomers] = useState<Customer[]>([])
  const customers = useMemo(() => [...customerList, ...addedCustomers], [customerList, addedCustomers])
  const couriers = courierList
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState(generateTrackingNumber())

  const [originAddress, setOriginAddress] = useState('')
  const [originCity, setOriginCity] = useState('')
  const [originCountry, setOriginCountry] = useState('')
  const [destAddress, setDestAddress] = useState('')
  const [destCity, setDestCity] = useState('')
  const [destCountry, setDestCountry] = useState('')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [description, setDescription] = useState('')
  const [packageType, setPackageType] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [estimatedDate, setEstimatedDate] = useState('')
  const [selectedCourier, setSelectedCourier] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('pending')

  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', company: '', address: '', city: '' })

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers.slice(0, 5)
    const q = searchQuery.toLowerCase()
    return customers.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.phone.includes(q)
    )
  }, [customers, searchQuery])

  const selectedCourierData = couriers.find(c => c.id === selectedCourier)

  const allFieldsFilled = selectedCustomer
    && originAddress && originCity && originCountry
    && destAddress && destCity && destCountry
    && weight && packageType && pickupDate && estimatedDate
    && selectedCourier

  const resetForm = () => {
    setSelectedCustomer(null)
    setOriginAddress('')
    setOriginCity('')
    setOriginCountry('')
    setDestAddress('')
    setDestCity('')
    setDestCountry('')
    setWeight('')
    setLength('')
    setWidth('')
    setHeight('')
    setDescription('')
    setPackageType('')
    setPickupDate('')
    setEstimatedDate('')
    setSelectedCourier('')
    setPaymentStatus('pending')
    setSearchQuery('')
    setTrackingNumber(generateTrackingNumber())
    setConfirmed(false)
  }

  const handleCreateCustomer = () => {
    const newCust: Customer = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      company: newCustomer.company,
      address: newCustomer.address,
      city: newCustomer.city,
      createdAt: new Date().toISOString().split('T')[0],
      totalShipments: 0,
    }
    setAddedCustomers((prev) => [...prev, newCust])
    setSelectedCustomer(newCust)
    setShowCreateModal(false)
    setNewCustomer({ name: '', email: '', phone: '', company: '', address: '', city: '' })
    setSearchQuery(newCust.name)
  }

  const handleConfirm = () => {
    if (!allFieldsFilled) return
    setConfirmed(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Admin Booking</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Create and manage shipments
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={resetForm}>
          <HiRefresh className="h-4 w-4" />
          Reset
        </Button>
      </motion.div>

      {confirmed ? (
        /* --- SUCCESS STATE --- */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Alert variant="success">
            <AlertTitle className="flex items-center gap-2">
              <HiCheckCircle className="h-5 w-5" />
              Booking Confirmed Successfully
            </AlertTitle>
            <AlertDescription>
              The shipment has been registered and the customer has been notified.
            </AlertDescription>
          </Alert>

          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 mb-4">
                  <HiCheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Booking #{trackingNumber}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">Tracking number generated</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl bg-[var(--surface-alt)] p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">Customer</p>
                  <p className="font-semibold text-[var(--text-primary)]">{selectedCustomer?.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{selectedCustomer?.company}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{selectedCustomer?.email}</p>
                </div>
                <div className="rounded-xl bg-[var(--surface-alt)] p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">Route</p>
                  <p className="font-semibold text-[var(--text-primary)]">{originCity}, {originCountry}</p>
                  <div className="flex items-center gap-1 my-1">
                    <div className="h-px flex-1 bg-[var(--border-default)] relative">
                      <HiArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 text-[var(--text-muted)]" />
                    </div>
                  </div>
                  <p className="font-semibold text-[var(--text-primary)]">{destCity}, {destCountry}</p>
                </div>
                <div className="rounded-xl bg-[var(--surface-alt)] p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">Courier</p>
                  <p className="font-semibold text-[var(--text-primary)]">{selectedCourierData?.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{selectedCourierData?.vehicle} · {selectedCourierData?.plateNumber}</p>
                </div>
                <div className="rounded-xl bg-[var(--surface-alt)] p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">Payment</p>
                  <Badge variant={paymentStatus === 'paid' ? 'success' : paymentStatus === 'pending' ? 'warning' : 'danger'} size="sm">
                    {paymentStatus}
                  </Badge>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{weight} kg · {packageType}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button variant="primary" onClick={resetForm}>
                  <HiClipboardCheck className="h-4 w-4" />
                  New Booking
                </Button>
                <Button variant="outline">
                  <HiPrinter className="h-4 w-4" />
                  Print Label
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* --- BOOKING FORM --- */
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* CUSTOMER SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <HiUserAdd className="h-4 w-4 text-tsg-500" />
                      Customer
                    </CardTitle>
                    <Button variant="ghost" size="xs" onClick={() => { setShowCreateModal(true); setShowDropdown(false) }}>
                      <HiUserAdd className="h-3.5 w-3.5" />
                      New Customer
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedCustomer ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-500/5 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-tsg-400 to-tsg-600 text-white text-sm font-bold">
                          {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{selectedCustomer.name}</p>
                          <p className="text-xs text-[var(--text-muted)]">{selectedCustomer.company}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1">
                              <HiMail className="h-3 w-3" />{selectedCustomer.email}
                            </span>
                            <span className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1">
                              <HiPhone className="h-3 w-3" />{selectedCustomer.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => { setSelectedCustomer(null); setSearchQuery('') }}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-red-500 transition-colors"
                      >
                        <HiX className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <div className="relative">
                      <div className="relative">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Search customers by name, email, company..."
                          value={searchQuery}
                          onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true) }}
                          onFocus={() => setShowDropdown(true)}
                          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                          className="flex h-10 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface)] pl-10 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tsg-500/30 focus-visible:border-tsg-500 hover:border-[var(--text-muted)]"
                        />
                      </div>
                      <AnimatePresence>
                        {showDropdown && filteredCustomers.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="absolute z-10 mt-1 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-elevated overflow-hidden"
                          >
                            {filteredCustomers.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onMouseDown={() => { setSelectedCustomer(c); setSearchQuery(c.name); setShowDropdown(false) }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-left transition-colors hover:bg-[var(--surface-alt)]"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-tsg-400 to-tsg-600 text-white text-xs font-bold">
                                  {c.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-[var(--text-primary)]">{c.name}</p>
                                  <p className="text-xs text-[var(--text-muted)]">{c.company} · {c.city}</p>
                                </div>
                                <span className="text-xs text-[var(--text-muted)]">{c.totalShipments} shipments</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {!searchQuery && !showDropdown && (
                        <p className="text-xs text-[var(--text-muted)] mt-2">Type to search or click to browse customers</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* SHIPMENT DETAILS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <HiTruck className="h-4 w-4 text-tsg-500" />
                    Shipment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Origin & Destination */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                        <HiLocationMarker className="h-3.5 w-3.5 text-emerald-500" />
                        Origin
                      </p>
                      <Input label="Address" placeholder="Street address" value={originAddress} onChange={(e) => setOriginAddress(e.target.value)} leftIcon={<HiLocationMarker className="h-4 w-4" />} />
                      <CountryCitySelect
                        label="Origin"
                        countryValue={originCountry}
                        cityValue={originCity}
                        onCountryChange={setOriginCountry}
                        onCityChange={setOriginCity}
                      />
                    </div>
                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                        <HiLocationMarker className="h-3.5 w-3.5 text-red-500" />
                        Destination
                      </p>
                      <Input label="Address" placeholder="Street address" value={destAddress} onChange={(e) => setDestAddress(e.target.value)} leftIcon={<HiLocationMarker className="h-4 w-4" />} />
                      <CountryCitySelect
                        label="Destination"
                        countryValue={destCountry}
                        cityValue={destCity}
                        onCountryChange={setDestCountry}
                        onCityChange={setDestCity}
                      />
                    </div>
                  </div>

                  <div className="border-t border-[var(--border-subtle)]" />

                  {/* Parcel Info */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                      <HiCube className="h-3.5 w-3.5 text-tsg-500" />
                      Parcel Information
                    </p>
                    <div className="grid sm:grid-cols-4 gap-3 mb-3">
                      <Input label="Weight (kg)" type="number" placeholder="0" value={weight} onChange={(e) => setWeight(e.target.value)} />
                      <Input label="Length (cm)" type="number" placeholder="0" value={length} onChange={(e) => setLength(e.target.value)} />
                      <Input label="Width (cm)" type="number" placeholder="0" value={width} onChange={(e) => setWidth(e.target.value)} />
                      <Input label="Height (cm)" type="number" placeholder="0" value={height} onChange={(e) => setHeight(e.target.value)} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Select label="Package Type" placeholder="Select type" options={packageTypes} value={packageType} onChange={(e) => setPackageType(e.target.value)} />
                      <Input label="Description (optional)" placeholder="What's in the package?" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                  </div>

                  <div className="border-t border-[var(--border-subtle)]" />

                  {/* Dates */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                      <HiCalendar className="h-3.5 w-3.5 text-tsg-500" />
                      Schedule
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input label="Pickup Date" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
                      <Input label="Estimated Delivery" type="date" value={estimatedDate} onChange={(e) => setEstimatedDate(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (1/3) */}
          <div className="space-y-6">
            {/* ASSIGNMENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <HiShieldCheck className="h-4 w-4 text-tsg-500" />
                    Assignment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[var(--text-secondary)] block mb-1.5">
                      Assign Courier
                    </label>
                    <div className="space-y-2">
                      {couriers.map((c) => {
                        const isSelected = selectedCourier === c.id
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedCourier(c.id)}
                            className={cn(
                              'flex items-center gap-3 w-full rounded-xl border p-3 text-left transition-all duration-200',
                              isSelected
                                ? 'border-tsg-500 bg-tsg-50/50 dark:bg-tsg-500/10'
                                : 'border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--surface-alt)]',
                              c.status === 'offline' && 'opacity-50 pointer-events-none',
                            )}
                          >
                            <div className={cn(
                              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold',
                              isSelected ? 'bg-tsg-500' : 'bg-gradient-to-br from-tsg-400 to-tsg-600',
                            )}>
                              {c.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-[var(--text-primary)]">{c.name}</span>
                                {isSelected && <HiCheck className="h-3.5 w-3.5 text-tsg-500" />}
                              </div>
                              <p className="text-xs text-[var(--text-muted)]">{c.vehicle} · {c.plateNumber}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge
                                  variant={c.status === 'available' ? 'success' : c.status === 'on_delivery' ? 'info' : 'neutral'}
                                  size="sm"
                                  dot
                                >
                                  {c.status.replace('_', ' ')}
                                </Badge>
                                <span className="text-[10px] text-[var(--text-muted)]">{c.totalDeliveries} deliveries</span>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="border-t border-[var(--border-subtle)]" />

                  <Select
                    label="Payment Status"
                    options={paymentOptions}
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  />

                  <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-tsg-500/10 to-tsg-500/5 border border-tsg-500/20 p-3">
                    <HiCurrencyDollar className="h-5 w-5 text-tsg-500 shrink-0" />
                    <div className="text-xs text-[var(--text-secondary)]">
                      Payment will be <span className="font-semibold text-[var(--text-primary)]">{paymentStatus === 'paid' ? 'marked as paid' : `set to ${paymentStatus}`}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* REVIEW & CONFIRM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <HiClipboardCheck className="h-4 w-4 text-tsg-500" />
                    Review & Confirm
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tracking Number */}
                  <div className="rounded-xl bg-gradient-to-br from-tsg-500 to-tsg-600 p-4 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">Tracking Number</p>
                    <p className="mt-1 text-lg font-bold tracking-wider text-white font-mono">{trackingNumber}</p>
                    <p className="text-[10px] text-white/60 mt-0.5">Auto-generated</p>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2.5">
                    <div className={cn(
                      'flex items-center justify-between rounded-lg p-2.5 text-xs',
                      selectedCustomer ? 'bg-emerald-50/50 dark:bg-emerald-500/5' : 'bg-[var(--surface-alt)]',
                    )}>
                      <span className="text-[var(--text-muted)]">Customer</span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {selectedCustomer ? selectedCustomer.name : 'Not selected'}
                      </span>
                    </div>
                    <div className={cn(
                      'flex items-center justify-between rounded-lg p-2.5 text-xs',
                      originCity && destCity ? 'bg-emerald-50/50 dark:bg-emerald-500/5' : 'bg-[var(--surface-alt)]',
                    )}>
                      <span className="text-[var(--text-muted)]">Route</span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {originCity && destCity ? `${originCity} → ${destCity}` : 'Not set'}
                      </span>
                    </div>
                    <div className={cn(
                      'flex items-center justify-between rounded-lg p-2.5 text-xs',
                      weight && packageType ? 'bg-emerald-50/50 dark:bg-emerald-500/5' : 'bg-[var(--surface-alt)]',
                    )}>
                      <span className="text-[var(--text-muted)]">Parcel</span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {weight && packageType ? `${weight} kg · ${packageType}` : 'Not set'}
                      </span>
                    </div>
                    <div className={cn(
                      'flex items-center justify-between rounded-lg p-2.5 text-xs',
                      selectedCourier ? 'bg-emerald-50/50 dark:bg-emerald-500/5' : 'bg-[var(--surface-alt)]',
                    )}>
                      <span className="text-[var(--text-muted)]">Courier</span>
                      <span className="font-medium text-[var(--text-primary)]">
                        {selectedCourierData ? selectedCourierData.name : 'Not assigned'}
                      </span>
                    </div>
                    <div className={cn(
                      'flex items-center justify-between rounded-lg p-2.5 text-xs',
                      'bg-[var(--surface-alt)]',
                    )}>
                      <span className="text-[var(--text-muted)]">Payment</span>
                      <Badge variant={paymentStatus === 'paid' ? 'success' : paymentStatus === 'pending' ? 'warning' : 'danger'} size="sm">
                        {paymentStatus}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={!allFieldsFilled}
                    onClick={handleConfirm}
                  >
                    <HiCheckCircle className="h-4 w-4" />
                    Confirm Booking
                  </Button>

                  {!allFieldsFilled && (
                    <p className="text-[10px] text-center text-[var(--text-muted)]">
                      Fill in all required fields to confirm
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      )}

      {/* --- CREATE CUSTOMER MODAL --- */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Customer"
        description="Add a new customer to the system"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Full Name" placeholder="John Doe" value={newCustomer.name} onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))} />
            <Input label="Email" type="email" placeholder="john@company.com" value={newCustomer.email} onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Phone" placeholder="+1 (555) 000-0000" value={newCustomer.phone} onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))} />
            <Input label="Company" placeholder="Company Inc." value={newCustomer.company} onChange={(e) => setNewCustomer(prev => ({ ...prev, company: e.target.value }))} />
          </div>
          <Input label="Address" placeholder="Street address" value={newCustomer.address} onChange={(e) => setNewCustomer(prev => ({ ...prev, address: e.target.value }))} />
          <Input label="City" placeholder="City" value={newCustomer.city} onChange={(e) => setNewCustomer(prev => ({ ...prev, city: e.target.value }))} />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={handleCreateCustomer}
              disabled={!newCustomer.name || !newCustomer.email || !newCustomer.company}
            >
              <HiUserAdd className="h-4 w-4" />
              Create Customer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
