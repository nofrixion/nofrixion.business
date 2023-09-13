import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { PayoutClient } from '../clients/PayoutClient'
import {
  AccountIdentifierType,
  ApiResponse,
  Counterparty,
  Currency,
  Payout,
  PayoutCreate,
} from '../types'
import { ApiProps, CreatePayoutProps } from '../types/props'

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
): Promise<ApiResponse<Payout>> => {
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

  return payoutCreateResponse
}

export const useCreatePayout = ({
  apiUrl,
  authToken,
}: ApiProps): {
  createPayout: (createPayoutProps: CreatePayoutProps) => Promise<ApiResponse<Payout>>
} => {
  const queryClient = useQueryClient()

  const METRICS_QUERY_KEY = ['PayoutMetrics']

  const PAYOUTS_QUERY_KEY = ['Payouts']

  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<ApiResponse<Payout>, Error, CreatePayoutProps> = useMutation({
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
    onSuccess: (data: ApiResponse<Payout>) => {
      if (data.status === 'success') {
        // After create payout for refund is successful, invalidate the payment requests cache, the single payment request cache,
        // and the metrics cache because the status of the payment request has changed
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

      return result
    },
    [mutation],
  )

  return { createPayout }
}
