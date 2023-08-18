import { Currency } from '@nofrixion/clients'
import { format } from 'date-fns'
import { Fragment } from 'react'

import {
  LocalPaymentMethodTypes,
  LocalWallets,
  SubTransactionType,
} from '../../../types/LocalEnums'
import { LocalPaymentAttempt } from '../../../types/LocalTypes'
import { cn } from '../../../utils'
import {
  getSubTransactions,
  hasRefundOrCaptureAttempts,
  isCaptureable,
  isRefundable,
  isVoid,
} from '../../../utils/paymentAttemptsHelper'
import { Button, Icon } from '../atoms'

export interface TransactionsProps {
  transactions: LocalPaymentAttempt[]
  cardAuthoriseOnly: boolean
  onRefund: (paymentAttempt: LocalPaymentAttempt) => void
  onVoid: (paymentAttempt: LocalPaymentAttempt) => void
  onCapture: (paymentAttempt: LocalPaymentAttempt) => void
}

const PaymentMethodIcon = ({
  paymentMethod,
  wallet,
}: {
  paymentMethod: LocalPaymentMethodTypes
  wallet: LocalWallets | undefined
}) => {
  switch (paymentMethod) {
    case LocalPaymentMethodTypes.Card:
      switch (wallet) {
        case LocalWallets.ApplePay:
        case LocalWallets.GooglePay:
          return <Icon name="wallets/24" className="text-control-grey-hover" />
        default:
          return <Icon name="card/24" className="text-control-grey-hover" />
      }
    case LocalPaymentMethodTypes.Pisp:
      return <Icon name="bank/24" className="text-control-grey-hover" />
    case LocalPaymentMethodTypes.ApplePay:
    case LocalPaymentMethodTypes.GooglePay:
      return <Icon name="wallets/24" />
    default:
      return null
  }
}

const Transactions = ({
  transactions,
  cardAuthoriseOnly,
  onRefund,
  onVoid,
  onCapture,
}: TransactionsProps) => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return (
    <>
      {transactions.length === 0 && (
        <div className="text-center text-default-text text-base pt-9">No transactions found</div>
      )}
      {transactions && transactions.length > 0 && (
        <table className="w-full">
          <tbody>
            {transactions.map((transaction, index) => (
              <Fragment key={index}>
                <tr
                  className={cn('group whitespace-nowrap', {
                    'border-b': !hasRefundOrCaptureAttempts(transaction),
                  })}
                >
                  <td
                    className={cn('text-[0.813rem] pb-2 leading-6', {
                      'pt-2': index !== 0,
                    })}
                  >
                    {/* Mobile date */}
                    <span className="inline lg:hidden">
                      {transaction.occurredAt && format(transaction.occurredAt, 'dd/MM/yyyy')}
                    </span>

                    {/* Desktop date */}
                    <span className="hidden lg:inline">
                      {transaction.occurredAt && format(transaction.occurredAt, 'MMM do, yyyy')}
                    </span>
                  </td>
                  <td className={cn('pl-2 lg:pl-6 pb-2 text-right', { 'pt-2': index !== 0 })}>
                    <span className="mr-2 text-sm font-medium leading-6 tabular-nums">
                      <span className="lg:hidden">
                        {transaction.currency === Currency.EUR ? '€' : '£'}
                      </span>
                      {new Intl.NumberFormat(navigator.language, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(Number(transaction.amount))}
                    </span>
                  </td>
                  <td className={cn('hidden lg:table-cell pb-2', { 'pt-2': index !== 0 })}>
                    <span className="text-grey-text font-normal text-[0.813rem] leading-6">
                      {transaction.currency}
                    </span>
                  </td>
                  <td className={cn('pl-2 lg:pl-6 pb-2', { 'pt-2': index !== 0 })}>
                    <div className="flex flex-row items-center">
                      <span className="mr-2">
                        <PaymentMethodIcon
                          paymentMethod={transaction.paymentMethod}
                          wallet={transaction.wallet}
                        ></PaymentMethodIcon>
                      </span>
                      <span className="hidden lg:inline text-sm leading-6">
                        {transaction.processor}
                      </span>
                      {transaction.paymentMethod === LocalPaymentMethodTypes.Card &&
                        transaction.last4DigitsOfCardNumber && (
                          <div className="hidden lg:flex text-sm ml-1 items-center">
                            <span className="text-[0.375rem] mr-1">
                              &#8226;&#8226;&#8226;&#8226;
                            </span>
                            <span>{transaction.last4DigitsOfCardNumber}</span>
                          </div>
                        )}
                    </div>
                  </td>
                  <td
                    className={cn('pl-2 pb-2 lg:pl-6 leading-6', {
                      'pt-2': index !== 0,
                    })}
                  >
                    <div className="flex justify-end gap-2">
                      {isCaptureable(transaction) && (
                        <Button
                          variant="primary"
                          size="x-small"
                          className="px-2 w-min"
                          onClick={() => onCapture(transaction)}
                        >
                          Capture
                        </Button>
                      )}
                      {transaction.status === 'authorized' && (
                        <span className="text-grey-text text-[10px] leading-4 block px-1 border rounded border-solid border-border-grey-highlighted">
                          Authorized
                        </span>
                      )}
                      {transaction.paymentMethod === LocalPaymentMethodTypes.Card &&
                        isRefundable(transaction) && (
                          <Button
                            variant="secondary"
                            size="x-small"
                            className="px-2 w-min"
                            onClick={() => onRefund(transaction)}
                          >
                            <div className="flex flex-row gap-2 items-center">
                              <Icon name="return/12" />
                              <span>Refund</span>
                            </div>
                          </Button>
                        )}
                      {transaction.paymentMethod === LocalPaymentMethodTypes.Card &&
                        isVoid(transaction) && (
                          <Button
                            variant="secondary"
                            size="x-small"
                            className="px-2 w-min"
                            onClick={() => onVoid(transaction)}
                          >
                            <div className="flex flex-row gap-2 items-center">
                              <Icon name="void/12" />
                              <span>Void</span>
                            </div>
                          </Button>
                        )}
                    </div>
                  </td>
                </tr>
                {getSubTransactions(transaction).map(
                  (subTransaction, evIndex) =>
                    (cardAuthoriseOnly ||
                      (!cardAuthoriseOnly &&
                        subTransaction.type !== SubTransactionType.Capture)) && (
                      <tr
                        key={`ev_${evIndex}`}
                        className={cn('text-xs leading-6 group whitespace-nowrap', {
                          'border-b [&>td]:pb-2':
                            evIndex === getSubTransactions(transaction).length - 1,
                        })}
                      >
                        <td className="py-0">
                          {/* Mobile date */}
                          <span className="inline lg:hidden">
                            {subTransaction.occurredAt &&
                              format(subTransaction.occurredAt, 'dd/MM/yyyy')}
                          </span>

                          {/* Desktop date */}
                          <span className="hidden lg:inline">
                            {subTransaction.occurredAt &&
                              format(subTransaction.occurredAt, 'MMM do, yyyy')}
                          </span>
                        </td>
                        <td className="pl-2 lg:pl-6 text-right py-0">
                          <span
                            className={cn('mr-2 font-medium tabular-nums ', {
                              'text-[#29A37A]': subTransaction.type === SubTransactionType.Capture,
                            })}
                          >
                            <span className="lg:hidden">
                              {subTransaction.currency === Currency.EUR ? '€' : '£'}
                            </span>
                            {(subTransaction.type === SubTransactionType.Refund ||
                              subTransaction.type === SubTransactionType.Void) && <span>-</span>}
                            {formatter.format(subTransaction.amount)}
                          </span>
                        </td>
                        <td className="hidden lg:table-cell py-0">
                          <span className="text-grey-text font-normal">
                            {subTransaction.currency}
                          </span>
                        </td>
                        {subTransaction.type === SubTransactionType.Capture && (
                          <td className="pl-1 lg:pl-5 py-0" colSpan={2}>
                            <div className="flex flex-row items-center ml-1">
                              <span className="mr-2 p-1.5">
                                <Icon name="capture/12" className="text-control-grey-hover" />
                              </span>
                              <span>Captured</span>
                            </div>
                          </td>
                        )}
                        {subTransaction.type === SubTransactionType.Refund && (
                          <td className="pl-1 lg:pl-5 py-0" colSpan={2}>
                            <div className="flex flex-row items-center ml-1">
                              <span className="mr-2 p-1.5">
                                <Icon name="return/12" className="text-control-grey-hover" />
                              </span>
                              <span>Refund</span>
                            </div>
                          </td>
                        )}
                        {subTransaction.type === SubTransactionType.Void && (
                          <td className="pl-1 lg:pl-5 py-0" colSpan={2}>
                            <div className="flex flex-row items-center ml-1">
                              <span className="mr-2 p-1.5">
                                <Icon name="void/12" className="text-control-grey-hover" />
                              </span>
                              <span>Void</span>
                            </div>
                          </td>
                        )}
                      </tr>
                    ),
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Transactions
