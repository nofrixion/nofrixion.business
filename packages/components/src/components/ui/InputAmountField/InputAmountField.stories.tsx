import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import InputAmountField, { InputAmountFieldProps } from './InputAmountField'

const meta: Meta<typeof InputAmountField> = {
  title: 'UI/InputAmountField',
  component: InputAmountField,
  argTypes: {
    value: { control: { type: 'text' } },
    currency: {
      options: ['EUR', 'GBP'],
      control: { type: 'select' },
    },
  },
}

const Template: StoryFn<InputAmountFieldProps> = (args) => {
  const [localValue, setValue] = useState<string>(args.value?.toString() || '')

  const onChangeInput = (value: string) => {
    setValue(value)
  }

  return <InputAmountField {...args} value={localValue} onChange={onChangeInput} />
}

export const Showcase = Template.bind({})

Showcase.args = {
  value: '1222.99',
  currency: 'EUR',
  onCurrencyChange: action('Currency changed'),
}

export const GBPInput = Template.bind({})

GBPInput.args = {
  value: '27.50',
  currency: 'GBP',
  onCurrencyChange: action('Currency changed'),
}

export default meta
