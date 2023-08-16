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
    pageSize: 10,
    totalSize: 100,
  },
}

export const Empty = Template.bind({})
Empty.args = {
  transactions: [],
  pagination: {
    pageSize: 0,
    totalSize: 0,
  },
}
