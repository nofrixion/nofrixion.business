import { useQuery, useQueryClient } from '@tanstack/react-query'

import { AccountsClient } from '../clients'
import { Account, ApiResponse } from '../types'
import { AccountProps, ApiProps, getAccountProps } from '../types/props'

const fetchAccount = async (
  apiUrl: string,
  accountId?: string,
  authToken?: string,
): Promise<ApiResponse<Account>> => {
  const client = new AccountsClient({ apiUrl, authToken })
  const response = await client.getAccount({ accountId })

  return response
}

export const useAccount = (
  { merchantId, connectedAccounts }: getAccountProps,
  { accountId }: AccountProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = ['Account', accountId, apiUrl, authToken]

  const queryClient = useQueryClient()

  const ACCOUNTS_QUERY_KEY = ['Accounts', merchantId, apiUrl, authToken, connectedAccounts]

  return useQuery<ApiResponse<Account>, Error>({
    queryKey: QUERY_KEY,
    queryFn: () => fetchAccount(apiUrl, accountId, authToken),
    enabled: !!accountId,
    placeholderData: () => {
      if (accountId) {
        const result: ApiResponse<Account[]> | undefined =
          queryClient.getQueryData<ApiResponse<Account[]>>(ACCOUNTS_QUERY_KEY)

        if (result?.status === 'success') {
          const account: Account | undefined = result.data.find((x) => x.id === accountId)
          if (account) {
            const apiresponse: ApiResponse<Account> = {
              data: account,
              status: 'success',
              timestamp: new Date(),
            }
            return apiresponse
          }
        }
      }
    },
  })
}
