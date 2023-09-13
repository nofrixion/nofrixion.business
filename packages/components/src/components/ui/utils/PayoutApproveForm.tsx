import { ApproveType } from '../../../types/LocalTypes'
import { getRoute } from '../../../utils/utils'
import { Button } from '../atoms'

export interface PayoutApproveFormProps {
  id: string
  size: 'big' | 'medium' | 'small' | 'x-small'
  formRef?: React.RefObject<HTMLFormElement>
  className?: string
  approveType?: ApproveType
}

export const PayoutApproveForm = ({
  id,
  size,
  formRef,
  className,
  approveType = ApproveType.PAYOUT,
}: PayoutApproveFormProps) => {
  return (
    <form action="/approve/initiate" ref={formRef} className={className}>
      <input type="hidden" name="approveType" value={approveType} />
      <input type="hidden" name="callerBaseUrl" value={getRoute('/home/payouts/')} />
      <input type="hidden" name="id" value={id} />
      <Button
        variant="primary"
        size={size}
        className="w-fit"
        onClick={(event) => event.stopPropagation()}
      >
        Approve
      </Button>
    </form>
  )
}
