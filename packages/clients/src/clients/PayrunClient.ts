import { PayrunCreate } from '../types/ApiRequests'
import { ApiResponse, Payrun } from '../types/ApiResponses'
import { HttpMethod } from '../types/Enums'
import { ApiProps } from '../types/props'
import { BaseApiClient } from './BaseApiClient'

/**
 * The PayrunClient provides access to the methods available
 * on the MoneyMoov Payrun api.
 */
export class PayrunClient extends BaseApiClient {
  apiUrl: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken, true)
    this.apiUrl = `${props.apiUrl}/payruns`
  }

  /**
   * Creates a Payrun
   * @param payrunCreate The payrun to create
   * @returns The newly created Parun if successful. An ApiError if not successful.
   */
  async create(payrunCreate: PayrunCreate): Promise<ApiResponse<Payrun>> {
    return await this.httpRequest<Payrun>(
      `${this.apiUrl}/${payrunCreate.merchantID}`,
      HttpMethod.POST,
      payrunCreate,
      'application/json',
    )
  }
}
