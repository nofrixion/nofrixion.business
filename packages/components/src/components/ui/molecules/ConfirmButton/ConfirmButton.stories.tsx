import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import ConfirmButton from './ConfirmButton'

export default {
  title: 'Molecules/Confirm Button',
  component: ConfirmButton,
  argTypes: {
    primaryText: { control: 'text' },
    confirmText: { control: 'text' },
    onConfirm: { action: 'onConfirm' },
  },
} as Meta

const Template: StoryFn<typeof ConfirmButton> = (args) => <ConfirmButton {...args} />

export const Default = Template.bind({})
Default.args = {
  primaryText: 'Cancel authorisation',
  confirmText: 'Click again to confirm',
  onConfirm: action('onConfirm'),
}
