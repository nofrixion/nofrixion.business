import { PaymentConditionsDefaults } from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { LocalPaymentConditionsFormValue } from '../../../../types/LocalTypes'
import Checkbox from '../../Checkbox/Checkbox'
import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal'

export interface PaymentConditionsModalProps extends BaseModalProps {
  userDefaults?: PaymentConditionsDefaults
  onApply: (data: LocalPaymentConditionsFormValue) => void
  isPrefilledData: boolean
}

const PaymentConditionsModal = ({
  open,
  userDefaults,
  onDismiss,
  onApply,
  isPrefilledData = false,
}: PaymentConditionsModalProps) => {
  const [isAllowPartialEnabled, setIsAllowPartialEnabled] = useState<boolean>(false)
  const [currentState, setCurrentState] = useState<LocalPaymentConditionsFormValue>()
  const [isDefault, setIsDefault] = useState<boolean>(!isPrefilledData && !!userDefaults)

  useEffect(() => {
    if (userDefaults) {
      setIsAllowPartialEnabled(userDefaults.allowPartialPayments)
    }
  }, [userDefaults])

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = (data: any) => {
    const formData: LocalPaymentConditionsFormValue = {
      allowPartialPayments: isAllowPartialEnabled,
      isDefault: data.isDefaultChecked,
    }

    onApply(formData)
    setCurrentState(formData)

    return formData
  }

  const handleOnDismiss = () => {
    onDismiss()

    // Reset to initial state
    if (currentState) {
      setIsDefault(currentState.isDefault)
      setIsAllowPartialEnabled(currentState.allowPartialPayments)
    } else {
      setIsAllowPartialEnabled(userDefaults ? userDefaults.allowPartialPayments : false)
    }
  }

  return (
    <CustomModal
      title="Payment conditions"
      open={open}
      onDismiss={handleOnDismiss}
      onApply={onApplyClicked}
      defaultChecked={isDefault}
    >
      <div className="py-1">
        <Checkbox
          label="Allow partial payments"
          description="Enable customers to pay a portion of the total amount owed, rather than the full balance all at once."
          value={isAllowPartialEnabled}
          onChange={setIsAllowPartialEnabled}
        />
      </div>
    </CustomModal>
  )
}

export default PaymentConditionsModal
