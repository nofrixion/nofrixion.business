import { Currency } from '@nofrixion/moneymoov'

import { cn } from '../../../../utils'
import { formatAmount } from '../../../../utils/formatters'
import { formatCurrency } from '../../../../utils/uiFormaters'

export interface AccountBalanceProps extends React.HTMLAttributes<HTMLDivElement> {
  currency: Currency
  balance: number
  availableBalance: number
}

const AccountBalance: React.FC<AccountBalanceProps> = ({
  currency,
  balance,
  availableBalance,
  className,
  ...props
}) => {
  return (
    <div className={cn('text-right', className)} {...props}>
      <span className="text-[32px] font-semibold leading-9 tabular-nums font-inter-fontFeatureSettings">
        {formatCurrency(currency)} {formatAmount(balance)}
      </span>
      <div className="text-sm font-normal leading-4 mt-2 mr-1">
        <span className="pr-2">Available</span>
        <span className="tabular-nums font-inter-fontFeatureSettings">
          {formatCurrency(currency)} {formatAmount(availableBalance)}
        </span>
      </div>
    </div>
  )
}

export default AccountBalance
