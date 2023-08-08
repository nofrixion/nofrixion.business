import { ApiProps, MerchantProps } from '../types/props'
import { Account, ApiResponse, HttpMethod } from '../types'
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
}
