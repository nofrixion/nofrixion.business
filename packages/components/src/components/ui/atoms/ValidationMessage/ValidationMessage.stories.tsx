import { Meta, StoryFn } from '@storybook/react'

import { ValidationMessage } from './ValidationMessage'

export default {
  title: 'Atoms/ValidationMessage',
  component: ValidationMessage,
} as Meta<typeof ValidationMessage>

const Template: StoryFn<typeof ValidationMessage> = (args) => <ValidationMessage {...args} />

export const Error = Template.bind({})
Error.args = {
  message: 'This is an error message',
  variant: 'error',
}
