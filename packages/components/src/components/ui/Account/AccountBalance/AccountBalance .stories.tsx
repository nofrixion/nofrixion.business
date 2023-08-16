import { Currency } from '@nofrixion/moneymoov'
import { Meta, StoryFn } from '@storybook/react'

import AccountBalance from './AccountBalance'

export default {
    title: 'UI/Account/AccountBalance ',
    component: AccountBalance,
} as Meta<typeof AccountBalance>

const Template: StoryFn<typeof AccountBalance> = (args) => <AccountBalance  {...args} />

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