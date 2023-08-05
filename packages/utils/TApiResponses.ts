export enum Currency {
  None = "None",
  GBP = "GBP",
  EUR = "EUR",
  LBTC = "LBTC",
  BTC = "BTC",
}

export enum AccountIdentifierType {
  Unknown = "Unknown",
  SCAN = "SCAN",
  IBAN = "IBAN",
  DD = "DD",
}

export interface Merchant {
  id: string;
  name: string;
  enabled: boolean;
  companyID: string;
  merchantCategoryCode: string;
  shortName: string;
  paymentAccountLimit: number;
  inserted: string;
  jurisdiction: string;
  hostedPayVersion: number;
  webHookLimit: number;
  displayQrOnHostedPay: boolean;
  yourRole: string;
  userRoles: unknown[]; // TODO: Add type
  tags: unknown[];
  paymentAccounts: unknown[]; // TODO: Add type
}

export interface User {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
}

export interface Account {
  id: string;
  merchantID: string;
  accountName: string;
  accountNumber: string;
  availableBalance: number;
  balance: number;
  currency: Currency;
  displayName: string;
  iban: string;
  sortCode: string;
  summary: string;
  identifier: AccountIdentifier;
  isDefault: boolean;
}

export interface AccountIdentifier {
  type: AccountIdentifierType;
  currency: string;
  bic: string;
  iban: string;
  accountNumber: string;
  sortCode: string;
}
export interface PaymentRequestMetrics {
  all: number;
  paid: number;
  unpaid: number;
  partiallyPaid: number;
}

export interface Transaction {
  id: string;
  merchantID: string;
  accountID: string;
  amount: number;
  currency: Currency;
  description: string;
  transactionDate: string;
  yourReference: string;
  theirReference: string;
  balance: number;
  counterparty: Counterparty;
}

export interface Counterparty {
  accountID: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  identifier: AccountIdentifier;
}

export interface TransactionPageResponse {
  content: Transaction[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalSize: number;
}
