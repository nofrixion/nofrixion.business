import { Meta, StoryFn } from '@storybook/react'

import InputAutoCompleteField from './InputAutoCompleteField'

const people: string[] = [
  'Wade Cooper',
  'Arlene Mccoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
]
export default {
  title: 'Atoms/InputAutoCompleteField',
  component: InputAutoCompleteField,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta<typeof InputAutoCompleteField>

const Template: StoryFn = () => {
  return <InputAutoCompleteField autoSuggestions={people} />
}

export const Showcase = Template.bind({})
