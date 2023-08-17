import { Currency } from '@nofrixion/moneymoov'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import {
  LocalAccount,
  LocalCounterparty,
  LocalPaymentAttempt,
  LocalPaymentRequest,
} from '../../../types/LocalTypes'
import { localCurrency } from '../../../utils/constants'
import { getMaxRefundableAmount } from '../../../utils/paymentAttemptsHelper'
import { Icon, Sheet, SheetContent } from '../atoms'
import InputAmountField from '../InputAmountField/InputAmountField'
import { SelectAccount } from '../molecules/Select/SelectAccount/SelectAccount'

export interface BankRefundModalProps {
  // initialAmount: string
  //currency: Currency.EUR | Currency.GBP
  onRefund: (
    sourceAccount: LocalAccount,
    counterParty: LocalCounterparty,
    amount: number,
    paymentInitiationID: string,
  ) => Promise<void>
  onDismiss: () => void
  // maxRefundableAmount: number
  accounts: LocalAccount[]
  // defaultSourceAccount: LocalAccount | undefined
  // counterParty: LocalCounterparty | undefined
  bankPaymentAttempt: LocalPaymentAttempt | undefined
  paymentRequest: LocalPaymentRequest | undefined
}

const BankRefundModal: React.FC<BankRefundModalProps> = ({
  // initialAmount,
  // currency,
  onRefund,
  onDismiss,
  // maxRefundableAmount,
  accounts,
  // defaultSourceAccount,
  // counterParty,
  bankPaymentAttempt,
  paymentRequest,
}) => {
  const [isRefundButtonDisabled, setIsRefundButtonDisabled] = useState(false)
  const [validationErrorMessage, setValidationErrorMessage] = useState('')
  const maxRefundableAmount1 = bankPaymentAttempt ? getMaxRefundableAmount(bankPaymentAttempt) : 0
  const [amountToRefund, setAmountToRefund] = useState(
    bankPaymentAttempt ? maxRefundableAmount1.toString() : '',
  )
  const counterParty1 = paymentRequest?.transactions?.find(
    (t) => t.id === bankPaymentAttempt?.reconciledTransactionID,
  )?.counterParty

  const defaultSourceAccount1 = accounts.find((a) => a.id === paymentRequest?.pispAccountID)
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const [selectedAccount, setSelectedAccount] = useState<LocalAccount>(
    defaultSourceAccount1 ? defaultSourceAccount1 : accounts[0],
  )

  const getCurrencySymbol = (transactionCurrency: string) => {
    return transactionCurrency === Currency.EUR
      ? localCurrency.eur.symbol
      : localCurrency.gbp.symbol
  }

  const onRefundClick = async () => {
    setIsRefundButtonDisabled(true)

    setValidationErrorMessage('')
    const parsedAmount = Number(amountToRefund)
    if (parsedAmount < 0) {
      setValidationErrorMessage('The amount must be greater than 0.')
    } else if (parsedAmount === 0) {
      setValidationErrorMessage("The amount can't be 0.")
    } else if (maxRefundableAmount1 && parsedAmount > maxRefundableAmount1) {
      setValidationErrorMessage("You can't refund more than the remaining amount.")
    } else if (counterParty1 && amountToRefund && selectedAccount) {
      setIsRefundButtonDisabled(false)
      let parsedAmount = Number(amountToRefund)
      parsedAmount =
        (parsedAmount ?? 0) > maxRefundableAmount1 ? maxRefundableAmount1 : parsedAmount!

      await onRefund(
        selectedAccount,
        counterParty1,
        parsedAmount,
        bankPaymentAttempt?.attemptKey ? bankPaymentAttempt?.attemptKey : '',
      )
      onDismiss()
    }
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss()
    }
  }

  return (
    <>
      {bankPaymentAttempt && paymentRequest && (
        <Sheet open={!!bankPaymentAttempt} onOpenChange={handleOnOpenChange}>
          <SheetContent className="w-full lg:w-[37.5rem]">
            <div className="bg-white max-h-screen overflow-auto">
              <div className="max-h-full h-screen">
                <div className="bg-white h-screen overflow-auto lg:w-[37.5rem] px-8 py-8">
                  <div className="max-h-full">
                    <div className="h-fit">
                      <button
                        type="button"
                        className="hover:cursor-pointer block"
                        onClick={onDismiss}
                      >
                        <Icon name="back/24" />
                      </button>
                      <span className="block text-2xl font-semibold text-default-text mt-8">
                        Confirm payment refund
                      </span>

                      <div className="mt-12 md:flex">
                        <div className="md:w-[152px]">
                          <span className="text-sm leading-8 font-normal text-grey-text md:leading-[48px]">
                            Refund
                          </span>
                        </div>

                        <div className="text-left">
                          <div className="md:w-40">
                            <InputAmountField
                              currency={bankPaymentAttempt.currency}
                              onCurrencyChange={() => {}}
                              allowCurrencyChange={false}
                              value={formatter.format(Number(amountToRefund))}
                              onChange={(e) => setAmountToRefund(e.target.value)}
                            ></InputAmountField>
                          </div>
                          <span className="mt-2 block text-13px leading-5 font-normal text-grey-text">
                            There are {getCurrencySymbol(bankPaymentAttempt.currency)}{' '}
                            {formatter.format(getMaxRefundableAmount(bankPaymentAttempt))} available
                            to refund.
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
                      <div className="mt-10 md:flex">
                        <div className="md:w-[152px]">
                          <span className="text-sm leading-8 font-normal text-grey-text md:leading-[48px]">
                            From account
                          </span>
                        </div>
                        <div className="text-left">
                          <SelectAccount
                            className="text-right border border-border-grey "
                            value={selectedAccount.id}
                            onValueChange={(value) => {
                              setSelectedAccount(
                                accounts.find((account) => account.id === value) ?? accounts[0],
                              )
                            }}
                            accounts={accounts}
                          />
                        </div>
                      </div>

                      <div className="mt-11 md:flex items-baseline">
                        <div className="md:w-[152px]">
                          <span className="text-sm leading-8 font-normal text-grey-text md:leading-[48px]">
                            To account
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold w-full break-words text-sm/5 mb-0.5 md:mb-2">
                            {counterParty1?.name}
                          </p>
                          {counterParty1 && counterParty1.accountInfo && (
                            <p className="text-xs/5 w-full text-ellipsis break-words">
                              {counterParty1.accountInfo}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 md:flex items-baseline">
                        <div className="md:w-[152px]">
                          <span className="text-sm leading-8 font-normal text-grey-text md:leading-[48px]">
                            Reference
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold w-full break-words text-sm/5">
                            Refund for ...
                          </p>
                        </div>
                      </div>
                      <div className="lg:mt-14 lg:static lg:p-0 fixed bottom-16 left-0 w-full px-6 mx-auto pb-4 z-20">
                        <button
                          className="justify-center rounded-full bg-[#006A80] h-12 lg:h-11 px-16 text-sm text-white font-semibold transition w-full cursor-pointer hover:bg-[#144752]"
                          onClick={onRefundClick}
                          disabled={isRefundButtonDisabled}
                        >
                          Confirm refund
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

export default BankRefundModal
