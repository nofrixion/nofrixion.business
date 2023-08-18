import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PayoutClient } from '../clients/PayoutClient'
import { AccountIdentifierType, ApiError, Counterparty, Currency, PayoutCreate } from '../types'
import { ApiProps, CreatePayoutProps, usePaymentRequestsProps } from '../types/props'

const createPayoutAsync = async (
  apiUrl: string,
  accountID: string,
  type: AccountIdentifierType,
  currency: Currency,
  amount: number,
  theirReference: string,
  destination: Counterparty,
  allowIncomplete: boolean,
  authToken?: string,
  description?: string,
  yourReference?: string,
  invoiceID?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const payoutClient = new PayoutClient({ apiUrl, authToken })
  const payoutCreate: PayoutCreate = {
    accountID: accountID,
    type: type,
    description: description,
    currency: currency,
    amount: amount,
    yourReference: yourReference,
    theirReference: theirReference,
    destination: destination,
    invoiceID: invoiceID,
    allowIncomplete: allowIncomplete,
  }
  const payoutCreateResponse = await payoutClient.create(payoutCreate)

  if (payoutCreateResponse.status === 'error') {
    return { error: payoutCreateResponse.error }
  }

  return { success: true }
}

export const useCreatePayout = (
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
  isForRefund?: boolean,
): {
  createPayout: (createPayoutProps: CreatePayoutProps) => Promise<{ error: ApiError | undefined }>
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
    CreatePayoutProps
  > = useMutation({
    mutationFn: (variables: CreatePayoutProps) =>
      createPayoutAsync(
        apiUrl,
        variables.accountID,
        variables.type,
        variables.currency,
        variables.amount,
        variables.theirReference,
        variables.destination,
        variables.allowIncomplete,
        authToken,
        variables.description,
        variables.yourReference,
      ),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success && isForRefund) {
        // After create payout for refund is successful, invalidate the payment requests cache, the single payment request cache,
        // and the metrics cache because the status of the payment request has changed
        queryClient.invalidateQueries({ queryKey: PAYMENT_REQUESTS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYMENT_REQUEST_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: METRICS_QUERY_KEY })
      }
    },
  })

  const createPayout = useCallback(
    async ({
      accountID,
      type,
      description,
      currency,
      amount,
      yourReference,
      theirReference,
      destination,
      invoiceID,
      allowIncomplete,
      paymentRequestId,
    }: CreatePayoutProps) => {
      if (paymentRequestId) {
        setPaymentRequestID(paymentRequestId)
        const result = await mutation.mutateAsync({
          accountID,
          type,
          description,
          currency,
          amount,
          yourReference,
          theirReference,
          destination,
          invoiceID,
          allowIncomplete,
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

  return { createPayout }
}
