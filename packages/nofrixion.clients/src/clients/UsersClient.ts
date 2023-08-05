import { ApiProps } from '../types/props'
import { ApiResponse, HttpMethod, User } from '../types'
import { BaseApiClient } from './BaseApiClient'

/**
 * The UsersClient provides access to the methods available
 * on the MoneyMoov Users api.
 */
export class UsersClient extends BaseApiClient {
  url: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.url = `${props.apiUrl}/user`
  }

  /**
   * Get the profile for the authenticated user.
   * @returns The user's profile if successful. An ApiError if not successful.
   */
  async getUser(): Promise<ApiResponse<User>> {
    return await this.httpRequest<User>(`${this.url}`, HttpMethod.GET)
  }
}
