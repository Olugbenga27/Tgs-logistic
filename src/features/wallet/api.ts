import { useMockableQuery } from '@/hooks/useApi'
import { api } from '@/lib/api-client'
import { mockWalletHistory, mockWalletMonthly } from '@/lib/mock-data'
import type { WalletTransaction } from '@/lib/mock-data'

export type WalletMonthlyData = typeof mockWalletMonthly

export function useWalletHistory() {
  return useMockableQuery<WalletTransaction[]>(
    ['wallet', 'history'],
    mockWalletHistory,
    (signal) => api.get<WalletTransaction[]>('/wallet/transactions', signal),
  )
}

export function useWalletMonthly() {
  return useMockableQuery<WalletMonthlyData>(
    ['wallet', 'monthly'],
    mockWalletMonthly,
    (signal) => api.get<WalletMonthlyData>('/wallet/monthly', signal),
  )
}
