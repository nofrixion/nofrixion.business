import { CardTokenCreateModes, Currency, PartialPaymentMethods } from './Enums'

export type PaymentRequestCreate = {
  merchantID: string
  amount: number
  currency: Currency
  customerID?: string
  orderID?: string
  paymentMethodTypes: string
  description?: string
  pispAccountID?: string
  baseOriginUrl?: string
  callbackUrl?: string
  successWebHookUrl?: string
  cardAuthorizeOnly: boolean
  cardCreateToken: boolean
  cardTokenCreateModes: CardTokenCreateModes
  partialPaymentMethod: PartialPaymentMethods
  customerEmailAddress?: string
  shippingFirstName?: string
  shippingLastName?: string
  shippingAddressLine1?: string
  shippingAddressLine2?: string
  shippingAddressCity?: string
  shippingAddressCounty?: string
  shippingAddressPostCode?: string
  shippingAddressCountryCode?: string
  shippingPhone?: string
  shippingEmail?: string
  priorityBankID?: string
  title?: string
  tagIds?: string[]
  notificationEmailAddresses?: string
  useHostedPaymentPage: boolean
}

export type PaymentRequestUpdate = {
  amount?: number
  currency?: Currency
  customerID?: string
  orderID?: string
  paymentMethodTypes?: string
  description?: string
  pispAccountID?: string
  shippingFirstName?: string
  shippingLastName?: string
  shippingAddressLine1?: string
  shippingAddressLine2?: string
  shippingAddressCity?: string
  shippingAddressCounty?: string
  shippingAddressPostCode?: string
  shippingAddressCountryCode?: string
  shippingPhone?: string
  shippingEmail?: string
  baseOriginUrl?: string
  callbackUrl?: string
  cardAuthorizeOnly?: boolean
  cardCreateToken?: boolean
  ignoreAddressVerification?: boolean
  cardIgnoreCVN?: boolean
  pispRecipientReference?: string
  cardProcessorMerchantID?: string
  customerEmailAddress?: string
  notificationEmailAddresses?: string[]
  title?: string
  partialPaymentSteps?: string
  tagIds?: string[]
}
