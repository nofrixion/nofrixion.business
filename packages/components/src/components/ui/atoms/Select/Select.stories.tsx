import { Meta, StoryFn } from '@storybook/react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'

export default {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    subText: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
  },
} as Meta<
  typeof Select & {
    subText?: string
  }
>

const Template: StoryFn<{
  subText?: string
}> = ({ subText, ...args }) => {
  return (
    <Select defaultValue="light" {...args}>
      <SelectTrigger subText={subText} className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const Showcase = Template.bind({})
Showcase.args = {
  subText: 'Select theme',
}
