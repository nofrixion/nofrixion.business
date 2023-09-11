import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PayoutClient } from '../clients'
import { ApiError, PayoutUpdate } from '../types'
import { ApiProps, DeleteTagProps, MerchantProps } from '../types/props'

const removeTagAsync = async (
  apiUrl: string,
  tagId: string,
  id: string,
  existingTagsIds: string[],
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const client = new PayoutClient({ apiUrl, authToken })
  const updateRequest: PayoutUpdate = {
    tagIds: existingTagsIds.filter((id) => id !== tagId),
  }
  const response = await client.update(id, updateRequest)

  if (response.status === 'error') {
    return { error: response.error }
  }

  return { success: true }
}

export const useRemovePayoutTag = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken }: ApiProps,
): {
  removeTag: (deleteTagProps: DeleteTagProps) => Promise<{ error: ApiError | undefined }>
} => {
  const queryClient = useQueryClient()

  const [payoutId, setPayoutId] = useState<string>()

  const SINGLE_REQUEST_QUERY_KEY = ['Payout', merchantId, payoutId, apiUrl, authToken]

  const REQUESTS_QUERY_KEY = ['Payouts']

  // When this mutation succeeds, invalidate any queries
  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    DeleteTagProps
  > = useMutation({
    mutationFn: (variables: DeleteTagProps) =>
      removeTagAsync(apiUrl, variables.tagId, variables.id, variables.existingTagsIds, authToken),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: SINGLE_REQUEST_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEY })
      }
    },
  })

  const removeTag = useCallback(
    async ({ tagId, existingTagsIds, id }: DeleteTagProps) => {
      if (id) {
        setPayoutId(id)
        const result = await mutation.mutateAsync({ tagId, existingTagsIds, id })

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

  return { removeTag }
}
