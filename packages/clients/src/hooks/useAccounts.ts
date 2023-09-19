import { useQuery } from '@tanstack/react-query'

import { AccountsClient } from '../clients'
import { Account, ApiResponse } from '../types'
import { ApiProps, getAccountProps } from '../types/props'

const fetchAccounts = async (
  apiUrl: string,
  connectedAccounts: boolean,
  merchantId?: string,
  authToken?: string,
): Promise<ApiResponse<Account[]>> => {
  const client = new AccountsClient({ apiUrl, authToken })
  const response = await client.getAccounts({
    merchantId: merchantId,
    connectedAccounts: connectedAccounts,
  })

  return response
}

export const useAccounts = (
  { merchantId, connectedAccounts }: getAccountProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = ['Accounts', merchantId, apiUrl, authToken, connectedAccounts]

  return useQuery<ApiResponse<Account[]>, Error>(
    QUERY_KEY,
    () => fetchAccounts(apiUrl, connectedAccounts, merchantId, authToken),
    {
      enabled: !!merchantId,
    },
  )
}
