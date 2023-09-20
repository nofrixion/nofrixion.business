import { Account, AccountUpdate, ApiResponse, HttpMethod, PayoutPageResponse } from '../types'
import { AccountProps, ApiProps, MerchantProps, PayoutsProps } from '../types/props'
import { BaseApiClient } from './BaseApiClient'

/**
 * The AccountsClient provides access to the methods available
 * on the MoneyMoov Accounts api.
 */
export class AccountsClient extends BaseApiClient {
  url: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.url = `${props.apiUrl}/accounts`
  }

  /**
   * Gets a single account.
   * @param accountId The account id to get.
   * @returns All info of a specific account if successful. An ApiError if not successful.
   */
  async getAccount({ accountId }: AccountProps): Promise<ApiResponse<Account>> {
    const response = await this.httpRequest<Account>(`${this.url}/${accountId}`, HttpMethod.GET)

    return response
  }

  /**
   * Get a list of accounts.
   * @param merchantId Optional. The merchant id to filter by.
   * @returns A list of accounts by merchantId or user if successful. An ApiError if not successful.
   */
  async getAccounts({ merchantId }: MerchantProps): Promise<ApiResponse<Account[]>> {
    const response = await this.httpRequest<Account[]>(
      `${this.url}/?merchantID=${merchantId}`,
      HttpMethod.GET,
    )

    return response
  }

  /**
   * Get a list of payouts for this account.
   * @param accountId The account id to get the payouts for
   * @param pageNumber The first page to fetch for the paged response. Default is 1
   * @param pageSize The page size. Default is 20
   * @param fromDate Optional. The date filter to apply to retrieve payoutss created after this date.
   * @param toDate Optional. The date filter to apply to retrieve payouts created up until this date.
   * @param payoutStatuses Optional. The status list filter only retrieves payouts with those statuses. Default all statuses.
   * @returns A list of payouts by accountId. An ApiError if not successful.
   */
  async getPendingPayments({
    accountId,
    pageNumber,
    pageSize,
    fromDate,
    toDate,
    payoutStatuses,
  }: PayoutsProps): Promise<ApiResponse<PayoutPageResponse>> {
    const url = `${this.url}/${accountId}/payouts`

    return await this.getPagedResponse<PayoutPageResponse>(
      {
        pageNumber: pageNumber,
        pageSize: pageSize,
        fromDate: fromDate,
        toDate: toDate,
        payoutStatuses,
      },
      url,
    )
  }

  /**
   * TODO: Updates an Account
   * @param accountId The ID of the Account to update.
   * @param accountUpdate The Account update object with the updated values.
   * @returns The updated Account if successful. An ApiError if not successful.
   */
  async update(accountId: string, accountUpdate: AccountUpdate): Promise<ApiResponse<Account>> {
    return await this.httpRequest<Account>(
      `${this.url}/${accountId}`,
      HttpMethod.PUT,
      accountUpdate,
    )
  }
}
