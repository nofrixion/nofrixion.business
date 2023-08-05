import { UsersClient } from '../clients'
import { ApiResponse, User } from '../types/ApiResponses'
import { ApiProps } from '../types/props'
import { useQuery } from '@tanstack/react-query'

const fetchUser = async (apiUrl: string, authToken?: string): Promise<ApiResponse<User>> => {
  const client = new UsersClient({ apiUrl, authToken })
  const response = await client.getUser()

  return response
}

export const useUser = ({ apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ['User', apiUrl, authToken]

  return useQuery<ApiResponse<User>, Error>(QUERY_KEY, () => fetchUser(apiUrl, authToken))
}
