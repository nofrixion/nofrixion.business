import { Account, AccountsClient } from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useState } from 'react'

import { Button, Icon } from '../../ui/atoms'
import { makeToast } from '../../ui/Toast/Toast'
import LayoutWrapper from '../../ui/utils/LayoutWrapper'

export interface CurrentAccountsProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string
  onUnauthorized: () => void
}

const queryClient = new QueryClient()

const CurrentAccounts = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: CurrentAccountsProps) => {
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
}: CurrentAccountsProps) => {
  const [accounts, setAccounts] = useState<Account[] | undefined>(undefined)

  const getCurrentAccounts = async () => {
    const accountsClient = new AccountsClient({
      apiUrl: apiUrl,
      authToken: token,
    })

    const response = await accountsClient.getAccounts({ merchantId: merchantId })

    if (response.status === 'error') {
      makeToast('error', response.error.title)
      return
    }

    if (response.data) {
      setAccounts(response.data)
    }
  }

  getCurrentAccounts()
  const onCreatePaymentAccount = () => {
    console.log('It works!', merchantId, onUnauthorized())
  }

  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      <div className="flex gap-8 justify-between items-center mb-8 md:mb-[68px]">
        <span className="md:pl-4 leading-8 font-medium text-2xl md:text-[1.75rem]">
          Currents accounts
        </span>
        <LayoutGroup>
          <AnimatePresence initial={false}>
            <LayoutWrapper>
              <Button
                size="big"
                onClick={onCreatePaymentAccount}
                className="w-10 h-10 md:w-full md:h-full bg-secondary-button text-default-text"
              >
                <Icon name="add/16" className="pr-2 text-default-text" />
                <span className="hidden md:inline-block">New Account</span>
              </Button>
            </LayoutWrapper>
          </AnimatePresence>
        </LayoutGroup>

        <div>
          {accounts && (
            <div>
              {accounts.forEach((x) => {
                ;<li>{}</li>
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CurrentAccounts
