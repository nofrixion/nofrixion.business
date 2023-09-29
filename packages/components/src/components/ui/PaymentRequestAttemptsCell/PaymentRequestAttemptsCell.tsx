import CopyLinkButton from '../CopyLinkButton/CopyLinkButton'
import StatusList from '../StatusList/StatusList'

export interface PaymentRequestAttemptsCellProps {
  successfulAttemptsCount: number
  pendingAttemptsCount: number
  failedAttemptsCount: number
  hostedPaymentLink: string
}

const getSuccessStatusMessage = (
  successfulAttemptsCount: number,
  pendingAttemptsCount: number,
  failedAttemptsCount: number,
): string => {
  if (successfulAttemptsCount > 0) {
    if (
      successfulAttemptsCount ===
      successfulAttemptsCount + pendingAttemptsCount + failedAttemptsCount
    ) {
      return `${successfulAttemptsCount} bank payment${
        successfulAttemptsCount > 1 ? 's' : ''
      } received`
    }

    return `${successfulAttemptsCount} received`
  }

  return ''
}

const getPendingStatusMessage = (
  successfulAttemptsCount: number,
  pendingAttemptsCount: number,
  failedAttemptsCount: number,
): string => {
  if (pendingAttemptsCount > 0) {
    if (
      pendingAttemptsCount ===
      successfulAttemptsCount + pendingAttemptsCount + failedAttemptsCount
    ) {
      return `${pendingAttemptsCount} bank payment${
        pendingAttemptsCount > 1 ? 's' : ''
      } in progress`
    }

    return `${pendingAttemptsCount} in progress`
  }

  return ''
}

const getFailureStatusMessage = (
  successfulAttemptsCount: number,
  pendingAttemptsCount: number,
  failedAttemptsCount: number,
): string => {
  if (failedAttemptsCount > 0) {
    if (
      failedAttemptsCount ===
      successfulAttemptsCount + pendingAttemptsCount + failedAttemptsCount
    ) {
      return `${failedAttemptsCount} bank payment${failedAttemptsCount > 1 ? 's' : ''} failed`
    }

    return `${failedAttemptsCount} failed`
  }

  return ''
}

const PaymentRequestAttemptsCell: React.FC<PaymentRequestAttemptsCellProps> = ({
  successfulAttemptsCount,
  pendingAttemptsCount,
  failedAttemptsCount,
  hostedPaymentLink,
}) => {
  return (
    <div className="flex items-center space-x-3">
      {successfulAttemptsCount + pendingAttemptsCount + failedAttemptsCount > 0 ? (
        <StatusList
          successStatusMessage={getSuccessStatusMessage(
            successfulAttemptsCount,
            pendingAttemptsCount,
            failedAttemptsCount,
          )}
          pendingStatusMessage={getPendingStatusMessage(
            successfulAttemptsCount,
            pendingAttemptsCount,
            failedAttemptsCount,
          )}
          failureStatusMessage={getFailureStatusMessage(
            successfulAttemptsCount,
            pendingAttemptsCount,
            failedAttemptsCount,
          )}
        />
      ) : (
        <>
          <span className="text-13px text-default-text font-normal">No payments yet</span>
          <CopyLinkButton link={hostedPaymentLink} variant="filled" />
        </>
      )}
    </div>
  )
}

export default PaymentRequestAttemptsCell
