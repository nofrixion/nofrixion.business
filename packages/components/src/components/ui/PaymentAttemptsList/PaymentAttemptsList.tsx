import { LocalPaymentAttempt } from '../../../types/LocalTypes'
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
      {paymentAttempts.map((paymentAttempt, index) => (
        <PaymentAttempt
          paymentAttempt={paymentAttempt}
          onRefund={onRefund}
          onCapture={onCapture}
          onVoid={onVoid}
          cardAuthoriseOnly={cardAuthoriseOnly}
          key={index}
          className="py-2 border-b border-[#F1F2F3]"
        ></PaymentAttempt>
      ))}
    </>
  )
}

export default PaymentAttemptsList
