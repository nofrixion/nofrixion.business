import {
  ApiError,
  Payout,
  PayoutMetrics,
  PayoutStatus,
  SortDirection,
  useMerchant,
  usePayoutMetrics,
  usePayouts,
} from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { add, endOfDay, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'

import { LocalPayout } from '../../../types/LocalTypes'
import { remotePayoutsToLocal } from '../../../utils/parsers'
import { DateRange } from '../../ui/DateRangePicker/DateRangePicker'
import { PayoutDashboard as UIPayoutDashboard } from '../../ui/pages/PayoutDashboard/PayoutDashboard'
import { FilterableTag } from '../../ui/TagFilter/TagFilter'
import { makeToast } from '../../ui/Toast/Toast'
import PayoutDetailsModal from '../PayoutDetailsModal/PayoutDetailsModal'

export interface PayoutDashboardProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string
  onUnauthorized: () => void
}

const queryClient = new QueryClient()

const PayoutDashboard = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: PayoutDashboardProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PayoutDashboardMain
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
        onUnauthorized={onUnauthorized}
      />
    </QueryClientProvider>
  )
}

const pageSize = 20

const PayoutDashboardMain = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: PayoutDashboardProps) => {
  const [page, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [localPayouts, setLocalPayouts] = useState<LocalPayout[]>([])
  const [statusSortDirection, setStatusSortDirection] = useState<SortDirection>(SortDirection.NONE)
  const [createdSortDirection, setCreatedSortDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )
  const [counterPartyNameSortDirection, setCounterPartyNameSortDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )
  const [amountSortDirection, setAmountSortDirection] = useState<SortDirection>(SortDirection.NONE)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState<PayoutStatus>(PayoutStatus.All)
  const [queryStatuses, setQueryStatuses] = useState<PayoutStatus[]>([])
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: startOfDay(add(new Date(), { days: -90 })), // Last 90 days as default
    toDate: endOfDay(new Date()),
  })
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [currencyFilter, setCurrencyFilter] = useState<string | undefined>()
  const [minAmountFilter, setMinAmountFilter] = useState<number | undefined>()
  const [maxAmountFilter, setMaxAmountFilter] = useState<number | undefined>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState<FilterableTag[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tagsFilter, setTagsFilter] = useState<string[]>([])
  const [selectedPayoutId, setSelectedPayoutId] = useState<string | undefined>(undefined)
  const [metrics, setMetrics] = useState<PayoutMetrics | undefined>(undefined)
  const [firstMetrics, setFirstMetrics] = useState<PayoutMetrics | undefined>()

  const { data: metricsResponse, isLoading: isLoadingMetrics } = usePayoutMetrics(
    {
      merchantId: merchantId,
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

  const { data: merchant } = useMerchant({ apiUrl, authToken: token }, { merchantId })

  const { data: payoutsResponse, isLoading: isLoadingPayouts } = usePayouts(
    {
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      amountSortDirection: amountSortDirection,
      createdSortDirection: createdSortDirection,
      statusSortDirection: statusSortDirection,
      counterPartyNameSortDirection: counterPartyNameSortDirection,
      fromDateMS: dateRange.fromDate && dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate && dateRange.toDate.getTime(),
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
      statuses: queryStatuses,
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
    }
  }, [payoutsResponse])

  useEffect(() => {
    // setShowMorePage(1)
    setLocalPayouts(remotePayoutsToLocal(payouts))
  }, [payouts])

  useEffect(() => {
    if (metricsResponse?.status === 'success') {
      setMetrics(metricsResponse.data)
    } else if (metricsResponse?.status === 'error') {
      makeToast('error', 'Error fetching metrics.')
      console.error(metricsResponse.error)
      handleApiError(metricsResponse.error)
    }
  }, [metricsResponse])

  useEffect(() => {
    switch (status) {
      case PayoutStatus.All:
        setQueryStatuses([])
        break
      case PayoutStatus.PENDING:
        setQueryStatuses([PayoutStatus.PENDING, PayoutStatus.QUEUED, PayoutStatus.QUEUED_UPSTREAM])
        break
      case PayoutStatus.PROCESSED:
        setQueryStatuses([PayoutStatus.PROCESSED])
        break
      case PayoutStatus.PENDING_APPROVAL:
        setQueryStatuses([PayoutStatus.PENDING_APPROVAL, PayoutStatus.PENDING_INPUT])
        break
      case PayoutStatus.FAILED:
        setQueryStatuses([PayoutStatus.FAILED, PayoutStatus.REJECTED, PayoutStatus.UNKNOWN])
        break
    }
  }, [status])

  const handleApiError = (error: ApiError) => {
    if (error && error.status === 401) {
      onUnauthorized()
    }
  }

  const onPageChange = (page: number) => {
    setPage(page)
  }

  const onDateChange = (dateRange: DateRange) => {
    setDateRange(dateRange)
  }

  const onSort = (
    column: 'status' | 'date' | 'amount' | 'counterParty.name',
    direction: SortDirection,
  ) => {
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
      case 'counterParty.name':
        setCounterPartyNameSortDirection(direction)
        break
    }
  }

  const onCreatePayout = () => {
    console.log('Create payout')
  }

  const onPayoutDetailsModalDismiss = () => {
    setSelectedPayoutId(undefined)
  }

  const onPayoutRowClicked = (payout: LocalPayout) => {
    setSelectedPayoutId(payout.id)
  }

  // Store the results of the first execution of the metrics
  // and use them as the initial state of the metrics.
  // This way, when they change the dates
  // we don't see the metrics disappear
  useEffect(() => {
    if (metrics && (!firstMetrics || firstMetrics?.all === 0)) {
      setFirstMetrics(metrics)
    }
  }, [metrics])

  const isInitialState = !isLoadingMetrics && (!firstMetrics || firstMetrics?.all === 0)

  return (
    <div>
      <UIPayoutDashboard
        payouts={localPayouts}
        payoutMetrics={metrics}
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
        isLoadingMetrics={isLoadingMetrics}
        isInitialState={isInitialState}
        onCreatePayout={onCreatePayout}
        merchantCreatedAt={
          merchant?.status == 'success' ? new Date(merchant?.data.inserted) : undefined
        }
        setStatus={setStatus}
        currency={currencyFilter}
        setCurrency={setCurrencyFilter}
        minAmount={minAmountFilter}
        setMinAmount={setMinAmountFilter}
        maxAmount={maxAmountFilter}
        setMaxAmount={setMaxAmountFilter}
        onPayoutClicked={onPayoutRowClicked}
        selectedPayoutId={selectedPayoutId}
      />

      <PayoutDetailsModal
        open={!!selectedPayoutId}
        amountSortDirection={amountSortDirection}
        apiUrl={apiUrl}
        selectedPayoutId={selectedPayoutId}
        onDismiss={onPayoutDetailsModalDismiss}
        merchantId={merchantId}
        statusSortDirection={statusSortDirection}
        createdSortDirection={createdSortDirection}
        page={page}
        pageSize={pageSize}
        dateRange={dateRange}
        searchFilter={searchFilter}
        currencyFilter={currencyFilter}
        minAmountFilter={minAmountFilter}
        maxAmountFilter={maxAmountFilter}
        tagsFilter={tagsFilter}
      />
    </div>
  )
}

export default PayoutDashboard
