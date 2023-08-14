import { useQuery } from '@tanstack/react-query'

import { TransactionsClient } from '../clients'
import { formatSortExpression, SortDirection } from '../types'
import { ApiResponse, TransactionPageResponse } from '../types/ApiResponses'
import { ApiProps, useTransactionsProps } from '../types/props'

const fetchTransactions = async (
  apiUrl: string,
  accountId?: string,
  authToken?: string,
  pageNumber?: number,
  pageSize?: number,
  search?: string,
  dateSortDirection?: SortDirection,
  toSortDirection?: SortDirection,
  referenceSortDirection?: SortDirection,
  amountSortDirection?: SortDirection,
  descriptionSortDirection?: SortDirection,
  typeSortDirection?: SortDirection,
): Promise<ApiResponse<TransactionPageResponse>> => {
  const sortExpression = formatSortExpression({
    dateSortDirection: dateSortDirection,
    toSortDirection: toSortDirection,
    referenceSortDirection: referenceSortDirection,
    amountSortDirection: amountSortDirection,
    descriptionSortDirection: descriptionSortDirection,
    typeSortDirection: typeSortDirection,
  })

  const client = new TransactionsClient({ apiUrl, authToken })

  const response = await client.get({
    accountId,
    pageNumber,
    pageSize,
    sort: sortExpression,
    search,
  })

  return response
}

export const useTransactions = (
  {
    accountId,
    pageNumber,
    pageSize,
    search,
    dateSortDirection,
    toSortDirection,
    referenceSortDirection,
    amountSortDirection,
    descriptionSortDirection,
    typeSortDirection,
  }: useTransactionsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'Transactions',
    accountId,
    pageNumber,
    pageSize,
    apiUrl,
    authToken,
    search,
    dateSortDirection,
    toSortDirection,
    referenceSortDirection,
    amountSortDirection,
    descriptionSortDirection,
    typeSortDirection,
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
        search,
        dateSortDirection,
        toSortDirection,
        referenceSortDirection,
        amountSortDirection,
        descriptionSortDirection,
        typeSortDirection,
      ),
    {
      enabled: !!accountId,
    },
  )
}
