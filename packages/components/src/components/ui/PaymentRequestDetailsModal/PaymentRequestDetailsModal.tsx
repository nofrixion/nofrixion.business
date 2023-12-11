import { ApiError } from '@nofrixion/moneymoov'
import { useState } from 'react'

import { Sheet, SheetContent } from '../../../components/ui/atoms'
import { LocalPaymentMethodTypes } from '../../../types/LocalEnums'
import {
  LocalAccount,
  LocalCounterparty,
  LocalPaymentAttempt,
  LocalPaymentRequest,
  LocalTag,
} from '../../../types/LocalTypes'
import BankRefundModal from '../BankRefundModal/BankRefundModal'
import CaptureModal from '../CaptureModal/CaptureModal'
import CardRefundModal from '../CardRefundModal/CardRefundModal'
import PaymentRequestDetails from '../PaymentRequestDetails/PaymentRequestDetails'

export interface PaymentRequestDetailsModalProps {
  paymentRequest?: LocalPaymentRequest
  merchantTags: LocalTag[]
  hostedPaymentLink: string
  onCardRefund: (
    authorizationID: string,
    amount: number,
    isCardVoid: boolean,
  ) => Promise<ApiError | undefined>
  onBankRefund: (
    sourAccount: LocalAccount,
    counterParty: LocalCounterparty,
    amount: number,
    paymentInitiationID: string,
  ) => Promise<ApiError | undefined>
  onCapture: (authorizationID: string, amount: number) => Promise<ApiError | undefined>
  onTagAdded: (tag: LocalTag) => void
  onTagRemoved: (id: string) => void
  onTagCreated: (tag: LocalTag) => void
  open: boolean
  onDismiss: () => void
  accounts: LocalAccount[]
}

const PaymentRequestDetailsModal = ({
  paymentRequest,
  merchantTags,
  hostedPaymentLink,
  onCardRefund,
  onBankRefund,
  onCapture,
  onTagAdded,
  onTagRemoved,
  onTagCreated,
  open,
  onDismiss,
  accounts,
}: PaymentRequestDetailsModalProps) => {
  const [selectedTransactionForCardRefund, setSelectedTransactionForCardRefund] =
    useState<LocalPaymentAttempt>()

  const [selectedTransactionForBankRefund, setSelectedTransactionForBankRefund] =
    useState<LocalPaymentAttempt>()

  const [selectedTransactionForCapture, setSelectedTransactionForCapture] = useState<
    LocalPaymentAttempt | undefined
  >()

  const onCaptureClick = (paymentAttempt: LocalPaymentAttempt) => {
    setSelectedTransactionForCapture(paymentAttempt)
  }

  const onCaptureDismiss = () => {
    setSelectedTransactionForCapture(undefined)
  }

  // This method is called when the user clicks on the refund button
  const onRefundClick = (paymentAttempt: LocalPaymentAttempt) => {
    switch (paymentAttempt.paymentMethod) {
      case LocalPaymentMethodTypes.Card:
        setSelectedTransactionForCardRefund(paymentAttempt)
        break
      case LocalPaymentMethodTypes.Pisp:
        setSelectedTransactionForBankRefund(paymentAttempt)
        break
      default:
        break
    }
  }

  const onRefundDismiss = () => {
    setSelectedTransactionForCardRefund(undefined)
    setSelectedTransactionForBankRefund(undefined)
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={handleOnOpenChange}>
        <SheetContent
          onOpenAutoFocus={(event) => {
            event.preventDefault()
          }}
          className="w-full lg:w-[37.5rem]"
        >
          <div className="bg-white max-h-full h-full overflow-auto">
            <div className="max-h-full h-full">
              {paymentRequest && (
                <PaymentRequestDetails
                  paymentRequest={paymentRequest}
                  merchantTags={merchantTags}
                  hostedPaymentLink={hostedPaymentLink}
                  onRefund={(paymentAttempt: LocalPaymentAttempt) => onRefundClick(paymentAttempt)}
                  onVoid={(paymentAttempt: LocalPaymentAttempt) => onRefundClick(paymentAttempt)}
                  onCapture={onCaptureClick}
                  onTagAdded={onTagAdded}
                  onTagRemoved={onTagRemoved}
                  onTagCreated={onTagCreated}
                />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {paymentRequest && selectedTransactionForCapture && (
        <CaptureModal
          onCapture={onCapture}
          onDismiss={onCaptureDismiss}
          paymentRequest={paymentRequest}
          cardPaymentAttempt={selectedTransactionForCapture}
        />
      )}

      {selectedTransactionForCardRefund && paymentRequest && (
        <CardRefundModal
          onRefund={onCardRefund}
          onDismiss={onRefundDismiss}
          paymentRequest={paymentRequest}
          cardPaymentAttempt={selectedTransactionForCardRefund}
        />
      )}

      {selectedTransactionForBankRefund && accounts && accounts?.length > 0 && paymentRequest && (
        <BankRefundModal
          onRefund={onBankRefund}
          onDismiss={onRefundDismiss}
          accounts={accounts?.filter((account) => account.currency === paymentRequest.currency)}
          paymentRequest={paymentRequest}
          bankPaymentAttempt={selectedTransactionForBankRefund}
        />
      )}
    </>
  )
}

export default PaymentRequestDetailsModal
