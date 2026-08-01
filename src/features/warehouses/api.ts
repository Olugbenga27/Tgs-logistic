import { useMockableQuery } from '@/hooks/useApi'
import { api } from '@/lib/api-client'
import { mockWarehouses } from '@/lib/mock-data'

export interface Warehouse {
  id: string
  name: string
  location: string
  capacity: number
  utilization: number
}

export function useWarehouses() {
  return useMockableQuery<Warehouse[]>(
    ['warehouses'],
    mockWarehouses as Warehouse[],
    (signal) => api.get<Warehouse[]>('/warehouses', signal),
  )
}
