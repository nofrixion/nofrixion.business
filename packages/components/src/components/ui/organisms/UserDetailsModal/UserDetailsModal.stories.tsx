import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import mockedData from '../../../../utils/mockedData'
import UserDetailsModal from './UserDetailsModal'

export default {
  title: 'UI/UserDetailsModal',
  component: UserDetailsModal,
  argTypes: {
    onDismiss: {
      action: 'Dismiss',
    },
  },
} as Meta<typeof UserDetailsModal>

const Template: StoryFn<typeof UserDetailsModal> = (args) => {
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
      <UserDetailsModal {...args} open={isOpen} onDismiss={onClose}></UserDetailsModal>
    </>
  )
}

export const Active = Template.bind({})
Active.args = {
  open: false,
  user: mockedData.user.active[0],
}

export const Invited = Template.bind({})
Invited.args = {
  open: false,
  user: mockedData.user.invited[0],
}

export const RolePending = Template.bind({})
RolePending.args = {
  open: false,
  user: mockedData.user.rolePending[0],
}
