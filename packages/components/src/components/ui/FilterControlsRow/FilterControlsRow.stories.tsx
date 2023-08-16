import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { FilterableTag } from '../TagFilter/TagFilter'
import FilterControlsRow from './FilterControlsRow'

export default {
  title: 'UI/Filter Controls Row',
  component: FilterControlsRow,
} as Meta<typeof FilterControlsRow>

const Template: StoryFn<typeof FilterControlsRow> = (args) => {
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [currency, setCurrency] = useState<string | undefined>()
  const [minAmount, setMinAmount] = useState<number | undefined>()
  const [maxAmount, setMaxAmount] = useState<number | undefined>()
  const [tags, setTags] = useState<FilterableTag[]>([
    {
      id: '1',
      label: 'Name of tag',
      isSelected: false,
    },
    {
      id: '2',
      label: 'Another tag',
      isSelected: false,
    },
    {
      id: '3',
      label: 'Tag 3',
      isSelected: false,
    },
    {
      id: '4',
      label: 'This is another tag',
      isSelected: false,
    },
    {
      id: '5',
      label: 'Another tag',
      isSelected: false,
    },
    {
      id: '6',
      label: 'Name of tag',
      isSelected: false,
    },
    {
      id: '7',
      label: 'Another tag',
      isSelected: false,
    },
    {
      id: '8',
      label: 'Tag 3',
      isSelected: false,
    },
    {
      id: '9',
      label: 'This is another tag',
      isSelected: false,
    },
    {
      id: '10',
      label: 'Another tag',
      isSelected: false,
    },
  ])

  const setDateRange = (dateRange: any) => {
    console.log(dateRange)
  }

  return (
    <FilterControlsRow
      {...args}
      setDateRange={setDateRange}
      searchFilter={searchFilter}
      setSearchFilter={setSearchFilter}
      currency={currency}
      setCurrency={setCurrency}
      minAmount={minAmount}
      setMinAmount={setMinAmount}
      maxAmount={maxAmount}
      setMaxAmount={setMaxAmount}
      tags={tags}
      setTags={setTags}
    />
  )
}

export const Default = Template.bind({})
