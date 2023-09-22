import {
  AISAccount,
  ApiError,
  ApiResponse,
  Consent,
  ConsentRequest,
  ConsentResponse,
  HttpMethod,
} from '../types'
import { ApiProps, ConsentProps } from '../types/props'
import { BaseApiClient } from './BaseApiClient'

/**
 * The OpenBankingClient provides access to the methods available
 * on the MoneyMoov OpenBanking api.
 */
export class OpenBankingClient extends BaseApiClient {
  apiUrl: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.apiUrl = `${props.apiUrl}/openbanking`
  }

  /**
   * Gets a Consent
   * @param consentId The ID of the Consent to retrieve.
   * @returns The Consent if successful. An ApiError if not successful.
   */
  async get({ consentId }: ConsentProps): Promise<ApiResponse<Consent>> {
    return await this.httpRequest<Consent>(`${this.apiUrl}/consents/${consentId}`, HttpMethod.GET)
  }

  /**
   * Retrieve all the open banking consents for a single user.
   * @param merchantId The ID of the merchant to get the consents for
   * @param emailAddress The email address of the end user to get the consents for.
   * @returns A list of open banking consents if successful. An ApiError if not successful.
   */
  async getForUser({ merchantId, emailAddress }: ConsentProps): Promise<ApiResponse<Consent[]>> {
    return await this.httpRequest<Consent[]>(
      `${this.apiUrl}/consents/${merchantId}/${emailAddress}`,
      HttpMethod.GET,
    )
  }

  /**
   * Creates a Consent
   * @param consentRequest The consent to create
   * @returns The newly created Consent if successful. An ApiError if not successful.
   */
  async createConsent(consentRequest: ConsentRequest): Promise<ApiResponse<ConsentResponse>> {
    return await this.httpRequest<ConsentResponse>(
      `${this.apiUrl}/consents`,
      HttpMethod.POST,
      consentRequest,
    )
  }

  /**
   * Deletes a Consent
   * @param consentId The Consent Id
   * @returns True if successfull. An ApiError if not successful.
   */
  async delete({ consentId }: ConsentProps): Promise<{
    success?: boolean
    error?: ApiError
  }> {
    const response = await this.httpRequest(
      `${this.apiUrl}/consents/${consentId}`,
      HttpMethod.DELETE,
    )

    return response.status === 'success'
      ? { success: true }
      : { success: false, error: response.error }
  }

  /**
   * Deletes all the consents for a single user.
   * @param merchantId The merchant id
   * @param emailAddress The email address of the user to delete the consents for.
   * @returns True if successfull. An ApiError if not successful.
   */
  async deleteForUser({ merchantId, emailAddress }: ConsentProps): Promise<{
    success?: boolean
    error?: ApiError
  }> {
    const response = await this.httpRequest(
      `${this.apiUrl}/consents/${merchantId}/${emailAddress}`,
      HttpMethod.DELETE,
    )

    return response.status === 'success'
      ? { success: true }
      : { success: false, error: response.error }
  }

  /**
   * Gets a list of accounts for a consent
   * @param consentId The Consent Id
   * @returns A list of accounts if successful. An ApiError if not successful.
   */
  async getAccounts({ consentId }: ConsentProps): Promise<ApiResponse<AISAccount[]>> {
    return await this.httpRequest<AISAccount[]>(
      `${this.apiUrl}/accounts/${consentId}`,
      HttpMethod.GET,
    )
  }
}
