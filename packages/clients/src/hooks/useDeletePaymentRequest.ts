import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { PaymentRequestClient } from '../clients'
import { ApiError } from '../types'
import { ApiProps } from '../types/props'

const deletePaymentRequestAsync = async (
  paymentRequestID: string,
  apiUrl: string,
  authToken?: string,
): Promise<{
  success?: boolean | undefined
  error?: ApiError | undefined
}> => {
  const paymentRequestClient = new PaymentRequestClient({ apiUrl, authToken })
  const paymentRequestDeleteResponse = await paymentRequestClient.delete(paymentRequestID)

  return paymentRequestDeleteResponse
}

export const useDeletePaymentRequest = ({
  apiUrl,
  authToken,
}: ApiProps): {
  deletePaymentRequest: (paymentRequestID: string) => Promise<{
    success?: boolean | undefined
    error?: ApiError | undefined
  }>
} => {
  const queryClient = useQueryClient()

  const METRICS_QUERY_KEY = ['PaymentRequestMetrics']

  const PAYMENT_REQUESTS_QUERY_KEY = ['PaymentRequests']

  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<
    {
      success?: boolean | undefined
      error?: ApiError | undefined
    },
    Error,
    string
  > = useMutation({
    mutationFn: (variables: string) => deletePaymentRequestAsync(variables, apiUrl, authToken),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: PAYMENT_REQUESTS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: METRICS_QUERY_KEY })
      }
    },
  })

  const deletePaymentRequest = useCallback(
    async (paymentRequestID: string) => {
      const result = await mutation.mutateAsync(paymentRequestID)

      return result
    },
    [mutation],
  )

  return { deletePaymentRequest }
}
