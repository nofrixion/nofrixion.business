import { useQuery } from '@tanstack/react-query'

import { MerchantClient } from '../clients'
import { ApiResponse, PageResponse, Transaction } from '../types/ApiResponses'
import { ApiProps, MerchantProps, useTransactionsProps } from '../types/props'

type TransactionPageResponse = PageResponse<Transaction>

const fetchTransactionsForMerchant = async (
  apiUrl: string,
  merchantId?: string,
  authToken?: string,
  pageNumber?: number,
  pageSize?: number,
  fromDateMS?: number,
  toDateMS?: number,
): Promise<ApiResponse<TransactionPageResponse>> => {
  const client = new MerchantClient({ apiUrl, authToken })

  const response = await client.getTransactions({
    merchantId,
    pageNumber,
    pageSize,
    fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
    toDate: toDateMS ? new Date(toDateMS) : undefined,
  })

  return response
}

export const useTransactionsForMerchant = (
  { merchantId }: MerchantProps,
  { pageNumber, pageSize, fromDateMS, toDateMS }: useTransactionsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'AllTransactionsForMerchant',
    merchantId,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    apiUrl,
    authToken,
  ]

  return useQuery<ApiResponse<TransactionPageResponse>, Error>(
    QUERY_KEY,
    () =>
      fetchTransactionsForMerchant(
        apiUrl,
        merchantId,
        authToken,
        pageNumber,
        pageSize,
        fromDateMS,
        toDateMS,
      ),
    {
      enabled: !!merchantId,
    },
  )
}
