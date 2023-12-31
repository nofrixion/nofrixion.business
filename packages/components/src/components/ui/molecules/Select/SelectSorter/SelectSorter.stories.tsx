import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { SelectSorter, type TSorterOptions } from './SelectSorter'

export default {
  title: 'Molecules/Select Sorter',
  component: SelectSorter,
  argTypes: {},
} as Meta<typeof SelectSorter>

const Template: StoryFn<typeof SelectSorter> = ({ onValueChange, ...args }) => {
  const [dateRange, setDateRange] = useState<TSorterOptions | undefined>('mostRecentFirst')

  const handleOnValueChange = (value: TSorterOptions) => {
    setDateRange(value)
    onValueChange && onValueChange(value)
  }

  return <SelectSorter value={dateRange} onValueChange={handleOnValueChange} {...args} />
}

export const Showcase = Template.bind({})
Showcase.args = {
  // variant: 'paid',
}
