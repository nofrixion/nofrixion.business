import { PaymentRequestClient } from '../clients'
import { formatApiResponse } from '../types'
import { ApiResponse, PaymentRequestMetrics } from '../types/ApiResponses'
import { ApiProps, usePaymentRequestMetricsProps } from '../types/props'
import { useQuery } from '@tanstack/react-query'

const fetchPaymentRequestMetrics = async (
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
): Promise<ApiResponse<PaymentRequestMetrics>> => {
  const client = new PaymentRequestClient({ apiUrl, authToken })

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

export const usePaymentRequestMetrics = (
  {
    currency,
    fromDateMS,
    toDateMS,
    maxAmount,
    merchantId,
    minAmount,
    search,
    tags,
  }: usePaymentRequestMetricsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'PaymentRequestMetrics',
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

  return useQuery<ApiResponse<PaymentRequestMetrics>, Error>(
    QUERY_KEY,
    () =>
      fetchPaymentRequestMetrics(
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
