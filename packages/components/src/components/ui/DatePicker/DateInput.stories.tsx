import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import DateInput, { DateInputProps } from './DateInput'

const meta: Meta<typeof DateInput> = {
  title: 'UI/Date Input',
  component: DateInput,
  argTypes: {
    value: { control: { type: 'text' } },
  },
}

const Template: StoryFn<DateInputProps> = (args) => {
  const [localValue, setValue] = useState<string>(args.value?.toString() || '')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return <DateInput {...args} value={localValue} onChange={onChangeInput} />
}

export const Showcase = Template.bind({})

Showcase.args = {
  value: '28/10/1968',
}

export default meta
