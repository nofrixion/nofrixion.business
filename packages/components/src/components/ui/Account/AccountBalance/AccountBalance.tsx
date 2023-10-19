import { Currency } from '@nofrixion/moneymoov'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '../../../../utils'
import { formatAmount } from '../../../../utils/formatters'
import { formatCurrency } from '../../../../utils/uiFormaters'

export const accountBalanceVariants = cva('font-semibold  font-inter-fontFeatureSettings', {
  variants: {
    size: {
      large: ['text-[32px] leading-9'],
      medium: ['text-2xl leading-[30px]'],
      small: ['text-base'],
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

export const accountAvailableBalanceVariants = cva(' font-normal  mt-2 mr-1', {
  variants: {
    size: {
      large: ['text-sm leading-4'],
      medium: ['text-[13px] leading-4 text-grey-text'],
      small: ['text-[12px] mt-0 leading-4 text-grey-text'],
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

export interface AccountBalanceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accountBalanceVariants> {
  currency: Currency
  balance: number
  availableBalance: number
  hideAvailableBalanceIfSameAsBalance?: boolean
}

const AccountBalance: React.FC<AccountBalanceProps> = ({
  size,
  currency,
  balance,
  availableBalance,
  className,
  hideAvailableBalanceIfSameAsBalance,
  ...props
}) => {
  console.log('AccountBalance', { size, currency, balance, availableBalance, className, props })
  console.log(balance !== availableBalance)
  const hideAvailableBalance = hideAvailableBalanceIfSameAsBalance && balance === availableBalance
  return (
    <div className={cn('text-right', className)} {...props}>
      <span className={cn(accountBalanceVariants({ size }))}>
        {formatCurrency(currency)} {formatAmount(balance)}
      </span>
      {!hideAvailableBalance && (
        <div className={cn(accountAvailableBalanceVariants({ size }))}>
          <span className="pr-2">Available</span>
          <span className="font-inter-fontFeatureSettings">
            {formatCurrency(currency)} {formatAmount(availableBalance)}
          </span>
        </div>
      )}
    </div>
  )
}

export default AccountBalance
