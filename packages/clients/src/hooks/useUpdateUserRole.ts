import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { MerchantClient } from '../clients'
import { ApiResponse, UserRole, UserRoleCreate } from '../types'
import { ApiProps } from '../types/props'

const updateUserRoleAsync = async (
  apiUrl: string,
  userRoleCreate: UserRoleCreate,
  authToken?: string,
): Promise<ApiResponse<UserRole>> => {
  const client = new MerchantClient({ apiUrl, authToken })
  const response = await client.assignUserRole(userRoleCreate)

  return response
}

export const useUpdateUserRole = ({
  apiUrl,
  authToken,
}: ApiProps): {
  updateUserRole: (userRoleCreate: UserRoleCreate) => Promise<ApiResponse<UserRole>>
} => {
  const queryClient = useQueryClient()

  const METRICS_QUERY_KEY = ['UsersAndInvitesMetrics']

  const USERSANDINVITES_QUERY_KEY = ['UsersAndInvites']

  // When this mutation succeeds, invalidate any queries with the user invites query key
  const mutation: UseMutationResult<ApiResponse<UserRole>, Error, UserRoleCreate> = useMutation({
    mutationFn: (variables: UserRoleCreate) => updateUserRoleAsync(apiUrl, variables, authToken),
    onSuccess: (data: ApiResponse<UserRole>) => {
      if (data.status === 'success') {
        // After sending invite is successful, invalidate the user invites cache
        queryClient.invalidateQueries({ queryKey: USERSANDINVITES_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: METRICS_QUERY_KEY })
      }
    },
  })

  const updateUserRole = useCallback(
    async ({ merchantID, emailAddress, userRole }: UserRoleCreate) => {
      const result = await mutation.mutateAsync({
        merchantID,
        emailAddress,
        userRole,
      })

      return result
    },
    [mutation],
  )

  return { updateUserRole }
}
