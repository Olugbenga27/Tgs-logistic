import { useMockableQuery } from '@/hooks/useApi'
import { api } from '@/lib/api-client'
import { mockCustomers, mockCouriers } from '@/lib/mock-data'
import type { Customer, Courier } from '@/types'
import {
  mockAdminCustomers,
  mockAdminShipments,
  mockAdminPayments,
  mockAdminInvoices,
  mockAdminQuotes,
  mockAdminStaff,
  mockAdminRoles,
  mockAdminNotifications,
  mockAdminReports,
} from './mock-data'
import type {
  AdminCustomer,
  AdminShipment,
  AdminPayment,
  AdminInvoice,
  AdminQuote,
  AdminStaff,
  AdminRole,
  AdminNotification,
  AdminReport,
} from './types'

export function useAdminCustomers() {
  return useMockableQuery<AdminCustomer[]>(
    ['admin', 'customers'],
    mockAdminCustomers,
    (signal) => api.get<AdminCustomer[]>('/admin/customers', signal),
  )
}

export function useAdminShipments() {
  return useMockableQuery<AdminShipment[]>(
    ['admin', 'shipments'],
    mockAdminShipments,
    (signal) => api.get<AdminShipment[]>('/admin/shipments', signal),
  )
}

export function useAdminPayments() {
  return useMockableQuery<AdminPayment[]>(
    ['admin', 'payments'],
    mockAdminPayments,
    (signal) => api.get<AdminPayment[]>('/admin/payments', signal),
  )
}

export function useAdminInvoices() {
  return useMockableQuery<AdminInvoice[]>(
    ['admin', 'invoices'],
    mockAdminInvoices,
    (signal) => api.get<AdminInvoice[]>('/admin/invoices', signal),
  )
}

export function useAdminQuotes() {
  return useMockableQuery<AdminQuote[]>(
    ['admin', 'quotes'],
    mockAdminQuotes,
    (signal) => api.get<AdminQuote[]>('/admin/quotes', signal),
  )
}

export function useAdminStaff() {
  return useMockableQuery<AdminStaff[]>(
    ['admin', 'staff'],
    mockAdminStaff,
    (signal) => api.get<AdminStaff[]>('/admin/staff', signal),
  )
}

export function useAdminRoles() {
  return useMockableQuery<AdminRole[]>(
    ['admin', 'roles'],
    mockAdminRoles,
    (signal) => api.get<AdminRole[]>('/admin/roles', signal),
  )
}

export function useAdminNotifications() {
  return useMockableQuery<AdminNotification[]>(
    ['admin', 'notifications'],
    mockAdminNotifications,
    (signal) => api.get<AdminNotification[]>('/admin/notifications', signal),
  )
}

export function useAdminReports() {
  return useMockableQuery<AdminReport[]>(
    ['admin', 'reports'],
    mockAdminReports,
    (signal) => api.get<AdminReport[]>('/admin/reports', signal),
  )
}

export function useBookingCustomers() {
  return useMockableQuery<Customer[]>(
    ['admin', 'booking', 'customers'],
    mockCustomers,
    (signal) => api.get<Customer[]>('/admin/bookings/customers', signal),
  )
}

export function useBookingCouriers() {
  return useMockableQuery<Courier[]>(
    ['admin', 'booking', 'couriers'],
    mockCouriers,
    (signal) => api.get<Courier[]>('/admin/bookings/couriers', signal),
  )
}
