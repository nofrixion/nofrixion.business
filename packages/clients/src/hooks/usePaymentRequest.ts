import { PaymentRequestClient } from '../clients'
import { formatApiResponse } from '../types'
import { ApiResponse, PaymentRequest } from '../types/ApiResponses'
import { ApiProps, usePaymentRequestProps } from '../types/props'
import { useQuery } from '@tanstack/react-query'

const fetchPaymentRequest = async (
  apiUrl: string,
  paymentRequestId?: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<PaymentRequest>> => {
  const client = new PaymentRequestClient({ apiUrl, authToken })
  const response = await client.get({ paymentRequestId, merchantId })

  return response
}

export const usePaymentRequest = (
  { paymentRequestId, merchantId }: usePaymentRequestProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = ['PaymentRequest', merchantId, paymentRequestId, apiUrl, authToken]

  return useQuery<ApiResponse<PaymentRequest>, Error>(
    QUERY_KEY,
    () => fetchPaymentRequest(apiUrl, paymentRequestId, merchantId, authToken),
    {
      enabled: !!paymentRequestId && !!merchantId,
    },
  )
}
