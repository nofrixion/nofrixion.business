import { Meta, StoryFn } from '@storybook/react'

import { apiUrls } from '../../../utils/constants'
import PaymentRequestDashboard from './PaymentRequestDashboard'

const meta: Meta<typeof PaymentRequestDashboard> = {
  title: 'Functional/PaymentRequestDashboard',
  component: PaymentRequestDashboard,
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
} as Meta<typeof PaymentRequestDashboard>

const Template: StoryFn<typeof PaymentRequestDashboard> = (args) => (
  <PaymentRequestDashboard {...args} />
)

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
