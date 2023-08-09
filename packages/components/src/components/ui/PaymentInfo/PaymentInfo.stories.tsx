import { Meta,StoryFn } from '@storybook/react'

import mockedData from '../../../utils/mockedData'
import PaymentInfo from './PaymentInfo'

export default {
  title: 'UI/PaymentInfo',
  component: PaymentInfo,
} as Meta<typeof PaymentInfo>

const Template: StoryFn<typeof PaymentInfo> = (args) => <PaymentInfo {...args} />

export const Showcase = Template.bind({})
Showcase.args = {
  ...mockedData.paymentRequest.regular,
}

export const NoShippingAddress = Template.bind({})
NoShippingAddress.args = {
  ...mockedData.paymentRequest.noShippingAddress,
}
