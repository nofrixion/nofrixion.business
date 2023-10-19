import { useQuery } from '@tanstack/react-query'

import { MerchantClient } from '../clients'
import { AccountMetrics, ApiResponse } from '../types/ApiResponses'
import { ApiProps, MerchantProps } from '../types/props'

const fetchAccountMetrics = async (
  apiUrl: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<AccountMetrics[]>> => {
  const client = new MerchantClient({ apiUrl, authToken })

  const response = await client.getAccountMetrics({
    merchantId: merchantId,
  })

  return response
}

export const useAccountMetrics = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = ['AccountMetrics', apiUrl, authToken, merchantId]

  return useQuery<ApiResponse<AccountMetrics[]>, Error>(
    QUERY_KEY,
    () => fetchAccountMetrics(apiUrl, merchantId, authToken),
    {
      enabled: !!merchantId,
    },
  )
}
