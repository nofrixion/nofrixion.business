import { PayoutCreate } from '../types/ApiRequests'
import { ApiResponse, Payout } from '../types/ApiResponses'
import { HttpMethod } from '../types/Enums'
import { ApiProps } from '../types/props'
import { BaseApiClient } from './BaseApiClient'

/**
 * The PayoutClient provides access to the methods available
 * on the MoneyMoov Payouts api.
 */
export class PayoutClient extends BaseApiClient {
  apiUrl: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.apiUrl = `${props.apiUrl}/payouts`
  }

  /**
   * Creates a Payout
   * @param payoutCreate The payout to create
   * @returns The newly created Payout if successful. An ApiError if not successful.
   */
  async create(payoutCreate: PayoutCreate): Promise<ApiResponse<Payout>> {
    return await this.httpRequest<Payout>(this.apiUrl, HttpMethod.POST, payoutCreate)
  }
}
