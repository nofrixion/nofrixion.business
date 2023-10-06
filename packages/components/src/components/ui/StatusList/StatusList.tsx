import { cn } from '../../../utils'
import { Icon } from '../atoms'

export interface StatusListProps {
  successStatusMessage?: string
  pendingStatusMessage?: string
  failureStatusMessage?: string
}

export interface StatusLabelProps {
  statusIcon: 'success-tick/12' | 'pending/12' | 'cancelled/12'
  statusMessage: string
  iconClassName?: string
}

export const StatusLabel: React.FC<StatusLabelProps> = ({
  statusIcon,
  statusMessage,
  iconClassName,
}) => {
  return (
    <div className="flex items-center space-x-1.5">
      <Icon name={statusIcon} className={cn('h-3', iconClassName)} />
      <span className="text-13px text-default-text font-normal">{statusMessage}</span>
    </div>
  )
}

const StatusList: React.FC<StatusListProps> = ({
  successStatusMessage,
  pendingStatusMessage,
  failureStatusMessage,
}) => {
  return (
    <div className="flex space-x-4">
      {successStatusMessage && (
        <StatusLabel
          statusIcon="success-tick/12"
          statusMessage={successStatusMessage}
          iconClassName="stroke-[#29A37A]"
        />
      )}
      {pendingStatusMessage && (
        <StatusLabel
          statusIcon="pending/12"
          statusMessage={pendingStatusMessage}
          iconClassName="stroke-[#454D54]"
        />
      )}
      {failureStatusMessage && (
        <StatusLabel
          statusIcon="cancelled/12"
          statusMessage={failureStatusMessage}
          iconClassName="fill-[#F32448] stroke-none"
        />
      )}
    </div>
  )
}

export default StatusList
