import {
  AccountIdentifierType,
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
  LocalAddressType,
  LocalPartialPaymentMethods,
  LocalPaymentMethodTypes,
  LocalWallets,
} from '../types/LocalEnums'
import {
  LocalAddress,
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
          refundInitiatedAt: new Date(refundInitiatedAt ?? 0),
          refundSettledAt: new Date(refundSettledAt ?? 0),
          refundCancelledAt: new Date(refundCancelledAt ?? 0),
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
  }
}

const remoteTransactionsToLocal = (transactions: Transaction[]): LocalTransaction[] => {
  return transactions.map((transaction) => {
    return {
      date: new Date(transaction.transactionDate),
      destinationAccount: {
        name: transaction.counterparty.name,
        accountInfo:
          transaction.counterparty.identifier.type == AccountIdentifierType.IBAN
            ? transaction.counterparty.identifier.iban
            : transaction.counterparty.identifier.type == AccountIdentifierType.SCAN
            ? `${transaction.counterparty.identifier.sortCode} - ${transaction.counterparty.identifier.accountNumber}`
            : '',
      },
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

export {
  parseApiTagToLocalTag,
  parseLocalTagToApiTag,
  remotePaymentRequestToLocalPaymentRequest,
  remotePayoutsToLocal,
  remoteTransactionsToLocal,
}
