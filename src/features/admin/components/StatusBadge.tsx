import { Badge, type badgeVariants } from '@/components/ui/Badge'
import type { VariantProps } from 'class-variance-authority'

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant']

export const customerStatusMap: Record<string, BadgeVariant> = {
  active: 'success',
  inactive: 'neutral',
  pending: 'warning',
  blocked: 'danger',
}

export const customerSegmentMap: Record<string, BadgeVariant> = {
  retail: 'neutral',
  corporate: 'primary',
  sme: 'info',
  enterprise: 'warning',
}

export const shipmentStatusMap: Record<string, BadgeVariant> = {
  pending: 'warning',
  in_transit: 'info',
  delivered: 'success',
  on_hold: 'default',
  cancelled: 'danger',
  returned: 'neutral',
}

export const shipmentTypeMap: Record<string, BadgeVariant> = {
  air: 'info',
  sea: 'primary',
  road: 'default',
}

export const priorityMap: Record<string, BadgeVariant> = {
  standard: 'neutral',
  express: 'info',
  urgent: 'danger',
}

export const paymentStatusMap: Record<string, BadgeVariant> = {
  paid: 'success',
  pending: 'warning',
  failed: 'danger',
  refunded: 'neutral',
}

export const paymentMethodMap: Record<string, BadgeVariant> = {
  card: 'primary',
  bank_transfer: 'info',
  mobile_money: 'default',
  cash: 'success',
}

export const invoiceStatusMap: Record<string, BadgeVariant> = {
  draft: 'neutral',
  sent: 'info',
  paid: 'success',
  overdue: 'danger',
  void: 'default',
}

export const quoteStatusMap: Record<string, BadgeVariant> = {
  new: 'primary',
  sent: 'info',
  accepted: 'success',
  rejected: 'danger',
  expired: 'neutral',
}

export const quoteSourceMap: Record<string, BadgeVariant> = {
  web: 'info',
  admin: 'primary',
  api: 'default',
}

export const staffStatusMap: Record<string, BadgeVariant> = {
  active: 'success',
  on_leave: 'warning',
  suspended: 'danger',
  invited: 'info',
}

export const notificationTypeMap: Record<string, BadgeVariant> = {
  shipment: 'info',
  payment: 'success',
  system: 'default',
  alert: 'danger',
  promo: 'warning',
}

export const notificationPriorityMap: Record<string, BadgeVariant> = {
  low: 'neutral',
  normal: 'default',
  high: 'warning',
  critical: 'danger',
}

export const reportCategoryMap: Record<string, BadgeVariant> = {
  financial: 'success',
  operations: 'info',
  analytics: 'primary',
  compliance: 'warning',
  fleet: 'neutral',
}

export const reportStatusMap: Record<string, BadgeVariant> = {
  ready: 'success',
  generating: 'warning',
  scheduled: 'info',
  failed: 'danger',
}

export const reportFormatMap: Record<string, BadgeVariant> = {
  pdf: 'danger',
  csv: 'info',
  xlsx: 'success',
}

function humanize(value: string) {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

interface StatusBadgeProps {
  value: string
  variantMap: Record<string, BadgeVariant>
  dot?: boolean
  label?: string
}

export function StatusBadge({ value, variantMap, dot = true, label }: StatusBadgeProps) {
  return (
    <Badge variant={variantMap[value] ?? 'neutral'} dot={dot}>
      {label ?? humanize(value)}
    </Badge>
  )
}
