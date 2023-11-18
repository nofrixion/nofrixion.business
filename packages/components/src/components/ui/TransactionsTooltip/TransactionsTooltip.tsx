import * as Tooltip from '@radix-ui/react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import InfoIcon from '../../../assets/icons/info-icon.svg'
import { LocalPaymentMethodTypes, LocalWallets } from '../../../types/LocalEnums'
import { LocalPaymentAttempt } from '../../../types/LocalTypes'
import { cn } from '../../../utils'
import { formatAmount, formatDateWithYearAndTime } from '../../../utils/formatters'
import { getSettledTransactions } from '../../../utils/paymentAttemptsHelper'
import { formatCurrency } from '../../../utils/uiFormaters'
import { Icon } from '../atoms'

export interface TransactionsTooltipProps {
  paymentAttempts: LocalPaymentAttempt[]
  children?: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  disableHover?: boolean
}

const TransactionsTooltip = ({
  paymentAttempts,
  children,
  side = 'bottom',
  className,
  disableHover,
}: TransactionsTooltipProps) => {
  const flatPaymentAttempts = getSettledTransactions(paymentAttempts)
  const [open, setOpen] = useState(false)

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
            return <Icon name="wallets/16" className="text-control-grey-hover" />
          default:
            return <Icon name="card/16" className="text-control-grey-hover" />
        }
      case LocalPaymentMethodTypes.Pisp:
        return <Icon name="bank/16" className="text-control-grey-hover" />
      case LocalPaymentMethodTypes.ApplePay:
      case LocalPaymentMethodTypes.GooglePay:
        return <Icon name="wallets/16" />
      default:
        return null
    }
  }

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger
          className={cn(
            'inline-flex',
            {
              'pointer-events-none': disableHover,
            },
            className,
          )}
        >
          <>
            {/* If no children show img */}
            {!children && (
              <img src={InfoIcon} className="cursor-pointer w-full h-full" alt="Info icon" />
            )}

            {children}
          </>
        </Tooltip.Trigger>
        <AnimatePresence>
          {open && (
            <Tooltip.Portal forceMount>
              <Tooltip.Content sideOffset={5} side={side} asChild>
                <motion.div
                  className={cn(
                    'rounded-lg p-4 bg-white select-none max-w-xs shadow-[0px_0px_16px_rgba(4,_41,_49,_0.15)] text-sm z-50',
                    {
                      'pointer-events-none': disableHover,
                    },
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <table>
                    <tbody>
                      {flatPaymentAttempts.map((paymentAttempt, index) => (
                        <tr key={index}>
                          <td
                            className={cn('pr-2 text-control-grey-hover', {
                              'pb-4': index !== flatPaymentAttempts.length - 1,
                            })}
                          >
                            <PaymentMethodIcon
                              paymentMethod={paymentAttempt.paymentMethod}
                              wallet={paymentAttempt.wallet}
                            />
                          </td>
                          <td
                            className={cn('text-xs text-grey-text pr-12', {
                              'pb-4': index !== flatPaymentAttempts.length - 1,
                            })}
                          >
                            {paymentAttempt.paymentMethod === LocalPaymentMethodTypes.Pisp &&
                            paymentAttempt.settledAt
                              ? formatDateWithYearAndTime(paymentAttempt.settledAt)
                              : 'Processed by ' + paymentAttempt.processor}
                          </td>
                          <td
                            className={cn(
                              'text-sm tabular-nums text-default-text font-medium text-right',
                              {
                                'pb-4': index !== flatPaymentAttempts.length - 1,
                                'text-grey-text':
                                  paymentAttempt.paymentMethod === LocalPaymentMethodTypes.Card,
                              },
                            )}
                          >
                            <span className={cn({ 'text-negative-red': paymentAttempt.isRefund })}>
                              {paymentAttempt.isRefund && <span>-</span>}
                              {formatCurrency(paymentAttempt.currency)}
                              {formatAmount(paymentAttempt.amount)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default TransactionsTooltip
