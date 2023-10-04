import { useEffect, useState } from 'react'

import { validateEmail } from '../../../utils/validation'
import { Button, Sheet, SheetContent } from '../atoms'
import InputTextField from '../atoms/InputTextField/InputTextField'
import { ValidationMessage } from '../atoms/ValidationMessage/ValidationMessage'
import { Loader } from '../Loader/Loader'

export interface InviteUserModalProps {
  merchantID: string
  onInvite: (
    merchantID: string,
    firstName: string | undefined,
    lastName: string | undefined,
    emailAddress: string | undefined,
  ) => Promise<void>
  onDismiss: () => void
  isOpen: boolean
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({
  merchantID,
  onInvite,
  onDismiss,
  isOpen,
}) => {
  const [isInviteButtonDisabled, setIsInviteButtonDisabled] = useState(false)

  const [formError, setFormError] = useState<string | undefined>(undefined)
  const [firstName, setFirstName] = useState<string | undefined>(undefined)
  const [lastName, setLastName] = useState<string | undefined>(undefined)
  const [emailAddress, setEmailAddress] = useState<string | undefined>(undefined)

  const [sendInviteClicked, setSendInviteClicked] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      resetFields()
    }
  }, [isOpen])

  const handleValidation = (): boolean => {
    let validationFailed = false
    if (!emailAddress) {
      setFormError('Please fill all the required fields')
      validationFailed = true
    }

    return validationFailed
  }

  const onInviteClick = async () => {
    setSendInviteClicked(true)
    if (handleValidation()) {
      return
    } else {
      await onInvite(merchantID, firstName, lastName, emailAddress)

      setIsInviteButtonDisabled(false)
    }
  }
  const resetFields = () => {
    setFirstName(undefined)
    setLastName(undefined)
    setEmailAddress(undefined)
    setFormError(undefined)
    setSendInviteClicked(false)
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  const onValidateEmail = (email: string) => {
    if (email && !validateEmail(email)) {
      return 'Make sure the email address is valid.'
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleOnOpenChange}>
        <SheetContent className="w-full lg:w-[37.5rem]">
          <div className="bg-white h-screen overflow-auto lg:w-[37.5rem] px-8 py-8">
            <div className="h-fit mb-[7.5rem] lg:mb-0">
              <span className="block text-2xl font-semibold text-default-text mt-8 mb-10">
                Invite user
              </span>
              <div className="lg:w-[27rem]">
                <div className="text-left mb-10">
                  <InputTextField
                    label="First name"
                    value={firstName ?? ''}
                    onChange={(value) => setFirstName(value)}
                  />
                </div>
                <div className="text-left mt-2 mb-10">
                  <InputTextField
                    label="Last name"
                    value={lastName ?? ''}
                    onChange={(value) => setLastName(value)}
                  />
                </div>
                <div className="text-left mt-2">
                  <InputTextField
                    label="Email address"
                    value={emailAddress ?? ''}
                    onChange={(value) => {
                      setFormError(undefined)
                      setSendInviteClicked(false)
                      setEmailAddress(value)
                    }}
                    warningValidation={onValidateEmail}
                    required
                    formSubmitted={sendInviteClicked}
                  />
                </div>

                <div className="lg:mt-16 lg:static lg:p-0 fixed bottom-16 left-0 w-full px-6 mx-auto pb-4 z-20">
                  <div>
                    <ValidationMessage label="form" variant="error" message={formError} />
                  </div>
                  <Button
                    variant="primaryDark"
                    size="big"
                    className="mt-4 disabled:!bg-grey-text disabled:!opacity-100 disabled:cursor-not-allowed lg:w-[10.25rem]"
                    onClick={() => onInviteClick()}
                    disabled={isInviteButtonDisabled}
                  >
                    {isInviteButtonDisabled ? (
                      <Loader className="h-6 w-6 mx-auto" />
                    ) : (
                      <span>Send invitation</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default InviteUserModal
