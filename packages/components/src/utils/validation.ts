import { coerce, literal, nativeEnum, object, string } from 'zod'

import { LocalInvoicePayment, ValidationResult } from '../types/LocalTypes'

enum Currency {
  GBP = 'GBP',
  EUR = 'EUR',
}

const InvoiceSchema = object({
  InvoiceNumber: string().optional(),
  PaymentTerms: string().optional(),
  InvoiceDate: string().pipe(
    coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === 'invalid_date'
            ? 'InvoiceDate must be in the format YYYY-MM-DD'
            : defaultError,
      }),
    }),
  ),
  DueDate: string().pipe(
    coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === 'invalid_date' ? 'DueDate must be in the format YYYY-MM-DD' : defaultError,
      }),
    }),
  ),
  Contact: string().min(1, 'Contact is required'),
  DestinationIban: string().optional(),
  DestinationAccountNumber: coerce
    .number({
      invalid_type_error: 'DestinationAccountNumber must be a number',
    })
    .optional(),
  DestinationSortCode: coerce
    .number({
      invalid_type_error: 'DestinationSortCode must be a number',
    })
    .optional(),
  Currency: nativeEnum(Currency, {
    invalid_type_error: 'Invalid currency. Must be GBP or EUR',
    required_error: 'Currency is required',
  }),
  Subtotal: coerce
    .number({
      invalid_type_error: 'Subtotal must be a number',
    })
    .optional(),
  Discounts: coerce
    .number({
      invalid_type_error: 'Discounts must be a number',
    })
    .optional(),
  Taxes: coerce
    .number({
      invalid_type_error: 'Taxes must be a number',
    })
    .optional(),
  TotalAmount: coerce
    .number({
      required_error: 'TotalAmount is required',
      invalid_type_error: 'TotalAmount must be a number',
    })
    .min(1, 'TotalAmount must be greater than 0'),
  OutstandingAmount: coerce
    .number({
      required_error: 'OutstandingAmount is required',
      invalid_type_error: 'OutstandingAmount must be a number',
    })
    .min(0, 'OutstandingAmount must be greater than 0'),
  InvoiceStatus: string(),
  Reference: string(),
  RemittanceEmail: string()
    .email('RemittanceEmail is not a valid email')
    .optional()
    .or(literal('')),
})
  .refine((data) => {
    if (data.Currency === 'EUR' && validateIBAN(data.DestinationIban as string) === false) {
      return false
    }
    return true
  }, 'DestinationIban is not a valid iban.')
  .refine((data) => {
    if (data.Currency === 'GBP' && !data.DestinationAccountNumber) {
      return false
    }
    return true
  }, 'DestinationAccountNumber is invalid.')
  .refine((data) => {
    if (data.Currency === 'GBP' && !data.DestinationSortCode) {
      return false
    }
    return true
  }, 'DestinationSortCode is invalid.')

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}

const validateIBAN = (iban: string): boolean => {
  if (!iban || iban.length === 0) {
    return false
  }

  const ibanReplaceRegex = /^[a-zA-Z]{2}[0-9]{2}([a-zA-Z0-9]){11,30}$/g

  if (iban.length > 0 && !ibanReplaceRegex.test(iban)) {
    return false
  }

  const bank = iban.slice(4) + iban.slice(0, 4)
  const asciiShift = 55
  const sb = []

  for (const c of bank) {
    let v
    if (/[A-Z]/.test(c)) {
      v = c.charCodeAt(0) - asciiShift
    } else {
      v = parseInt(c, 10)
    }
    sb.push(v)
  }

  const checkSumString = sb.join('')
  let checksum = parseInt(checkSumString[0], 10)

  for (let i = 1; i < checkSumString.length; i++) {
    const v = parseInt(checkSumString.charAt(i), 10)
    checksum = (checksum * 10 + v) % 97
  }

  if (checksum !== 1) {
    return false
  }

  return true
}

const validateInvoices = (invoicePayments: LocalInvoicePayment[]): ValidationResult[] => {
  const results: ValidationResult[] = []

  invoicePayments.map((invoicePayment, index) => {
    const result = InvoiceSchema.safeParse(invoicePayment)

    if (result.success) {
      results.push({
        lineNumber: index + 1,
        valid: true,
        result: invoicePayment,
      })
    } else {
      results.push({
        lineNumber: index + 1,
        valid: false,
        errors: result.error.issues.map((issue) => issue.message),
        result: invoicePayment,
      })
    }
  })

  return results
}

export { validateEmail, validateIBAN, validateInvoices }
