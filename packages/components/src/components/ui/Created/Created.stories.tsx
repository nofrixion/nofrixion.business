import { Meta, StoryFn } from '@storybook/react'

import Created from './Created'

export default {
  title: 'UI/Created',
  component: Created,
  argTypes: {
    createdAt: { control: 'text' },
  },
} as Meta<typeof Created>

const Template: StoryFn<typeof Created> = (args) => <Created {...args} />

export const Primary = Template.bind({})
Primary.args = {
  createdAt: new Date('2023-01-01T00:00:00.000Z'),
  createdByUser: {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'email@email.com',
  },
}
