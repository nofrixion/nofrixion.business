import {
  ApiError,
  SortDirection,
  UserRoleAndUserInvite,
  useUsersAndInvites,
} from '@nofrixion/moneymoov'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { UserDashboard as UIUserDashboard } from '../../ui/pages/UserDashboard/UserDashboard'
import { makeToast } from '../../ui/Toast/Toast'

export interface UserDashboardProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string
  onUnauthorized: () => void
}

const UserDashboard = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: UserDashboardProps) => {
  const queryClient = useQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <UserDashboardMain
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
        onUnauthorized={onUnauthorized}
      />
    </QueryClientProvider>
  )
}

const pageSize = 20

const UserDashboardMain = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
}: UserDashboardProps) => {
  const [users, setUsers] = useState<UserRoleAndUserInvite[] | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [statusSortDirection, setStatusSortDirection] = useState<SortDirection>(SortDirection.NONE)
  const [lastmodifiedSortDirection, setLastmodifiedSortDirection] = useState<SortDirection>(
    SortDirection.NONE,
  )
  const [roleSortDirection, setRoleSortDirection] = useState<SortDirection>(SortDirection.NONE)
  const [nameSortDirection, setNameSortDirection] = useState<SortDirection>(SortDirection.NONE)

  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined)

  const { data: usersResponse, isLoading: isLoadingUsers } = useUsersAndInvites(
    {
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      roleSortDirection: roleSortDirection,
      nameSortDirection: nameSortDirection,
      statusSortDirection: statusSortDirection,
      lastModifiedSortDirection: lastmodifiedSortDirection,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  useEffect(() => {
    setPage(1)
    setUsers(undefined)
  }, [merchantId])

  useEffect(() => {
    if (usersResponse?.status === 'success') {
      setUsers(usersResponse.data.content)
      setTotalRecords(usersResponse.data.totalSize)
    } else if (usersResponse?.status === 'error') {
      makeToast('error', 'Error fetching payment requests.')
      console.error(usersResponse.error)
      handleApiError(usersResponse.error)
    }
  }, [usersResponse])

  const handleApiError = (error: ApiError) => {
    if (error && error.status === 401) {
      onUnauthorized()
    }
  }

  const onPageChange = (page: number) => {
    setPage(page)
  }

  const onSort = (
    column: 'lastmodified' | 'name' | 'status' | 'role',
    direction: SortDirection,
  ) => {
    switch (column) {
      case 'status':
        setStatusSortDirection(direction)
        break
      case 'lastmodified':
        setLastmodifiedSortDirection(direction)
        break
      case 'name':
        setNameSortDirection(direction)
        break
      case 'role':
        setRoleSortDirection(direction)
        break
    }
  }

  const onUserRowClicked = (user: UserRoleAndUserInvite) => {
    setSelectedUserId(user.userID)
  }

  const onInviteUser = () => {
    console.log('Invite user')
  }

  return (
    <div>
      <UIUserDashboard
        users={users}
        pagination={{
          pageSize: pageSize,
          totalSize: totalRecords,
        }}
        onPageChange={onPageChange}
        onSort={onSort}
        isLoading={isLoadingUsers}
        onUserClicked={onUserRowClicked}
        selectedUserId={selectedUserId}
        onInviteUser={onInviteUser}
      />
    </div>
  )
}

export default UserDashboard
