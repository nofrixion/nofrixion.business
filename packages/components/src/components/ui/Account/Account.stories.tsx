import { AccountIdentifierType, Currency } from '@nofrixion/moneymoov'
import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import Account from './Account'

export default {
  title: 'UI/Account/Account',
  component: Account,
  argTypes: {
    onAccountClick: { action: 'onAccountClick' },
  },
} as Meta<typeof Account>

const Template: StoryFn<typeof Account> = (args) => {
  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      <Account {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  onAccountClick: action('onAccountClick'),
  account: {
    id: 'BE270F6F-04F1-4DE9-836C-035C5B7EC409',
    merchantID: '8A45B3B8-7428-4BA2-8228-37204B43AC0E',
    accountNumber: '',
    accountName: 'NoFrixion EUR account',
    availableBalance: 100000.0,
    balance: 120000.0,
    currency: Currency.EUR,
    displayName: 'NoFrixion EUR account',
    iban: 'GB93MOCK00000003290619',
    sortCode: '',
    summary: '',
    identifier: {
      type: AccountIdentifierType.IBAN,
      currency: Currency.EUR,
      bic: 'MOCKGB21',
      iban: 'GB93MOCK00000003290619',
      accountNumber: '',
      sortCode: '',
    },
    isDefault: true,
  },
}
