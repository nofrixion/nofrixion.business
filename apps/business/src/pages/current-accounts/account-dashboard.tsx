import { AccountDashboard } from '@nofrixion/components'
import { useNavigate, useParams } from 'react-router-dom'

import { NOFRIXION_API_URL } from '../../lib/constants'

const AccountDashboardPage = () => {
  const navigate = useNavigate()
  const { accountId } = useParams()

  const onAllCurrentAccountsClick = () => {
    navigate('../current-accounts')
  }

  return (
    <div>
      {accountId && (
        <AccountDashboard
          accountId={accountId}
          apiUrl={NOFRIXION_API_URL}
          onAllCurrentAccountsClick={onAllCurrentAccountsClick}
        />
      )}
    </div>
  )
}

export default AccountDashboardPage
