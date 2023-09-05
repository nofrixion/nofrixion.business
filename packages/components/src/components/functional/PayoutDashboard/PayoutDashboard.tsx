/* eslint-disable @typescript-eslint/no-unused-vars */
import { Payout, PayoutStatus, SortDirection, usePayouts } from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { add, endOfDay, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'

import { LocalPayout } from '../../../types/LocalTypes'
import { remotePayoutsToLocal } from '../../../utils/parsers'
import { DateRange } from '../../ui/DateRangePicker/DateRangePicker'
import { PayoutDashboard as UIPayoutDashboard } from '../../ui/pages/PayoutDashboard/PayoutDashboard'
import { FilterableTag } from '../../ui/TagFilter/TagFilter'
import { makeToast } from '../../ui/Toast/Toast'

export interface PayoutDashboardProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string
}

const queryClient = new QueryClient()

const PayoutDashboard = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
}: PayoutDashboardProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PayoutDashboardMain token={token} merchantId={merchantId} apiUrl={apiUrl} />
    </QueryClientProvider>
  )
}

const pageSize = 20

const PayoutDashboardMain = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
}: PayoutDashboardProps) => {
  const [page, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [localPayouts, setLocalPayouts] = useState<LocalPayout[]>([])
  const [statusSortDirection, setStatusSortDirection] = useState<SortDirection>(SortDirection.NONE)
  const [createdSortDirection, setCreatedSortDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )

  const [amountSortDirection, setAmountSortDirection] = useState<SortDirection>(SortDirection.NONE)
  const [status, setStatus] = useState<PayoutStatus>(PayoutStatus.All)
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: startOfDay(add(new Date(), { days: -90 })), // Last 90 days as default
    toDate: endOfDay(new Date()),
  })
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [currencyFilter, setCurrencyFilter] = useState<string | undefined>()
  const [minAmountFilter, setMinAmountFilter] = useState<number | undefined>()
  const [maxAmountFilter, setMaxAmountFilter] = useState<number | undefined>()
  const [tags, setTags] = useState<FilterableTag[]>([])
  const [tagsFilter, setTagsFilter] = useState<string[]>([])

  const { data: payoutsResponse, isLoading: isLoadingPayouts } = usePayouts(
    {
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      amountSortDirection: amountSortDirection,
      createdSortDirection: createdSortDirection,
      statusSortDirection: statusSortDirection,
      fromDateMS: dateRange.fromDate && dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate && dateRange.toDate.getTime(),
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  useEffect(() => {
    if (payoutsResponse?.status === 'success') {
      setPayouts(payoutsResponse.data.content)
      setTotalRecords(payoutsResponse.data.totalSize)
    } else if (payoutsResponse?.status === 'error') {
      makeToast('error', 'Error fetching payment requests.')
      console.error(payoutsResponse.error)

      //   handleApiError(payoutsResponse.error)
    }
  }, [payoutsResponse])

  useEffect(() => {
    // setShowMorePage(1)
    setLocalPayouts(remotePayoutsToLocal(payouts))
  }, [payouts])

  const onPageChange = (page: number) => {
    setPage(page)
  }

  const onDateChange = (dateRange: DateRange) => {
    setDateRange(dateRange)
  }

  const onSort = (column: 'status' | 'date' | 'amount', direction: SortDirection) => {
    switch (column) {
      case 'status':
        setStatusSortDirection(direction)
        break
      case 'date':
        setCreatedSortDirection(direction)
        break
      case 'amount':
        setAmountSortDirection(direction)
        break
    }
  }

  const onCreatePayout = () => {
    console.log('Create payout')
  }

  return (
    <UIPayoutDashboard
      payouts={localPayouts}
      pagination={{
        pageSize: pageSize,
        totalSize: totalRecords,
      }}
      onPageChange={onPageChange}
      onDateChange={onDateChange}
      onSearch={setSearchFilter}
      onSort={onSort}
      searchFilter={searchFilter}
      isLoading={isLoadingPayouts}
      onCreatePayout={onCreatePayout}
    />
  )
}

export default PayoutDashboard
