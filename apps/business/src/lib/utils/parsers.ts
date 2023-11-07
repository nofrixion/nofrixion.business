import { User, UserRoles } from '@nofrixion/moneymoov'

import { LocalUser, LocalUserRoles } from '../types/localTypes'

const parseApiUserToLocalUser = (remoteUser: User, merchantId: string | undefined): LocalUser => {
  const { id, emailAddress, firstName, lastName } = remoteUser

  return {
    id: id,
    emailAddress: emailAddress,
    firstName: firstName,
    lastName: lastName,
    role:
      parseApiUserRoleToLocalUserRole(
        remoteUser.roles.find((role) => role.merchantID === merchantId)?.roleType,
      ) ?? UserRoles.NewlyRegistered,
  }
}

const parseApiUserRolesToLocalUserRoles = (remoteUserRoles: UserRoles[]): LocalUserRoles[] => {
  return remoteUserRoles.map((role) => {
    return parseApiUserRoleToLocalUserRole(role)
  })
}

const parseApiUserRoleToLocalUserRole = (remoteUserRole: UserRoles | undefined): LocalUserRoles => {
  switch (remoteUserRole) {
    case UserRoles.User:
      return LocalUserRoles.User
    case UserRoles.Approver:
      return LocalUserRoles.Approver
    case UserRoles.AdminApprover:
      return LocalUserRoles.AdminApprover
    case UserRoles.PaymentRequestor:
      return LocalUserRoles.PaymentRequestor
    default:
      return LocalUserRoles.NewlyRegistered
  }
}

export {
  parseApiUserRolesToLocalUserRoles,
  parseApiUserRoleToLocalUserRole,
  parseApiUserToLocalUser,
}
