import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { ErrorPage } from '@/pages/ErrorPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/ResetPasswordPage'
import { VerifyEmailPage } from '@/pages/VerifyEmailPage'
import { OtpVerificationPage } from '@/pages/OtpVerificationPage'
import { LandingPage } from '@/pages/LandingPage'
import { TrackPage } from '@/pages/TrackPage'
import { QuotePage } from '@/pages/QuotePage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { BookShipmentPage } from '@/features/booking/pages/BookShipmentPage'
import { ShipmentsPage } from '@/features/shipments/pages/ShipmentsPage'
import { ShipmentDetailPage } from '@/features/shipments/pages/ShipmentDetailPage'
import { TrackingPage } from '@/features/tracking/pages/TrackingPage'
import { WarehousesPage } from '@/features/warehouses/pages/WarehousesPage'
import { FleetPage } from '@/features/fleet/pages/FleetPage'
import { WalletPage } from '@/features/wallet/pages/WalletPage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'

// Admin imports
import { AdminProtectedRoute } from '@/features/admin/AdminProtectedRoute'
import { AdminLayout } from '@/features/admin/AdminLayout'
import { AdminLoginPage } from '@/features/admin/pages/AdminLoginPage'
import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage'
import { AdminBookingPage } from '@/features/admin/pages/AdminBookingPage'
import { AdminCustomersPage } from '@/features/admin/pages/AdminCustomersPage'
import { AdminShipmentsPage } from '@/features/admin/pages/AdminShipmentsPage'
import { AdminPaymentsPage } from '@/features/admin/pages/AdminPaymentsPage'
import { AdminInvoicesPage } from '@/features/admin/pages/AdminInvoicesPage'
import { AdminReportsPage } from '@/features/admin/pages/AdminReportsPage'
import { AdminNotificationsPage } from '@/features/admin/pages/AdminNotificationsPage'
import { AdminQuotesPage } from '@/features/admin/pages/AdminQuotesPage'
import { AdminStaffPage } from '@/features/admin/pages/AdminStaffPage'
import { AdminRolesPage } from '@/features/admin/pages/AdminRolesPage'
import { AdminSettingsPage } from '@/features/admin/pages/AdminSettingsPage'

export const router = createBrowserRouter([
  // ── Auth pages (public) ──
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
  },
  {
    path: '/otp',
    element: <OtpVerificationPage />,
  },

  // ── Public website ──
  {
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'design-system', element: <DesignSystemPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'track', element: <TrackPage /> },
      { path: 'quote', element: <QuotePage /> },
      { path: 'pricing', element: <LandingPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'book-shipment', element: <BookShipmentPage /> },
    ],
  },

  // ── User dashboard (protected) ──
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'shipments', element: <ShipmentsPage /> },
          { path: 'shipments/:id', element: <ShipmentDetailPage /> },
          { path: 'tracking', element: <TrackingPage /> },
          { path: 'warehouses', element: <WarehousesPage /> },
          { path: 'fleet', element: <FleetPage /> },
          { path: 'wallet', element: <WalletPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },

  // ── Admin portal (Supabase auth required) ──
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboardPage /> },
          { path: 'bookings', element: <AdminBookingPage /> },
          { path: 'customers', element: <AdminCustomersPage /> },
          { path: 'shipments', element: <AdminShipmentsPage /> },
          { path: 'payments', element: <AdminPaymentsPage /> },
          { path: 'invoices', element: <AdminInvoicesPage /> },
          { path: 'reports', element: <AdminReportsPage /> },
          { path: 'notifications', element: <AdminNotificationsPage /> },
          { path: 'quotes', element: <AdminQuotesPage /> },
          { path: 'staff', element: <AdminStaffPage /> },
          { path: 'roles', element: <AdminRolesPage /> },
          { path: 'settings', element: <AdminSettingsPage /> },
        ],
      },
    ],
  },

  // ── Catch-all ──
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
