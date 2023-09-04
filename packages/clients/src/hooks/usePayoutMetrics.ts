import { useQuery } from '@tanstack/react-query'

import { PayoutClient } from '../clients'
import { ApiResponse, PayoutMetrics } from '../types'
import { ApiProps, usePayoutMetricsProps } from '../types/props'

const fetchPayoutMetrics = async (
  apiUrl: string,
  currency?: string,
  merchantId?: string,
  authToken?: string,
  fromDateMS?: number,
  toDateMS?: number,
  minAmount?: number,
  maxAmount?: number,
  tags?: string[],
  search?: string,
): Promise<ApiResponse<PayoutMetrics>> => {
  const client = new PayoutClient({ apiUrl, authToken })

  const response = await client.metrics({
    fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
    toDate: toDateMS ? new Date(toDateMS) : undefined,
    search: search,
    currency: currency,
    minAmount: minAmount,
    maxAmount: maxAmount,
    tags: tags,
    merchantId: merchantId,
  })

  return response
}

export const usePayoutMetrics = (
  {
    currency,
    fromDateMS,
    toDateMS,
    maxAmount,
    merchantId,
    minAmount,
    search,
    tags,
  }: usePayoutMetricsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'PayoutMetrics',
    apiUrl,
    authToken,
    currency,
    fromDateMS,
    toDateMS,
    maxAmount,
    merchantId,
    minAmount,
    search,
    tags,
  ]

  return useQuery<ApiResponse<PayoutMetrics>, Error>(
    QUERY_KEY,
    () =>
      fetchPayoutMetrics(
        apiUrl,
        currency,
        merchantId,
        authToken,
        fromDateMS,
        toDateMS,
        minAmount,
        maxAmount,
        tags,
        search,
      ),
    {
      enabled: !!merchantId,
    },
  )
}
