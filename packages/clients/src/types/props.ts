import { Counterparty, Tag } from './ApiResponses'
import { AccountIdentifierType, Currency, PayoutStatus, SortDirection } from './Enums'

export interface PagedResponseProps
  extends FilterResponseProps,
    MerchantProps,
    AccountProps,
    PayoutsProps {
  pageNumber?: number
  pageSize?: number
  status?: string
}

export interface PaymentRequestPageProps
  extends PagedResponseProps,
    FilterResponseProps,
    PaymentRequestProps,
    MerchantProps {}

export interface PayoutPageProps extends PagedResponseProps, FilterResponseProps {}

export interface UserRoleAndUserInvitePageProps extends PagedResponseProps, FilterResponseProps {}

export interface FilterResponseProps {
  fromDate?: Date
  toDate?: Date
  search?: string
  currency?: string
  minAmount?: number
  maxAmount?: number
  tags?: string[]
  sort?: string
}

export interface MetricsProps extends FilterResponseProps, MerchantProps {}

export interface BeneficiaryProps extends PagedResponseProps {
  search?: string
  currency?: string
}

export interface ApiProps {
  apiUrl: string
  authToken?: string
}

export interface MerchantProps {
  merchantId?: string
}

export interface getAccountProps {
  merchantId?: string
  connectedAccounts?: boolean
}

export interface AccountProps {
  accountId?: string
}

export interface PaymentRequestProps {
  paymentRequestId?: string
  includeEvents?: boolean
  merchantId?: string
}

export interface TransactionsProps extends AccountProps {
  pageNumber?: number
  pageSize?: number
  fromDate?: Date
  toDate?: Date
  sort?: string
  search?: string
}

export interface useTransactionsProps extends AccountProps {
  pageNumber?: number
  pageSize?: number
  fromDateMS?: number
  toDateMS?: number
  search?: string
  dateSortDirection?: SortDirection
  toSortDirection?: SortDirection
  referenceSortDirection?: SortDirection
  amountSortDirection?: SortDirection
  descriptionSortDirection?: SortDirection
  typeSortDirection?: SortDirection
}

export interface usePaymentRequestProps extends MerchantProps, PaymentRequestProps {
  merchantId: string
}

export interface usePaymentRequestsProps
  extends MerchantProps,
    PaymentRequestProps,
    PaymentRequestPageProps {
  merchantId: string
  statusSortDirection: SortDirection
  createdSortDirection: SortDirection
  contactSortDirection: SortDirection
  amountSortDirection: SortDirection
  fromDateMS?: number
  toDateMS?: number
  preservePreviousPageData?: boolean
}

export interface usePayoutsProps extends MerchantProps, PayoutPageProps {
  merchantId: string
  statusSortDirection: SortDirection
  createdSortDirection: SortDirection
  amountSortDirection: SortDirection
  counterPartyNameSortDirection: SortDirection
  fromDateMS?: number
  toDateMS?: number
  statuses: PayoutStatus[]
}

export interface useUsersAndInvitesProps extends MerchantProps, PayoutPageProps {
  merchantId: string
  statusSortDirection: SortDirection
  lastModifiedSortDirection: SortDirection
  nameSortDirection: SortDirection
  roleSortDirection: SortDirection
}

export interface useUsersAndInvitesMetricsProps extends MerchantProps, PayoutPageProps {
  merchantId: string
  search?: string
}

export interface usePaymentRequestMetricsProps extends MetricsProps {
  fromDateMS?: number
  toDateMS?: number
}

export interface usePayoutMetricsProps extends MetricsProps {
  fromDateMS?: number
  toDateMS?: number
}

export interface useBeneficiaryProps {
  pageNumber?: number
  pageSize?: number
  search?: string
  currency?: string
}

export interface RefundProps {
  authorizationId: string
  paymentRequestId: string
  amount?: number
}

export interface VoidProps {
  authorizationId: string
  paymentRequestId: string
}

export interface CaptureProps {
  authorizationId: string
  paymentRequestId: string
  amount?: number
}

export interface DeleteTagProps {
  id: string
  tagId: string
  existingTagsIds: string[]
}

export interface AddTagProps {
  id: string
  tag: Tag
  existingTagsIds: string[]
}

export interface CreateTagProps {
  tag: Tag
}

export interface PayoutsProps extends AccountProps {
  pageNumber?: number
  pageSize?: number
  fromDate?: Date
  toDate?: Date
  payoutStatuses?: PayoutStatus[]
}

export interface usePendingPaymentsProps extends AccountProps {
  pageNumber?: number
  pageSize?: number
  fromDateMS?: number
  toDateMS?: number
  payoutStatuses?: PayoutStatus[]
}

export interface CreatePayoutProps {
  accountID: string
  type: AccountIdentifierType
  description?: string
  currency: Currency
  amount: number
  yourReference?: string
  theirReference: string
  destination: Counterparty
  invoiceID?: string
  allowIncomplete: boolean
  paymentRequestId?: string
}

export interface PayoutProps {
  payoutId?: string
}

export interface ConsentProps {
  consentId?: string
  merchantId?: string
  emailAddress?: string
}

export interface UserInviteProps {
  inviteId?: string
}
