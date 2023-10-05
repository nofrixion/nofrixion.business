import {
  useDeleteUserRole,
  UserRoleAndUserInvite,
  UserRoleCreate,
  UserRoles,
  useUpdateUserRole,
} from '@nofrixion/moneymoov'

import UIUserDetailsModal from '../../ui/organisms/UserDetailsModal/UserDetailsModal'
import { makeToast } from '../../ui/Toast/Toast'

export interface UserDetailsModalProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  merchantId: string // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  user?: UserRoleAndUserInvite
  open: boolean
  onDismiss: () => void
}

const UserDetailsModal = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  open,
  onDismiss,
  user,
  merchantId,
}: UserDetailsModalProps) => {
  const { updateUserRole } = useUpdateUserRole({ apiUrl: apiUrl, authToken: token })
  const { deleteUserRole } = useDeleteUserRole({ apiUrl: apiUrl, authToken: token })

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
      makeToast('error', 'Could not update user role. ' + response.error.detail)
    } else {
      makeToast('success', 'User role updated.')

      onDismiss()
    }
  }

  const onDeleteUserRole = async (userRoleId: string) => {
    const response = await deleteUserRole(userRoleId)

    if (response.status === 'error') {
      makeToast('error', 'Could not delete user role. ' + response.error.detail)
    } else {
      makeToast('success', 'User role deleted.')

      onDismiss()
    }
  }

  return (
    <>
      <UIUserDetailsModal
        merchantId={merchantId}
        onDismiss={onDismiss}
        open={open}
        user={user}
        onUpdateUserRole={onUpdateUserRole}
        onDeleteUserRole={onDeleteUserRole}
      />
    </>
  )
}

export default UserDetailsModal
