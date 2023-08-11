import { Currency, useAccounts } from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence, LayoutGroup } from 'framer-motion'

import { formatAmount } from '../../../utils/formatters'
import { Button, Icon } from '../../ui/atoms'
import LayoutWrapper from '../../ui/utils/LayoutWrapper'

export interface CurrentAccountsProps {
  merchantId: string
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  token?: string // Example: "eyJhbGciOiJIUz..."
  onUnauthorized?: () => void
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
  const { data: accounts } = useAccounts({ merchantId }, { apiUrl, authToken: token })

  if (accounts?.status == 'error') {
    if (accounts?.error && accounts?.error.status === 401) {
      onUnauthorized && onUnauthorized()
    }
  }

  const onCreatePaymentAccount = () => {
    console.log('It works!', merchantId)
  }

  const getAccountCurrency = (currency: Currency) => {
    if (!currency) {
      return
    }
    if (Currency.EUR === currency) {
      return '€'
    } else if (Currency.GBP === currency) {
      return '£'
    }
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
              <Button size="big" onClick={onCreatePaymentAccount} variant="secondary">
                <Icon name="add/16" className="text-default-text" />
                <span className="pl-2 md:inline-block">New Account</span>
              </Button>
            </LayoutWrapper>
          </AnimatePresence>
        </LayoutGroup>
      </div>

      {accounts?.status === 'success' && accounts.data && (
        <div className="flex-row mb-8 md:mb-[68px]">
          {accounts.data.map((account, index) => (
            <div key={index} className="flex h-[124px] p-8 mb-8 bg-white">
              <div>
                <span>{account.accountName}</span>
                <span></span>
              </div>
              <div className="text-right">
                <span className="text-4xl font-semibold leading-9">
                  {getAccountCurrency(account.currency)} {formatAmount(account.balance)}
                </span>
                <div className="text-sm font-normal leading-4 mt-2">
                  <span className="pr-2">Available</span>
                  <span>
                    {getAccountCurrency(account.currency)} {formatAmount(account.availableBalance)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CurrentAccounts
