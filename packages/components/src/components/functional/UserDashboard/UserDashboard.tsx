import {
  ApiError,
  SortDirection,
  useResendUserInvitation,
  UserMetrics,
  UserRoleAndUserInvite,
  UserStatus,
  useUsersAndInvites,
  useUsersAndInvitesMetrics,
} from '@nofrixion/moneymoov'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { SortByUsersAndInvites } from '../../../types/Sort'
import { UserDashboard as UIUserDashboard } from '../../ui/pages/UserDashboard/UserDashboard'
import { makeToast } from '../../ui/Toast/Toast'
import InviteUserModal from '../InviteUserModal/InviteUserModal'
import UserDetailsModal from '../UserDetailsModal/UserDetailsModal'

export interface UserDashboardProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string
  merchantName: string
  onUnauthorized: () => void
}

const UserDashboard = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  merchantName,
  onUnauthorized,
}: UserDashboardProps) => {
  const queryClient = useQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <UserDashboardMain
        token={token}
        merchantId={merchantId}
        merchantName={merchantName}
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
  merchantName,
  onUnauthorized,
}: UserDashboardProps) => {
  const [status, setStatus] = useState<UserStatus>(UserStatus.All)
  const [users, setUsers] = useState<UserRoleAndUserInvite[] | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [sortBy, setSortBy] = useState<SortByUsersAndInvites>({
    direction: SortDirection.NONE,
    name: 'lastModified',
  })

  const [selectedUser, setSelectedUser] = useState<UserRoleAndUserInvite | undefined>(undefined)
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined)
  const [metrics, setMetrics] = useState<UserMetrics | undefined>(undefined)
  const [inviteUserClicked, setInviteUserClicked] = useState(false)

  const { data: usersResponse, isLoading: isLoadingUsers } = useUsersAndInvites(
    {
      merchantId: merchantId,
      pageNumber: page,
      pageSize: pageSize,
      sortBy: sortBy,
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

  const { resendUserInvitation } = useResendUserInvitation({ apiUrl: apiUrl, authToken: token })

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

  const onUserRowClicked = (user: UserRoleAndUserInvite) => {
    setSelectedUser(user)
    setSelectedUserId(user.userID)
  }

  const onInviteUser = () => {
    setInviteUserClicked(true)
  }

  const onResendInvitation = async (inviteID?: string) => {
    if (!inviteID) {
      return
    }

    const response = await resendUserInvitation(inviteID)

    if (response.status === 'success') {
      makeToast('success', 'Invitation resent successfully.')
    } else if (response.status === 'error') {
      makeToast('error', 'Error resending invitation. ' + response.error.detail)
      console.error(response.error)
    }
  }

  const onDismissUserDetailsModal = () => {
    setSelectedUser(undefined)
    setSelectedUserId(undefined)
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
        sortBy={sortBy}
        onSort={setSortBy}
        isLoading={isLoadingUsers}
        onUserClicked={onUserRowClicked}
        selectedUserId={selectedUserId}
        onInviteUser={onInviteUser}
        onResendInvitation={onResendInvitation}
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

      {merchantId && (
        <UserDetailsModal
          merchantId={merchantId}
          merchantName={merchantName}
          apiUrl={apiUrl}
          token={token}
          user={selectedUser}
          open={!!selectedUser}
          onDismiss={onDismissUserDetailsModal}
        />
      )}
    </div>
  )
}

export default UserDashboard
