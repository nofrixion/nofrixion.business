import { useQuery } from '@tanstack/react-query'

import { TransactionsClient } from '../clients'
import { formatSortExpression } from '../types'
import { ApiResponse, PageResponse, Transaction } from '../types/ApiResponses'
import { ApiProps, SortByTransactions, useTransactionsProps } from '../types/props'

type TransactionPageResponse = PageResponse<Transaction>

const fetchTransactions = async (
  apiUrl: string,
  accountId?: string,
  authToken?: string,
  pageNumber?: number,
  pageSize?: number,
  fromDateMS?: number,
  toDateMS?: number,
  search?: string,
  sortBy?: SortByTransactions,
): Promise<ApiResponse<TransactionPageResponse>> => {
  const sortExpression = sortBy ? formatSortExpression(sortBy) : ''

  const client = new TransactionsClient({ apiUrl, authToken })

  const response = await client.get({
    accountId,
    pageNumber,
    pageSize,
    fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
    toDate: toDateMS ? new Date(toDateMS) : undefined,
    sort: sortExpression,
    search,
  })

  return response
}

export const useTransactions = (
  { accountId, pageNumber, pageSize, fromDateMS, toDateMS, search, sortBy }: useTransactionsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'Transactions',
    accountId,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    apiUrl,
    authToken,
    search,
    sortBy,
  ]

  return useQuery<ApiResponse<TransactionPageResponse>, Error>(
    QUERY_KEY,
    () =>
      fetchTransactions(
        apiUrl,
        accountId,
        authToken,
        pageNumber,
        pageSize,
        fromDateMS,
        toDateMS,
        search,
        sortBy,
      ),
    {
      enabled: !!accountId,
    },
  )
}
