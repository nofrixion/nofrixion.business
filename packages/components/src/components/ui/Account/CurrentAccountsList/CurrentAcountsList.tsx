import { Account as AccountModel } from '@nofrixion/moneymoov'

import { Toaster } from '../../Toast/Toast'
import AccountCard from '../AccountCard'
import CurrentAccountsHeader from '../CurrentAccountsHeader/CurrentAccountsHeader '

export interface CurrentAccountsListProps {
  accounts: AccountModel[] | undefined
  onCreatePaymentAccount: () => void
  onAccountClick: () => void
}

const CurrentAcountsList = ({
  accounts,
  onCreatePaymentAccount,
  onAccountClick,
}: CurrentAccountsListProps) => {
  return (
    <div className="font-inter bg-main-grey text-default-text h-full">
      <CurrentAccountsHeader onCreatePaymentAccount={onCreatePaymentAccount} />

      {accounts && (
        <div className="flex-row mb-8 md:mb-[68px]">
          {accounts
            .sort((a, b) => a.accountName.localeCompare(b.accountName))
            .map((account, index) => (
              <AccountCard key={index} account={account} onAccountClick={onAccountClick} />
            ))}
        </div>
      )}

      <Toaster positionY="top" positionX="right" duration={3000} />
    </div>
  )
}

export default CurrentAcountsList
