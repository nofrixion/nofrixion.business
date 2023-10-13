import { LatestTransactionsCard } from '@nofrixion/components/src/components/ui/molecules'
import { remoteTransactionsToLocal } from '@nofrixion/components/src/utils/parsers'
import {
  PaymentRequestMetrics,
  Transaction,
  useAccounts,
  usePaymentRequestMetrics,
  useTransactionsForUser,
} from '@nofrixion/moneymoov'
import { addDays, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AccountPayableCard from '../../components/AccountPayableCard'
import AcountsReceivableCard from '../../components/AcountsReceivableCard'
import { Loader } from '../../components/ui/Loader/Loader'
import AccountsCarousel from '../../components/ui/molecules/AccountsCarousel'
import { AuthContextType } from '../../lib/auth/AuthProvider'
import { useAuth } from '../../lib/auth/useAuth'
import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'
import { Account } from '../../lib/types/localTypes'

const last30Days = addDays(new Date(), -30)

const DashboardPage = () => {
  const { merchant } = useMerchantStore()
  const navigate = useNavigate()
  const { authState } = useAuth() as AuthContextType

  const [accounts, setAccounts] = useState<Account[]>([])
  const [metrics, setMetrics] = useState<PaymentRequestMetrics>()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const { data: accountsResponse, isLoading: isAccountsLoading } = useAccounts(
    { merchantId: merchant?.id, connectedAccounts: true },
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

  const { data: transactionsResponse, isLoading: isTransactionsLoading } = useTransactionsForUser(
    { fromDateMS: startOfDay(last30Days).getTime(), pageSize: 10 },
    {
      apiUrl: NOFRIXION_API_URL,
    },
  )

  useEffect(() => {
    if (accountsResponse?.status === 'success') {
      setAccounts(accountsResponse.data)
    } else if (accountsResponse?.status === 'error') {
      console.error(accountsResponse.error)
      // authState?.logOut && authState?.logOut()
    }
  }, [accountsResponse, authState])

  useEffect(() => {
    if (metricsResponse?.status === 'success') {
      setMetrics(metricsResponse.data)
    } else if (metricsResponse?.status === 'error') {
      console.error(metricsResponse.error)
      // authState?.logOut && authState?.logOut()
    }
  }, [authState, metricsResponse])

  useEffect(() => {
    if (transactionsResponse?.status === 'success') {
      setTransactions(transactionsResponse.data.content)
      console.log(transactionsResponse.data.content)
    } else if (transactionsResponse?.status === 'error') {
      console.error(transactionsResponse.error)
      // authState?.logOut && authState?.logOut()
    }
  }, [authState, transactionsResponse])

  if (isAccountsLoading || isMetricsLoading) {
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
        <LatestTransactionsCard
          transactions={remoteTransactionsToLocal(transactions)}
          isLoading={isTransactionsLoading}
          className="mb-4"
        />

        <div className="-mx-8 md:-mx-14">
          {!isAccountsLoading && accounts && <AccountsCarousel accounts={accounts} />}
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
