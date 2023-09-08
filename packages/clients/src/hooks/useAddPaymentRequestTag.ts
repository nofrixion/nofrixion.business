import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PaymentRequestClient } from '../clients'
import { ApiError, PaymentRequestUpdate, Tag } from '../types'
import { AddTagProps, ApiProps, usePaymentRequestsProps } from '../types/props'

const addTagAsync = async (
  apiUrl: string,
  tag: Tag,
  paymentRequestId: string,
  existingTagsIds: string[],
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const paymentRequestClient = new PaymentRequestClient({ apiUrl, authToken })
  const paymentRequestUpdate: PaymentRequestUpdate = {
    tagIds: existingTagsIds.concat(tag.id),
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

export const useAddPaymentRequestTag = (
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
  addPaymentRequestTag: (addTagProps: AddTagProps) => Promise<{ error: ApiError | undefined }>
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

  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    AddTagProps
  > = useMutation({
    mutationFn: (variables: AddTagProps) =>
      addTagAsync(
        apiUrl,
        variables.tag,
        variables.paymentRequestId,
        variables.existingTagsIds,
        authToken,
      ),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        // After add tag is successful, invalidate the payment requests cache, the single payment request cache
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYMENT_REQUEST_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYMENT_REQUESTS_QUERY_KEY })
      }
    },
  })

  const addPaymentRequestTag = useCallback(
    async ({ tag, existingTagsIds, paymentRequestId }: AddTagProps) => {
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

  return { addPaymentRequestTag }
}
