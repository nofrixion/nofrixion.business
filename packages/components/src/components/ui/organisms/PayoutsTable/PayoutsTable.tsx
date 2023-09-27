import { Pagination, PayoutStatus, SortDirection } from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { LocalPayout } from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { formatAmount, formatDateWithYear } from '../../../../utils/formatters'
import { payoutStatusToStatus } from '../../../../utils/parsers'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../atoms/Table/Table'
import Checkbox from '../../Checkbox/Checkbox'
import Chip from '../../Chip/Chip'
import ColumnHeader from '../../ColumnHeader/ColumnHeader'
import { Status } from '../../molecules'
import Pager from '../../Pager/Pager'
import EmptyState from '../../PaymentRequestTable/EmptyState'
import { PayoutAuthoriseForm } from '../../utils/PayoutAuthoriseForm'

export interface PayoutsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  payouts: LocalPayout[]
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  onPageChange: (page: number) => void
  onSort: (
    name: 'date' | 'amount' | 'status' | 'counterParty.name',
    direction: SortDirection,
  ) => void
  onPayoutClicked?: (payout: LocalPayout) => void
  isLoading?: boolean
  selectedPayoutId: string | undefined
  status: PayoutStatus
  onAddPayoutForAuthorise: (payoutId: string) => void
  onRemovePayoutForAuthorise: (payoutId: string) => void
  selectedPayouts: string[]
}

const PayoutsTable: React.FC<PayoutsTableProps> = ({
  payouts,
  pagination,
  onPageChange,
  onSort,
  onPayoutClicked,
  isLoading = false,
  selectedPayoutId,
  status,
  onAddPayoutForAuthorise,
  onRemovePayoutForAuthorise,
  selectedPayouts,
  ...props
}) => {
  const [allPayoutsSelected, setAllPayoutsSelected] = useState(false)

  const onPayoutClickedHandler = (
    event: React.MouseEvent<HTMLTableRowElement | HTMLButtonElement | HTMLDivElement, MouseEvent>,
    payout: LocalPayout,
  ) => {
    onPayoutClicked && onPayoutClicked(payout)
  }

  const togglePayoutAuthoriseStatus = (payoutId: string, checked: boolean) => {
    if (checked) {
      onAddPayoutForAuthorise(payoutId)
    } else {
      setAllPayoutsSelected(false)
      onRemovePayoutForAuthorise(payoutId)
    }
  }

  const toggleAllPayoutAuthoriseStatuses = (checked: boolean) => {
    if (checked) {
      setAllPayoutsSelected(true)

      payouts.map((payout) => {
        onAddPayoutForAuthorise(payout.id)
      })
    } else {
      setAllPayoutsSelected(false)
      payouts.map((payout) => {
        onRemovePayoutForAuthorise(payout.id)
      })
    }
  }

  useEffect(() => {
    let allSelected = true
    payouts.map((payout) => {
      if (!selectedPayouts.includes(payout.id)) {
        allSelected = false
        return
      }
    })
    setAllPayoutsSelected(allSelected)
  }, [selectedPayouts, payouts])

  return (
    <div {...props}>
      {payouts.length > 0 && (
        <>
          <Table {...props}>
            <TableHeader>
              <TableRow className="hover:bg-transparent cursor-auto">
                {status && status === PayoutStatus.PENDING_APPROVAL && (
                  <TableHead
                    className="w-0"
                    onClick={() => toggleAllPayoutAuthoriseStatuses(!allPayoutsSelected)}
                  >
                    <Checkbox
                      value={allPayoutsSelected}
                      onChange={(value) => {
                        toggleAllPayoutAuthoriseStatuses(value)
                      }}
                    />
                  </TableHead>
                )}
                <TableHead className="w-[150px]">
                  <ColumnHeader
                    label={'Status'}
                    onSort={(direction) => onSort('status', direction)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    label={'Created'}
                    onSort={(direction) => onSort('date', direction)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    label={'Payee'}
                    onSort={(direction) => onSort('counterParty.name', direction)}
                  />
                </TableHead>
                <TableHead className="text-right px-0">
                  <ColumnHeader
                    label={'Amount'}
                    onSort={(direction) => onSort('amount', direction)}
                  />
                </TableHead>
                <TableHead>{/* Currency */}</TableHead>
                <TableHead>{/* Tags */}</TableHead>
                <TableHead>
                  <Pager
                    onPageChange={onPageChange}
                    pageSize={pagination.pageSize}
                    totalRecords={pagination.totalSize}
                  />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from(Array(12)).map((_, index) => (
                  <TableRow
                    key={`pr-placeholder-${index}`}
                    className="animate-pulse border-b border-[#F1F2F3]"
                  >
                    <TableCell className="w-48 py-6">
                      <div className="w-full h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="w-48">
                      <div className="w-full h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="w-48">
                      <div className="w-full h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="w-48">
                      <div className="w-1/4 ml-auto h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="p-0"></TableCell>

                    <TableCell className="w-0">
                      <div className="w-1/2 ml-auto h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="w-0">
                      <div className="w-1/2 ml-auto h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading &&
                payouts.map((payout, index) => (
                  <TableRow
                    className={cn(
                      'cursor-pointer transition-all ease-in-out hover:bg-[#F6F8F9] hover:border-[#E1E5EA]',
                      {
                        'bg-[#F6F8F9] border-[#E1E5EA]':
                          selectedPayoutId === payout.id ||
                          (selectedPayouts.includes(payout.id) &&
                            status === PayoutStatus.PENDING_APPROVAL),
                      },
                    )}
                    key={`${payout}-${index}`}
                    onClick={(event) => onPayoutClickedHandler(event, payout)}
                  >
                    {status && status === PayoutStatus.PENDING_APPROVAL && (
                      <TableCell
                        onClick={(event) => {
                          event.stopPropagation()
                          togglePayoutAuthoriseStatus(
                            payout.id,
                            !selectedPayouts.includes(payout.id),
                          )
                        }}
                      >
                        <Checkbox
                          value={selectedPayouts.includes(payout.id)}
                          onChange={(value) => {
                            togglePayoutAuthoriseStatus(payout.id, value)
                          }}
                        />
                      </TableCell>
                    )}
                    <TableCell className="w-48">
                      <Status size="small" variant={payoutStatusToStatus(payout.status)} />
                    </TableCell>
                    <TableCell className="w-48">
                      {payout.inserted && formatDateWithYear(new Date(payout.inserted))}
                    </TableCell>
                    <TableCell className="w-48">
                      <div className="truncate">{payout.destination?.name}</div>
                    </TableCell>
                    <TableCell className="text-right truncate tabular-nums font-medium text-base/5 py-4 px-6 w-48">
                      {formatAmount(payout.amount)}
                    </TableCell>
                    <TableCell className="pl-0 text-grey-text font-normal text-sm">
                      {payout.currency}
                    </TableCell>
                    <TableCell className="pl-0 text-grey-text font-normal text-sm text-right">
                      <div className="hidden xl:block space-x-1 justify-end">
                        {payout.tags.map((tag, index) => (
                          <Chip key={`tag-${index}`} label={tag.name} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center w-0">
                      {payout.status === PayoutStatus.PENDING_APPROVAL && (
                        <PayoutAuthoriseForm id={payout.id} size="x-small" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
      {!isLoading && payouts.length === 0 && (
        <EmptyState state="nothingFound" description="No payouts were found" />
      )}
    </div>
  )
}

export { PayoutsTable }
