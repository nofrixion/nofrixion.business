import { AccountsList } from '@nofrixion/components'
import { Account } from '@nofrixion/moneymoov'
import { useNavigate } from 'react-router-dom'

import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'
import useStore from '../../lib/stores/useStore'

const CurrentAccountsPage = () => {
  const merchant = useStore(useMerchantStore, (state) => state.merchant)
  const navigate = useNavigate()

  const onAccountClick = (account: Account) => {
    navigate(account.id)
  }

  return (
    <div>
      {merchant && (
        <AccountsList
          merchantId={merchant.id}
          apiUrl={NOFRIXION_API_URL}
          onAccountClick={onAccountClick}
        />
      )}
    </div>
  )
}

export default CurrentAccountsPage
