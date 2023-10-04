export enum Currency {
  None = 'None',
  GBP = 'GBP',
  EUR = 'EUR',
  LBTC = 'LBTC',
  BTC = 'BTC',
}

export enum CardTokenCreateModes {
  None = 'None',
  ConsentNotRequired = 'ConsentNotRequired',
  UserConsentRequired = 'UserConsentRequired',
}

export enum PaymentProcessor {
  None = 'None',
  CyberSource = 'CyberSource',
  Checkout = 'Checkout',
  Stripe = 'Stripe',
  Modulr = 'Modulr',
  Plaid = 'Plaid',
  Yapily = 'Yapily',
}

export enum PaymentResult {
  None = 'None',
  FullyPaid = 'FullyPaid',
  Checkout = 'Checkout',
  PartiallyPaid = 'PartiallyPaid',
  OverPaid = 'OverPaid',
  Voided = 'Voided',
  Authorized = 'Authorized',
}

export enum PartialPaymentMethods {
  None = 'None',
  Partial = 'Partial',
}

export enum AddressType {
  Unknown = 'Unknown',
  Shipping = 'Shipping',
  Billing = 'Billing',
}

export enum PaymentRequestEventType {
  unknown = 'unknown',
  card_payer_authentication_setup = 'card_payer_authentication_setup',
  card_authorization = 'card_authorization',
  card_sale = 'card_sale',
  card_capture = 'card_capture',
  card_void = 'card_void',
  pisp_initiate = 'pisp_initiate',
  pisp_callback = 'pisp_callback',
  lightning_invoice_created = 'lightning_invoice_created',
  lightning_invoice_paid = 'lightning_invoice_paid',
  card_payer_authentication_failure = 'card_payer_authentication_failure',
  pisp_webhook = 'pisp_webhook',
  pisp_settle = 'pisp_settle',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum PaymentRequestStatus {
  All = 'All',
  None = 'None',
  FullyPaid = 'FullyPaid',
  PartiallyPaid = 'PartiallyPaid',
  OverPaid = 'OverPaid',
  Voided = 'Voided',
  Authorized = 'Authorized',
}

export enum PaymentMethodTypes {
  Card = 'card',
  Pisp = 'pisp',
  ApplePay = 'applepay',
  GooglePay = 'googlepay',
  Lightning = 'lightning',
}

export enum Wallets {
  ApplePay = 'ApplePay',
  GooglePay = 'GooglePay',
}

export enum SortDirection {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum AccountIdentifierType {
  Unknown = 'Unknown',
  SCAN = 'SCAN',
  IBAN = 'IBAN',
  DD = 'DD',
}

export enum PayoutStatus {
  All = 'All',
  UNKNOWN = 'UNKNOWN',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  QUEUED_UPSTREAM = 'QUEUED_UPSTREAM',
  QUEUED = 'QUEUED',
  FAILED = 'FAILED',
  PENDING_INPUT = 'PENDING_INPUT',
}

export enum PaymentProcessorsEnum {
  None = 'None',
  Checkout = 'Checkout',
  Stripe = 'Stripe',
  Modulr = 'Modulr',
  Plaid = 'Plaid',
  Yapily = 'Yapily',
  CyberSource = 'CyberSource',
  Bitcoin = 'Bitcoin',
  BitcoinTestnet = 'BitcoinTestnet',
  BankingCircle = 'BankingCircle',
  BankingCircleAgency = 'BankingCircleAgency',
}

export enum AISUsageType {
  UNKNOWN = 'UNKNOWN',
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS',
  OTHER = 'OTHER',
}

export enum AISAccountType {
  CASH_TRADING = 1,
  CASH_INCOME = 2,
  CASH_PAYMENT = 3,
  CHARGE_CARD = 4,
  CHARGES = 5,
  COMMISSION = 6,
  CREDIT_CARD = 7,
  CURRENT = 8,
  E_MONEY = 9,
  LIMITED_LIQUIDITY_SAVINGS_ACCOUNT = 10,
  LOAN = 11,
  MARGINAL_LENDING = 12,
  MONEY_MARKET = 13,
  MORTGAGE = 14,
  NON_RESIDENT_EXTERNAL = 15,
  OTHER = 16,
  OVERDRAFT = 17,
  OVERNIGHT_DEPOSIT = 18,
  PREPAID_CARD = 19,
  SALARY = 20,
  SAVINGS = 21,
  SETTLEMENT = 22,
  TAX = 23,
  UNKNOWN = 24,
}

export enum AISAccountIdentificationType {
  SORT_CODE = 1,
  ACCOUNT_NUMBER = 2,
  IBAN = 3,
  BBAN = 4,
  BIC = 5,
  PAN = 6,
  MASKED_PAN = 7,
  MSISDN = 8,
  BSB = 9,
  NCC = 10,
  ABA = 11,
  ABAWIRE = 12,
  ABA_ACH = 13,
  EMAIL = 14,
  ROLL_NUMBER = 15,
  BLZ = 16,
  IFS = 17,
  CLABE = 18,
  CTN = 19,
  BRANCH_CODE = 20,
}

export enum AISAccountBalanceType {
  CLOSING_AVAILABLE = 1,
  CLOSING_BOOKED = 2,
  CLOSING_CLEARED = 3,
  EXPECTED = 4,
  FORWARD_AVAILABLE = 5,
  INFORMATION = 6,
  INTERIM_AVAILABLE = 7,
  INTERIM_BOOKED = 8,
  INTERIM_CLEARED = 9,
  OPENING_AVAILABLE = 10,
  OPENING_BOOKED = 11,
  OPENING_CLEARED = 12,
  PREVIOUSLY_CLOSED_BOOKED = 13,
  AUTHORISED = 14,
  OTHER = 15,
  UNKNOWN = 16,
}

export enum AISCreditLineType {
  AVAILABLE = 1,
  CREDIT = 2,
  EMERGENCY = 3,
  PREAGREED = 4,
  TEMPORARY = 5,
  OTHER = 6,
  UNKNOWN = 7,
}

export const enum UserRolesEnum {
  User = 'User',
  Approver = 'Approver',
  AdminApprover = 'AdminApprover',
  PaymentRequestor = 'PaymentRequestor',
  NewlyRegistered = 'NewlyRegistered',
}

export const enum UserStatus {
  All = 'All',
  Invited = 'Invited',
  RolePending = 'RolePending',
  Active = 'Active',
}
