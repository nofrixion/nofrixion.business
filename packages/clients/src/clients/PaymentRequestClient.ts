import {
  PaymentRequestProps,
  PaymentRequestPageProps,
  MetricsProps,
  ApiProps,
} from '../types/props'
import { PaymentRequestCreate, PaymentRequestUpdate } from '../types/ApiRequests'
import {
  ApiError,
  PaymentRequestMetrics,
  PaymentRequestMinimal,
  PaymentRequestPageResponse,
  PaymentRequest,
  ApiResponse,
} from '../types/ApiResponses'
import { HttpMethod } from '../types/Enums'
import { BaseApiClient } from './BaseApiClient'

/**
 * The PaymentRequestClient provides access to the methods available
 * on the MoneyMoov PaymentRequests api.
 */
export class PaymentRequestClient extends BaseApiClient {
  apiUrl: string

  /**
   * Production: https://api.nofrixion.com/api/v1
   * Sandbox: https://api-sandbox.nofrixion.com/api/v1
   * @param apiUrl The base api url.
   * @param authToken The OAUTH token used to authenticate with the api.
   */
  constructor({ ...props }: ApiProps) {
    super(props.authToken)
    this.apiUrl = `${props.apiUrl}/paymentrequests`
  }

  /**
   * Gets a paged list of Payment Requests
   * @param pageNumber The first page to fetch for the paged response. Default is 1
   * @param pageSize The page size. Default is 20
   * @param sort Optional expression to sort the order of the payment requests. Example "Amount desc,Inserted asc".
   * @param fromDate Optional. The date filter to apply to retrieve payment requests created after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests created up until this date.
   * @param status Optional. The status filter to apply to retrieve records with this status.
   * @param search Optional. The search filter to apply to retrieve records with this search text in the description, title, merchant name or contact name.
   * @param currency Optional. The currency filter to apply to retrieve records with this currency.
   * @param minAmount Optional. The minimum amount filter to apply to retrieve records with this minimum amount.
   * @param maxAmount Optional. The maximum amount filter to apply to retrieve records with this maximum amount.
   * @param tags Optional. The tags filter to apply to retrieve records with these tags.
   * @returns A PaymentRequestPageResponse if successful. An ApiError if not successful.
   */
  async getAll({
    pageNumber = 1,
    pageSize = 20,
    sort,
    fromDate,
    toDate,
    status,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
    merchantId,
  }: PaymentRequestPageProps): Promise<ApiResponse<PaymentRequestPageResponse>> {
    return await this.getPagedResponse<PaymentRequestPageResponse>(
      {
        merchantId: merchantId,
        pageNumber: pageNumber,
        pageSize: pageSize,
        sort: sort,
        fromDate: fromDate,
        toDate: toDate,
        status: status,
        search: search,
        currency: currency,
        minAmount: minAmount,
        maxAmount: maxAmount,
        tags: tags,
      },
      this.apiUrl,
    )
  }

  /**
   * Get a single Payment request
   * @param paymentRequestId The Payment Request Id
   * @param includeEvents Optional. Include the events for the Payment Request. Default is false.
   * @returns A PaymentRequest if successful. An ApiError if not successful.
   */
  async get({
    paymentRequestId,
    includeEvents = false,
  }: PaymentRequestProps): Promise<ApiResponse<PaymentRequest>> {
    return await this.httpRequest<PaymentRequest>(
      `${this.apiUrl}/${paymentRequestId}?includeEvents=${includeEvents}`,
      HttpMethod.GET,
    )
  }

  /**
   * Creates a Payment request
   * @param paymentRequest The Payment Request to create
   * @returns The newly created PaymentRequest if successful. An ApiError if not successful.
   */
  async create(paymentRequest: PaymentRequestCreate): Promise<ApiResponse<PaymentRequest>> {
    return await this.httpRequest<PaymentRequest>(this.apiUrl, HttpMethod.POST, paymentRequest)
  }

  /**
   * Updates a Payment request
   * @param paymentRequestId The ID of the Payment Request to update.
   * @param paymentRequestUpdate The Payment Request update object with the updated values.
   * @returns The updated PaymentRequest if successful. An ApiError if not successful.
   */
  async update(
    paymentRequestId: string,
    paymentRequestUpdate: PaymentRequestUpdate,
  ): Promise<ApiResponse<PaymentRequest>> {
    return await this.httpRequest<PaymentRequest>(
      `${this.apiUrl}/${paymentRequestId}`,
      HttpMethod.PUT,
      paymentRequestUpdate,
    )
  }

  /**
   * Get a minimal representation of the Payment request
   * @param paymentRequestId The Payment Request Id
   * @returns A PaymentRequestMinimal if successful. An ApiError if not successful.
   */
  async minimal(paymentRequestId: string): Promise<ApiResponse<PaymentRequestMinimal>> {
    return await this.httpRequest<PaymentRequestMinimal>(
      `${this.apiUrl}/${paymentRequestId}/minimal`,
      HttpMethod.GET,
    )
  }

  /**
   * Deletes a Payment Request
   * @param paymentRequestId The Payment Request Id
   * @returns True if successfull. An ApiError if not successful.
   */
  async delete(paymentRequestId: string): Promise<{
    success?: boolean
    error?: ApiError
  }> {
    const response = await this.httpRequest(`${this.apiUrl}/${paymentRequestId}`, HttpMethod.DELETE)

    return response.status === 'success'
      ? { success: true }
      : { success: false, error: response.error }
  }

  /**
   * Voids a card Payment Request
   * @param paymentRequestId The Payment Request Id
   * @returns True if successfull. An ApiError if not successful.
   */
  async voidCardPayment(paymentRequestId: string): Promise<{
    success?: boolean
    error?: ApiError
  }> {
    const response = await this.httpRequest(
      `${this.apiUrl}/${paymentRequestId}/card/voidpaymentrequest`,
      HttpMethod.POST,
    )

    return response.status === 'success'
      ? { success: true }
      : { success: false, error: response.error }
  }

  /**
   * Gets the metrics for Payment Requests
   * @param fromDate Optional. The date filter to apply to retrieve payment requests metrics after this date.
   * @param toDate Optional. The date filter to apply to retrieve payment requests metrics up until this date.
   * @param search Optional. The search filter to apply to retrieve payment request metrics with this search text in the description, title, merchant name, contact mail or contact names.
   * @param currency Optional. The currency filter to apply to retrieve payment request metrics with this currency.
   * @param minAmount Optional. The minimum amount filter to apply to retrieve payment request metrics with this minimum amount.
   * @param maxAmount Optional. The maximum amount filter to apply to retrieve payment request metrics with this maximum amount.
   * @param tags Optional. The tags filter to apply to retrieve payment request metrics with these tags.
   * @returns A PaymentRequestMetrics response if successful. An ApiError if not successful.
   */
  async metrics({
    fromDate,
    toDate,
    search,
    currency,
    minAmount,
    maxAmount,
    tags,
    merchantId,
  }: MetricsProps): Promise<ApiResponse<PaymentRequestMetrics>> {
    let url = `${this.apiUrl}/metrics`

    const filterParams = new URLSearchParams()

    if (merchantId) {
      filterParams.append('merchantID', merchantId)
    }

    if (fromDate) {
      filterParams.append('fromDate', fromDate.toUTCString())
    }

    if (toDate) {
      filterParams.append('toDate', toDate.toUTCString())
    }

    if (search) {
      filterParams.append('search', search)
    }

    if (currency) {
      filterParams.append('currency', currency)
    }

    if (minAmount) {
      filterParams.append('minAmount', minAmount.toString())
    }

    if (maxAmount) {
      filterParams.append('maxAmount', maxAmount.toString())
    }

    if (tags) {
      tags.forEach((tag) => filterParams.append('tags', tag))
    }

    url = `${url}?${filterParams.toString()}`

    return await this.httpRequest<PaymentRequestMetrics>(url, HttpMethod.GET)
  }

  /**
   * Captures a Payment Request attempt.
   * @param paymentRequestId The Payment Request Id
   * @param authorizationId Capture authorization Id
   * @param amount Amount to capture. If set to 0, the remaining amount will be captured.
   * @returns True if successfull. An ApiError if not successful.
   */
  async captureCardPayment(
    paymentRequestId: string,
    authorizationId: string,
    amount?: number,
  ): Promise<{
    success?: boolean
    error?: ApiError
  }> {
    const response = await this.httpRequest(
      `${this.apiUrl}/${paymentRequestId}/card/capture`,
      HttpMethod.POST,
      {
        authorizationID: authorizationId,
        amount: amount ?? 0,
      },
    )

    return response.status === 'success'
      ? { success: true }
      : { success: false, error: response.error }
  }

  /**
   * Refunds a Payment Request attempt.
   * @param paymentRequestId The Payment Request Id
   * @param authorizationId card payment authorization Id
   * @param amount Amount to refund. If set to 0, the remaining amount will be refunded.
   * @returns True if successfull. An ApiError if not successful.
   */
  async refundCardPayment(
    paymentRequestId: string,
    authorizationId: string,
    amount?: number,
  ): Promise<{
    success?: boolean
    error?: ApiError
  }> {
    const response = await this.httpRequest(
      `${this.apiUrl}/${paymentRequestId}/card/void/${amount}`,
      HttpMethod.POST,
      {
        authorizationID: authorizationId,
      },
    )

    return response.status === 'success'
      ? { success: true }
      : { success: false, error: response.error }
  }
}
