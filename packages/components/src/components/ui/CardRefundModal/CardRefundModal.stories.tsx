import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import CardRefundModal, { CardRefundModalProps } from './CardRefundModal'

const meta: Meta<typeof CardRefundModal> = {
  title: 'UI/Card Refund Modal',
  component: CardRefundModal,
  argTypes: {
    onRefund: { control: { type: 'action' } },
    onDismiss: { control: { type: 'action' } },
  },
}

const Template: StoryFn<CardRefundModalProps> = (args) => {
  return <CardRefundModal {...args} />
}

export const Showcase = Template.bind({})

Showcase.args = {
  onDismiss: action('Dismissed'),
}

export default meta
