import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PayoutClient } from '../clients'
import { ApiError, PayoutUpdate, Tag } from '../types'
import { AddTagProps, ApiProps, MerchantProps } from '../types/props'

const addTagAsync = async (
  apiUrl: string,
  tag: Tag,
  paymoutId: string,
  existingTagsIds: string[],
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const client = new PayoutClient({ apiUrl, authToken })
  const payoutRequestUpdate: PayoutUpdate = {
    tagIds: existingTagsIds.concat(tag.id),
  }
  const payoutTagAdd = await client.update(paymoutId, payoutRequestUpdate)

  if (payoutTagAdd.status === 'error') {
    return { error: payoutTagAdd.error }
  }

  return { success: true }
}

export const useAddPayoutTag = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken }: ApiProps,
): {
  useAddPayoutTag: (addTagProps: AddTagProps) => Promise<{ error: ApiError | undefined }>
} => {
  const queryClient = useQueryClient()

  const [payoutId, setPayoutId] = useState<string>()

  const SINGLE_PAYOUT_QUERY_KEY = ['Payout', merchantId, payoutId, apiUrl, authToken]

  const PAYOUTS_QUERY_KEY = ['Payouts']

  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    AddTagProps
  > = useMutation({
    mutationFn: (variables: AddTagProps) =>
      addTagAsync(apiUrl, variables.tag, variables.id, variables.existingTagsIds, authToken),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYOUT_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYOUTS_QUERY_KEY })
      }
    },
  })

  const useAddPayoutTag = useCallback(
    async ({ tag, existingTagsIds, id }: AddTagProps) => {
      if (id) {
        setPayoutId(id)
        const result = await mutation.mutateAsync({ tag, existingTagsIds, id })

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

  return { useAddPayoutTag }
}
