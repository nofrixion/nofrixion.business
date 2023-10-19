import {
  AccountStatisticsCard,
  LatestTransactionsCard,
} from '@nofrixion/components/src/components/ui/molecules'
import {
  remoteAccountMetricsArrayToLocalAccountMetricsArray,
  remoteAccountsWithTransactionMetricsToLocalAccountsWithTransactionMetrics,
  remoteTransactionsToLocal,
} from '@nofrixion/components/src/utils/parsers'
import {
  AccountMetrics,
  AccountTransactionMetrics,
  Currency,
  PaymentRequestMetrics,
  SortDirection,
  Transaction,
  useAccountMetrics,
  useAccountsWithTransactionMetrics,
  usePaymentRequestMetrics,
  useTransactionsForMerchant,
} from '@nofrixion/moneymoov'
import { addDays, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AccountPayableCard from '../../components/AccountPayableCard'
import AcountsReceivableCard from '../../components/AcountsReceivableCard'
import { Loader } from '../../components/ui/Loader/Loader'
import { AuthContextType } from '../../lib/auth/AuthProvider'
import { useAuth } from '../../lib/auth/useAuth'
import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'

const last30Days = addDays(new Date(), -30)

const DashboardPage = () => {
  const { merchant } = useMerchantStore()
  const navigate = useNavigate()
  const { authState } = useAuth() as AuthContextType

  const [accounts, setAccounts] = useState<AccountTransactionMetrics[]>([])
  const [accountMetrics, setAccountMetrics] = useState<AccountMetrics[]>([])
  const [metrics, setMetrics] = useState<PaymentRequestMetrics>()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const { data: accountMetricsResponse, isLoading: isAccountMetricsLoading } = useAccountMetrics(
    { merchantId: merchant?.id },
    {
      apiUrl: NOFRIXION_API_URL,
    },
  )
  const [currency, setCurrency] = useState<Currency | undefined>(undefined)
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

  const isDashboardLoading = isAccountMetricsLoading || isAccountsLoading

  const singleCurrency =
    !isAccountMetricsLoading && accountMetrics.length === 1 ? accountMetrics[0].currency : undefined

  useEffect(() => {
    if (singleCurrency && accountMetrics.length === 1) {
      setCurrency(singleCurrency)
    } else if (accountMetrics.length > 1) {
      setCurrency(Currency.EUR)
    }
  }, [singleCurrency, accountMetrics])

  useEffect(() => {
    if (merchant) {
      setCurrency(undefined)
      setAccountMetrics([])
      setAccounts([])
    }
  }, [merchant])

  const { data: metricsResponse, isLoading: isMetricsLoading } = usePaymentRequestMetrics(
    { merchantId: merchant?.id, fromDateMS: startOfDay(last30Days).getTime() },
    {
      apiUrl: NOFRIXION_API_URL,
    },
  )

  const { data: transactionsResponse, isLoading: isTransactionsLoading } =
    useTransactionsForMerchant(
      { merchantId: merchant?.id },
      { pageSize: 10 },
      {
        apiUrl: NOFRIXION_API_URL,
      },
    )
  useEffect(() => {
    if (accountsWithTransactionMetricsResponse?.status === 'success') {
      setAccounts(accountsWithTransactionMetricsResponse.data.content)
    } else if (accountsWithTransactionMetricsResponse?.status === 'error') {
      console.error(accountsWithTransactionMetricsResponse.error)
    }
  }, [accountsWithTransactionMetricsResponse, authState])

  useEffect(() => {
    if (accountMetricsResponse?.status === 'success') {
      setAccountMetrics(accountMetricsResponse.data)
    } else if (accountMetricsResponse?.status === 'error') {
      console.error(accountMetricsResponse.error)
    }
  }, [accountMetricsResponse, authState])

  useEffect(() => {
    if (metricsResponse?.status === 'success') {
      setMetrics(metricsResponse.data)
    } else if (metricsResponse?.status === 'error') {
      console.error(metricsResponse.error)
    }
  }, [authState, metricsResponse])

  useEffect(() => {
    if (transactionsResponse?.status === 'success') {
      setTransactions(transactionsResponse.data.content)
    } else if (transactionsResponse?.status === 'error') {
      console.error(transactionsResponse.error)
      // authState?.logOut && authState?.logOut()
    }
  }, [authState, transactionsResponse])

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
        <div className="flex flex-col xl:flex-row gap-4">
          <AccountStatisticsCard
            accounts={remoteAccountsWithTransactionMetricsToLocalAccountsWithTransactionMetrics(
              accounts,
            )}
            isLoading={isDashboardLoading}
            currency={currency}
            onCurrencyChange={isAccountMetricsLoading || singleCurrency ? undefined : setCurrency}
            className="md:pb-2 h-[485.58px]"
            accountMetrics={remoteAccountMetricsArrayToLocalAccountMetricsArray(accountMetrics)}
          />
          <LatestTransactionsCard
            transactions={remoteTransactionsToLocal(transactions)}
            isLoading={isTransactionsLoading}
          />
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
