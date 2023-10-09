import { Meta, StoryFn } from '@storybook/react'

import TagList from './TagList'

export default {
  title: 'UI/Tags/Tag List',
  component: TagList,
  argTypes: {
    labels: { control: 'array' },
  },
} as Meta<typeof TagList>

const Template: StoryFn<typeof TagList> = (args) => <TagList {...args} />

export const TwoTags = Template.bind({})
TwoTags.args = {
  labels: ['Tag 1', 'Another tag'],
}

export const FourTags = Template.bind({})
FourTags.args = {
  labels: ['Tag 1', 'Another tag', 'Third tag', 'Fourth tag'],
}
