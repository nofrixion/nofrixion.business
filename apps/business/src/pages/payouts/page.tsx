import { PayoutDashboard } from '@nofrixion/components'
import { useStore } from 'zustand'

import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'

const PayoutsPage = () => {
  const merchant = useStore(useMerchantStore, (state) => state.merchant)

  return (
    <div>{merchant && <PayoutDashboard merchantId={merchant.id} apiUrl={NOFRIXION_API_URL} />}</div>
  )
}

export default PayoutsPage
