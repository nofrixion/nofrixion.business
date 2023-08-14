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

export interface TransactionsTableProps extends React.HTMLAttributes<HTMLDivElement> {}

function randomDate(start = new Date(2012, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const invoices = [
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
    moneyGoing: 'in',
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
    amount: 550.0,
    moneyGoing: 'out',
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: undefined,
    status: 'pending',
  },
  {
    date: randomDate(),
    destinationAccount: {
      name: 'Daniel Kowalski',
      iban: 'IE11MODR99035501927019',
    },
    amount: 200.0,
    moneyGoing: 'in',
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
    amount: 300.0,
    moneyGoing: 'out',
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: undefined,
    status: 'pending',
  },
]

const TransactionsTable: React.FC<TransactionsTableProps> = ({ ...props }) => {
  const onSort = (name: string, direction: SortDirection) => {
    console.log(name, direction)
  }

  const renderBasicInfoLayout = (upperText: string, lowerText: string, className?: string) => {
    return (
      <div className={className}>
        <span className="block text-[13px]">{upperText}</span>
        <span className="text-xs text-grey-text">{lowerText}</span>
      </div>
    )
  }

  return (
    <div {...props}>
      <Table {...props}>
        <TableHeader>
          <TableRow>
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
          {invoices
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((invoice) => (
              <TableRow key={invoice.date.toString()}>
                <TableCell className="">
                  {renderBasicInfoLayout(
                    format(invoice.date, 'MMM dd, yyyy'),
                    format(invoice.date, 'hh:mm'),
                    'w-[100px] truncate',
                  )}
                </TableCell>
                <TableCell>
                  {renderBasicInfoLayout(
                    invoice.destinationAccount.name,
                    invoice.destinationAccount.iban,
                    'w-[200px] truncate',
                  )}
                </TableCell>
                <TableCell
                  className={cn({
                    'text-positive-green': invoice.moneyGoing === 'in',
                    'text-negative-red': invoice.moneyGoing === 'out',
                  })}
                >
                  <div className="flex items-center h-full justify-end mr-5">
                    {invoice.moneyGoing == 'out' && '-'}
                    {formatAmount(invoice.amount)}
                    <div className="ml-1">
                      {invoice.moneyGoing == 'out' ? (
                        <Icon name="outgoing/8" />
                      ) : (
                        <Icon name="incoming/8" />
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="truncate w-36">{invoice.reference}</div>
                </TableCell>
                <TableCell>
                  <div className="truncate w-56">{invoice.description}</div>
                </TableCell>
                <TableCell>
                  <div className="truncate w-36">{invoice.type}</div>
                </TableCell>
                <TableCell className="text-right">
                  {invoice.status && <Status variant="pending" />}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { TransactionsTable }
