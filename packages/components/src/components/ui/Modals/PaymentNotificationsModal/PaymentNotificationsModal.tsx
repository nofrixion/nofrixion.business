import { NotificationEmailsDefaults } from '@nofrixion/moneymoov'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { LocalPaymentNotificationsFormValue } from '../../../../types/LocalTypes'
import { validateEmail } from '../../../../utils/validation'
import CustomModal, { BaseModalProps } from '../../CustomModal/CustomModal'
import InputTextField from '../../InputTextField/InputTextField'
import AnimateHeightWrapper from '../../utils/AnimateHeight'

export interface NotificationEmailsModalProps extends BaseModalProps {
  userDefaults?: NotificationEmailsDefaults
  onApply: (data: LocalPaymentNotificationsFormValue) => void
  isPrefilledData: boolean
}

const PaymentNotificationsModal = ({
  open,
  userDefaults,
  onDismiss,
  onApply,
}: NotificationEmailsModalProps) => {
  const [email, setEmail] = useState(userDefaults ? userDefaults.emailAddresses : '')
  const [hasEmailError, setHasEmailError] = useState(false)
  const [currentState, setCurrentState] = useState<LocalPaymentNotificationsFormValue>()

  // When the user clicks on the Apply button, we need to send the data to the parent component
  const onApplyClicked = (data: any) => {
    const formData: LocalPaymentNotificationsFormValue = {
      emailAddresses: email,
      isDefault: data.isDefaultChecked,
    }

    onApply(formData)
    setCurrentState(formData)

    return formData
  }

  const onValidateEmails = (emails: string) => {
    if (!emails) {
      setHasEmailError(false)
    }

    let hasError = false

    if (emails) {
      emails
        .split(',')
        .map((email) => email.trim())
        .map((email) => {
          if (!validateEmail(email)) {
            hasError = true
          }
        })
    }

    setHasEmailError(hasError)
  }

  const handleOnDismiss = () => {
    onDismiss()

    // Reset to initial state
    if (currentState) {
      setEmail(currentState.emailAddresses)
      setHasEmailError(false)
    } else {
      setEmail(userDefaults ? userDefaults.emailAddresses : '')
      setHasEmailError(false)
    }
  }

  return (
    <CustomModal
      title="Payment notifications"
      open={open}
      onDismiss={handleOnDismiss}
      onApply={onApplyClicked}
      onApplyEnabled={!hasEmailError}
    >
      <div className="text-default-text font-normal text-sm mb-6">
        Send a notification to the specified email addresses when the payment is completed.
      </div>
      <div>
        <InputTextField
          label="Email address"
          autoComplete="email"
          value={email}
          type="email"
          maxLength={254}
          onChange={(e) => {
            setEmail(e.target.value)
            if (hasEmailError) {
              onValidateEmails(e.target.value)
            }
          }}
          onBlur={(e) => onValidateEmails(e.target.value)}
        />

        <AnimatePresence>
          {hasEmailError && (
            <AnimateHeightWrapper layoutId="email-error">
              <div className="mt-2 bg-[#FCF5CF] text-sm p-3 w-fill rounded">
                Make sure the email address is valid.
              </div>
            </AnimateHeightWrapper>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-2 text-grey-text font-normal text-xs">
        Use commas to include more than one email address.
      </div>
    </CustomModal>
  )
}

export default PaymentNotificationsModal
