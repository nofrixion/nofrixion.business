import { Meta, StoryFn } from '@storybook/react'

import DisplayAndCopy from './DisplayAndCopy'

export default {
  title: 'Atoms/DisplayAndCopy',
  component: DisplayAndCopy,
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
  },
} as Meta<typeof DisplayAndCopy>

const Template: StoryFn<typeof DisplayAndCopy> = (args) => <DisplayAndCopy {...args} />

export const Iban = Template.bind({})
Iban.args = {
  name: 'IBAN',
  value: 'IE11MODR99035501927019',
}

export const SortCode = Template.bind({})
SortCode.args = {
  name: 'SC',
  value: '040392',
}

export const AccountNumber = Template.bind({})
AccountNumber.args = {
  name: 'AN',
  value: '00937363',
}
