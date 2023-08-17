import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import { mockAccounts } from '../../../utils/mockedData'
import AccountCard from './AccountCard'

export default {
  title: 'UI/Account/Account',
  component: AccountCard,
  argTypes: {
    onAccountClick: { action: 'onAccountClick' },
  },
} as Meta<typeof AccountCard>

const Template: StoryFn<typeof AccountCard> = (args) => <AccountCard {...args} />

export const Default = Template.bind({})
Default.args = {
  onAccountClick: action('onAccountClick'),
  account: mockAccounts[0],
}
