export type FleetStatus = 'active' | 'idle' | 'maintenance'

export interface FleetVehicle {
  id: string
  driver: string
  status: FleetStatus
  lastService: string
  nextService: string
}
