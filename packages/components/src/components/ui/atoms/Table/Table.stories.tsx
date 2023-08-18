import { Meta, StoryFn } from '@storybook/react'

import ColumnHeader, { SortDirection } from '../../ColumnHeader/ColumnHeader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table'

export default {
  title: 'Atoms/Table',
  component: Table,
} as Meta<typeof Table>

type Story = StoryFn<typeof Table>

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]

export const Showcase: Story = (args) => {
  const onSort = (name: string, direction: SortDirection) => {
    console.log(name, direction)
  }

  return (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]" />
          <TableHead>
            <ColumnHeader label={'Status'} onSort={(direction) => onSort('Status', direction)} />
          </TableHead>
          <TableHead>
            <ColumnHeader label={'Method'} onSort={(direction) => onSort('Method', direction)} />
          </TableHead>
          <TableHead>
            <ColumnHeader label={'Amount'} onSort={(direction) => onSort('Amount', direction)} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
