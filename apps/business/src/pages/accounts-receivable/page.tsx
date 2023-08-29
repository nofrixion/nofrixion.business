import { AccountsReceivable as AccountsReceivableDashboard } from '@nofrixion/components'

import { AuthContextType } from '../../lib/auth/AuthProvider'
import { useAuth } from '../../lib/auth/useAuth'
import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'
import useStore from '../../lib/stores/useStore'

const AccountReceivablePage = () => {
  // const { data: session, status, update } = useSession()
  const merchant = useStore(useMerchantStore, (state) => state.merchant)
  const { authState } = useAuth() as AuthContextType

  const onUnauthorized = () => {
    authState?.logOut && authState.logOut()
  }
  return (
    // Div is needed to prevent the dashboard from being
    // rendered as two separate components
    <div>
      {merchant && (
        <AccountsReceivableDashboard
          merchantId={merchant.id}
          apiUrl={NOFRIXION_API_URL}
          onUnauthorized={onUnauthorized}
        />
      )}
    </div>
  )
}

export default AccountReceivablePage
