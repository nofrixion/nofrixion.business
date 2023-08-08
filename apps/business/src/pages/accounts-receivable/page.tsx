import useMerchantStore from '../../lib/stores/useMerchantStore'
import useStore from '../../lib/stores/useStore'

import { NOFRIXION_API_URL } from '../../lib/constants'
import { AccountsReceivable as AccountsReceivableDashboard } from '@nofrixion/components'
import { useAuth } from '../../lib/auth/useAuth'
import { AuthContextType } from '../../lib/auth/AuthProvider'

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
    <div className="md:-biz-mx-4">
      <AccountsReceivableDashboard
        merchantId={merchant ? merchant.id : ''}
        apiUrl={NOFRIXION_API_URL}
        onUnauthorized={onUnauthorized}
      />
    </div>
  )
}

export default AccountReceivablePage
