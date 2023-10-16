import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import CaptureModal, { CaptureModalProps } from './CaptureModal'

const meta: Meta<typeof CaptureModal> = {
  title: 'UI/Capture Modal',
  component: CaptureModal,
  argTypes: {
    onCapture: { control: { type: 'action' } },
    onDismiss: { control: { type: 'action' } },
  },
}

const Template: StoryFn<CaptureModalProps> = (args) => {
  return <CaptureModal {...args} />
}

export const Showcase = Template.bind({})

Showcase.args = {
  onDismiss: action('Dismissed'),
}

export default meta
