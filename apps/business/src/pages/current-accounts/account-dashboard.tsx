import { AccountDashboard } from '@nofrixion/components'
import { useNavigate, useParams } from 'react-router-dom'

import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'
import useStore from '../../lib/stores/useStore'

const AccountDashboardPage = () => {
  const navigate = useNavigate()
  const { accountId } = useParams()
  const merchant = useStore(useMerchantStore, (state) => state.merchant)

  const onAllCurrentAccountsClick = () => {
    navigate('../current-accounts')
  }

  return (
    <div>
      {merchant && accountId && (
        <AccountDashboard
          accountId={accountId}
          apiUrl={NOFRIXION_API_URL}
          onAllCurrentAccountsClick={onAllCurrentAccountsClick}
          merchantId={merchant.id}
        />
      )}
    </div>
  )
}

export default AccountDashboardPage
