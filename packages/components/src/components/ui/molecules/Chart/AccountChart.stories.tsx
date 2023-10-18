import { Currency } from '@nofrixion/moneymoov'
import { Meta, StoryFn } from '@storybook/react'

import Chart, { ChartPoint } from './AccountChart'

export default {
  title: 'Molecules/Account Chart',
  component: Chart,
} as Meta

const data: ChartPoint[] = [
  {
    x: new Date(2021, 2, 1),
    y: 24267,
  },
  {
    x: new Date(2021, 3, 1),
    y: 52150,
  },
  {
    x: new Date(2021, 4, 1),
    y: 28000,
  },
  {
    x: new Date(2021, 5, 1),
    y: 56000,
  },
  {
    x: new Date(2021, 6, 1),
    y: 64000,
  },
  {
    x: new Date(2021, 7, 1),
    y: 75000,
  },
  {
    x: new Date(2021, 8, 1),
    y: 70000,
  },
]

const Template: StoryFn<typeof Chart> = (args) => {
  return (
    <div className="h-28">
      <Chart {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  points: data,
  currency: Currency.EUR,
}
