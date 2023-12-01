import { LocalPaymentAttemptEvent } from '../../../types/LocalTypes'
import { cn } from '../../../utils'
import PaymentAttemptEvent from '../PaymentAttemptEvent/PaymentAttemptEvent'

export interface PaymentAttemptEventsListProps {
  paymentAttemptEvents: LocalPaymentAttemptEvent[]
  className?: string
}

const PaymentAttemptEventsList = ({
  paymentAttemptEvents,
  className,
}: PaymentAttemptEventsListProps) => {
  return (
    <div className={className}>
      {paymentAttemptEvents.map((paymentAttemptEvent, index) => (
        <PaymentAttemptEvent
          paymentAttemptEvent={paymentAttemptEvent}
          key={index}
          className={cn(
            index === paymentAttemptEvents.length - 1 ? 'pt-1' : 'py-1 border-b border-[#F1F2F3]',
            'pl-[0.438rem] ',
          )}
        ></PaymentAttemptEvent>
      ))}
    </div>
  )
}

export default PaymentAttemptEventsList
