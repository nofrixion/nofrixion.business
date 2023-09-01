import { ApiError } from '@nofrixion/moneymoov'

import { ErrorType } from '../stores/useErrorsStore'

export const tryParseApiError = (id?: string, result?: string, search?: string) => {
  if (id && result) {
    const params = new URLSearchParams(search)

    const apiErrorBase64 = params.get('apiError')

    if (id && apiErrorBase64) {
      const apiError = JSON.parse(atob(apiErrorBase64)) as ApiError

      return {
        type: ErrorType.PAYOUT,
        id: id,
        error: apiError,
      }
    }
  }
}
