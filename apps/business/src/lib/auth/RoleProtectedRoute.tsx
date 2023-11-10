import { LocalUserRoles } from '@nofrixion/components/src/types/LocalTypes'
import { Outlet, useNavigate } from 'react-router-dom'

import { Loader } from '../../components/ui/Loader/Loader'
import NewlyRegistered from '../../pages/NewlyRegistered'
import NotAuthorised from '../../pages/NotAuthorised'
import useUserStore from '../stores/useUserStore'

export interface RoleRouteProps {
  minimumRequiredRole?: LocalUserRoles
}

export const RoleProtectedRoute = ({
  minimumRequiredRole = LocalUserRoles.User,
}: RoleRouteProps) => {
  const { user } = useUserStore()
  const navigate = useNavigate()

  if (!user) {
    return <Loader className="flex items-center justify-center p-24 min-h-screen" />
  }

  if (user?.role && user?.role >= minimumRequiredRole) {
    // User has access to this route
    return <Outlet />
  } else if (user?.role && user?.role === LocalUserRoles.PaymentRequestor) {
    // If user is a payment requestor, redirect to accounts receivable
    navigate('accounts-receivable')
  } else if (user?.role && user?.role === LocalUserRoles.NewlyRegistered) {
    return <NewlyRegistered />
  } else {
    return <NotAuthorised />
  }
}
