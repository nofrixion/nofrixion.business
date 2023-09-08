import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import InputTextField, { InputNumericTextFieldProps } from './InputNumericTextField'

export default {
  title: 'UI/Input Numeric Text Field',
  component: InputTextField,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta<typeof InputTextField>

const Template: StoryFn<InputNumericTextFieldProps> = (args) => {
  const [localValue, setValue] = useState<string>(args.value?.toString() || '')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return <InputTextField {...args} value={localValue} onChange={onChangeInput} />
}

export const Showcase = Template.bind({})

Showcase.args = {
  label: 'Product or service',
  value: 'Some Product or service',
  required: false,
}

export const FirstNameOptional = Template.bind({})

FirstNameOptional.args = {
  label: 'First name',
  value: 'Jimbo',
}