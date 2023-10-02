import { useQuery } from '@tanstack/react-query'

import { UsersClient } from '../clients'
import { formatSortExpression, SortDirection } from '../types'
import { ApiResponse, UserRoleAndUserInvitePageResponse } from '../types/ApiResponses'
import { ApiProps, useUsersAndInvitesProps } from '../types/props'

const fetchUsers = async (
  apiUrl: string,
  statusSortDirection: SortDirection,
  lastModifiedSortDirection: SortDirection,
  nameSortDirection: SortDirection,
  roleSortDirection: SortDirection,
  authToken?: string,
  merchantId?: string,
  pageNumber?: number,
  pageSize?: number,
): Promise<ApiResponse<UserRoleAndUserInvitePageResponse>> => {
  const sortExpression = formatSortExpression({
    statusSortDirection: statusSortDirection,
    lastModifiedSortDirection: lastModifiedSortDirection,
    nameSortDirection: nameSortDirection,
    roleSortDirection: roleSortDirection,
  })

  const client = new UsersClient({ apiUrl, authToken })

  const response = await client.getAllAndInvites({
    pageNumber: pageNumber,
    pageSize: pageSize,
    sort: sortExpression,
    merchantId: merchantId,
  })

  return response
}

export const useUsersAndInvites = (
  {
    merchantId,
    statusSortDirection,
    lastModifiedSortDirection,
    nameSortDirection,
    roleSortDirection,
    pageNumber,
    pageSize,
  }: useUsersAndInvitesProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'UsersAndInvites',
    apiUrl,
    authToken,
    merchantId,
    statusSortDirection,
    lastModifiedSortDirection,
    nameSortDirection,
    roleSortDirection,
    pageNumber,
    pageSize,
  ]

  return useQuery<ApiResponse<UserRoleAndUserInvitePageResponse>, Error>(
    QUERY_KEY,
    () =>
      fetchUsers(
        apiUrl,
        statusSortDirection,
        lastModifiedSortDirection,
        nameSortDirection,
        roleSortDirection,
        authToken,
        merchantId,
        pageNumber,
        pageSize,
      ),
    {
      enabled: !!merchantId,
    },
  )
}
