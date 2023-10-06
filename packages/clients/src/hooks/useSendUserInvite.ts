import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { UserInvitesClient } from '../clients'
import { ApiResponse, UserInvite, UserInviteCreate } from '../types'
import { ApiProps } from '../types/props'

const sendUserInviteAsync = async (
  apiUrl: string,
  userInviteCreate: UserInviteCreate,
  authToken?: string,
): Promise<ApiResponse<UserInvite>> => {
  const userInvitesClient = new UserInvitesClient({ apiUrl, authToken })
  const userInviteCreateResponse = await userInvitesClient.sendUserInvite(userInviteCreate)

  return userInviteCreateResponse
}

export const useSendUserInvite = ({
  apiUrl,
  authToken,
}: ApiProps): {
  sendUserInvite: (userInviteCreate: UserInviteCreate) => Promise<ApiResponse<UserInvite>>
} => {
  const queryClient = useQueryClient()

  const METRICS_QUERY_KEY = ['UsersAndInvitesMetrics']

  const USERSANDINVITES_QUERY_KEY = ['UsersAndInvites']

  // When this mutation succeeds, invalidate any queries with the user invites query key
  const mutation: UseMutationResult<ApiResponse<UserInvite>, Error, UserInviteCreate> = useMutation(
    {
      mutationFn: (variables: UserInviteCreate) =>
        sendUserInviteAsync(apiUrl, variables, authToken),
      onSuccess: (data: ApiResponse<UserInvite>) => {
        if (data.status === 'success') {
          // After sending invite is successful, invalidate the user invites cache
          queryClient.invalidateQueries({ queryKey: USERSANDINVITES_QUERY_KEY })
          queryClient.invalidateQueries({ queryKey: METRICS_QUERY_KEY })
        }
      },
    },
  )

  const sendUserInvite = useCallback(
    async ({
      merchantID,
      inviteeFirstName,
      inviteeLastName,
      inviteeEmailAddress,
      sendInviteEmail,
      registrationUrl,
    }: UserInviteCreate) => {
      const result = await mutation.mutateAsync({
        merchantID,
        inviteeFirstName,
        inviteeLastName,
        inviteeEmailAddress,
        sendInviteEmail,
        registrationUrl,
      })

      return result
    },
    [mutation],
  )

  return { sendUserInvite }
}
