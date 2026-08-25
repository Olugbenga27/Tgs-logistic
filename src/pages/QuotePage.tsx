import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiLocationMarker,
  HiScale,
  HiCube,
  HiShieldCheck,
  HiLightningBolt,
  HiArrowRight,
  HiClock,
  HiGlobe,
  HiCalculator,
  HiRefresh,
} from 'react-icons/hi'
import { Text } from '@/components/ui/Text'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { CountryCitySelect } from '@/components/ui/CountryCitySelect'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type ShippingMethod = 'economy' | 'standard' | 'express' | 'same_day'
type PackageType = 'box' | 'envelope' | 'pallet' | 'tube' | 'custom'
type InsuranceLevel = 'none' | 'basic' | 'premium' | 'full'
type DistanceZone = 'domestic' | 'regional' | 'international'

interface PriceBreakdown {
  baseRate: number
  weightCharge: number
  dimensionSurcharge: number
  distanceMultiplier: number
  packageSurcharge: number
  insuranceCost: number
  total: number
  currency: string
}

const methodConfig: Record<ShippingMethod, { label: string; icon: React.ElementType; rate: number; days: string; desc: string }> = {
  economy: { label: 'Economy', icon: HiClock, rate: 2.5, days: '10–15 business days', desc: 'Most affordable option for non-urgent shipments' },
  standard: { label: 'Standard', icon: HiGlobe, rate: 4.0, days: '5–10 business days', desc: 'Balanced speed and cost for regular shipments' },
  express: { label: 'Express', icon: HiLightningBolt, rate: 7.5, days: '2–5 business days', desc: 'Fast tracking and priority handling' },
  same_day: { label: 'Same Day', icon: HiLightningBolt, rate: 12.0, days: 'Same day delivery', desc: 'Urgent delivery within hours' },
}

const packageConfig: Record<PackageType, { label: string; surcharge: number }> = {
  box: { label: 'Box', surcharge: 0 },
  envelope: { label: 'Envelope', surcharge: -0.3 },
  pallet: { label: 'Pallet', surcharge: 0.5 },
  tube: { label: 'Tube', surcharge: 0.1 },
  custom: { label: 'Custom', surcharge: 0.2 },
}

const insuranceConfig: Record<InsuranceLevel, { label: string; flat: number; pct: number; desc: string }> = {
  none: { label: 'No Insurance', flat: 0, pct: 0, desc: 'No coverage' },
  basic: { label: 'Basic', flat: 15, pct: 0, desc: 'Covers up to $200' },
  premium: { label: 'Premium', flat: 25, pct: 0.02, desc: 'Covers up to $2,000' },
  full: { label: 'Full Coverage', flat: 50, pct: 0.05, desc: 'Covers full value' },
}

const distanceZones: { from: string[]; to: string[]; zone: DistanceZone; multiplier: number }[] = [
  { from: ['lagos', 'ibadan', 'abuja', 'portharcourt', 'kano', 'enugu'], to: ['lagos', 'ibadan', 'abuja', 'portharcourt', 'kano', 'enugu'], zone: 'domestic', multiplier: 1.0 },
  { from: ['lagos', 'ibadan', 'abuja', 'portharcourt', 'kano', 'enugu'], to: ['accra', 'nairobi', 'johannesburg', 'cairo', 'dakar'], zone: 'regional', multiplier: 1.5 },
  { from: ['lagos', 'ibadan', 'abuja', 'portharcourt', 'kano', 'enugu'], to: ['new york', 'london', 'dubai', 'toronto', 'paris', 'beijing', 'houston', 'chicago'], zone: 'international', multiplier: 2.5 },
]

function determineZone(origin: string, destination: string): { zone: DistanceZone; multiplier: number } {
  const o = origin.toLowerCase().trim()
  const d = destination.toLowerCase().trim()
  for (const dz of distanceZones) {
    const fromMatch = dz.from.some((f) => o.includes(f) || f.includes(o))
    const toMatch = dz.to.some((t) => d.includes(t) || t.includes(d))
    if (fromMatch && toMatch) return { zone: dz.zone, multiplier: dz.multiplier }
  }
  if (!o || !d) return { zone: 'international', multiplier: 2.5 }
  if (o === d) return { zone: 'domestic', multiplier: 1.0 }
  return { zone: 'international', multiplier: 2.5 }
}

function calculatePrice(params: {
  origin: string
  destination: string
  weight: number
  length: number
  width: number
  height: number
  packageType: PackageType
  insurance: InsuranceLevel
  method: ShippingMethod
}): PriceBreakdown {
  const method = methodConfig[params.method]
  const pkg = packageConfig[params.packageType]
  const ins = insuranceConfig[params.insurance]
  const { multiplier: distanceMultiplier } = determineZone(params.origin, params.destination)

  const volumetricWeight = (params.length * params.width * params.height) / 5000
  const chargeableWeight = Math.max(params.weight, volumetricWeight)

  const weightCharge = chargeableWeight * method.rate
  const dimensionSurcharge = volumetricWeight > params.weight ? (volumetricWeight - params.weight) * method.rate * 0.3 : 0
  const packageSurcharge = weightCharge * pkg.surcharge
  const baseRate = weightCharge + dimensionSurcharge + packageSurcharge
  const distanceCharge = baseRate * (distanceMultiplier - 1)
  const subtotal = baseRate + distanceCharge
  const insuranceCost = ins.flat + subtotal * ins.pct
  const total = subtotal + insuranceCost

  return {
    baseRate: baseRate,
    weightCharge,
    dimensionSurcharge,
    distanceMultiplier,
    packageSurcharge,
    insuranceCost,
    total: Math.round(total * 100) / 100,
    currency: 'USD',
  }
}

const zoneLabels: Record<DistanceZone, { label: string; badge: string }> = {
  domestic: { label: 'Domestic', badge: 'Same Country' },
  regional: { label: 'Regional', badge: 'Same Continent' },
  international: { label: 'International', badge: 'Cross-Continent' },
}

function FormField({ label, children, icon }: { label: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)]">
        {icon && <span className="text-tsg-500">{icon}</span>}
        {label}
      </div>
      {children}
    </div>
  )
}

function BreakdownRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center justify-between py-2 ${highlight ? '' : 'border-b border-[var(--border-subtle)]'}`}
    >
      <span className={`text-sm ${highlight ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
        {label}
      </span>
      <span className={`text-sm font-semibold ${highlight ? 'text-tsg-500 text-lg' : 'text-[var(--text-primary)]'}`}>
        {value}
      </span>
    </motion.div>
  )
}

function ResultCard({ breakdown, method, origin, destination }: { breakdown: PriceBreakdown; method: ShippingMethod; origin: string; destination: string }) {
  const mc = methodConfig[method]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      {/* Price Hero */}
      <Card variant="elevated" className="overflow-hidden">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-tsg-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gold-500/10 blur-3xl" />
          </div>
          <CardContent className="p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="success" size="sm">Estimated</Badge>
                  <mc.icon className="h-4 w-4 text-tsg-500" />
                  <span className="text-sm font-medium text-[var(--text-secondary)]">{mc.label}</span>
                </div>
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
                  className="text-4xl sm:text-5xl font-bold text-tsg-500 mt-1"
                >
                  ${breakdown.total.toFixed(2)}
                  <span className="text-base font-normal text-[var(--text-muted)]"> USD</span>
                </motion.p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Estimated delivery: <span className="font-semibold text-[var(--text-primary)]">{mc.days}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="gold" size="lg">
                  Book Now <HiArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Breakdown + Details grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Price Breakdown */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <HiCalculator className="h-5 w-5 text-tsg-500" />
              <Text variant="h6">Price Breakdown</Text>
            </div>
            <div>
              <BreakdownRow label="Weight Charge" value={`$${breakdown.weightCharge.toFixed(2)}`} />
              <BreakdownRow label="Dimension Surcharge" value={`$${breakdown.dimensionSurcharge.toFixed(2)}`} />
              <BreakdownRow label="Package Adjustment" value={`$${breakdown.packageSurcharge.toFixed(2)}`} />
              <BreakdownRow label="Distance Multiplier" value={`${breakdown.distanceMultiplier.toFixed(1)}×`} />
              <BreakdownRow label="Distance Surcharge" value={`$${(breakdown.baseRate * (breakdown.distanceMultiplier - 1)).toFixed(2)}`} />
              <BreakdownRow label="Insurance" value={`$${breakdown.insuranceCost.toFixed(2)}`} />
              <div className="pt-2 mt-2 border-t-2 border-tsg-500/20">
                <BreakdownRow label="Total Estimated" value={`$${breakdown.total.toFixed(2)}`} highlight />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Details */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <HiGlobe className="h-5 w-5 text-tsg-500" />
              <Text variant="h6">Shipping Summary</Text>
            </div>
            <div className="divide-y divide-[var(--border-subtle)]">
              <SummaryRow icon={<HiLocationMarker className="h-4 w-4" />} label="Service" value={mc.label} />
              <SummaryRow icon={<HiClock className="h-4 w-4" />} label="Transit Time" value={mc.days} />
              <SummaryRow icon={<HiCube className="h-4 w-4" />} label="Zone" value={zoneLabels[determineZone(origin, destination).zone].badge} />
              <SummaryRow icon={<HiShieldCheck className="h-4 w-4" />} label="Coverage" value={mc.label} />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-tsg-50 text-tsg-500 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--text-muted)]">{label}</p>
        <p className="text-sm font-semibold text-[var(--text-primary)]">{value}</p>
      </div>
    </div>
  )
}

export function QuotePage() {
  const [originCountry, setOriginCountry] = useState('')
  const [originCity, setOriginCity] = useState('')
  const [destinationCountry, setDestinationCountry] = useState('')
  const [destinationCity, setDestinationCity] = useState('')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [packageType, setPackageType] = useState<PackageType>('box')
  const [insurance, setInsurance] = useState<InsuranceLevel>('none')
  const [method, setMethod] = useState<ShippingMethod>('standard')
  const [result, setResult] = useState<PriceBreakdown | null>(null)
  const [calculating, setCalculating] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)

  const handleCalculate = useCallback(() => {
    const w = parseFloat(weight)
    const l = parseFloat(length) || 0
    const wi = parseFloat(width) || 0
    const h = parseFloat(height) || 0
    const originLabel = [originCity, originCountry].filter(Boolean).join(', ')
    const destinationLabel = [destinationCity, destinationCountry].filter(Boolean).join(', ')

    if (!originLabel || !destinationLabel || !w || w <= 0) return

    setCalculating(true)
    setResult(null)

    setTimeout(() => {
      const price = calculatePrice({
        origin: originLabel,
        destination: destinationLabel,
        weight: w,
        length: l,
        width: wi,
        height: h,
        packageType,
        insurance,
        method,
      })
      setResult(price)
      setCalculating(false)
      setHasCalculated(true)
    }, 800)
  }, [originCity, originCountry, destinationCity, destinationCountry, weight, length, width, height, packageType, insurance, method])

  const handleReset = () => {
    setResult(null)
    setHasCalculated(false)
  }

  const isValid = !!originCountry && !!originCity && !!destinationCountry && !!destinationCity && parseFloat(weight) > 0

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-18">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-tsg-500/8 blur-3xl" />
          <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-gold-500/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="warning" size="lg" className="mb-5">
              Shipping Calculator
            </Badge>
            <Text variant="h1" className="mb-4">
              Estimate Your{' '}
              <span className="bg-gradient-to-r from-tsg-400 to-gold-500 bg-clip-text text-transparent">
                Shipping Cost
              </span>
            </Text>
            <Text variant="subtitle" className="max-w-lg mx-auto mb-0">
              Fill in the details below and get an instant price estimate for your shipment.
            </Text>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card variant="elevated">
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-6">
                    {/* Row 1: Origin & Destination */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      <FormField label="Origin" icon={<HiLocationMarker className="h-3.5 w-3.5" />}>
                        <CountryCitySelect
                          label="Origin"
                          countryValue={originCountry}
                          cityValue={originCity}
                          onCountryChange={setOriginCountry}
                          onCityChange={setOriginCity}
                        />
                      </FormField>
                      <FormField label="Destination" icon={<HiGlobe className="h-3.5 w-3.5" />}>
                        <CountryCitySelect
                          label="Destination"
                          countryValue={destinationCountry}
                          cityValue={destinationCity}
                          onCountryChange={setDestinationCountry}
                          onCityChange={setDestinationCity}
                        />
                      </FormField>
                    </div>

                    {/* Row 2: Weight & Dimensions */}
                    <div className="grid sm:grid-cols-4 gap-4">
                      <FormField label="Weight (kg)" icon={<HiScale className="h-3.5 w-3.5" />}>
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          step="0.1"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </FormField>
                      <FormField label="Length (cm)" icon={<HiCube className="h-3.5 w-3.5" />}>
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                        />
                      </FormField>
                      <FormField label="Width (cm)" icon={<HiCube className="h-3.5 w-3.5" />}>
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                        />
                      </FormField>
                      <FormField label="Height (cm)" icon={<HiCube className="h-3.5 w-3.5" />}>
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </FormField>
                    </div>

                    {/* Row 3: Package Type, Insurance, Method */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <FormField label="Package Type" icon={<HiCube className="h-3.5 w-3.5" />}>
                        <Select
                          value={packageType}
                          onChange={(e) => setPackageType(e.target.value as PackageType)}
                          options={[
                            { value: 'box', label: 'Box' },
                            { value: 'envelope', label: 'Envelope' },
                            { value: 'pallet', label: 'Pallet' },
                            { value: 'tube', label: 'Tube' },
                            { value: 'custom', label: 'Custom' },
                          ]}
                        />
                      </FormField>
                      <FormField label="Insurance" icon={<HiShieldCheck className="h-3.5 w-3.5" />}>
                        <Select
                          value={insurance}
                          onChange={(e) => setInsurance(e.target.value as InsuranceLevel)}
                          options={[
                            { value: 'none', label: 'No Insurance' },
                            { value: 'basic', label: 'Basic ($15)' },
                            { value: 'premium', label: 'Premium ($25 + 2%)' },
                            { value: 'full', label: 'Full Coverage ($50 + 5%)' },
                          ]}
                        />
                      </FormField>
                      <FormField label="Shipping Method" icon={<HiLightningBolt className="h-3.5 w-3.5" />}>
                        <Select
                          value={method}
                          onChange={(e) => setMethod(e.target.value as ShippingMethod)}
                          options={[
                            { value: 'economy', label: 'Economy' },
                            { value: 'standard', label: 'Standard' },
                            { value: 'express', label: 'Express' },
                            { value: 'same_day', label: 'Same Day' },
                          ]}
                        />
                      </FormField>
                    </div>

                    {/* Method descriptions */}
                    <motion.div
                      initial={false}
                      animate={{ height: method ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-xl bg-tsg-50 p-4 flex items-start gap-3">
                        {(() => {
                          const mc = methodConfig[method]
                          const Icon = mc.icon
                          return (
                            <>
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-tsg-500 text-white shrink-0">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-tsg-500">{mc.label}</p>
                                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{mc.desc}</p>
                                <p className="text-xs text-[var(--text-muted)] mt-0.5">Delivery: {mc.days}</p>
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    </motion.div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        variant="gold"
                        size="xl"
                        onClick={handleCalculate}
                        disabled={!isValid || calculating}
                        className="flex-1"
                      >
                        {calculating ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                            />
                            Calculating...
                          </>
                        ) : (
                          <>
                            <HiCalculator className="h-5 w-5" />
                            Calculate Rate
                          </>
                        )}
                      </Button>
                      {hasCalculated && (
                        <Button variant="outline" size="xl" onClick={handleReset}>
                          <HiRefresh className="h-5 w-5" />
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                {result && <ResultCard key="result" breakdown={result} method={method} origin={[originCity, originCountry].filter(Boolean).join(', ')} destination={[destinationCity, destinationCountry].filter(Boolean).join(', ')} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
