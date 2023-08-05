import { ApiProps, TransactionsProps } from '../types/props'
import { ApiError, ApiResponse, TransactionPageResponse } from '../types/ApiResponses'
import { BaseApiClient } from './BaseApiClient'

/**
 * The TransactionsRequestClient provides access to the methods available
 * on the MoneyMoov Transactions api.
 */
export class TransactionsClient extends BaseApiClient {
  apiUrl: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.apiUrl = `${props.apiUrl}/transactions`
  }

  /**
   * Gets a paged list of Transactions
   * @param accountId The account id to get the transactions for
   * @param pageNumber The first page to fetch for the paged response. Default is 1
   * @param pageSize The page size. Default is 20
   * @param fromDate Optional. The date filter to apply to retrieve payment requests created after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests created up until this date.
   * @returns A TransactionPageResponse if successful. An ApiError if not successful.
   */
  async get({
    accountId,
    pageNumber,
    pageSize,
    fromDate,
    toDate,
  }: TransactionsProps): Promise<ApiResponse<TransactionPageResponse>> {
    const url = `${this.apiUrl}/${accountId}`

    return await this.getPagedResponse<TransactionPageResponse>(
      {
        pageNumber: pageNumber,
        pageSize: pageSize,
        fromDate: fromDate,
        toDate: toDate,
      },
      url,
    )
  }
}
