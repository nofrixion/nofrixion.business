import { Meta, StoryFn } from '@storybook/react'

import PendingPayments from './PendingPayments'

export default {
  title: 'UI/PendingPayments ',
  component: PendingPayments,
} as Meta<typeof PendingPayments>

const Template: StoryFn<typeof PendingPayments> = (args) => {
  return (
    <div>
      <PendingPayments {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  name: 'click here',
  reference: 'test payment',
  amount: 24345.67,
}
