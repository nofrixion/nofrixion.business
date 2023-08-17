import { Currency } from '@nofrixion/moneymoov'
import { useEffect, useState } from 'react'

import { Sheet, SheetContent } from '../../../components/ui/atoms'
import { LocalPaymentMethodTypes } from '../../../types/LocalEnums'
import {
  LocalAccount,
  LocalCounterparty,
  LocalPaymentAttempt,
  LocalPaymentRequest,
  LocalTag,
} from '../../../types/LocalTypes'
import {
  getMaxCapturableAmount,
  getMaxRefundableAmount,
  isVoid,
} from '../../../utils/paymentAttemptsHelper'
import BankRefundModal from '../BankRefundModal/BankRefundModal'
import CaptureModal from '../CaptureModal/CaptureModal'
import CardRefundModal from '../CardRefundModal/CardRefundModal'
import PaymentRequestDetails from '../PaymentRequestDetails/PaymentRequestDetails'

export interface PaymentRequestDetailsModalProps {
  paymentRequest: LocalPaymentRequest
  merchantTags: LocalTag[]
  hostedPaymentLink: string
  onRefund: (authorizationID: string, amount: number, isCardVoid: boolean) => Promise<void>
  onBankRefund: (
    sourAccount: LocalAccount,
    counterParty: LocalCounterparty,
    amount: number,
    paymentInitiationID: string,
  ) => Promise<void>
  onCapture: (authorizationID: string, amount: number) => Promise<void>
  onTagAdded: (tag: LocalTag) => void
  onTagDeleted: (id: string) => void
  onTagCreated: (tag: LocalTag) => void
  open: boolean
  onDismiss: () => void
  accounts: LocalAccount[]
}

const PaymentRequestDetailsModal = ({
  paymentRequest,
  merchantTags,
  hostedPaymentLink,
  onRefund,
  onBankRefund,
  onCapture,
  onTagAdded,
  onTagDeleted,
  onTagCreated,
  open,
  onDismiss,
  accounts,
}: PaymentRequestDetailsModalProps) => {
  const [selectedTransactionForCardRefund, setSelectedTransactionForCardRefund] =
    useState<LocalPaymentAttempt>()

  const [selectedTransactionForBankRefund, setSelectedTransactionForBankRefund] =
    useState<LocalPaymentAttempt>()

  // const [bankRefundCounterParty, setBankRefundCounterParty] = useState<LocalCounterparty>()
  // const [bankRefundDefaultSourceAccount, setBankRefundDefaultSourceAccount] =
  //   useState<LocalAccount>()
  const [maxCardRefundableAmount, setCardMaxRefundableAmount] = useState<number>(0)
  //const [maxBankRefundableAmount, setBankMaxRefundableAmount] = useState<number>(0)
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
    if (!selectedTransactionForCardRefund) return

    if (isVoid(selectedTransactionForCardRefund)) {
      setAmountToRefund(selectedTransactionForCardRefund.amount.toString())
    } else {
      const maxRefundableAmount = getMaxRefundableAmount(selectedTransactionForCardRefund)
      setCardMaxRefundableAmount(maxRefundableAmount)
      setAmountToRefund(maxRefundableAmount.toString())
    }
  }, [selectedTransactionForCardRefund])

  // useEffect(() => {
  //   if (!selectedTransactionForBankRefund) return
  //   const maxRefundableAmount = getMaxRefundableAmount(selectedTransactionForBankRefund)
  //   setBankMaxRefundableAmount(maxRefundableAmount)
  //   setAmountToRefund(maxRefundableAmount.toString())
  // }, [selectedTransactionForBankRefund])

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
    switch (paymentAttempt.paymentMethod) {
      case LocalPaymentMethodTypes.Card:
        setSelectedTransactionForCardRefund(paymentAttempt)
        break
      case LocalPaymentMethodTypes.Pisp:
        // console.log('transaction', paymentRequest.transactions)
        // console.log('reconciledTransactionID', paymentAttempt.reconciledTransactionID)
        // setBankRefundCounterParty(
        //   paymentRequest.transactions?.find((t) => t.id === paymentAttempt.reconciledTransactionID)
        //     ?.counterParty,
        // )
        // setBankRefundDefaultSourceAccount(
        //   accounts.find((a) => a.id === paymentRequest.pispAccountID),
        // )
        setSelectedTransactionForBankRefund(paymentAttempt)
        break
      default:
        break
    }
  }
  // This method is called when the user confirms the refund
  const onRefundConfirm = async () => {
    if (selectedTransactionForCardRefund) {
      let parsedAmount = Number(amountToRefund)
      if (!isCardVoid) {
        parsedAmount =
          (parsedAmount ?? 0) > maxCardRefundableAmount ? maxCardRefundableAmount : parsedAmount!
      }
      await onRefund(selectedTransactionForCardRefund.attemptKey, parsedAmount, isCardVoid)
      onRefundDismiss()
    }
  }

  const onRefundDismiss = () => {
    setSelectedTransactionForCardRefund(undefined)
    setSelectedTransactionForBankRefund(undefined)
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
          <div className="bg-white max-h-screen overflow-auto">
            <div className="max-h-full h-screen">
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
          <div className="bg-white max-h-screen overflow-auto">
            <div className="max-h-full h-screen">
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

      <Sheet open={!!selectedTransactionForCardRefund} onOpenChange={handleOnRefundFormOpenChange}>
        <SheetContent className="w-full lg:w-[37.5rem]">
          <div className="bg-white max-h-screen overflow-auto">
            <div className="max-h-full h-screen">
              <CardRefundModal
                onRefund={onRefundConfirm}
                onDismiss={onRefundDismiss}
                initialAmount={amountToRefund ?? '0'}
                maxRefundableAmount={maxCardRefundableAmount}
                currency={selectedTransactionForCardRefund?.currency ?? Currency.EUR}
                setAmountToRefund={setAmountToRefund}
                transactionDate={selectedTransactionForCardRefund?.occurredAt ?? new Date()}
                contactName={paymentRequest.contact.name}
                lastFourDigitsOnCard={selectedTransactionForCardRefund?.last4DigitsOfCardNumber}
                processor={selectedTransactionForCardRefund?.processor}
                isVoid={isCardVoid}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* <Sheet open={!!selectedTransactionForBankRefund} onOpenChange={handleOnRefundFormOpenChange}>
        <SheetContent className="w-full lg:w-[37.5rem]">
          <div className="bg-white max-h-screen overflow-auto">
            <div className="max-h-full h-screen"> */}
      {selectedTransactionForBankRefund && (
        <BankRefundModal
          onRefund={onBankRefund}
          onDismiss={onRefundDismiss}
          // initialAmount={maxBankRefundableAmount.toString() ?? '0'}
          // maxRefundableAmount={maxBankRefundableAmount}
          //currency={selectedTransactionForBankRefund?.currency ?? Currency.EUR}
          accounts={accounts}
          paymentRequest={paymentRequest}
          bankPaymentAttempt={selectedTransactionForBankRefund}
          // counterParty={bankRefundCounterParty}
          // defaultSourceAccount={bankRefundDefaultSourceAccount}
        />
      )}
      {/* </div>
          </div>
        </SheetContent>
      </Sheet> */}
    </>
  )
}

export default PaymentRequestDetailsModal
