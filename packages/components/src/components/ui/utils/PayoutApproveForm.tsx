import { getRoute } from '../../../utils/utils'
import { Button } from '../atoms'

export interface PayoutApproveFormProps {
  payoutId: string
  size: 'big' | 'medium' | 'small' | 'x-small'
  formRef?: React.RefObject<HTMLFormElement>
  className?: string
}

export const PayoutApproveForm = ({
  payoutId,
  size,
  formRef,
  className,
}: PayoutApproveFormProps) => {
  return (
    <form action="/approve/initiate" ref={formRef} className={className}>
      <input type="hidden" name="approveType" value="Payout" />
      <input type="hidden" name="callerBaseUrl" value={getRoute('/home/payouts/')} />
      <input type="hidden" name="id" value={payoutId} />
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
