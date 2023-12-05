import { ApiError, User, UserRoleAndUserInvite, UserRoles } from '@nofrixion/moneymoov'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { SystemError } from '../../../../types/LocalTypes'
import { userStatusToStatus } from '../../../../utils/parsers'
import { Button, Sheet, SheetContent } from '../../../ui/atoms'
import InlineError from '../../InlineError/InlineError'
import { Status } from '../../molecules'
import Select from '../../Select/Select'

export interface UserDetailsModalProps {
  user?: UserRoleAndUserInvite
  currentUser?: User
  open: boolean
  merchantId: string
  onDismiss: () => void
  onUpdateUserRole: (merchantId: string, emailAddress: string, userRole: UserRoles) => Promise<ApiError | undefined>
  onDeleteUserRole: (userRoleId: string) => void
}

const UserDetailsModal = ({
  user,
  currentUser,
  open,
  merchantId,
  onDismiss,
  onUpdateUserRole,
  onDeleteUserRole,
}: UserDetailsModalProps) => {
  const [roleChanged, setRoleChanged] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRoles | undefined>(user?.roleType)
  const [disabled, setDisabled] = useState(false)

  const [showUserRoleError, setShowUserRoleError] = useState(false)
  const [userRoleError, setUserRoleError] = useState<SystemError | undefined>(undefined)

  useEffect(() => {
    if (user) {
      if (user.roleType === UserRoles.NewlyRegistered) {
        setSelectedRole(UserRoles.User)
      } else {
        setSelectedRole(user.roleType)
      }

      setDisabled(false)
      setRoleChanged(false)
    }
  }, [user])

  const userRoles = [
    { value: UserRoles.User as string, label: 'User' },
    { value: UserRoles.Approver as string, label: 'Approver' },
    { value: UserRoles.AdminApprover as string, label: 'Admin Approver' },
    { value: UserRoles.PaymentRequestor as string, label: 'Payment Requester' },
  ]

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
      setDisabled(false)
      setShowUserRoleError(false)
      setUserRoleError(undefined)
    }
  }

  const handleRoleChange = (role: UserRoles) => {
    if (role !== user?.roleType) {
      setSelectedRole(role)
      setRoleChanged(true)
    } else {
      setSelectedRole(role)
      setRoleChanged(false)
    }
  }

  const handleUpdateUserRole = async () => {
    setShowUserRoleError(false)
    setUserRoleError(undefined)
    setDisabled(true)

    const apiError = await onUpdateUserRole(merchantId, user?.emailAddress ?? '', selectedRole ?? UserRoles.User)
    if (apiError) {
      setUserRoleError({ title: 'Update user role has failed', message: apiError.detail })
      setShowUserRoleError(true)
    }
  }

  const onRevokeAccessClickedHandler = (
    event: React.MouseEvent<HTMLTableRowElement | HTMLButtonElement | HTMLDivElement, MouseEvent>,
    userRoleId?: string,
  ) => {
    event.stopPropagation()
    userRoleId && onDeleteUserRole(userRoleId)
  }

  return (
    <Sheet open={open} onOpenChange={handleOnOpenChange}>
      <SheetContent
        onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}
        className="w-full lg:w-[37.5rem] outline-none"
      >
        {user && (
          <div className="bg-white max-h-full h-full">
            {(roleChanged || user.roleType === UserRoles.NewlyRegistered) && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                  },
                }}
                transition={{ duration: 0.2 }}
                className="flex bg-main-grey h-[72px] justify-end space-x-4 pr-8"
              >
                <div className="my-auto">
                  <Button
                    variant="primary"
                    size={'medium'}
                    onClick={handleUpdateUserRole}
                    disabled={disabled}
                  >
                    Confirm new role
                  </Button>
                </div>
              </motion.div>
            )}
            <div className="flex pt-10 mx-8 justify-between items-center">
              <span className="text-[2rem] font-semibold leading-8 text-default-text tabular-nums pt-1">
                {user.name !== '' ? user.name : user.emailAddress}
              </span>

              <Status size="large" variant={userStatusToStatus(user.status)} />
            </div>
            <div className="mt-16 mx-8 w-11/12">
              <div className="flex text-sm">
                <div className="text-grey-text w-1/3">Email address</div>
                <div>{user.emailAddress}</div>
              </div>
              <div className="flex text-sm mt-8">
                <div className="text-grey-text w-1/3">Role</div>
                <div className="pt-4 md:pt-0 w-1/2">
                  {currentUser?.id === user.userID && (
                    <span>{userRoles.find((role) => role.value === user.roleType)?.label}</span>
                  )}
                  {currentUser?.id !== user.userID && (
                    <Select
                      options={userRoles.map((role) => {
                        return {
                          value: role.value,
                          label: role.label,
                        }
                      })}
                      onChange={(selectedOption) => {
                        handleRoleChange(selectedOption.value as UserRoles)
                      }}
                      selected={
                        userRoles.find((role) => role.value === selectedRole) ?? userRoles[0]
                      }
                    />
                  )}
                </div>
              </div>
              <div className="flex text-sm mt-8">
                <div className="text-grey-text w-1/3"></div>
                <div className="pt-4 md:pt-0 w-1/2">
                  {user &&
                    user.userRoleID &&
                    user.roleType !== UserRoles.NewlyRegistered &&
                    currentUser?.id !== user.userID && (
                      <Button
                        variant={'tertiary_negative'}
                        size={'small'}
                        onClick={(event) => onRevokeAccessClickedHandler(event, user.userRoleID)}
                        className="w-fit"
                      >
                        Revoke access
                      </Button>
                    )}
                </div>
              </div>
              {showUserRoleError && userRoleError && (
                <div className="lg:mt-14">
                  <InlineError
                    title={userRoleError.title}
                    messages={[userRoleError.message]}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default UserDetailsModal
