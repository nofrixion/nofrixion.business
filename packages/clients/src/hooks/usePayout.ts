import { useQuery, useQueryClient } from '@tanstack/react-query'

import { PayoutClient } from '../clients'
import { ApiResponse, Payout, PayoutPageResponse } from '../types/ApiResponses'
import { ApiProps, PayoutProps, usePayoutsProps } from '../types/props'

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
    counterPartyNameSortDirection,
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
  { payoutId }: PayoutProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const queryClient = useQueryClient()

  const PAYOUTS_QUERY_KEY = [
    'Payouts',
    apiUrl,
    authToken,
    merchantId,
    statusSortDirection,
    createdSortDirection,
    amountSortDirection,
    counterPartyNameSortDirection,
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

  const SINGLE_PAYOUT_QUERY_KEY = ['Payouts', payoutId, apiUrl, authToken]

  return useQuery<ApiResponse<Payout>, Error>({
    queryKey: SINGLE_PAYOUT_QUERY_KEY,
    queryFn: () => fetchPayout(apiUrl, payoutId, authToken),
    enabled: !!payoutId,
    placeholderData: () => {
      if (payoutId) {
        const result: ApiResponse<PayoutPageResponse> | undefined =
          queryClient.getQueryData<ApiResponse<PayoutPageResponse>>(PAYOUTS_QUERY_KEY)
        if (result?.status === 'success') {
          const payout: Payout | undefined = result.data.content.find((x) => x.id === payoutId)
          if (payout) {
            const apiresponse: ApiResponse<Payout> = {
              data: payout,
              status: 'success',
              timestamp: new Date(),
            }
            return apiresponse
          }
        }
      }
    },
  })
}
