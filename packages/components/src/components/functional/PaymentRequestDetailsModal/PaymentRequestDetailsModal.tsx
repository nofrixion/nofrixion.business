import {
  Tag,
  useAddTag,
  useCreateTag,
  useDeleteTag,
  usePaymentRequest,
  usePaymentRequestsProps,
} from '@nofrixion/clients'
import { useEffect, useState } from 'react'

import { makeToast } from '../../../components/ui/Toast/Toast'
import { LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes'
import {
  parseLocalTagToApiTag,
  remotePaymentRequestToLocalPaymentRequest,
} from '../../../utils/parsers'
import UIPaymentRequestDetailsModal from '../../ui/PaymentRequestDetailsModal/PaymentRequestDetailsModal'

interface PaymentRequestDetailsModalProps extends usePaymentRequestsProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  apiUrl: string // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string
  selectedPaymentRequestID: string
  merchantTags: LocalTag[]
  paymentRequests: LocalPaymentRequest[]
  open: boolean
  onDismiss: () => void
  setMerchantTags: (merchantTags: LocalTag[]) => void
  setPaymentRequests: (paymentRequests: LocalPaymentRequest[]) => void
  onRefund: (authorizationID: string, amount: number, isVoid: boolean) => Promise<void>
  onCapture: (authorizationID: string, amount: number) => Promise<void>
}
const PaymentRequestDetailsModal = ({
  token,
  apiUrl,
  merchantId,
  selectedPaymentRequestID,
  merchantTags,
  open,
  onDismiss,
  onRefund,
  onCapture,
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
}: PaymentRequestDetailsModalProps) => {
  const [paymentRequest, setPaymentRequest] = useState<LocalPaymentRequest | undefined>(undefined)

  const { createTag } = useCreateTag(
    {
      merchantId: merchantId,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      amountSortDirection: amountSortDirection,
      pageNumber: pageNumber,
      pageSize: pageSize,
      fromDateMS: fromDateMS,
      toDateMS: toDateMS,
      status: status,
      search: search,
      currency: currency,
      minAmount: minAmount,
      maxAmount: maxAmount,
      tags: tags,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { addTag } = useAddTag(
    {
      merchantId: merchantId,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      amountSortDirection: amountSortDirection,
      pageNumber: pageNumber,
      pageSize: pageSize,
      fromDateMS: fromDateMS,
      toDateMS: toDateMS,
      status: status,
      search: search,
      currency: currency,
      minAmount: minAmount,
      maxAmount: maxAmount,
      tags: tags,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { deleteTag } = useDeleteTag(
    {
      merchantId: merchantId,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      amountSortDirection: amountSortDirection,
      pageNumber: pageNumber,
      pageSize: pageSize,
      fromDateMS: fromDateMS,
      toDateMS: toDateMS,
      status: status,
      search: search,
      currency: currency,
      minAmount: minAmount,
      maxAmount: maxAmount,
      tags: tags,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { data: paymentRequestResponse } = usePaymentRequest(
    {
      merchantId: merchantId,
      statusSortDirection: statusSortDirection,
      createdSortDirection: createdSortDirection,
      contactSortDirection: contactSortDirection,
      amountSortDirection: amountSortDirection,
      pageNumber: pageNumber,
      pageSize: pageSize,
      fromDateMS: fromDateMS,
      toDateMS: toDateMS,
      status: status,
      search: search,
      currency: currency,
      minAmount: minAmount,
      maxAmount: maxAmount,
      tags: tags,
    },
    {
      paymentRequestId: selectedPaymentRequestID,
      merchantId: merchantId,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  useEffect(() => {
    if (paymentRequestResponse?.status === 'success') {
      setPaymentRequest(remotePaymentRequestToLocalPaymentRequest(paymentRequestResponse.data))
    } else if (paymentRequestResponse?.status === 'error') {
      makeToast('error', 'Could not get payment request details.')
    }
  }, [paymentRequestResponse])

  const onTagAdded = async (tag: LocalTag) => {
    if (paymentRequest) {
      const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? []
      const apiTag: Tag = parseLocalTagToApiTag(tag)
      const response = await addTag({
        paymentRequestId: paymentRequest.id,
        tag: apiTag,
        existingTagsIds: existingTagIds,
      })
      if (response.error) {
        makeToast('error', 'Could not add tag.')
      }
    }
  }

  const onTagCreated = async (tag: LocalTag) => {
    if (paymentRequest) {
      const apiTag: Tag = parseLocalTagToApiTag(tag)
      const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? []
      const response = await createTag({
        tag: apiTag,
        existingTagsIds: existingTagIds,
        paymentRequestId: paymentRequest.id,
      })
      if (response.error) {
        makeToast('error', 'Could not create tag.')
      }
    }
  }

  const onTagDeleted = async (tagIdToDelete: string) => {
    if (paymentRequest) {
      const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? []
      const response = await deleteTag({
        tagId: tagIdToDelete,
        existingTagsIds: existingTagIds,
        paymentRequestId: paymentRequest.id,
      })
      if (response.error) {
        makeToast('error', 'Could not delete tag.')
      }
    }
  }

  const onModalDismiss = () => {
    setPaymentRequest(undefined)
    onDismiss()
  }

  return (
    <div>
      {paymentRequest && (
        <UIPaymentRequestDetailsModal
          merchantTags={merchantTags}
          paymentRequest={paymentRequest}
          hostedPaymentLink={`${paymentRequest.hostedPayCheckoutUrl}`}
          open={open}
          onRefund={onRefund}
          onCapture={onCapture}
          onTagAdded={onTagAdded}
          onTagCreated={onTagCreated}
          onTagDeleted={onTagDeleted}
          onDismiss={onModalDismiss}
        ></UIPaymentRequestDetailsModal>
      )}
    </div>
  )
}

export default PaymentRequestDetailsModal
