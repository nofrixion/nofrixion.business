import {
  Account,
  BankSettings,
  OpenBankingClient,
  useAccounts,
  useBanks,
} from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useUserSettings } from '../../../lib/stores/useUserSettingsStore'
import CurrentAcountsList from '../../ui/Account/CurrentAccountsList/CurrentAcountsList'
import { makeToast } from '../../ui/Toast/Toast'

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
  const [banks, setBanks] = useState<BankSettings[] | undefined>(undefined)
  const { data: accounts } = useAccounts({ merchantId }, { apiUrl, authToken: token })
  const { userSettings, updateUserSettings } = useUserSettings()

  const { data: banksResponse } = useBanks(
    { merchantId: merchantId },
    { apiUrl: apiUrl, authToken: token },
  )

  useEffect(() => {
    if (banksResponse?.status === 'success') {
      setBanks(banksResponse.data.payByBankSettings)
    } else if (banksResponse?.status === 'error') {
      console.warn(banksResponse.error)
    }
  }, [banksResponse])

  if (accounts?.status == 'error') {
    if (accounts?.error && accounts?.error.status === 401) {
      onUnauthorized && onUnauthorized()
    }
  }

  const onConnectBank = async (bank: BankSettings) => {
    // TODO: Fix this. Which one should we use?
    if (bank.personalInstitutionID) {
      const client = new OpenBankingClient({ apiUrl, authToken: token })

      const response = await client.createConsent({
        institutionID: bank.personalInstitutionID,
        merchantID: merchantId,
        IsConnectedAccounts: true,
      })

      if (response.status === 'error') {
        console.error(response.error)
        makeToast('error', 'Could not connect to bank.')
        return
      }

      if (response.data.authorisationUrl) {
        // Redirect to the banks authorisation url
        window.location.href = response.data.authorisationUrl
      }
    }
  }

  const onMaybeLater = () => {
    if (userSettings) {
      userSettings.connectMaybeLater = true
      updateUserSettings(userSettings)
    } else {
      updateUserSettings({ connectMaybeLater: true })
    }
  }

  return (
    <>
      {accounts?.status === 'success' && accounts.data && (
        <CurrentAcountsList
          accounts={accounts.data}
          onAccountClick={onAccountClick}
          onConnectToBank={onConnectBank}
          onMaybeLater={onMaybeLater}
          banks={banks}
        />
      )}
    </>
  )
}

export default CurrentAccountsList
