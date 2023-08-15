import { format } from 'date-fns'
import * as React from 'react'

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
import { Status } from '../../molecules/Status/Status'
import Pager from '../../Pager/Pager'

export interface TransactionsTableProps extends React.HTMLAttributes<HTMLDivElement> {}

function randomDate(start = new Date(2012, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const transactions = [
  {
    date: randomDate(),
    destinationAccount: {
      name: 'Daniel Kowalski',
      iban: 'IE11MODR99035501927019',
    },
    amount: 250.0,
    moneyGoing: 'out',
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA',
    status: 'pending',
  },
  {
    date: randomDate(),
    destinationAccount: {
      name: 'Daniel Kowalski',
      iban: 'IE11MODR99035501927019',
    },
    amount: 1500000.99,
    moneyGoing: 'in',
    reference: 'Very very very long reference. As long as it can be. Or even longer.',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA Instant',
    status: 'pending',
  },
  {
    date: randomDate(),
    destinationAccount: {
      name: 'Daniel Kowalski',
      iban: 'IE11MODR99035501927019',
    },
    amount: 350.0,
    moneyGoing: 'out',
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA Instant',
    status: 'pending',
  },
  {
    date: randomDate(),
    destinationAccount: {
      name: 'Daniel Kowalski',
      iban: 'IE11MODR99035501927019',
    },
    amount: 450.0,
    balanceAfterTx: 32345,
    moneyGoing: 'in',
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA',
  },
  {
    date: randomDate(),
    destinationAccount: {
      name: 'Daniel Kowalski',
      iban: 'IE11MODR99035501927019',
    },
    amount: 550.0,
    balanceAfterTx: 32345,
    moneyGoing: 'out',
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: undefined,
  },
  {
    date: randomDate(),
    destinationAccount: {
      name: 'Daniel Kowalski',
      iban: 'IE11MODR99035501927019',
    },
    amount: 200.0,
    balanceAfterTx: 32345,
    moneyGoing: 'in',
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA Instant',
  },
  {
    date: randomDate(),
    destinationAccount: {
      name: 'Daniel Kowalski',
      iban: 'IE11MODR99035501927019',
    },
    amount: 300.0,
    balanceAfterTx: 32345,
    moneyGoing: 'out',
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: undefined,
  },
]

const TransactionsTable: React.FC<TransactionsTableProps> = ({ ...props }) => {
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
          {/* Sort by date */}
          {transactions
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((transaction) => (
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
                    transaction.destinationAccount.iban,
                    'w-[200px] truncate',
                  )}
                </TableCell>
                <TableCell
                  className={cn({
                    'text-positive-green': transaction.moneyGoing === 'in',
                    'text-negative-red': transaction.moneyGoing === 'out',
                  })}
                >
                  <div className="flex flex-col justify-center h-full items-end mr-5">
                    <div className="flex items-center h-full justify-end font-medium text-base/5 tabular-nums">
                      {transaction.moneyGoing == 'out' && '-'}
                      {formatAmount(transaction.amount)}
                      <div className="ml-1">
                        {transaction.moneyGoing == 'out' ? (
                          <Icon name="outgoing/8" />
                        ) : (
                          <Icon name="incoming/8" />
                        )}
                      </div>
                    </div>
                    {transaction.balanceAfterTx && (
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
                <TableCell className="text-right">
                  {transaction.status && <Status variant="pending" />}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end py-4">
        <Pager onPageChange={() => {}} pageSize={10} totalRecords={100} />
      </div>
    </div>
  )
}

export { TransactionsTable }
