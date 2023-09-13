import { Meta, StoryFn } from '@storybook/react'

import { apiUrls } from '../../../utils/constants'
import PayoutDashboard from './PayoutDashboard'

const meta: Meta<typeof PayoutDashboard> = {
  title: 'Functional/PayoutDashboard',
  component: PayoutDashboard,
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
    merchantId: {
      control: {
        type: 'text',
      },
    },
    onUnauthorized: {
      action: 'onUnauthorized',
    },
  },
} as Meta<typeof PayoutDashboard>

const Template: StoryFn<typeof PayoutDashboard> = (args) => <PayoutDashboard {...args} />

export const Showcase = Template.bind({})

Showcase.args = {
  token: 'Enter user token...',
  apiUrl: apiUrls.dev,
  merchantId: 'Enter merchant id...',
}

Showcase.parameters = {
  layout: 'fullscreen',
}

export default meta
