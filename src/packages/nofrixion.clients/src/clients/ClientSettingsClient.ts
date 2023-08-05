import { ApiProps } from '../types/props'
import { ApiError, ApiResponse, UserPaymentDefaults } from '../types/ApiResponses'
import { HttpMethod } from '../types/Enums'
import { BaseApiClient } from './BaseApiClient'

/**
 * The ClientSettingsClient provides access to the methods available
 * on the MoneyMoov ClientSettings api.
 */
export class ClientSettingsClient extends BaseApiClient {
  paymentDefaultsUrl: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.paymentDefaultsUrl = `${props.apiUrl}/clientsettings/paymentdefaults`
  }

  /**
   * Gets the user payment defaults
   * @returns A UserPaymentDefaults if successful. An ApiError if not successful.
   */
  async getUserPaymentDefaults(): Promise<ApiResponse<UserPaymentDefaults>> {
    const response = await this.httpRequest<UserPaymentDefaults>(
      this.paymentDefaultsUrl,
      HttpMethod.GET,
    )

    return response
  }

  /**
   * Saves the user payment defaults
   * @param userPaymentDefaults The user payment defaults to save
   * @returns A UserPaymentDefaults if successful. An ApiError if not successful.
   */
  async saveUserPaymentDefaults(
    userPaymentDefaults: UserPaymentDefaults,
  ): Promise<ApiResponse<UserPaymentDefaults>> {
    const response = await this.httpRequest<UserPaymentDefaults>(
      this.paymentDefaultsUrl,
      HttpMethod.POST,
      userPaymentDefaults,
    )

    return response
  }

  /**
   * Deletes the user payment defaults
   * @returns True if successfull. An ApiError if not successful.
   */
  async deleteUserPaymentDefaults(): Promise<{
    success?: boolean
    error?: ApiError
  }> {
    const response = await this.httpRequest(this.paymentDefaultsUrl, HttpMethod.DELETE)

    return response.status === 'success' ? { success: true } : { error: response.error }
  }
}
