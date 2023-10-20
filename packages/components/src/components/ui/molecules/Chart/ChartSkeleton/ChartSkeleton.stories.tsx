import { Meta, StoryFn } from '@storybook/react'

import { ChartSkeletonData } from '../../../../../utils/utils'
import ChartSkeleton from './ChartSkeleton'

export default {
  title: 'Molecules/Chart skeleton',
  component: ChartSkeleton,
  argTypes: {
    currency: {
      control: { type: 'select' },
    },
  },
} as Meta

const Template: StoryFn<typeof ChartSkeleton> = (args) => {
  return (
    <div className="h-28">
      <ChartSkeleton {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  points: ChartSkeletonData,
}
