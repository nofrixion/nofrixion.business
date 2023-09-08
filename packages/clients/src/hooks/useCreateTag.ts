import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { MerchantClient } from '../clients'
import { ApiResponse, Tag } from '../types'
import { ApiProps, CreateTagProps, MerchantProps } from '../types/props'

const createTagAsync = async (
  apiUrl: string,
  tag: Tag,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<Tag>> => {
  const merchantClient = new MerchantClient({ apiUrl, authToken })
  const addTagResponse = await merchantClient.addTag({ merchantId }, tag)

  return addTagResponse
}

export const useCreateTag = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken }: ApiProps,
): {
  createTag: (createTagProps: CreateTagProps) => Promise<ApiResponse<Tag>>
} => {
  const queryClient = useQueryClient()

  const MERCHANT_TAGS_QUERY_KEY = ['MerchantTags', merchantId, apiUrl, authToken]

  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<ApiResponse<Tag>, Error, CreateTagProps> = useMutation({
    mutationFn: (variables: CreateTagProps) =>
      createTagAsync(apiUrl, variables.tag, merchantId, authToken),
    onSuccess: (data: ApiResponse<Tag>) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries({ queryKey: MERCHANT_TAGS_QUERY_KEY })
      }
    },
  })

  const createTag = useCallback(
    async ({ tag }: CreateTagProps) => {
      return await mutation.mutateAsync({ tag })
    },
    [mutation],
  )

  return { createTag }
}
