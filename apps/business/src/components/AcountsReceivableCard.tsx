import Card from '../components/ui/atoms/Card/Card'
import { cn } from '../lib/utils/utils'

interface AcountsReceivableCardProps {
  paid?: number
  unpaid?: number
  partiallyPaid?: number
  className?: string
  onClick?: () => void
  onShowViewAll?: () => void
}

const MetricInfo: React.FC<{
  type: 'unpaid' | 'partiallyPaid' | 'paid'
  value?: number
}> = ({ type, value }) => {
  return (
    <div className="pt-4 pb-6 md:px-8 inline-flex flex-col items-center">
      <span
        className={cn('mb-4 text-[40px] font-medium', {
          invisible: value === undefined,
        })}
      >
        {value ?? 0}
      </span>
      <div className="flex items-center">
        <div
          className={cn('h-1.5 w-1.5 rounded-full', {
            'bg-[#ABB2BA]': type === 'unpaid',
            'bg-[#E88C30]': type === 'partiallyPaid',
            'bg-[#29A37A]': type === 'paid',
          })}
        ></div>
        <span
          className={cn('block text-sm/6 font-medium ml-1', {
            'text-[#E88C30]': type === 'partiallyPaid',
            'text-[#29A37A]': type === 'paid',
          })}
        >
          {type === 'unpaid' && 'Unpaid'}
          {type === 'partiallyPaid' && 'Partially paid'}
          {type === 'paid' && 'Paid'}
        </span>
      </div>
    </div>
  )
}

const AcountsReceivableCard: React.FC<AcountsReceivableCardProps> = ({
  paid,
  unpaid,
  partiallyPaid,
  onShowViewAll,
}) => (
  <Card onShowViewAll={onShowViewAll} title="Accounts receivable" subtext="Last 30 days">
    <div className="mt-16 w-full flex flex-col md:flex-row justify-between">
      <MetricInfo type="unpaid" value={unpaid} />
      <MetricInfo type="partiallyPaid" value={partiallyPaid} />
      <MetricInfo type="paid" value={paid} />
    </div>
  </Card>
)

export default AcountsReceivableCard
