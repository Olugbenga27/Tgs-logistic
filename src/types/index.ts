export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'operator'
  avatar?: string
}

export interface NavItem {
  label: string
  path: string
  icon: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  address: string
  city: string
  createdAt: string
  totalShipments: number
}

export interface Courier {
  id: string
  name: string
  phone: string
  email: string
  vehicle: string
  plateNumber: string
  status: 'available' | 'on_delivery' | 'offline'
  rating: number
  totalDeliveries: number
}
