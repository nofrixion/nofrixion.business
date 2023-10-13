import { useQuery } from '@tanstack/react-query'

import { TransactionsClient } from '../clients'
import { ApiResponse, PageResponse, Transaction } from '../types/ApiResponses'
import { ApiProps, useTransactionsProps } from '../types/props'

type TransactionPageResponse = PageResponse<Transaction>

const fetchTransactionsForUser = async (
  apiUrl: string,
  authToken?: string,
  pageNumber?: number,
  pageSize?: number,
  fromDateMS?: number,
  toDateMS?: number,
): Promise<ApiResponse<TransactionPageResponse>> => {
  const client = new TransactionsClient({ apiUrl, authToken })

  const response = await client.getForUser({
    pageNumber,
    pageSize,
    fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
    toDate: toDateMS ? new Date(toDateMS) : undefined,
  })

  return response
}

export const useTransactionsForUser = (
  { pageNumber, pageSize, fromDateMS, toDateMS }: useTransactionsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'AllTransactions',
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    apiUrl,
    authToken,
  ]

  return useQuery<ApiResponse<TransactionPageResponse>, Error>(QUERY_KEY, () =>
    fetchTransactionsForUser(apiUrl, authToken, pageNumber, pageSize, fromDateMS, toDateMS),
  )
}
