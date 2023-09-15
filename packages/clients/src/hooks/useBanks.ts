import { useQuery } from '@tanstack/react-query'

import { MerchantClient } from '../clients/MerchantClient'
import { ApiResponse, MerchantBankSettings } from '../types/ApiResponses'
import { ApiProps, MerchantProps } from '../types/props'

const fetchBanks = async (
  apiUrl: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<MerchantBankSettings>> => {
  const client = new MerchantClient({ apiUrl, authToken })

  const response = await client.getBankSettings({ merchantId })

  return response
}

export const useBanks = ({ merchantId }: MerchantProps, { apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ['Banks', merchantId, apiUrl, authToken]

  return useQuery<ApiResponse<MerchantBankSettings>, Error>(
    QUERY_KEY,
    () => fetchBanks(apiUrl, merchantId, authToken),
    {
      enabled: !!merchantId,
      staleTime: 1000 * 60 * 5, // 15 minutes
    },
  )
}
