import { Meta, StoryFn } from '@storybook/react'

import { TransactionsTable } from './TransactionsTable'

export default {
  title: 'Organisms/Transactions Table',
  component: TransactionsTable,
  args: {},
  argTypes: {},
} as Meta<typeof TransactionsTable>

const Template: StoryFn<typeof TransactionsTable> = (args) => <TransactionsTable {...args} />

export const Showcase = Template.bind({})
Showcase.args = {}
