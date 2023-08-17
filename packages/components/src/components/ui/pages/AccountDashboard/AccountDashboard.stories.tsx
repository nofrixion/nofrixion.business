import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import { mockAccounts, mockedTransactions } from '../../../../utils/mockedData'
import { AccountDashboard } from './AccountDashboard'

export default {
  title: 'Pages/Account Dashboard',
  component: AccountDashboard,
  args: {
    onSearch: action('onSearch'),
    onDateChange: action('onDateChange'),
    onPageChange: action('onPageChange'),
    onSort: action('onSort'),
  },
} as Meta<typeof AccountDashboard>

const Template: StoryFn<typeof AccountDashboard> = (args) => {
  return (
    <div className="px-14 py-10 bg-main-grey">
      <AccountDashboard {...args} />
    </div>
  )
}

export const Showcase = Template.bind({})
Showcase.args = {
  transactions: mockedTransactions,
  account: mockAccounts[0],
  pagination: {
    pageSize: 10,
    totalSize: 100,
  },
}
