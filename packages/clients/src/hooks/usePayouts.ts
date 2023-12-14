import { useQuery } from '@tanstack/react-query'

import { PayoutClient } from '../clients'
import { formatSortExpression, PayoutStatus } from '../types'
import { ApiResponse, PayoutPageResponse } from '../types/ApiResponses'
import { ApiProps, SortByPayouts, usePayoutsProps } from '../types/props'

const fetchPayouts = async (
  apiUrl: string,
  authToken?: string,
  merchantId?: string,
  pageNumber?: number,
  pageSize?: number,
  fromDateMS?: number,
  toDateMS?: number,
  statuses?: PayoutStatus[],
  search?: string,
  currency?: string,
  minAmount?: number,
  maxAmount?: number,
  tags?: string[],
  sortBy?: SortByPayouts,
): Promise<ApiResponse<PayoutPageResponse>> => {
  const sortExpression = sortBy ? formatSortExpression(sortBy) : ''

  const client = new PayoutClient({ apiUrl, authToken })

  const response = await client.getAll({
    pageNumber: pageNumber,
    pageSize: pageSize,
    sort: sortExpression,
    fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
    toDate: toDateMS ? new Date(toDateMS) : undefined,
    payoutStatuses: statuses,
    search: search,
    currency: currency,
    minAmount: minAmount,
    maxAmount: maxAmount,
    tags: tags,
    merchantId: merchantId,
  })

  return response
}

export const usePayouts = (
  {
    merchantId,
    sortBy,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    statuses,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  }: usePayoutsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'Payouts',
    apiUrl,
    authToken,
    merchantId,
    sortBy,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    statuses,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  ]

  return useQuery<ApiResponse<PayoutPageResponse>, Error>(
    QUERY_KEY,
    () =>
      fetchPayouts(
        apiUrl,
        authToken,
        merchantId,
        pageNumber,
        pageSize,
        fromDateMS,
        toDateMS,
        statuses,
        search,
        currency,
        minAmount,
        maxAmount,
        tags,
        sortBy,
      ),
    {
      enabled: !!merchantId,
    },
  )
}
