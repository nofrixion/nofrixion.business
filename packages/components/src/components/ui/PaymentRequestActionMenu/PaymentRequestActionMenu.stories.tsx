import { Meta, StoryFn } from '@storybook/react'

import PaymentRequestActionMenu from './PaymentRequestActionMenu'

export default {
  title: 'UI/Payment Request Row Action Menu',
  component: PaymentRequestActionMenu,
  argTypes: {
    onDuplicate: {
      action: 'Duplicate selected',
    },
    onCopyLink: {
      action: 'Copy selected',
    },
    onDelete: {
      action: 'Delete selected',
    },
  },
} as Meta<typeof PaymentRequestActionMenu>

const Template: StoryFn<typeof PaymentRequestActionMenu> = (args) => (
  <PaymentRequestActionMenu {...args} />
)

export const ActionMenuTemplate = Template.bind({})
ActionMenuTemplate.args = {}
