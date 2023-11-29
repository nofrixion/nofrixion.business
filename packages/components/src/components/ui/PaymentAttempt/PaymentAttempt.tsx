import { Currency } from '@nofrixion/moneymoov'
import { Fragment } from 'react'

import { LocalPaymentMethodTypes } from '../../../types/LocalEnums'
import { LocalPaymentAttempt } from '../../../types/LocalTypes'
import { isCaptureable, isRefundable, isVoid } from '../../../utils/paymentAttemptsHelper'
import { Button, Icon } from '../atoms'

export interface PaymentAttemptProps {
  paymentAttempt: LocalPaymentAttempt
  cardAuthoriseOnly: boolean
  onRefund: (paymentAttempt: LocalPaymentAttempt) => void
  onVoid: (paymentAttempt: LocalPaymentAttempt) => void
  onCapture: (paymentAttempt: LocalPaymentAttempt) => void
}

const PaymentAttempt = ({ paymentAttempt, onRefund, onVoid, onCapture }: PaymentAttemptProps) => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return (
    <>
      <Fragment key={paymentAttempt.attemptKey}>
        <div className="group whitespace-nowrap">
          <div className="pl-2 lg:pl-6 pb-2">
            <div className="flex flex-row items-center">
              <span className="mr-2">
                <Icon name="card/16" />
              </span>
            </div>
          </div>
          <div className="pl-2 lg:pl-6 pb-2 text-right">
            <span className="mr-2 text-sm font-medium leading-6 tabular-nums">
              <span className="lg:hidden">
                {paymentAttempt.currency === Currency.EUR ? '€' : '£'}
              </span>
              {formatter.format(Number(paymentAttempt.amount))}
            </span>
          </div>
          <div className="hidden lg:table-cell pb-2">
            <span className="text-grey-text font-normal text-[0.813rem] leading-6">
              {paymentAttempt.currency}
            </span>
          </div>

          <div className="pl-2 pb-2 lg:pl-6 leading-6">
            <div className="flex justify-end gap-2">
              {isCaptureable(paymentAttempt) && (
                <Button
                  variant="primary"
                  size="x-small"
                  className="px-2 w-min"
                  onClick={() => onCapture(paymentAttempt)}
                >
                  Capture
                </Button>
              )}
              {paymentAttempt.status === 'authorized' && (
                <span className="text-grey-text text-[10px] leading-4 block px-1 border rounded border-solid border-border-grey-highlighted">
                  Authorized
                </span>
              )}
              {isRefundable(paymentAttempt) && (
                <Button
                  variant="secondary"
                  size="x-small"
                  className="px-2 w-min"
                  onClick={() => onRefund(paymentAttempt)}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <Icon name="return/12" />
                    <span>Refund</span>
                  </div>
                </Button>
              )}
              {paymentAttempt.paymentMethod === LocalPaymentMethodTypes.Card &&
                isVoid(paymentAttempt) && (
                  <Button
                    variant="secondary"
                    size="x-small"
                    className="px-2 w-min"
                    onClick={() => onVoid(paymentAttempt)}
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <Icon name="void/12" />
                      <span>Void</span>
                    </div>
                  </Button>
                )}
            </div>
          </div>
        </div>
      </Fragment>
    </>
  )
}

export default PaymentAttempt
