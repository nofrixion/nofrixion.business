import { cn } from '../../lib/utils/utils'

interface InfoBoxProps {
  title: string
  message: string
  className?: string
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, message, className }) => {
  return (
    <div className={cn('bg-information-bg p-4 rounded text-default-text', className)}>
      <p className="font-semibold text-sm/6">{title}</p>
      <p className="text-xs/6">{message}</p>
    </div>
  )
}

export default InfoBox
