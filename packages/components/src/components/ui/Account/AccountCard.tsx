import { Account as AccountModel, AccountIdentifierType } from '@nofrixion/moneymoov'

import { DisplayAndCopy } from '../atoms'
import AccountBalance from './AccountBalance/AccountBalance'

export interface AccountCardProps {
  account: AccountModel
  onAccountClick: () => void
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onAccountClick }) => {
  return (
    <div className="flex flex-wrap sm:h-[124px] p-8 mb-6 bg-white gap-8 justify-between rounded-lg hover:shadow-[0px_2px_8px_0px_rgba(4,_41,_49,_0.1)]">
      <div>
        <div className="mt-2">
          <span
            className="font-semibold text-xl leading-5"
            onClick={() => onAccountClick()}
            aria-hidden="true"
          >
            {account.accountName}
          </span>
        </div>
        <div className="flex gap-6 mt-2">
          {account.identifier.type === AccountIdentifierType.IBAN ? (
            <DisplayAndCopy name="IBAN" value={account.identifier.iban} />
          ) : (
            <>
              <DisplayAndCopy name="SC" value={account.identifier.sortCode} />
              <DisplayAndCopy name="AN" value={account.identifier.accountNumber} />
            </>
          )}
        </div>
      </div>
      <div>
        <AccountBalance
          currency={account.currency}
          balance={account.balance}
          availableBalance={account.availableBalance}
        />
      </div>
    </div>
  )
}

export default AccountCard
