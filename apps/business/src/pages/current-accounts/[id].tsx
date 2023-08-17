import { AccountDashboard } from '@nofrixion/components'
import { useNavigate, useParams } from 'react-router-dom'

import { NOFRIXION_API_URL } from '../../lib/constants'

const AccountDashboardPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const onAllCurrentAccountsClick = () => {
    navigate(`/home/current-accounts`)
  }

  return (
    <div>
      {id && (
        <AccountDashboard
          accountId={id}
          apiUrl={NOFRIXION_API_URL}
          onAllCurrentAccountsClick={onAllCurrentAccountsClick}
        />
      )}
    </div>
  )
}

export default AccountDashboardPage
