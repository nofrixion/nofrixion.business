import { Meta, StoryFn } from '@storybook/react'

import { users } from '../../../../utils/mockedData'
import UsersTable from './UsersTable'

export default {
  title: 'Organisms/Users Table',
  component: UsersTable,
  args: {},
  argTypes: {
    transactions: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof UsersTable>

const Template: StoryFn<typeof UsersTable> = (args) => <UsersTable {...args} />

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
