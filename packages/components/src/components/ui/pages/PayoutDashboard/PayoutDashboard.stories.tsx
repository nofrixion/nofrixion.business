import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import { mockPayouts } from '../../../../utils/mockedData'
import { PayoutDashboard } from './PayoutDashboard'

export default {
  title: 'Pages/Payout Dashboard',
  component: PayoutDashboard,
  args: {
    onSearch: action('onSearch'),
    onDateChange: action('onDateChange'),
    onPageChange: action('onPageChange'),
    onSort: action('onSort'),
  },
} as Meta<typeof PayoutDashboard>

const Template: StoryFn<typeof PayoutDashboard> = (args) => {
  return (
    <div className="px-14 py-10 bg-main-grey">
      <PayoutDashboard {...args} />
    </div>
  )
}

export const Showcase = Template.bind({})
Showcase.args = {
  payouts: mockPayouts,
  pagination: {
    pageSize: 10,
    totalSize: 100,
  },
}
