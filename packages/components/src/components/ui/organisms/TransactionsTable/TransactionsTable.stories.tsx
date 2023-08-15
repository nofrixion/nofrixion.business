import { Meta, StoryFn } from '@storybook/react'

import { mockedTransactions } from '../../../../utils/mockedData'
import { TransactionsTable } from './TransactionsTable'

export default {
  title: 'Organisms/Transactions Table',
  component: TransactionsTable,
  args: {},
  argTypes: {
    transactions: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof TransactionsTable>

const Template: StoryFn<typeof TransactionsTable> = (args) => <TransactionsTable {...args} />

export const Showcase = Template.bind({})
Showcase.args = {
  transactions: mockedTransactions,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 20,
    totalSize: 200,
  },
}
