import { AnimatePresence } from 'framer-motion'

import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal'
import AnimateHeightWrapper from '../../utils/AnimateHeight'

export interface RenewConnectionModalProps extends BaseModalProps {
  onApply: () => void
  onDismiss: () => void
  isConnectingToBank: boolean
}

const RenewConnectionModal = ({
  onApply,
  onDismiss,
  open,
  isConnectingToBank,
}: RenewConnectionModalProps) => {
  return (
    <CustomModal
      title="Renew connection"
      open={open}
      onApply={onApply}
      onDismiss={onDismiss}
      showDefault={false}
      buttonText="Continue"
      onApplyEnabled={!isConnectingToBank}
    >
      <AnimatePresence>
        <AnimateHeightWrapper layoutId="select-priority-bank">
          <div className="text-sm font-normal text-default-text">
            I hereby give my consent for NoFrixion to receive data from my bank. NoFrixion will
            receive access to information regarding the accounts you connect, their transactions and
            daily updates.This consent remains valid for 90 days or until you in writing withdraw
            your consent through NoFrixion. For further information please consult our Privacy
            Policy.
          </div>
        </AnimateHeightWrapper>
      </AnimatePresence>
    </CustomModal>
  )
}

export default RenewConnectionModal
