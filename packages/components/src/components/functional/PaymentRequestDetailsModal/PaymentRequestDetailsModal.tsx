import {
  Tag,
  useAddPaymentRequestTag,
  useCreateTag,
  usePaymentRequest,
  usePaymentRequestsProps,
  useRemovePaymentRequestTag,
} from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { makeToast } from '../../../components/ui/Toast/Toast'
import {
  LocalAccount,
  LocalCounterparty,
  LocalPaymentRequest,
  LocalTag,
} from '../../../types/LocalTypes'
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
  accounts: LocalAccount[]
  onDismiss: () => void
  setMerchantTags: (merchantTags: LocalTag[]) => void
  setPaymentRequests: (paymentRequests: LocalPaymentRequest[]) => void
  onCardRefund: (authorizationID: string, amount: number, isVoid: boolean) => Promise<void>
  onBankRefund: (
    sourceAccount: LocalAccount,
    counterParty: LocalCounterparty,
    amount: number,
    paymentInitiationID: string,
  ) => Promise<void>
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
  onCardRefund,
  onBankRefund,
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
  accounts,
}: PaymentRequestDetailsModalProps) => {
  const [paymentRequest, setPaymentRequest] = useState<LocalPaymentRequest | undefined>(undefined)

  const { createTag } = useCreateTag(
    {
      merchantId: merchantId,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { addPaymentRequestTag } = useAddPaymentRequestTag(
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

  const { removeTag } = useRemovePaymentRequestTag(
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
      const response = await addPaymentRequestTag({
        id: paymentRequest.id,
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
      const createTagResponse = await createTag({
        tag: apiTag,
      })

      if (createTagResponse.status === 'error') {
        makeToast('error', 'Could not create new tag.')
      }

      if (createTagResponse.status === 'success') {
        const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? []

        const addTagresponse = await addPaymentRequestTag({
          id: paymentRequest.id,
          tag: createTagResponse.data,
          existingTagsIds: existingTagIds,
        })

        if (addTagresponse.error) {
          makeToast('error', 'Failed to add tag to Payment Request.')
        }
      }
    }
  }

  const onTagRemoved = async (tagIdToDelete: string) => {
    if (paymentRequest) {
      const existingTagIds = paymentRequest.tags?.map((tag) => tag.id) ?? []
      const response = await removeTag({
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
    <UIPaymentRequestDetailsModal
      merchantTags={merchantTags}
      paymentRequest={paymentRequest}
      hostedPaymentLink={`${paymentRequest?.hostedPayCheckoutUrl}`}
      open={open}
      accounts={accounts}
      onCardRefund={onCardRefund}
      onBankRefund={onBankRefund}
      onCapture={onCapture}
      onTagAdded={onTagAdded}
      onTagCreated={onTagCreated}
      onTagRemoved={onTagRemoved}
      onDismiss={onModalDismiss}
    />
  )
}

export default PaymentRequestDetailsModal
