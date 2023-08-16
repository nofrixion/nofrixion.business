import { Meta, StoryFn } from '@storybook/react'

import { Status } from './Status'

export default {
  title: 'Molecules/Status',
  component: Status,
  args: {
    size: 'small',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        // options: ['paid', 'partial', 'unpaid'],
      },
    },
  },
} as Meta<typeof Status>

const Template: StoryFn<typeof Status> = (args) => <Status {...args} />

export const Paid = Template.bind({})
Paid.args = {
  variant: 'paid',
}
