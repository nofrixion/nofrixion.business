import { Meta, StoryFn } from '@storybook/react'

import mockedData from '../../../../utils/mockedData'
import RevokeConnectionModal from './RevokeConnectionModal'

export default {
  title: 'UI/Revoke Connection Modal',
  component: RevokeConnectionModal,
  argTypes: {
    onApply: {
      action: 'Revoked',
    },
  },
} as Meta<typeof RevokeConnectionModal>

const Template: StoryFn<typeof RevokeConnectionModal> = (args) => (
  <RevokeConnectionModal {...args} />
)

export const Showcase = Template.bind({})
Showcase.args = {
  account: mockedData.account, // TODO: Add account
}
