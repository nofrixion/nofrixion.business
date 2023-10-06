import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { OpenBankingClient } from '../clients'
import { ApiError } from '../types'
import { ApiProps } from '../types/props'

const deleteConnectedAccountAsync = async (
  accountId: string,
  apiUrl: string,
  authToken?: string,
): Promise<{
  success?: boolean | undefined
  error?: ApiError | undefined
}> => {
  const openBankingClient = new OpenBankingClient({ apiUrl, authToken })
  const connectedAccountDeleteResponse = await openBankingClient.deleteConnectedAccount({
    accountId,
  })

  return connectedAccountDeleteResponse
}

export const useDeleteConnectedAccount = ({
  apiUrl,
  authToken,
}: ApiProps): {
  deleteConnectedAccount: (accountId: string) => Promise<{
    success?: boolean | undefined
    error?: ApiError | undefined
  }>
} => {
  const queryClient = useQueryClient()

  const ACCOUNTS_QUERY_KEY = ['Accounts']

  // When this mutation succeeds, invalidate any queries with the accounts query key
  const mutation: UseMutationResult<
    {
      success?: boolean | undefined
      error?: ApiError | undefined
    },
    Error,
    string
  > = useMutation({
    mutationFn: (variables: string) => deleteConnectedAccountAsync(variables, apiUrl, authToken),
    onSuccess: (data: { success?: boolean | undefined; error?: ApiError | undefined }) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY })
      }
    },
  })

  const deleteConnectedAccount = useCallback(
    async (accountId: string) => {
      const result = await mutation.mutateAsync(accountId)

      return result
    },
    [mutation],
  )

  return { deleteConnectedAccount }
}
