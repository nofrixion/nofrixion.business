import { UserDashboard } from '@nofrixion/components'
import { useStore } from 'zustand'

import { AuthContextType } from '../../lib/auth/AuthProvider'
import { useAuth } from '../../lib/auth/useAuth'
import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'

const UserPage = () => {
  const merchant = useStore(useMerchantStore, (state) => state.merchant)
  const { authState } = useAuth() as AuthContextType

  const onUnauthorized = () => {
    authState?.logOut && authState.logOut()
  }

  return (
    <>
      {merchant && (
        <UserDashboard
          merchantId={merchant.id}
          apiUrl={NOFRIXION_API_URL}
          onUnauthorized={onUnauthorized}
        />
      )}
    </>
  )
}

export default UserPage
