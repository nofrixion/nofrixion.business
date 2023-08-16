import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import { mockAccounts } from '../../../../utils/mockedData'
import CurrentAcountsList from './CurrentAcountsList'

export default {
  title: 'UI/Account/CurrentAcountsList',
  component: CurrentAcountsList,
  argTypes: {
    accounts: {
      control: {
        type: 'array',
      },
    },
    onCreatePaymentAccount: { action: 'onCreatePaymentAccount' },
    onAccountClick: { action: 'onAccountClick' },
  },
} as Meta<typeof CurrentAcountsList>

const Template: StoryFn<typeof CurrentAcountsList> = (args) => <CurrentAcountsList {...args} />

export const Default = Template.bind({})
Default.args = {
  onCreatePaymentAccount: action('onCreatePaymentAccount'),
  onAccountClick: action('onAccountClick'),
  accounts: mockAccounts,
}
