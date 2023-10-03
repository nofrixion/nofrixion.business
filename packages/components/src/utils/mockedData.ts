import {
  Account,
  AccountIdentifierType,
  Currency,
  PayoutStatus,
  UserRoleAndUserInvite,
  UserRolesEnum,
  UserStatusFilterEnum,
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
  LocalBeneficiary,
  LocalCounterparty,
  LocalPaymentAttempt,
  LocalPaymentRequest,
  LocalPayout,
  LocalTransaction,
} from '../types/LocalTypes'

export const mockTags = [
  {
    id: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag',
  },
  {
    id: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'Another tag',
  },
  {
    id: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A reeeeallllly long tag name',
  },
  {
    id: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'You get the idea',
  },
]

export const mockMerchantTags = [
  {
    id: '1',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A tag',
  },
  {
    id: '2',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'Another tag',
  },
  {
    id: '3',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A reeeeallllly long tag name',
  },
  {
    id: '4',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'You get the idea',
  },
  {
    id: '5',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 1',
  },
  {
    id: '6',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 2',
  },
  {
    id: '7',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 3',
  },
  {
    id: '8',
    merchantID: '3780263C-5926-4B79-AC84-224D64290DBF',
    name: 'A merchant tag 4',
  },
]

export const mockRefundAttempts = [
  {
    refundPayoutID: '1',
    refundInitiatedAt: new Date('2023-05-18T00:00:00.000Z'),
    refundSettledAt: new Date('2023-05-18T00:00:00.000Z'),
    refundInitiatedAmount: 5,
    refundSettledAmount: 5,
    refundCancelledAmount: 0,
    isCardVoid: false,
  },
  {
    refundPayoutID: '2',
    refundInitiatedAt: new Date('2023-05-18T00:00:00.000Z'),
    refundSettledAt: new Date('2023-05-18T00:00:00.000Z'),
    refundInitiatedAmount: 3,
    refundSettledAmount: 3,
    refundCancelledAmount: 0,
    isCardVoid: false,
  },
]

export const mockAccounts: Account[] = [
  {
    id: 'BE270F6F-04F1-4DE9-836C-035C5B7EC409',
    merchantID: '8A45B3B8-7428-4BA2-8228-37204B43AC0E',
    accountNumber: '',
    accountName: 'NoFrixion EUR account',
    availableBalance: 100000.0,
    balance: 120000.0,
    currency: Currency.EUR,
    displayName: 'NoFrixion EUR account',
    iban: 'GB93MOCK00000003290619',
    sortCode: '',
    summary: '',
    identifier: {
      type: AccountIdentifierType.IBAN,
      currency: Currency.EUR,
      bic: 'MOCKGB21',
      iban: 'GB93MOCK00000003290619',
      accountNumber: '',
      sortCode: '',
    },
    isDefault: true,
    expiryDate: '',
    consentID: '',
    isConnectedAccount: false,
    bankName: '',
  },
  {
    id: 'C317F3DF-51F5-4EF6-8DDA-41444B90B2D5',
    merchantID: '8A45B3B8-7428-4BA2-8228-37204B43AC0E',
    accountName: 'NoFrixion GBP account',
    accountNumber: '12345678',
    availableBalance: 50022.6,
    balance: 50022.6,
    currency: Currency.GBP,
    displayName: 'NoFrixion GBP account',
    iban: '',
    sortCode: '123456',
    summary: '',
    identifier: {
      type: AccountIdentifierType.SCAN,
      currency: Currency.GBP,
      bic: 'MOCKGB21',
      iban: '',
      accountNumber: '12345678',
      sortCode: '123456',
    },
    isDefault: false,
    expiryDate: '',
    consentID: '',
    isConnectedAccount: false,
    bankName: '',
  },
  {
    id: 'C317F3DF-51F5-4EF6-8DDA-41444B90B2D5',
    merchantID: '8A45B3B8-7428-4BA2-8228-37204B43AC0E',
    accountName: 'Test GBP account',
    accountNumber: '12345678',
    availableBalance: 50022.6,
    balance: 50022.6,
    currency: Currency.GBP,
    displayName: 'NoFrixion GBP account display',
    iban: '',
    sortCode: '123456',
    summary: '',
    identifier: {
      type: AccountIdentifierType.SCAN,
      currency: Currency.GBP,
      bic: 'MOCKGB21',
      iban: '',
      accountNumber: '12345678',
      sortCode: '123456',
    },
    isDefault: false,
    expiryDate: '',
    consentID: '',
    isConnectedAccount: false,
    bankName: '',
  },
]

export const mockPaymentAttempts: LocalPaymentAttempt[] = [
  {
    attemptKey: 'a3b752d2-c0a6-4846-90e5-d783bb4ec005',
    occurredAt: new Date('2023-05-18T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.02,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
    settledAmount: 0,
    captureAttempts: [{ capturedAmount: 20.02, capturedAt: new Date('2023-05-18T00:00:00.000Z') }],
    refundAttempts: mockRefundAttempts,
    authorisedAmount: 0,
    cardAuthorisedAmount: 20.02,
    wallet: undefined,
    status: 'paid',
  },
  {
    attemptKey: 'f4c6e747-6fd6-4a3c-be3b-4d3edd258b35',
    occurredAt: new Date('2023-03-23T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 30.57,
    currency: Currency.EUR,
    processor: 'MasterCard',
    last4DigitsOfCardNumber: '1234',
    settledAmount: 0,
    captureAttempts: [{ capturedAmount: 30.57, capturedAt: new Date('2023-03-23T00:00:00.000Z') }],
    refundAttempts: [],
    authorisedAmount: 0,
    cardAuthorisedAmount: 30.57,
    wallet: undefined,
    status: 'paid',
  },
  {
    attemptKey: 'ca2eb453-9c12-4f8f-b8b2-7c1c6af842ba',
    occurredAt: new Date('2023-05-18T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Pisp,
    amount: 924852422.99,
    currency: Currency.EUR,
    processor: 'Revolut',
    last4DigitsOfCardNumber: '1234',
    settledAmount: 924852422.99,
    captureAttempts: [],
    refundAttempts: [],
    authorisedAmount: 924852422.99,
    cardAuthorisedAmount: 0,
    wallet: undefined,
    status: 'paid',
  },
  {
    attemptKey: '43535f79-a9f2-4331-9a78-db731e467c49',
    occurredAt: new Date('2023-05-02T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Pisp,
    amount: 7.9,
    currency: Currency.EUR,
    processor: 'Bank of Ireland',
    last4DigitsOfCardNumber: '1234',
    settledAmount: 7.9,
    captureAttempts: [],
    refundAttempts: [],
    authorisedAmount: 0,
    cardAuthorisedAmount: 0,
    wallet: undefined,
    status: 'paid',
  },
  {
    attemptKey: 'a9f6c19a-0172-47a6-803a-c3f59899cafc',
    occurredAt: new Date('2023-05-01T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 15.39,
    currency: Currency.EUR,
    processor: 'Apple Pay',
    settledAmount: 0,
    captureAttempts: [{ capturedAmount: 15.39, capturedAt: new Date('2023-05-01T00:00:00.000Z') }],
    refundAttempts: [],
    authorisedAmount: 0,
    cardAuthorisedAmount: 15.39,
    wallet: LocalWallets.ApplePay,
    status: 'paid',
  },
  {
    attemptKey: '7bbb2998-8d78-4b2a-9334-84444c9915c8',
    occurredAt: new Date('2023-05-18T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.78,
    currency: Currency.EUR,
    processor: 'Google Pay',
    settledAmount: 0,
    captureAttempts: [{ capturedAmount: 20.78, capturedAt: new Date('2023-05-18T00:00:00.000Z') }],
    refundAttempts: [],
    authorisedAmount: 0,
    cardAuthorisedAmount: 20.78,
    wallet: LocalWallets.GooglePay,
    status: 'paid',
  },
  // Add more transactions as needed
]

export const partiallyPaidMockPaymentAttempts: LocalPaymentAttempt[] = [
  {
    attemptKey: 'a3b752d2-c0a6-4846-90e5-d783bb4ec005',
    occurredAt: new Date('2023-05-18T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.02,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
    settledAmount: 0,
    captureAttempts: [{ capturedAmount: 20.02, capturedAt: new Date('2023-05-18T00:00:00.000Z') }],
    refundAttempts: [],
    authorisedAmount: 0,
    cardAuthorisedAmount: 20.02,
    wallet: undefined,
    status: 'paid',
  },
  {
    attemptKey: 'f4c6e747-6fd6-4a3c-be3b-4d3edd258b35',
    occurredAt: new Date('2023-03-23T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 30.57,
    currency: Currency.EUR,
    processor: 'MasterCard',
    last4DigitsOfCardNumber: '1234',
    settledAmount: 0,
    captureAttempts: [{ capturedAmount: 30.57, capturedAt: new Date('2023-03-23T00:00:00.000Z') }],
    refundAttempts: [],
    authorisedAmount: 0,
    cardAuthorisedAmount: 30.57,
    wallet: undefined,
    status: 'paid',
  },
  // Add more transactions as needed
]
export const overpaidMockPaymentAttempts: LocalPaymentAttempt[] = [
  {
    attemptKey: 'a3b752d2-c0a6-4846-90e5-d783bb4ec005',
    occurredAt: new Date('2023-05-18T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 20.02,
    currency: Currency.EUR,
    processor: 'Visa',
    last4DigitsOfCardNumber: '1234',
    settledAmount: 0,
    captureAttempts: [{ capturedAmount: 20.02, capturedAt: new Date('2023-05-18T00:00:00.000Z') }],
    refundAttempts: [],
    authorisedAmount: 0,
    cardAuthorisedAmount: 20.02,
    wallet: undefined,
    status: 'paid',
  },
  {
    attemptKey: 'f4c6e747-6fd6-4a3c-be3b-4d3edd258b35',
    occurredAt: new Date('2023-03-23T00:00:00.000Z'),
    paymentMethod: LocalPaymentMethodTypes.Card,
    amount: 90.57,
    currency: Currency.EUR,
    processor: 'MasterCard',
    last4DigitsOfCardNumber: '1234',
    settledAmount: 0,
    captureAttempts: [{ capturedAmount: 90.57, capturedAt: new Date('2023-03-23T00:00:00.000Z') }],
    refundAttempts: [],
    authorisedAmount: 0,
    cardAuthorisedAmount: 90.57,
    wallet: undefined,
    status: 'paid',
  },
  // Add more transactions as needed
]

const regular: LocalPaymentRequest = {
  id: 'fa14171f-5fe6-4326-8c09-a9b59bbf6e7b',
  amount: 100.0,
  currency: Currency.EUR,
  paymentMethodTypes: [
    LocalPaymentMethodTypes.Card,
    LocalPaymentMethodTypes.Pisp,
    LocalPaymentMethodTypes.ApplePay,
    LocalPaymentMethodTypes.GooglePay,
  ],
  addresses: [
    {
      addressType: LocalAddressType.Shipping,
      addressLine1: '8 Harcourt Street',
      addressLine2: '',
      addressCity: 'Dublin',
      addressCounty: 'Dublin',
      addressPostCode: 'D02 AF58',
      addressCountryCode: 'Ireland',
      phone: '+35319695400',
      email: 'contact@nofrixion.com',
    },
  ],
  partialPaymentMethod: LocalPartialPaymentMethods.None,
  status: 'paid',
  createdAt: new Date('2023-05-17T19:02:37.8484876+00:00'),
  tags: mockTags,
  contact: {
    name: 'John Doe',
    email: 'johndoe@email.com',
  },
  hostedPayCheckoutUrl: 'https://api-dev.nofrixion.com/pay/fa14171f-5fe6-4326-8c09-a9b59bbf6e7b',
  description:
    'Curabitur ultricies ligula vitae tellus fringilla consequat. Pellentesque in tortor eu nibh lobortis ultrices vel in quam. Nunc tristique egestas purus et hendrerit.',
  productOrService: 'Flight lessons',
  paymentAttempts: mockPaymentAttempts,
  captureFunds: true,
}

const partiallyPaidPaymentRequest: LocalPaymentRequest = {
  ...regular,
  paymentAttempts: partiallyPaidMockPaymentAttempts,
  status: 'partial',
}

const unpaidPaymentRequest: LocalPaymentRequest = {
  ...regular,
  paymentAttempts: [],
  status: 'unpaid',
}

const overpaidPaymentRequest: LocalPaymentRequest = {
  ...regular,
  paymentAttempts: overpaidMockPaymentAttempts,
  status: 'overpaid',
}

const noShippingAddress: LocalPaymentRequest = {
  id: '5cb6f5c8-ce16-411f-9f55-29fb022bb444',
  amount: 285.0,
  currency: Currency.EUR,
  paymentMethodTypes: [
    LocalPaymentMethodTypes.Pisp,
    LocalPaymentMethodTypes.ApplePay,
    LocalPaymentMethodTypes.GooglePay,
  ],
  addresses: [],
  partialPaymentMethod: LocalPartialPaymentMethods.None,
  status: 'unpaid',
  tags: [],
  createdAt: new Date('2023-05-17T19:02:37.8484876+00:00'),
  contact: {
    name: 'John Doe',
    email: 'johndoe@email.com',
  },
  hostedPayCheckoutUrl: 'https://api-dev.nofrixion.com/pay/5cb6f5c8-ce16-411f-9f55-29fb022bb444',
  description:
    'Curabitur ultricies ligula vitae tellus fringilla consequat. Pellentesque in tortor eu nibh lobortis ultrices vel in quam. Nunc tristique egestas purus et hendrerit.',
  productOrService: 'Flight lessons',
  paymentAttempts: mockPaymentAttempts,
  captureFunds: true,
}

const fewPaymentRequests: LocalPaymentRequest[] = [
  {
    id: '1',
    status: 'unpaid',
    createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 1))),
    contact: {
      name: 'Lukas Müller',
      email: 'lukas.mueller@email.de',
    },
    amount: 900,
    currency: Currency.EUR,
    tags: [
      {
        id: '1',
        description: 'Logo Design',
        colourHex: '#FF0000',
        name: 'Logo Design',
        merchantID: '1',
      },
      {
        id: '2',
        description: 'Web Design',
        colourHex: '#00FF00',
        name: 'Web Design',
        merchantID: '1',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '2',
    status: 'unpaid',
    createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 3))),
    contact: {
      name: 'Miguel García',
      email: 'miguel.garcia@email.es',
    },
    amount: 1800,
    currency: Currency.EUR,
    tags: [
      {
        id: '3',
        description: 'App Development',
        colourHex: '#0000FF',
        name: 'App Development',
        merchantID: '1',
      },
      {
        id: '4',
        description: 'UI Design',
        colourHex: '#FF00FF',
        name: 'UI Design',
        merchantID: '1',
      },
      {
        id: '5',
        description: 'EU Client',
        colourHex: '#FFFF00',
        name: 'EU Client',
        merchantID: '1',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '3',
    status: 'unpaid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    contact: {
      name: 'Lucas Jones',
      email: 'lucas.jones@email.co.uk',
    },
    amount: 2700,
    currency: Currency.GBP,
    tags: [
      {
        id: '6',
        description: 'ecommerce',
        colourHex: '#FF0000',
        name: 'ecommerce',
        merchantID: '1',
      },
      {
        id: '7',
        description: 'web-development',
        colourHex: '#00FF00',
        name: 'web-development',
        merchantID: '1',
      },
      {
        id: '8',
        description: 'London-client',
        colourHex: '#0000FF',
        name: 'London-client',
        merchantID: '1',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '4',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    contact: {
      name: 'Sophie Smith',
      email: 'sophie.smith@email.co.uk',
    },
    amount: 2500,
    currency: Currency.GBP,
    tags: [
      {
        id: '9',
        description: 'web-design',
        colourHex: '#FF0000',
        name: 'web-design',
        merchantID: '1',
      },
      {
        id: '10',
        description: 'branding',
        colourHex: '#00FF00',
        name: 'branding',
        merchantID: '1',
      },
      {
        id: '11',
        description: 'London-client',
        colourHex: '#0000FF',
        name: 'London-client',
        merchantID: '1',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '5',
    status: 'unpaid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    contact: {
      name: 'Oliver Johnson',
      email: 'oliver.johnson@email.co.uk',
    },
    amount: 3000,
    currency: Currency.GBP,
    tags: [
      {
        id: '7',
        description: 'web-development',
        colourHex: '#FF0000',
        name: 'web-development',
        merchantID: '1',
      },
      {
        id: '6',
        description: 'ecommerce',
        colourHex: '#00FF00',
        name: 'ecommerce',
        merchantID: '1',
      },
      {
        id: '11',
        description: 'London-client',
        colourHex: '#0000FF',
        name: 'London-client',
        merchantID: '1',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '6',
    status: 'partial',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 11)),
    contact: {
      name: 'Ava Wilson',
      email: 'ava.wilson@email.co.uk',
    },
    amount: 1500,
    currency: Currency.GBP,
    tags: [
      {
        id: '7',
        description: 'web-development',
        colourHex: '#FF0000',
        name: 'web-development',
        merchantID: '1',
      },
      {
        id: '6',
        description: 'ecommerce',
        colourHex: '#00FF00',
        name: 'ecommerce',
        merchantID: '1',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '7',
    status: 'partial',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 14)),
    contact: {
      name: 'Emily Brown',
      email: 'emily.brown@email.co.uk',
    },
    amount: 1200,
    currency: Currency.GBP,
    tags: [
      {
        id: '12',
        name: 'SEO',
        merchantID: '1',
        colourHex: '#000000',
        description: 'Search Engine Optimization',
      },
      {
        id: '13',
        name: 'content-creation',
        merchantID: '1',
        colourHex: '#000000',
        description: 'Content Creation',
      },
      {
        id: '14',
        name: 'London-client',
        merchantID: '1',
        colourHex: '#000000',
        description: 'London Client',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '8',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 15)),
    contact: {
      name: 'Giuseppe Bianchi',
      email: 'giuseppe.bianchi@email.it',
    },
    amount: 2300,
    currency: Currency.EUR,
    tags: [
      {
        id: '15',
        name: 'web-design',
        merchantID: '1',
        colourHex: '#000000',
        description: 'Web Design',
      },
      {
        id: '16',
        name: 'responsive-design',
        merchantID: '1',
        colourHex: '#000000',
        description: 'Responsive Design',
      },
      {
        id: '17',
        name: 'EU-client',
        merchantID: '1',
        colourHex: '#000000',
        description: 'EU Client',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '9',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 20)),
    contact: {
      name: 'François Dubois',
      email: 'francois.dubois@email.fr',
    },
    amount: 1000,
    currency: Currency.EUR,
    tags: [
      {
        id: '18',
        name: 'logo-design',
        merchantID: '1',
        colourHex: '#000000',
        description: 'Logo Design',
      },
      {
        id: '19',
        name: 'branding',
        merchantID: '1',
        colourHex: '#000000',
        description: 'Branding',
      },
      {
        id: '20',
        name: 'EU-client',
        merchantID: '1',
        colourHex: '#000000',
        description: 'EU Client',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '10',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 22)),
    contact: {
      name: 'Isabella Lewis',
      email: 'isabella.lewis@email.co.uk',
    },
    amount: 3500,
    currency: Currency.GBP,
    tags: [
      {
        id: '21',
        name: 'UX-design',
        merchantID: '1',
        colourHex: '#000000',
        description: 'UX Design',
      },
      {
        id: '22',
        name: 'app-development',
        merchantID: '1',
        colourHex: '#000000',
        description: 'App Development',
      },
      {
        id: '23',
        name: 'London-client',
        merchantID: '1',
        colourHex: '#000000',
        description: 'London Client',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '11',
    status: 'paid',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 25)),
    contact: {
      name: 'Lily Taylor',
      email: 'lily.taylor@email.co.uk',
    },
    amount: 4200,
    currency: Currency.GBP,
    tags: [
      {
        id: '24',
        name: 'web-design',
        merchantID: '1',
        colourHex: '#000000',
        description: 'Web Design',
      },
      {
        id: '25',
        name: 'branding',
        merchantID: '1',
        colourHex: '#000000',
        description: 'Branding',
      },
      {
        id: '26',
        name: 'London-client',
        merchantID: '1',
        colourHex: '#000000',
        description: 'London Client',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
  {
    id: '12',
    status: 'partial',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 30)),
    contact: {
      name: 'Maria Silva',
      email: 'maria.silva@email.pt',
    },
    amount: 2200,
    currency: Currency.EUR,
    tags: [
      {
        id: '27',
        name: 'UI-design',
        merchantID: '1',
        colourHex: '#000000',
        description: 'UI Design',
      },
      {
        id: '28',
        name: 'app-development',
        merchantID: '1',
        colourHex: '#000000',
        description: 'App Development',
      },
      {
        id: '29',
        name: 'EU-client',
        merchantID: '1',
        colourHex: '#000000',
        description: 'EU Client',
      },
    ],
    addresses: [],
    partialPaymentMethod: LocalPartialPaymentMethods.None,
    paymentMethodTypes: [LocalPaymentMethodTypes.Card, LocalPaymentMethodTypes.Pisp],
    description: '',
    hostedPayCheckoutUrl: '',
    paymentAttempts: [],
    productOrService: '',
    captureFunds: true,
  },
]

function randomDate(start = new Date(2012, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export const mockedTransactions: LocalTransaction[] = [
  {
    id: '1',
    date: randomDate(),
    counterParty: {
      name: 'Daniel Kowalski',
      accountInfo: 'IE11MODR99035501927019',
    },
    amount: -250.0,
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA',
  },
  {
    id: '2',
    date: randomDate(),
    counterParty: {
      name: 'Daniel Kowalski',
      accountInfo: 'IE11MODR99035501927019',
    },
    amount: 1500000.99,
    reference: 'Very very very long reference. As long as it can be. Or even longer.',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA Instant',
  },
  {
    id: '3',
    date: randomDate(),
    counterParty: {
      name: 'Daniel Kowalski',
      accountInfo: 'IE11MODR99035501927019',
    },
    amount: -350.0,
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA Instant',
  },
  {
    id: '4',
    date: randomDate(),
    counterParty: {
      name: 'Daniel Kowalski',
      accountInfo: 'IE11MODR99035501927019',
    },
    amount: 450.0,
    balanceAfterTx: 32345,
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA',
  },
  {
    id: '5',
    date: randomDate(),
    counterParty: {
      name: 'Daniel Kowalski',
      accountInfo: 'IE11MODR99035501927019',
    },
    amount: -550.0,
    balanceAfterTx: 32345,
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: '',
  },
  {
    id: '6',
    date: randomDate(),
    counterParty: {
      name: 'Daniel Kowalski',
      accountInfo: 'IE11MODR99035501927019',
    },
    amount: 200.0,
    balanceAfterTx: 32345,
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: 'SEPA Instant',
  },
  {
    id: '7',
    date: randomDate(),
    counterParty: {
      name: 'Daniel Kowalski',
      accountInfo: 'IE11MODR99035501927019',
    },
    amount: -300.0,
    balanceAfterTx: 32345,
    reference: 'Dinner Payment',
    description: 'Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien.',
    type: '',
  },
]

export const mockPayouts: LocalPayout[] = [
  {
    accountID: '0678bfaa-4683-4dd9-8be8-cada724688d7',
    amount: 1.33,
    createdBy: 'Arif Matin',
    currency: Currency.EUR,
    description: 'webhooks',
    destination: {
      name: 'test account 1',
      accountID: '0678bfaa-4683-4dd9-8be8-cada724688d7',
      emailAddress: '',
      phoneNumber: 'dfsd',
      identifier: {
        type: LocalAccountIdentifierType.IBAN,
        currency: 'EUR',
        iban: 'IE29AIBK93115212345678',
        accountNumber: '',
        sortCode: '',
        bic: '',
      },
    },
    id: 'a1e02254-e605-467a-487c-08db97ef5455',
    inserted: randomDate(),
    merchantID: 'c544ae7e-e7f8-4482-552e-08daf005c17b',
    type: LocalAccountIdentifierType.IBAN,
    sourceAccountName: 'EUR Payment',
    sourceAccountIban: 'IE29AIBK93115212345678',
    sourceAccountNumber: '12345678',
    sourceAccountSortCode: '123456',
    status: PayoutStatus.PROCESSED,
    theirReference: 'refe&12',
    yourReference: 'internal reference ',
    tags: [
      {
        id: '1',
        name: 'Logo Design',
        description: 'Logo Design',
        merchantID: 'c544ae7e-e7f8-4482-552e-08daf005c17b',
      },
    ],
  },
  {
    accountID: '0678bfaa-4683-4dd9-8be8-cada724688d7',
    amount: 1.33,
    createdBy: 'Arif Matin',
    currency: Currency.EUR,
    description: 'webhooks',
    destination: {
      name: 'test account 1',
      accountID: '0678bfaa-4683-4dd9-8be8-cada724688d7',
      emailAddress: '',
      phoneNumber: 'dfsd',
      identifier: {
        type: LocalAccountIdentifierType.IBAN,
        currency: 'EUR',
        iban: undefined,
        accountNumber: '12345678',
        sortCode: '222222',
        bic: '',
      },
    },
    id: 'a1e02254-e605-467a-487c-08db97ef5455',
    inserted: randomDate(),
    merchantID: 'c544ae7e-e7f8-4482-552e-08daf005c17b',
    type: LocalAccountIdentifierType.IBAN,
    sourceAccountName: 'EUR Payment',
    sourceAccountIban: 'IE29AIBK93115212345678',
    sourceAccountNumber: '12345678',
    sourceAccountSortCode: '123456',
    status: PayoutStatus.QUEUED,
    theirReference: 'refe&12',
    yourReference: 'internal reference ',
    tags: [
      {
        id: '2',
        name: 'Web Design',
        description: 'Web Design',
        merchantID: 'c544ae7e-e7f8-4482-552e-08daf005c17b',
      },
    ],
  },
  {
    accountID: '0678bfaa-4683-4dd9-8be8-cada724688d7',
    amount: 1.33,
    createdBy: 'Arif Matin',
    currency: Currency.EUR,
    description: 'webhooks',
    destination: {
      name: 'test account 1',
      accountID: '0678bfaa-4683-4dd9-8be8-cada724688d7',
      emailAddress: '',
      phoneNumber: 'dfsd',
      identifier: {
        type: LocalAccountIdentifierType.IBAN,
        currency: 'EUR',
        iban: 'IE29AIBK93115212345678',
        accountNumber: '',
        sortCode: '',
        bic: '',
      },
    },
    id: 'a1e02254-e605-467a-487c-08db97ef5455',
    inserted: randomDate(),
    merchantID: 'c544ae7e-e7f8-4482-552e-08daf005c17b',
    type: LocalAccountIdentifierType.IBAN,
    sourceAccountName: 'EUR Payment',
    sourceAccountIban: 'IE29AIBK93115212345678',
    sourceAccountNumber: '12345678',
    sourceAccountSortCode: '123456',
    status: PayoutStatus.FAILED,
    theirReference: 'refe&12',
    yourReference: 'internal reference ',
    tags: [
      {
        id: '3',
        name: 'App Development',
        description: 'App Development',
        merchantID: 'c544ae7e-e7f8-4482-552e-08daf005c17b',
      },
    ],
  },
  {
    accountID: '0678bfaa-4683-4dd9-8be8-cada724688d7',
    amount: 111953.99,
    createdBy: 'Arif Matin',
    currency: Currency.EUR,
    description: 'webhooks',
    destination: {
      name: 'test account 1',
      accountID: '0678bfaa-4683-4dd9-8be8-cada724688d7',
      emailAddress: '',
      phoneNumber: 'dfsd',
      identifier: {
        type: LocalAccountIdentifierType.IBAN,
        currency: 'EUR',
        iban: 'IE29AIBK93115212345678',
        accountNumber: '',
        sortCode: '',
        bic: '',
      },
    },
    id: 'a1e02254-e605-467a-487c-08db97ef5455',
    inserted: randomDate(),
    merchantID: 'c544ae7e-e7f8-4482-552e-08daf005c17b',
    type: LocalAccountIdentifierType.IBAN,
    sourceAccountName: 'EUR Payment',
    sourceAccountIban: 'IE29AIBK93115212345678',
    sourceAccountNumber: '12345678',
    sourceAccountSortCode: '123456',
    status: PayoutStatus.PENDING_APPROVAL,
    theirReference: 'refe&12',
    yourReference: 'internal reference ',
    tags: [
      {
        id: '4',
        name: 'UI Design',
        description: 'UI Design',
        merchantID: 'c544ae7e-e7f8-4482-552e-08daf005c17b',
      },
    ],
  },
]

const eurAccountIdentifier: LocalAccountIdentifier = {
  type: LocalAccountIdentifierType.IBAN,
  currency: Currency.EUR,
  iban: 'GB12345678901234567890',
}

const gbpAccountIdentifier: LocalAccountIdentifier = {
  type: LocalAccountIdentifierType.SCAN,
  currency: Currency.GBP,
  accountNumber: '12345678',
  sortCode: '123456',
}

const accounts: LocalAccount[] = [
  {
    id: '7',
    accountName: 'E account',
    currency: Currency.GBP,
    balance: 100000,
    merchantID: '1',
    accountNumber: '12345678',
    sortCode: '123456',
    displayName: 'GBP Account',
    identifier: eurAccountIdentifier,
    summary: 'Account',
    isDefault: false,
    availableBalance: 100000,
  },
  {
    id: '4',
    accountName: 'EURO Account 2',
    currency: Currency.EUR,
    balance: 100,
    merchantID: '1',
    iban: 'GB12345678901234567890',
    displayName: 'EURO Account',
    identifier: eurAccountIdentifier,
    summary: 'Account',
    isDefault: true,
    availableBalance: 100,
  },
  {
    id: '1',
    accountName: 'EURO Account',
    currency: Currency.EUR,
    balance: 100,
    merchantID: '1',
    iban: 'GB12345678901234567890',
    displayName: 'EURO Account',
    identifier: eurAccountIdentifier,
    summary: 'Account',
    isDefault: true,
    availableBalance: 100,
  },

  {
    id: '2',
    accountName: 'GBP Account',
    currency: Currency.GBP,
    balance: 100000,
    merchantID: '1',
    accountNumber: '12345678',
    sortCode: '123456',
    displayName: 'GBP Account',
    identifier: eurAccountIdentifier,
    summary: 'Account',
    isDefault: false,
    availableBalance: 100000,
  },
  {
    id: '3',
    accountName: 'GBP Account 2',
    currency: Currency.GBP,
    balance: 100000,
    merchantID: '1',
    accountNumber: '12345678',
    sortCode: '123456',
    displayName: 'EUR Account 2',
    identifier: eurAccountIdentifier,
    summary: 'Account',
    isDefault: false,
    availableBalance: 100000,
  },
  {
    id: '5',
    accountName: 'A account',
    currency: Currency.EUR,
    balance: 100,
    merchantID: '1',
    iban: 'GB12345678901234567890',
    displayName: 'EURO Account',
    identifier: eurAccountIdentifier,
    summary: 'Account',
    isDefault: true,
    availableBalance: 100,
  },
  {
    id: '6',
    accountName: 'B account',
    currency: Currency.EUR,
    balance: 100,
    merchantID: '1',
    iban: 'GB12345678901234567890',
    displayName: 'EURO Account',
    identifier: eurAccountIdentifier,
    summary: 'Account',
    isDefault: true,
    availableBalance: 100,
  },

  {
    id: '8',
    accountName: 'D account',
    currency: Currency.GBP,
    balance: 100000,
    merchantID: '1',
    accountNumber: '12345678',
    sortCode: '123456',
    displayName: 'EUR Account 2',
    identifier: eurAccountIdentifier,
    summary: 'Account',
    isDefault: false,
    availableBalance: 100000,
  },
]

const eurCounterparty: LocalCounterparty = {
  name: 'John Doe',
  emailAddress: 'email@email.com',
  phoneNumber: '01234567890',
  identifier: eurAccountIdentifier,
  accountInfo: 'IE11MODR99035501927019',
}

const gbpCounterparty: LocalCounterparty = {
  name: 'John Doe GBP',
  emailAddress: '',
  phoneNumber: '',
  identifier: gbpAccountIdentifier,
  accountInfo: '12345678 - 123456',
}

const beneficiaries: LocalBeneficiary[] = [
  {
    id: '1',
    name: 'John Doe',
    merchantID: '1',
    yourReference: 'Test your reference',
    theirReference: 'Test their reference',
    destination: gbpCounterparty,
    currency: Currency.GBP,
  },
  {
    id: '2',
    name: 'John Doe 2',
    merchantID: '1',
    yourReference: 'Test your reference',
    theirReference: 'Test their reference',
    destination: eurCounterparty,
    currency: Currency.EUR,
  },
]

export const users: UserRoleAndUserInvite[] = [
  {
    userID: '1',
    merchantID: '1',
    emailAddress: 'user1@user.com',
    name: 'John Doe',
    lastModified: new Date(),
    roleType: UserRolesEnum.AdminApprover,
    status: UserStatusFilterEnum.Active,
  },
  {
    userID: '2',
    merchantID: '1',
    emailAddress: 'user2@user.com',
    name: 'Jane Doe',
    lastModified: new Date(),
    roleType: UserRolesEnum.NewlyRegistered,
    status: UserStatusFilterEnum.Invited,
  },
  {
    userID: '3',
    merchantID: '1',
    emailAddress: 'user2@user.com',
    name: 'Joe Doe',
    lastModified: new Date(),
    roleType: UserRolesEnum.NewlyRegistered,
    status: UserStatusFilterEnum.RolePending,
  },
  {
    userID: '4',
    merchantID: '1',
    emailAddress: 'user2@user.com',
    name: 'Joe Doe',
    lastModified: new Date(),
    roleType: UserRolesEnum.PaymentRequestor,
    status: UserStatusFilterEnum.Active,
  },
  {
    userID: '4',
    merchantID: '1',
    emailAddress: 'user2@user.com',
    name: 'Joe Doe',
    lastModified: new Date(),
    roleType: UserRolesEnum.User,
    status: UserStatusFilterEnum.Active,
  },
]

export default {
  fewPaymentRequests,
  paymentRequest: {
    regular,
    noShippingAddress,
    partiallyPaidPaymentRequest,
    unpaidPaymentRequest,
    overpaidPaymentRequest,
  },
  merchantTags: mockMerchantTags,
  accounts,
  counterparty: eurCounterparty,
  beneficiaries: beneficiaries,
  payout: {
    pendingApproval: mockPayouts.find((p) => p.status === PayoutStatus.PENDING_APPROVAL),
    queued: mockPayouts.find((p) => p.status === PayoutStatus.QUEUED),
    processed: mockPayouts.find((p) => p.status === PayoutStatus.PROCESSED),
    failed: mockPayouts.find((p) => p.status === PayoutStatus.FAILED),
  },
  users,
}
