import { MerchantClient } from '../clients/MerchantClient'
import { formatApiResponse } from '../types'
import { ApiResponse, Tag } from '../types/ApiResponses'
import { ApiProps, MerchantProps } from '../types/props'
import { useQuery } from '@tanstack/react-query'

const fetchMerchantTags = async (
  apiUrl: string,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<Tag[]>> => {
  const client = new MerchantClient({ apiUrl, authToken })
  const response = await client.getTags({ merchantId })

  return response
}

export const useMerchantTags = ({ merchantId }: MerchantProps, { apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ['MerchantTags', merchantId, apiUrl, authToken]

  return useQuery<ApiResponse<Tag[]>, Error>(
    QUERY_KEY,
    () => fetchMerchantTags(apiUrl, merchantId, authToken),
    {
      enabled: !!merchantId,
    },
  )
}
