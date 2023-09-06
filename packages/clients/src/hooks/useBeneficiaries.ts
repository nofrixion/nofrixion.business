import { useQuery } from '@tanstack/react-query'

import { BeneficiaryClient } from '../clients'
import { ApiResponse, BeneficiaryPageResponse } from '../types/ApiResponses'
import { ApiProps, useBeneficiaryProps } from '../types/props'

const fetchBeneficiaries = async (
  apiUrl: string,
  authToken?: string,
  pageNumber?: number,
  pageSize?: number,
  search?: string,
  currency?: string,
): Promise<ApiResponse<BeneficiaryPageResponse>> => {
  const client = new BeneficiaryClient({ apiUrl, authToken })

  const response = await client.getAll({
    pageNumber: pageNumber,
    pageSize: pageSize,
    search: search,
    currency: currency,
  })

  return response
}

export const useBeneficiaries = (
  { pageNumber, pageSize, search, currency }: useBeneficiaryProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = ['Beneficiaries', apiUrl, authToken, pageNumber, pageSize, search, currency]

  return useQuery<ApiResponse<BeneficiaryPageResponse>, Error>(QUERY_KEY, () =>
    fetchBeneficiaries(apiUrl, authToken, pageNumber, pageSize, search, currency),
  )
}
