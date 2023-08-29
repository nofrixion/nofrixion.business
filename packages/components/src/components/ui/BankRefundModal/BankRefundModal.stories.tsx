import { Currency } from '@nofrixion/moneymoov'
import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import mockedData from '../../../utils/mockedData'
import BankRefundModal, { BankRefundModalProps } from './BankRefundModal'

const meta: Meta<typeof BankRefundModal> = {
  title: 'UI/Bank Refund Modal',
  component: BankRefundModal,
  argTypes: {
    onRefund: { control: { type: 'action' } },
    onDismiss: { control: { type: 'action' } },
    initialAmount: { control: { type: 'text' } },
    currency: { control: { type: 'select', options: [Currency.EUR, Currency.GBP] } },
    maxRefundableAmount: { control: { type: 'number' } },
    contactName: { control: { type: 'text' } },
  },
}

const Template: StoryFn<BankRefundModalProps> = (args) => {
  return <BankRefundModal {...args} />
}

export const Showcase = Template.bind({})

Showcase.args = {
  initialAmount: '1222.99',
  currency: Currency.EUR,
  onDismiss: action('Dismissed'),
  maxRefundableAmount: 1222.99,
  contactName: 'John Doe',
  accounts: mockedData.accounts,
  defaultSourceAccount: mockedData.accounts[0],
  counterParty: mockedData.counterparty,
}

export const GBPInput = Template.bind({})

GBPInput.args = {
  initialAmount: '27.5',
  currency: Currency.GBP,
  onDismiss: action('Dismissed'),
  maxRefundableAmount: 27.5,
}

export default meta
