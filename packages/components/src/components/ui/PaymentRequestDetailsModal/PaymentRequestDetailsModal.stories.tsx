import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import mockedData from '../../../utils/mockedData'
import PaymentRequestDetailsModal from './PaymentRequestDetailsModal'

export default {
  title: 'UI/PaymentRequestDetailsModal',
  component: PaymentRequestDetailsModal,
  argTypes: {
    onDismiss: {
      action: 'Dismiss',
    },
    onTagAdded: { action: 'tag added' },
    onTagCreated: { action: 'tag created' },
    onTagRemoved: { action: 'tag deleted' },
  },
} as Meta<typeof PaymentRequestDetailsModal>

const Template: StoryFn<typeof PaymentRequestDetailsModal> = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          I am a payment request row. Click me.
        </button>
      </div>
      <PaymentRequestDetailsModal
        {...args}
        open={isOpen}
        onDismiss={onClose}
      ></PaymentRequestDetailsModal>
    </>
  )
}

export const Showcase = Template.bind({})
Showcase.args = {
  open: false,
  paymentRequest: mockedData.paymentRequest.regular,
  merchantTags: mockedData.merchantTags,
  hostedPaymentLink:
    'https://api-dev.nofrixion.com/nextgen/pay/c4db21c3-17a4-4e3a-8b19-87b4e9c07766',
}
