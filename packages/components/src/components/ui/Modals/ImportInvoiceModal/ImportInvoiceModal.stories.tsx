import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import ImportInvoiceModal from './ImportInvoiceModal'

export default {
  title: 'UI/Import Invoice Modal',
  component: ImportInvoiceModal,
  argTypes: {
    onConfirm: { action: 'onConfirm' },
    onDefaultsChanged: { action: 'Defaults changed' },
    banks: {
      control: {
        type: 'array',
      },
    },
  },
} as Meta<typeof ImportInvoiceModal>

const Template: StoryFn<typeof ImportInvoiceModal> = (args) => {
  const [isOpen, setIsOpen] = useState(true)

  const openScreen = () => {
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openScreen}
          className="rounded-md bg-black bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open Import Invoice Modal
        </button>
      </div>
      <ImportInvoiceModal {...args} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export const Showcase = Template.bind({})
Showcase.args = {}
