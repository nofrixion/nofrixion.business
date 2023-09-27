import {
  Account,
  ApiError,
  Beneficiary,
  Payout,
  PayoutClient,
  PayoutMetrics,
  PayoutStatus,
  SortDirection,
  useAccounts,
  useBeneficiaries,
  useMerchant,
  useMerchantTags,
  usePayoutMetrics,
  usePayouts,
} from '@nofrixion/moneymoov'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { add, endOfDay, startOfDay } from 'date-fns'
import { useEffect, useRef, useState } from 'react'

import { ApproveType, LocalPayout, LocalTag } from '../../../types/LocalTypes'
import {
  parseApiTagToLocalTag,
  remoteAccountsToLocalAccounts,
  remoteBeneficiariesToLocalBeneficiaries,
  remotePayoutsToLocal,
} from '../../../utils/parsers'
import { DateRange } from '../../ui/DateRangePicker/DateRangePicker'
import { PayoutDashboard as UIPayoutDashboard } from '../../ui/pages/PayoutDashboard/PayoutDashboard'
import { FilterableTag } from '../../ui/TagFilter/TagFilter'
import { makeToast } from '../../ui/Toast/Toast'
import { PayoutAuthoriseForm } from '../../ui/utils/PayoutAuthoriseForm'
import CreatePayoutModal from '../CreatePayoutModal/CreatePayoutModal'
import PayoutDetailsModal from '../PayoutDetailsModal/PayoutDetailsModal'

export interface PayoutDashboardProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string
  onUnauthorized: () => void
}

const PayoutDashboard = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: PayoutDashboardProps) => {
  const queryClient = useQueryClient()

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
  const [payouts, setPayouts] = useState<Payout[] | undefined>(undefined)
  const [accounts, setAccounts] = useState<Account[] | undefined>(undefined)
  const [statusSortDirection, setStatusSortDirection] = useState<SortDirection>(SortDirection.NONE)
  const [createdSortDirection, setCreatedSortDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )
  const [counterPartyNameSortDirection, setCounterPartyNameSortDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )
  const [amountSortDirection, setAmountSortDirection] = useState<SortDirection>(SortDirection.NONE)

  const [createPayoutClicked, setCreatePayoutClicked] = useState<boolean>(false)
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])

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
  const [tags, setTags] = useState<FilterableTag[]>([])
  const [tagsFilter, setTagsFilter] = useState<string[]>([])
  const [selectedPayoutId, setSelectedPayoutId] = useState<string | undefined>(undefined)
  const [metrics, setMetrics] = useState<PayoutMetrics | undefined>(undefined)
  const [firstMetrics, setFirstMetrics] = useState<PayoutMetrics | undefined>()
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([])
  const [batchId, setBatchId] = useState<string | undefined>(undefined)
  const authoriseFormRef = useRef<HTMLFormElement>(null)

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

  useEffect(() => {
    if (isLoadingMetrics) {
      setMetrics(undefined)
      setFirstMetrics(undefined)
    }
  }, [isLoadingMetrics])

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
      status: status,
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
    if (isLoadingPayouts) {
      setPayouts(undefined)
    }
  }, [isLoadingPayouts])

  const { data: accountsResponse } = useAccounts({ merchantId }, { apiUrl, authToken: token })

  useEffect(() => {
    if (accountsResponse?.status === 'success') {
      setAccounts(accountsResponse.data)
    } else if (accountsResponse?.status === 'error') {
      console.error(accountsResponse.error)
    }
  }, [accountsResponse])

  const { data: beneficiariesResponse } = useBeneficiaries(
    { pageNumber: page, pageSize, search: searchFilter, currency: currencyFilter },
    { apiUrl, authToken: token },
  )

  useEffect(() => {
    if (beneficiariesResponse?.status === 'success') {
      setBeneficiaries(beneficiariesResponse.data.content)
    } else if (beneficiariesResponse?.status === 'error') {
      console.error(beneficiariesResponse.error)
    }
  }, [beneficiariesResponse])

  const { data: merchantTagsResponse } = useMerchantTags(
    { merchantId: merchantId },
    { apiUrl: apiUrl, authToken: token },
  )

  const [localMerchantTags, setLocalMerchantTags] = useState<LocalTag[]>([] as LocalTag[])

  const getSelectedTagFilters = () => {
    if (!tags) {
      return []
    }

    return tags.filter((tag) => tag.isSelected).map((tag) => tag.id)
  }

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
    if (metricsResponse?.status === 'success') {
      setMetrics(metricsResponse.data)
    } else if (metricsResponse?.status === 'error') {
      makeToast('error', 'Error fetching metrics.')
      console.error(metricsResponse.error)
      handleApiError(metricsResponse.error)
    }
  }, [metricsResponse])

  useEffect(() => {
    setMetrics(undefined)
    setFirstMetrics(undefined)
    setPage(1)
    setPayouts(undefined)
    setStatus(PayoutStatus.All)
  }, [merchantId])

  useEffect(() => {
    if (merchantTagsResponse?.status === 'success') {
      setLocalMerchantTags(merchantTagsResponse.data.map((tag) => parseApiTagToLocalTag(tag)))
      setTags(
        merchantTagsResponse.data.map((tag) => {
          return {
            id: tag.id,
            label: tag.name,
            isSelected: false,
          }
        }),
      )
    } else if (merchantTagsResponse?.status === 'error') {
      console.warn(merchantTagsResponse.error)
      handleApiError(merchantTagsResponse.error)
    }
  }, [merchantTagsResponse])

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

  useEffect(() => {
    const tempTagArray = getSelectedTagFilters()
    setTagsFilter([...tempTagArray])
  }, [tags])

  useEffect(() => {
    if (batchId !== undefined) {
      authoriseFormRef.current?.submit()
    }
  }, [batchId])

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
    setCreatePayoutClicked(true)
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
    if (!isLoadingMetrics && metrics && !firstMetrics) {
      setFirstMetrics(metrics)
    }
  }, [metrics])

  const payoutStatusToMetricsStatus = (
    status: PayoutStatus,
  ): 'all' | 'paid' | 'inProgress' | 'pendingApproval' | 'failed' => {
    switch (status) {
      case PayoutStatus.All:
        return 'all'
      case PayoutStatus.PENDING:
        return 'inProgress'
      case PayoutStatus.PROCESSED:
        return 'paid'
      case PayoutStatus.PENDING_APPROVAL:
        return 'pendingApproval'
      case PayoutStatus.FAILED:
        return 'failed'
      default:
        return 'all'
    }
  }

  const isInitialState = !isLoadingMetrics && firstMetrics !== undefined && firstMetrics?.all === 0

  const payoutsExists =
    !isLoadingMetrics &&
    metrics !== undefined &&
    status !== undefined &&
    metrics[payoutStatusToMetricsStatus(status)] > 0

  const addPayoutForAuthorise = (payoutId: string) => {
    if (!selectedPayouts.includes(payoutId)) {
      setSelectedPayouts((prev) => [...prev, payoutId])
    }
  }

  const removePayoutForAuthorise = (payoutId: string) => {
    setSelectedPayouts((prev) => prev.filter((id) => id !== payoutId))
  }

  const onApproveBatchPayouts = async () => {
    if (selectedPayouts && selectedPayouts.length > 1) {
      const client = new PayoutClient({ apiUrl, authToken: token })

      const payoutIds = selectedPayouts.map((id) => id)
      const response = await client.createBatch({ payoutIDs: payoutIds })

      if (response.status === 'success') {
        const batchId = response.data.id
        setBatchId(batchId)
      } else {
        makeToast('error', 'Error creating payout batch.')
      }
    }
  }

  return (
    <div>
      <UIPayoutDashboard
        payouts={payouts ? remotePayoutsToLocal(payouts) : undefined}
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
        tags={tags}
        setTags={setTags}
        createdSortDirection={createdSortDirection}
        setCreatedSortDirection={setCreatedSortDirection}
        amountSortDirection={amountSortDirection}
        setAmountSortDirection={setAmountSortDirection}
        status={status}
        onAddPayoutForAuthorise={addPayoutForAuthorise}
        onRemovePayoutForAuthorise={removePayoutForAuthorise}
        selectedPayouts={selectedPayouts}
        onApproveBatchPayouts={onApproveBatchPayouts}
        payoutsExist={payoutsExists}
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
        counterPartyNameSortDirection={counterPartyNameSortDirection}
        page={page}
        pageSize={pageSize}
        dateRange={dateRange}
        statuses={queryStatuses}
        searchFilter={searchFilter}
        currencyFilter={currencyFilter}
        minAmountFilter={minAmountFilter}
        maxAmountFilter={maxAmountFilter}
        tagsFilter={tagsFilter}
        merchantTags={localMerchantTags}
      />

      {merchantId && accounts && accounts.find((x) => x.merchantID === merchantId) && (
        <CreatePayoutModal
          accounts={remoteAccountsToLocalAccounts(accounts)}
          beneficiaries={remoteBeneficiariesToLocalBeneficiaries(
            beneficiaries?.filter((x) => x.merchantID === merchantId),
          )}
          apiUrl={apiUrl}
          token={token}
          isOpen={createPayoutClicked}
          onDismiss={() => {
            setCreatePayoutClicked(false)
          }}
          merchantId={merchantId}
        />
      )}

      {batchId && (
        <PayoutAuthoriseForm
          id={batchId}
          size="x-small"
          formRef={authoriseFormRef}
          className="hidden"
          approveType={ApproveType.BATCH_PAYOUT}
        />
      )}
    </div>
  )
}

export default PayoutDashboard
