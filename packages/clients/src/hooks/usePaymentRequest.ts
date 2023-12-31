import { useQuery, useQueryClient } from '@tanstack/react-query'

import { PaymentRequestClient } from '../clients'
import { ApiResponse, PaymentRequest, PaymentRequestPageResponse } from '../types'
import { ApiProps, usePaymentRequestProps, usePaymentRequestsProps } from '../types/props'
const fetchPaymentRequest = async (
  apiUrl: string,
  paymentRequestId?: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<PaymentRequest>> => {
  const client = new PaymentRequestClient({ apiUrl, authToken })
  const includeEvents = true
  const response = await client.get({ paymentRequestId, includeEvents, merchantId })
  return response
}

export const usePaymentRequest = (
  {
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
    sortBy,
  }: usePaymentRequestsProps,
  { paymentRequestId }: usePaymentRequestProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const queryClient = useQueryClient()
  const PAYMENT_REQUESTS_QUERY_KEY = [
    'PaymentRequests',
    apiUrl,
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
    sortBy,
  ]
  const SINGLE_PAYMENT_REQUEST_QUERY_KEY = [
    'PaymentRequest',
    merchantId,
    paymentRequestId,
    apiUrl,
    authToken,
  ]

  return useQuery<ApiResponse<PaymentRequest>, Error>({
    queryKey: SINGLE_PAYMENT_REQUEST_QUERY_KEY,
    queryFn: () => fetchPaymentRequest(apiUrl, paymentRequestId, merchantId, authToken),
    enabled: !!paymentRequestId && !!merchantId,
    placeholderData: () => {
      if (paymentRequestId) {
        const result: ApiResponse<PaymentRequestPageResponse> | undefined =
          queryClient.getQueryData<ApiResponse<PaymentRequestPageResponse>>(
            PAYMENT_REQUESTS_QUERY_KEY,
          )
        if (result?.status === 'success') {
          const paymentRequest: PaymentRequest | undefined = result.data.content.find(
            (x) => x.id === paymentRequestId,
          )
          if (paymentRequest) {
            const apiresponse: ApiResponse<PaymentRequest> = {
              data: paymentRequest,
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
