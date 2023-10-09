import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { MerchantClient } from '../clients'
import { ApiResponse } from '../types'
import { ApiProps } from '../types/props'

const deleteUserRoleAsync = async (
  apiUrl: string,
  userRoleId: string,
  authToken?: string,
): Promise<ApiResponse<undefined>> => {
  const client = new MerchantClient({ apiUrl, authToken })
  const response = await client.deleteUserRole(userRoleId)

  return response
}

export const useDeleteUserRole = ({
  apiUrl,
  authToken,
}: ApiProps): {
  deleteUserRole: (userRoleId: string) => Promise<ApiResponse<undefined>>
} => {
  const queryClient = useQueryClient()

  const METRICS_QUERY_KEY = ['UsersAndInvitesMetrics']

  const USERSANDINVITES_QUERY_KEY = ['UsersAndInvites']

  // When this mutation succeeds, invalidate any queries with the user invites query key
  const mutation: UseMutationResult<ApiResponse<undefined>, Error, string> = useMutation({
    mutationFn: (variables: string) => deleteUserRoleAsync(apiUrl, variables, authToken),
    onSuccess: (data: ApiResponse<undefined>) => {
      if (data.status === 'success') {
        // After sending invite is successful, invalidate the user invites cache
        queryClient.invalidateQueries({ queryKey: USERSANDINVITES_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: METRICS_QUERY_KEY })
      }
    },
  })

  const deleteUserRole = useCallback(
    async (userRoleId: string) => {
      const result = await mutation.mutateAsync(userRoleId)

      return result
    },
    [mutation],
  )

  return { deleteUserRole }
}
