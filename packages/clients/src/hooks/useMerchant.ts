import { useQuery } from '@tanstack/react-query'

import { MerchantClient } from '../clients/MerchantClient'
import { ApiResponse, Merchant } from '../types/ApiResponses'
import { ApiProps, MerchantProps } from '../types/props'

const fetchMerchant = async (
  apiUrl: string,
  merchantId: string,
  authToken?: string,
): Promise<ApiResponse<Merchant>> => {
  const client = new MerchantClient({ apiUrl, authToken })

  const response = await client.getMerchant({ merchantId })

  return response
}

export const useMerchant = (
  { apiUrl, authToken }: ApiProps,
  { merchantId }: Required<MerchantProps>,
) => {
  const QUERY_KEY = ['Merchant', apiUrl, authToken]

  return useQuery<ApiResponse<Merchant>, Error>(QUERY_KEY, () =>
    fetchMerchant(apiUrl, merchantId, authToken),
  )
}
