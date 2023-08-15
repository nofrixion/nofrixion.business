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

export interface TransactionsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  transactions: LocalTransaction[]
  pagination: Pagination
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  pagination,
  ...props
}) => {
  const onSort = (name: string, direction: SortDirection) => {
    console.log(name, direction)
  }

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
      <Table {...props}>
        <TableHeader>
          <TableRow className="hover:bg-transparent cursor-auto">
            <TableHead className="w-[150px]">
              <ColumnHeader label={'Date'} onSort={(direction) => onSort('Date', direction)} />
            </TableHead>
            <TableHead>
              <ColumnHeader
                label={'To/ From'}
                onSort={(direction) => onSort('To/ From', direction)}
              />
            </TableHead>
            <TableHead className="text-right">
              <ColumnHeader label={'Amount'} onSort={(direction) => onSort('Amount', direction)} />
            </TableHead>
            <TableHead>
              <ColumnHeader
                label={'Reference'}
                onSort={(direction) => onSort('Reference', direction)}
              />
            </TableHead>
            <TableHead className="w-[300px]">
              <ColumnHeader
                label={'Description'}
                onSort={(direction) => onSort('Description', direction)}
              />
            </TableHead>
            <TableHead>
              <ColumnHeader label={'Type'} onSort={(direction) => onSort('Type', direction)} />
            </TableHead>
            <TableHead>{/* Export  Icon + Status */}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.date.toString()}>
              <TableCell className="">
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end py-4">
        <Pager
          onPageChange={() => {}}
          pageSize={pagination.pageSize}
          totalRecords={pagination.totalSize}
        />
      </div>
    </div>
  )
}

export { TransactionsTable }
