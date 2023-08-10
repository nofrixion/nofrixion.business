import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { Loader } from '../../components/ui/Loader/Loader'
import { useAuth } from '../../lib/auth/useAuth'
import { AuthContextType } from './AuthProvider'

export const ProtectedRoutes = () => {
  const authContext = useAuth() as AuthContextType
  const location = useLocation()

  if (authContext && authContext.authState?.isLoading) {
    return <Loader className="flex items-center justify-center p-24 min-h-screen" />
  }

  if (!authContext || !authContext.authState?.isLoggedIn || authContext.authState?.isError) {
    // user is not authenticated, redirect to login page with the return url
    return <Navigate to="/" replace state={{ from: location }} />
  } else {
    return <Outlet />
  }
}
