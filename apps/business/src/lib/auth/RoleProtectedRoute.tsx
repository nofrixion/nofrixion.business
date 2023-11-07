import { LocalUserRoles } from '@nofrixion/components/src/types/LocalTypes'
import { Outlet } from 'react-router-dom'

import useUserStore from '../stores/useUserStore'

export interface RoleRouteProps {
  minimumRequiredRole?: LocalUserRoles
}

export const RoleProtectedRoute = ({
  minimumRequiredRole = LocalUserRoles.User,
}: RoleRouteProps) => {
  const { user } = useUserStore()

  if (user?.role && user?.role >= minimumRequiredRole) {
    return <Outlet />
  } else {
    // TODO: Add a proper not authorized page
    return <div>Not authorized</div>
  }
}
