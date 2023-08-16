import { Pagination } from '@nofrixion/moneymoov'
import { format } from 'date-fns'
import * as React from 'react'

import { LocalTransaction } from '../../../../types/LocalTypes'
import { cn } from '../../../../utils'
import { formatAmount } from '../../../../utils/formatters'
import { Icon } from '../../atoms'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../atoms/Table/Table'
import ColumnHeader, { SortDirection } from '../../ColumnHeader/ColumnHeader'
import Pager from '../../Pager/Pager'
import EmptyState from '../../PaymentRequestTable/EmptyState'

export interface TransactionsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  transactions: LocalTransaction[]
  pagination: Pick<Pagination, 'pageSize' | 'totalSize'>
  onPageChange: (page: number) => void
  onSort: (name: 'date' | 'amount', direction: SortDirection) => void
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  pagination,
  onPageChange,
  onSort,
  ...props
}) => {
  const renderBasicInfoLayout = (upperText: string, lowerText: string, className?: string) => {
    return (
      <div className={className}>
        <span className="block">{upperText}</span>
        <span className="text-xs text-grey-text">{lowerText}</span>
      </div>
    )
  }

  return (
    <div {...props}>
      {transactions.length > 0 && (
        <>
          <Table {...props}>
            <TableHeader>
              <TableRow className="hover:bg-transparent cursor-auto">
                <TableHead className="w-[150px]">
                  <ColumnHeader label={'Date'} onSort={(direction) => onSort('date', direction)} />
                </TableHead>
                <TableHead>
                  <ColumnHeader label={'To/ From'} />
                </TableHead>
                <TableHead className="text-right">
                  <ColumnHeader
                    label={'Amount'}
                    onSort={(direction) => onSort('amount', direction)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader label={'Reference'} />
                </TableHead>
                <TableHead className="w-[300px]">
                  <ColumnHeader label={'Description'} />
                </TableHead>
                <TableHead>
                  <ColumnHeader label={'Type'} />
                </TableHead>
                <TableHead>{/* Export  Icon + Status */}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={`${transaction}-${index}`}>
                  <TableCell>
                    {renderBasicInfoLayout(
                      format(transaction.date, 'MMM dd, yyyy'),
                      format(transaction.date, 'hh:mm'),
                      'w-[100px] truncate',
                    )}
                  </TableCell>
                  <TableCell>
                    {renderBasicInfoLayout(
                      transaction.destinationAccount.name,
                      transaction.destinationAccount.accountInfo,
                      'w-[200px] truncate',
                    )}
                  </TableCell>
                  <TableCell
                    className={cn({
                      'text-positive-green': transaction.amount > 0,
                      'text-negative-red': transaction.amount < 0,
                    })}
                  >
                    <div className="flex flex-col justify-center h-full items-end mr-5">
                      <div className="flex items-center h-full justify-end font-medium text-base/5 tabular-nums">
                        {formatAmount(transaction.amount)}
                        <div className="ml-1">
                          {transaction.amount < 0 ? (
                            <Icon name="outgoing/8" />
                          ) : (
                            <Icon name="incoming/8" />
                          )}
                        </div>
                      </div>
                      {transaction.balanceAfterTx != undefined && (
                        <div className="text-[11px] leading-4 text-grey-text mr-3">
                          {formatAmount(transaction.balanceAfterTx)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="truncate w-36">{transaction.reference}</div>
                  </TableCell>
                  <TableCell>
                    <div className="truncate w-56">{transaction.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="truncate w-36">{transaction.type}</div>
                  </TableCell>

                  {/* Fill empty space */}
                  <TableCell className="p-0"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end py-4">
            <Pager
              onPageChange={onPageChange}
              pageSize={pagination.pageSize}
              totalRecords={pagination.totalSize}
            />
          </div>
        </>
      )}
      {transactions.length === 0 && (
        <EmptyState state="nothingFound" description="No transactions were found" />
      )}
    </div>
  )
}

export { TransactionsTable }