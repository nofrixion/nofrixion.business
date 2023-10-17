import { UserRoleCreate } from '../types'
import {
  ApiError,
  ApiResponse,
  Merchant,
  MerchantBankSettings,
  Tag,
  TransactionPageResponse,
  UserRole,
} from '../types/ApiResponses'
import { HttpMethod } from '../types/Enums'
import { ApiProps, MerchantProps, TransactionsProps } from '../types/props'
import { BaseApiClient } from './BaseApiClient'

/**
 * The MerchantClient provides access to the methods available
 * on the MoneyMoov Merchant API.
 */
export class MerchantClient extends BaseApiClient {
  apiUrl: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.apiUrl = `${props.apiUrl}/merchants`
  }

  /**
   * Gets a list of merchants the user has access to.
   * @returns A list of merchants if successful. An ApiError if not successful.
   */
  async get(): Promise<ApiResponse<Merchant[]>> {
    return await this.httpRequest<Merchant[]>(`${this.apiUrl}`, HttpMethod.GET)
  }

  /**
   * Gets a single merchant.
   * @param merchantId The merchant id to get
   * @returns All info of a specific merchant if successful. An ApiError if not successful.
   */
  async getMerchant({ merchantId }: MerchantProps): Promise<ApiResponse<Merchant>> {
    return await this.httpRequest<Merchant>(`${this.apiUrl}/${merchantId}`, HttpMethod.GET)
  }

  /**
   * Gets the bank settings of the merchant
   * @param merchantId The merchant id to get the bank settings for
   * @returns A MerchantBankSettings if successful. An ApiError if not successful.
   */
  async getBankSettings({ merchantId }: MerchantProps): Promise<ApiResponse<MerchantBankSettings>> {
    return await this.httpRequest<MerchantBankSettings>(
      `${this.apiUrl}/${merchantId}/banksettings`,
      HttpMethod.GET,
    )
  }

  /**
   * Gets the tags for the merchant
   * @param merchantId The merchant id to get the tags for
   * @returns A list of tags if successful. An ApiError if not successful.
   */
  async getTags({ merchantId }: MerchantProps): Promise<ApiResponse<Tag[]>> {
    return await this.httpRequest<Tag[]>(`${this.apiUrl}/${merchantId}/tags`, HttpMethod.GET)
  }

  /**
   * Adds a tag to the merchant
   * @param merchantId The Merchant Id
   * @param tag The tag to add
   * @returns True if successfull. An ApiError if not successful.
   */
  async addTag({ merchantId }: MerchantProps, tag: Tag): Promise<ApiResponse<Tag>> {
    return await this.httpRequest<Tag>(`${this.apiUrl}/${merchantId}/tags`, HttpMethod.POST, tag)
  }

  /**
   * Deletes a Tag
   * @param merchantId The Merchant Id
   * @param tagId The Tag Id
   * @returns True if successfull. An ApiError if not successful.
   */
  async deleteTag(
    { merchantId }: MerchantProps,
    tagId: string,
  ): Promise<{
    success?: boolean
    error?: ApiError
  }> {
    const response = await this.httpRequest(
      `${this.apiUrl}/${merchantId}/tags/${tagId}`,
      HttpMethod.DELETE,
    )

    return response.status === 'success'
      ? { success: true }
      : { success: false, error: response.error }
  }

  /**
   * Assigns a user role to a user
   * @param userRoleCreate The UserRoleCreate to create a user role
   * @returns A UserRole response if successful. An ApiError if not successful.
   */
  async assignUserRole(userRoleCreate: UserRoleCreate): Promise<ApiResponse<UserRole>> {
    const url = `${this.apiUrl}/userroles`

    return await this.httpRequest<UserRole>(url, HttpMethod.POST, userRoleCreate)
  }

  /**
   * Delete a user role.
   * @param userRoleId The user role id to delete.
   * @returns OK if successful. An ApiError if not successful.
   */
  async deleteUserRole(userRoleId: string): Promise<ApiResponse<undefined>> {
    const url = `${this.apiUrl}/userroles`
    return await this.httpRequest<undefined>(`${url}/${userRoleId}`, HttpMethod.DELETE)
  }

  /**
   * Gets a paged list of Transactions for a user
   * @param pageNumber The first page to fetch for the paged response. Default is 1
   * @param pageSize The page size. Default is 20
   * @param fromDate Optional. The date filter to apply to retrieve payment requests created after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests created up until this date.
   * @param creditType Optional. The credit type filter to apply to retrieve transactions, either payin or payout.
   * @returns A TransactionPageResponse if successful. An ApiError if not successful.
   */
  async getTransactions({
    merchantId,
    pageNumber,
    pageSize,
    fromDate,
    toDate,
  }: TransactionsProps & MerchantProps): Promise<ApiResponse<TransactionPageResponse>> {
    const url = `${this.apiUrl}/${merchantId}/transactions`

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
