import { SortDirection, useAccount, useTransactions } from '@nofrixion/clients'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { add, endOfDay, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'

import { LocalTransaction } from '../../../types/LocalTypes'
import { remoteTransactionsToLocal } from '../../../utils/parsers'
import { DateRange } from '../../ui/DateRangePicker/DateRangePicker'
import { AccountDashboard as UIAccountDashboard } from '../../ui/pages/AccountDashboard/AccountDashboard'

export interface AccountDashboardProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  onAllCurrentAccountsClick?: () => void
  accountId: string // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl: string // Example: "https://api.nofrixion.com/api/v1"
}

const AccountDashboard = ({
  token,
  accountId,
  onAllCurrentAccountsClick,
  apiUrl = 'https://api.nofrixion.com/api/v1',
}: AccountDashboardProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AccountDashboardMain
        token={token}
        accountId={accountId}
        apiUrl={apiUrl}
        onAllCurrentAccountsClick={onAllCurrentAccountsClick}
      />
    </QueryClientProvider>
  )
}

const pageSize = 10

const AccountDashboardMain = ({
  token,
  accountId,
  apiUrl,
  onAllCurrentAccountsClick,
}: AccountDashboardProps) => {
  const [page, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [transactions, setTransactions] = useState<LocalTransaction[]>([])
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: startOfDay(add(new Date(), { days: -90 })), // Last 90 days as default
    toDate: endOfDay(new Date()),
  })

  const [searchFilter, setSearchFilter] = useState<string>('')

  const [transactionDateSortDirection, setTransactionDateDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )
  const [amountSortDirection, setAmountSortDirection] = useState<SortDirection>(SortDirection.NONE)

  const { data: transactionsResponse } = useTransactions(
    {
      accountId,
      pageNumber: page,
      pageSize: pageSize,
      dateSortDirection: transactionDateSortDirection,
      amountSortDirection: amountSortDirection,
      fromDateMS: dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate.getTime(),
      search: searchFilter,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { data: accountResponse } = useAccount(
    {
      accountId,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  useEffect(() => {
    if (transactionsResponse?.status === 'success') {
      setTransactions(remoteTransactionsToLocal(transactionsResponse.data.content))
      setTotalRecords(transactionsResponse.data.totalSize)
    } else if (transactionsResponse?.status === 'error') {
      // TODO: Handle error
      console.error(transactionsResponse.error)
    }
  }, [transactionsResponse])

  const onPageChange = (page: number) => {
    setPage(page)
  }

  const onSort = (column: 'date' | 'amount', direction: SortDirection) => {
    switch (column) {
      case 'date':
        setTransactionDateDirection(direction)
        break
      case 'amount':
        setAmountSortDirection(direction)
        break
    }
  }

  const onDateChange = (dateRange: DateRange) => {
    setDateRange(dateRange)
  }

  return (
    <UIAccountDashboard
      transactions={transactions}
      account={accountResponse?.status == 'success' ? accountResponse?.data : undefined}
      pagination={{
        pageSize: pageSize,
        totalSize: totalRecords,
      }}
      onPageChange={onPageChange}
      onSort={onSort}
      onDateChange={onDateChange}
      onSearch={setSearchFilter}
      searchFilter={searchFilter}
      onAllCurrentAccountsClick={onAllCurrentAccountsClick}
    />
  )
}

export default AccountDashboard
