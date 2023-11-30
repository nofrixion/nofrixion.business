import { Meta, StoryFn } from '@storybook/react'

import { mockPaymentAttemptEvents } from '../../../utils/mockedData'
import PaymentAttemptEvent from './PaymentAttemptEvent'

export default {
  title: 'UI/Payment Attempt Event',
  component: PaymentAttemptEvent,
} as Meta<typeof PaymentAttemptEvent>

const Template: StoryFn<typeof PaymentAttemptEvent> = (args) => <PaymentAttemptEvent {...args} />

export const Regular = Template.bind({})

Regular.args = {
  paymentAttemptEvent: mockPaymentAttemptEvents[0],
}
