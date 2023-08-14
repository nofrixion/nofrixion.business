import { useAccounts } from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import CurrentAcountsList from '../../ui/Account/CurrentAccountsList/CurrentAcountsList'

export interface CurrentAccountsListProps {
  merchantId: string
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  token?: string // Example: "eyJhbGciOiJIUz..."
  onUnauthorized?: () => void
}

const queryClient = new QueryClient()

const CurrentAccountsList = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: CurrentAccountsListProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentAccountsMain
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
        onUnauthorized={onUnauthorized}
      />
    </QueryClientProvider>
  )
}

const CurrentAccountsMain = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: CurrentAccountsListProps) => {
  const { data: accounts } = useAccounts({ merchantId }, { apiUrl, authToken: token })

  if (accounts?.status == 'error') {
    if (accounts?.error && accounts?.error.status === 401) {
      onUnauthorized && onUnauthorized()
    }
  }

  const onCreatePaymentAccount = () => {
    console.log('It works!')
  }

  const onAccountClick = () => {
    console.log('Account click works')
  }

  return (
    <>
      {accounts?.status === 'success' && accounts.data && (
        <CurrentAcountsList
          accounts={accounts.data}
          onAccountClick={onAccountClick}
          onCreatePaymentAccount={onCreatePaymentAccount}
        />
      )}
    </>
  )
}

export default CurrentAccountsList
