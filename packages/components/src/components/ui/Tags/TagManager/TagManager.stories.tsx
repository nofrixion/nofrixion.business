import { Meta,StoryFn } from '@storybook/react'

import { mockMerchantTags, mockTags } from '../../../../utils/mockedData'
import TagManager from './TagManager'

export default {
  title: 'UI/Tags/TagManager',
  component: TagManager,
  argTypes: {
    tags: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof TagManager>

const Template: StoryFn<typeof TagManager> = (args) => <TagManager {...args} />

export const Regular = Template.bind({})
Regular.args = {
  tags: mockTags,
  availableTags: mockMerchantTags,
}
