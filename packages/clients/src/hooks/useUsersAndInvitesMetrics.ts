import { useQuery } from '@tanstack/react-query'

import { UsersClient } from '../clients'
import { ApiResponse, UserMetrics } from '../types/ApiResponses'
import { ApiProps, useUsersAndInvitesMetricsProps } from '../types/props'

const fetchMetrics = async (
  apiUrl: string,
  authToken?: string,
  merchantId?: string,
): Promise<ApiResponse<UserMetrics>> => {
  const client = new UsersClient({ apiUrl, authToken })

  const response = await client.metrics({
    merchantId: merchantId,
  })

  return response
}

export const useUsersAndInvitesMetrics = (
  { merchantId }: useUsersAndInvitesMetricsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = ['UsersAndInvitesMetrics', apiUrl, authToken, merchantId]

  return useQuery<ApiResponse<UserMetrics>, Error>(
    QUERY_KEY,
    () => fetchMetrics(apiUrl, authToken, merchantId),
    {
      enabled: !!merchantId,
    },
  )
}
