import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import InviteUserModal, { InviteUserModalProps } from './InviteUserModal'

const meta: Meta<typeof InviteUserModal> = {
  title: 'UI/Invite User Modal',
  component: InviteUserModal,
  argTypes: {
    onInvite: { control: { type: 'action' } },
  },
}

const Template: StoryFn<InviteUserModalProps> = (args) => {
  return <InviteUserModal {...args} />
}

export const Showcase = Template.bind({})

Showcase.args = {
  onDismiss: action('Dismissed'),
  merchantID: 'F1D1E2D3-4C5B-6A7D-8E9F-0',
  isOpen: true,
}

export default meta
