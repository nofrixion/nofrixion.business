/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApiError,
  SortDirection,
  UserInvitesClient,
  UserMetrics,
  UserRoleAndUserInvite,
  UserStatus,
  useUsersAndInvites,
  useUsersAndInvitesMetrics,
} from '@nofrixion/moneymoov'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { UserDashboard as UIUserDashboard } from '../../ui/pages/UserDashboard/UserDashboard'
import { makeToast } from '../../ui/Toast/Toast'
import InviteUserModal from '../InviteUserModal/InviteUserModal'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState<UserStatus>(UserStatus.All)
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
  const [metrics, setMetrics] = useState<UserMetrics | undefined>(undefined)
  const [inviteUserClicked, setInviteUserClicked] = useState(false)

  const { data: usersResponse, isLoading: isLoadingUsers } = useUsersAndInvites(
    {
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      roleSortDirection: roleSortDirection,
      nameSortDirection: nameSortDirection,
      statusSortDirection: statusSortDirection,
      lastModifiedSortDirection: lastmodifiedSortDirection,
      status: status,
    },
    { apiUrl: apiUrl, authToken: token },
  )

  const { data: metricsResponse, isLoading: isLoadingMetrics } = useUsersAndInvitesMetrics(
    {
      merchantId: merchantId,
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
      makeToast('error', 'Error fetching users.')
      console.error(usersResponse.error)
      handleApiError(usersResponse.error)
    }
  }, [usersResponse])

  useEffect(() => {
    if (metricsResponse?.status === 'success') {
      setMetrics(metricsResponse.data)
    } else if (metricsResponse?.status === 'error') {
      makeToast('error', 'Error fetching user metrics.')
      console.error(metricsResponse.error)
      handleApiError(metricsResponse.error)
    }
  }, [metricsResponse])

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
    setInviteUserClicked(true)
  }

  const onResendInvitation = async (inviteID?: string) => {
    if (!inviteID) {
      return
    }

    const client = new UserInvitesClient({ apiUrl: apiUrl, authToken: token })

    const response = await client.resendUserInvite({ inviteId: inviteID })

    if (response.status === 'success') {
      makeToast('success', 'Invitation resent successfully.')
    } else if (response.status === 'error') {
      makeToast('error', 'Error resending invitation. ' + response.error.detail)
      console.error(response.error)
    }
  }

  const onSetUserRole = async (userId?: string) => {
    console.log('Set user role', userId)
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
        onResendInvitation={onResendInvitation}
        onSetUserRole={onSetUserRole}
        metrics={metrics}
        isLoadingMetrics={isLoadingMetrics}
        status={status}
        setStatus={setStatus}
      />

      {merchantId && (
        <InviteUserModal
          merchantID={merchantId}
          apiUrl={apiUrl}
          token={token}
          isOpen={inviteUserClicked}
          onDismiss={() => {
            setInviteUserClicked(false)
          }}
        />
      )}
    </div>
  )
}

export default UserDashboard
