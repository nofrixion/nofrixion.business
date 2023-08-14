import { Account as AccountModel, Currency } from '@nofrixion/moneymoov'

import { formatAmount } from '../../../utils/formatters'

export interface AccountProps {
  account: AccountModel
  onAccountClick: () => void
}

const Account: React.FC<AccountProps> = ({ account, onAccountClick }) => {
  const getAccountCurrency = (currency: Currency) => {
    if (!currency) {
      return
    }
    if (Currency.EUR === currency) {
      return '€'
    } else if (Currency.GBP === currency) {
      return '£'
    }
  }

  return (
    <div
      className="flex h-[124px] p-8 mb-8 bg-white hover:cursor-pointer gap-8 justify-between"
      onClick={() => onAccountClick()}
      aria-hidden="true"
    >
      <div>
        <span className="font-semibold text-xl leading-5">{account.accountName}</span>
        <span></span>
      </div>
      <div className="text-right">
        <span className="text-4xl font-semibold leading-9">
          {getAccountCurrency(account.currency)} {formatAmount(account.balance)}
        </span>
        <div className="text-sm font-normal leading-4 mt-2">
          <span className="pr-2">Available</span>
          <span>
            {getAccountCurrency(account.currency)} {formatAmount(account.availableBalance)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Account
