import { Currency } from '@nofrixion/moneymoov'
import { format } from 'date-fns'
import { useState } from 'react'
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
  height: number
}

const AccountChart: React.FC<AccountChartProps> = ({ points, currency, height }) => {
  const [hovered, setHovered] = useState(false)

  const formatData = (points: ChartPoint[]) => {
    return points.map((point) => {
      console.log(point)
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
    <ResponsiveContainer height={height} className={'w-full'}>
      <AreaChart
        data={formatData(points)}
        margin={{
          top: 3,
          right: 3,
          left: 3,
          bottom: 0,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
          fillOpacity={hovered ? 0.3 : 0.2}
          activeDot={{ stroke: '#00264D', fill: '#00264D', strokeWidth: 2, r: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AccountChart
