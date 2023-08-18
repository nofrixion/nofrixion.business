import { useQuery } from '@tanstack/react-query'

import { AccountsClient } from '../clients'
import { ApiResponse, PayoutPageResponse, PayoutStatus } from '../types'
import { ApiProps, usePendingPaymentsProps } from '../types/props'

const fetchPendingPayments = async (
  apiUrl: string,
  accountId?: string,
  authToken?: string,
  pageNumber?: number,
  pageSize?: number,
  statuses?: PayoutStatus[],
  fromDateMS?: number,
  toDateMS?: number,
): Promise<ApiResponse<PayoutPageResponse>> => {
  const client = new AccountsClient({ apiUrl, authToken })

  const response = await client.getPendingPayments({
    accountId,
    pageNumber,
    pageSize,
    payoutStatuses: statuses,
    fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
    toDate: toDateMS ? new Date(toDateMS) : undefined,
  })

  return response
}

export const usePendingPayments = (
  {
    accountId,
    pageNumber,
    pageSize,
    payoutStatuses,
    fromDateMS,
    toDateMS,
  }: usePendingPaymentsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'Pending Payments',
    accountId,
    apiUrl,
    authToken,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    payoutStatuses,
  ]

  return useQuery<ApiResponse<PayoutPageResponse>, Error>(
    QUERY_KEY,
    () =>
      fetchPendingPayments(
        apiUrl,
        accountId,
        authToken,
        pageNumber,
        pageSize,
        payoutStatuses,
        fromDateMS,
        toDateMS,
      ),
    {
      enabled: !!accountId,
    },
  )
}
