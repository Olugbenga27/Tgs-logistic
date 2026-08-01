import { useMockableQuery } from '@/hooks/useApi'
import { api } from '@/lib/api-client'
import { mockTrackingEvents } from '@/lib/mock-data'

export interface TrackingEvent {
  location: string
  timestamp: string
  status: string
}

export function useTrackingEvents() {
  return useMockableQuery<TrackingEvent[]>(
    ['tracking', 'events'],
    mockTrackingEvents as TrackingEvent[],
    (signal) => api.get<TrackingEvent[]>('/tracking/events', signal),
  )
}
