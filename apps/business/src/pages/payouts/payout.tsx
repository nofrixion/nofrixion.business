import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/ui/Button'
import { ErrorType, useErrorsStore } from '../../lib/stores/useErrorsStore'
import { getRoute } from '../../lib/utils/utils'

/**
 * This is just a dummy page for testing purposes
 */

const PayoutPage = () => {
  const { errors } = useErrorsStore()
  const { payoutId, result } = useParams()
  const navigate = useNavigate()

  const resultMessage = result && result === 'success' ? 'Payout approved' : 'Payout not approved'

  const error = errors.find(
    (payoutError) => payoutError.type === ErrorType.PAYOUT && payoutError.id === payoutId,
  )?.error

  return (
    <div className="flex flex-col">
      {result && (
        <>
          <span className="flex">{resultMessage}</span>
          <span className="flex mt-2 text-red-500 font-semibold">{error && error.detail}</span>
        </>
      )}
      {result && result !== 'success' && (
        <Button
          onClick={() => navigate(getRoute(`/home/payouts/${payoutId}`))}
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
