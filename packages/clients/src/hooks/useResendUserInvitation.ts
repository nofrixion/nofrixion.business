import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { UserInvitesClient } from '../clients'
import { ApiResponse } from '../types'
import { ApiProps } from '../types/props'

const resendUserInvitationAsync = async (
  inviteID: string,
  apiUrl: string,
  authToken?: string,
): Promise<ApiResponse<undefined>> => {
  const client = new UserInvitesClient({ apiUrl: apiUrl, authToken: authToken })

  const response = await client.resendUserInvite({ inviteId: inviteID })

  return response
}

export const useResendUserInvitation = ({
  apiUrl,
  authToken,
}: ApiProps): {
  resendUserInvitation: (inviteID: string) => Promise<ApiResponse<undefined>>
} => {
  const queryClient = useQueryClient()

  const METRICS_QUERY_KEY = ['UsersAndInvitesMetrics']

  const USERSANDINVITES_QUERY_KEY = ['UsersAndInvites']

  // When this mutation succeeds, invalidate any queries with the user invites query key
  const mutation: UseMutationResult<ApiResponse<undefined>, Error, string> = useMutation({
    mutationFn: (inviteID: string) => resendUserInvitationAsync(inviteID, apiUrl, authToken),
    onSuccess: (data: ApiResponse<undefined>) => {
      if (data.status === 'success') {
        // After sending invite is successful, invalidate the user invites cache
        queryClient.invalidateQueries({ queryKey: USERSANDINVITES_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: METRICS_QUERY_KEY })
      }
    },
  })

  const resendUserInvitation = useCallback(
    async (inviteID: string) => {
      const result = await mutation.mutateAsync(inviteID)

      return result
    },
    [mutation],
  )

  return { resendUserInvitation }
}
