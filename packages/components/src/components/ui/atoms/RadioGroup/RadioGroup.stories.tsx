import { Meta, StoryFn } from '@storybook/react'

import { RadioGroup, RadioGroupItem } from './RadioGroup'

export default {
  title: 'Atoms/Radio Group',
  component: RadioGroup,
  argTypes: {
    onValueChange: { action: 'onValueChange' },
  },
} as Meta<typeof RadioGroup>

const Template: StoryFn<{
  subText?: string
}> = ({ ...args }) => {
  return (
    <RadioGroup {...args}>
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="default" id="r1" />
        <label htmlFor="r1">Default</label>
      </div>
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="comfortable" id="r2" />
        <label htmlFor="r2">Comfortable</label>
      </div>
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="compact" id="r3" />
        <label htmlFor="r3">Compact</label>
      </div>
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="multiple" id="r4" />
        <label htmlFor="r4">Multiple styles</label>
      </div>
    </RadioGroup>
  )
}

export const Showcase = Template.bind({})
Showcase.args = {}
