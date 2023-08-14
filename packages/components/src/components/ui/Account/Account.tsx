import { Account as AccountModel, AccountIdentifierType } from '@nofrixion/moneymoov'

import { formatAmount } from '../../../utils/formatters'
import { formatCurrency } from '../../../utils/uiFormaters'
import { DisplayAndCopy } from '../atoms'

export interface AccountProps {
  account: AccountModel
  onAccountClick: () => void
}

const Account: React.FC<AccountProps> = ({ account, onAccountClick }) => {
  return (
    <div
      className="flex h-[124px] p-8 mb-6 bg-white gap-8 justify-between"
      onClick={() => onAccountClick()}
      aria-hidden="true"
    >
      <div>
        <span className="font-semibold text-xl leading-5">{account.accountName}</span>
        {account.identifier.type === AccountIdentifierType.IBAN ? (
          <DisplayAndCopy name="IBAN" value={account.identifier.iban} className="mt-2" />
        ) : (
          <div className="flex gap-6 mt-2">
            <DisplayAndCopy name="SC" value={account.identifier.sortCode} />
            <DisplayAndCopy name="AN" value={account.identifier.accountNumber} />
          </div>
        )}
      </div>
      <div className="text-right">
        <span className="text-4xl font-semibold leading-9">
          {formatCurrency(account.currency)} {formatAmount(account.balance)}
        </span>
        <div className="text-sm font-normal leading-4 mt-2">
          <span className="pr-2">Available</span>
          <span>
            {formatCurrency(account.currency)} {formatAmount(account.availableBalance)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Account
