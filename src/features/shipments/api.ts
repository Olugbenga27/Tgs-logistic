import { useMockableQuery } from '@/hooks/useApi'
import { api } from '@/lib/api-client'
import { mockShipments } from '@/lib/mock-data'
import type { Shipment } from '@/features/shipments/types'

export function useShipments() {
  return useMockableQuery<Shipment[]>(
    ['shipments'],
    mockShipments as Shipment[],
    (signal) => api.get<Shipment[]>('/shipments', signal),
  )
}

export function useShipment(id: string | undefined) {
  return useMockableQuery<Shipment | null>(
    ['shipments', id],
    mockShipments.find((s) => s.id === id) ?? null,
    (signal) => api.get<Shipment | null>(`/shipments/${id}`, signal),
    { enabled: Boolean(id) },
  )
}
