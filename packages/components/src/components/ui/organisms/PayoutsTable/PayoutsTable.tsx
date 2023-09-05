import { Pagination, PayoutStatus, SortDirection } from '@nofrixion/moneymoov'
import { format } from 'date-fns'

import { LocalPayout } from '../../../../types/LocalTypes'
import { formatAmount } from '../../../../utils/formatters'
import { payoutStatusToStatus } from '../../../../utils/parsers'
import { Button } from '../../atoms'
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

export interface PayoutsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  payouts: LocalPayout[]
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  onPageChange: (page: number) => void
  onSort: (name: 'date' | 'amount' | 'status', direction: SortDirection) => void
}

const PayoutsTable: React.FC<PayoutsTableProps> = ({
  payouts,
  pagination,
  onPageChange,
  onSort,
  ...props
}) => {
  const renderBasicInfoLayout = (
    upperText: string,
    lowerText: string | undefined,
    className?: string,
  ) => {
    return (
      <div className={className}>
        <span className="block">{upperText}</span>
        {lowerText && <span className="text-xs text-grey-text">{lowerText}</span>}
      </div>
    )
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
                <TableHead className="text-right">
                  <ColumnHeader
                    label={'Amount'}
                    onSort={(direction) => onSort('amount', direction)}
                  />
                </TableHead>
                <TableHead>{/* Export  Icon + Status */}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payout, index) => (
                <TableRow
                  className="cursor-auto hover:bg-inherit hover:border-inherit"
                  key={`${payout}-${index}`}
                >
                  <TableCell>
                    <Status size="small" variant={payoutStatusToStatus(payout.status)} />
                  </TableCell>
                  <TableCell className="w-48">
                    {renderBasicInfoLayout(format(payout.inserted, 'MMM dd, yyyy'), undefined)}
                  </TableCell>
                  <TableCell>
                    <div className="truncate w-36">{payout.destination?.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col justify-center h-full items-end mr-5">
                      <div className="flex items-center h-full justify-end font-medium text-base/5 tabular-nums">
                        {formatAmount(payout.amount)}{' '}
                        <span className="text-grey-text pl-6">{payout.currency}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="w-0">
                    {payout.status === PayoutStatus.PENDING_APPROVAL && (
                      <Button variant="primary" size="x-small" className="w-fit" onClick={() => {}}>
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end mt-8">
            <Pager
              onPageChange={onPageChange}
              pageSize={pagination.pageSize}
              totalRecords={pagination.totalSize}
            />
          </div>
        </>
      )}
      {payouts.length === 0 && (
        <EmptyState state="nothingFound" description="No payouts were found" />
      )}
    </div>
  )
}

export { PayoutsTable }
