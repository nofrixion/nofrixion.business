import { Accounts } from '@nofrixion/components'

import { NOFRIXION_API_URL } from '../../lib/constants'
import useMerchantStore from '../../lib/stores/useMerchantStore'
import useStore from '../../lib/stores/useStore'

const CurrentAccountsPage = () => {
  // const { data: session, status, update } = useSession()
  const merchant = useStore(useMerchantStore, (state) => state.merchant)

  return <div>{merchant && <Accounts merchantId={merchant.id} apiUrl={NOFRIXION_API_URL} />}</div>
}

export default CurrentAccountsPage
