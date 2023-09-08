import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { MerchantClient, PaymentRequestClient } from '../clients'
import { ApiError, PaymentRequestUpdate, Tag } from '../types'
import { ApiProps, CreateTagProps, usePaymentRequestsProps } from '../types/props'

const createTagAsync = async (
  apiUrl: string,
  merchantId: string,
  tag: Tag,
  paymentRequestId: string,
  existingTagsIds: string[],
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const merchantClient = new MerchantClient({ apiUrl, authToken })
  const addTagResponse = await merchantClient.addTag({ merchantId }, tag)
  if (addTagResponse.status === 'error') {
    return { error: addTagResponse.error }
  }
  const createdTag = addTagResponse.data
  const paymentRequestClient = new PaymentRequestClient({ apiUrl, authToken })
  const paymentRequestUpdate: PaymentRequestUpdate = {
    tagIds: existingTagsIds.concat(createdTag.id),
  }
  const paymentRequestTagAdd = await paymentRequestClient.update(
    paymentRequestId,
    paymentRequestUpdate,
  )

  if (paymentRequestTagAdd.status === 'error') {
    return { error: paymentRequestTagAdd.error }
  }

  return { success: true }
}

export const useCreateTag = (
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
  createTag: (createTagProps: CreateTagProps) => Promise<{ error: ApiError | undefined }>
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

  const MERCHANT_TAGS_QUERY_KEY = ['MerchantTags', merchantId, apiUrl, authToken]

  const PAYOUTS_KEY = [
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
    CreateTagProps
  > = useMutation({
    mutationFn: (variables: CreateTagProps) =>
      createTagAsync(
        apiUrl,
        merchantId,
        variables.tag,
        variables.paymentRequestId,
        variables.existingTagsIds,
        authToken,
      ),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        // After create tag is successful, invalidate the payment requests cache, the single payment request cache
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYMENT_REQUEST_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: MERCHANT_TAGS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYMENT_REQUESTS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYOUTS_KEY })
      }
    },
  })

  const createTag = useCallback(
    async ({ tag, existingTagsIds, paymentRequestId }: CreateTagProps) => {
      if (paymentRequestId) {
        setPaymentRequestID(paymentRequestId)
        const result = await mutation.mutateAsync({ tag, existingTagsIds, paymentRequestId })

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

  return { createTag }
}
