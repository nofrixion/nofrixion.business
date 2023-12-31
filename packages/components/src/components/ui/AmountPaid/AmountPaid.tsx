import { Currency } from '@nofrixion/moneymoov'

import { LocalPartialPaymentMethods } from '../../../types/LocalEnums'
import { formatAmountAndDecimals } from '../../../utils/formatters'
import { formatCurrency } from '../../../utils/uiFormaters'

const AmountPaid = ({
  amountPaid,
  totalAmount,
  currency,
  partialPaymentMethod,
}: {
  amountPaid: number
  totalAmount: number
  currency: Currency.EUR | Currency.GBP
  partialPaymentMethod: LocalPartialPaymentMethods
}) => {
  const percentagePaid = amountPaid > totalAmount ? 100 : (amountPaid / totalAmount) * 100
  const outstandingAmount = amountPaid > totalAmount ? 0 : totalAmount - amountPaid

  const { amountValueWithCommas, amountDecimals } = formatAmountAndDecimals(totalAmount)

  return (
    <div className="flex flex-col">
      <span className="text-[2rem] font-semibold leading-8 mb-4 text-default-text">
        {formatCurrency(currency)}
        {amountValueWithCommas}
        <sup className="ml-0.5 text-xl">.{amountDecimals}</sup>
      </span>
      {partialPaymentMethod === LocalPartialPaymentMethods.Partial && (
        <div className="flex flex-row h-[0.125rem]">
          {percentagePaid !== 0 && (
            <div
              className="bg-primary-green rounded-l-sm"
              style={{ flexGrow: `${percentagePaid}` }}
            ></div>
          )}
          <div
            className="bg-grey-bg rounded-r-sm"
            style={{ flexGrow: `${100 - percentagePaid}` }}
          ></div>
        </div>
      )}

      {partialPaymentMethod === LocalPartialPaymentMethods.Partial && (
        <span className="text-sm leading-[1.063rem] text-grey-text font-medium mt-2">
          {formatCurrency(currency)}
          <span>
            {new Intl.NumberFormat(navigator.language, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(Number(outstandingAmount))}
          </span>{' '}
          outstanding
        </span>
      )}
    </div>
  )
}

export default AmountPaid
