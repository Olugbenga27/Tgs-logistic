import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type {
  AdminCustomer,
  AdminShipment,
  AdminPayment,
} from './types'

// ============================================================
// ADMIN CUSTOMERS
// ============================================================
export function useAdminCustomers() {
  return useQuery<AdminCustomer[], Error>({
    queryKey: ['admin', 'customers'],
    queryFn: async () => {
      const { data, error } = await supabase!
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []).map((row) => ({
        id: row.id,
        name: row.full_name,
        email: row.email,
        phone: row.phone ?? '',
        company: row.company ?? '',
        city: row.city ?? '',
        country: row.country ?? '',
        segment: row.segment,
        status: row.status,
        totalShipments: row.total_shipments,
        totalSpent: Number(row.total_spent),
        lastActive: row.updated_at,
        joined: row.created_at,
      }))
    },
  })
}

// ============================================================
// ADMIN SHIPMENTS / BOOKINGS
// ============================================================
export function useAdminShipments() {
  return useQuery<AdminShipment[], Error>({
    queryKey: ['admin', 'shipments'],
    queryFn: async () => {
      const { data, error } = await supabase!
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []).map((row) => ({
        id: row.booking_id,
        customer: row.customer_name ?? 'Unknown',
        customerId: row.customer_id ?? '',
        origin: row.sender_city && row.sender_country ? `${row.sender_city}, ${row.sender_country}` : row.sender_city ?? '',
        destination: row.receiver_city && row.receiver_country ? `${row.receiver_city}, ${row.receiver_country}` : row.receiver_city ?? '',
        type: row.shipping_method === 'express' ? 'air' : (row.shipping_method as 'air' | 'sea' | 'road') ?? 'air',
        status: row.status as AdminShipment['status'],
        priority: 'standard' as const,
        weight: Number(row.weight_kg ?? 0),
        cost: Number(row.price ?? 0),
        paymentStatus: row.payment_status as AdminShipment['paymentStatus'],
        courier: row.courier_name ?? '',
        createdAt: row.created_at,
        eta: row.estimated_delivery ?? row.created_at,
      }))
    },
  })
}

// ============================================================
// ADMIN PAYMENTS
// ============================================================
export function useAdminPayments() {
  return useQuery<AdminPayment[], Error>({
    queryKey: ['admin', 'payments'],
    queryFn: async () => {
      const { data, error } = await supabase!
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []).map((row) => ({
        id: row.id,
        reference: row.reference,
        customer: row.customer_name ?? 'Unknown',
        invoice: row.invoice_number ?? '',
        description: row.description ?? '',
        amount: Number(row.amount),
        fee: Number(row.fee ?? 0),
        method: row.method as AdminPayment['method'],
        status: row.status as AdminPayment['status'],
        date: row.created_at,
      }))
    },
  })
}

// ============================================================
// BOOKING MUTATIONS
// ============================================================
interface CreateBookingInput {
  customer_id?: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  sender_address?: string
  sender_city?: string
  sender_country?: string
  receiver_address?: string
  receiver_city?: string
  receiver_country?: string
  package_type?: string
  package_desc?: string
  weight_kg?: number
  length_cm?: number
  width_cm?: number
  height_cm?: number
  shipping_method?: string
  courier_name?: string
  estimated_delivery?: string
  price?: number
  payment_status?: string
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateBookingInput) => {
      const { data, error } = await supabase!
        .from('bookings')
        .insert({
          customer_id: input.customer_id ?? null,
          customer_name: input.customer_name,
          customer_email: input.customer_email,
          customer_phone: input.customer_phone ?? null,
          sender_address: input.sender_address ?? null,
          sender_city: input.sender_city ?? null,
          sender_country: input.sender_country ?? null,
          receiver_address: input.receiver_address ?? null,
          receiver_city: input.receiver_city ?? null,
          receiver_country: input.receiver_country ?? null,
          package_type: input.package_type ?? null,
          package_desc: input.package_desc ?? null,
          weight_kg: input.weight_kg ?? null,
          length_cm: input.length_cm ?? null,
          width_cm: input.width_cm ?? null,
          height_cm: input.height_cm ?? null,
          shipping_method: input.shipping_method ?? null,
          courier_name: input.courier_name ?? null,
          estimated_delivery: input.estimated_delivery ?? null,
          price: input.price ?? null,
          payment_status: input.payment_status ?? 'pending',
          status: 'pending',
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'shipments'] })
    },
  })
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase!
        .from('bookings')
        .update({ status })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'shipments'] })
    },
  })
}

export function useDeleteBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase!
        .from('bookings')
        .delete()
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'shipments'] })
    },
  })
}

// ============================================================
// TRACKING EVENTS
// ============================================================
export function useTrackingEvents(trackingNumber: string) {
  return useQuery({
    queryKey: ['tracking', trackingNumber],
    queryFn: async () => {
      const { data, error } = await supabase!
        .from('tracking_events')
        .select('*')
        .eq('tracking_number', trackingNumber)
        .order('event_date', { ascending: false })
        .order('event_time', { ascending: false })
      if (error) throw error
      return data ?? []
    },
    enabled: !!trackingNumber,
  })
}

export function useAddTrackingEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: {
      booking_id: string
      tracking_number: string
      status: string
      location?: string
      note?: string
      event_date?: string
      event_time?: string
    }) => {
      const { error } = await supabase!
        .from('tracking_events')
        .insert({
          booking_id: input.booking_id,
          tracking_number: input.tracking_number,
          status: input.status,
          location: input.location ?? null,
          note: input.note ?? null,
          event_date: input.event_date ?? new Date().toISOString().slice(0, 10),
          event_time: input.event_time ?? new Date().toTimeString().slice(0, 8),
        })
      if (error) throw error
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tracking', variables.tracking_number] })
    },
  })
}

// ============================================================
// ADMIN CUSTOMERS MUTATIONS
// ============================================================
export function useCreateCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: {
      full_name: string
      email: string
      phone?: string
      company?: string
      address?: string
      city?: string
      country?: string
    }) => {
      const { data, error } = await supabase!
        .from('customers')
        .insert(input)
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'customers'] })
    },
  })
}

// ============================================================
// MESSAGES
// ============================================================
export function useAdminMessages() {
  return useQuery({
    queryKey: ['admin', 'messages'],
    queryFn: async () => {
      const { data, error } = await supabase!
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data ?? []
    },
  })
}

// ============================================================
// DASHBOARD STATS
// ============================================================
export function useDashboardStats() {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: async () => {
      const [shipmentsRes, customersRes, paymentsRes] = await Promise.all([
        supabase!.from('bookings').select('id, status, price, created_at'),
        supabase!.from('customers').select('id'),
        supabase!.from('payments').select('id, amount, status'),
      ])

      const shipments = shipmentsRes.data ?? []
      const customers = customersRes.data ?? []
      const payments = paymentsRes.data ?? []

      const totalRevenue = payments
        .filter((p) => p.status === 'paid')
        .reduce((sum, p) => sum + Number(p.amount), 0)

      return {
        totalShipments: shipments.length,
        pendingBookings: shipments.filter((s) => s.status === 'pending').length,
        inTransit: shipments.filter((s) => s.status === 'in_transit').length,
        delivered: shipments.filter((s) => s.status === 'delivered').length,
        totalCustomers: customers.length,
        totalRevenue,
      }
    },
  })
}
