import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import { users } from '../../../../utils/mockedData'
import { UserDashboard } from './UserDashboard'

export default {
  title: 'Pages/User Dashboard',
  component: UserDashboard,
  args: {
    onSearch: action('onSearch'),
    onDateChange: action('onDateChange'),
    onPageChange: action('onPageChange'),
    onSort: action('onSort'),
    selectedPayouts: [],
    tags: [],
  },
} as Meta<typeof UserDashboard>

const Template: StoryFn<typeof UserDashboard> = (args) => {
  return (
    <div className="px-14 py-10 bg-main-grey">
      <UserDashboard {...args} />
    </div>
  )
}

export const Showcase = Template.bind({})
Showcase.args = {
  users: users,
  pagination: {
    pageSize: 10,
    totalSize: 100,
  },
}
