import type { User, Customer, Courier } from '@/types'

export const currentUser: User = {
  id: '1',
  name: 'Alex Rivera',
  email: 'alex@logistix.io',
  role: 'admin',
}

export const mockStats = {
  activeShipments: 142,
  pendingPickups: 38,
  deliveredToday: 89,
  warehouses: 12,
  fleetVehicles: 56,
  onTimeRate: 94.2,
  completedShipments: 1283,
  walletBalance: 45820.50,
  pendingPayments: { count: 6, amount: 3840.00 },
  totalDistance: 28450,
  avgDeliveryTime: '2.4',
  countries: 34,
  customerSatisfaction: 96.8,
}

export interface WalletTransaction {
  id: string
  type: 'payment' | 'withdrawal' | 'refund' | 'fee'
  description: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
  category: string
  reference: string
}

export const mockWalletHistory: WalletTransaction[] = [
  { id: 'TXN-001', type: 'payment', description: 'Payment from FedEx Contract', amount: 12500, date: '2026-07-30', status: 'completed', category: 'Revenue', reference: 'INV-2026-0842' },
  { id: 'TXN-002', type: 'withdrawal', description: 'Warehouse rental fee - East Coast Hub', amount: -3200, date: '2026-07-29', status: 'completed', category: 'Operations', reference: 'RENT-JUL-EWR' },
  { id: 'TXN-003', type: 'payment', description: 'DHL partnership invoice', amount: 8400, date: '2026-07-28', status: 'pending', category: 'Revenue', reference: 'INV-2026-0835' },
  { id: 'TXN-004', type: 'withdrawal', description: 'Fleet maintenance cost - Truck TRK-103', amount: -1800, date: '2026-07-27', status: 'completed', category: 'Maintenance', reference: 'MNT-TRK103' },
  { id: 'TXN-005', type: 'payment', description: 'UPS express delivery fee', amount: 5600, date: '2026-07-25', status: 'completed', category: 'Revenue', reference: 'INV-2026-0821' },
  { id: 'TXN-006', type: 'withdrawal', description: 'Employee payroll - Logistics team', amount: -9500, date: '2026-07-24', status: 'completed', category: 'Payroll', reference: 'PR-JUL-2026' },
  { id: 'TXN-007', type: 'payment', description: 'Aramex cross-border service', amount: 3200, date: '2026-07-23', status: 'completed', category: 'Revenue', reference: 'INV-2026-0814' },
  { id: 'TXN-008', type: 'fee', description: 'Bank processing fee', amount: -45, date: '2026-07-22', status: 'completed', category: 'Fees', reference: 'BNK-FEE-0722' },
  { id: 'TXN-009', type: 'refund', description: 'Refund - Damaged goods claim SH-009', amount: -780, date: '2026-07-21', status: 'completed', category: 'Claims', reference: 'CLM-SH009' },
  { id: 'TXN-010', type: 'payment', description: 'FedEx quarterly bonus', amount: 4500, date: '2026-07-20', status: 'pending', category: 'Revenue', reference: 'BNS-FDX-Q3' },
  { id: 'TXN-011', type: 'withdrawal', description: 'Office supplies & equipment', amount: -620, date: '2026-07-19', status: 'completed', category: 'Operations', reference: 'PO-2026-0451' },
  { id: 'TXN-012', type: 'payment', description: 'DHL express shipment fees', amount: 2100, date: '2026-07-18', status: 'completed', category: 'Revenue', reference: 'INV-2026-0802' },
  { id: 'TXN-013', type: 'fee', description: 'Annual subscription - Tracking platform', amount: -299, date: '2026-07-17', status: 'completed', category: 'Fees', reference: 'SUB-TRACK-2026' },
  { id: 'TXN-014', type: 'withdrawal', description: 'Fuel costs - Fleet operations', amount: -4100, date: '2026-07-16', status: 'pending', category: 'Operations', reference: 'FUEL-JUL-2026' },
  { id: 'TXN-015', type: 'payment', description: 'UPS international shipping', amount: 7800, date: '2026-07-15', status: 'completed', category: 'Revenue', reference: 'INV-2026-0795' },
]

export const mockWalletMonthly = [
  { month: 'Jan', income: 28500, expense: 14200 },
  { month: 'Feb', income: 31200, expense: 15800 },
  { month: 'Mar', income: 27800, expense: 13500 },
  { month: 'Apr', income: 34500, expense: 16200 },
  { month: 'May', income: 32100, expense: 14800 },
  { month: 'Jun', income: 38900, expense: 17500 },
  { month: 'Jul', income: 42300, expense: 19100 },
  { month: 'Aug', income: 40500, expense: 18300 },
  { month: 'Sep', income: 45200, expense: 20100 },
  { month: 'Oct', income: 42800, expense: 19500 },
  { month: 'Nov', income: 48100, expense: 21200 },
  { month: 'Dec', income: 52300, expense: 23800 },
]

export const mockAnalytics = {
  shipmentsByStatus: [
    { status: 'Delivered', count: 845, color: 'emerald' },
    { status: 'In Transit', count: 142, color: 'tsg' },
    { status: 'Pending', count: 67, color: 'amber' },
    { status: 'On Hold', count: 23, color: 'red' },
  ],
  monthlyShipments: [
    { month: 'Jan', count: 180 },
    { month: 'Feb', count: 210 },
    { month: 'Mar', count: 195 },
    { month: 'Apr', count: 240 },
    { month: 'May', count: 220 },
    { month: 'Jun', count: 270 },
    { month: 'Jul', count: 250 },
    { month: 'Aug', count: 290 },
    { month: 'Sep', count: 310 },
    { month: 'Oct', count: 280 },
    { month: 'Nov', count: 320 },
    { month: 'Dec', count: 350 },
  ],
}

function makeStatusHistory(status: string) {
  const base = [
    { status: 'Order Placed', date: '2026-07-25 09:00', location: 'Online' },
    { status: 'Picked Up', date: '2026-07-26 14:30', location: 'Origin facility' },
  ]
  if (status === 'in_transit') {
    base.push({ status: 'In Transit', date: '2026-07-27 03:00', location: 'Sorting center' })
  }
  if (status === 'delivered') {
    base.push(
      { status: 'In Transit', date: '2026-07-27 03:00', location: 'Sorting center' },
      { status: 'Out for Delivery', date: '2026-07-28 08:15', location: 'Local hub' },
      { status: 'Delivered', date: '2026-07-29 11:45', location: 'Destination address' },
    )
  }
  return base
}

export const mockShipments = [
  { id: 'SH-001', origin: 'New York', destination: 'Los Angeles', status: 'in_transit' as const, eta: '2026-08-02', carrier: 'FedEx', priority: 'high' as const, date: '2026-07-25', originAddress: '120 Broadway, New York, NY 10001', destinationAddress: '456 Sunset Blvd, Los Angeles, CA 90001', totalCost: 1240.50, weight: '45 kg', lastUpdate: '2026-07-27 03:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-002', origin: 'Chicago', destination: 'Miami', status: 'pending' as const, eta: '2026-08-04', carrier: 'UPS', priority: 'medium' as const, date: '2026-07-26', originAddress: '233 Michigan Ave, Chicago, IL 60601', destinationAddress: '788 Ocean Dr, Miami, FL 33101', totalCost: 680.00, weight: '22 kg', lastUpdate: '2026-07-26 14:30', statusHistory: makeStatusHistory('pending') },
  { id: 'SH-003', origin: 'Houston', destination: 'Seattle', status: 'delivered' as const, eta: '2026-07-29', carrier: 'DHL', priority: 'low' as const, date: '2026-07-22', originAddress: '500 Main St, Houston, TX 77001', destinationAddress: '321 Pike St, Seattle, WA 98101', totalCost: 890.25, weight: '30 kg', lastUpdate: '2026-07-29 11:45', statusHistory: makeStatusHistory('delivered') },
  { id: 'SH-004', origin: 'San Francisco', destination: 'Boston', status: 'in_transit' as const, eta: '2026-08-03', carrier: 'FedEx', priority: 'high' as const, date: '2026-07-27', originAddress: '100 Market St, San Francisco, CA 94101', destinationAddress: '900 Boylston St, Boston, MA 02101', totalCost: 1520.00, weight: '55 kg', lastUpdate: '2026-07-28 06:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-005', origin: 'Denver', destination: 'Atlanta', status: 'pending' as const, eta: '2026-08-05', carrier: 'UPS', priority: 'medium' as const, date: '2026-07-28', originAddress: '700 17th St, Denver, CO 80201', destinationAddress: '200 Peachtree St, Atlanta, GA 30301', totalCost: 745.00, weight: '18 kg', lastUpdate: '2026-07-28 10:00', statusHistory: makeStatusHistory('pending') },
  { id: 'SH-006', origin: 'Dallas', destination: 'Phoenix', status: 'delivered' as const, eta: '2026-07-30', carrier: 'Aramex', priority: 'low' as const, date: '2026-07-23', originAddress: '300 Main St, Dallas, TX 75201', destinationAddress: '500 Camelback Rd, Phoenix, AZ 85001', totalCost: 510.00, weight: '15 kg', lastUpdate: '2026-07-30 09:30', statusHistory: makeStatusHistory('delivered') },
  { id: 'SH-007', origin: 'Lagos', destination: 'New York', status: 'in_transit' as const, eta: '2026-08-06', carrier: 'DHL', priority: 'high' as const, date: '2026-07-28', originAddress: '10 Marina, Lagos Island, Lagos', destinationAddress: '1 World Trade Center, New York, NY 10001', totalCost: 2450.00, weight: '60 kg', lastUpdate: '2026-07-29 15:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-008', origin: 'Philadelphia', destination: 'Detroit', status: 'pending' as const, eta: '2026-08-07', carrier: 'FedEx', priority: 'medium' as const, date: '2026-07-29', originAddress: '200 Chestnut St, Philadelphia, PA 19101', destinationAddress: '100 Woodward Ave, Detroit, MI 48201', totalCost: 435.00, weight: '12 kg', lastUpdate: '2026-07-29 12:00', statusHistory: makeStatusHistory('pending') },
  { id: 'SH-009', origin: 'Ibadan', destination: 'London', status: 'in_transit' as const, eta: '2026-08-08', carrier: 'Aramex', priority: 'medium' as const, date: '2026-07-26', originAddress: '100 Ring Rd, Ibadan, Oyo State', destinationAddress: '10 Downing St, London SW1A 2AA', totalCost: 3200.00, weight: '75 kg', lastUpdate: '2026-07-28 22:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-010', origin: 'Miami', destination: 'Orlando', status: 'delivered' as const, eta: '2026-07-28', carrier: 'UPS', priority: 'low' as const, date: '2026-07-24', originAddress: '100 Biscayne Blvd, Miami, FL 33101', destinationAddress: '600 Universal Blvd, Orlando, FL 32801', totalCost: 195.00, weight: '8 kg', lastUpdate: '2026-07-28 16:00', statusHistory: makeStatusHistory('delivered') },
  { id: 'SH-011', origin: 'Portland', destination: 'Nashville', status: 'in_transit' as const, eta: '2026-08-04', carrier: 'FedEx', priority: 'high' as const, date: '2026-07-27', originAddress: '500 Hawthorne Blvd, Portland, OR 97201', destinationAddress: '300 Broadway, Nashville, TN 37201', totalCost: 880.00, weight: '28 kg', lastUpdate: '2026-07-29 08:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-012', origin: 'Minneapolis', destination: 'Charlotte', status: 'pending' as const, eta: '2026-08-09', carrier: 'DHL', priority: 'medium' as const, date: '2026-07-30', originAddress: '200 Nicollet Mall, Minneapolis, MN 55401', destinationAddress: '100 Trade St, Charlotte, NC 28201', totalCost: 610.00, weight: '20 kg', lastUpdate: '2026-07-30 08:00', statusHistory: makeStatusHistory('pending') },
  { id: 'SH-013', origin: 'Ile-Ife', destination: 'Dubai', status: 'in_transit' as const, eta: '2026-08-10', carrier: 'Aramex', priority: 'high' as const, date: '2026-07-27', originAddress: '10 OAU Rd, Ile-Ife, Osun State', destinationAddress: 'Sheikh Zayed Rd, Dubai, UAE', totalCost: 4100.00, weight: '90 kg', lastUpdate: '2026-07-29 12:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-014', origin: 'San Diego', destination: 'Las Vegas', status: 'delivered' as const, eta: '2026-07-31', carrier: 'UPS', priority: 'low' as const, date: '2026-07-25', originAddress: '300 Broadway, San Diego, CA 92101', destinationAddress: '200 Las Vegas Blvd, Las Vegas, NV 89101', totalCost: 340.00, weight: '10 kg', lastUpdate: '2026-07-31 10:00', statusHistory: makeStatusHistory('delivered') },
  { id: 'SH-015', origin: 'Austin', destination: 'Raleigh', status: 'pending' as const, eta: '2026-08-11', carrier: 'FedEx', priority: 'medium' as const, date: '2026-07-30', originAddress: '400 Congress Ave, Austin, TX 78701', destinationAddress: '200 Fayetteville St, Raleigh, NC 27601', totalCost: 550.00, weight: '16 kg', lastUpdate: '2026-07-30 09:00', statusHistory: makeStatusHistory('pending') },
  { id: 'SH-016', origin: 'Kansas City', destination: 'Columbus', status: 'in_transit' as const, eta: '2026-08-05', carrier: 'DHL', priority: 'medium' as const, date: '2026-07-28', originAddress: '100 Main St, Kansas City, MO 64101', destinationAddress: '500 High St, Columbus, OH 43201', totalCost: 475.00, weight: '14 kg', lastUpdate: '2026-07-29 18:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-017', origin: 'Abuja', destination: 'Accra', status: 'delivered' as const, eta: '2026-07-29', carrier: 'Aramex', priority: 'low' as const, date: '2026-07-22', originAddress: 'Central Business District, Abuja, FCT', destinationAddress: 'Independence Ave, Accra, Ghana', totalCost: 780.00, weight: '25 kg', lastUpdate: '2026-07-29 14:00', statusHistory: makeStatusHistory('delivered') },
  { id: 'SH-018', origin: 'Baltimore', destination: 'Louisville', status: 'pending' as const, eta: '2026-08-12', carrier: 'UPS', priority: 'low' as const, date: '2026-07-31', originAddress: '200 Light St, Baltimore, MD 21201', destinationAddress: '300 Main St, Louisville, KY 40201', totalCost: 320.00, weight: '9 kg', lastUpdate: '2026-07-31 07:00', statusHistory: makeStatusHistory('pending') },
  { id: 'SH-019', origin: 'Memphis', destination: 'Oklahoma City', status: 'in_transit' as const, eta: '2026-08-06', carrier: 'FedEx', priority: 'medium' as const, date: '2026-07-28', originAddress: '100 Beale St, Memphis, TN 38101', destinationAddress: '400 Park Ave, Oklahoma City, OK 73101', totalCost: 410.00, weight: '13 kg', lastUpdate: '2026-07-30 05:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-020', origin: 'Port Harcourt', destination: 'Cairo', status: 'in_transit' as const, eta: '2026-08-11', carrier: 'DHL', priority: 'high' as const, date: '2026-07-27', originAddress: '20 Trans Amadi, Port Harcourt, Rivers State', destinationAddress: '1 Tahrir Square, Cairo, Egypt', totalCost: 2800.00, weight: '65 kg', lastUpdate: '2026-07-29 20:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-021', origin: 'Milwaukee', destination: 'Birmingham', status: 'delivered' as const, eta: '2026-08-01', carrier: 'UPS', priority: 'low' as const, date: '2026-07-24', originAddress: '200 Wisconsin Ave, Milwaukee, WI 53201', destinationAddress: '100 20th St, Birmingham, AL 35201', totalCost: 390.00, weight: '11 kg', lastUpdate: '2026-08-01 13:00', statusHistory: makeStatusHistory('delivered') },
  { id: 'SH-022', origin: 'Omaha', destination: 'Richmond', status: 'pending' as const, eta: '2026-08-13', carrier: 'Aramex', priority: 'medium' as const, date: '2026-07-31', originAddress: '300 Farnam St, Omaha, NE 68101', destinationAddress: '100 Broad St, Richmond, VA 23201', totalCost: 520.00, weight: '17 kg', lastUpdate: '2026-07-31 10:00', statusHistory: makeStatusHistory('pending') },
  { id: 'SH-023', origin: 'Abuja', destination: 'Lagos', status: 'delivered' as const, eta: '2026-07-27', carrier: 'Aramex', priority: 'high' as const, date: '2026-07-21', originAddress: 'Central Business District, Abuja, FCT', destinationAddress: '10 Marina, Lagos Island, Lagos', totalCost: 450.00, weight: '20 kg', lastUpdate: '2026-07-27 16:00', statusHistory: makeStatusHistory('delivered') },
  { id: 'SH-024', origin: 'New Orleans', destination: 'Hartford', status: 'in_transit' as const, eta: '2026-08-07', carrier: 'FedEx', priority: 'medium' as const, date: '2026-07-29', originAddress: '200 Canal St, New Orleans, LA 70101', destinationAddress: '500 Main St, Hartford, CT 06101', totalCost: 680.00, weight: '22 kg', lastUpdate: '2026-07-30 14:00', statusHistory: makeStatusHistory('in_transit') },
  { id: 'SH-025', origin: 'Ibadan', destination: 'Abuja', status: 'in_transit' as const, eta: '2026-08-02', carrier: 'DHL', priority: 'high' as const, date: '2026-07-29', originAddress: '100 Ring Rd, Ibadan, Oyo State', destinationAddress: 'Central Business District, Abuja, FCT', totalCost: 320.00, weight: '10 kg', lastUpdate: '2026-07-30 06:00', statusHistory: makeStatusHistory('in_transit') },
]

export const mockTrackingEvents = [
  { location: 'New York Sort Facility', timestamp: '2026-07-30 08:15', status: 'picked_up' },
  { location: 'New York Sort Facility', timestamp: '2026-07-30 10:30', status: 'processed' },
  { location: 'En Route', timestamp: '2026-07-31 03:00', status: 'in_transit' },
]

export const mockWarehouses = [
  { id: 'WH-01', name: 'East Coast Hub', location: 'Newark, NJ', capacity: 85, utilization: 72 },
  { id: 'WH-02', name: 'West Coast Hub', location: 'Oakland, CA', capacity: 120, utilization: 68 },
  { id: 'WH-03', name: 'Central Distribution', location: 'Dallas, TX', capacity: 95, utilization: 81 },
]

export const mockFleet = [
  { id: 'TRK-101', driver: 'Maria Santos', status: 'active', lastService: '2026-07-15', nextService: '2026-08-15' },
  { id: 'TRK-102', driver: 'James Wilson', status: 'idle', lastService: '2026-07-10', nextService: '2026-08-10' },
  { id: 'TRK-103', driver: 'David Chen', status: 'maintenance', lastService: '2026-07-28', nextService: '2026-07-28' },
]

export const mockCustomers: Customer[] = [
  { id: 'CUST-001', name: 'Sarah Johnson', email: 'sarah.j@techcorp.com', phone: '+1 (212) 555-0198', company: 'TechCorp International', address: '350 Fifth Avenue', city: 'New York', createdAt: '2025-03-15', totalShipments: 47 },
  { id: 'CUST-002', name: 'Michael Chen', email: 'michael.c@globallog.com', phone: '+1 (415) 555-0421', company: 'Global Logistics Inc.', address: '200 Market Street', city: 'San Francisco', createdAt: '2025-04-22', totalShipments: 32 },
  { id: 'CUST-003', name: 'Emily Okafor', email: 'emily.o@afritrade.com', phone: '+234 (803) 555-7890', company: 'AfriTrade Ventures', address: '15B Admiralty Way', city: 'Lagos', createdAt: '2025-06-10', totalShipments: 28 },
  { id: 'CUST-004', name: 'David Williams', email: 'david.w@medsupply.co', phone: '+1 (312) 555-0335', company: 'MedSupply Co.', address: '233 Michigan Avenue', city: 'Chicago', createdAt: '2025-02-08', totalShipments: 63 },
  { id: 'CUST-005', name: 'Aisha Bello', email: 'aisha.b@northernmills.ng', phone: '+234 (802) 555-4521', company: 'Northern Mills Ltd.', address: '123 Ahmadu Bello Way', city: 'Kaduna', createdAt: '2025-07-19', totalShipments: 15 },
  { id: 'CUST-006', name: 'James Wilson', email: 'j.wilson@fastship.com', phone: '+1 (713) 555-0678', company: 'FastShip Logistics', address: '500 Main Street', city: 'Houston', createdAt: '2025-01-05', totalShipments: 89 },
  { id: 'CUST-007', name: 'Grace Okonkwo', email: 'grace.o@greenagro.com', phone: '+234 (805) 555-3321', company: 'Green Agro Solutions', address: '42 Awolowo Road', city: 'Ibadan', createdAt: '2025-05-30', totalShipments: 21 },
  { id: 'CUST-008', name: 'Robert Kim', email: 'r.kim@electro.com', phone: '+1 (206) 555-0987', company: 'ElectroWorld Inc.', address: '100 Pike Street', city: 'Seattle', createdAt: '2025-08-12', totalShipments: 12 },
  { id: 'CUST-009', name: 'Chioma Nwachukwu', email: 'chioma.n@prestige.ng', phone: '+234 (806) 555-8876', company: 'Prestige Exports', address: '5 Ikoyi Crescent', city: 'Lagos', createdAt: '2025-09-01', totalShipments: 8 },
  { id: 'CUST-010', name: 'Maria Santos', email: 'maria.s@latinlog.com', phone: '+1 (305) 555-0567', company: 'Latin Logistics Corp', address: '100 Biscayne Boulevard', city: 'Miami', createdAt: '2025-04-18', totalShipments: 55 },
]

export const mockCouriers: Courier[] = [
  { id: 'CR-001', name: 'Daniel Thompson', phone: '+1 (555) 123-0001', email: 'daniel.t@tsg-logistics.com', vehicle: 'Mercedes Sprinter', plateNumber: 'TGS-1001', status: 'available', rating: 4.8, totalDeliveries: 1240 },
  { id: 'CR-002', name: 'Fatima Abubakar', phone: '+234 (701) 555-0002', email: 'fatima.a@tsg-logistics.com', vehicle: 'Toyota Hiace', plateNumber: 'TGS-1002', status: 'available', rating: 4.9, totalDeliveries: 892 },
  { id: 'CR-003', name: 'Carlos Rodriguez', phone: '+1 (555) 123-0003', email: 'carlos.r@tsg-logistics.com', vehicle: 'Ford Transit', plateNumber: 'TGS-1003', status: 'on_delivery', rating: 4.7, totalDeliveries: 1567 },
  { id: 'CR-004', name: 'Emeka Okafor', phone: '+234 (701) 555-0004', email: 'emeka.o@tsg-logistics.com', vehicle: 'Isuzu NPR', plateNumber: 'TGS-1004', status: 'available', rating: 4.6, totalDeliveries: 723 },
  { id: 'CR-005', name: 'Jessica Park', phone: '+1 (555) 123-0005', email: 'jessica.p@tsg-logistics.com', vehicle: 'Ram ProMaster', plateNumber: 'TGS-1005', status: 'offline', rating: 4.5, totalDeliveries: 2104 },
  { id: 'CR-006', name: 'Sunday Adeyemi', phone: '+234 (701) 555-0006', email: 'sunday.a@tsg-logistics.com', vehicle: 'Mercedes Actros', plateNumber: 'TGS-1006', status: 'available', rating: 4.9, totalDeliveries: 3456 },
  { id: 'CR-007', name: 'Rachel Green', phone: '+1 (555) 123-0007', email: 'rachel.g@tsg-logistics.com', vehicle: 'Chevrolet Express', plateNumber: 'TGS-1007', status: 'on_delivery', rating: 4.4, totalDeliveries: 567 },
  { id: 'CR-008', name: 'Tunde Balogun', phone: '+234 (701) 555-0008', email: 'tunde.b@tsg-logistics.com', vehicle: 'Mitsubishi Fuso', plateNumber: 'TGS-1008', status: 'available', rating: 4.7, totalDeliveries: 1890 },
]
