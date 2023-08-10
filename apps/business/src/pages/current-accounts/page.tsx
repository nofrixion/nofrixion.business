import { Accounts } from '@nofrixion/components'

import { AuthContextType } from '../../lib/auth/AuthProvider'
import { useAuth } from '../../lib/auth/useAuth'
import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'
import useStore from '../../lib/stores/useStore'

const CurrentAccountsPage = () => {
  // const { data: session, status, update } = useSession()
  const merchant = useStore(useMerchantStore, (state) => state.merchant)
  const { authState } = useAuth() as AuthContextType

  const onUnauthorized = () => {
    authState?.logOut && authState.logOut()
  }

  return (
    <div className="md:-mx-4">
      <Accounts
        merchantId={merchant ? merchant.id : ''}
        apiUrl={NOFRIXION_API_URL}
        onUnauthorized={onUnauthorized}
      />
    </div>
  )
}

export default CurrentAccountsPage
