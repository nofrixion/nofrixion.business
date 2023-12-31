import {
  PayoutStatus,
  Tag,
  useAddPayoutTag,
  useCancelScheduledPayout,
  useCreateTag,
  usePayout,
  User,
  useRemovePayoutTag,
  useUser,
} from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { LocalPayout, LocalTag, SystemError } from '../../../types/LocalTypes'
import { DoubleSortByPayouts } from '../../../types/Sort'
import { parseLocalTagToApiTag, remotePayoutToLocal } from '../../../utils/parsers'
import { DateRange } from '../../ui/DateRangePicker/DateRangePicker'
import UIPayoutDetailsModal from '../../ui/organisms/PayoutDetailsModal/PayoutDetailsModal'
import { makeToast } from '../../ui/Toast/Toast'

export interface PayoutDetailsModalProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  apiUrl: string // Example: "https://api.nofrixion.com/api/v1"
  selectedPayoutId?: string
  open: boolean
  onDismiss: () => void
  merchantId: string
  sortBy: DoubleSortByPayouts
  statuses: PayoutStatus[]
  page: number
  pageSize: number
  dateRange: DateRange
  searchFilter: string
  currencyFilter?: string
  minAmountFilter?: number
  maxAmountFilter?: number
  tagsFilter?: string[]
  merchantTags: LocalTag[]
  isUserAuthoriser: boolean
  onEdit: () => void
  onSystemError: (systemError: SystemError) => void
}

const PayoutDetailsModal = ({
  token,
  apiUrl,
  selectedPayoutId,
  open,
  onDismiss,
  merchantId,
  sortBy,
  statuses,
  page,
  pageSize,
  dateRange,
  searchFilter,
  currencyFilter,
  minAmountFilter,
  maxAmountFilter,
  tagsFilter,
  merchantTags,
  isUserAuthoriser,
  onEdit,
  onSystemError,
}: PayoutDetailsModalProps) => {
  const [payout, setPayout] = useState<LocalPayout | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)

  const { data: userResponse } = useUser({
    apiUrl: apiUrl,
  })

  useEffect(() => {
    if (userResponse?.status === 'success') {
      setCurrentUser(userResponse.data)
    }
  }, [userResponse])

  const { data: payoutResponse } = usePayout(
    {
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      sortBy: sortBy,
      fromDateMS: dateRange.fromDate && dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate && dateRange.toDate.getTime(),
      statuses: statuses,
      search: searchFilter.length >= 3 ? searchFilter : undefined,
      currency: currencyFilter,
      minAmount: minAmountFilter,
      maxAmount: maxAmountFilter,
      tags: tagsFilter,
    },
    { payoutId: selectedPayoutId },
    { apiUrl: apiUrl, authToken: token },
  )

  useEffect(() => {
    if (payoutResponse?.status === 'success') {
      setPayout(remotePayoutToLocal(payoutResponse.data, currentUser))
    } else if (payoutResponse?.status === 'error') {
      makeToast('error', 'Could not get payout details.')
    }
  }, [payoutResponse])

  const { createTag } = useCreateTag(
    {
      merchantId: merchantId,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { addPayoutTag } = useAddPayoutTag({ apiUrl: apiUrl, authToken: token })

  const { removeTag } = useRemovePayoutTag({ apiUrl: apiUrl, authToken: token })

  const { cancelScheduledPayout } = useCancelScheduledPayout({ apiUrl: apiUrl, authToken: token })

  const onTagAdded = async (tag: LocalTag) => {
    if (payout) {
      const existingTagIds = payout.tags?.map((tag) => tag.id) ?? []
      const apiTag: Tag = parseLocalTagToApiTag(tag)
      const response = await addPayoutTag({
        id: payout.id,
        tag: apiTag,
        existingTagsIds: existingTagIds,
      })
      if (response.error) {
        makeToast('error', 'Could not add tag.')
      }
    }
  }

  const onTagCreated = async (tag: LocalTag) => {
    if (payout) {
      const apiTag: Tag = parseLocalTagToApiTag(tag)
      const createTagResponse = await createTag({
        tag: apiTag,
      })

      if (createTagResponse.status === 'error') {
        makeToast('error', 'Could not create new tag.')
      }

      if (createTagResponse.status === 'success') {
        const existingTagIds = payout.tags?.map((tag) => tag.id) ?? []

        const addTagresponse = await addPayoutTag({
          id: payout.id,
          tag: createTagResponse.data,
          existingTagsIds: existingTagIds,
        })

        if (addTagresponse.error) {
          makeToast('error', 'Failed to add tag to Payout.')
        }
      }
    }
  }

  const onTagRemoved = async (tagId: string) => {
    if (payout) {
      const existingTagIds = payout.tags?.map((tag) => tag.id) ?? []
      const response = await removeTag({
        tagId: tagId,
        existingTagsIds: existingTagIds,
        id: payout.id,
      })
      if (response.error) {
        makeToast('error', 'Could not delete tag.')
      }
    }
  }

  const onScheduleCancelled = async () => {
    if (payout) {
      const response = await cancelScheduledPayout(payout.id)

      if (response.error) {
        onSystemError({
          title: 'Scheduled payout cancellation has failed',
          message: response.error.detail,
        })
      }
    }
  }

  const onModalDismiss = () => {
    setPayout(undefined)
    onDismiss()
  }

  return (
    <UIPayoutDetailsModal
      onDismiss={onModalDismiss}
      onTagAdded={onTagAdded}
      onTagCreated={onTagCreated}
      onTagRemoved={onTagRemoved}
      open={open}
      payout={payout}
      merchantTags={merchantTags}
      onScheduleCancelled={onScheduleCancelled}
      isUserAuthoriser={isUserAuthoriser}
      onEdit={onEdit}
    />
  )
}

export default PayoutDetailsModal
