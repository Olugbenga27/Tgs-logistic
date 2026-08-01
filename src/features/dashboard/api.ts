import { useMockableQuery } from '@/hooks/useApi'
import { api } from '@/lib/api-client'
import { mockStats, mockShipments, mockWalletHistory, mockAnalytics } from '@/lib/mock-data'
import type { Shipment } from '@/features/shipments/types'
import type { WalletTransaction } from '@/lib/mock-data'

export type DashboardStats = typeof mockStats
export type DashboardAnalytics = typeof mockAnalytics

export function useDashboardStats() {
  return useMockableQuery<DashboardStats>(
    ['dashboard', 'stats'],
    mockStats,
    (signal) => api.get<DashboardStats>('/dashboard/stats', signal),
  )
}

export function useRecentShipments() {
  return useMockableQuery<Shipment[]>(
    ['dashboard', 'recent-shipments'],
    mockShipments as Shipment[],
    (signal) => api.get<Shipment[]>('/dashboard/recent-shipments', signal),
  )
}

export function useWalletTransactions() {
  return useMockableQuery<WalletTransaction[]>(
    ['dashboard', 'wallet-transactions'],
    mockWalletHistory,
    (signal) => api.get<WalletTransaction[]>('/dashboard/wallet-transactions', signal),
  )
}

export function useDashboardAnalytics() {
  return useMockableQuery<DashboardAnalytics>(
    ['dashboard', 'analytics'],
    mockAnalytics,
    (signal) => api.get<DashboardAnalytics>('/dashboard/analytics', signal),
  )
}
