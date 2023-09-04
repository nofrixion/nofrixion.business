import { Currency, PayoutStatus } from '@nofrixion/moneymoov'

import {
  LocalAccountIdentifierType,
  LocalAddressType,
  LocalPartialPaymentMethods,
  LocalPaymentMethodTypes,
  LocalWallets,
  SubTransactionType,
} from './LocalEnums'

export interface LocalContact {
  name?: string
  email?: string
}

export type LocalPaymentStatus = 'paid' | 'partial' | 'unpaid' | 'overpaid' | 'authorized'

export interface LocalPaymentRequest {
  id: string
  status: LocalPaymentStatus
  createdAt: Date
  contact: LocalContact
  amount: number
  currency: Currency
  tags: LocalTag[]
  paymentMethodTypes: LocalPaymentMethodTypes[]
  addresses: LocalAddress[]
  description: string
  productOrService: string
  hostedPayCheckoutUrl: string
  partialPaymentMethod: LocalPartialPaymentMethods
  paymentAttempts: LocalPaymentAttempt[]
  priorityBankID?: string
  priorityBankName?: string
  notificationEmailAddresses?: string
  captureFunds: boolean
  transactions?: LocalTransaction[]
  pispAccountID?: string
}

export interface LocalCounterparty {
  accountID?: string
  name: string
  emailAddress?: string
  phoneNumber?: string
  identifier?: LocalAccountIdentifier
  accountInfo?: string
}

export interface LocalAccountIdentifier {
  type: LocalAccountIdentifierType
  currency: string
  bic?: string
  iban?: string
  accountNumber?: string
  sortCode?: string
}

export interface LocalPaymentAttempt {
  attemptKey: string
  occurredAt: Date
  paymentMethod: LocalPaymentMethodTypes
  amount: number
  currency: Currency.EUR | Currency.GBP
  processor?: string
  last4DigitsOfCardNumber?: string
  settledAmount: number
  authorisedAmount: number
  cardAuthorisedAmount?: number
  captureAttempts: LocalPaymentRequestCaptureAttempt[]
  refundAttempts: LocalPaymentRequestRefundAttempt[]
  wallet?: LocalWallets | undefined
  status: LocalPaymentStatus
  reconciledTransactionID?: string
}

export interface SubTransaction {
  occurredAt?: Date
  amount: number
  currency: Currency.EUR | Currency.GBP
  type: SubTransactionType
  awaitingApproval?: boolean
  cancelled?: boolean
}

export interface LocalPaymentRequestRefundAttempt {
  refundPayoutID?: string
  refundInitiatedAt?: Date
  refundSettledAt?: Date
  refundCancelledAt?: Date
  refundInitiatedAmount: number
  refundSettledAmount: number
  refundCancelledAmount: number
  isCardVoid: boolean
}

export interface LocalPaymentRequestCaptureAttempt {
  capturedAt?: Date
  capturedAmount: number
}

export type LocalAddress = {
  addressLine1?: string
  addressLine2?: string
  addressCity?: string
  addressCounty?: string
  addressPostCode?: string
  addressCountryCode?: string
  phone?: string
  email?: string
  addressType: LocalAddressType
}

export interface LocalPaymentRequestCreate {
  amount: number
  currency: Currency
  productOrService: string
  description?: string
  firstName?: string
  lastName?: string
  email?: string
  paymentConditions: {
    allowPartialPayments: boolean
  }
  paymentMethods: {
    bank: {
      active: boolean
      priority?: {
        id: string
        name: string
      }
    }
    card: {
      active: boolean
      captureFunds: boolean
    }
    wallet: boolean
    lightning: boolean
  }
  tagIds?: string[]
  notificationEmailAddresses?: string
}

export interface LocalPaymentConditionsFormValue {
  allowPartialPayments: boolean
  isDefault: boolean
}

export interface LocalPaymentMethodsFormValue {
  isBankEnabled: boolean
  isCardEnabled: boolean
  isWalletEnabled: boolean
  isLightningEnabled: boolean
  isCaptureFundsEnabled: boolean
  priorityBank?: {
    id: string
    name: string
  }
  isDefault: boolean
}

export interface LocalPaymentNotificationsFormValue {
  emailAddresses: string
  isDefault: boolean
}

export interface LocalTag {
  id: string
  merchantID?: string
  name: string
  colourHex?: string
  description?: string
}

export interface LocalTransaction {
  id: string
  date: Date
  counterParty: LocalCounterparty
  amount: number
  balanceAfterTx?: number
  reference: string
  description: string
  type: string
}

export interface LocalPayout {
  id: string
  accountID: string
  merchantID: string
  type: LocalAccountIdentifierType
  description: string
  currency: Currency
  amount: number
  yourReference?: string
  theirReference: string
  status: PayoutStatus
  createdBy?: string
  inserted: Date
  sourceAccountName: string
  destination?: LocalCounterparty
}

export interface LocalAccount {
  id: string
  merchantID: string
  accountName: string
  accountNumber?: string
  availableBalance: number
  balance: number
  currency: Currency
  displayName: string
  iban?: string
  sortCode?: string
  summary: string
  identifier: LocalAccountIdentifier
  isDefault: boolean
}
