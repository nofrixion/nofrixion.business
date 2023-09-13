import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PaymentRequestClient } from '../clients'
import { ApiError } from '../types'
import { ApiProps, MerchantProps, VoidProps } from '../types/props'

const voidPayment = async (
  apiUrl: string,
  authorizationId: string,
  paymentRequestId: string,
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const client = new PaymentRequestClient({ apiUrl, authToken })
  const response = await client.voidCardPayment(paymentRequestId, authorizationId)

  return response
}

export const useVoid = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken }: ApiProps,
): {
  processVoid: (voidProps: VoidProps) => Promise<{ error: ApiError | undefined }>
} => {
  const queryClient = useQueryClient()

  const [paymentRequestID, setPaymentRequestID] = useState<string>()

  const SINGLE_PAYMENT_REQUEST_QUERY_KEY = [
    'PaymentRequest',
    merchantId,
    paymentRequestID,
    apiUrl,
    authToken,
  ]

  const METRICS_QUERY_KEY = ['PaymentRequestMetrics']

  const PAYMENT_REQUESTS_QUERY_KEY = ['PaymentRequests']

  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    VoidProps
  > = useMutation({
    mutationFn: (variables: VoidProps) =>
      voidPayment(apiUrl, variables.authorizationId, variables.paymentRequestId, authToken),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        // After void is successful, invalidate the payment requests cache, the single payment request cache,
        // and the metrics cache because the status of the payment request has changed
        queryClient.invalidateQueries({ queryKey: PAYMENT_REQUESTS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYMENT_REQUEST_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: METRICS_QUERY_KEY })
      }
    },
  })

  const processVoid = useCallback(
    async ({ authorizationId, paymentRequestId }: VoidProps) => {
      if (paymentRequestId) {
        setPaymentRequestID(paymentRequestId)
        const result = await mutation.mutateAsync({
          authorizationId,
          paymentRequestId,
        })

        if (result.success) {
          return { error: undefined }
        } else {
          return { error: result.error }
        }
      }
      return { error: undefined }
    },
    [mutation],
  )

  return { processVoid }
}
