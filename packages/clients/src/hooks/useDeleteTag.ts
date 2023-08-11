import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { PaymentRequestClient } from '../clients'
import { ApiError, PaymentRequestUpdate } from '../types'
import { ApiProps, DeleteTagProps, usePaymentRequestsProps } from '../types/props'

const deleteTagAsync = async (
  apiUrl: string,
  tagId: string,
  paymentRequestId: string,
  existingTagsIds: string[],
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const paymentRequestClient = new PaymentRequestClient({ apiUrl, authToken })
  const paymentRequestUpdate: PaymentRequestUpdate = {
    tagIds: existingTagsIds.filter((id) => id !== tagId),
  }
  const paymentRequestTagDelete = await paymentRequestClient.update(
    paymentRequestId,
    paymentRequestUpdate,
  )

  if (paymentRequestTagDelete.status === 'error') {
    return { error: paymentRequestTagDelete.error }
  }

  return { success: true }
}

export const useDeleteTag = (
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
  deleteTag: (deleteTagProps: DeleteTagProps) => Promise<{ error: ApiError | undefined }>
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
    DeleteTagProps
  > = useMutation({
    mutationFn: (variables: DeleteTagProps) =>
      deleteTagAsync(
        apiUrl,
        variables.tagId,
        variables.paymentRequestId,
        variables.existingTagsIds,
        authToken,
      ),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        // After delete tag is successful, invalidate the payment requests cache, the single payment request cache
        queryClient.invalidateQueries({ queryKey: SINGLE_PAYMENT_REQUEST_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: PAYMENT_REQUESTS_QUERY_KEY })
      }
    },
  })

  const deleteTag = useCallback(
    async ({ tagId, existingTagsIds, paymentRequestId }: DeleteTagProps) => {
      if (paymentRequestId) {
        setPaymentRequestID(paymentRequestId)
        const result = await mutation.mutateAsync({ tagId, existingTagsIds, paymentRequestId })

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

  return { deleteTag }
}
