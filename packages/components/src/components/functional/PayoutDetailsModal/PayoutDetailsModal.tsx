import { SortDirection, usePayout } from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { LocalPayout } from '../../../types/LocalTypes'
import { remotePayoutToLocal } from '../../../utils/parsers'
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
  statusSortDirection: SortDirection
  createdSortDirection: SortDirection
  amountSortDirection: SortDirection
  page: number
  pageSize: number
  dateRange: DateRange
  searchFilter: string
  currencyFilter?: string
  minAmountFilter?: number
  maxAmountFilter?: number
  tagsFilter?: string[]
}

const PayoutDetailsModal = ({
  token,
  apiUrl,
  selectedPayoutId,
  open,
  onDismiss,
  merchantId,
  statusSortDirection,
  createdSortDirection,
  amountSortDirection,
  page,
  pageSize,
  dateRange,
  searchFilter,
  currencyFilter,
  minAmountFilter,
  maxAmountFilter,
  tagsFilter,
}: PayoutDetailsModalProps) => {
  const [payout, setPayout] = useState<LocalPayout | undefined>(undefined)

  const { data: payoutResponse } = usePayout(
    {
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      amountSortDirection: amountSortDirection,
      createdSortDirection: createdSortDirection,
      statusSortDirection: statusSortDirection,
      fromDateMS: dateRange.fromDate && dateRange.fromDate.getTime(),
      toDateMS: dateRange.toDate && dateRange.toDate.getTime(),
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
      setPayout(remotePayoutToLocal(payoutResponse.data))
    } else if (payoutResponse?.status === 'error') {
      makeToast('error', 'Could not get payout details.')
    }
  }, [payoutResponse])

  return <UIPayoutDetailsModal onDismiss={onDismiss} open={open} payout={payout} />
}

export default PayoutDetailsModal
