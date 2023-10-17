import { TopAccountsCard } from '@nofrixion/components/src/components/ui/molecules'
import { remoteAccountsWithTransactionMetricsToLocalAccountsWithTransactionMetrics } from '@nofrixion/components/src/utils/parsers'
import {
  AccountTransactionMetrics,
  Currency,
  PaymentRequestMetrics,
  SortDirection,
  useAccountsWithTransactionMetrics,
  usePaymentRequestMetrics,
} from '@nofrixion/moneymoov'
import { addDays, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AccountPayableCard from '../../components/AccountPayableCard'
import AcountsReceivableCard from '../../components/AcountsReceivableCard'
import Card from '../../components/ui/atoms/Card/Card'
import { Loader } from '../../components/ui/Loader/Loader'
import { AuthContextType } from '../../lib/auth/AuthProvider'
import { useAuth } from '../../lib/auth/useAuth'
import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'

const DashboardPage = () => {
  const { merchant } = useMerchantStore()
  const navigate = useNavigate()
  const { authState } = useAuth() as AuthContextType

  const [accounts, setAccounts] = useState<AccountTransactionMetrics[]>([])
  const [metrics, setMetrics] = useState<PaymentRequestMetrics>()
  const last30Days = addDays(new Date(), -30)

  const [currency, setCurrency] = useState<Currency>(Currency.EUR)

  const { data: accountsWithTransactionMetricsResponse, isLoading: isAccountsLoading } =
    useAccountsWithTransactionMetrics(
      {
        pageSize: 3,
        merchantId: merchant?.id,
        pageNumber: 1,
        fromDateMS: startOfDay(last30Days).getTime(),
        numberOfTransactionsSortDirection: SortDirection.DESC,
        currency: currency,
      },
      {
        apiUrl: NOFRIXION_API_URL,
      },
    )

  const { data: metricsResponse, isLoading: isMetricsLoading } = usePaymentRequestMetrics(
    { merchantId: merchant?.id, fromDateMS: startOfDay(last30Days).getTime() },
    {
      apiUrl: NOFRIXION_API_URL,
    },
  )

  useEffect(() => {
    if (accountsWithTransactionMetricsResponse?.status === 'success') {
      setAccounts(accountsWithTransactionMetricsResponse.data.content)
    } else if (accountsWithTransactionMetricsResponse?.status === 'error') {
      console.error(accountsWithTransactionMetricsResponse.error)
      // authState?.logOut && authState?.logOut()
    }
  }, [accountsWithTransactionMetricsResponse, authState])

  useEffect(() => {
    if (metricsResponse?.status === 'success') {
      setMetrics(metricsResponse.data)
    } else if (metricsResponse?.status === 'error') {
      console.error(metricsResponse.error)
      // authState?.logOut && authState?.logOut()
    }
  }, [authState, metricsResponse])

  if (isMetricsLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="flex items-center justify-center p-24 min-h-screen" />
      </div>
    )
  }

  return (
    <>
      <h1 className="text-[1.75rem]/8 font-medium mb-8 md:mb-16 md:px-4">Your current status</h1>
      <div>
        <div className="flex flex-col lg:flex-row gap-4">
          {currency && (
            <TopAccountsCard
              accounts={remoteAccountsWithTransactionMetricsToLocalAccountsWithTransactionMetrics(
                accounts,
              )}
              isLoading={isAccountsLoading}
              currency={currency}
              onCurrencyChange={setCurrency}
              className="md:pb-2"
            />
          )}
          <Card title="Latest transactions" subtext="Coming soon" />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          <AcountsReceivableCard
            onShowViewAll={() => {
              navigate('accounts-receivable')
            }}
            paid={metrics?.paid}
            unpaid={metrics?.unpaid}
            partiallyPaid={metrics?.partiallyPaid}
          />

          <AccountPayableCard
            onShowViewAll={() => {
              navigate('accounts-payable')
            }}
          />
        </div>
      </div>
    </>
  )
}

export default DashboardPage
