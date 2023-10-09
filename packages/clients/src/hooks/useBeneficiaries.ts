import { useQuery } from '@tanstack/react-query'

import { BeneficiaryClient } from '../clients'
import { ApiResponse, BeneficiaryPageResponse } from '../types/ApiResponses'
import { ApiProps, useBeneficiaryProps } from '../types/props'

const fetchBeneficiaries = async (
  apiUrl: string,
  authToken?: string,
  merchantId?: string,
  pageNumber?: number,
  pageSize?: number,
  search?: string,
  currency?: string,
): Promise<ApiResponse<BeneficiaryPageResponse>> => {
  const client = new BeneficiaryClient({ apiUrl, authToken })

  const response = await client.getAll({
    merchantId: merchantId,
    pageNumber: pageNumber,
    pageSize: pageSize,
    search: search,
    currency: currency,
  })

  return response
}

export const useBeneficiaries = (
  { merchantId, pageNumber, pageSize, search, currency }: useBeneficiaryProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = [
    'Beneficiaries',
    apiUrl,
    authToken,
    merchantId,
    pageNumber,
    pageSize,
    search,
    currency,
  ]

  return useQuery<ApiResponse<BeneficiaryPageResponse>, Error>(QUERY_KEY, () =>
    fetchBeneficiaries(apiUrl, authToken, merchantId, pageNumber, pageSize, search, currency),
  )
}
