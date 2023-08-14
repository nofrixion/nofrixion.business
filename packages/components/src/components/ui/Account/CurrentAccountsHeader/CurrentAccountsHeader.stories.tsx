import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import CurrentAccountsHeader from './CurrentAccountsHeader '

export default {
  title: 'UI/Account/CurrentAccountsHeader',
  component: CurrentAccountsHeader,
  argTypes: {
    onCreatePaymentAccount: { action: 'onCreatePaymentAccount' },
  },
} as Meta<typeof CurrentAccountsHeader>

const Template: StoryFn<typeof CurrentAccountsHeader> = (args) => {
  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      <CurrentAccountsHeader {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  onCreatePaymentAccount: action('onCreatePaymentAccount'),
}
