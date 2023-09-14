import { Account, useAccounts } from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useUserSettings } from '../../../lib/stores/useUserSettingsStore'
import CurrentAcountsList from '../../ui/Account/CurrentAccountsList/CurrentAcountsList'

export interface CurrentAccountsListProps {
  merchantId: string
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  token?: string // Example: "eyJhbGciOiJIUz..."
  onUnauthorized?: () => void
  onAccountClick?: (account: Account) => void
}

const queryClient = new QueryClient()

const CurrentAccountsList = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
  onAccountClick,
}: CurrentAccountsListProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentAccountsMain
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
        onUnauthorized={onUnauthorized}
        onAccountClick={onAccountClick}
      />
    </QueryClientProvider>
  )
}

const CurrentAccountsMain = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
  onAccountClick,
}: CurrentAccountsListProps) => {
  const { data: accounts } = useAccounts({ merchantId }, { apiUrl, authToken: token })

  if (accounts?.status == 'error') {
    if (accounts?.error && accounts?.error.status === 401) {
      onUnauthorized && onUnauthorized()
    }
  }

  const { settings, update } = useUserSettings()

  const onConnect = () => {
    console.log('onConnect')
  }

  const onMaybeLater = () => {
    update({ connectMaybeLater: true })
    console.log('onMaybeLater')
  }

  console.log('Settings', settings)
  return (
    <>
      {accounts?.status === 'success' && accounts.data && (
        <CurrentAcountsList
          accounts={accounts.data}
          onAccountClick={onAccountClick}
          onConnect={onConnect}
          onMaybeLater={onMaybeLater}
        />
      )}
    </>
  )
}

export default CurrentAccountsList
