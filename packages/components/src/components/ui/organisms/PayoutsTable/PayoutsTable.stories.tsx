import { Meta, StoryFn } from '@storybook/react'

import { mockPayouts } from '../../../../utils/mockedData'
import { PayoutsTable } from './PayoutsTable'

export default {
  title: 'Organisms/Payouts Table',
  component: PayoutsTable,
  args: {},
  argTypes: {
    transactions: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof PayoutsTable>

const Template: StoryFn<typeof PayoutsTable> = (args) => <PayoutsTable {...args} />

export const Showcase = Template.bind({})
Showcase.args = {
  payouts: mockPayouts,
  pagination: {
    pageSize: 10,
    totalSize: 100,
  },
}

export const Empty = Template.bind({})
Empty.args = {
  payouts: [],
  pagination: {
    pageSize: 0,
    totalSize: 0,
  },
}
