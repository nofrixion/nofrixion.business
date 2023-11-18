import { useQuery } from '@tanstack/react-query'

import { MerchantClient } from '../clients'
import { TimeFrequencyEnum } from '../types'
import { AccountMetrics, ApiResponse } from '../types/ApiResponses'
import { AccountsMetricsProps, ApiProps } from '../types/props'

const fetchAccountMetrics = async (
  apiUrl: string,
  merchantId?: string,
  authToken?: string,
  fromDate?: Date,
  toDate?: Date,
  timeFrequency?: TimeFrequencyEnum,
): Promise<ApiResponse<AccountMetrics[]>> => {
  const client = new MerchantClient({ apiUrl, authToken })

  const response = await client.getAccountMetrics({
    merchantId: merchantId,
    fromDate: fromDate,
    toDate: toDate,
    timeFrequency: timeFrequency,
  })

  return response
}

export const useAccountMetrics = (
  { merchantId, fromDate, toDate, timeFrequency }: AccountsMetricsProps,
  { apiUrl, authToken }: ApiProps,
) => {
  const QUERY_KEY = ['AccountMetrics', apiUrl, authToken, merchantId]

  return useQuery<ApiResponse<AccountMetrics[]>, Error>(
    QUERY_KEY,
    () => fetchAccountMetrics(apiUrl, merchantId, authToken, fromDate, toDate, timeFrequency),
    {
      enabled: !!merchantId,
    },
  )
}
