import failureIcon from '../../../assets/icons/failure-icon.svg'
import pendingIcon from '../../../assets/icons/pending-icon.svg'
import successTickIcon from '../../../assets/icons/success-tick-icon.svg'

export interface StatusListProps {
  successStatusMessage?: string
  pendingStatusMessage?: string
  failureStatusMessage?: string
}

export interface StatusLabelProps {
  statusIcon: string
  statusMessage: string
}

export const StatusLabel: React.FC<StatusLabelProps> = ({ statusIcon, statusMessage }) => {
  return (
    <div className="flex items-center space-x-1.5">
      <img src={statusIcon} alt={statusMessage} className="h-3" />
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
        <StatusLabel statusIcon={successTickIcon} statusMessage={successStatusMessage} />
      )}
      {pendingStatusMessage && (
        <StatusLabel statusIcon={pendingIcon} statusMessage={pendingStatusMessage} />
      )}
      {failureStatusMessage && (
        <StatusLabel statusIcon={failureIcon} statusMessage={failureStatusMessage} />
      )}
    </div>
  )
}

export default StatusList
