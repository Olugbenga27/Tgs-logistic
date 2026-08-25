import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { LoadingScreen } from '@/components/layout/LoadingScreen'

export function AdminProtectedRoute() {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (profile && !profile.is_active) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
