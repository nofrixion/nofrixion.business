import { Meta, StoryFn } from '@storybook/react'

import mockedData from '../../../../utils/mockedData'
import { SingleDatePicker } from './SingleDatePicker'

export default {
  title: 'Organisms/Single Date Picker',
  component: SingleDatePicker,
  argTypes: {
    onDismiss: {
      action: 'Dismiss',
    },
  },
} as Meta<typeof SingleDatePicker>

const Template: StoryFn<typeof SingleDatePicker> = () => {
  return (
    <>
      <SingleDatePicker />
    </>
  )
}

export const Showcase = Template.bind({})
Showcase.args = {
  open: false,
  payout: mockedData.payout.pendingApproval,
}
