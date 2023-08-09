import AmountFilter from './AmountFilter'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

export default {
  title: 'UI/Amount Filter',
  component: AmountFilter,
} as Meta<typeof AmountFilter>

const Template: StoryFn<typeof AmountFilter> = () => {
  const [localCurrency, setLocalCurrency] = useState<string | undefined>()
  const [localMinAmount, setLocalMinAmount] = useState<number | undefined>()
  const [localMaxAmount, setLocalMaxAmount] = useState<number | undefined>()

  return (
    <AmountFilter
      currency={localCurrency}
      setCurrency={setLocalCurrency}
      minAmount={localMinAmount}
      setMinAmount={setLocalMinAmount}
      maxAmount={localMaxAmount}
      setMaxAmount={setLocalMaxAmount}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
