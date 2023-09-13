import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import CurrentAccountsHeader from './CurrentAccountsHeader'

export default {
  title: 'UI/Account/CurrentAccountsHeader',
  component: CurrentAccountsHeader,
  argTypes: {
    onCreatePaymentAccount: { action: 'onCreatePaymentAccount' },
  },
} as Meta<typeof CurrentAccountsHeader>

const Template: StoryFn<typeof CurrentAccountsHeader> = (args) => (
  <CurrentAccountsHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onCreatePaymentAccount: action('onCreatePaymentAccount'),
}
