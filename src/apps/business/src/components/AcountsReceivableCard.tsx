import { cn } from '@/lib/utils/utils'
import Card from '@/components/ui/atoms/Card/Card'

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
    <div className="biz-pt-4 biz-pb-6 md:biz-px-8 biz-inline-flex biz-flex-col biz-items-center">
      <span
        className={cn('biz-mb-4 biz-text-[40px] biz-font-medium', {
          'biz-invisible': value === undefined,
        })}
      >
        {value ?? 0}
      </span>
      <div className="biz-flex biz-items-center">
        <div
          className={cn('biz-h-1.5 biz-w-1.5 biz-rounded-full', {
            'biz-bg-[#ABB2BA]': type === 'unpaid',
            'biz-bg-[#E88C30]': type === 'partiallyPaid',
            'biz-bg-[#29A37A]': type === 'paid',
          })}
        ></div>
        <span
          className={cn('biz-block biz-text-sm/6 biz-font-medium biz-ml-1', {
            'biz-text-[#E88C30]': type === 'partiallyPaid',
            'biz-text-[#29A37A]': type === 'paid',
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
    <div className="biz-mt-16 biz-w-full biz-flex biz-flex-col md:biz-flex-row biz-justify-between">
      <MetricInfo type="unpaid" value={unpaid} />
      <MetricInfo type="partiallyPaid" value={partiallyPaid} />
      <MetricInfo type="paid" value={paid} />
    </div>
  </Card>
)

export default AcountsReceivableCard
