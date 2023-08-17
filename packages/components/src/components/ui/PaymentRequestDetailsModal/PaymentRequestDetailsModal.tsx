import { Currency } from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { Sheet, SheetContent } from '../../../components/ui/atoms'
import { LocalPaymentAttempt, LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes'
import {
  getMaxCapturableAmount,
  getMaxRefundableAmount,
  isVoid,
} from '../../../utils/paymentAttemptsHelper'
import CaptureModal from '../CaptureModal/CaptureModal'
import CardRefundModal from '../CardRefundModal/CardRefundModal'
import PaymentRequestDetails from '../PaymentRequestDetails/PaymentRequestDetails'

export interface PaymentRequestDetailsModalProps {
  paymentRequest: LocalPaymentRequest
  merchantTags: LocalTag[]
  hostedPaymentLink: string
  onRefund: (authorizationID: string, amount: number, isCardVoid: boolean) => Promise<void>
  onCapture: (authorizationID: string, amount: number) => Promise<void>
  onTagAdded: (tag: LocalTag) => void
  onTagDeleted: (id: string) => void
  onTagCreated: (tag: LocalTag) => void
  open: boolean
  onDismiss: () => void
}

const PaymentRequestDetailsModal = ({
  paymentRequest,
  merchantTags,
  hostedPaymentLink,
  onRefund,
  onCapture,
  onTagAdded,
  onTagDeleted,
  onTagCreated,
  open,
  onDismiss,
}: PaymentRequestDetailsModalProps) => {
  const [selectedTransactionForRefund, setSelectedTransactionForRefund] =
    useState<LocalPaymentAttempt>()
  const [maxRefundableAmount, setMaxRefundableAmount] = useState<number>(0)
  const [amountToRefund, setAmountToRefund] = useState<string | undefined>()
  const [selectedTransactionForCapture, setSelectedTransactionForCapture] = useState<
    LocalPaymentAttempt | undefined
  >()
  const [amountToCapture, setAmountToCapture] = useState<string | undefined>()
  const [maxCapturableAmount, setMaxCapturableAmount] = useState<number>(0)
  const [isCardVoid, setIsCardVoid] = useState<boolean>(false)

  useEffect(() => {
    if (!selectedTransactionForCapture) return

    const maxCapturableAmount = getMaxCapturableAmount(selectedTransactionForCapture)
    setMaxCapturableAmount(maxCapturableAmount)
    setAmountToCapture(maxCapturableAmount.toString())
  }, [selectedTransactionForCapture])

  useEffect(() => {
    if (!selectedTransactionForRefund) return

    if (isVoid(selectedTransactionForRefund)) {
      setAmountToRefund(selectedTransactionForRefund.amount.toString())
    } else {
      const maxRefundableAmount = getMaxRefundableAmount(selectedTransactionForRefund)
      setMaxRefundableAmount(maxRefundableAmount)
      setAmountToRefund(maxRefundableAmount.toString())
    }
  }, [selectedTransactionForRefund])

  const onCaptureClick = (paymentAttempt: LocalPaymentAttempt) => {
    setSelectedTransactionForCapture(paymentAttempt)
  }

  const onCaptureConfirm = async () => {
    if (selectedTransactionForCapture) {
      let parsedAmount = Number(amountToCapture)
      parsedAmount = (parsedAmount ?? 0) > maxCapturableAmount ? maxCapturableAmount : parsedAmount!
      await onCapture(selectedTransactionForCapture.attemptKey, parsedAmount)
      onCaptureDismiss()
    }
  }

  const onCaptureDismiss = () => {
    setSelectedTransactionForCapture(undefined)
    setAmountToCapture(undefined)
  }

  // This method is called when the user clicks on the refund button
  const onRefundClick = (paymentAttempt: LocalPaymentAttempt, isVoid: boolean) => {
    setIsCardVoid(isVoid)
    setSelectedTransactionForRefund(paymentAttempt)
  }
  // This method is called when the user confirms the refund
  const onRefundConfirm = async () => {
    if (selectedTransactionForRefund) {
      let parsedAmount = Number(amountToRefund)
      if (!isCardVoid) {
        parsedAmount =
          (parsedAmount ?? 0) > maxRefundableAmount ? maxRefundableAmount : parsedAmount!
      }
      await onRefund(selectedTransactionForRefund.attemptKey, parsedAmount, isCardVoid)
      onRefundDismiss()
    }
  }

  const onRefundDismiss = () => {
    setSelectedTransactionForRefund(undefined)
    setAmountToRefund(undefined)
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  const handleOnCaptureFormOpenChange = (open: boolean) => {
    if (!open) {
      onCaptureDismiss()
    }
  }

  const handleOnRefundFormOpenChange = (open: boolean) => {
    if (!open) {
      onRefundDismiss()
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={handleOnOpenChange}>
        <SheetContent className="w-full lg:w-[37.5rem]">
          <div className="bg-white max-h-100 overflow-auto">
            <div className="max-h-full h-100">
              <div className="h-fit pb-16 lg:pb-0">
                <PaymentRequestDetails
                  paymentRequest={paymentRequest}
                  merchantTags={merchantTags}
                  hostedPaymentLink={hostedPaymentLink}
                  onRefund={(paymentAttempt: LocalPaymentAttempt) =>
                    onRefundClick(paymentAttempt, false)
                  }
                  onVoid={(paymentAttempt: LocalPaymentAttempt) =>
                    onRefundClick(paymentAttempt, true)
                  }
                  onCapture={onCaptureClick}
                  onTagAdded={onTagAdded}
                  onTagDeleted={onTagDeleted}
                  onTagCreated={onTagCreated}
                ></PaymentRequestDetails>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={!!selectedTransactionForCapture} onOpenChange={handleOnCaptureFormOpenChange}>
        <SheetContent className="w-full lg:w-[37.5rem]">
          <div className="bg-white max-h-100 overflow-auto">
            <div className="max-h-full h-100">
              <CaptureModal
                onCapture={onCaptureConfirm}
                onDismiss={onCaptureDismiss}
                initialAmount={amountToCapture ?? '0'}
                maxCapturableAmount={maxCapturableAmount}
                currency={selectedTransactionForCapture?.currency ?? Currency.EUR}
                setAmountToCapture={setAmountToCapture}
                transactionDate={selectedTransactionForCapture?.occurredAt ?? new Date()}
                contactName={paymentRequest.contact.name}
                lastFourDigitsOnCard={selectedTransactionForCapture?.last4DigitsOfCardNumber}
                processor={selectedTransactionForCapture?.processor}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={!!selectedTransactionForRefund} onOpenChange={handleOnRefundFormOpenChange}>
        <SheetContent className="w-full lg:w-[37.5rem]">
          <div className="bg-white max-h-100 overflow-auto">
            <div className="max-h-full h-100">
              <CardRefundModal
                onRefund={onRefundConfirm}
                onDismiss={onRefundDismiss}
                initialAmount={amountToRefund ?? '0'}
                maxRefundableAmount={maxRefundableAmount}
                currency={selectedTransactionForRefund?.currency ?? Currency.EUR}
                setAmountToRefund={setAmountToRefund}
                transactionDate={selectedTransactionForRefund?.occurredAt ?? new Date()}
                contactName={paymentRequest.contact.name}
                lastFourDigitsOnCard={selectedTransactionForRefund?.last4DigitsOfCardNumber}
                processor={selectedTransactionForRefund?.processor}
                isVoid={isCardVoid}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default PaymentRequestDetailsModal
