import { useQuery } from '@tanstack/react-query'

import { MerchantClient } from '../clients'
import { formatSortExpression, SortDirection } from '../types'
import { AccountTransactionMetricsPageResponse, ApiResponse } from '../types/ApiResponses'
import { ApiProps, useAccountsWithTransactionMetricsProps } from '../types/props'

const fetchAccountsWithTransactionsMetrics = async (
  apiUrl: string,
  numberOfTransactionsSortDirection: SortDirection,
  authToken?: string,
  merchantId?: string,
  pageNumber?: number,
  pageSize?: number,
  fromDateMS?: number,
  toDateMS?: number,
  currency?: string,
): Promise<ApiResponse<AccountTransactionMetricsPageResponse>> => {
  const sortExpression = formatSortExpression({
    numberOfTransactionsSortDirection: numberOfTransactionsSortDirection,
  })

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
    numberOfTransactionsSortDirection,
  }: useAccountsWithTransactionMetricsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'AccountsWithTransactionMetrics',
    apiUrl,
    authToken,
    merchantId,
    numberOfTransactionsSortDirection,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    currency,
  ]

  return useQuery<ApiResponse<AccountTransactionMetricsPageResponse>, Error>(
    QUERY_KEY,
    () =>
      fetchAccountsWithTransactionsMetrics(
        apiUrl,
        numberOfTransactionsSortDirection,
        authToken,
        merchantId,
        pageNumber,
        pageSize,
        fromDateMS,
        toDateMS,
        currency,
      ),
    {
      enabled: !!merchantId,
    },
  )
}
