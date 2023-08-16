import { Currency } from '@nofrixion/moneymoov'

import { formatAmount } from '../../../../utils/formatters'
import { formatCurrency } from '../../../../utils/uiFormaters'

export interface AccountBalanceProps {
  currency: Currency
  balance: number
  availableBalance: number
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ currency, balance, availableBalance }) => {
  return (
    <div className="text-right">
      <span className="text-4xl font-semibold leading-9 tabular-nums font-inter-fontFeatureSettings">
        {formatCurrency(currency)} {formatAmount(balance)}
      </span>
      <div className="text-sm font-normal leading-4 mt-2">
        <span className="pr-2">Available</span>
        <span className="tabular-nums font-inter-fontFeatureSettings">
          {formatCurrency(currency)} {formatAmount(availableBalance)}
        </span>
      </div>
    </div>
  )
}

export default AccountBalance
