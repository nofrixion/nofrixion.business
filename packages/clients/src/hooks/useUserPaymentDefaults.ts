import { ApiResponse, UserPaymentDefaults } from '../types/ApiResponses'
import { ClientSettingsClient } from '../clients/ClientSettingsClient'
import { ApiProps } from '../types/props'
import { useQuery } from '@tanstack/react-query'

const fetchUserPaymentDefaults = async (
  apiUrl: string,
  authToken?: string,
): Promise<ApiResponse<UserPaymentDefaults>> => {
  const client = new ClientSettingsClient({ apiUrl, authToken })
  const response = await client.getUserPaymentDefaults()

  return response
}

export const useUserPaymentDefaults = ({ apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ['UserPaymentDefaults', apiUrl, authToken]

  return useQuery<ApiResponse<UserPaymentDefaults>, Error>(QUERY_KEY, () =>
    fetchUserPaymentDefaults(apiUrl, authToken),
  )
}
