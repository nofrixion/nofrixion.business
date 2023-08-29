import { Currency } from '@nofrixion/moneymoov'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { localCurrency } from '../../../utils/constants'
import { Button, Icon } from '../atoms'
import InputAmountField from '../InputAmountField/InputAmountField'
import { Loader } from '../Loader/Loader'

export interface CardRefundModalProps {
  initialAmount: string
  currency: Currency.EUR | Currency.GBP
  onRefund: () => Promise<void>
  onDismiss: () => void
  setAmountToRefund: (amount: string) => void
  maxRefundableAmount: number
  lastFourDigitsOnCard?: string
  processor?: string
  transactionDate: Date
  contactName?: string
  isVoid: boolean
}

const CardRefundModal: React.FC<CardRefundModalProps> = ({
  initialAmount,
  currency,
  onRefund,
  onDismiss,
  setAmountToRefund,
  maxRefundableAmount,
  lastFourDigitsOnCard,
  processor,
  transactionDate,
  contactName,
  isVoid,
}) => {
  const [isRefundButtonDisabled, setIsRefundButtonDisabled] = useState(false)
  const [validationErrorMessage, setValidationErrorMessage] = useState('')
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const getCurrencySymbol = (transactionCurrency: string) => {
    return transactionCurrency === Currency.EUR
      ? localCurrency.eur.symbol
      : localCurrency.gbp.symbol
  }

  const onRefundClick = async () => {
    setIsRefundButtonDisabled(true)

    setValidationErrorMessage('')
    const parsedAmount = Number(initialAmount)
    if (parsedAmount < 0) {
      setValidationErrorMessage('The amount must be greater than 0.')
    } else if (parsedAmount === 0) {
      setValidationErrorMessage("The amount can't be 0.")
    } else if (maxRefundableAmount && parsedAmount > maxRefundableAmount) {
      setValidationErrorMessage("You can't refund more than the remaining amount.")
    } else {
      await onRefund()
    }

    setIsRefundButtonDisabled(false)
  }

  return (
    <>
      <div className="bg-white h-screen overflow-auto lg:w-[37.5rem] px-8 py-8">
        <div className="max-h-full">
          <div className="h-fit">
            <button type="button" className="hover:cursor-pointer block" onClick={onDismiss}>
              <Icon name="back/24" />
            </button>
            <span className="block text-2xl font-semibold text-default-text mt-8">
              Confirm card payment {!isVoid && <span>refund</span>}
              {isVoid && <span>void</span>}
            </span>
            <p className="mt-12 text-default-text text-sm font-normal">
              {isVoid && (
                <span>
                  You are about to void the{' '}
                  <span className="font-semibold">
                    {getCurrencySymbol(currency)} {formatter.format(Number(initialAmount))}
                  </span>{' '}
                  card payment made
                </span>
              )}
              {!isVoid && (
                <span>
                  You are about to refund the card payment made
                  {contactName && <span className="font-semibold">{` by ${contactName}`}</span>}
                </span>
              )}{' '}
              on <span className="font-semibold">{format(transactionDate, 'MMM do, yyyy')}</span>
              {lastFourDigitsOnCard ? (
                <>
                  {' with the'}
                  {processor && <span className="font-semibold">{` ${processor}`}</span>}
                  {` card ending in ${lastFourDigitsOnCard}.`}
                </>
              ) : (
                '.'
              )}
            </p>
            {!isVoid && (
              <div className="mt-12 md:flex">
                <div className="md:w-[152px]">
                  <span className="text-sm leading-8 font-normal text-grey-text md:leading-[48px]">
                    Refund
                  </span>
                </div>

                <div className="text-left">
                  <div className="md:w-40">
                    <InputAmountField
                      currency={currency}
                      onCurrencyChange={() => {}}
                      allowCurrencyChange={false}
                      value={formatter.format(Number(initialAmount))}
                      onChange={(e) => setAmountToRefund(e.target.value)}
                    ></InputAmountField>
                  </div>
                  <span className="mt-2 block text-13px leading-5 font-normal text-grey-text">
                    There are {getCurrencySymbol(currency)} {formatter.format(maxRefundableAmount)}{' '}
                    available to refund.
                  </span>
                  <AnimatePresence>
                    {validationErrorMessage && (
                      <motion.div
                        className="mt-6 bg-[#ffe6eb] text-sm p-3 rounded"
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
            {isVoid && (
              <p className="bg-[#FCF5CF] font-normal mt-6 p-3 text-default-text text-sm">
                You won&apos;t be able to capture this payment later.
              </p>
            )}
            <div className="lg:mt-14 lg:static lg:p-0 fixed bottom-16 left-0 w-full px-6 mx-auto pb-4 z-20">
              <Button
                variant="primaryDark"
                size="big"
                className="disabled:!bg-grey-text disabled:!opacity-100 disabled:cursor-not-allowed"
                onClick={onRefundClick}
                disabled={isRefundButtonDisabled}
              >
                {isRefundButtonDisabled ? (
                  <Loader className="h-6 w-6 mx-auto" />
                ) : (
                  <span>
                    Confirm {!isVoid && <span>refund</span>}
                    {isVoid && <span>void</span>}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardRefundModal
