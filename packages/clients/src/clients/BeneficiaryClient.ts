import { ApiResponse, Beneficiary, BeneficiaryPageResponse } from '../types/ApiResponses'
import { HttpMethod } from '../types/Enums'
import { ApiProps, BeneficiaryProps } from '../types/props'
import { BaseApiClient } from './BaseApiClient'

/**
 * The PayoutClient provides access to the methods available
 * on the MoneyMoov Payouts api.
 */
export class BeneficiaryClient extends BaseApiClient {
  apiUrl: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.apiUrl = `${props.apiUrl}/beneficiaries`
  }

  /**
   * Creates a Beneficiary
   * @param beneficiary The payout to create
   * @returns The newly created Beneficiary if successful. An ApiError if not successful.
   */
  async create(beneficiary: Beneficiary): Promise<ApiResponse<Beneficiary>> {
    return await this.httpRequest<Beneficiary>(this.apiUrl, HttpMethod.POST, beneficiary)
  }

  /**
   * Gets a paged list of Beneficiaries
   * @param pageNumber The first page to fetch for the paged response. Default is 1
   * @param pageSize The page size. Default is 20
   * @param search Optional. The search filter to apply to retrieve records with this search text in the name, references, IBAN, account name or number and sortcode.
   * @param currency Optional. The currency filter to apply to retrieve records with this currency.
   * @returns A BeneficiaryPageResponse if successful. An ApiError if not successful.
   */
  async getAll({
    merchantId,
    pageNumber = 1,
    pageSize = 20,
    search,
    currency,
  }: BeneficiaryProps): Promise<ApiResponse<BeneficiaryPageResponse>> {
    return await this.getPagedResponse<BeneficiaryPageResponse>(
      {
        merchantId: merchantId,
        pageNumber: pageNumber,
        pageSize: pageSize,
        search: search,
        currency: currency,
      },
      this.apiUrl,
    )
  }
}
