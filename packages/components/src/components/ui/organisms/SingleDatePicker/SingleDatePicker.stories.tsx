import { Meta, StoryFn } from '@storybook/react'

import { SingleDatePicker } from './SingleDatePicker'

export default {
  title: 'Organisms/Single Date Picker',
  component: SingleDatePicker,
  argTypes: {
    onDateChange: {
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
  value: new Date(),
}
