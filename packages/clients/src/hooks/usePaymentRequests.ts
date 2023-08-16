import { useQuery } from '@tanstack/react-query'

import { PaymentRequestClient } from '../clients'
import { formatSortExpression, SortDirection } from '../types'
import { ApiResponse, PaymentRequestPageResponse } from '../types/ApiResponses'
import { ApiProps, usePaymentRequestsProps } from '../types/props'

const fetchPaymentRequests = async (
  apiUrl: string,
  statusSortDirection: SortDirection,
  createdSortDirection: SortDirection,
  contactSortDirection: SortDirection,
  amountSortDirection: SortDirection,
  authToken?: string,
  merchantId?: string,
  pageNumber?: number,
  pageSize?: number,
  fromDateMS?: number,
  toDateMS?: number,
  status?: string,
  search?: string,
  currency?: string,
  minAmount?: number,
  maxAmount?: number,
  tags?: string[],
): Promise<ApiResponse<PaymentRequestPageResponse>> => {
  const sortExpression = formatSortExpression({
    statusSortDirection: statusSortDirection,
    createdSortDirection: createdSortDirection,
    contactSortDirection: contactSortDirection,
    amountSortDirection: amountSortDirection,
  })

  const client = new PaymentRequestClient({ apiUrl, authToken })

  const response = await client.getAll({
    pageNumber: pageNumber,
    pageSize: pageSize,
    sort: sortExpression,
    fromDate: fromDateMS ? new Date(fromDateMS) : undefined,
    toDate: toDateMS ? new Date(toDateMS) : undefined,
    status: status,
    search: search,
    currency: currency,
    minAmount: minAmount,
    maxAmount: maxAmount,
    tags: tags,
    merchantId: merchantId,
  })

  return response
}

export const usePaymentRequests = (
  {
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    status,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  }: usePaymentRequestsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'PaymentRequests',
    apiUrl,
    authToken,
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    pageNumber,
    pageSize,
    fromDateMS,
    toDateMS,
    status,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
  ]

  return useQuery<ApiResponse<PaymentRequestPageResponse>, Error>(
    QUERY_KEY,
    () =>
      fetchPaymentRequests(
        apiUrl,
        statusSortDirection,
        createdSortDirection,
        contactSortDirection,
        amountSortDirection,
        authToken,
        merchantId,
        pageNumber,
        pageSize,
        fromDateMS,
        toDateMS,
        status,
        search,
        currency,
        minAmount,
        maxAmount,
        tags,
      ),
    {
      enabled: !!merchantId,
    },
  )
}
