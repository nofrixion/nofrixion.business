import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import mockedData from '../../../../utils/mockedData'
import SavePayoutModal, { SavePayoutModalProps } from './SavePayoutModal'

const meta: Meta<typeof SavePayoutModal> = {
  title: 'UI/Create Payout Modal',
  component: SavePayoutModal,
  argTypes: {
    onSavePayout: { control: { type: 'action' } },
    onDismiss: { control: { type: 'action' } },
  },
}

const Template: StoryFn<SavePayoutModalProps> = (args) => {
  return <SavePayoutModal {...args} />
}

export const Showcase = Template.bind({})

Showcase.args = {
  onDismiss: action('Dismissed'),
  accounts: mockedData.accounts,
  beneficiaries: mockedData.beneficiaries,
  isOpen: true,
}

export const GBPInput = Template.bind({})

GBPInput.args = {
  onDismiss: action('Dismissed'),
  accounts: mockedData.accounts,
  beneficiaries: mockedData.beneficiaries,
  isOpen: true,
}

export default meta
