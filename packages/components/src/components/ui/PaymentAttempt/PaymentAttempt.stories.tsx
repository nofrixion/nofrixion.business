import { Meta, StoryFn } from '@storybook/react'

import { mockPaymentAttempts } from '../../../utils/mockedData'
import PaymentAttempt from './PaymentAttempt'

export default {
  title: 'UI/Payment Attempt',
  component: PaymentAttempt,
} as Meta<typeof PaymentAttempt>

const Template: StoryFn<typeof PaymentAttempt> = (args) => <PaymentAttempt {...args} />

export const Regular = Template.bind({})

Regular.args = {
  paymentAttempt: mockPaymentAttempts[0],
  cardAuthoriseOnly: false,
  onRefund: () => {},
  onVoid: () => {},
  onCapture: () => {},
}
