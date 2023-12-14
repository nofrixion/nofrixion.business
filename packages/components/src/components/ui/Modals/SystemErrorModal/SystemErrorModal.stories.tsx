import { Meta, StoryFn } from '@storybook/react'

import SystemErrorModal from './SystemErrorModal'

export default {
  title: 'UI/System Error Modal',
  component: SystemErrorModal,
} as Meta<typeof SystemErrorModal>

const Template: StoryFn<typeof SystemErrorModal> = (args: any) => <SystemErrorModal {...args} />

export const Showcase = Template.bind({})
Showcase.args = {
  open: true,
  title: "The payout couldn't be authorised",
  message:
    'It appears that the payout details have changed during the authorisation process. Please review the payout information and try again.',
}
