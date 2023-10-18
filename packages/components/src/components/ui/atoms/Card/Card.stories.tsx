import { Meta, StoryFn } from '@storybook/react'

import Card from './Card'

export default {
  title: 'Atoms/Card',
  component: Card,
} as Meta

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Card Title',
  subtext: 'Card Subtext',
  children: <p>Card Content</p>,
  onShowViewAll: undefined,
}

export const WithViewAll = Template.bind({})
WithViewAll.args = {
  title: 'Card Title',
  subtext: 'Card Subtext',
  children: <p>Card Content</p>,
  onShowViewAll: () => console.log('View All clicked'),
}
