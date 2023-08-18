import { Account as AccountModel, AccountIdentifierType } from '@nofrixion/clients'

import { cn } from '../../../utils'
import { DisplayAndCopy } from '../atoms'
import AccountBalance from './AccountBalance/AccountBalance'

export interface AccountCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  account: AccountModel
}

const AccountCard: React.FC<AccountCardProps> = ({ account, className, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        'flex flex-wrap sm:h-[124px] p-8 mb-6 bg-white gap-8 justify-between rounded-lg hover:shadow-[0px_2px_8px_0px_rgba(4,_41,_49,_0.1)] w-full',
        className,
      )}
    >
      <div className="text-left">
        <div className="mt-2">
          <span className="font-semibold text-xl leading-5" aria-hidden="true">
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
    </button>
  )
}

export default AccountCard
