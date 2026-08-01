export type CustomerSegment = 'retail' | 'corporate' | 'sme' | 'enterprise'
export type CustomerStatus = 'active' | 'inactive' | 'pending' | 'blocked'

export interface AdminCustomer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  city: string
  country: string
  segment: CustomerSegment
  status: CustomerStatus
  totalShipments: number
  totalSpent: number
  lastActive: string
  joined: string
}

export type ShipmentMode = 'air' | 'sea' | 'road'
export type ShipmentStatus = 'pending' | 'in_transit' | 'delivered' | 'on_hold' | 'cancelled' | 'returned'
export type ShipmentPriority = 'standard' | 'express' | 'urgent'
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export interface AdminShipment {
  id: string
  customer: string
  customerId: string
  origin: string
  destination: string
  type: ShipmentMode
  status: ShipmentStatus
  priority: ShipmentPriority
  weight: number
  cost: number
  paymentStatus: PaymentStatus
  courier: string
  createdAt: string
  eta: string
}

export interface AdminPayment {
  id: string
  reference: string
  customer: string
  invoice: string
  description: string
  amount: number
  fee: number
  method: 'card' | 'bank_transfer' | 'mobile_money' | 'cash'
  status: PaymentStatus
  date: string
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'void'

export interface AdminInvoice {
  id: string
  customer: string
  amount: number
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  paidDate?: string
  items: number
  poNumber: string
}

export type QuoteStatus = 'new' | 'sent' | 'accepted' | 'rejected' | 'expired'
export type QuoteSource = 'web' | 'admin' | 'api'

export interface AdminQuote {
  id: string
  customer: string
  service: ShipmentMode | 'warehousing' | 'last_mile'
  origin: string
  destination: string
  weight: number
  amount: number
  status: QuoteStatus
  source: QuoteSource
  createdAt: string
  validUntil: string
}

export type StaffStatus = 'active' | 'on_leave' | 'suspended' | 'invited'

export interface AdminStaff {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  location: string
  hireDate: string
  lastActive: string
  status: StaffStatus
}

export interface RolePermission {
  key: string
  label: string
  granted: boolean
}

export interface RolePermissionGroup {
  group: string
  items: RolePermission[]
}

export interface AdminRole {
  id: string
  name: string
  description: string
  level: 'System' | 'Administrator' | 'Manager' | 'Operator' | 'Viewer'
  permissions: RolePermissionGroup[]
  members: number
  status: 'active' | 'archived'
  updatedAt: string
}

export type NotificationType = 'shipment' | 'payment' | 'system' | 'alert' | 'promo'
export type NotificationPriority = 'low' | 'normal' | 'high' | 'critical'

export interface AdminNotification {
  id: string
  title: string
  message: string
  type: NotificationType
  priority: NotificationPriority
  status: 'read' | 'unread'
  audience: string
  createdAt: string
}

export type ReportCategory = 'financial' | 'operations' | 'analytics' | 'compliance' | 'fleet'
export type ReportFormat = 'pdf' | 'csv' | 'xlsx'
export type ReportStatus = 'ready' | 'generating' | 'scheduled' | 'failed'

export interface AdminReport {
  id: string
  title: string
  category: ReportCategory
  schedule: 'on_demand' | 'daily' | 'weekly' | 'monthly'
  period: string
  format: ReportFormat
  size: string
  status: ReportStatus
  generated: string
  downloads: number
}
