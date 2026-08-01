import { useMockableQuery } from '@/hooks/useApi'
import { api } from '@/lib/api-client'
import { mockFleet } from '@/lib/mock-data'

export interface FleetVehicle {
  id: string
  driver: string
  status: 'active' | 'idle' | 'maintenance'
  lastService: string
  nextService: string
}

export function useFleet() {
  return useMockableQuery<FleetVehicle[]>(
    ['fleet'],
    mockFleet as FleetVehicle[],
    (signal) => api.get<FleetVehicle[]>('/fleet', signal),
  )
}
