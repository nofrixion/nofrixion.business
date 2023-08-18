import { action } from '@storybook/addon-actions'
import { Meta, StoryFn } from '@storybook/react'

import { apiUrls } from '../../../utils/constants'
import CurrentAcountsList from './CurrentAccountsList'

const meta: Meta<typeof CurrentAcountsList> = {
  title: 'Functional/Current Acounts List',
  component: CurrentAcountsList,
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
    merchantId: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof CurrentAcountsList>

const Template: StoryFn<typeof CurrentAcountsList> = (args) => <CurrentAcountsList {...args} />

export const Showcase = Template.bind({})
Showcase.args = {
  token: 'eyJhbGciOiJIUz...',
  merchantId: 'bf9e1828-c6a1-4cc5-a012-...',
  apiUrl: apiUrls.dev,
  onUnauthorized: action('onCreatePaymentAccount'),
}

export default meta
