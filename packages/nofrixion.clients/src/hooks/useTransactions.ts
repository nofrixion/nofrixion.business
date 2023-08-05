import { TransactionsClient } from '../clients'
import { formatApiResponse } from '../types'
import { ApiResponse, TransactionPageResponse } from '../types/ApiResponses'
import { ApiProps, TransactionsProps } from '../types/props'
import { useQuery } from '@tanstack/react-query'

const fetchTransactions = async (
  apiUrl: string,
  accountId?: string,
  authToken?: string,
  pageNumber?: number,
  pageSize?: number,
): Promise<ApiResponse<TransactionPageResponse>> => {
  const client = new TransactionsClient({ apiUrl, authToken })

  const response = await client.get({ accountId, pageNumber, pageSize })

  return response
}

export const useTransactions = (
  { accountId, pageNumber, pageSize }: TransactionsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = ['Transactions', accountId, pageNumber, pageSize, apiUrl, authToken]

  return useQuery<ApiResponse<TransactionPageResponse>, Error>(
    QUERY_KEY,
    () => fetchTransactions(apiUrl, accountId, authToken, pageNumber, pageSize),
    {
      enabled: !!accountId,
    },
  )
}
