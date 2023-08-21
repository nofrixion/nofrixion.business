import { useQuery } from '@tanstack/react-query'

import { AccountsClient } from '../clients'
import { Account, ApiResponse } from '../types'
import { AccountProps, ApiProps } from '../types/props'

const fetchAccount = async (
  apiUrl: string,
  accountId?: string,
  authToken?: string,
): Promise<ApiResponse<Account>> => {
  const client = new AccountsClient({ apiUrl, authToken })
  const response = await client.getAccount({ accountId })

  return response
}

export const useAccount = ({ accountId }: AccountProps, { apiUrl, authToken }: ApiProps) => {
  const QUERY_KEY = ['Account', accountId, apiUrl, authToken]

  return useQuery<ApiResponse<Account>, Error>(
    QUERY_KEY,
    () => fetchAccount(apiUrl, accountId, authToken),
    {
      enabled: !!accountId,
    },
  )
}
