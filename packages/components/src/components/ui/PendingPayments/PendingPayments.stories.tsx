import { action } from '@storybook/addon-actions/'
import { Meta, StoryFn } from '@storybook/react'

import { mockPayouts } from '../../../utils/mockedData'
import { PendingPayments } from './PendingPayments'

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
  pendingPayments: mockPayouts,
  onSeeMore: action('onSeeMore'),
}
