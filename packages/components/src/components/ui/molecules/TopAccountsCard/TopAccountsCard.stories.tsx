import { Currency } from '@nofrixion/moneymoov'
import { Meta, StoryFn } from '@storybook/react'
import { useEffect, useState } from 'react'

import { LocalAccountWithTransactionMetrics } from '../../../../types/LocalTypes'
import mockedData from '../../../../utils/mockedData'
import { TopAccountsCard } from './TopAccountsCard'

export default {
  title: 'Molecules/Cards/TopAccountsCard',
  component: TopAccountsCard,
} as Meta<typeof TopAccountsCard>

const localAccountWithTransactionMetrics: LocalAccountWithTransactionMetrics[] =
  mockedData.accountsWithTransactionMetrics

const Template: StoryFn<typeof TopAccountsCard> = () => {
  const [currency, setCurrency] = useState<Currency>(Currency.EUR)
  const [accounts, setAccounts] = useState<LocalAccountWithTransactionMetrics[]>(
    localAccountWithTransactionMetrics.filter((account) => account.currency === Currency.EUR),
  )

  useEffect(() => {
    setAccounts(
      localAccountWithTransactionMetrics.filter((account) => account.currency === currency),
    )
  }, [currency])
  return <TopAccountsCard currency={currency} onCurrencyChange={setCurrency} accounts={accounts} />
}

const SingleCurrencyTemplate: StoryFn<typeof TopAccountsCard> = () => {
  return (
    <TopAccountsCard
      currency={Currency.EUR}
      accounts={localAccountWithTransactionMetrics.filter(
        (account) => account.currency === Currency.EUR,
      )}
      accountMetrics={[]}
    />
  )
}

const PlainTemplate: StoryFn<typeof TopAccountsCard> = (args) => <TopAccountsCard {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithLoading = PlainTemplate.bind({})
WithLoading.args = {
  accounts: localAccountWithTransactionMetrics.filter(
    (account) => account.currency === Currency.EUR,
  ),
  isLoading: true,
}

export const NoTransactions = PlainTemplate.bind({})
NoTransactions.args = {
  accounts: [],
}

export const SingleCurrency = SingleCurrencyTemplate.bind({})
SingleCurrency.args = {}
