import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PayoutClient } from '../clients'
import { AccountIdentifierType, ApiError, Counterparty, Currency, PayoutUpdate } from '../types'
import { ApiProps, UpdatePayoutProps } from '../types/props'

const updatePayoutAsync = async (
  apiUrl: string,
  paymoutId: string,
  accountID?: string,
  type?: AccountIdentifierType,
  description?: string,
  currency?: Currency,
  amount?: number,
  yourReference?: string,
  theirReference?: string,
  destination?: Counterparty,
  scheduled?: boolean,
  scheduleDate?: Date,
  beneficiaryID?: string,
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const client = new PayoutClient({ apiUrl, authToken })
  const payoutRequestUpdate: PayoutUpdate = {
    accountID,
    type,
    description,
    currency,
    amount,
    yourReference,
    theirReference,
    destination,
    scheduled,
    scheduleDate,
    beneficiaryID,
  }
  const payoutTagAdd = await client.update(paymoutId, payoutRequestUpdate)

  if (payoutTagAdd.status === 'error') {
    return { error: payoutTagAdd.error }
  }

  return { success: true }
}

export const useUpdatePayout = ({
  apiUrl,
  authToken,
}: ApiProps): {
  updatePayout: (addTagProps: UpdatePayoutProps) => Promise<{ error: ApiError | undefined }>
} => {
  const queryClient = useQueryClient()

  const [payoutId, setPayoutId] = useState<string>()

  const SINGLE_PAYOUT_QUERY_KEY = ['Payout', payoutId, apiUrl, authToken]

  const PAYOUTS_QUERY_KEY = ['Payouts']

  const PAYOUTS_METRICS_QUERY_KEY = ['PayoutMetrics']

  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    UpdatePayoutProps
  > = useMutation({
    mutationFn: (variables: UpdatePayoutProps) =>
      updatePayoutAsync(
        apiUrl,
        variables.payoutID,
        variables.accountID,
        variables.type,
        variables.description,
        variables.currency,
        variables.amount,
        variables.yourReference,
        variables.theirReference,
        variables.destination,
        variables.scheduled,
        variables.scheduleDate,
        variables.beneficiaryID,
        authToken,
      ),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYOUT_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYOUTS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYOUTS_METRICS_QUERY_KEY })
      }
    },
  })

  const updatePayout = useCallback(
    async ({
      payoutID,
      accountID,
      type,
      description,
      currency,
      amount,
      yourReference,
      theirReference,
      destination,
      scheduled,
      scheduleDate,
      beneficiaryID,
    }: UpdatePayoutProps) => {
      if (payoutID) {
        setPayoutId(payoutID)
        const result = await mutation.mutateAsync({
          payoutID,
          accountID,
          type,
          description,
          currency,
          amount,
          yourReference,
          theirReference,
          destination,
          scheduled,
          scheduleDate,
          beneficiaryID,
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

  return { updatePayout }
}
