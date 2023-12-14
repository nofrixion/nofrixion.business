import {
  useDeleteUserRole,
  User,
  UserRoleAndUserInvite,
  UserRoleCreate,
  UserRoles,
  useUpdateUserRole,
  useUser,
} from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { SystemError } from '../../../types/LocalTypes'
import RevokeUserAccessModal from '../../ui/Modals/RevokeUserAccessModal/RevokeUserAccessModal'
import UIUserDetailsModal from '../../ui/organisms/UserDetailsModal/UserDetailsModal'
import { makeToast } from '../../ui/Toast/Toast'

export interface UserDetailsModalProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  merchantId: string // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  merchantName: string // Example: "Acme"
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  user?: UserRoleAndUserInvite
  open: boolean
  onDismiss: () => void
  onSystemError: (systemError: SystemError) => void
}

const UserDetailsModal = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  open,
  onDismiss,
  user,
  merchantId,
  merchantName,
  onSystemError,
}: UserDetailsModalProps) => {
  const { updateUserRole } = useUpdateUserRole({ apiUrl: apiUrl, authToken: token })
  const { deleteUserRole } = useDeleteUserRole({ apiUrl: apiUrl, authToken: token })
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [revokeAccessModalOpen, setRevokeAccessModalOpen] = useState(false)
  const [isRevokingAccess, setIsRevokingAccess] = useState(false)

  const { data: userResponse } = useUser({
    apiUrl: apiUrl,
  })

  useEffect(() => {
    if (userResponse?.status === 'success') {
      setCurrentUser(userResponse.data)
    }
  }, [userResponse])

  const onUpdateUserRole = async (
    merchantId: string,
    emailAddress: string,
    userRole: UserRoles,
  ) => {
    const userRoleCreate: UserRoleCreate = {
      merchantID: merchantId,
      emailAddress: emailAddress,
      userRole: userRole,
    }

    const response = await updateUserRole(userRoleCreate)

    if (response.status === 'error') {
      return response.error
    } else {
      makeToast('success', 'User role updated.')

      onDismiss()
    }
  }

  const onDeleteUserRole = async (userRoleId?: string) => {
    if (!userRoleId) {
      makeToast('error', 'Could not delete user role. User role ID is missing.')
      return
    }

    setIsRevokingAccess(true)

    const response = await deleteUserRole(userRoleId)

    if (response.status === 'error') {
      onSystemError({
        title: 'Revoke user access has failed',
        message: response.error.detail,
      })
    } else {
      makeToast('success', 'User role deleted.')
      onDismiss()
    }

    setRevokeAccessModalOpen(false)
    setIsRevokingAccess(false)
  }

  const handleOnRevokeAccess = () => {
    setRevokeAccessModalOpen(true)
  }

  return (
    <>
      {user && merchantId && (
        <UIUserDetailsModal
          merchantId={merchantId}
          onDismiss={onDismiss}
          open={open}
          user={user}
          currentUser={currentUser}
          onUpdateUserRole={onUpdateUserRole}
          onDeleteUserRole={handleOnRevokeAccess}
        />
      )}

      <RevokeUserAccessModal
        userName={user?.name || ''}
        merchantName={merchantName}
        onApply={() => onDeleteUserRole(user?.userRoleID)}
        onDismiss={() => setRevokeAccessModalOpen(false)}
        isRevokingAccess={isRevokingAccess}
        open={revokeAccessModalOpen}
      />
    </>
  )
}

export default UserDetailsModal
