import { Meta, StoryFn } from '@storybook/react'

import { mockPaymentAttemptEvents } from '../../../utils/mockedData'
import PaymentAttemptEventsList from './PaymentAttemptEventsList'

export default {
  title: 'UI/Payment Attempt Events List',
  component: PaymentAttemptEventsList,
} as Meta<typeof PaymentAttemptEventsList>

const Template: StoryFn<typeof PaymentAttemptEventsList> = (args) => (
  <PaymentAttemptEventsList {...args} />
)

export const Regular = Template.bind({})

Regular.args = {
  paymentAttemptEvents: mockPaymentAttemptEvents,
}
