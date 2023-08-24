import {
  Account,
  AccountIdentifier,
  AccountIdentifierType,
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
  type Tag,
  Transaction,
  TransactionTypeValue,
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
  LocalCounterparty,
  LocalPaymentAttempt,
  LocalPaymentRequest,
  LocalPaymentRequestCaptureAttempt,
  LocalPaymentRequestRefundAttempt,
  LocalPaymentStatus,
  LocalPayout,
  LocalTag,
  LocalTransaction,
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
      remotePaymentAttempts.map((remotePaymentAttempt) => {
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
      reference: transaction.amount > 0 ? transaction.theirReference : transaction.yourReference,
      description: transaction.description,
      type: TransactionTypeValue[transaction.type],
    }
  })
}

const remotePayoutsToLocal = (payouts: Payout[]): LocalPayout[] => {
  return payouts.map((payout) => {
    return {
      id: payout.id,
      accountID: payout.accountID,
      merchantID: payout.merchantID,
      type: payout.type,
      description: payout.description,
      currency: payout.currency,
      amount: payout.amount,
      yourReference: payout.yourReference,
      theirReference: payout.theirReference,
      status: payout.status,
      createdBy: payout.createdBy,
      inserted: payout.inserted,
      sourceAccountName: payout.sourceAccountName,
      destination: payout.destination,
    }
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

export {
  localAccountIdentifierTypeToRemoteAccountIdentifierType,
  localCounterPartyToRemoteCounterParty,
  parseApiTagToLocalTag,
  parseLocalTagToApiTag,
  remoteAccountsToLocalAccounts,
  remotePaymentRequestToLocalPaymentRequest,
  remotePayoutsToLocal,
  remoteTransactionsToLocal,
}
