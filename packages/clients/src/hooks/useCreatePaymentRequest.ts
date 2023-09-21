import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { PaymentRequestClient } from '../clients'
import { ApiResponse, PaymentRequest, PaymentRequestCreate } from '../types'
import { ApiProps } from '../types/props'

const createPaymentRequestAsync = async (
  paymentRequestCreate: PaymentRequestCreate,
  apiUrl: string,
  authToken?: string,
): Promise<ApiResponse<PaymentRequest>> => {
  const paymentRequestClient = new PaymentRequestClient({ apiUrl, authToken })
  const paymentRequestCreateResponse = await paymentRequestClient.create(paymentRequestCreate)

  return paymentRequestCreateResponse
}

export const useCreatePaymentRequest = ({
  apiUrl,
  authToken,
}: ApiProps): {
  createPaymentRequest: (
    paymentRequestCreate: PaymentRequestCreate,
  ) => Promise<ApiResponse<PaymentRequest>>
} => {
  const queryClient = useQueryClient()
  const METRICS_QUERY_KEY = ['PaymentRequestMetrics']

  const PAYMENT_REQUESTS_QUERY_KEY = ['PaymentRequests']

  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<
    ApiResponse<PaymentRequest>,
    Error,
    PaymentRequestCreate
  > = useMutation({
    mutationFn: (variables: PaymentRequestCreate) =>
      createPaymentRequestAsync(variables, apiUrl, authToken),
    onSuccess: (data: ApiResponse<PaymentRequest>) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries({ queryKey: PAYMENT_REQUESTS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: METRICS_QUERY_KEY })
      }
    },
  })

  const createPaymentRequest = useCallback(
    async (paymentRequestCreate: PaymentRequestCreate) => {
      const result = await mutation.mutateAsync(paymentRequestCreate)

      return result
    },
    [mutation],
  )

  return { createPaymentRequest }
}
