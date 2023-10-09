import { AnimatePresence } from 'framer-motion'

import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal'
import AnimateHeightWrapper from '../../utils/AnimateHeight'

export interface RevokeUserAccessModalProps extends BaseModalProps {
  userName: string
  merchantName: string
  onApply: () => void
  onDismiss: () => void
  isRevokingAccess: boolean
}

const RevokeUserAccessModal = ({
  userName,
  merchantName,
  onApply,
  onDismiss,
  open,
  isRevokingAccess,
}: RevokeUserAccessModalProps) => {
  const userNameWithApostrophe = userName + (userName.endsWith('s') ? "'" : "'s")

  return (
    <CustomModal
      title="Revoke access"
      open={open}
      onApply={onApply}
      onDismiss={onDismiss}
      showDefault={false}
      buttonText="Revoke access"
      onApplyEnabled={!isRevokingAccess}
      buttonClaseName="w-full md:w-auto ml-auto px-6 py-3 bg-darker-negative-red hover:bg-negative-red"
    >
      <AnimatePresence>
        <AnimateHeightWrapper layoutId="select-priority-bank">
          <div className="text-sm font-normal text-default-text">
            Once you revoke <b>{userNameWithApostrophe}</b> access, they will no longer be able to
            see or perform any actions on the <b>{merchantName}</b> account. You can always invite
            them again. All historical activity data will remain intact.
          </div>
        </AnimateHeightWrapper>
      </AnimatePresence>
    </CustomModal>
  )
}

export default RevokeUserAccessModal
