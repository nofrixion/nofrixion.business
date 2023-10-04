import { UserInviteCreate, useSendUserInvite } from '@nofrixion/moneymoov'

import UIInviteUserModal from '../../ui/InviteUserModal/InviteUserModal'
import { makeToast } from '../../ui/Toast/Toast'

export interface InviteUserModalProps {
  token?: string // Example: "eyJhbGciOiJIUz..."
  merchantID: string // Example: "bf9e1828-c6a1-4cc5-a012-08daf2ff1b2d"
  apiUrl?: string // Example: "https://api.nofrixion.com/api/v1"
  isOpen: boolean // When true, the modal will be open. When false, the modal will be closed.
  onDismiss: () => void // Callback function that will be called when the modal is asked to be closed.
}

const InviteUserModal = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  isOpen,
  onDismiss,
  merchantID,
}: InviteUserModalProps) => {
  const { sendUserInvite } = useSendUserInvite({ apiUrl: apiUrl, authToken: token })

  const onInvite = async (
    merchantID: string,
    firstName: string | undefined,
    lastName: string | undefined,
    emailAddress: string,
  ) => {
    const userInviteCreate: UserInviteCreate = {
      merchantID: merchantID,
      inviteeFirstName: firstName,
      inviteeLastName: lastName,
      inviteeEmailAddress: emailAddress,
      sendInviteEmail: true,
      registrationUrl: `${import.meta.env.VITE_PUBLIC_PORTAL_URL}/Home/Register?userInviteID={id}`,
    }

    const response = await sendUserInvite(userInviteCreate)

    if (response.status === 'error') {
      makeToast('error', 'Could not send invite. ' + response.error.detail)
    } else {
      makeToast('success', 'Invite sent.')

      onDismiss()
    }
  }

  return (
    <>
      <UIInviteUserModal
        onDismiss={onDismiss}
        isOpen={isOpen}
        onInvite={onInvite}
        merchantID={merchantID}
      />
    </>
  )
}

export default InviteUserModal
