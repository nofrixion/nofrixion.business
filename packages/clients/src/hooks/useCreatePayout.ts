import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { PayoutClient } from '../clients/PayoutClient'
import { AccountIdentifierType, ApiError, Counterparty, Currency, PayoutCreate } from '../types'
import { ApiProps, CreatePayoutProps, usePayoutsProps } from '../types/props'

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
  }: usePayoutsProps,
  { apiUrl, authToken }: ApiProps,
): {
  createPayout: (createPayoutProps: CreatePayoutProps) => Promise<{ error: ApiError | undefined }>
} => {
  const queryClient = useQueryClient()

  const METRICS_QUERY_KEY = [
    'PayoutMetrics',
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

  const PAYOUTS_QUERY_KEY = [
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
      if (data.success) {
        // After create payout for refund is successful, invalidate the payment requests cache, the single payment request cache,
        // and the metrics cache because the status of the payment request has changed
        console.log('invalidating queries', queryClient.getQueryCache())
        console.log('PAYOUTS_QUERY_KEY', PAYOUTS_QUERY_KEY)
        console.log('METRICS_QUERY_KEY', METRICS_QUERY_KEY)
        queryClient.invalidateQueries({ queryKey: PAYOUTS_QUERY_KEY })
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
    }: CreatePayoutProps) => {
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
    },
    [mutation],
  )

  return { createPayout }
}
