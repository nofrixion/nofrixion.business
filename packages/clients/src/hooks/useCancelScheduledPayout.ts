import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PayoutClient } from '../clients'
import { ApiError } from '../types'
import { ApiProps } from '../types/props'

const cancelScheduledPayoutAsync = async (
  apiUrl: string,
  payoutId: string,
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const client = new PayoutClient({ apiUrl, authToken })

  const payoutCancelScheduledResp = await client.cancel(payoutId)

  if (payoutCancelScheduledResp.status === 'error') {
    return { error: payoutCancelScheduledResp.error }
  }

  return { success: true }
}

export const useCancelScheduledPayout = ({
  apiUrl,
  authToken,
}: ApiProps): {
  cancelScheduledPayout: (payoutId: string) => Promise<{ error: ApiError | undefined }>
} => {
  const queryClient = useQueryClient()

  const [payoutId, setPayoutId] = useState<string>()

  const SINGLE_PAYOUT_QUERY_KEY = ['Payout', payoutId, apiUrl, authToken]

  const PAYOUTS_QUERY_KEY = ['Payouts']

  const PAYOUTS_METRICS_QUERY_KEY = ['PayoutMetrics']

  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    string
  > = useMutation({
    mutationFn: (payoutId: string) => cancelScheduledPayoutAsync(apiUrl, payoutId, authToken),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYOUT_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYOUTS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYOUTS_METRICS_QUERY_KEY })
      }
    },
  })

  const cancelScheduledPayout = useCallback(
    async (payoutID: string) => {
      if (payoutID) {
        setPayoutId(payoutID)
        const result = await mutation.mutateAsync(payoutID)

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

  return { cancelScheduledPayout }
}
