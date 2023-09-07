import { getRoute } from '../../../utils/utils'
import { Button } from '../atoms'

export interface PayoutApproveFormProps {
  payoutId: string
  size: 'big' | 'medium' | 'small' | 'x-small'
}

export const PayoutApproveForm = ({ payoutId, size }: PayoutApproveFormProps) => {
  return (
    <form action="/approve/initiate">
      <input type="hidden" name="approveType" value="Payout" />
      <input type="hidden" name="callerBaseUrl" value={getRoute('/home/payouts/')} />
      <input type="hidden" name="id" value={payoutId} />
      <Button variant="primary" size={size} className="w-fit">
        Approve
      </Button>
    </form>
  )
}
