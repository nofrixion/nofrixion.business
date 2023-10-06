import { Meta, StoryFn } from '@storybook/react'

import PaymentRequestAttemptsCell from './PaymentRequestAttemptsCell'

export default {
  title: 'UI/Payment Request Attempts Cell',
  component: PaymentRequestAttemptsCell,
  argTypes: {
    successfulAttemptsCount: { control: 'number' },
    pendingAttemptsCount: { control: 'number' },
    failedAttemptsCount: { control: 'number' },
    hostedPaymentLink: { control: 'text' },
  },
} as Meta<typeof PaymentRequestAttemptsCell>

const EmptyTemplate: StoryFn<typeof PaymentRequestAttemptsCell> = (args) => {
  return <PaymentRequestAttemptsCell {...args} />
}

const SingleStatusTemplate: StoryFn<typeof PaymentRequestAttemptsCell> = (args) => {
  return <PaymentRequestAttemptsCell {...args} />
}

const MultipleStatusesTemplate: StoryFn<typeof PaymentRequestAttemptsCell> = (args) => {
  return <PaymentRequestAttemptsCell {...args} />
}

export const Empty = EmptyTemplate.bind({})
Empty.args = {
  successfulAttemptsCount: 0,
  pendingAttemptsCount: 0,
  failedAttemptsCount: 0,
  hostedPaymentLink: 'https://www.nofrixion.com',
}

export const SingleStatus = SingleStatusTemplate.bind({})
SingleStatus.args = {
  successfulAttemptsCount: 1,
  pendingAttemptsCount: 0,
  failedAttemptsCount: 0,
  hostedPaymentLink: 'https://www.nofrixion.com',
}

export const MultipleStatuses = MultipleStatusesTemplate.bind({})
MultipleStatuses.args = {
  successfulAttemptsCount: 2,
  pendingAttemptsCount: 1,
  failedAttemptsCount: 1,
  hostedPaymentLink: 'https://www.nofrixion.com',
}
