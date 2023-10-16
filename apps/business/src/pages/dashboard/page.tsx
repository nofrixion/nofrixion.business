import Card from '@nofrixion/components/src/components/ui/atoms/Card/Card'
import { LatestTransactionsCard } from '@nofrixion/components/src/components/ui/molecules'
import { remoteTransactionsToLocal } from '@nofrixion/components/src/utils/parsers'
import {
  PaymentRequestMetrics,
  Transaction,
  usePaymentRequestMetrics,
  useTransactionsForUser,
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

  const [metrics, setMetrics] = useState<PaymentRequestMetrics>()
  const [transactions, setTransactions] = useState<Transaction[]>([])

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
        <div className="flex flex-col lg:flex-row gap-4">
          <Card title="Your accounts" subtext="Coming soon" />
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
