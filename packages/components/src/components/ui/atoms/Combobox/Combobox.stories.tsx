import { Meta, StoryFn } from '@storybook/react'

import Example from './Combobox'

export default {
  title: 'Atoms/Comobobox',
  component: Example,
  argTypes: {},
} as Meta<typeof Example>

const Template: StoryFn<{
  subText?: string
}> = () => {
  return <Example />
}

export const Showcase = Template.bind({})
