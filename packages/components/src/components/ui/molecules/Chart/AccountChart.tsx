import { Currency } from '@nofrixion/moneymoov'
import { format } from 'date-fns'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'

import { formatAmount } from '../../../../utils/formatters'
import { formatCurrency } from '../../../../utils/uiFormaters'

export interface ChartPoint {
  x: Date
  y: number
}

export interface AccountChartProps {
  points: ChartPoint[]
  currency: Currency
}

const Chart: React.FC<AccountChartProps> = ({ points, currency }) => {
  const formatData = (points: ChartPoint[]) => {
    return points.map((point) => {
      return {
        x: format(point.x, 'MMM dd, yyyy'),
        y: point.y,
      }
    })
  }

  const CustomTooltip = ({
    active,
    payload,
    currency,
  }: {
    active?: boolean
    payload?: any
    currency: Currency
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded shadow-small py-1 px-2 text-center">
          <p className="text-[10px]/4 text-grey-text">{payload[0].payload.x}</p>
          <p className="text-sm/4 text-default-text font-semibold">
            {formatCurrency(currency)} {formatAmount(payload[0].payload.y)}
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <ResponsiveContainer className="w-full h-full">
      <AreaChart
        data={formatData(points)}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <Tooltip
          cursor={{ stroke: '#00264D', strokeWidth: 2 }}
          content={(props) => <CustomTooltip {...props} currency={currency} />}
        />
        <Area
          type="linear"
          dataKey="y"
          stroke="#009999"
          strokeWidth={2}
          fill="#40BFBF"
          activeDot={{ stroke: '#00264D', fill: '#00264D', strokeWidth: 2, r: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default Chart
