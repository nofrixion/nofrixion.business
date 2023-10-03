import { ApiResponse, HttpMethod, User, UserRoleAndUserInvitePageResponse } from '../types'
import { ApiProps, UserRoleAndUserInvitePageProps } from '../types/props'
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

  /**
   * Get all users and user invites
   * @param pageNumber The first page to fetch for the paged response. Default is 1
   * @param pageSize The page size. Default is 20
   * @param sort Optional expression to sort the order of the payouts. Example "Amount desc,Inserted asc".
   * @param search Optional. The search filter to apply to retrieve records with this search text in the description, title, merchant name or contact name.
   * @param merchantId The merchant id to get the users for
   * @returns
   */
  async getAllAndInvites({
    pageNumber = 1,
    pageSize = 20,
    sort,
    search,
    merchantId,
    status,
  }: UserRoleAndUserInvitePageProps): Promise<ApiResponse<UserRoleAndUserInvitePageResponse>> {
    return await this.getPagedResponse<UserRoleAndUserInvitePageResponse>(
      {
        merchantId: merchantId,
        pageNumber: pageNumber,
        pageSize: pageSize,
        sort: sort,
        search: search,
        status: status,
      },
      `${this.url}/${merchantId}/usersWithUserInvites`,
    )
  }
}
