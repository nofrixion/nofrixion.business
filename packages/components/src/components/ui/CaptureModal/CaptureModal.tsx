import { Currency } from '@nofrixion/moneymoov'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { LocalPaymentAttempt, LocalPaymentRequest } from '../../../types/LocalTypes'
import { cn } from '../../../utils'
import { localCurrency } from '../../../utils/constants'
import { getMaxCapturableAmount } from '../../../utils/paymentAttemptsHelper'
import { Button, Icon, Sheet, SheetContent } from '../atoms'
import InputAmountField from '../InputAmountField/InputAmountField'
import { Loader } from '../Loader/Loader'
export interface CaptureModalProps {
  onCapture: (authorizationID: string, amount: number) => Promise<void>
  onDismiss: () => void
  paymentRequest: LocalPaymentRequest
  cardPaymentAttempt: LocalPaymentAttempt
}

const CaptureModal: React.FC<CaptureModalProps> = ({
  onCapture,
  onDismiss,
  paymentRequest,
  cardPaymentAttempt,
}) => {
  const [isCaptureButtonDisabled, setIsCaptureButtonDisabled] = useState(false)
  const [validationErrorMessage, setValidationErrorMessage] = useState('')
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const maxCapturableAmount = cardPaymentAttempt ? getMaxCapturableAmount(cardPaymentAttempt) : 0
  const [amountToCapture, setAmountToCapture] = useState(
    cardPaymentAttempt ? maxCapturableAmount.toString() : '',
  )

  const getCurrencySymbol = (transactionCurrency: string) => {
    return transactionCurrency === Currency.EUR
      ? localCurrency.eur.symbol
      : localCurrency.gbp.symbol
  }

  const onCaptureClick = async () => {
    setIsCaptureButtonDisabled(true)

    setValidationErrorMessage('')
    const parsedAmount = Number(amountToCapture)
    if (parsedAmount < 0) {
      setValidationErrorMessage('The amount must be greater than 0.')
      setIsCaptureButtonDisabled(false)
    } else if (parsedAmount === 0) {
      setValidationErrorMessage("The amount can't be 0.")
      setIsCaptureButtonDisabled(false)
    } else if (maxCapturableAmount && parsedAmount > maxCapturableAmount) {
      setValidationErrorMessage("You can't capture more than the remaining amount.")
      setIsCaptureButtonDisabled(false)
    } else {
      if (cardPaymentAttempt) {
        let parsedAmount = Number(amountToCapture)
        parsedAmount =
          (parsedAmount ?? 0) > maxCapturableAmount ? maxCapturableAmount : parsedAmount!
        await onCapture(cardPaymentAttempt.attemptKey, parsedAmount)
        onDismiss()
      }
    }
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  return (
    <>
      {cardPaymentAttempt && paymentRequest && (
        <Sheet open={!!cardPaymentAttempt} onOpenChange={handleOnOpenChange}>
          <SheetContent className="w-full lg:w-[37.5rem]">
            <div className="bg-white h-screen overflow-auto lg:w-[37.5rem] px-8 py-8">
              <div className="h-fit mb-[7.5rem] lg:mb-0">
                <button type="button" className="hover:cursor-pointer block" onClick={onDismiss}>
                  <Icon name="back/24" />
                </button>
                <span className="block text-2xl font-semibold text-default-text mt-8">
                  Confirm card payment capture
                </span>
                <p className="mt-12 text-default-text text-sm font-normal">
                  You are about to capture the card payment made
                  {paymentRequest.contact.name && (
                    <span className="font-semibold">{` by ${paymentRequest.contact.name}`}</span>
                  )}{' '}
                  on{' '}
                  <span className="font-semibold">
                    {format(cardPaymentAttempt.occurredAt, 'MMM do, yyyy')}
                  </span>
                  {cardPaymentAttempt.last4DigitsOfCardNumber ? (
                    <>
                      {' with the'}
                      {cardPaymentAttempt.processor && (
                        <span className="font-semibold">{` ${cardPaymentAttempt.processor}`}</span>
                      )}
                      {` card ending in ${cardPaymentAttempt.last4DigitsOfCardNumber}.`}
                    </>
                  ) : (
                    '.'
                  )}
                </p>
                <div className="mt-12 md:flex">
                  <div className="md:w-[152px]">
                    <span className="text-sm leading-8 font-normal text-grey-text md:leading-[48px]">
                      Capture
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="md:w-40">
                      <InputAmountField
                        currency={cardPaymentAttempt.currency}
                        onCurrencyChange={() => {}}
                        allowCurrencyChange={false}
                        value={formatter.format(Number(amountToCapture))}
                        onChange={(value) => setAmountToCapture(value)}
                      />
                    </div>
                    <span className="mt-2 block text-13px leading-5 font-normal text-grey-text">
                      There are {getCurrencySymbol(cardPaymentAttempt.currency)}{' '}
                      {formatter.format(maxCapturableAmount)} remaining to capture.
                    </span>
                    <AnimatePresence>
                      {validationErrorMessage && (
                        <motion.div
                          className="mt-6 bg-warning-yellow text-sm p-3 rounded"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {validationErrorMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="lg:mt-14 lg:static lg:p-0 fixed bottom-16 left-0 w-full px-6 mx-auto pb-4 z-20">
                  <Button
                    variant="primaryDark"
                    size="large"
                    className={cn({
                      '!bg-grey-text disabled:!opacity-100 cursor-not-allowed':
                        isCaptureButtonDisabled,
                    })}
                    onClick={onCaptureClick}
                    disabled={isCaptureButtonDisabled}
                  >
                    {isCaptureButtonDisabled ? (
                      <Loader className="h-6 w-6 mx-auto" />
                    ) : (
                      'Confirm capture'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

export default CaptureModal
