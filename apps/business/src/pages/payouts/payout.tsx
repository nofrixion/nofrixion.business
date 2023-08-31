import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/ui/Button'
import { getRoute } from '../../lib/utils/utils'

const PayoutPage = () => {
  const { payoutId, result, message } = useParams()
  const navigate = useNavigate()

  const resultMessage = result && result === 'success' ? 'Payout approved' : 'Payout not approved'

  return (
    <div className="flex flex-col">
      {result && (
        <>
          <span className="flex">{resultMessage}</span>
          <span className="flex">{message && decodeURIComponent(message)}</span>
        </>
      )}
      {result && result !== 'success' && (
        <Button
          onClick={() => navigate(getRoute(`/payouts/${payoutId}`))}
          className="mt-4 ml-2 w-fit"
        >
          Try again
        </Button>
      )}

      {!result && (
        <form action="/approve/initiate">
          <input type="hidden" name="approveType" value="Payout" />
          <input type="hidden" name="callerBaseUrl" value={getRoute('/home/payouts/')} />
          <input className="w-96 border p-2 rounded" type="text" name="id" value={payoutId} />
          <Button className="ml-2">Approve</Button>
        </form>
      )}
    </div>
  )
}

export default PayoutPage
