import { useQuery } from '@tanstack/react-query'

import { PayoutClient } from '../clients'
import { formatSortExpression, PayoutStatus, SortDirection } from '../types'
import { ApiResponse, PayoutPageResponse } from '../types/ApiResponses'
import { ApiProps, usePayoutsProps } from '../types/props'

const fetchPayouts = async (
  apiUrl: string,
  statusSortDirection: SortDirection,
  createdSortDirection: SortDirection,
  amountSortDirection: SortDirection,
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
): Promise<ApiResponse<PayoutPageResponse>> => {
  const sortExpression = formatSortExpression({
    statusSortDirection: statusSortDirection,
    createdSortDirection: createdSortDirection,
    amountSortDirection: amountSortDirection,
  })

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
    statusSortDirection,
    createdSortDirection,
    amountSortDirection,
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
    statusSortDirection,
    createdSortDirection,
    amountSortDirection,
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
        statusSortDirection,
        createdSortDirection,
        amountSortDirection,
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
      ),
    {
      enabled: !!merchantId,
    },
  )
}
