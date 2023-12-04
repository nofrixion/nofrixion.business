import { LocalPaymentAttempt } from '../../../types/LocalTypes'
import { cn } from '../../../utils'
import PaymentAttempt from '../PaymentAttempt/PaymentAttempt'

export interface PaymentAttemptsListProps {
  paymentAttempts: LocalPaymentAttempt[]
  cardAuthoriseOnly: boolean
  onRefund: (paymentAttempt: LocalPaymentAttempt) => void
  onVoid: (paymentAttempt: LocalPaymentAttempt) => void
  onCapture: (paymentAttempt: LocalPaymentAttempt) => void
}

const PaymentAttemptsList = ({
  paymentAttempts,
  onRefund,
  onVoid,
  onCapture,
  cardAuthoriseOnly,
}: PaymentAttemptsListProps) => {
  return (
    <>
      {paymentAttempts.length === 0 && (
        <div className="text-center text-default-text text-base pt-9">No payment attempts yet</div>
      )}
      {paymentAttempts.map((paymentAttempt, index) => (
        <PaymentAttempt
          paymentAttempt={paymentAttempt}
          onRefund={onRefund}
          onCapture={onCapture}
          onVoid={onVoid}
          cardAuthoriseOnly={cardAuthoriseOnly}
          key={index}
          className={cn(index === 0 ? 'pb-2' : 'py-2', 'border-b border-[#F1F2F3]')}
        ></PaymentAttempt>
      ))}
    </>
  )
}

export default PaymentAttemptsList
