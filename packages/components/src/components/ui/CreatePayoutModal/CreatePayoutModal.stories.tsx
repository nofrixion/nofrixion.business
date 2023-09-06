import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import mockedData from '../../../utils/mockedData'
import CreatePayoutModal, { CreatePayoutModalProps } from './CreatePayoutModal'

const meta: Meta<typeof CreatePayoutModal> = {
  title: 'UI/Create Payout Modal',
  component: CreatePayoutModal,
  argTypes: {
    onCreatePayout: { control: { type: 'action' } },
    onDismiss: { control: { type: 'action' } },
  },
}

const Template: StoryFn<CreatePayoutModalProps> = (args) => {
  console.log(mockedData.beneficiaries)
  return <CreatePayoutModal {...args} />
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
