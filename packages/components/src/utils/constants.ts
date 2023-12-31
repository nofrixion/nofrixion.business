export const builtClassesPrefix = 'nf-wc-'

export const apiUrls = {
  local: 'https://localhost:44323/api/v1',
  dev: 'https://api-dev.nofrixion.com/api/v1',
  sandbox: 'https://api-sandbox.nofrixion.com/api/v1',
  production: 'https://api.nofrixion.com/api/v1',
}

export type LocalCurrencyItem = {
  code: string
  symbol: string
}

export const localCurrency: { [key: string]: LocalCurrencyItem } = {
  gbp: { code: 'GBP', symbol: '£' },
  eur: { code: 'EUR', symbol: '€' },
}

export const defaultUserPaymentDefaults = {
  paymentMethodsDefaults: {
    pisp: true,
    pispPriorityBank: false,
    pispPriorityBankID: '',
    card: true,
    wallet: true,
    lightning: false,
    cardAuthorizeOnly: false,
  },
  paymentConditionsDefaults: {
    allowPartialPayments: false,
  },
  notificationEmailsDefaults: {
    emailAddresses: '',
  },
}

export const defaultAnonymousUserName = 'Anonymous'
