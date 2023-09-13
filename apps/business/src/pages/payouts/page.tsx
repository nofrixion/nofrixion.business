import { PayoutDashboard } from '@nofrixion/components'
import { makeToast } from '@nofrixion/components/src/components/ui/Toast/Toast'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useStore } from 'zustand'

import { AuthContextType } from '../../lib/auth/AuthProvider'
import { useAuth } from '../../lib/auth/useAuth'
import { NOFRIXION_API_URL } from '../../lib/constants'
import { ErrorType, useErrorsStore } from '../../lib/stores/useErrorsStore'
import useMerchantStore from '../../lib/stores/useMerchantStore'

const PayoutsPage = () => {
  const { payoutId, result } = useParams()
  const merchant = useStore(useMerchantStore, (state) => state.merchant)
  const { errors, removeError } = useErrorsStore()
  const location = useLocation()
  const { authState } = useAuth() as AuthContextType

  const onUnauthorized = () => {
    authState?.logOut && authState.logOut()
  }

  if (result) {
    if (result === 'success') {
      makeToast('success', 'Payout approved')
    } else if (result === 'error') {
      const error = errors.find(
        (payoutError) => payoutError.type === ErrorType.PAYOUT && payoutError.id === payoutId,
      )?.error

      if (error) {
        makeToast('error', error.detail)
      }

      if (payoutId && error) {
        removeError(payoutId)
      }
    }

    return <Navigate to={location.pathname.replace(`/${payoutId}`, '').replace(`/${result}`, '')} />
  }

  return (
    merchant && (
      <PayoutDashboard
        merchantId={merchant.id}
        apiUrl={NOFRIXION_API_URL}
        onUnauthorized={onUnauthorized}
      />
    )
  )
}

export default PayoutsPage
