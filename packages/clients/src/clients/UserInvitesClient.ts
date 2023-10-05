import { ApiResponse, HttpMethod, UserInvite, UserInviteCreate } from '../types'
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
   * Creates a new user invite and optionally sends the invitee an email with the details.
   * @param userInviteCreate The user invite to create.
   * @returns UserInvite if successful. An ApiError if not successful.
   */
  async sendUserInvite(userInviteCreate: UserInviteCreate): Promise<ApiResponse<UserInvite>> {
    return await this.httpRequest<UserInvite>(this.url, HttpMethod.POST, userInviteCreate)
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
