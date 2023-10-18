import { Meta, StoryFn } from '@storybook/react'

import { LocalTransaction } from '../../../../types/LocalTypes'
import { mockedTransactions } from '../../../../utils/mockedData'
import LatestTransactionsCard from './LatestTransactionsCard'

export default {
  title: 'Molecules/Cards/LatestTransactionsCard',
  component: LatestTransactionsCard,
} as Meta<typeof LatestTransactionsCard>

const localTransactions: LocalTransaction[] = mockedTransactions

const Template: StoryFn<typeof LatestTransactionsCard> = (args) => (
  <LatestTransactionsCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  transactions: localTransactions,
}

export const WithLoading = Template.bind({})
WithLoading.args = {
  transactions: localTransactions,
  isLoading: true,
}

export const NoTransactions = Template.bind({})
NoTransactions.args = {
  transactions: [],
}
