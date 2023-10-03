import { ApiResponse, HttpMethod } from '../types'
import { ApiProps, UserInviteProps } from '../types/props'
import { BaseApiClient } from './BaseApiClient'

/**
 * The UserInvitesClient provides access to the methods available
 * on the MoneyMoov UserInvites api.
 */
export class UserInvitesClient extends BaseApiClient {
  url: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.url = `${props.apiUrl}/userinvites`
  }

  /**
   * Resend, or request a resend, of a user invite.
   * @param inviteId The ID of the user invite to resend.
   * @returns OK if successful. An ApiError if not successful.
   */
  async resendUserInvite({ inviteId }: UserInviteProps): Promise<ApiResponse<undefined>> {
    return await this.httpRequest<undefined>(`${this.url}/${inviteId}`, HttpMethod.PUT)
  }
}
