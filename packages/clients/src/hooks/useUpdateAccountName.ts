import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { AccountsClient } from '../clients'
import { AccountUpdate, ApiError } from '../types'
import { ApiProps, MerchantProps } from '../types/props'

const updateAccountAsync = async (
  apiUrl: string,
  newAccountName: string,
  accountId: string,
  authToken?: string,
): Promise<{
  success?: boolean
  error?: ApiError
}> => {
  const client = new AccountsClient({ apiUrl, authToken })
  const accountUpdate: AccountUpdate = {
    accountName: newAccountName,
  }
  const response = await client.update(accountId, accountUpdate)

  if (response.status === 'error') {
    return { error: response.error }
  }

  return { success: true }
}

interface UpdateAccountNameProps {
  accountId: string
  accountName: string
}

export const useUpdateAccountName = (
  { merchantId }: MerchantProps,
  { apiUrl, authToken }: ApiProps,
): {
  updateAccountName: (
    updateAccountNameProps: UpdateAccountNameProps,
  ) => Promise<{ error: ApiError | undefined }>
} => {
  const queryClient = useQueryClient()

  const [accountId, setAccountId] = useState<string>()

  const SINGLE_ACCOUNT_QUERY_KEY = ['Account', merchantId, accountId, apiUrl, authToken]

  const ACCOUNTS_QUERY_KEY = ['Accounts']

  // When this mutation succeeds, invalidate any queries with the payment requests query key
  const mutation: UseMutationResult<
    { success?: boolean | undefined; error?: ApiError | undefined },
    Error,
    UpdateAccountNameProps
  > = useMutation({
    mutationFn: ({ accountId, accountName }: UpdateAccountNameProps) =>
      updateAccountAsync(apiUrl, accountName, accountId, authToken),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        // After add tag is successful, invalidate the payment requests cache, the single payment request cache
        queryClient.invalidateQueries({ queryKey: SINGLE_ACCOUNT_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY })
      }
    },
  })

  const updateAccountName = useCallback(
    async ({ accountId, accountName }: UpdateAccountNameProps) => {
      if (accountId) {
        setAccountId(accountId)
        const result = await mutation.mutateAsync({ accountId, accountName })

        if (result.success) {
          return { error: undefined }
        } else {
          return { error: result.error }
        }
      }
      return { error: undefined }
    },
    [mutation],
  )

  return { updateAccountName }
}
