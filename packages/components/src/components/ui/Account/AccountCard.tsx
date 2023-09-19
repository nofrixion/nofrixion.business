import { Account as AccountModel, AccountIdentifierType } from '@nofrixion/moneymoov'

import { cn } from '../../../utils'
import { DisplayAndCopy } from '../atoms'
import AccountBalance from './AccountBalance/AccountBalance'

export interface AccountCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  account: AccountModel
  bankLogo?: string
}

const AccountCard: React.FC<AccountCardProps> = ({ account, bankLogo, className, ...props }) => {
  console.log('bankLogo', bankLogo)

  return (
    <button
      {...props}
      className={cn(
        'flex sm:h-[124px] p-8 mb-6 bg-white gap-8 rounded-lg hover:shadow-[0px_2px_8px_0px_rgba(4,_41,_49,_0.1)] w-full',
        className,
      )}
    >
      {account.isConnectedAccount && (
        <div className="">
          <img
            src={`https://cdn.nofrixion.com/nextgen/assets/banks/${bankLogo}`}
            alt="bank logo"
            width={40}
            height={40}
          />
        </div>
      )}
      <div className="flex flex-row justify-between w-full">
        <div className="text-left">
          <div>
            <span className="font-semibold text-xl leading-5" aria-hidden="true">
              {account.accountName}
            </span>
          </div>
          <div className="flex gap-6 mt-2">
            {account.identifier.type === AccountIdentifierType.IBAN && account.identifier.iban ? (
              <DisplayAndCopy name="IBAN" value={account.identifier.iban} />
            ) : (
              <>
                {account.identifier.sortCode && (
                  <DisplayAndCopy name="SC" value={account.identifier.sortCode} />
                )}
                {account.identifier.accountNumber && (
                  <DisplayAndCopy name="AN" value={account.identifier.accountNumber} />
                )}
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
    </button>
  )
}

export default AccountCard
