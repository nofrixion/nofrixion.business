import { Meta, StoryFn } from '@storybook/react'

import { apiUrls } from '../../../utils/constants'
import AccountDashboard from './AccountDashboard'

const meta: Meta<typeof AccountDashboard> = {
  title: 'Functional/Current Account Table',
  component: AccountDashboard,
  argTypes: {
    token: {
      control: {
        type: 'text',
      },
    },
    apiUrl: {
      control: { type: 'select' },
      options: Object.values(apiUrls),
    },
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
  token: 'eyJhbGciOiJIUz...',
  accountId: 'bf9e1828-c6a1-4cc5-a012-...',
  apiUrl: apiUrls.dev,
}

export default meta
