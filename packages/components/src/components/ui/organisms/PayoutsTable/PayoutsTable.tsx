import { Pagination, PayoutStatus, SortDirection } from '@nofrixion/moneymoov'

import { LocalPayout } from '../../../../types/LocalTypes'
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
import ColumnHeader from '../../ColumnHeader/ColumnHeader'
import { Status } from '../../molecules'
import Pager from '../../Pager/Pager'
import EmptyState from '../../PaymentRequestTable/EmptyState'
import { PayoutApproveForm } from '../../utils/PayoutApproveForm'

export interface PayoutsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  payouts: LocalPayout[]
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  onPageChange: (page: number) => void
  onSort: (name: 'date' | 'amount' | 'status', direction: SortDirection) => void
  onPayoutClicked?: (payout: LocalPayout) => void
  isLoading?: boolean
}

const PayoutsTable: React.FC<PayoutsTableProps> = ({
  payouts,
  pagination,
  onPageChange,
  onSort,
  onPayoutClicked,
  isLoading = false,
  ...props
}) => {
  const onPayoutClickedHandler = (
    event: React.MouseEvent<HTMLTableRowElement | HTMLButtonElement | HTMLDivElement, MouseEvent>,
    payout: LocalPayout,
  ) => {
    if (event.metaKey) {
      console.log('metaKey', event.metaKey)
    } else {
      onPayoutClicked && onPayoutClicked(payout)
    }
  }

  return (
    <div {...props}>
      {payouts.length > 0 && (
        <>
          <Table {...props}>
            <TableHeader>
              <TableRow className="hover:bg-transparent cursor-auto">
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
                  <ColumnHeader label={'Payee'} />
                </TableHead>
                <TableHead className="text-right px-0">
                  <ColumnHeader
                    label={'Amount'}
                    onSort={(direction) => onSort('amount', direction)}
                  />
                </TableHead>
                <TableHead>{/* Currency */}</TableHead>
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

                    <TableCell className="w-60">
                      <div className="w-full h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="w-72">
                      <div className="w-1/4 ml-auto h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>

                    <TableCell className="p-0"></TableCell>

                    <TableCell className="w-0">
                      <div className="w-1/2 ml-auto h-2 bg-[#E0E9EB] rounded-lg" />
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading &&
                payouts.map((payout, index) => (
                  <TableRow
                    className="cursor-pointer transition-all ease-in-out hover:bg-[#F6F8F9] hover:border-[#E1E5EA]"
                    key={`${payout}-${index}`}
                    onClick={(event) => onPayoutClickedHandler(event, payout)}
                  >
                    <TableCell className="w-48">
                      <Status size="small" variant={payoutStatusToStatus(payout.status)} />
                    </TableCell>
                    <TableCell className="w-48">
                      {payout.inserted && formatDateWithYear(new Date(payout.inserted))}
                    </TableCell>
                    <TableCell className="w-60">
                      <div className="truncate">{payout.destination?.name}</div>
                    </TableCell>
                    <TableCell className="text-right truncate tabular-nums font-medium text-base/5 py-4 px-6 w-72">
                      {formatAmount(payout.amount)}
                    </TableCell>
                    <TableCell className="pl-0 text-grey-text align-left font-normal text-sm">
                      {payout.currency}
                    </TableCell>
                    <TableCell className="w-0">
                      {payout.status === PayoutStatus.PENDING_APPROVAL && (
                        <PayoutApproveForm payoutId={payout.id} />
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
