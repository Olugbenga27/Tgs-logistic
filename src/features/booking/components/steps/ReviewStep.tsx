import { motion } from 'framer-motion'
import { HiUser, HiLocationMarker, HiCube, HiClock, HiTruck, HiCurrencyDollar } from 'react-icons/hi'
import type { BookingFormData, ShippingMethodOption, CourierOption } from '../booking-types'

interface Props {
  data: BookingFormData
}

const methods: ShippingMethodOption[] = [
  { id: 'economy', label: 'Economy', desc: '', days: '10–15 business days', rate: 2.50, icon: HiClock },
  { id: 'standard', label: 'Standard', desc: '', days: '5–10 business days', rate: 4.00, icon: HiClock },
  { id: 'express', label: 'Express', desc: '', days: '2–5 business days', rate: 7.50, icon: HiClock },
  { id: 'same_day', label: 'Same Day', desc: '', days: 'Same day', rate: 12.00, icon: HiClock },
]

const courierList: CourierOption[] = [
  { id: 'dhl', name: 'DHL', initials: 'D', rate: 12.50, deliveryDays: '3–5', rating: 4.8, color: '', bgColor: '' },
  { id: 'fedex', name: 'FedEx', initials: 'F', rate: 11.00, deliveryDays: '2–4', rating: 4.7, color: '', bgColor: '' },
  { id: 'ups', name: 'UPS', initials: 'U', rate: 10.75, deliveryDays: '3–6', rating: 4.6, color: '', bgColor: '' },
  { id: 'aramex', name: 'Aramex', initials: 'A', rate: 9.50, deliveryDays: '4–8', rating: 4.4, color: '', bgColor: '' },
]

function DetailCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-tsg-50 text-tsg-500 dark:bg-tsg-500/20">
          {icon}
        </div>
        <span className="text-sm font-semibold text-[var(--text-primary)]">{title}</span>
      </div>
      {children}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="font-medium text-[var(--text-secondary)]">{value}</span>
    </div>
  )
}

export function ReviewStep({ data }: Props) {
  const method = methods.find(m => m.id === data.shippingMethod)
  const courier = courierList.find(c => c.id === data.courier)
  const weight = Number(data.packageWeight) || 0
  const methodRate = method?.rate || 0
  const courierRate = courier?.rate || 0
  const effectiveRate = courierRate || methodRate
  const estimatedCost = (effectiveRate * weight).toFixed(2)

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Review Your Booking</h3>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Please review all details before submitting</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <DetailCard icon={<HiUser className="h-4 w-4" />} title="Sender">
          <Field label="Name" value={data.senderName} />
          <Field label="Email" value={data.senderEmail} />
          <Field label="Phone" value={data.senderPhone} />
          {data.senderCompany && <Field label="Company" value={data.senderCompany} />}
          <Field label="Address" value={`${data.senderAddress}, ${data.senderCity}`} />
          <Field label="Country" value={data.senderCountry} />
        </DetailCard>
        <DetailCard icon={<HiLocationMarker className="h-4 w-4" />} title="Receiver">
          <Field label="Name" value={data.receiverName} />
          <Field label="Email" value={data.receiverEmail} />
          <Field label="Phone" value={data.receiverPhone} />
          {data.receiverCompany && <Field label="Company" value={data.receiverCompany} />}
          <Field label="Address" value={`${data.receiverAddress}, ${data.receiverCity}`} />
          <Field label="Country" value={data.receiverCountry} />
        </DetailCard>
        <DetailCard icon={<HiCube className="h-4 w-4" />} title="Package">
          <Field label="Type" value={data.packageType} />
          <Field label="Weight" value={`${data.packageWeight} kg`} />
          <Field label="Dimensions" value={`${data.packageLength} × ${data.packageWidth} × ${data.packageHeight} cm`} />
          <Field label="Quantity" value={String(data.packageQuantity)} />
          <Field label="Description" value={data.packageDescription} />
        </DetailCard>
        <div className="space-y-4">
          <DetailCard icon={<HiClock className="h-4 w-4" />} title="Shipping Method">
            <Field label="Method" value={method?.label || data.shippingMethod} />
            <Field label="Delivery" value={method?.days || '-'} />
            <Field label="Rate" value={method ? `$${method.rate.toFixed(2)}/kg` : '-'} />
          </DetailCard>
          <DetailCard icon={<HiTruck className="h-4 w-4" />} title="Courier">
            <Field label="Provider" value={courier?.name || data.courier} />
            <Field label="Delivery" value={courier ? `${courier.deliveryDays} days` : '-'} />
            <Field label="Rate" value={courier ? `$${courier.rate.toFixed(2)}/kg` : '-'} />
          </DetailCard>
        </div>
      </div>
      <div className="rounded-xl border-2 border-tsg-500/30 bg-gradient-to-r from-tsg-50 to-tsg-50/50 p-5 dark:from-tsg-500/10 dark:to-tsg-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiCurrencyDollar className="h-5 w-5 text-tsg-500" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Estimated Total</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-tsg-600">${estimatedCost}</span>
            <p className="text-[11px] text-[var(--text-muted)]">
              {effectiveRate} × {weight}kg
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
