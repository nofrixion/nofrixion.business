import { Currency } from '@nofrixion/moneymoov'
import { Fragment } from 'react'

import { LocalPaymentAttemptEventType } from '../../../types/LocalEnums'
import { LocalPaymentAttemptEvent } from '../../../types/LocalTypes'
import { cn } from '../../../utils'
import { formatDateWithYearAndTime } from '../../../utils/formatters'
import { Icon } from '../atoms'

export interface PaymentAttemptEventProps {
  paymentAttemptEvent: LocalPaymentAttemptEvent
  key: number
  className?: string
}

const PaymentAttemptEvent = ({ paymentAttemptEvent, key, className }: PaymentAttemptEventProps) => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const PaymentAttemptEventIcon = ({ eventType }: { eventType: LocalPaymentAttemptEventType }) => {
    switch (eventType) {
      case LocalPaymentAttemptEventType.AuthenticationFailure:
      case LocalPaymentAttemptEventType.AuthorisationFailed:
      case LocalPaymentAttemptEventType.SettlementFailed:
      case LocalPaymentAttemptEventType.CaptureFailed:
      case LocalPaymentAttemptEventType.RefundFailed:
        return <Icon name="close/12" className="text-negative-red"></Icon>
      case LocalPaymentAttemptEventType.RefundCancelled:
        return <Icon name="void/12"></Icon>
      case LocalPaymentAttemptEventType.Authorised:
        return <Icon name="authorise/12"></Icon>

      case LocalPaymentAttemptEventType.Received:
        return <Icon name="check/12" className="text-positive-green"></Icon>

      case LocalPaymentAttemptEventType.Refunded:
      case LocalPaymentAttemptEventType.PartiallyRefunded:
        return <Icon name="return/12"></Icon>

      case LocalPaymentAttemptEventType.Captured:
      case LocalPaymentAttemptEventType.PartiallyCaptured:
        return <Icon name="capture/12"></Icon>
      case LocalPaymentAttemptEventType.Voided:
        return <Icon name="void/12"></Icon>
      case LocalPaymentAttemptEventType.RefundAwaitingApproval:
        return <Icon name="pending/12"></Icon>
      case LocalPaymentAttemptEventType.AuthenticationSetupStarted:
      case LocalPaymentAttemptEventType.BankPaymentInitiated:
      default:
        return <Icon name="start/12"></Icon>
    }
  }
  return (
    <>
      <Fragment key={key}>
        <div className={cn('group whitespace-nowrap flex flex-row items-center', className)}>
          <div className="flex flex-row items-center mr-[18px]">
            <span>
              <PaymentAttemptEventIcon eventType={paymentAttemptEvent.eventType} />
            </span>
          </div>
          <div className="w-60">
            <span className="text-xs font-normal leading-6">{paymentAttemptEvent.eventType}</span>
            <span> </span>
            {paymentAttemptEvent.refundedAmount &&
              paymentAttemptEvent.refundedAmount > 0 &&
              !paymentAttemptEvent.isCardVoid && (
                <span className="text-xs font-normal leading-6 text-[#73808C]">
                  - {paymentAttemptEvent.currency === Currency.EUR ? '€' : '£'}
                  {formatter.format(Number(paymentAttemptEvent.refundedAmount))}
                </span>
              )}
            {paymentAttemptEvent.capturedAmount && paymentAttemptEvent.capturedAmount > 0 && (
              <span className="text-xs font-normal leading-6 text-[#73808C]">
                - {paymentAttemptEvent.currency === Currency.EUR ? '€' : '£'}
                {formatter.format(Number(paymentAttemptEvent.capturedAmount))}
              </span>
            )}
          </div>

          <div className="w-[13.778] flex flex-row items-center gap-2 ml-auto text-xs font-normal leading-6 text-grey-text">
            <span>{formatDateWithYearAndTime(paymentAttemptEvent.occurredAt)}</span>
          </div>
        </div>
      </Fragment>
    </>
  )
}

export default PaymentAttemptEvent
