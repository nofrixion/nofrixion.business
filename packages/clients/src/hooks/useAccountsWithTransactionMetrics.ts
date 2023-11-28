import { useQuery } from '@tanstack/react-query'

import { MerchantClient } from '../clients'
import { formatSortExpression } from '../types'
import { AccountTransactionMetricsPageResponse, ApiResponse } from '../types/ApiResponses'
import {
  ApiProps,
  SortByAccountsWithTransactionMetrics,
  useAccountsWithTransactionMetricsProps,
} from '../types/props'

const fetchAccountsWithTransactionsMetrics = async (
  apiUrl: string,
  authToken?: string,
  merchantId?: string,
  pageNumber?: number,
  pageSize?: number,
  fromDateMS?: number,
  toDateMS?: number,
  currency?: string,
  sortBy?: SortByAccountsWithTransactionMetrics,
): Promise<ApiResponse<AccountTransactionMetricsPageResponse>> => {
  const sortExpression = sortBy ? formatSortExpression({ primary: sortBy }) : ''

  const client = new MerchantClient({ apiUrl, authToken })

  const response = await client.getAccountsWithTransactionMetrics({
    pageNumber: pageNumber,
    pageSize: pageSize,
    sort: sortExpression,
    fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
    toDate: toDateMS ? new Date(toDateMS) : undefined,
    currency: currency,
    merchantId: merchantId,
  })

  return response
}

export const useAccountsWithTransactionMetrics = (
  {
    merchantId,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    currency,
    sortBy,
  }: useAccountsWithTransactionMetricsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'AccountsWithTransactionMetrics',
    apiUrl,
    authToken,
    merchantId,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    currency,
    sortBy,
  ]

  return useQuery<ApiResponse<AccountTransactionMetricsPageResponse>, Error>(
    QUERY_KEY,
    () =>
      fetchAccountsWithTransactionsMetrics(
        apiUrl,
        authToken,
        merchantId,
        pageNumber,
        pageSize,
        fromDateMS,
        toDateMS,
        currency,
        sortBy,
      ),
    {
      enabled: !!merchantId,
    },
  )
}
