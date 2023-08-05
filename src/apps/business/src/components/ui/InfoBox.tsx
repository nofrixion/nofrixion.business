import { cn } from '@/lib/utils/utils'

interface InfoBoxProps {
  title: string
  message: string
  className?: string
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, message, className }) => {
  return (
    <div
      className={cn('biz-bg-information-bg biz-p-4 biz-rounded biz-text-default-text', className)}
    >
      <p className="biz-font-semibold biz-text-sm/6">{title}</p>
      <p className="biz-text-xs/6">{message}</p>
    </div>
  )
}

export default InfoBox
