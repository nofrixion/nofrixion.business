import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PayoutClient } from '../clients'
import { ApiError, PayoutUpdate } from '../types'
import { ApiProps, MerchantProps, PayoutProps } from '../types/props'

const cancelPayoutScheduleAsync = async (
  apiUrl: string,
  paymoutId: string,
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const client = new PayoutClient({ apiUrl, authToken })
  const payoutRequestUpdate: PayoutUpdate = {
    scheduled: false,
  }
  const payoutTagAdd = await client.update(paymoutId, payoutRequestUpdate)

  if (payoutTagAdd.status === 'error') {
    return { error: payoutTagAdd.error }
  }

  return { success: true }
}

export const useCancelPayoutSchedule = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken }: ApiProps,
): {
  cancelPayoutSchedule: (addTagProps: PayoutProps) => Promise<{ error: ApiError | undefined }>
} => {
  const queryClient = useQueryClient()

  const [payoutId, setPayoutId] = useState<string>()

  const SINGLE_PAYOUT_QUERY_KEY = ['Payout', merchantId, payoutId, apiUrl, authToken]

  const PAYOUTS_QUERY_KEY = ['Payouts']

  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    PayoutProps
  > = useMutation({
    mutationFn: (variables: PayoutProps) => cancelPayoutScheduleAsync(apiUrl, variables.payoutId),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYOUT_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYOUTS_QUERY_KEY })
      }
    },
  })

  const cancelPayoutSchedule = useCallback(
    async ({ payoutId }: PayoutProps) => {
      if (payoutId) {
        setPayoutId(payoutId)
        const result = await mutation.mutateAsync({ payoutId })

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

  return { cancelPayoutSchedule }
}
