import { Meta, StoryFn } from '@storybook/react'

import { apiUrls } from '../../../utils/constants'
import CurrentAccountsTable from './CurrentAccountsTable'

const meta: Meta<typeof CurrentAccountsTable> = {
  title: 'Functional/Current Accounts Table',
  component: CurrentAccountsTable,
  argTypes: {
    token: {
      control: {
        type: 'text',
      },
    },
    apiUrl: {
      control: { type: 'select' },
      options: Object.values(apiUrls),
    },
  },
} as Meta<typeof CurrentAccountsTable>

const Template: StoryFn<typeof CurrentAccountsTable> = (args) => <CurrentAccountsTable {...args} />

export const Showcase = Template.bind({})
Showcase.args = {
  token: 'eyJhbGciOiJIUz...',
  accountId: 'bf9e1828-c6a1-4cc5-a012-...',
  apiUrl: apiUrls.dev,
}

export default meta
