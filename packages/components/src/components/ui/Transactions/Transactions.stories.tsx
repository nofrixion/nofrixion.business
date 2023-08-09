import { Meta,StoryFn } from '@storybook/react'

import { mockPaymentAttempts } from '../../../utils/mockedData'
import Transactions from './Transactions'

export default {
  title: 'UI/Transactions',
  component: Transactions,
  argTypes: {
    onRefundClicked: { action: 'refund clicked' },
  },
} as Meta<typeof Transactions>

const Template: StoryFn<typeof Transactions> = (args) => <Transactions {...args} />
export const Showcase = Template.bind({})
Showcase.args = {
  transactions: mockPaymentAttempts,
}
