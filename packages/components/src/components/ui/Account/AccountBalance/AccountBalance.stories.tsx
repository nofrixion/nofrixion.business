import { Currency } from '@nofrixion/clients'
import { Meta, StoryFn } from '@storybook/react'

import AccountBalance from './AccountBalance'

export default {
  title: 'UI/Account/AccountBalance ',
  component: AccountBalance,
} as Meta<typeof AccountBalance>

const Template: StoryFn<typeof AccountBalance> = (args) => <AccountBalance {...args} />

export const AccountEUR = Template.bind({})
AccountEUR.args = {
  currency: Currency.EUR,
  balance: 41234.56,
  availableBalance: 567.45,
}

export const AccountGBP = Template.bind({})
AccountGBP.args = {
  currency: Currency.GBP,
  balance: 415234.56,
  availableBalance: 222567.45,
}

export const AccountWithStyles = Template.bind({})
AccountWithStyles.args = {
  currency: Currency.GBP,
  balance: 41234.56,
  availableBalance: 222567.45,
  className: 'm-10 p-2 text-left bg-slate-200',
}
