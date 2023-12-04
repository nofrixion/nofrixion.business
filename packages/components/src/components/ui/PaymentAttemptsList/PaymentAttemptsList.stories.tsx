import { Meta, StoryFn } from '@storybook/react'

import { mockPaymentAttempts } from '../../../utils/mockedData'
import PaymentAttemptsList from './PaymentAttemptsList'

export default {
  title: 'UI/Payment Attempts List',
  component: PaymentAttemptsList,
} as Meta<typeof PaymentAttemptsList>

const Template: StoryFn<typeof PaymentAttemptsList> = (args) => <PaymentAttemptsList {...args} />

export const Regular = Template.bind({})

Regular.args = {
  paymentAttempts: mockPaymentAttempts,
  cardAuthoriseOnly: false,
  onRefund: () => {},
  onVoid: () => {},
  onCapture: () => {},
}
