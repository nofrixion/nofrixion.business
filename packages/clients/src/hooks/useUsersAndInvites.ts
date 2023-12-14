import { useQuery } from '@tanstack/react-query'

import { UsersClient } from '../clients'
import { formatSortExpression } from '../types'
import { ApiResponse, UserRoleAndUserInvitePageResponse } from '../types/ApiResponses'
import { ApiProps, SortByUsersAndInvites, useUsersAndInvitesProps } from '../types/props'

const fetchUsers = async (
  apiUrl: string,
  authToken?: string,
  merchantId?: string,
  pageNumber?: number,
  pageSize?: number,
  status?: string,
  sortBy?: SortByUsersAndInvites,
): Promise<ApiResponse<UserRoleAndUserInvitePageResponse>> => {
  const sortExpression = sortBy ? formatSortExpression(sortBy) : ''

  const client = new UsersClient({ apiUrl, authToken })

  const response = await client.getAllAndInvites({
    pageNumber: pageNumber,
    pageSize: pageSize,
    sort: sortExpression,
    merchantId: merchantId,
    status: status,
  })

  return response
}

export const useUsersAndInvites = (
  { merchantId, pageNumber, pageSize, status, sortBy }: useUsersAndInvitesProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'UsersAndInvites',
    apiUrl,
    authToken,
    merchantId,
    pageNumber,
    pageSize,
    status,
    sortBy,
  ]

  return useQuery<ApiResponse<UserRoleAndUserInvitePageResponse>, Error>(
    QUERY_KEY,
    () => fetchUsers(apiUrl, authToken, merchantId, pageNumber, pageSize, status, sortBy),
    {
      enabled: !!merchantId,
    },
  )
}
