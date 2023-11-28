import { Currency } from '@nofrixion/moneymoov'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { LocalPaymentAttempt, LocalPaymentRequest } from '../../../types/LocalTypes'
import { localCurrency } from '../../../utils/constants'
import { getMaxRefundableAmount, isVoid } from '../../../utils/paymentAttemptsHelper'
import { Button, Icon, Sheet, SheetContent } from '../atoms'
import InputAmountField from '../InputAmountField/InputAmountField'
import { Loader } from '../Loader/Loader'

export interface CardRefundModalProps {
  onRefund: (authorizationID: string, amount: number, isCardVoid: boolean) => Promise<void>
  onDismiss: () => void
  paymentRequest: LocalPaymentRequest
  cardPaymentAttempt: LocalPaymentAttempt
}

const CardRefundModal: React.FC<CardRefundModalProps> = ({
  onRefund,
  onDismiss,
  paymentRequest,
  cardPaymentAttempt,
}) => {
  const [isRefundButtonDisabled, setIsRefundButtonDisabled] = useState(false)
  const [validationErrorMessage, setValidationErrorMessage] = useState('')
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const maxRefundableAmount = cardPaymentAttempt ? getMaxRefundableAmount(cardPaymentAttempt) : 0
  const [amountToRefund, setAmountToRefund] = useState(
    cardPaymentAttempt
      ? isVoid(cardPaymentAttempt)
        ? cardPaymentAttempt.amount.toString()
        : maxRefundableAmount.toString()
      : '',
  )

  const isCardVoid = isVoid(cardPaymentAttempt)

  const getCurrencySymbol = (transactionCurrency: string) => {
    return transactionCurrency === Currency.EUR
      ? localCurrency.eur.symbol
      : localCurrency.gbp.symbol
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  // This method is called when the user confirms the refund
  const onCardRefundConfirm = async () => {
    setIsRefundButtonDisabled(true)

    setValidationErrorMessage('')
    const parsedAmount = Number(amountToRefund)
    if (parsedAmount < 0) {
      setValidationErrorMessage('The amount must be greater than 0.')
    } else if (parsedAmount === 0) {
      setValidationErrorMessage("The amount can't be 0.")
    } else if (maxRefundableAmount && parsedAmount > maxRefundableAmount) {
      setValidationErrorMessage("You can't refund more than the remaining amount.")
    } else {
      let parsedAmount = Number(amountToRefund)
      if (!isCardVoid) {
        parsedAmount =
          (parsedAmount ?? 0) > maxRefundableAmount ? maxRefundableAmount : parsedAmount!
      }
      await onRefund(cardPaymentAttempt.attemptKey, parsedAmount, isCardVoid)
      onDismiss()
    }

    setIsRefundButtonDisabled(false)
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
                  Confirm card payment {!isCardVoid && <span>refund</span>}
                  {isCardVoid && <span>void</span>}
                </span>
                <p className="mt-12 text-default-text text-sm font-normal">
                  {isCardVoid && (
                    <span>
                      You are about to void the{' '}
                      <span className="font-semibold">
                        {getCurrencySymbol(cardPaymentAttempt.currency)}{' '}
                        {formatter.format(Number(amountToRefund))}
                      </span>{' '}
                      card payment made
                    </span>
                  )}
                  {!isCardVoid && (
                    <span>
                      You are about to refund the card payment made
                      {paymentRequest.contact.name && (
                        <span className="font-semibold">{` by ${paymentRequest.contact.name}`}</span>
                      )}
                    </span>
                  )}{' '}
                  on{' '}
                  <span className="font-semibold">
                    {format(cardPaymentAttempt?.occurredAt, 'MMM do, yyyy')}
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
                {!isCardVoid && (
                  <div className="mt-12 md:flex">
                    <div className="md:w-[152px]">
                      <span className="text-sm leading-8 font-normal text-grey-text md:leading-[48px]">
                        Refund
                      </span>
                    </div>

                    <div className="text-left">
                      <div className="md:w-40">
                        <InputAmountField
                          currency={cardPaymentAttempt.currency}
                          onCurrencyChange={() => { }}
                          allowCurrencyChange={false}
                          value={amountToRefund}
                          onChange={(value) => {
                            setAmountToRefund(value)
                          }}
                        />
                      </div>
                      <span className="mt-2 block text-13px leading-5 font-normal text-grey-text">
                        There are {getCurrencySymbol(cardPaymentAttempt.currency)}{' '}
                        {formatter.format(maxRefundableAmount)} available to refund.
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
                )}
                {isCardVoid && (
                  <p className="bg-[#FCF5CF] font-normal mt-6 p-3 text-default-text text-sm">
                    You won&apos;t be able to capture this payment later.
                  </p>
                )}
                <div className="lg:mt-14 lg:static lg:p-0 fixed bottom-16 left-0 w-full px-6 mx-auto pb-4 z-20">
                  <Button
                    variant="primaryDark"
                    size="large"
                    className="disabled:!bg-grey-text disabled:!opacity-100 disabled:cursor-not-allowed"
                    onClick={onCardRefundConfirm}
                    disabled={isRefundButtonDisabled}
                  >
                    {isRefundButtonDisabled ? (
                      <Loader className="h-6 w-6 mx-auto" />
                    ) : (
                      <span>
                        Confirm {!isCardVoid && <span>refund</span>}
                        {isCardVoid && <span>void</span>}
                      </span>
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

export default CardRefundModal
