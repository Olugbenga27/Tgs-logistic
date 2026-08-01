export type ShipmentStatus = 'pending' | 'in_transit' | 'delivered'
export type Priority = 'low' | 'medium' | 'high'

export interface ShipmentStatusEvent {
  status: string
  date: string
  location: string
}

export interface Shipment {
  id: string
  origin: string
  destination: string
  status: ShipmentStatus
  eta: string
  carrier: string
  priority: Priority
  date: string
  originAddress: string
  destinationAddress: string
  totalCost: number
  weight: string
  lastUpdate: string
  statusHistory: ShipmentStatusEvent[]
}

export interface ShipmentFilters {
  search: string
  status: string
  carrier: string
  priority: string
}
