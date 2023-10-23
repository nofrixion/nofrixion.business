import { Area, AreaChart, ResponsiveContainer } from 'recharts'

export interface ChartPoint {
  x: number
  y: number
}

export interface ChartSkeletonProps {
  points: ChartPoint[]
}

const ChartSkeleton: React.FC<ChartSkeletonProps> = ({ points }) => {
  return (
    <ResponsiveContainer className="w-full h-full">
      <AreaChart
        data={points}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <Area
          type="linear"
          dataKey="y"
          stroke="#EFF4F5"
          strokeWidth={0}
          fill="#EFF4F5"
          className="animate-pulse"
          fillOpacity={1}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ChartSkeleton
