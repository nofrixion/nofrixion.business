import { Pagination, SortDirection } from '@nofrixion/moneymoov'
import { format } from 'date-fns'

import { LocalPayout } from '../../../../types/LocalTypes'
import { formatAmount } from '../../../../utils/formatters'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../atoms/Table/Table'
import ColumnHeader from '../../ColumnHeader/ColumnHeader'
import Pager from '../../Pager/Pager'
import EmptyState from '../../PaymentRequestTable/EmptyState'

export interface PayoutsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  payouts: LocalPayout[]
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  onPageChange: (page: number) => void
  onSort: (name: 'date' | 'amount', direction: SortDirection) => void
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
                    onSort={(direction) => onSort('date', direction)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader label={'Created'} />
                </TableHead>
                <TableHead>
                  <ColumnHeader label={'PAyee'} />
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
                  <TableCell>{/* TODO: Add status icon */}</TableCell>
                  <TableCell>
                    {renderBasicInfoLayout(
                      format(payout.inserted, 'MMM dd, yyyy'),
                      format(payout.inserted, 'hh:mm'),
                      'w-[100px] truncate',
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="truncate w-36">{payout.destination?.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col justify-center h-full items-end mr-5">
                      <div className="flex items-center h-full justify-end font-medium text-base/5 tabular-nums">
                        {formatAmount(payout.amount)}
                      </div>
                    </div>
                  </TableCell>

                  {/* Fill empty space */}
                  <TableCell className="p-0"></TableCell>
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
        <EmptyState state="nothingFound" description="No transactions were found" />
      )}
    </div>
  )
}

export { PayoutsTable }
