import { Outlet } from 'react-router-dom'

import useUserStore from '../stores/useUserStore'
import { LocalUserRoles } from '../types/localTypes'

export interface RoleRouteProps {
  minimumRequiredRole: LocalUserRoles
}

export const RoleProtectedRoute = ({ minimumRequiredRole }: RoleRouteProps) => {
  const { user } = useUserStore()

  if (user?.role && user?.role >= minimumRequiredRole) {
    return <Outlet />
  } else {
    // TODO: Add a proper not authorized page
    return <div>Not authorized</div>
  }
}
