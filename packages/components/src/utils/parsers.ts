import {
  Account,
  AccountIdentifier,
  AccountIdentifierType,
  Beneficiary,
  Counterparty,
  PartialPaymentMethods,
  PaymentMethodTypes,
  type PaymentRequest,
  type PaymentRequestAddress,
  type PaymentRequestCaptureAttempt,
  type PaymentRequestPaymentAttempt,
  type PaymentRequestRefundAttempt,
  PaymentResult,
  Payout,
  PayoutStatus,
  type Tag,
  Transaction,
  TransactionTypeValue,
  User,
  UserRolesEnum,
  UserStatus,
  Wallets,
} from '@nofrixion/moneymoov'

import {
  LocalAccountIdentifierType,
  LocalAddressType,
  LocalPartialPaymentMethods,
  LocalPaymentMethodTypes,
  LocalWallets,
} from '../types/LocalEnums'
import {
  LocalAccount,
  LocalAccountIdentifier,
  LocalAddress,
  LocalBeneficiary,
  LocalCounterparty,
  LocalPaymentAttempt,
  LocalPaymentRequest,
  LocalPaymentRequestCaptureAttempt,
  LocalPaymentRequestRefundAttempt,
  LocalPaymentStatus,
  LocalPayout,
  LocalTag,
  LocalTransaction,
  LocalUser,
} from '../types/LocalTypes'

const parseApiTagToLocalTag = (tag: Tag): LocalTag => {
  return {
    id: tag.id,
    name: tag.name,
    colourHex: tag.colourHex,
    description: tag.description,
    merchantID: tag.merchantID,
  }
}

const parseLocalTagToApiTag = (tag: LocalTag): Tag => {
  return {
    id: tag.id,
    name: tag.name,
    colourHex: tag.colourHex,
    description: tag.description,
    merchantID: tag.merchantID,
  }
}

const remotePaymentRequestToLocalPaymentRequest = (
  remotePaymentRequest: PaymentRequest,
): LocalPaymentRequest => {
  const { addresses, inserted, customerEmailAddress, amount, currency, status, tags } =
    remotePaymentRequest

  const parseApiStatusToLocalStatus = (status: PaymentResult): LocalPaymentStatus => {
    switch (status) {
      case PaymentResult.FullyPaid:
        return 'paid'
      case PaymentResult.PartiallyPaid:
        return 'partial'
      case PaymentResult.OverPaid:
        return 'overpaid'
      case PaymentResult.Authorized:
        return 'authorized'
      default:
        return 'unpaid'
    }
  }

  const parseApiPaymentMethodTypeToLocalMethodType = (
    paymentMethodType: PaymentMethodTypes,
  ): LocalPaymentMethodTypes => {
    switch (paymentMethodType) {
      case PaymentMethodTypes.Card:
        return LocalPaymentMethodTypes.Card
      case PaymentMethodTypes.Pisp:
        return LocalPaymentMethodTypes.Pisp
      case PaymentMethodTypes.ApplePay:
        return LocalPaymentMethodTypes.ApplePay
      case PaymentMethodTypes.GooglePay:
        return LocalPaymentMethodTypes.GooglePay
      case PaymentMethodTypes.Lightning:
        return LocalPaymentMethodTypes.Lightning
      default:
        return LocalPaymentMethodTypes.None
    }
  }

  const parseApiPaymentMethodTypesToLocalPaymentMethodTypes = (
    paymentMethodTypes: string,
  ): LocalPaymentMethodTypes[] => {
    const paymentMethodTypesArray = paymentMethodTypes.split(',')
    const localPaymentMethodTypesArray: LocalPaymentMethodTypes[] = []

    paymentMethodTypesArray.forEach((paymentMethodType) => {
      paymentMethodType = paymentMethodType.trim()
      switch (paymentMethodType) {
        case 'card':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.Card)
          break
        case 'pisp':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.Pisp)
          break
        case 'applePay':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.ApplePay)
          break
        case 'googlePay':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.GooglePay)
          break
        case 'lightning':
          localPaymentMethodTypesArray.push(LocalPaymentMethodTypes.Lightning)
          break
        default:
          break
      }
    })

    return localPaymentMethodTypesArray
  }

  const parseApiAddressTypeToLocalAddressType = (addressType: string): LocalAddressType => {
    switch (addressType) {
      case 'Shipping':
        return LocalAddressType.Shipping
      case 'Billing':
        return LocalAddressType.Billing
      default:
        return LocalAddressType.Unknown
    }
  }

  const parseApiAddressToLocalAddress = (remoteAddress: PaymentRequestAddress): LocalAddress => {
    const {
      addressLine1,
      addressLine2,
      addressCity,
      addressCounty,
      addressPostCode,
      addressCountryCode,
      phone,
      email,
      addressType,
    } = remoteAddress
    return {
      addressLine1: addressLine1 ?? '',
      addressLine2: addressLine2 ?? '',
      addressCity: addressCity ?? '',
      addressCounty: addressCounty ?? '',
      addressPostCode: addressPostCode ?? '',
      addressCountryCode: addressCountryCode ?? '',
      phone: phone ?? '',
      email: email ?? '',
      addressType: parseApiAddressTypeToLocalAddressType(addressType),
    }
  }

  const parseApiWalletTypeToLocalWalletType = (walletType: Wallets): LocalWallets | undefined => {
    switch (walletType) {
      case Wallets.ApplePay:
        return LocalWallets.ApplePay
      case Wallets.GooglePay:
        return LocalWallets.GooglePay
      default:
        return undefined
    }
  }

  const parseApiPartialPaymentMethodToLocalPartialPaymentMethod = (
    partialPaymentMethod: PartialPaymentMethods,
  ): LocalPartialPaymentMethods => {
    switch (partialPaymentMethod) {
      case PartialPaymentMethods.None:
        return LocalPartialPaymentMethods.None
      case PartialPaymentMethods.Partial:
        return LocalPartialPaymentMethods.Partial
      default:
        return LocalPartialPaymentMethods.None
    }
  }

  const parseApiCaptureAttemptsToLocalCaptureAttempts = (
    remoteCaptureAttempts: PaymentRequestCaptureAttempt[],
  ): LocalPaymentRequestCaptureAttempt[] => {
    if (remoteCaptureAttempts.length === 0) {
      return []
    } else {
      const localCaptureAttempts: LocalPaymentRequestCaptureAttempt[] = []
      remoteCaptureAttempts.map((remoteCaptureAttempt) => {
        const { capturedAt, capturedAmount } = remoteCaptureAttempt
        localCaptureAttempts.push({
          capturedAt: new Date(capturedAt ?? 0),
          capturedAmount: capturedAmount,
        })
      })
      return localCaptureAttempts
    }
  }

  const parseApiRefundAttemptsToLocalRefundAttempts = (
    remoteRefundAttempts: PaymentRequestRefundAttempt[],
  ): LocalPaymentRequestRefundAttempt[] => {
    if (remoteRefundAttempts.length === 0) {
      return []
    } else {
      const localRefundAttempts: LocalPaymentRequestRefundAttempt[] = []
      remoteRefundAttempts.map((remoteRefundAttempt) => {
        const {
          refundPayoutID,
          refundInitiatedAt,
          refundSettledAt,
          refundCancelledAt,
          refundInitiatedAmount,
          refundSettledAmount,
          refundCancelledAmount,
          isCardVoid,
        } = remoteRefundAttempt
        localRefundAttempts.push({
          refundPayoutID: refundPayoutID,
          refundInitiatedAt: refundInitiatedAt ? new Date(refundInitiatedAt) : undefined,
          refundSettledAt: refundSettledAt ? new Date(refundSettledAt) : undefined,
          refundCancelledAt: refundCancelledAt ? new Date(refundCancelledAt) : undefined,
          refundInitiatedAmount: refundInitiatedAmount,
          refundSettledAmount: refundSettledAmount,
          refundCancelledAmount: refundCancelledAmount,
          isCardVoid: isCardVoid,
        })
      })
      return localRefundAttempts
    }
  }

  const parseApiPaymentAttemptsToLocalPaymentAttempts = (
    remotePaymentAttempts: PaymentRequestPaymentAttempt[],
  ): LocalPaymentAttempt[] => {
    if (remotePaymentAttempts.length === 0) {
      return []
    } else {
      const localPaymentAttempts: LocalPaymentAttempt[] = []
      remotePaymentAttempts
        .sort((a, b) => {
          return new Date(b.initiatedAt ?? 0).getTime() - new Date(a.initiatedAt ?? 0).getTime()
        })
        .map((remotePaymentAttempt) => {
          if (
            remotePaymentAttempt.settledAt ||
            remotePaymentAttempt.authorisedAt ||
            remotePaymentAttempt.cardAuthorisedAt
          ) {
            const {
              attemptKey,
              authorisedAt,
              settledAt,
              attemptedAmount,
              paymentMethod,
              settledAmount,
              captureAttempts,
              refundAttempts,
              currency,
              walletName,
              status,
              authorisedAmount,
              cardAuthorisedAmount,
              cardAuthorisedAt,
              reconciledTransactionID,
            } = remotePaymentAttempt

            localPaymentAttempts.push({
              attemptKey: attemptKey,
              occurredAt: new Date(settledAt ?? authorisedAt ?? cardAuthorisedAt ?? 0),
              paymentMethod: parseApiPaymentMethodTypeToLocalMethodType(paymentMethod),
              amount: attemptedAmount,
              currency: currency,
              processor: walletName ? parseApiWalletTypeToLocalWalletType(walletName) : undefined,
              settledAmount: settledAmount,
              captureAttempts: parseApiCaptureAttemptsToLocalCaptureAttempts(captureAttempts),
              refundAttempts: parseApiRefundAttemptsToLocalRefundAttempts(refundAttempts),
              authorisedAmount: authorisedAmount,
              cardAuthorisedAmount: cardAuthorisedAmount,
              wallet: walletName ? parseApiWalletTypeToLocalWalletType(walletName) : undefined,
              status: parseApiStatusToLocalStatus(status),
              reconciledTransactionID: reconciledTransactionID,
            })
          }
        })
      return localPaymentAttempts
    }
  }

  const parseApiUserToLocalUser = (remoteUser: User): LocalUser => {
    const { id, emailAddress, firstName, lastName } = remoteUser
    return {
      id: id,
      email: emailAddress,
      firstName: firstName,
      lastName: lastName,
    }
  }

  return {
    id: remotePaymentRequest.id,
    status: parseApiStatusToLocalStatus(status),
    createdAt: new Date(inserted),
    contact: {
      name: addresses.length
        ? `${addresses[0].firstName ?? ''} ${addresses[0].lastName ?? ''}`.trim()
        : undefined,
      email: customerEmailAddress ?? undefined,
    },
    amount: amount,
    currency: currency,
    tags: tags.map((tag) => parseApiTagToLocalTag(tag)),
    paymentMethodTypes: parseApiPaymentMethodTypesToLocalPaymentMethodTypes(
      remotePaymentRequest.paymentMethodTypes,
    ),
    addresses: addresses.map((address) => parseApiAddressToLocalAddress(address)),
    description: remotePaymentRequest.description ?? '',
    productOrService: remotePaymentRequest.title ?? '',
    hostedPayCheckoutUrl: remotePaymentRequest.hostedPayCheckoutUrl ?? '',
    partialPaymentMethod: parseApiPartialPaymentMethodToLocalPartialPaymentMethod(
      remotePaymentRequest.partialPaymentMethod,
    ),
    paymentAttempts: parseApiPaymentAttemptsToLocalPaymentAttempts(
      remotePaymentRequest.paymentAttempts,
    ),
    priorityBankID: remotePaymentRequest.priorityBankID,
    notificationEmailAddresses: remotePaymentRequest.notificationEmailAddresses,
    captureFunds: !remotePaymentRequest.cardAuthorizeOnly,
    transactions: remoteTransactionsToLocal(remotePaymentRequest.transactions),
    pispAccountID: remotePaymentRequest.pispAccountID,
    title: remotePaymentRequest.title,
    customerName: remotePaymentRequest.customerName,
    createdByUser: remotePaymentRequest.createdByUser
      ? parseApiUserToLocalUser(remotePaymentRequest.createdByUser)
      : undefined,
    merchantTokenDescription: remotePaymentRequest.merchantTokenDescription,
  }
}

const parseApiAccountIdentifierTypeToLocalAccountIdentifierType = (
  accountIdentifierType: AccountIdentifierType,
): LocalAccountIdentifierType => {
  switch (accountIdentifierType) {
    case AccountIdentifierType.IBAN:
      return LocalAccountIdentifierType.IBAN
    case AccountIdentifierType.SCAN:
      return LocalAccountIdentifierType.SCAN
    default:
      return LocalAccountIdentifierType.IBAN
  }
}

const localAccountIdentifierTypeToRemoteAccountIdentifierType = (
  accountIdentifierType: LocalAccountIdentifierType,
): AccountIdentifierType => {
  switch (accountIdentifierType) {
    case LocalAccountIdentifierType.IBAN:
      return AccountIdentifierType.IBAN
    case LocalAccountIdentifierType.SCAN:
      return AccountIdentifierType.SCAN
    default:
      return AccountIdentifierType.IBAN
  }
}

const parseApiAccountIdentifierToLocalAccountIdentifier = (
  accountIdentifier: AccountIdentifier | undefined,
): LocalAccountIdentifier | undefined => {
  if (accountIdentifier) {
    return {
      type: parseApiAccountIdentifierTypeToLocalAccountIdentifierType(accountIdentifier.type),
      iban: accountIdentifier.iban ?? '',
      sortCode: accountIdentifier.sortCode,
      accountNumber: accountIdentifier.accountNumber,
      currency: accountIdentifier.currency,
    }
  } else {
    return undefined
  }
}

const localAccountIdentifierToRemoteAccountIdentifier = (
  accountIdentifier: LocalAccountIdentifier | undefined,
): AccountIdentifier | undefined => {
  if (accountIdentifier) {
    return {
      type: localAccountIdentifierTypeToRemoteAccountIdentifierType(accountIdentifier.type),
      iban: accountIdentifier.iban,
      sortCode: accountIdentifier.sortCode,
      accountNumber: accountIdentifier.accountNumber,
      currency: accountIdentifier.currency,
    }
  } else {
    return undefined
  }
}

const parseApiCounterPartyToLocalCounterParty = (counterParty: Counterparty): LocalCounterparty => {
  return {
    name: counterParty.name,
    identifier: parseApiAccountIdentifierToLocalAccountIdentifier(counterParty.identifier),
    accountInfo:
      counterParty.identifier?.type == AccountIdentifierType.IBAN
        ? counterParty.identifier.iban
        : counterParty.identifier?.type == AccountIdentifierType.SCAN
        ? `${counterParty.identifier.sortCode} - ${counterParty.identifier.accountNumber}`
        : '',
  }
}

const localCounterPartyToRemoteCounterParty = (counterParty: LocalCounterparty): Counterparty => {
  return {
    name: counterParty.name,
    identifier: localAccountIdentifierToRemoteAccountIdentifier(counterParty.identifier),
  }
}

const remoteTransactionsToLocal = (transactions: Transaction[]): LocalTransaction[] => {
  return transactions.map((transaction) => {
    return {
      id: transaction.id,
      date: new Date(transaction.transactionDate),
      counterParty: parseApiCounterPartyToLocalCounterParty(transaction.counterparty),
      amount: transaction.amount,
      balanceAfterTx: transaction.balance,
      reference:
        transaction.amount > 0
          ? transaction.yourReference
          : transaction.yourReference ?? transaction.description,
      description: transaction.description,
      type: TransactionTypeValue[transaction.type],
    }
  })
}

const remotePayoutToLocal = (payout: Payout): LocalPayout => {
  return {
    id: payout.id,
    accountID: payout.accountID,
    merchantID: payout.merchantID,
    type: parseApiAccountIdentifierTypeToLocalAccountIdentifierType(payout.type),
    description: payout.description,
    currency: payout.currency,
    amount: payout.amount,
    yourReference: payout.yourReference,
    theirReference: payout.theirReference,
    status: payout.status,
    createdBy: payout.createdBy,
    inserted: payout.inserted,
    sourceAccountName: payout.sourceAccountName,
    sourceAccountNumber: payout.sourceAccountNumber,
    sourceAccountSortCode: payout.sourceAccountSortCode,
    sourceAccountIban: payout.sourceAccountIban,
    destination: payout.destination
      ? parseApiCounterPartyToLocalCounterParty(payout.destination)
      : undefined,
    tags: payout.tags.map((tag) => parseApiTagToLocalTag(tag)),
  }
}

const remotePayoutsToLocal = (payouts: Payout[]): LocalPayout[] => {
  return payouts.map((payout) => {
    return remotePayoutToLocal(payout)
  })
}

const remoteAccountToLocalAccount = (remoteAccount: Account): LocalAccount => {
  const {
    id,
    merchantID,
    accountName,
    accountNumber,
    availableBalance,
    balance,
    currency,
    displayName,
    iban,
    sortCode,
    summary,
    identifier,
    isDefault,
  } = remoteAccount

  return {
    id: id,
    merchantID: merchantID,
    accountName: accountName,
    accountNumber: accountNumber,
    availableBalance: availableBalance,
    balance: balance,
    currency: currency,
    displayName: displayName,
    iban: iban,
    sortCode: sortCode,
    summary: summary,
    identifier: parseApiAccountIdentifierToLocalAccountIdentifier(identifier)!,
    isDefault: isDefault,
  }
}

const remoteAccountsToLocalAccounts = (remoteAccounts: Account[]): LocalAccount[] => {
  return remoteAccounts.map((remoteAccount) => {
    return remoteAccountToLocalAccount(remoteAccount)
  })
}

const remoteBeneficiaryToLocalBeneficiary = (remoteBeneficiary: Beneficiary): LocalBeneficiary => {
  const { id, merchantID, name, yourReference, theirReference, currency, destination } =
    remoteBeneficiary

  return {
    id: id,
    merchantID: merchantID,
    name: name,
    yourReference: yourReference,
    theirReference: theirReference,
    currency: currency,
    destination: parseApiCounterPartyToLocalCounterParty(destination),
  }
}

const remoteBeneficiariesToLocalBeneficiaries = (
  remoteBeneficiaries: Beneficiary[],
): LocalBeneficiary[] => {
  return remoteBeneficiaries.map((remoteBeneficiary) => {
    return remoteBeneficiaryToLocalBeneficiary(remoteBeneficiary)
  })
}

const payoutStatusToStatus = (
  status: PayoutStatus,
):
  | 'paid'
  | 'partial'
  | 'unpaid'
  | 'pending'
  | 'failed'
  | 'pending_approval'
  | 'inprogress'
  | null
  | undefined => {
  switch (status) {
    case PayoutStatus.PENDING_INPUT:
    case PayoutStatus.QUEUED:
    case PayoutStatus.QUEUED_UPSTREAM:
    case PayoutStatus.PENDING:
      return 'inprogress'
    case PayoutStatus.PROCESSED:
      return 'paid'
    case PayoutStatus.PENDING_APPROVAL:
      return 'pending_approval'
    case PayoutStatus.FAILED:
    case PayoutStatus.REJECTED:
      return 'failed'
    default:
      return undefined
  }
}

const userStatusToStatus = (status: UserStatus) => {
  switch (status) {
    case UserStatus.Active:
      return 'active'
    case UserStatus.Invited:
      return 'invited'
    case UserStatus.RolePending:
      return 'role_pending'
  }
}

const userRoleToDisplay = (status: UserRolesEnum) => {
  switch (status) {
    case UserRolesEnum.AdminApprover:
      return 'Admin Approver'
    case UserRolesEnum.Approver:
      return 'Approver'
    case UserRolesEnum.NewlyRegistered:
      return 'Newly Registered'
    case UserRolesEnum.User:
      return 'User'
    case UserRolesEnum.PaymentRequestor:
      return 'Payment Requestor'
  }
}

export {
  localAccountIdentifierTypeToRemoteAccountIdentifierType,
  localCounterPartyToRemoteCounterParty,
  parseApiTagToLocalTag,
  parseLocalTagToApiTag,
  payoutStatusToStatus,
  remoteAccountsToLocalAccounts,
  remoteBeneficiariesToLocalBeneficiaries,
  remoteBeneficiaryToLocalBeneficiary,
  remotePaymentRequestToLocalPaymentRequest,
  remotePayoutsToLocal,
  remotePayoutToLocal,
  remoteTransactionsToLocal,
  userRoleToDisplay,
  userStatusToStatus,
}
