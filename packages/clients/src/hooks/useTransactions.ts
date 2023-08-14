import { useQuery } from '@tanstack/react-query'

import { TransactionsClient } from '../clients'
import { ApiResponse, TransactionPageResponse } from '../types/ApiResponses'
import { ApiProps, TransactionsProps } from '../types/props'

const fetchTransactions = async (
  apiUrl: string,
  accountId?: string,
  authToken?: string,
  pageNumber?: number,
  pageSize?: number,
  sort?: string,
  search?: string,
): Promise<ApiResponse<TransactionPageResponse>> => {
  const client = new TransactionsClient({ apiUrl, authToken })

  const response = await client.get({ accountId, pageNumber, pageSize, sort, search })

  return response
}

export const useTransactions = (
  { accountId, pageNumber, pageSize, sort, search }: TransactionsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'Transactions',
    accountId,
    pageNumber,
    pageSize,
    apiUrl,
    authToken,
    sort,
    search,
  ]

  return useQuery<ApiResponse<TransactionPageResponse>, Error>(
    QUERY_KEY,
    () => fetchTransactions(apiUrl, accountId, authToken, pageNumber, pageSize, sort, search),
    {
      enabled: !!accountId,
    },
  )
}
