import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import DateRangePicker from './DateRangePicker'

export default {
  title: 'UI/DateRangePicker',
  component: DateRangePicker,
} as Meta<typeof DateRangePicker>

const Template: StoryFn<typeof DateRangePicker> = (args) => <DateRangePicker {...args} />

export const Showcase = Template.bind({})

Showcase.args = {
  onDateChange: action('Date Changed'),
}
