import { Meta, StoryFn } from '@storybook/react'

import { apiUrls } from '../../../utils/constants'
import CurrentAccountTable from './CurrentAccountTable'

const meta: Meta<typeof CurrentAccountTable> = {
  title: 'Functional/Current Account Table',
  component: CurrentAccountTable,
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
} as Meta<typeof CurrentAccountTable>

const Template: StoryFn<typeof CurrentAccountTable> = (args) => <CurrentAccountTable {...args} />

export const Showcase = Template.bind({})
Showcase.args = {
  token: 'eyJhbGciOiJIUz...',
  accountId: 'bf9e1828-c6a1-4cc5-a012-...',
  apiUrl: apiUrls.dev,
}

export default meta
