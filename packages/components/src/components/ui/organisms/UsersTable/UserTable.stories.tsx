import { Meta, StoryFn } from '@storybook/react'

import { users } from '../../../../utils/mockedData'
import UserTable from './UserTable'

export default {
  title: 'Organisms/User Table',
  component: UserTable,
  args: {},
  argTypes: {
    transactions: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof UserTable>

const Template: StoryFn<typeof UserTable> = (args) => <UserTable {...args} />

export const Showcase = Template.bind({})
Showcase.args = {
  users: users,
  pagination: {
    pageSize: 10,
    totalSize: 100,
  },
}

export const Empty = Template.bind({})
Empty.args = {
  users: [],
  pagination: {
    pageSize: 0,
    totalSize: 0,
  },
}
