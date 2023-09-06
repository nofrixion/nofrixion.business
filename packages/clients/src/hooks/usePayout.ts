import { useQuery } from '@tanstack/react-query'

import { PayoutClient } from '../clients'
import { ApiResponse, Payout, PayoutPageResponse } from '../types/ApiResponses'
import { ApiProps, usePayoutsProps } from '../types/props'

const fetchPayout = async (
  apiUrl: string,
  payoutId?: string,
  authToken?: string,
): Promise<ApiResponse<Payout>> => {
  const client = new PayoutClient({ apiUrl, authToken })

  const response = await client.get({ payoutId })

  return response
}

export const usePayout = (
  {
    merchantId,
    statusSortDirection,
    createdSortDirection,
    amountSortDirection,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    status,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  }: usePayoutsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const PAYOUTS_QUERY_KEY = [
    'Payouts',
    apiUrl,
    authToken,
    merchantId,
    statusSortDirection,
    createdSortDirection,
    amountSortDirection,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    status,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  ]

  return useQuery<ApiResponse<PayoutPageResponse>, Error>(
    PAYOUTS_QUERY_KEY,
    () =>
      fetchPayout(
        apiUrl,
        statusSortDirection,
        createdSortDirection,
        amountSortDirection,
        authToken,
        merchantId,
        pageNumber,
        pageSize,
        fromDateMS,
        toDateMS,
        status,
        search,
        currency,
        minAmount,
        maxAmount,
        tags,
      ),
    {
      enabled: !!merchantId,
    },
  )
}
