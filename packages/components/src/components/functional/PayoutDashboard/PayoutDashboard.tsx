import {
  Account,
  Payout,
  PayoutStatus,
  SortDirection,
  useAccounts,
  useMerchant,
  usePayouts,
} from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { add, endOfDay, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'

import { LocalPayout } from '../../../types/LocalTypes'
import { remoteAccountsToLocalAccounts, remotePayoutsToLocal } from '../../../utils/parsers'
import { DateRange } from '../../ui/DateRangePicker/DateRangePicker'
import { PayoutDashboard as UIPayoutDashboard } from '../../ui/pages/PayoutDashboard/PayoutDashboard'
import { FilterableTag } from '../../ui/TagFilter/TagFilter'
import { makeToast } from '../../ui/Toast/Toast'
import CreatePayoutModal from '../CreatePayoutModal/CreatePayoutModal'

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
  const [accounts, setAccounts] = useState<Account[] | undefined>(undefined)
  const [localPayouts, setLocalPayouts] = useState<LocalPayout[]>([])
  const [statusSortDirection, setStatusSortDirection] = useState<SortDirection>(SortDirection.NONE)
  const [createdSortDirection, setCreatedSortDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )

  const [amountSortDirection, setAmountSortDirection] = useState<SortDirection>(SortDirection.NONE)

  const [createPayoutClicked, setCreatePayoutClicked] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState<PayoutStatus>(PayoutStatus.All)
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

  const { data: merchant } = useMerchant({ apiUrl, authToken: token }, { merchantId })

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
      status: status,
      search: searchFilter?.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { data: accountsResponse } = useAccounts({ merchantId }, { apiUrl, authToken: token })

  useEffect(() => {
    if (accountsResponse?.status === 'success') {
      setAccounts(accountsResponse.data)
    } else if (accountsResponse?.status === 'error') {
      console.error(accountsResponse.error)
    }
  }, [accountsResponse])

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
    setCreatePayoutClicked(true)
  }

  return (
    <>
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
        merchantCreatedAt={
          merchant?.status == 'success' ? new Date(merchant?.data.inserted) : undefined
        }
        currency={currencyFilter}
        setCurrency={setCurrencyFilter}
        minAmount={minAmountFilter}
        setMinAmount={setMinAmountFilter}
        maxAmount={maxAmountFilter}
        setMaxAmount={setMaxAmountFilter}
      />

      {accounts && (
        <CreatePayoutModal
          accounts={remoteAccountsToLocalAccounts(accounts)}
          amountSortDirection={amountSortDirection}
          createdSortDirection={createdSortDirection}
          statusSortDirection={statusSortDirection}
          currency={currencyFilter}
          minAmount={minAmountFilter}
          maxAmount={maxAmountFilter}
          tags={tagsFilter}
          pageSize={pageSize}
          pageNumber={page}
          fromDateMS={dateRange.fromDate && dateRange.fromDate.getTime()}
          toDateMS={dateRange.toDate && dateRange.toDate.getTime()}
          status={status}
          search={searchFilter?.length >= 3 ? searchFilter : undefined}
          beneficiaries={[]}
          apiUrl={apiUrl}
          token={token}
          isOpen={createPayoutClicked}
          onDismiss={() => {
            setCreatePayoutClicked(false)
          }}
          merchantId={merchantId}
        />
      )}
    </>
  )
}

export default PayoutDashboard
