import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PaymentRequestClient } from '../clients'
import { ApiError } from '../types'
import { ApiProps, RefundProps, usePaymentRequestsProps } from '../types/props'

const refund = async (
  apiUrl: string,
  authorizationId: string,
  paymentRequestId: string,
  authToken?: string,
  amount?: number,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const client = new PaymentRequestClient({ apiUrl, authToken })
  const response = await client.refundCardPayment(paymentRequestId, authorizationId, amount)

  return response
}

export const useRefund = (
  {
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
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
  }: usePaymentRequestsProps,
  { apiUrl, authToken }: ApiProps,
): {
  processRefund: (refundProps: RefundProps) => Promise<{ error: ApiError | undefined }>
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

  const METRICS_QUERY_KEY = [
    'PaymentRequestMetrics',
    apiUrl,
    authToken,
    currency,
    fromDateMS,
    toDateMS,
    maxAmount,
    merchantId,
    minAmount,
    search,
    tags,
  ]

  const PAYMENT_REQUESTS_QUERY_KEY = [
    'PaymentRequests',
    apiUrl,
    authToken,
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
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

  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    RefundProps
  > = useMutation({
    mutationFn: (variables: RefundProps) =>
      refund(
        apiUrl,
        variables.authorizationId,
        variables.paymentRequestId,
        authToken,
        variables.amount,
      ),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        // After refund is successful, invalidate the payment requests cache, the single payment request cache,
        // and the metrics cache because the status of the payment request has changed
        queryClient.invalidateQueries({ queryKey: PAYMENT_REQUESTS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYMENT_REQUEST_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: METRICS_QUERY_KEY })
      }
    },
  })

  const processRefund = useCallback(
    async ({ authorizationId, paymentRequestId, amount }: RefundProps) => {
      if (paymentRequestId) {
        setPaymentRequestID(paymentRequestId)
        const result = await mutation.mutateAsync({
          authorizationId,
          paymentRequestId,
          amount,
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

  return { processRefund }
}
