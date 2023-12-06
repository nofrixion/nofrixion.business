import { Meta, StoryFn } from '@storybook/react'

import InlineError from './InlineError'

export default {
  title: 'UI/Inline Error',
  component: InlineError,
} as Meta<typeof InlineError>

const Template: StoryFn<typeof InlineError> = (args: any) => <InlineError {...args} />

export const Showcase = Template.bind({})
Showcase.args = {
  title: "The payout couldn't be authorised",
  messages: [
    'It appears that the payout details have changed during the authorisation process. Please review the payout information and try again.',
  ],
}
