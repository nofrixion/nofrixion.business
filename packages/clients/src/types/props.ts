import { SortDirection } from './Enums'

export interface PagedResponseProps extends FilterResponseProps, MerchantProps, AccountProps {
  pageNumber?: number
  pageSize?: number
  status?: string
}

export interface PaymentRequestPageProps
  extends PagedResponseProps,
    FilterResponseProps,
    PaymentRequestProps,
    MerchantProps {}

export interface PaymentRequestProps {
  paymentRequestId?: string
  includeEvents?: boolean
}

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

export interface ApiProps {
  apiUrl: string
  authToken?: string
}

export interface MerchantProps {
  merchantId?: string
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
}

export interface usePaymentRequestMetricsProps extends MetricsProps {
  fromDateMS?: number
  toDateMS?: number
}

export interface RefundProps {
  authorizationId: string
  paymentRequestId: string
  amount?: number
}
