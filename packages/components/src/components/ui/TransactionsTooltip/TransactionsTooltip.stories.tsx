import { Meta, StoryFn } from '@storybook/react'

import { mockPaymentAttempts } from '../../../utils/mockedData'
import TransactionsTooltip from './TransactionsTooltip'

export default {
  title: 'UI/Transactions Tooltip',
  component: TransactionsTooltip,
} as Meta<typeof TransactionsTooltip>

const Template: StoryFn<typeof TransactionsTooltip> = (args) => <TransactionsTooltip {...args} />

export const PriorityBank = Template.bind({})
PriorityBank.args = {
  paymentAttempts: mockPaymentAttempts,
}
