import { SortDirection, useTransactions } from '@nofrixion/moneymoov'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { LocalTransaction } from '../../../types/LocalTypes'
import { remoteTransactionsToLocal } from '../../../utils/parsers'
import { TransactionsTable as UITransactionsTable } from '../../ui/organisms/TransactionsTable/TransactionsTable'

export interface CurrentAccountTableProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  accountId: string // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl: string // Example: "https://api.nofrixion.com/api/v1"
}

const CurrentAccountTable = ({
  token,
  accountId,
  apiUrl = 'https://api.nofrixion.com/api/v1',
}: CurrentAccountTableProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <CurrentAccountsTableMain token={token} accountId={accountId} apiUrl={apiUrl} />
    </QueryClientProvider>
  )
}

const pageSize = 10

const CurrentAccountsTableMain = ({ token, accountId, apiUrl }: CurrentAccountTableProps) => {
  const [page, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [transactions, setTransactions] = useState<LocalTransaction[]>([])

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

  return (
    <UITransactionsTable
      transactions={transactions}
      pagination={{
        pageSize: pageSize,
        totalSize: totalRecords,
      }}
      onPageChange={onPageChange}
      onSort={onSort}
    />
  )
}

export default CurrentAccountTable
