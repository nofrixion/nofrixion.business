import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import EditableContent from './EditableContent'

export default {
  title: 'Molecules/Editable Content',
  component: EditableContent,
  argTypes: {},
} as Meta<typeof EditableContent>

const Template: StoryFn<typeof EditableContent> = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue)

  const handleOnValueChange = (value: string) => {
    setValue(value)
  }

  return <EditableContent initialValue={value} onChange={handleOnValueChange} />
}

export const Showcase = Template.bind({})
Showcase.args = {
  initialValue: "I'm editable",
}
