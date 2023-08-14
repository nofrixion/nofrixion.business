import { AccountIdentifierType, Currency } from '@nofrixion/moneymoov'
import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import CurrentAcountsList from './CurrentAcountsList'

export default {
  title: 'UI/Account/CurrentAcountsList',
  component: CurrentAcountsList,
  argTypes: {
    accounts: {
      control: {
        type: 'array',
      },
    },
    onCreatePaymentAccount: { action: 'onCreatePaymentAccount' },
    onAccountClick: { action: 'onAccountClick' },
  },
} as Meta<typeof CurrentAcountsList>

const Template: StoryFn<typeof CurrentAcountsList> = (args) => {
  return (
    <div className="flex-row mb-8 md:mb-[68px] bg-slate-900">
      <CurrentAcountsList {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  onCreatePaymentAccount: action('onCreatePaymentAccount'),
  onAccountClick: action('onAccountClick'),
  accounts: [
    {
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
    {
      id: 'C317F3DF-51F5-4EF6-8DDA-41444B90B2D5',
      merchantID: '8A45B3B8-7428-4BA2-8228-37204B43AC0E',
      accountName: 'NoFrixion GBP account',
      accountNumber: '12345678',
      availableBalance: 50022.6,
      balance: 50022.6,
      currency: Currency.GBP,
      displayName: 'NoFrixion GBP account',
      iban: '',
      sortCode: '123456',
      summary: '',
      identifier: {
        type: AccountIdentifierType.SCAN,
        currency: Currency.GBP,
        bic: 'MOCKGB21',
        iban: '',
        accountNumber: '12345678',
        sortCode: '123456',
      },
      isDefault: false,
    },
    {
      id: 'C317F3DF-51F5-4EF6-8DDA-41444B90B2D5',
      merchantID: '8A45B3B8-7428-4BA2-8228-37204B43AC0E',
      accountName: '',
      accountNumber: '12345678',
      availableBalance: 50022.6,
      balance: 50022.6,
      currency: Currency.GBP,
      displayName: 'NoFrixion GBP account display',
      iban: '',
      sortCode: '123456',
      summary: '',
      identifier: {
        type: AccountIdentifierType.SCAN,
        currency: Currency.GBP,
        bic: 'MOCKGB21',
        iban: '',
        accountNumber: '12345678',
        sortCode: '123456',
      },
      isDefault: false,
    },
  ],
}
