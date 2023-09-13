import { Meta, StoryFn } from '@storybook/react'

import { mockAccounts } from '../../../utils/mockedData'
import AccountCard from './AccountCard'

export default {
  title: 'UI/Account/Account',
} as Meta<typeof AccountCard>

const Template: StoryFn<typeof AccountCard> = (args) => <AccountCard {...args} />

export const Default = Template.bind({})
Default.args = {
  account: mockAccounts[0],
}
