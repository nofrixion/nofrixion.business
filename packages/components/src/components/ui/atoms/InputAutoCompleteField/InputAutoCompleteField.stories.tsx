import { Meta, StoryFn } from '@storybook/react'

import InputAutoCompleteField from './InputAutoCompleteField'

export default {
  title: 'Atoms/InputAutoCompleteField',
  component: InputAutoCompleteField,
  argTypes: {},
} as Meta<typeof InputAutoCompleteField>

const Template: StoryFn = () => {
  return <InputAutoCompleteField label="Autofill" />
}

export const Showcase = Template.bind({})
