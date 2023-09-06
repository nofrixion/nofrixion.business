import { getRoute } from '../../../utils/utils'
import { Button } from '../atoms'

export interface PayoutApproveFormProps {
  payoutId: string
}

export const PayoutApproveForm = ({ payoutId }: PayoutApproveFormProps) => {
  return (
    <form action="/approve/initiate">
      <input type="hidden" name="approveType" value="Payout" />
      <input type="hidden" name="callerBaseUrl" value={getRoute('/home/payouts/')} />
      <input type="hidden" name="id" value={payoutId} />
      <Button variant="primary" size="x-small" className="w-fit">
        Approve
      </Button>
    </form>
  )
}
