import { PaymentRequestMetrics, useAccounts, usePaymentRequestMetrics } from '@nofrixion/moneymoov'
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

  const { data: accountsResponse, isLoading: isAccountsLoading } = useAccounts(
    { merchantId: merchant?.id },
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

  if (isAccountsLoading || isMetricsLoading) {
    return (
      <div className="biz-flex biz-justify-center biz-items-center biz-h-full">
        <Loader className="biz-flex biz-items-center biz-justify-center biz-p-24 biz-min-h-screen" />
      </div>
    )
  }

  return (
    <>
      <h1 className="biz-text-[1.75rem]/8 biz-font-medium biz-mb-8 md:biz-mb-16">
        Your current status
      </h1>
      <div className="md:-biz-mx-4">
        <div className="-biz-mx-8 md:-biz-mx-14 biz-px-8 md:biz-px-14">
          {!isAccountsLoading && accounts && <AccountsCarousel accounts={accounts} />}
        </div>

        <div className="biz-flex biz-flex-col lg:biz-flex-row biz-gap-4 biz-mt-4">
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
