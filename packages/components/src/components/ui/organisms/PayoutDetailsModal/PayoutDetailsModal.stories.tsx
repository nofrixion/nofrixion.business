import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import mockedData from '../../../../utils/mockedData'
import PaymoutDetailsModal from './PayoutDetailsModal'

export default {
  title: 'UI/PayoutDetailsModal',
  component: PaymoutDetailsModal,
  argTypes: {
    onDismiss: {
      action: 'Dismiss',
    },
  },
} as Meta<typeof PaymoutDetailsModal>

const Template: StoryFn<typeof PaymoutDetailsModal> = (args) => {
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
          I am a payout row. Click me.
        </button>
      </div>
      <PaymoutDetailsModal {...args} open={isOpen} onDismiss={onClose}></PaymoutDetailsModal>
    </>
  )
}

export const Pending = Template.bind({})
Pending.args = {
  open: false,
  payout: mockedData.payout.pendingApproval,
}

export const Queued = Template.bind({})
Queued.args = {
  open: false,
  payout: mockedData.payout.queued,
}

export const Processed = Template.bind({})
Processed.args = {
  open: false,
  payout: mockedData.payout.processed,
}

export const Failed = Template.bind({})
Failed.args = {
  open: false,
  payout: mockedData.payout.failed,
}
