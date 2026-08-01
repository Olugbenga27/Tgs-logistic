import type {
  AdminCustomer,
  AdminInvoice,
  AdminNotification,
  AdminPayment,
  AdminQuote,
  AdminReport,
  AdminRole,
  AdminShipment,
  AdminStaff,
} from './types'

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(items: readonly T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)]
}

function range(rng: () => number, start: number, end: number) {
  return start + Math.floor(rng() * (end - start + 1))
}

const firstNames = [
  'Amara', 'Kwame', 'Aisha', 'Tunde', 'Zainab', 'Chidi', 'Fatima', 'Emeka',
  'Ngozi', 'Kofi', 'Sade', 'Ibrahim', 'Yemi', 'Lamin', 'Adaeze', 'Moses',
  'Halima', 'Olu', 'Chioma', 'Daniella', 'Marcus', 'Elena', 'David', 'Grace',
]
const lastNames = [
  'Okafor', 'Mensah', 'Balogun', 'Abubakar', 'Okonkwo', 'Diallo', 'Adeyemi',
  'Achebe', 'Bello', 'Boateng', 'Nwosu', 'Kamara', 'Afolabi', 'Sesay', 'Eze',
  'Diop', 'Lawal', 'Traore', 'Okoye', 'Osei', 'Keita', 'Umaru', 'Mbeki', 'Silva',
]
const companies = [
  'TransCargo Ltd', 'Novatek Holdings', 'Baobab Exports', 'Savanna Traders',
  'Kente Textiles', 'Atlas Freight Co', 'Zenith Produce', 'Marigold Imports',
  'Volta Electronics', 'Kilimanjaro Coffee', 'Delta Commodities', 'Sterling Motors',
  'Coastal Pharma', 'Sahara Logistics', 'Golden Gate Foods', 'Meridian Tech',
  'Cedar Home Goods', 'Oasis Oil & Gas', 'Tropic Fruit Co', 'Blue Nile Trading',
  'Harvest Agro', 'Iroko Furniture', 'Lagos Depot', 'Accra Distribution',
]
const cities = [
  'Lagos', 'Accra', 'Nairobi', 'Cape Town', 'Abuja', 'Kampala', 'Dar es Salaam',
  'Dakar', 'Kigali', 'Johannesburg', 'Accra', 'Lagos', 'Nairobi', 'Casablanca',
]
const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Tanzania', 'Senegal',
  'Rwanda', 'Morocco', 'Cameroon',
]

function makeEmail(first: string, last: string, company: string) {
  const slug = company.toLowerCase().replace(/[^a-z0-9]/g, '')
  return `${first.toLowerCase()}.${last.toLowerCase()}@${slug}.com`
}

function daysAgo(n: number) {
  const d = new Date('2026-08-01T00:00:00Z')
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

const pct = (rng: () => number, p: number) => rng() < p

const customersRng = mulberry32(11)
const shipmentsRng = mulberry32(22)
const paymentsRng = mulberry32(33)
const invoicesRng = mulberry32(44)
const quotesRng = mulberry32(55)
const staffRng = mulberry32(66)
const notificationsRng = mulberry32(77)
const reportsRng = mulberry32(88)

const customerNames: { id: string; name: string; email: string; phone: string; company: string }[] = []
for (let i = 1; i <= 22; i++) {
  const first = pick(firstNames, customersRng)
  const last = pick(lastNames, customersRng)
  const company = pick(companies, customersRng)
  customerNames.push({
    id: `CUS-${1000 + i}`,
    name: `${first} ${last}`,
    email: makeEmail(first, last, company),
    phone: `+233 ${range(customersRng, 20, 99)} ${range(customersRng, 100, 999)} ${range(customersRng, 1000, 9999)}`,
    company,
  })
}

export const mockAdminCustomers: AdminCustomer[] = customerNames.map((c) => {
  const joined = daysAgo(range(customersRng, 20, 540))
  const segment = pick(['retail', 'corporate', 'sme', 'enterprise'] as const, customersRng)
  const status = pct(customersRng, 0.72) ? 'active' : pct(customersRng, 0.5) ? 'inactive' : pct(customersRng, 0.6) ? 'pending' : 'blocked'
  return {
    ...c,
    city: pick(cities, customersRng),
    country: pick(countries, customersRng),
    segment,
    status,
    totalShipments: range(customersRng, 1, 380),
    totalSpent: range(customersRng, 250, 185000),
    lastActive: daysAgo(range(customersRng, 0, 60)),
    joined,
  }
})

const shipmentCities = [
  ['Lagos', 'Accra'],
  ['Shanghai', 'Mombasa'],
  ['Dubai', 'Lagos'],
  ['Rotterdam', 'Tema'],
  ['Shenzhen', 'Cape Town'],
  ['Istanbul', 'Dakar'],
  ['Mumbai', 'Mombasa'],
  ['Hamburg', 'Casablanca'],
  ['Bangkok', 'Dar es Salaam'],
  ['New York', 'Lagos'],
  ['Guangzhou', 'Durban'],
  ['London', 'Kigali'],
  ['Antwerp', 'Abidjan'],
  ['Alexandria', 'Nairobi'],
  ['Miami', 'Accra'],
  ['Colombo', 'Mombasa'],
]

const shipmentStatuses: AdminShipment['status'][] = [
  'in_transit', 'delivered', 'pending', 'on_hold', 'in_transit', 'pending',
  'cancelled', 'delivered', 'in_transit', 'on_hold', 'delivered', 'returned',
  'pending', 'in_transit', 'on_hold', 'delivered', 'cancelled', 'in_transit',
  'pending', 'delivered', 'in_transit', 'on_hold', 'pending', 'delivered',
]

export const mockAdminShipments: AdminShipment[] = Array.from({ length: 24 }, (_, i) => {
  const [origin, destination] = shipmentCities[i % shipmentCities.length]
  const customer = pick(customerNames, shipmentsRng)
  const type = pick(['air', 'sea', 'road'] as const, shipmentsRng)
  const priority = pick(['standard', 'express', 'urgent'] as const, shipmentsRng)
  const weight = type === 'sea' ? range(shipmentsRng, 800, 24000) : type === 'air' ? range(shipmentsRng, 12, 900) : range(shipmentsRng, 150, 9000)
  const rate = type === 'air' ? 4.2 : type === 'sea' ? 0.8 : 1.9
  const cost = Math.round(weight * rate * (priority === 'urgent' ? 1.5 : priority === 'express' ? 1.2 : 1))
  const paymentStatus = pct(shipmentsRng, 0.62) ? 'paid' : pct(shipmentsRng, 0.6) ? 'pending' : pct(shipmentsRng, 0.7) ? 'failed' : 'refunded'
  return {
    id: `SH-2026-${String(421 + i)}`,
    customer: customer.name,
    customerId: customer.id,
    origin,
    destination,
    type,
    status: shipmentStatuses[i],
    priority,
    weight,
    cost,
    paymentStatus,
    courier: pick(['TSG Air', 'TSG Sea', 'TSG Road', 'Partner Express', 'Blue Waters Shipping'], shipmentsRng),
    createdAt: daysAgo(range(shipmentsRng, 0, 21)),
    eta: daysAgo(range(shipmentsRng, -7, 30)),
  }
})

export const mockAdminPayments: AdminPayment[] = Array.from({ length: 26 }, (_, i) => {
  const customer = pick(customerNames, paymentsRng)
  const method = pick(['card', 'bank_transfer', 'mobile_money', 'cash'] as const, paymentsRng)
  const statusRoll = paymentsRng()
  const status = statusRoll < 0.62 ? 'paid' : statusRoll < 0.82 ? 'pending' : statusRoll < 0.93 ? 'failed' : 'refunded'
  const amount = range(paymentsRng, 120, 24000)
  const fee = Math.round(amount * 0.025)
  const description = pick([
    'Freight charges – SH-2026',
    'Customs clearance fee',
    'Warehouse storage (Q3)',
    'Last-mile delivery',
    'Insurance premium',
    'Demurrage surcharge',
  ], paymentsRng)
  return {
    id: `PAY-2026-${String(900 + i)}`,
    reference: `TXN-${range(paymentsRng, 100000, 999999)}`,
    customer: customer.name,
    invoice: `INV-2026-${String(1800 + i)}`,
    description,
    amount,
    fee,
    method,
    status,
    date: daysAgo(range(paymentsRng, 0, 40)),
  }
})

export const mockAdminInvoices: AdminInvoice[] = Array.from({ length: 22 }, (_, i) => {
  const customer = pick(customerNames, invoicesRng)
  const status = pick(['draft', 'sent', 'paid', 'overdue', 'void'] as const, invoicesRng)
  const amount = range(invoicesRng, 150, 42000)
  const issue = daysAgo(range(invoicesRng, 0, 30))
  const due = daysAgo(range(invoicesRng, -10, 45))
  return {
    id: `INV-2026-${String(1800 + i)}`,
    customer: customer.name,
    amount,
    status,
    issueDate: issue,
    dueDate: due,
    paidDate: status === 'paid' ? daysAgo(range(invoicesRng, 1, 14)) : undefined,
    items: range(invoicesRng, 1, 8),
    poNumber: `PO-${range(invoicesRng, 5000, 8999)}`,
  }
})

export const mockAdminQuotes: AdminQuote[] = Array.from({ length: 20 }, (_, i) => {
  const [origin, destination] = shipmentCities[i % shipmentCities.length]
  const customer = pick(customerNames, quotesRng)
  const service = pick(['air', 'sea', 'road', 'warehousing', 'last_mile'] as const, quotesRng)
  const weight = service === 'sea' ? range(quotesRng, 600, 18000) : range(quotesRng, 10, 2500)
  const status = pick(['new', 'sent', 'accepted', 'rejected', 'expired'] as const, quotesRng)
  const source = pct(quotesRng, 0.55) ? 'web' : pct(quotesRng, 0.6) ? 'admin' : 'api'
  const amount = Math.round(weight * (service === 'air' ? 3.6 : service === 'sea' ? 0.7 : service === 'road' ? 1.6 : 1.1))
  return {
    id: `QTE-2026-${String(700 + i)}`,
    customer: customer.name,
    service,
    origin,
    destination,
    weight,
    amount,
    status,
    source,
    createdAt: daysAgo(range(quotesRng, 0, 25)),
    validUntil: daysAgo(range(quotesRng, -7, 14)),
  }
})

const departments = ['Operations', 'Finance', 'Customer Support', 'Sales', 'IT', 'Human Resources', 'Warehouse']
const roleTitles = [
  'Branch Manager', 'Logistics Coordinator', 'Customs Officer', 'Accountant',
  'Customer Support Lead', 'Warehouse Supervisor', 'Fleet Dispatcher',
  'Finance Analyst', 'Sales Executive', 'Operations Director',
]
const staffStatuses: AdminStaff['status'][] = [
  'active', 'active', 'active', 'active', 'active', 'active',
  'active', 'active', 'on_leave', 'active', 'active', 'on_leave',
  'active', 'suspended', 'active', 'invited', 'active', 'active',
]

export const mockAdminStaff: AdminStaff[] = Array.from({ length: 18 }, (_, i) => {
  const first = pick(firstNames, staffRng)
  const last = pick(lastNames, staffRng)
  return {
    id: `STF-${String(201 + i)}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@tsglogistics.com`,
    phone: `+233 ${range(staffRng, 20, 99)} ${range(staffRng, 100, 999)} ${range(staffRng, 1000, 9999)}`,
    role: pick(roleTitles, staffRng),
    department: pick(departments, staffRng),
    location: pick(cities, staffRng),
    hireDate: daysAgo(range(staffRng, 90, 2200)),
    lastActive: daysAgo(range(staffRng, 0, 12)),
    status: staffStatuses[i],
  }
})

const permissionMatrix: Record<string, { group: string; items: { key: string; label: string }[] }[]> = {
  System: [
    {
      group: 'Billing & Invoicing',
      items: [
        { key: 'invoices.view', label: 'View invoices' },
        { key: 'invoices.issue', label: 'Issue invoices' },
        { key: 'invoices.refund', label: 'Process refunds' },
        { key: 'payments.manage', label: 'Manage payments' },
      ],
    },
    {
      group: 'Shipments',
      items: [
        { key: 'shipments.view', label: 'View shipments' },
        { key: 'shipments.create', label: 'Create shipments' },
        { key: 'shipments.assign', label: 'Assign couriers' },
        { key: 'shipments.cancel', label: 'Cancel shipments' },
      ],
    },
    {
      group: 'Customers',
      items: [
        { key: 'customers.view', label: 'View customers' },
        { key: 'customers.edit', label: 'Edit customers' },
        { key: 'customers.block', label: 'Block customers' },
      ],
    },
    {
      group: 'Administration',
      items: [
        { key: 'staff.manage', label: 'Manage staff' },
        { key: 'roles.manage', label: 'Manage roles' },
        { key: 'settings.manage', label: 'Manage settings' },
        { key: 'reports.view', label: 'View reports' },
      ],
    },
  ],
  Administrator: [
    {
      group: 'Billing & Invoicing',
      items: [
        { key: 'invoices.view', label: 'View invoices' },
        { key: 'invoices.issue', label: 'Issue invoices' },
        { key: 'invoices.refund', label: 'Process refunds' },
        { key: 'payments.manage', label: 'Manage payments' },
      ],
    },
    {
      group: 'Shipments',
      items: [
        { key: 'shipments.view', label: 'View shipments' },
        { key: 'shipments.create', label: 'Create shipments' },
        { key: 'shipments.assign', label: 'Assign couriers' },
        { key: 'shipments.cancel', label: 'Cancel shipments' },
      ],
    },
    {
      group: 'Customers',
      items: [
        { key: 'customers.view', label: 'View customers' },
        { key: 'customers.edit', label: 'Edit customers' },
        { key: 'customers.block', label: 'Block customers' },
      ],
    },
    {
      group: 'Administration',
      items: [
        { key: 'staff.manage', label: 'Manage staff' },
        { key: 'roles.manage', label: 'Manage roles' },
        { key: 'settings.manage', label: 'Manage settings' },
        { key: 'reports.view', label: 'View reports' },
      ],
    },
  ],
  Manager: [
    {
      group: 'Billing & Invoicing',
      items: [
        { key: 'invoices.view', label: 'View invoices' },
        { key: 'invoices.issue', label: 'Issue invoices' },
        { key: 'payments.manage', label: 'Manage payments' },
      ],
    },
    {
      group: 'Shipments',
      items: [
        { key: 'shipments.view', label: 'View shipments' },
        { key: 'shipments.create', label: 'Create shipments' },
        { key: 'shipments.assign', label: 'Assign couriers' },
        { key: 'shipments.cancel', label: 'Cancel shipments' },
      ],
    },
    {
      group: 'Customers',
      items: [
        { key: 'customers.view', label: 'View customers' },
        { key: 'customers.edit', label: 'Edit customers' },
      ],
    },
    {
      group: 'Administration',
      items: [{ key: 'reports.view', label: 'View reports' }],
    },
  ],
  Operator: [
    {
      group: 'Shipments',
      items: [
        { key: 'shipments.view', label: 'View shipments' },
        { key: 'shipments.create', label: 'Create shipments' },
        { key: 'shipments.assign', label: 'Assign couriers' },
      ],
    },
    {
      group: 'Customers',
      items: [{ key: 'customers.view', label: 'View customers' }],
    },
  ],
  Viewer: [
    {
      group: 'Shipments',
      items: [{ key: 'shipments.view', label: 'View shipments' }],
    },
    {
      group: 'Customers',
      items: [{ key: 'customers.view', label: 'View customers' }],
    },
  ],
}

const roleDefs: { name: string; description: string; level: AdminRole['level']; members: number }[] = [
  { name: 'System Admin', description: 'Full access to every module, settings and user management.', level: 'System', members: 2 },
  { name: 'Operations Manager', description: 'Oversees shipments, couriers and day-to-day operations.', level: 'Manager', members: 6 },
  { name: 'Branch Operator', description: 'Creates and assigns shipments for a specific branch.', level: 'Operator', members: 14 },
  { name: 'Finance Officer', description: 'Manages invoices, payments and refunds.', level: 'Manager', members: 4 },
  { name: 'Support Agent', description: 'Read access to customer and shipment records for support.', level: 'Viewer', members: 9 },
  { name: 'Read-Only Auditor', description: 'Compliance review access with no write permissions.', level: 'Viewer', members: 3 },
]

const denyRules: Record<AdminRole['level'], string[]> = {
  System: [],
  Administrator: ['settings.manage'],
  Manager: ['customers.block', 'staff.manage', 'roles.manage', 'settings.manage', 'invoices.refund'],
  Operator: ['customers.block', 'customers.edit', 'shipments.cancel', 'staff.manage', 'roles.manage', 'settings.manage', 'reports.view', 'invoices.refund', 'invoices.issue', 'payments.manage'],
  Viewer: ['customers.block', 'customers.edit', 'shipments.cancel', 'shipments.assign', 'shipments.create', 'staff.manage', 'roles.manage', 'settings.manage', 'reports.view', 'invoices.refund', 'invoices.issue', 'payments.manage'],
}

export const mockAdminRoles: AdminRole[] = roleDefs.map((def, i) => {
  const denied = new Set(denyRules[def.level])
  return {
    id: `ROLE-${String(10 + i)}`,
    name: def.name,
    description: def.description,
    level: def.level,
    permissions: permissionMatrix[def.level].map((group) => ({
      group: group.group,
      items: group.items.map((item) => ({
        key: item.key,
        label: item.label,
        granted: !denied.has(item.key),
      })),
    })),
    members: def.members,
    status: i === 5 ? 'archived' : 'active',
    updatedAt: daysAgo(range(notificationsRng, 2, 30)),
  }
})

export const mockAdminNotifications: AdminNotification[] = [
  {
    id: 'NOTIF-001',
    title: 'Customs delay on SH-2026-0451',
    message: 'Shipment to Mombasa is held at customs pending documentation review.',
    type: 'shipment',
    priority: 'critical',
    status: 'unread',
    audience: 'All operations staff',
    createdAt: daysAgo(0),
  },
  {
    id: 'NOTIF-002',
    title: 'Payment received from TransCargo Ltd',
    message: 'Invoice INV-2026-1801 marked as paid. Amount: $8,420.',
    type: 'payment',
    priority: 'high',
    status: 'unread',
    audience: 'Finance team',
    createdAt: daysAgo(0),
  },
  {
    id: 'NOTIF-003',
    title: 'New quote request – QTE-2026-0712',
    message: 'A corporate customer requested a quote for sea freight from Shanghai to Mombasa.',
    type: 'system',
    priority: 'high',
    status: 'unread',
    audience: 'Sales team',
    createdAt: daysAgo(1),
  },
  {
    id: 'NOTIF-004',
    title: 'Fuel surcharge notice',
    message: 'A 3.2% fuel surcharge will be applied to all air freight quotes from next week.',
    type: 'alert',
    priority: 'normal',
    status: 'read',
    audience: 'All customers',
    createdAt: daysAgo(2),
  },
  {
    id: 'NOTIF-005',
    title: 'Quarterly report ready',
    message: 'The Q3 2026 revenue report is available to download in PDF format.',
    type: 'system',
    priority: 'low',
    status: 'read',
    audience: 'Administrators',
    createdAt: daysAgo(3),
  },
  {
    id: 'NOTIF-006',
    title: 'Shipment SH-2026-0428 delivered',
    message: 'Delivery confirmed for shipment from Lagos to Accra.',
    type: 'shipment',
    priority: 'normal',
    status: 'read',
    audience: 'Customer + ops team',
    createdAt: daysAgo(3),
  },
  {
    id: 'NOTIF-007',
    title: 'New branch onboarding',
    message: 'The Kampala branch has been onboarded to the warehouse management system.',
    type: 'system',
    priority: 'normal',
    status: 'read',
    audience: 'All staff',
    createdAt: daysAgo(5),
  },
  {
    id: 'NOTIF-008',
    title: 'Maintenance window',
    message: 'System maintenance scheduled for Sunday 02:00–04:00 GMT. Expect brief downtime.',
    type: 'alert',
    priority: 'normal',
    status: 'read',
    audience: 'All users',
    createdAt: daysAgo(6),
  },
  {
    id: 'NOTIF-009',
    title: 'Staff accounts provisioned',
    message: '5 new staff accounts have been created and invitation emails sent.',
    type: 'system',
    priority: 'low',
    status: 'read',
    audience: 'Administrators',
    createdAt: daysAgo(7),
  },
  {
    id: 'NOTIF-010',
    title: 'Promo: Peak season rates',
    message: 'Discounted sea freight rates are available for bookings made before August 15.',
    type: 'promo',
    priority: 'low',
    status: 'read',
    audience: 'All customers',
    createdAt: daysAgo(8),
  },
  {
    id: 'NOTIF-011',
    title: 'Refund processed',
    message: 'Refund of $1,240 issued for cancelled shipment SH-2026-0430.',
    type: 'payment',
    priority: 'high',
    status: 'read',
    audience: 'Finance team',
    createdAt: daysAgo(9),
  },
  {
    id: 'NOTIF-012',
    title: 'Warehouse stock alert',
    message: 'Tema facility storage occupancy crossed 90%. Review inbound allocations.',
    type: 'alert',
    priority: 'high',
    status: 'read',
    audience: 'Warehouse managers',
    createdAt: daysAgo(10),
  },
]

const reportDefs: { title: string; category: AdminReport['category']; schedule: AdminReport['schedule']; format: AdminReport['format'] }[] = [
  { title: 'Monthly Revenue Summary', category: 'financial', schedule: 'monthly', format: 'pdf' },
  { title: 'Shipment Volume by Route', category: 'analytics', schedule: 'weekly', format: 'csv' },
  { title: 'Delivered vs Delayed (On-time %)', category: 'operations', schedule: 'weekly', format: 'xlsx' },
  { title: 'Top 20 Customers by Spend', category: 'analytics', schedule: 'monthly', format: 'xlsx' },
  { title: 'Accounts Receivable Aging', category: 'financial', schedule: 'weekly', format: 'pdf' },
  { title: 'Customs Compliance Register', category: 'compliance', schedule: 'monthly', format: 'pdf' },
  { title: 'Fleet Utilization Report', category: 'fleet', schedule: 'weekly', format: 'xlsx' },
  { title: 'Fuel Cost Analysis', category: 'financial', schedule: 'monthly', format: 'csv' },
  { title: 'Warehouse Occupancy Snapshot', category: 'operations', schedule: 'daily', format: 'csv' },
  { title: 'Claims & Damages Summary', category: 'compliance', schedule: 'monthly', format: 'pdf' },
  { title: 'Courier Performance Scorecard', category: 'operations', schedule: 'weekly', format: 'xlsx' },
  { title: 'Profit & Loss Statement', category: 'financial', schedule: 'monthly', format: 'pdf' },
]

export const mockAdminReports: AdminReport[] = reportDefs.map((def, i) => {
  const status = pick(['ready', 'ready', 'ready', 'generating', 'scheduled'] as const, reportsRng)
  return {
    id: `RPT-${String(300 + i)}`,
    title: def.title,
    category: def.category,
    schedule: def.schedule,
    period: 'Jul 2026',
    format: def.format,
    size: pick(['180 KB', '420 KB', '1.1 MB', '3.4 MB', '780 KB'], reportsRng),
    status,
    generated: daysAgo(range(reportsRng, 0, 28)),
    downloads: range(reportsRng, 0, 214),
  }
})
